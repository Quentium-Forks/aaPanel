# coding: utf-8
# -------------------------------------------------------------------
# 宝塔Linux面板
# -------------------------------------------------------------------
# Copyright (c) 2014-2099 宝塔软件(http://bt.cn) All rights reserved.
# -------------------------------------------------------------------
# Author: lwh <2023-08-01>
# -------------------------------------------------------------------

# 面板安全风险一键修复
# ------------------------------
import json
import os
import sys

from safeModel.base import safeBase

os.chdir("/www/server/panel")
sys.path.append("class/")
import public, config, datetime


class main(safeBase):
    __path = '/www/server/panel/data/warning_report'
    __risk = __path + '/risk'
    __data = __path + '/data.json'
    new_result = "/www/server/panel/data/warning/resultresult.json"
    data = []
    final_obj = {}
    all_cve = 0
    cve_num = 0
    high_cve = 0
    mid_cve = 0
    low_cve = 0
    cve_list = []
    high_warn = 0
    mid_warn = 0
    low_warn = 0
    high_warn_list = []
    mid_warn_list = []
    low_warn_list = []
    auto_fix = []  # 自动修复列表

    def __init__(self):
        self.configs = config.config()
        if not os.path.exists(self.__path):
            os.makedirs(self.__path, 384)

    def get_report(self, get):
        '''
        获取html报告数据
        '''
        public.set_module_logs("report", "get_report")
        self.cve_list = []
        self.high_warn_list = []
        self.mid_warn_list = []
        self.low_warn_list = []
        # if not os.path.exists(self.__data):
        #     return public.returnMsg(False, '导出失败，未发现扫描结果')
        # data = json.loads(public.readFile(self.__data))
        # 获取最新的检测结果
        if not os.path.exists(self.new_result):
            return public.returnMsg(False, "No detection results were found, please perform home security risk scan first.")
        cve_result = json.loads(public.ReadFile(self.new_result))

        first = {}
        first["date"] = cve_result["check_time"]  # 带有时间的检测日期
        first["host"] = public.get_hostname()  # 主机名
        first["ip"] = public.get_server_ip()  # 外网IP
        first["local_ip"] = public.GetLocalIp()  # 内网IP
        # if os.path.exists("/www/server/panel/data/warning/result.json"):
        #     with open("/www/server/panel/data/warning/result.json") as f:
        #         cve_result = json.load(f)
        #         public.print_log(cve_result)
        #         self.cve_list = cve_result["risk"]
        #         self.high_cve = cve_result["count"]["serious"]
        #         self.mid_cve = cve_result["count"]["high_risk"]
        #         self.low_cve = cve_result["count"]["moderate_risk"]
        #         self.all_cve = cve_result["vul_count"]

        if "risk" not in cve_result:
            return public.returnMsg(False, "The risk field was not found")
        # 获取可自动修复列表
        if "is_autofix" in cve_result:
            self.auto_fix = cve_result["is_autofix"]
        for risk in cve_result["risk"]:
            # 若为漏洞
            if risk["title"].startswith("CVE") or risk["title"].startswith("RH"):
                self.cve_list.append(risk)
                self.cve_num += 1
                if risk["level"] == 3:
                    self.high_cve += 1
                elif risk["level"] == 2:
                    self.mid_cve += 1
                elif risk["level"] == 1:
                    self.low_cve += 1
                else:
                    self.cve_num -= 1
                    continue
            # 其余为风险
            else:
                if risk["level"] == 3:
                    self.high_warn += 1
                    self.high_warn_list.append(risk)
                elif risk["level"] == 2:
                    self.mid_warn += 1
                    self.mid_warn_list.append(risk)
                elif risk["level"] == 1:
                    self.low_warn += 1
                    self.low_warn_list.append(risk)
                else:
                    continue
        # for d in data["risk"]:
        #     if "title" in d:
        #         if d["level"] == 3:
        #             self.high_warn += 1
        #             self.high_warn_list.append(d)
        #         elif d["level"] == 2:
        #             self.mid_warn += 1
        #             self.mid_warn_list.append(d)
        #         else:
        #             self.low_warn += 1.
        #             self.low_warn_list.append(d)

        if self.high_warn + self.high_cve > 1:
            total_level = 'bad'
            level_color = 'bad'
        elif self.mid_warn + self.mid_cve > 10 or self.high_warn + self.high_cve == 1:
            total_level = 'good'
            level_color = 'good'
        else:
            total_level = 'excellent'
            level_color = 'excellent'
        # self.cve_num = self.high_cve + self.mid_cve + self.low_cve
        level_reason = "Server found no major security risk, continue to maintain！"
        if total_level == "bad":
            level_reason = "The server has high security risks or system vulnerabilities, which may lead to hacker intrusion，<span style=\"" \
                           "font-size: 1.1em;font-weight: 700;color: red;\">Please fix it ASAP！</span>"
        if total_level == "good":
            level_reason = "The server discovers potential security risks，<span style=\"" \
                           "font-size: 1.1em;font-weight: 700;color: red;\">Recommended to fix ASAP！</span>"
        warn_level = 'excellent'
        if self.high_warn > 0:
            warn_level = 'bad'
            first_warn = "Found {} high-risk security risks".format(self.high_warn)
        elif self.mid_warn > 5:
            warn_level = 'good'
            first_warn = "More medium-risk security risks were found"
        else:
            first_warn = "No major security risk was found"
        cve_level = 'excellent'
        if self.cve_num > 1:
            cve_level = 'bad'
            first_cve = "More system vulnerabilities were found {}".format(self.cve_num)
        elif self.cve_num == 1:
            cve_level = 'good'
            first_cve = "A small number of system vulnerabilities were found"
        else:
            first_cve = "No system vulnerability was found"
        second = {}
        long_date = cve_result["check_time"]  # 带有时间的检测日期
        date_obj = datetime.datetime.strptime(long_date, "%Y/%m/%d %H:%M:%S")
        second["date"] = date_obj.strftime("%Y/%m/%d")
        second["last_date"] = (date_obj - datetime.timedelta(days=6)).strftime("%Y/%m/%d")
        second["level_color"] = level_color
        second["total_level"] = total_level
        second["level_reason"] = level_reason
        second["warn_level"] = warn_level
        second["first_warn"] = first_warn
        second["cve_level"] = cve_level
        second["first_cve"] = first_cve
        third = {}
        # 获取扫描记录
        warn_times = 0
        repair_times = 0
        record_file = self.__path + "/record.json"
        if os.path.exists(record_file):
            record = json.loads(public.ReadFile(record_file))
            for r in record["scan"]:
                warn_times += r["times"]
            for r in record["repair"]:
                repair_times += r["times"]
        # with open(self.__path+"/record.json", "r") as f:
        #     record = json.load(f)
        # for r in record["scan"]:
        #     warn_times += r["times"]
        # for r in record["repair"]:
        #     repair_times += r["times"]
        third["warn_times"] = warn_times
        third["cve_times"] = warn_times
        third["repair_times"] = repair_times
        third["last_month"] = (date_obj - datetime.timedelta(days=6)).strftime("%m")
        third["last_day"] = (date_obj - datetime.timedelta(days=6)).strftime("%d")
        third["month"] = date_obj.strftime("%m")
        third["day"] = date_obj.strftime("%d")
        third["second_warn"] = "Daily login panel, routine server security risk detection."
        if self.cve_num > 0:
            third["second_cve"] = "The system kernel version and popular applications were scanned for vulnerabilities, and the vulnerability risk was found."
        else:
            third["second_cve"] = "The system kernel version and popular applications were scanned for vulnerabilities, and no vulnerability risk was found."
        third["repair"] = "Perform a one-click fix to resolve a security issue."
        fourth = {}

        fourth["warn_num"] = len(self.high_warn_list)
        fourth["cve_num"] = self.cve_num
        fourth["web_num"] = 41
        fourth["sys_num"] = 29
        fourth["cve_num"] = 5599
        fourth["kernel_num"] = 5
        fourth["high_cve"] = str(self.high_cve)
        if self.high_cve == 0:
            fourth["high_cve"] = "not found"
        fourth["mid_cve"] = str(self.mid_cve)
        if self.mid_cve == 0:
            fourth["mid_cve"] = "not found"
        fourth["low_cve"] = str(self.low_cve)
        if self.low_cve == 0:
            fourth["low_cve"] = "not found"
        fourth["high_warn"] = str(self.high_warn)
        if self.high_warn == 0:
            fourth["high_warn"] = "nothing"
        fourth["mid_warn"] = str(self.mid_warn)
        if self.mid_warn == 0:
            fourth["mid_warn"] = "nothing"
        fourth["low_warn"] = str(int(self.low_warn))
        if self.low_warn == 0:
            fourth["low_warn"] = "nothing"
        fifth = {}
        num = 1  # 序号
        focus_high_list = []
        for hwl in self.high_warn_list:
            focus_high_list.append(
                {
                    "num": str(num),
                    "name": "High risk \n\n"+str(hwl["msg"]),
                    "ps": str(hwl["ps"]),
                    "tips": '\n'.join(hwl["tips"]),
                    "auto": self.is_autofix1(hwl["m_name"])
                }
            )
            num += 1
        fifth["focus_high_list"] = focus_high_list
        focus_mid_list = []
        for mwl in self.mid_warn_list:
            focus_mid_list.append(
                {
                    "num": num,
                    "name": "Medium risk \n\n"+mwl["msg"],
                    "ps": mwl["ps"],
                    "tips": '\n'.join(mwl["tips"]),
                    "auto": self.is_autofix1(mwl["m_name"])
                }
            )
            num += 1
        fifth["focus_mid_list"] = focus_mid_list
        focus_cve_list = []
        for cl in self.cve_list:
            tmp_cve = {
                    "num": num,
                    "name": "High risk vulnerability \n\n"+cl["m_name"],
                    "ps": cl["ps"],
                    "tips": '\n'.join(cl["tips"]),
                    "auto": "support"
                }
            if cl["level"] == 2:
                tmp_cve["name"] = "Medium risk vulnerability \n\n"+cl["m_name"]
            elif cl["level"] == 1:
                tmp_cve["name"] = "Low risk vulnerability \n\n"+cl["m_name"]
            focus_cve_list.append(tmp_cve)
            num += 1
        fifth["focus_cve_list"] = focus_cve_list
        sixth = {}
        num = 1  # 序号
        low_warn_list = []
        for lwl in self.low_warn_list:
            low_warn_list.append(
                {
                    "num": str(num),
                    "name": "Low risk \n\n"+str(lwl["msg"]),
                    "ps": str(lwl["ps"]),
                    "tips": '\n'.join(lwl["tips"]),
                    "auto": self.is_autofix1(lwl["m_name"])
                }
            )
            num += 1
        sixth["low_warn_list"] = low_warn_list
        ignore_list = []
        for ig in cve_result["ignore"]:
            if "title" in ig:
                ignore_list.append(
                    {
                        "num": num,
                        "name": "Ignoring items \n\n"+ig["msg"],
                        "ps": ig["ps"],
                        "tips": '\n'.join(ig["tips"]),
                        "auto": self.is_autofix(ig)
                    }
                )
            elif "cve_id" in ig:
                ignore_list.append(
                    {
                        "num": num,
                        "name": "Ignoring items \n\n"+ig["cve_id"],
                        "ps": ig["vuln_name"],
                        "tips": "Upgrade the [{}] version to {} or later.".format('、'.join(ig["soft_name"]), ig["vuln_version"]),
                        "auto": self.is_autofix(ig)
                    }
                )
            num += 1
        sixth["ignore_list"] = ignore_list
        self.final_obj = {"first": first, "second": second, "third": third, "fourth": fourth, "fifth": fifth, "sixth": sixth}
        return public.returnMsg(True, self.final_obj)

    def is_autofix(self, warn):
        data = json.loads(public.readFile(self.__data))
        if "title" in warn:
            if warn["m_name"] in data["is_autofix"]:
                return "support"
            else:
                return "nonsupport"
        if "cve_id" in warn:
            if list(warn["soft_name"].keys())[0] == "kernel":
                return "nonsupport"
            else:
                return "support"

    def is_autofix1(self, name):
        """
        @name 判断是否可以自动修复
        """
        if name in self.auto_fix:
            return "support"
        else:
            return "nonsupport"
