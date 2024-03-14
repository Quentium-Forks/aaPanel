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
import docker.errors
import public
from btdockerModel import dk_public as dp
from btdockerModel.dockerBase import dockerBase


class main(dockerBase):

    def docker_client(self, url):
        return dp.docker_client(url)

    def get_container_list(self):
        '''
        获取容器详情生成列表
        @return: list
        '''
        containers = self.docker_client(self._url).containers
        c_list = containers.list(all=True)
        # 获取容器详情生成列表
        return [container_info.attrs for container_info in c_list]

    def get_volume_container_name(self, volume_detail, container_list):
        '''
        拼接对应的容器名与卷名
        @param volume_detail: 卷字典
        @param container_list: 容器详情列表
        @return:
        '''
        for container in container_list:
            if not container['Mounts']:
                continue
            for mount in container['Mounts']:
                if "Name" not in mount:
                    continue
                if volume_detail['Name'] == mount['Name']:
                    volume_detail['container'] = container['Name'].replace("/", "")
        if 'container' not in volume_detail:
            volume_detail['container'] = ''
        return volume_detail

    def get_volume_list(self, args):
        """
        :param self._url: 链接docker的URL
        :return:
        """
        client = self.docker_client(self._url)
        if not client: return []

        volumes = client.volumes
        data = self.get_volume_attr(volumes)

        return sorted(data, key=lambda x: x['CreatedAt'], reverse=True)

    def get_volume_attr(self, volumes):
        volume_list = volumes.list()
        data = list()
        container_list = self.get_container_list()
        for v in volume_list:
            v = self.get_volume_container_name(v.attrs, container_list)
            data.append(v)
        return data

    def add(self, args):
        """
        添加一个卷
        :param name
        :param driver  local
        :param driver_opts (dict) – Driver options as a key-value dictionary
        :param labels str
        :return:
        """
        try:
            try:
                if args.labels != "":
                    args.labels = dp.set_kv(args.labels)
            except:
                return public.returnMsg(False, "Label format error, please enter key/value pair, such as: key=value, multiple please one key/value pair per line!")

            if len(args.name) < 2:
                return public.returnMsg(False, "Volume names can be no less than 2 characters long!")

            self.docker_client(self._url).volumes.create(
                name=args.name,
                driver=args.driver,
                driver_opts=args.driver_opts if args.driver_opts else None,
                labels=args.labels if args.labels != "" else None
            )
            dp.write_log("Add storage volume [{}] success!".format(args.name))
            return public.returnMsg(True, "successfully added!")
        except docker.errors.APIError as e:
            if "volume name is too short, names should be at least two alphanumeric characters" in str(e):
                return public.returnMsg(False, "Volume names can be no less than 2 characters long!")
            if "volume name" in str(e):
                return public.returnMsg(False, "Volume name already exists!")
            return public.returnMsg(False, "addition failed! {}".format(e))

    def remove(self, args):
        """
        删除一个卷
        :param name  volume name
        :param args:
        :return:
        """
        try:
            obj = self.docker_client(self._url).volumes.get(args.name)
            obj.remove()
            dp.write_log("Delete volume [{}] successful!".format(args.name))
            return public.returnMsg(True, "successfully delete")

        except docker.errors.APIError as e:
            if "volume is in use" in str(e):
                return public.returnMsg(False, "The storage volume is in use and cannot be deleted!")
            if "no such volume" in str(e):
                return public.returnMsg(False, "The storage volume does not exist!")
            return public.returnMsg(False, "Delete failed! {}".format(e))

    def prune(self, args):
        """
        删除无用的卷
        :param args:
        :return:
        """
        try:
            res = self.docker_client(self._url).volumes.prune()
            if not res['VolumesDeleted']:
                return public.returnMsg(False, "No useless storage volumes!")

            dp.write_log("Delete useless storage volume successfully!")
            return public.returnMsg(True, "successfully delete!")
        except docker.errors.APIError as e:
            return public.returnMsg(False, "Delete failed! {}".format(e))
