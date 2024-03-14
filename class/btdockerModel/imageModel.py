# coding: utf-8
# -------------------------------------------------------------------
# 宝塔Linux面板
# -------------------------------------------------------------------
# Copyright (c) 2015-2099 宝塔软件(http://bt.cn) All rights reserved.
# -------------------------------------------------------------------
# Author: wzz <wzz@bt.cn>
# -------------------------------------------------------------------

# ------------------------------
# Docker模型
# ------------------------------
import os
import json
import traceback

import docker.errors
import public
from btdockerModel import dk_public as dp
from btdockerModel.dockerBase import dockerBase


class main(dockerBase):

    def docker_client(self, url):
        return dp.docker_client(url)

    # 导出
    def save(self, get):
        """
        :param path 要镜像tar要存放的路径
        :param name 包名
        :param id 镜像
        :param
        :param get:
        :return:
        """
        try:
            if "tar" in get.name:
                filename = '{}/{}'.format(get.path, get.name)
            else:
                filename = '{}/{}.tar'.format(get.path, get.name)

            if not os.path.exists(get.path): os.makedirs(get.path)

            public.writeFile(filename, "")
            with open(filename, 'wb') as f:
                image = self.docker_client(self._url).images.get(get.id)
                print(image)
                for chunk in image.save(named=True):
                    f.write(chunk)
            dp.write_log("Image [{}] exported to [{}] successfully".format(get.id, filename))
            return public.returnMsg(True, "Successfully saved to:{}".format(filename))

        except docker.errors.APIError as e:
            if "empty export - not implemented" in str(e):
                return public.returnMsg(False, "Cannot export image！")
            return public.get_error_info()

    # 导入
    def load(self, get):
        """
        :param path: 需要导入的镜像路径具体到文件名
        :param get:
        :return:
        """
        if "path" not in get and get.path == "":
            return public.returnMsg(False, "Please enter the image path!")

        # 2023/12/20 下午 4:12 判断如果path后缀不为.tar则返回错误
        if not get.path.endswith(".tar"):
            return public.returnMsg(False, "Failed to import the image. The file extension must be.tar!")

        images = self.docker_client(self._url).images
        with open(get.path, 'rb') as f:
            images.load(f)

        dp.write_log("Image [{}] imported successfully!".format(get.path))
        return public.returnMsg(True, "Image import was successful！{}".format(get.path))

    # 列出所有镜像
    def image_list(self, get):
        """
        :param url
        :param get:
        :return:
        """
        data = list()
        import subprocess
        output = subprocess.getoutput(
            "docker images --format "
            "\"{{.ID}},{{.Repository}}:{{.Tag}},{{.Digest}},{{.CreatedSince}},{{.Size}},{{.CreatedAt}};\"")
        if not output:
            return data

        for i in output.split(";"):
            if not i: continue
            tmp = i.split(",")
            if "<none>" in i:
                data.append({
                    "id": tmp[0],
                    "tags": tmp[1],
                    "name": tmp[1],
                    "digest": tmp[2],
                    "time": dp.convert_timezone_str_to_iso8601(tmp[5]),
                    "size": dp.byte_conversion(tmp[4]),
                    "created_at": tmp[5],
                    "used": 0,
                    "containers": [],
                })
                continue

            data.append({
                "id": tmp[0],
                "tags": tmp[1],
                "name": tmp[1],
                "digest": tmp[2],
                "time": dp.convert_timezone_str_to_iso8601(tmp[5]),
                "size": dp.byte_conversion(tmp[4]),
                "created_at": tmp[5],
                "used": 0,
                "containers": [],
            })

        return self._get_used_images(data)

    @staticmethod
    def _get_used_images(data):
        """
        获取已被容器使用的镜像
        @param get:
        @return:
        """
        import subprocess
        output = subprocess.getoutput("docker ps --format \"{{.ID}},{{.Image}},{{.Names}};\"")
        if not output:
            return data

        for i in output.split(";"):
            if not i: continue
            tmp = i.split(",")
            for img in data:
                if img['name'] in tmp[1]:
                    img['used'] = 1
                    tmp1 = {
                        "container_id": tmp[0],
                        "container_name": dp.rename(tmp[2]),
                    }
                    img['containers'].append(tmp1)
                    del tmp1

        return data

    def get_image_attr(self, images):
        image = images.list()
        return [i.attrs for i in image]

    def get_logs(self, get):
        import files
        logs_file = get.logs_file
        return public.returnMsg(True, files.files().GetLastLine(logs_file, 20))

    # 构建镜像
    def build(self, get):
        """
        :param path         dockerfile dir
        :param pull         如果引用的镜像有更新自动拉取
        :param tag          标签 jose:v1
        :param data         在线编辑配置
        :param get:
        :return:
        """
        public.writeFile(self._log_path, "Start building the image！")
        if not hasattr(get, "pull"):
            get.pull = False

        min_time = None
        if hasattr(get, "data") and get.data:
            min_time = public.format_date("%Y%m%d%H%M")
            get.path = "/tmp/{}/Dockerfile".format(min_time)
            os.makedirs("/tmp/{}".format(min_time))
            public.writeFile(get.path, get.data)

        if not os.path.exists(get.path):
            return public.returnMsg(True, "Please enter the correct DockerFile path！")

        # 2024/1/18 下午 12:05 取get.path的目录
        get.path = os.path.dirname(get.path)
        image_obj, generator = self.docker_client(self._url).images.build(
            path=get.path,
            pull=True if get.pull == "1" else False,
            tag=get.tag,
            forcerm=True
        )

        if min_time is not None:
            os.remove(get.path)

        dp.log_docker(generator, "Docker Build tasks！")
        dp.write_log("Build image [{}] successful!".format(get.tag))
        return public.returnMsg(True, "Build image successfully!")

    # 删除镜像
    def remove(self, get):
        """
        :param url
        :param id  镜像id
        :param name 镜像tag
        :force 0/1 强制删除镜像
        :param get:
        :return:
        """
        try:
            self.docker_client(self._url).images.remove(get.name)
            dp.write_log("Delete image [{}] successfully!".format(get.name))
            return public.returnMsg(True, "Delete image successfully!")

        except docker.errors.ImageNotFound as e:
            return public.returnMsg(False, "The delete failed and the image may not exist!")

        except docker.errors.APIError as e:
            if "image is referenced in multiple repositories" in str(e):
                return public.returnMsg(False, "The image ID is used in more than one image, force the image to be deleted!")
            if "using its referenced image" in str(e):
                return public.returnMsg(False, "The image is in use. Please delete the container before deleting the image!")

            return public.returnMsg(False, "Failed to delete image!<br> {}".format(e))

    # 拉取指定仓库镜像
    def pull_from_some_registry(self, get):
        """
        :param name 仓库名
        :param url
        :param image
        :param get:
        :return:
        """
        from btdockerModel import registryModel as dr

        try:
            r_info = dr.main().registry_info(get.name)
            r_info['username'] = public.aes_decrypt(r_info['username'], self.aes_key)
            r_info['password'] = public.aes_decrypt(r_info['password'], self.aes_key)
            login = dr.main().login(self._url, r_info['url'], r_info['username'], r_info['password'])['status']
            if not login: return login
        except TypeError:
            return public.returnMsg(False, "Repository [{}] Login failed, please try to log in to this repository again!".format(get.name))

        get.username = r_info['username']
        get.password = r_info['password']
        get.registry = r_info['url']
        get.namespace = r_info['namespace']

        return self.pull(get)

    # 推送镜像到指定仓库
    def push(self, get):
        """
        :param id       镜像ID
        :param url      连接docker的url
        :param tag      标签 镜像名+版本号v1
        :param name     仓库名
        :param get:
        :return:
        """
        if "/" in get.tag:
            return public.returnMsg(False, "The pushed image cannot contain [/], please use the following format: image:v1 (image name: version)")
        if ":" not in get.tag:
            get.tag = "{}:latest".format(get.tag)

        public.writeFile(self._log_path, "Start pushing the image!\n")

        from btdockerModel import registryModel as dr
        r_info = dr.main().registry_info(get.name)
        r_info['username'] = public.aes_decrypt(r_info['username'], self.aes_key)
        r_info['password'] = public.aes_decrypt(r_info['password'], self.aes_key)

        if get.name == "docker official" and r_info['url'] == "docker.io":
            public.writeFile(self._log_path, "The image cannot be pushed to the Docker public repository!\n")
            return public.returnMsg(False, "Unable to push to Docker public repository!")

        try:
            login = dr.main().login(self._url, r_info['url'], r_info['username'], r_info['password'])['status']
            if not login:
                return public.returnMsg(False, "Repository [{}] Login failed!".format(r_info['url']))

            auth_conf = {
                "username": r_info['username'],
                "password": r_info['password'],
                "registry": r_info['url']
            }
            # repository       namespace/image

            repository = r_info['url']
            image = "{}/{}/{}".format(repository, r_info['namespace'], get.tag)

            self.tag(self._url, get.id, image)
            ret = self.docker_client(self._url).images.push(
                repository=image.split(":")[0],
                tag=image.split(":")[1],
                auth_config=auth_conf,
                stream=True
            )

            dp.log_docker(ret, "Image push task")
            # 删除自动打标签的镜像
            get.name = image
            self.remove(get)

        except docker.errors.APIError as e:
            if "invalid reference format" in str(e):
                return public.returnMsg(False, "Push failed, image label error, please enter such as: v1.0.1")
            if "denied: requested access to the resource is denied" in str(e):
                return public.returnMsg(False, "Push failed, do not have permission to push to this repository!")
            return public.returnMsg(False, "Push failure!{}".format(e))

        dp.write_log("Image [{}] pushed successfully！".format(image))
        return public.returnMsg(True, "Push successfully, mirror:{}".format(image))

    def tag(self, url, image_id, tag):
        """
        为镜像打标签
        :param repository   仓库namespace/images
        :param image_id:          镜像ID
        :param tag:         镜像标签jose:v1
        :return:
        """
        image = tag.split(":")[0]
        tag_ver = tag.split(":")[1]
        self.docker_client(url).images.get(image_id).tag(
            repository=image,
            tag=tag_ver
        )
        return public.returnMsg(True, "Successfully set！")

    def pull(self, get):
        """
        :param image
        :param url
        :param registry
        :param username 拉取私有镜像时填写
        :param password 拉取私有镜像时填写
        :param get:
        :return:
        """
        public.writeFile(self._log_path, "Start pulling the mirror image!")
        import docker.errors
        try:
            if ':' not in get.image: get.image = '{}:latest'.format(get.image)
            auth_data = {
                "username": get.username,
                "password": get.password,
                "registry": get.registry if get.registry else None
            }
            auth_conf = auth_data if get.username else None

            if not hasattr(get, "tag"): get.tag = get.image.split(":")[-1]

            if get.registry != "docker.io":
                get.image = "{}/{}/{}".format(get.registry, get.namespace, get.image)

            ret = dp.docker_client_low(self._url).pull(
                repository=get.image,
                auth_config=auth_conf,
                tag=get.tag,
                stream=True
            )

            dp.log_docker(ret, "Mirror pull task")

            if ret:
                dp.write_log("Image pull [{}:{}] successful".format(get.image, get.tag))
                return public.returnMsg(True, 'The mirror was pulled successfully.')
            else:
                return public.returnMsg(False, 'There may not be this mirror image.')

        except docker.errors.ImageNotFound as e:
            if "pull access denied for" in str(e):
                return public.returnMsg(False, "Pull failed, image is private image, need to enter dockerhub account password!")
            return public.returnMsg(False, "Pull failure <br><br> Reason: {}".format(e))

        except docker.errors.NotFound as e:
            if "not found: manifest unknown" in str(e):
                return public.returnMsg(False, "The image pull failed, the image is not in the repository!")
            return public.returnMsg(False, "Pull failed<br><br>reason:{}".format(e))

        except docker.errors.APIError as e:
            if "invalid tag format" in str(e):
                return public.returnMsg(False, "The pull fails, the image is formatted incorrectly, for example: nginx:v 1!!")
            return public.returnMsg(False, "Pull failure!{}".format(e))

    # 拉取镜像
    def pull_high_api(self, get):
        """
        :param image
        :param url
        :param registry
        :param username 拉取私有镜像时填写
        :param password 拉取私有镜像时填写
        :param get:
        :return:
        """
        import docker.errors
        try:
            if ':' not in get.image:
                get.image = '{}:latest'.format(get.image)
            auth_data = {
                "username": get.username,
                "password": get.password,
                "registry": get.registry if get.registry else None
            }

            auth_conf = auth_data if get.username else None

            if get.registry != "docker.io":
                get.image = "{}/{}/{}".format(get.registry, get.namespace, get.image)

            ret = self.docker_client(get.url).images.pull(repository=get.image, auth_config=auth_conf)
            if ret:
                return public.returnMsg(True, 'The image was pulled successfully.')
            else:
                return public.returnMsg(False, 'There may not be this mirror image.')

        except docker.errors.ImageNotFound as e:
            if "pull access denied for" in str(e):
                return public.returnMsg(False, "Failed to pull the image, this is a private image, please enter the account password!")
            return public.returnMsg(False, "Pull image failure <br><br> Reason: {}".format(e))

    def image_for_host(self, get):
        """
        获取镜像大小和获取镜像数量
        :param get:
        :return:
        """
        res = self.image_list(get)
        if not res['status']: return res

        num = len(res['msg']['images_list'])
        size = 0

        for i in res['msg']['images_list']:
            size += i['size']
        return public.returnMsg(True, {'num': num, 'size': size})

    def prune(self, get):
        """
        删除无用的镜像
        :param get:
        :return:
        """
        dang_ling = True if "filters" in get and get.filters == "0" else False

        try:
            res = self.docker_client(self._url).images.prune(filters={'dangling': dang_ling})

            if not res['ImagesDeleted']:
                return public.returnMsg(True, "No useless images!")

            dp.write_log("Delete useless image successfully!")
            return public.returnMsg(True, "successfully delete!")

        except docker.errors.APIError as e:
            return public.returnMsg(False, "Delete failed!{}".format(e))

    # 2023/12/13 上午 11:08 镜像搜索
    def search(self, get):
        '''
            @name 镜像搜索
            @author wzz <2023/12/13 下午 3:41>
            @param 参数名<数据类型> 参数描述
            @return 数据类型
        '''
        try:
            return self.docker_client(self._url).images.search(get.name)
        except docker.errors.APIError as e:
            print(traceback.format_exc())
            return public.returnMsg(False, "Search failed!{}".format(e))
