# coding: utf-8
# -------------------------------------------------------------------
# 宝塔Linux面板
# -------------------------------------------------------------------
# Copyright (c) 2015-2099 宝塔软件(http://bt.cn) All rights reserved.
# -------------------------------------------------------------------
# Author: wzz <wzz@bt.cn>
# -------------------------------------------------------------------

import docker.errors
# ------------------------------
# Docker模型
# ------------------------------
import public

from btdockerModel import dk_public as dp
from btdockerModel.dockerBase import dockerBase


class main(dockerBase):

    def docker_client(self, url):
        return dp.docker_client(url)

    def get_network_id(self, get):
        """
        asdf
        @param get:
        @return:
        """
        networks = self.docker_client(self._url).networks
        network = networks.get(get.id)
        return network.attrs

    def get_host_network(self, get):
        """
        获取服务器的docker网络
        :param get:
        :return:
        """
        client = self.docker_client(self._url)
        if not client: return []

        networks = client.networks
        network_attr = self.get_network_attr(networks)
        data = list()

        for attr in network_attr:
            get.id = attr["Id"]
            c_result = self.get_network_id(get)
            subnet = ""
            gateway = ""
            if attr["IPAM"]["Config"]:
                if "Subnet" in attr["IPAM"]["Config"][0]:
                    subnet = attr["IPAM"]["Config"][0]["Subnet"]
                if "Gateway" in attr["IPAM"]["Config"][0]:
                    gateway = attr["IPAM"]["Config"][0]["Gateway"]

            tmp = {
                "id": attr["Id"],
                "name": attr["Name"],
                "time": attr["Created"],
                "driver": attr["Driver"],
                "subnet": subnet,
                "gateway": gateway,
                "labels": attr["Labels"],
                "used": 1 if c_result["Containers"] else 0,
                "containers": c_result["Containers"],
            }
            data.append(tmp)

        return sorted(data, key=lambda x: x['time'], reverse=True)

    def get_network_attr(self, networks):
        network = networks.list()
        return [i.attrs for i in network]

    def add(self, get):
        """
        :param name 网络名称
        :param driver  bridge/ipvlan/macvlan/overlay
        :param options Driver options as a key-value dictionary
        :param subnet '124.42.0.0/16'
        :param gateway '124.42.0.254'
        :param iprange '124.42.0.0/24'
        :param labels Map of labels to set on the network. Default None.
        :param remarks 备注
        :param get:
        :return:
        """
        import docker

        ipam_pool = docker.types.IPAMPool(
            subnet=get.subnet,
            gateway=get.gateway,
            iprange=get.iprange
        )

        ipam_config = docker.types.IPAMConfig(
            pool_configs=[ipam_pool]
        )

        try:
            self.docker_client(self._url).networks.create(
                name=get.name,
                options=dp.set_kv(get.options),
                driver="bridge",
                ipam=ipam_config,
                labels=dp.set_kv(get.labels)
            )
        except docker.errors.APIError as e:
            print(str(e))
            if "failed to allocate gateway" in str(e):
                return public.returnMsg(False, "The gateway setting is wrong, please enter the gateway corresponding to this subnet: {}".format(get.subnet))
            if "invalid CIDR address" in str(e):
                return public.returnMsg(False, "Subnet address format error, please enter for example: 172.16.0.0/16")
            if "invalid Address SubPool" in str(e):
                return public.returnMsg(False, "IP range format error, please enter the appropriate IP range for this subnet:".format(get.subnet))
            if "Pool overlaps with other one on this address space" in str(e):
                return public.returnMsg(False, "IP range [{}] already exists！".format(get.subnet))
            return public.returnMsg(False, "Failed to add network！ {}".format(str(e)))

        dp.write_log("Added network [{}] [{}] successful!".format(get.name, get.iprange))
        return public.returnMsg(True, "Added network successfully!")

    def del_network(self, get):
        """
        :param id
        :param get:
        :return:
        """
        try:
            networks = self.docker_client(self._url).networks.get(get.id)
            attrs = networks.attrs
            if attrs['Name'] in ["bridge", "none"]:
                return public.returnMsg(False, "The system default network cannot be deleted！")

            networks.remove()
            dp.write_log("Delete network [{}] successfully!".format(attrs['Name']))
            return public.returnMsg(True, "successfully delete！")

        except docker.errors.APIError as e:
            if " has active endpoints" in str(e):
                return public.returnMsg(False, "The network cannot be deleted while it is in use!")
            return public.returnMsg(False, "Delete failed! {}".format(str(e)))

    def prune(self, get):
        """
        删除无用的网络
        :param get:
        :return:
        """
        try:
            res = self.docker_client(self._url).networks.prune()
            if not res['NetworksDeleted']:
                return public.returnMsg(False, "There are no useless networks！")

            dp.write_log("Delete useless network successfully！")
            return public.returnMsg(True, "successfully delete！")

        except docker.errors.APIError as e:
            return public.returnMsg(False, "Delete failed！ {}".format(str(e)))

    def disconnect(self, get):
        """
        断开某个容器的网络
        :param id
        :param container_id
        :param get:
        :return:
        """
        try:
            networks = self.docker_client(self._url).networks.get(get.id)
            networks.disconnect(get.container_id)
            dp.write_log("Network disconnection [{}] successful!".format(get.id))
            return public.returnMsg(True, "Network disconnection was successful！")
        except docker.errors.APIError as e:
            if "No such container" in str(e):
                return public.returnMsg(False, "Container ID: {}, does not exist!".format(get.container_id))
            if "network" in str(e) and "Not Found" in str(e):
                return public.returnMsg(False, "Network ID: {}, does not exist!".format(get.id))
            return public.returnMsg(False, "Network disconnection failed! {}".format(str(e)))

    def connect(self, get):
        """
        连接到指定网络
        :param id
        :param container_id
        :param get:
        :return:
        """
        try:
            networks = self.docker_client(self._url).networks.get(get.id)
            networks.connect(get.container_id)
            dp.write_log("Network connection [{}] successful!".format(get.id))
            return public.returnMsg(True, "Network connection successful!")
        except docker.errors.APIError as e:
            if "No such container" in str(e):
                return public.returnMsg(False, "Container ID: {}, does not exist!".format(get.container_id))
            if "network" in str(e) and "Not Found" in str(e):
                return public.returnMsg(False, "Network ID: {}, does not exist!".format(get.id))
            return public.returnMsg(False, "Failed to connect to network! {}".format(str(e)))
