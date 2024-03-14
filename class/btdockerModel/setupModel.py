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

import json
import os

import public
from btdockerModel import dk_public as dp
from btdockerModel.dockerBase import dockerBase


class main(dockerBase):
    def get_config(self, get):
        """
        获取设置配置信息
        @param get:
        @return:
        """
        check_docker_compose = self.check_docker_compose_service()

        return {
            "service_status": self.get_service_status(),
            "docker_installed": self.check_docker_service(),
            "docker_compose_installed": check_docker_compose[0],
            "docker_compose_path": check_docker_compose[1],
            "monitor_status": self.get_monitor_status(),
            "monitor_save_date": dp.docker_conf()['SAVE'],
            "daemon_path": "/etc/docker/daemon.json",
        }

    @staticmethod
    def _get_com_registry_mirrors():
        """
        获取常用加速配置
        @return:
        """
        com_reg_mirror_file = "{}/class/btdockerModel/config/com_reg_mirror.json".format(public.get_panel_path())
        try:
            com_reg_mirror = json.loads(public.readFile(com_reg_mirror_file))
        except:
            com_reg_mirror = {
                "https://registry.docker-cn.com": "Official Docker China image accelerator",
                "https://mirror.ccs.tencentyun.com": "Tencent cloud image acceleration station",
                "https://ung2thfc.mirror.aliyuncs.com": "Ali Cloud image acceleration station",
            }

        return com_reg_mirror

    def set_monitor_save_date(self, get):
        """
        :param save_date: int 例如30 表示 30天
        :param get:
        :return:
        """
        import re
        conf_path = "{}/data/docker.conf".format(public.get_panel_path())
        docker_conf = public.readFile(conf_path)
        try:
            save_date = int(get.save_date)
        except:
            return public.returnMsg(False, "The monitoring save time needs to be a positive integer！")
        if save_date > 999:
            return public.returnMsg(False, "Monitoring data cannot be retained for more than 999 days！")
        if not docker_conf:
            docker_conf = "SAVE={}".format(save_date)
            public.writeFile(conf_path, docker_conf)
            return public.returnMsg(True, "Successfully set！")
        docker_conf = re.sub("SAVE\s*=\s*\d+", "SAVE={}".format(save_date),
                             docker_conf)
        public.writeFile(conf_path, docker_conf)
        dp.write_log("et the monitoring time to [{}] days！".format(save_date))
        return public.returnMsg(True, "Successfully set！")

    def get_service_status(self):
        sock = '/var/run/docker.pid'
        if os.path.exists(sock):
            # try:
            client = dp.docker_client()
            if client:
                return True
            return False
            # except:
            #     return False
        else:
            return False

    # docker服务状态设置
    def docker_service(self, get):
        """
        :param act start/stop/restart
        :param get:
        :return:
        """
        import public
        act_dict = {'start': 'start', 'stop': 'stop', 'restart': 'restart'}
        if get.act not in act_dict:
            return public.returnMsg(False, "There's no way to do that")
        exec_str = 'systemctl {} docker'.format(get.act)
        if get.act == "stop":
            exec_str += "&& systemctl {} docker.socket".format(get.act)
        public.ExecShell(exec_str)
        dp.write_log("Set the Docker service status to [{}] success".format(act_dict[get.act]))
        return public.returnMsg(True,
                                "Setting the status to [{}] succeeds".format(act_dict[get.act]))

    # 获取加速配置
    def get_registry_mirrors(self, get):
        """
        获取镜像加速信息
        @param get:
        @return:
        """
        try:
            if not os.path.exists('/etc/docker/daemon.json'):
                reg_mirrors = []
            else:
                conf = json.loads(public.readFile('/etc/docker/daemon.json'))
                if "registry-mirrors" not in conf:
                    reg_mirrors = []
                else:
                    reg_mirrors = conf['registry-mirrors']
        except:
            reg_mirrors = []

        com_reg_mirrors = self._get_com_registry_mirrors()

        return {
            "registry_mirrors": reg_mirrors,
            "com_reg_mirrors": com_reg_mirrors
        }

    # 设置加速配置
    def set_registry_mirrors(self, get):
        """
        :param registry_mirrors_address registry.docker-cn.com\nhub-mirror.c.163.com
        :param get:
        :return:
        """
        import re
        try:
            conf = {}
            if os.path.exists('/etc/docker/daemon.json'):
                try:
                    conf = json.loads(public.readFile('/etc/docker/daemon.json'))
                except Exception as e:
                    return public.returnMsg(False, "Global configuration file error, please check {}！".format(str(e)))

            if not get.registry_mirrors_address.strip():
                if 'registry-mirrors' not in conf:
                    return public.returnMsg(True, 'Successfully set')

                del (conf['registry-mirrors'])
            else:
                registry_mirrors = get.registry_mirrors_address.strip().split('\n')
                for i in registry_mirrors:
                    if not re.search('https?://', i):
                        return public.returnMsg(False,
                                                'The speedup address [{}] is incorrectly formatted'.format(
                                                    i))

                tmp_registry = registry_mirrors
                if isinstance(registry_mirrors, list) and registry_mirrors:
                    tmp_registry = registry_mirrors[0]

                conf['registry-mirrors'] = public.xsssec2(tmp_registry)
                if isinstance(conf['registry-mirrors'], str):
                    conf['registry-mirrors'] = [conf['registry-mirrors']]

            public.writeFile('/etc/docker/daemon.json', json.dumps(conf, indent=2))
            self.update_com_registry_mirrors(get)
            dp.write_log("Setup Docker acceleration successfully!")
            return public.returnMsg(True, 'Successfully set')

        except:
            return public.returnMsg(False, 'Setup failed! Failure reason :{}'.format(public.get_error_info()))

    def update_com_registry_mirrors(self, get):
        """
        更新常用加速配置
        @param get:
        @return:
        """
        import time
        com_reg_mirror_file = "{}/class/btdockerModel/config/com_reg_mirror.json".format(public.get_panel_path())
        try:
            com_reg_mirror = json.loads(public.readFile(com_reg_mirror_file))
        except:
            com_reg_mirror = {
                "https://registry.docker-cn.com": "Official Docker China image accelerator",
                "https://mirror.ccs.tencentyun.com": "Tencent cloud image acceleration station",
                "https://ung2thfc.mirror.aliyuncs.com": "Ali Cloud image acceleration station",
            }

        if get.registry_mirrors_address in com_reg_mirror:
            return public.returnMsg(True, "Successfully set！")

        remarks = get.remarks if "remarks" in get and get.remarks != "" else ("Custom mirrors" + str(int(time.time())))

        com_reg_mirror.update({"{}".format(get.registry_mirrors_address): remarks})
        public.writeFile(com_reg_mirror_file, json.dumps(com_reg_mirror, indent=2))
        dp.write_log("更新常用加速配置成功！")
        return public.returnMsg(True, "Update successfully！")

    def del_com_registry_mirror(self, get):
        """
        删除常用加速配置
        @param get:
        @return:
        """
        com_reg_mirror_file = "{}/class/btdockerModel/config/com_reg_mirror.json".format(public.get_panel_path())
        try:
            com_reg_mirror = json.loads(public.readFile(com_reg_mirror_file))
        except:
            com_reg_mirror = {
                "https://registry.docker-cn.com": "Official Docker China image accelerator",
                "https://mirror.ccs.tencentyun.com": "Tencent cloud image acceleration station",
                "https://ung2thfc.mirror.aliyuncs.com": "Ali Cloud image acceleration station",
            }

        if get.registry_mirrors_address not in com_reg_mirror:
            return public.returnMsg(True, "successfully delete！")

        del com_reg_mirror["{}".format(get.registry_mirrors_address)]
        public.writeFile(com_reg_mirror_file, json.dumps(com_reg_mirror, indent=2))
        dp.write_log("Remove common acceleration configuration successfully！")
        return public.returnMsg(True, "successfully delete！")

    def get_monitor_status(self):
        """
        获取docker监控状态
        @return:
        """
        res, err = public.ExecShell("ps aux|grep monitorModel.py|grep -v grep")

        if res:
            return True

        return False

    def set_docker_monitor(self, get):
        """
        开启docker监控获取docker相取资源信息
        :param act: start/stop
        :return:
        """
        import time
        python = "/www/server/panel/pyenv/bin/python"
        if not os.path.exists(python):
            python = "/www/server/panel/pyenv/bin/python3"
        cmd_line = "/www/server/panel/class/btdockerModel/monitorModel.py"
        if get.act == "start":
            self.stop_monitor(get)
            if not os.path.exists(self.moinitor_lock):
                public.writeFile(self.moinitor_lock, "1")

            shell = "nohup {} {} &".format(python, cmd_line)
            public.ExecShell(shell)
            time.sleep(1)
            if self.get_monitor_status():
                dp.write_log("Docker started monitoring successfully！")
                self.add_monitor_cron(get)
                return public.returnMsg(True, "Start monitoring successfully！")
            return public.returnMsg(False, "Failed to start monitoring！")
        else:
            if os.path.exists(self.moinitor_lock):
                os.remove(self.moinitor_lock)

            self.stop_monitor(get)
            return public.returnMsg(True, "Docker monitoring stopped successfully！")

    # 2024/1/4 上午 9:32 停止容器监控进程
    def stop_monitor(self, get):
        '''
            @name 名称/描述
            @param 参数名<数据类型> 参数描述
            @return 数据类型
        '''
        cmd_line = [
            "/www/server/panel/class/btdockerModel/monitorModel.py",
            "/www/server/panel/class/projectModel/bt_docker/dk_monitor.py"
        ]

        for cmd in cmd_line:
            in_pid = True
            sum = 0
            while in_pid:
                in_pid = False
                pid = dp.get_process_id(
                    "python",
                    "{}".format(cmd))
                if pid:
                    in_pid = True

                if not pid:
                    pid = dp.get_process_id(
                        "python3",
                        "{}".format(cmd)
                    )
                    if pid:
                        in_pid = True
                public.ExecShell("kill -9 {}".format(pid))
                sum += 1
                if sum > 100:
                    break

        import os

        # 指定目录路径
        directory = "/www/server/cron/"

        # 遍历目录下的所有非.log结尾的文件
        for filename in os.listdir(directory):
            if not filename.endswith(".log"):
                filepath = os.path.join(directory, filename)
                if os.path.isdir(filepath):
                    continue
                # 检查文件内容是否包含 "monitorModel.py"
                with open(filepath, 'r') as file:
                    content = file.read()
                    if "monitorModel.py" in content or "dk_monitor.py" in content:
                        # 删除原文件和对应的.log文件
                        if os.path.exists(filepath):
                            os.remove(filepath)
                        if os.path.exists(os.path.join(directory, "{}.log".format(filename))):
                            os.remove(os.path.join(directory, "{}.log".format(filename)))
                        public.ExecShell("crontab -l | sed '/{}/d' | crontab -".format(filename))

        dp.write_log("Docker monitoring stopped successfully！")

        public.M('crontab').where('name=?', ("[Do not delete] docker monitoring daemon",)).delete()
        return public.returnMsg(True, "Docker监控成功停止！")

    # 2023/12/7 下午 6:24 创建计划任务，监听监控进程是否存在，如果不存在则添加
    def add_monitor_cron(self, get):
        '''
            @name 名称/描述
            @author wzz <2023/12/7 下午 6:24>
            @param 参数名<数据类型> 参数描述
            @return 数据类型
        '''
        result = public.M('crontab').where('name', ("[Do not delete] docker monitoring daemon",)).count()
        print(result)
        import crontab
        if public.M('crontab').where('name', ("[Do not delete] docker monitoring daemon",)).count() == 0:
            p = crontab.crontab()
            llist = p.GetCrontab(None)

            if type(llist) == list:
                for i in llist:
                    if i['name'] == '[Do not delete] docker monitoring daemon':
                        return

            get = {
                "name": "[Do not delete] docker monitoring daemon",
                "type": "minute-n",
                "where1": 5,
                "hour": "",
                "minute": "",
                "week": "",
                "sType": "toShell",
                "sName": "",
                "backupTo": "localhost",
                "save": '',
                "sBody": """
if [ -f {} ]; then
    new_mt=`ps aux|grep monitorModel.py|grep -v grep`
    old_mt=`ps aux|grep dk_monitor.py|grep -v grep`

    if [ -z "$new_mt" ] && [ -z "$old_mt" ]; then
        nohup /www/server/panel/pyenv/bin/python /www/server/panel/class/btdockerModel/monitorModel.py &
    fi
fi
""".format(self.moinitor_lock),
                "urladdress": "undefined"
            }
            p.AddCrontab(get)

    def check_docker_compose_service(self):
        """
        检查docker-compose是否已经安装
        :return:
        """
        docker_compose = "/usr/bin/docker-compose"

        docker_compose_path = "{}/class/btdockerModel/config/docker_compose_path.pl".format(public.get_panel_path())
        if os.path.exists(docker_compose_path):
            docker_compose = public.readFile(docker_compose_path).strip()

        if not os.path.exists(docker_compose):
            dk_compose_list = ["/usr/libexec/docker/cli-plugins/docker-compose", "/usr/local/docker-compose"]
            for i in dk_compose_list:
                if os.path.exists(i):
                    public.ExecShell("ln -sf {} {}".format(i, "/usr/bin/docker-compose"))
                    break

        if not os.path.exists(docker_compose):
            return False, ""

        return True, docker_compose

    def check_docker_service(self):
        """
        检查docker是否安装
        @return:
        """
        docker = "/usr/bin/docker"
        if not os.path.exists(docker):
            return False
        return True

    def set_docker_compose_path(self, get):
        """
        设置docker-compose的路径
        @param get:
        @return:
        """
        docker_compose_file = get.docker_compose_path if "docker_compose_path" in get else ""
        if docker_compose_file == "":
            return public.returnMsg(False, "docker-compose file path cannot be empty！")

        if not os.path.exists(docker_compose_file):
            return public.returnMsg(False, "docker-compose file does not exist！")

        public.ExecShell("chmod +x {}".format(docker_compose_file))
        cmd_result = public.ExecShell("{} --version".format(docker_compose_file))
        if not cmd_result[0]:
            return public.returnMsg(False, "docker-compose file is not executable or is not a docker-compose file！")

        docker_compose_path = "{}/class/btdockerModel/config/docker_compose_path.pl".format(public.get_panel_path())

        public.writeFile(docker_compose_path, docker_compose_file)
        dp.write_log("Set docker-compose path successfully！")
        return public.returnMsg(True, "Successfully set！")

    def install_docker_program(self, get):
        """
        安装docker和docker-compose
        :param get:
        :return:
        """
        import time
        mmsg = "Install Docker service"
        execstr = "/bin/bash /www/server/panel/install/install_soft.sh 0 install docker_install"
        public.M('tasks').add('id,name,type,status,addtime,execstr',
                              (None, mmsg, 'execshell', '0',
                               time.strftime('%Y-%m-%d %H:%M:%S'), execstr))
        public.httpPost(
            public.GetConfigValue('home') + '/api/panel/plugin_total', {
                "pid": "1111111",
                'p_name': "Docker commercial module"
            }, 3)
        return public.returnMsg(True, "The installation task has been added to the queue！")

    def repair_docker(self, get):
        """
        修复docker
        @param get:
        @return:
        """
        import time
        mmsg = "Repair Docker service"
        execstr = "curl -fsSL https://get.docker.com -o /tmp/get-docker.sh && sed -i '/sleep 20/d' /tmp/get-docker.sh && /bin/bash /tmp/get-docker.sh"
        public.M('tasks').add('id,name,type,status,addtime,execstr',
                              (None, mmsg, 'execshell', '0',
                               time.strftime('%Y-%m-%d %H:%M:%S'), execstr))
        public.httpPost(
            public.GetConfigValue('home') + '/api/panel/plugin_total', {
                "pid": "1111111",
                'p_name': "Docker commercial module"
            }, 3)
        return public.returnMsg(True, "The repair task has been added to the queue！")

    def get_daemon_json(self, get):
        """
        获取daemon.json配置信息
        @param get:
        @return:
        """
        daemon_json = "/etc/docker/daemon.json"
        if not os.path.exists(daemon_json):
            return ""

        try:
            return json.loads(public.readFile(daemon_json))
        except Exception as e:
            print(e)
            return ""

    def save_daemon_json(self, get):
        """
        保存daemon.json配置信息，保存前备份，验证可以成功执行后再替换
        @param get:
        @return:
        """
        daemon_json = "/etc/docker/daemon.json"
        if getattr(get, "daemon_json", "") == "":
            public.ExecShell("rm -f {}".format(daemon_json))
            return public.returnMsg(True, "Saved successfully！")

        try:
            conf = json.loads(get.daemon_json)
            public.writeFile(daemon_json, json.dumps(conf, indent=2))
            dp.write_log("Save daemon.json configuration successfully！")
            return public.returnMsg(True, "Saved successfully！")
        except Exception as e:
            print(e)
            if "Expecting property name enclosed in double quotes" in str(e):
                return public.returnMsg(False, "Saving failed, reason: daemon.json configuration file format error！")

            return public.returnMsg(False, "Save failed, reason: {}！".format(e))
