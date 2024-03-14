# coding: utf-8
# -------------------------------------------------------------------
# 宝塔Linux面板
# -------------------------------------------------------------------
# Copyright (c) 2015-2099 宝塔软件(http://bt.cn) All rights reserved.
# -------------------------------------------------------------------
# Author: cjxin <cjxin@bt.cn>
# -------------------------------------------------------------------
#
# ------------------------------

import os, sys, time, json, re
import traceback

if '/www/server/panel/class/' not in sys.path:
    sys.path.insert(0, '/www/server/panel/class/')
import public, db
import panelSite
from datalistModel.base import dataBase


class main(dataBase):
    web_server = None
    site_obj = None

    def __init__(self):
        self.site_obj = panelSite.panelSite()

    """
    @name 获取公共数据后，格式化为网站列表需要的数据
    """

    def get_data_list(self, get):
        try:
            get = self._get_site_args(get)
            data_list = get.data_list

            db_obj = public.M(get.table)
            domain_obj = public.M('domain')

            # 获取前端需要的表头
            from config import config
            table_header = config().get_table_header(public.to_dict_obj({'table_name': 'PHP_Site'}))
            if table_header['PHP_Site']:
                table_header["PHP_Site"] = json.loads(table_header["PHP_Site"])
                table_header = [i['title'] if 'title' in i else i['label'] for i in table_header["PHP_Site"] if
                                (i.get('value', False) == True) and ('label' in i.keys() or 'title' in i.keys())]
            else:
                table_header = ['WAF状态', '容量限制', '流量']
            # 付费插件内容，按需加载
            custom_list = {'WAF状态': 'waf', "容量限制": "quota", "流量": "net"}
            custom_conf = {'waf': {}, 'quota': {}, 'net': {}}
            default_quota = {
                "used": 0,
                "size": 0,
                "quota_push": {
                    "size": 0,
                    "used": 0,
                },
                "quota_storage": {
                    "size": 0,
                    "used": 0,
                }}
            paths = []
            names = []
            [paths.append(val['path']) or names.append(val['name']) for val in data_list]
            for i, j in custom_list.items():
                if i in table_header:
                    if j == 'quota':
                        custom_conf[j] = self.get_all_quota(paths)
                    if j == 'waf':
                        custom_conf[j] = self.get_waf_status_all(names)
                    if j == 'net':
                        site_netinfo = self.get_site_netinfo()
                        custom_conf[j] = {i: self.get_site_net(site_netinfo, names) for i in names}

            for val in data_list:
                val['backup_count'] = db_obj.table('backup').where("pid=? AND type=?", (val['id'], '0')).count()
                val['domain'] = domain_obj.where("pid=?", (val['id'],)).count()
                val['ssl'] = self.get_site_ssl_info(val['name'])
                val['php_version'] = self.get_php_version(val['name'])
                if not val['status'] in ['0', '1', 0, 1]:
                    val['status'] = '1'

                if not 'rname' in val or not val['rname']:
                    val['rname'] = val['name']

                # 是否有代理
                try:
                    val['proxy'] = False
                    if self.site_obj.GetProxyList(public.to_dict_obj({'sitename': val['name']})):
                        val['proxy'] = True
                except:
                    pass

                # 是否有重定向
                try:
                    val['redirect'] = False
                    if self.site_obj.GetRedirectList(public.to_dict_obj({'sitename': val['name']})):
                        val['redirect'] = True
                except:
                    pass

                val['ssl'] = self.get_site_ssl_info(val['name'])

                # 付费插件内容，按需加载
                val['waf'] = custom_conf["waf"].get(val['name'], {})
                val['quota'] = custom_conf['quota'].get(val['path'], default_quota)
                val['net'] = custom_conf['net'].get(val['name'], {})
            return data_list
        except:
            pass

    """
    @name 初始化参数
    """

    def _get_site_args(self, get):
        try:
            if not 'type' in get:
                get.type = 0
                get.type = int(get.p)
        except:
            get.type = 0

        if not 'project_type' in get:
            get.project_type = 'PHP'

        get.search_key = get.project_type.lower()
        return get

    """
    @name 追加 or条件
    """

    def get_search_where(self, get):

        # 增加域名搜索
        where = ''
        params = get.params

        conditions = ''
        if '_' in get.search:
            conditions = " escape '/'"

        pids = []
        nlist = public.M('domain').where("name LIKE ?{}".format(conditions), ("%{}%".format(get.search),)).field('pid').select()
        for val in nlist:
            pids.append(str(val['pid']))

        if pids:
            where = "{} OR id IN ({})".format(get.where, ','.join(pids))
        else:
            where = get.where
        return where, params

    """
    @获取网站查询条件，追加and查询条件
    """


    def get_data_where(self, get):

        wheres = []
        get = self._get_site_args(get)

        wheres.append(("(project_type = ?)", (get.project_type)))
        if get.project_type == 'PHP':
            if int(get.type) != -1:
                if int(get.type) == -2:
                    wheres.append("(stop = {})".format(get.type))
                else:
                    wheres.append("(type_id = {})".format(get.type))

        return wheres

    def get_site_ssl_info(self, siteName):
        try:
            s_file = 'vhost/nginx/{}.conf'.format(siteName)
            is_apache = False
            if not os.path.exists(s_file):
                s_file = 'vhost/apache/{}.conf'.format(siteName)
                is_apache = True

            if not os.path.exists(s_file):
                return -1

            s_conf = public.readFile(s_file)
            if not s_conf: return -1
            ssl_file = None
            if is_apache:
                if s_conf.find('SSLCertificateFile') == -1:
                    return -1
                s_tmp = re.findall(r"SSLCertificateFile\s+(.+\.pem)", s_conf)
                if not s_tmp: return -1
                ssl_file = s_tmp[0]
            else:
                if s_conf.find('ssl_certificate') == -1:
                    return -1
                s_tmp = re.findall(r"ssl_certificate\s+(.+\.pem);", s_conf)
                if not s_tmp: return -1
                ssl_file = s_tmp[0]
            ssl_info = self.get_cert_end(ssl_file)
            if not ssl_info: return -1
            ssl_info['endtime'] = int(
                int(time.mktime(time.strptime(ssl_info['notAfter'], "%Y-%m-%d")) - time.time()) / 86400)
            return ssl_info
        except:
            return -1

    def get_php_version(self, siteName):
        try:
            if not self.web_server:
                self.web_server = public.get_webserver()

            spath = public.get_panel_path()
            conf = public.readFile('{}/vhost/{}/{}.conf'.format(spath, self.web_server, siteName))

            if self.web_server == 'openlitespeed':
                conf = public.readFile(spath + '/vhost/' + self.web_server + '/detail/' + siteName + '.conf')
            if self.web_server == 'nginx':
                rep = r"enable-php-(\w{2,5})\.conf"
            elif self.web_server == 'apache':
                rep = r"php-cgi-(\w{2,5})\.sock"
            else:
                rep = r"path\s*/usr/local/lsws/lsphp(\d+)/bin/lsphp"
            tmp = re.search(rep, conf).groups()
            if tmp[0] == '00':
                return '静态'
            if tmp[0] == 'other':
                return '其它'

            return tmp[0][0] + '.' + tmp[0][1]
        except:
            return '静态'

    def get_site_net(self, info, siteName):
        """
        @name 获取网站流量
        @param siteName<string> 网站名称
        @return dict
        """
        try:
            if info['status']: info = info['data']
            if siteName in info:
                return info[siteName]
        except:
            pass
        return {}

    def get_site_netinfo(self):
        """
        @name 获取网站流量
        """
        try:
            import PluginLoader
            args = public.dict_obj()
            args.model_index = 'panel'
            res = PluginLoader.module_run("total", "get_site_traffic", args)

            return res
        except:
            pass
        return {}

    def get_site_net(self, info, siteName):
        """
        @name 获取网站流量
        @param siteName<string> 网站名称
        @return dict
        """
        try:
            if info['status']: info = info['data']
            if siteName in info:
                return info[siteName]
        except:
            pass
        return {}

    def get_waf_status_all(self, names):
        """
        @name 获取waf状态
        """
        data = {}
        try:
            path = '/www/server/btwaf/site.json'
            res = json.loads(public.readFile(path))

            for site in res:
                data[site] = {}
                data[site]['status'] = True
                if 'open' in res[site]:
                    data[site]['status'] = res[site]['open']
        except:
            pass
        data = {i: data[i] if i in data else {} for i in names}
        return data


    def get_cert_end(self, pem_file):
        try:
            import OpenSSL
            result = {}

            x509 = OpenSSL.crypto.load_certificate(
                OpenSSL.crypto.FILETYPE_PEM, public.readFile(pem_file))
            # 取产品名称
            issuer = x509.get_issuer()
            result['issuer'] = ''
            if hasattr(issuer, 'CN'):
                result['issuer'] = issuer.CN
            if not result['issuer']:
                is_key = [b'0', '0']
                issue_comp = issuer.get_components()
                if len(issue_comp) == 1:
                    is_key = [b'CN', 'CN']
                for iss in issue_comp:
                    if iss[0] in is_key:
                        result['issuer'] = iss[1].decode()
                        break
            # 取到期时间
            result['notAfter'] = self.strf_date(
                bytes.decode(x509.get_notAfter())[:-1])
            # 取申请时间
            result['notBefore'] = self.strf_date(
                bytes.decode(x509.get_notBefore())[:-1])
            # 取可选名称
            result['dns'] = []
            for i in range(x509.get_extension_count()):
                s_name = x509.get_extension(i)
                if s_name.get_short_name() in [b'subjectAltName', 'subjectAltName']:
                    s_dns = str(s_name).split(',')
                    for d in s_dns:
                        result['dns'].append(d.split(':')[1])
            subject = x509.get_subject().get_components()
            # 取主要认证名称
            if len(subject) == 1:
                result['subject'] = subject[0][1].decode()
            else:
                result['subject'] = result['dns'][0]
            return result
        except:

            return public.get_cert_data(pem_file)

    # 转换时间
    def strf_date(self, sdate):
        return time.strftime('%Y-%m-%d', time.strptime(sdate, '%Y%m%d%H%M%S'))