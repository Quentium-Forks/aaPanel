# coding: utf-8
# -------------------------------------------------------------------
# 宝塔Linux面板
# -------------------------------------------------------------------
# Copyright (c) 2015-2099 宝塔软件(http://bt.cn) All rights reserved.
# -------------------------------------------------------------------
# Author: cjxin <cjxin@bt.cn>
# -------------------------------------------------------------------
# 面板获取列表公共库
# ------------------------------

import os, sys, time, json, re
import traceback

panelPath = '/www/server/panel'
if not panelPath + "/class/" in sys.path:
    sys.path.insert(0, panelPath + "/class/")
import public, db


class main:
    siteorder_path = None
    __panel_path = public.get_panel_path()
    __SORT_DATA = ['site_ssl','rname', 'php_version', 'backup_count', 'status', 'edate', 'total_flow', '7_day_total_flow', 'one_day_total_flow',
                   'one_hour_total_flow']

    sort_file = None
    web_server = None
    setupPath = '/www/server'
    def __init__(self):
        self.limit_path = '{}/data/limit.pl'.format(self.__panel_path)
        self.siteorder_path = '{}/data/siteorder.pl'.format(self.__panel_path)
        self.sort_file = '{}/data/sort_list.json'.format(self.__panel_path)

    """
    @name 获取表数据
    @param table 表名
    @param p 分页
    @param limit 条数
    @param search 搜索
    @param type 类型
    """

    # 删除排序
    def del_sorted(self, get):
        try:
            public.ExecShell("rm -rf {}".format(self.siteorder_path))
            return public.returnMsg(True, '清除排序成功！')
        except:
            return public.returnMsg(False, '清除排序失败！')

    # 设置置顶
    def setSort(self, get=None):
        """
        设置置顶
        :param get: id
        :return:
        """
        file_path = os.path.join(public.get_panel_path(), "data/sort_list.json")
        if os.path.exists(file_path):
            task_top = json.loads(public.readFile(file_path))
        else:
            task_top = {'list': []}
        if get and hasattr(get, 'id'):
            task_top['list'] = [i for i in task_top['list'] if i != get['id']]
            task_top['list'].append(get['id'])
            public.writeFile(file_path, json.dumps(task_top))
            return public.returnMsg(True, '设置置顶成功！')
        return task_top
    def check_and_add_stop_column(self):

            # 尝试查询sites表中的stop字段，以检查它是否存在
            # query_result1 = public.M('sites').field(self.field).select()
            # cront = public.M('crontab').order("id desc").field(self.field).select()
            # print(query_result1)
            query_result = public.M('sites').field('stop').select()
            print(query_result)
            if "no such column: stop" in query_result:
                    try:
                        # alter_sql = "ALTER TABLE sites ADD COLUMN stop INTEGER DEFAULT 0"
                        # public.M('sites').execute(alter_sql, ())
                        public.M('sites').execute("ALTER TABLE 'sites' ADD 'stop' TEXT DEFAULT ''", ())
                        print("添加字段成功.")
                    except Exception as e:
                        print(e)

    def get_data_list(self, get):
            table = get.table
            # data = self.GetSql(get)
            SQL = public.M(table)
            try:
                self.check_and_add_stop_column()
                if get.table == 'sites':
                    if not hasattr(get, 'order'):
                        if os.path.exists(self.siteorder_path):
                            order = public.readFile(self.siteorder_path)
                            if order.split(' ')[0] in self.__SORT_DATA:
                                get.order = order
                    else:
                        public.writeFile(self.siteorder_path, get.order)
                    if not hasattr(get, 'limit') or get.limit == '' or int(get.limit) == 0:
                        try:
                            if os.path.exists(self.limit_path):
                                get.limit = int(public.readFile(self.limit_path))
                            else:
                                get.limit = 20
                        except:
                            get.limit = 20
                    else:
                        public.writeFile(self.limit_path, get.limit)
                if not hasattr(get, 'order'):
                    get.order = 'addtime desc'
                get = self._get_args(get)
                try:
                    s_list = self.func_models(get, 'get_data_where')
                except:
                    s_list = []

                where_sql, params = self.get_where(get, s_list)
                data = self.get_page_data(get, where_sql, params)


                for i in range(len(data['data'])):
                    # 添加字段
                    data['data'][i]['attack'] = self.get_analysis(get, data['data'][i])
                    data['data'][i]['domain'] = SQL.table('domain').where("pid=?",
                                                                          (data['data'][i]['id'],)).count()
                    ssl_info = self.get_site_ssl_info(data['data'][i]['name'])
                    data['data'][i]['ssl'] = ssl_info
                    data['data'][i]['site_ssl'] = ssl_info['endtime'] if ssl_info != -1 else -1
                    data['data'][i]['php_version'] = self.get_php_version(data['data'][i]['name'])
                    data['data'][i]['project_type'] = \
                    SQL.table('sites').where('id=?', (data['data'][i]['id'])).field('project_type').find()[
                        'project_type']
                    if data['data'][i]['project_type'] == 'WP':
                        data['data'][i]['cache_status'] = one_key_wp.one_key_wp().get_cache_status(data['data'][i]['id'])
                    if not data['data'][i]['status'] in ['0', '1', 0, 1]:
                        data['data'][i]['status'] = '1'
                    data['data'][i]['quota'] = self.get_site_quota(data['data'][i]['path'])

                    # 没有别名用原名代替
                    data['data'][i]['rname'] = data['data'][i].get("rname", "")
                    # public.print_log('网站信息@@@@@@@@@@@@@@@:  {}'.format(data['data'][i]['rname']))
                    if data['data'][i]['rname'] == '':
                        data['data'][i]['rname'] = data['data'][i]['name']

                    # 备份数
                    backup_count = 0
                    try:
                        backup_count = SQL.table('backup').where("pid=? AND type=?",
                                                                 (data['data'][i]['id'], 0)).count()
                    except:
                        pass
                    data['data'][i]['backup_count'] = backup_count



                    get.data_list = data['data']

                try:
                    self.func_models(get, 'get_data_list')
                except :
                    public.print_log(traceback.format_exc())

                if get.table == 'sites':

                    if isinstance(data, dict):
                        file_path = os.path.join(public.get_panel_path(), "data/sort_list.json")
                        if os.path.exists(file_path):
                            sort_list_raw = public.readFile(file_path)
                            sort_list = json.loads(sort_list_raw)
                            sort_list_int = [int(item) for item in sort_list["list"]]

                            for i in range(len(data['data'])):
                                if int(data['data'][i]['id']) in sort_list_int:
                                    data['data'][i]['sort'] = 1
                                else:
                                    data['data'][i]['sort'] = 0


                            top_list = sort_list["list"]
                            if top_list:
                                top_list = top_list[::-1]
                            top_data = [item for item in data["data"] if str(item['id']) in top_list]
                            data1 = [item for item in data["data"] if str(item['id']) not in top_list]
                            top_data.sort(key=lambda x: top_list.index(str(x['id'])))
                            data['data'] = top_data + data1

                public.set_search_history(get.table, get.search_key, get.search)  # 记录搜索历史

                # 字段排序
                data = self.get_sort_data(data)
                if 'type_id' in get:
                    type_id=int(get['type_id'])
                    if type_id:
                        filtered_data = []
                        target_type_id = type_id
                        # print(data['data'])
                        for item in data['data']:
                            if item.get('type_id') == target_type_id:
                                filtered_data.append(item)
                        data['data'] = filtered_data
                    if get.get("db_type",""):
                        if  type_id < 0:
                            filtered_data = []
                            target_type_id = type_id
                            for item in data['data']:
                                if item.get('type_id') == target_type_id:
                                    filtered_data.append(item)
                            data['data'] = filtered_data
                return data
            except:
                return traceback.format_exc()
    def get_site_quota(self,path):
        '''
            @name 获取网站目录配额信息
            @author hwliang<2022-02-15>
            @param path<string> 网站目录
            @return dict
        '''
        res = {'size':0 ,'used':0 }
        try:
            from projectModel.quotaModel import main
            quota_info =  main().get_quota_path_list(get_path = path)
            if isinstance(quota_info,dict):
                return quota_info
            return res
        except: return res
    def get_analysis(self,get,i):
        import log_analysis
        get.path = '/www/wwwlogs/{}.log'.format(i['name'])
        get.action = 'get_result'
        data = log_analysis.log_analysis().get_result(get)
        return int(data['php']) + int(data['san']) + int(data['sql']) + int(data['xss'])
    def get_site_ssl_info(self,siteName):
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
                s_tmp = re.findall(r"SSLCertificateFile\s+(.+\.pem)",s_conf)
                if not s_tmp: return -1
                ssl_file = s_tmp[0]
            else:
                if s_conf.find('ssl_certificate') == -1:
                    return -1
                s_tmp = re.findall(r"ssl_certificate\s+(.+\.pem);",s_conf)
                if not s_tmp: return -1
                ssl_file = s_tmp[0]
            ssl_info = self.get_cert_end(ssl_file)
            if not ssl_info: return -1
            ssl_info['endtime'] = int(int(time.mktime(time.strptime(ssl_info['notAfter'], "%Y-%m-%d")) - time.time()) / 86400)
            return ssl_info
        except: return -1


    def get_cert_end(self,pem_file):
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


    def get_php_version(self,siteName):
        try:

            if not self.web_server:
                self.web_server = public.get_webserver()

            conf = public.readFile(self.setupPath + '/panel/vhost/'+self.web_server+'/'+siteName+'.conf')
            if self.web_server == 'openlitespeed':
                conf = public.readFile(
                    self.setupPath + '/panel/vhost/' + self.web_server + '/detail/' + siteName + '.conf')
            if self.web_server == 'nginx':
                rep = r"enable-php-(\w{2,5})[-\w]*\.conf"
            elif self.web_server == 'apache':
                rep = r"php-cgi-(\w{2,5})\.sock"
            else:
                rep = r"path\s*/usr/local/lsws/lsphp(\d+)/bin/lsphp"
            tmp = re.search(rep,conf).groups()
            if tmp[0] == '00':
                return 'Static'
            if tmp[0] == 'other':
                return 'Other'

            return tmp[0][0] + '.' + tmp[0][1]
        except:
        # except Exception as e:
            # public.print_log("########## {}".format(e))
            return 'Static'
    """
    @name 获取查询条件
    @param s_list 查询条件
    """

    def get_where(self, get, s_list):

        search = get.search.strip()
        where, param = self._get_search_where(get.table, search)

        wheres = []
        params = list(param)
        if search:
            try:
                get.where = where
                get.params = params
                where, params = self.func_models(get, 'get_search_where')
            except:
                pass

        if where:
            wheres = ['({})'.format(where)]

        for val in s_list:
            if type(val) == str:
                wheres.append(val)
            else:
                wheres.append(val[0])
                if type(val[1]) == str:
                    params.append(val[1])
                elif type(val[1]) == tuple:
                    params += list(val[1])
                else:
                    params += val[1]
                    
        where_sql = ' AND '.join(wheres)
        if hasattr(get, 'sid'):
            if where:
                where += " AND sid='{}'".format(int(get.sid))
            else:
                where = "sid='{}'".format(int(get.sid))
            if where:
                where_sql = ' AND '.join([where_sql, where])
        return where_sql, params

    def get_page_data(self, get, where_sql, params, result='1,2,3,4,5,8'):
        # 包含分页类
        import page
        # 实例化分页类
        page = page.Page()

        db_obj = public.M(get.table)

        if type(params) == list:
            params = tuple(params)
        info = {}
        info['p'] = get.p
        info['row'] = get.limit
        info['count'] = db_obj.table(get.table).where(where_sql, params).count()

        try:
            from flask import request
            info['uri'] = public.url_encode(request.full_path)
        except:
            info['uri'] = ''
        info['return_js'] = ''
        if hasattr(get, 'tojs'):
            if re.match(r"^[\w\.\-]+$", get.tojs):
                info['return_js'] = get.tojs

        data = {}
        data['where'] = where_sql
        data['page'] = page.GetPage(info, result)
        o_list = get.order.split(' ')
        if o_list[0] in self.__SORT_DATA:
            data['data'] = db_obj.table(get.table).where(where_sql, params).select()
            data['plist'] = {'shift': page.SHIFT, 'row': page.ROW, 'order': get.order}
        else:
            data['data'] = db_obj.table(get.table).where(where_sql, params).order(get.order).limit(str(page.SHIFT) + ',' + str(page.ROW)).select()

        data['search_history'] = []
        if 'search_key' in get and get['search_key']:
            data['search_history'] = public.get_search_history(get.table, get['search_key'])
        return data

    def get_sort_data(self, data):
        """
        @获取自定义排序数据
        @param data: 数据
        """
        if 'plist' in data:
            plist = data['plist']
            o_list = plist['order'].split(' ')

            reverse = False
            sort_key = o_list[0].strip()

            try:
                if o_list[1].strip() == 'desc':
                    reverse = True
            except:
                reverse = False

            if sort_key in ['site_ssl']:
                for info in data['data']:
                    if type(info['ssl']) == int:
                        info[sort_key] = info['ssl']
                    else:
                        try:
                            info[sort_key] = info['ssl']['endtime']
                        except:
                            info[sort_key] = ''
            elif sort_key in ['total_flow', 'one_hour_total_flow', '7_day_total_flow', 'one_day_total_flow']:
                for info in data['data']:
                    info[sort_key] = 0
                    try:
                        if 'net' in info and sort_key in info['net']:
                            info[sort_key] = info['net'][sort_key]
                    except:
                        pass
            for i in data['data']:
                if not i.get('rname'):
                    i['rname'] = i['name']
            sort_reverse = 1 if reverse is True else 0
            data['data'].sort(key=lambda x: (x.get('sort', 0) == sort_reverse, x[sort_key]), reverse=reverse)
            data['data'] = data['data'][plist['shift']: plist['shift'] + plist['row']]

        return data

    """
    @name 设置备注
    """

    def _setPs(self, table, id, ps):
        if public.M(table).where('id=?', (id,)).setField('ps', public.xssencode2(ps)):
            return public.returnMsg(True, 'EDIT_SUCCESS')
        return public.returnMsg(False, 'EDIT_ERROR')

    def _get_search_where(self, table, search):

        where = ''
        params = ()
        if search:
            try:
                search = re.search(r"[\w\x80-\xff\.\_\-]+", search).group()
            except:
                return where, params
            conditions = ''
            if '_' in search:
                search = str(search).replace("_", "/_")
                conditions = " escape '/'"
            wheres = {
                'sites': ("name LIKE ?{} OR ps LIKE ?{}".format(conditions, conditions), ('%' + search + '%', '%' + search + '%')),
                'ftps': ("name LIKE ?{} OR ps LIKE ?{}".format(conditions, conditions), ('%' + search + '%', '%' + search + '%')),
                'databases': ("(name LIKE ?{} OR ps LIKE ?{})".format(conditions, conditions), ("%" + search + "%", "%" + search + "%")),
                'crontab': ("name LIKE ?{}".format(conditions), ('%' + (search) + '%')),
                'logs': ("username=?{} OR type LIKE ?{} OR log{} LIKE ?{}".format(conditions, conditions, conditions, conditions), (search, '%' + search + '%', '%' + search + '%')),
                'backup': ("pid=?", (search,)),
                'users': ("id='?' OR username=?{}".format(conditions), (search, search)),
                'domain': ("pid=? OR name=?{}".format(conditions), (search, search)),
                'tasks': ("status=? OR type=?", (search, search)),
            }
        try:
            return wheres[table]
        except:
            return '', ()

    """
    @name 格式化公用参数
    """

    def _get_args(self, get):
        try:
            if not 'p' in get:
                get.p = 1
            get.p = int(get.p)
        except:
            get.p = 1

        try:
            if not 'limit' in get:
                get.limit = 20
            get.limit = int(get.limit)
        except:
            get.limit = 20
        search_key = {
            "sites": "php",
            "ftps": "ftps",
            "databases": 'mysql'
        }
        get.search_key = search_key.get(get.table, get.table)
        if not 'search' in get:
            get.search = ''

        if '_' in get.search:
            get.search = get.search.replace("_", "/_")

        if not 'order' in get:
            get.order = 'id desc'
        return get

    def get_objectModel(self):
        '''
        获取模型对象
        '''
        from panelController import Controller
        project_obj = Controller()

        return project_obj
    # def_name: get_data_list
    def func_models(self, get, def_name):
        '''
        获取模型对象
        '''

        sfile = '{}/class/datalistModel/{}Model.py'.format(self.__panel_path, get.table)
        if not os.path.exists(sfile):
            raise Exception('模块文件{}不存在'.format(sfile))
        obj_main = self.get_objectModel()

        args = public.dict_obj()
        args['data'] = get
        args['mod_name'] = get.table
        args['def_name'] = def_name

        return obj_main.model(args)

    def get_path_quota(self, get):
        '''
            @name 获取网站目录配额信息
            @author hwliang<2022-02-15>
            @param path<string> 网站目录
            @return dict
        '''
        res = {
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
        if not 'path' in get:
            return res
        path = get.path
        data = res
        try:
            import PluginLoader
            quota_info = PluginLoader.module_run('quota', 'get_quota_path', path)
            if isinstance(quota_info, dict):
                quota_info["size"] = quota_info["quota_storage"]["size"]
                data = quota_info
        except:
            pass
        return data
