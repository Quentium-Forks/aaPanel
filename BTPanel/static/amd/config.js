var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({__proto__: []} instanceof Array && function (d, b) {
                d.__proto__ = b;
            }) ||
            function (d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = {
        label: 0, sent: function () {
            if (t[0] & 1) throw t[1];
            return t[1];
        }, trys: [], ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;

    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }

    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {value: op[1], done: false};
                case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];
            y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {value: op[0] ? op[1] : void 0, done: true};
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
define(["require", "exports", "./snabbdom", "./public/public", "./panelConfig", "./safeConfig", "./noticeConfig"], function (require, exports, snabbdom_1, public_1, panelConfig_1, safeConfig_1, noticeConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.Config = void 0;
    public_1 = __importDefault(public_1);
    panelConfig_1 = __importDefault(panelConfig_1);
    safeConfig_1 = __importDefault(safeConfig_1);
    noticeConfig_1 = __importDefault(noticeConfig_1);
    var panelConfig = new panelConfig_1.default();
    var safeConfig = new safeConfig_1.default();
    var noticeConfig = new noticeConfig_1.default();
    var Config = (function (_super) {
        __extends(Config, _super);

        function Config() {
            var _this = _super.call(this) || this;
            _this.Info = {};
            _this.configInfo = {};
            _this.formInfo = {};
            _this.apiInfo = {
                'getConfig': ['config/get_config', lan.public.the],
                'getCheckTwoStep': ['config/check_two_step', lan.public.the],
                'getPasswordConfig': ['config/get_password_config', '获取密码复杂度验证状态'],
                'getMenuList': ['config/get_menu_list', 'Getting panel menu bar, please wait...'],
                'getMessageChannel': ['config/get_settings2', 'Getting profile, please wait...'],
                'getLoginAlarm': ['config/get_login_send', 'Getting login information, please wait...'],
                'setPanelConfig': ['config/setPanel', lan.config.config_save]
            };
            _this.init();
            return _this;
        }

        Config.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.$apiInit(this.apiInfo);
                    this.render();
                    this.event();
                    return [2];
                });
            });
        };
        Config.prototype.setPanelUserView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.$open({
                                title: '修改面板用户名',
                                area: ['380px', '235px'],
                                btn: ['提交', '取消'],
                                content: {
                                    data: {username1: sessionInfo.username, username2: ''},
                                    template: function () {
                                        var lineWidth = '75px', inputWidth = '210px';
                                        return (0, snabbdom_1.jsx)("div", {class: this.$class('bt-form pd25')},
                                            this.$line({
                                                title: '用户名',
                                                width: lineWidth
                                            }, this.$input({model: 'username1', width: inputWidth})),
                                            this.$line({title: '重复', width: lineWidth}, this.$input({
                                                model: 'username2',
                                                width: inputWidth
                                            })));
                                    }
                                },
                                yes: function (config) {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var close, vm, username1, username2, weakCipher, rdata;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    close = config.close, vm = config.vm;
                                                    username1 = vm.username1, username2 = vm.username2;
                                                    weakCipher = ['admin', 'root', 'admin123', '123456'];
                                                    return [4, this.$verifySubmitList([
                                                        [username1 !== username2, '两次输入的用户名不一致'],
                                                        [username1.length <= 3, '用户名长度必须大于3位'],
                                                        [weakCipher.indexOf(username1) > -1, "\u7528\u6237\u540D\u5305\u542B\u5E38\u7528\u540D\u79F0[".concat(username1, "]")]
                                                    ])];
                                                case 1:
                                                    _a.sent();
                                                    username1 = encodeURIComponent(username1);
                                                    username2 = encodeURIComponent(username2);
                                                    return [4, this.$request('setUserName', {
                                                        username1: username1,
                                                        username2: username2
                                                    })];
                                                case 2:
                                                    rdata = _a.sent();
                                                    rdata.status && close() && this.$refreshBrowser('/login?dologin=True');
                                                    return [2];
                                            }
                                        });
                                    });
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [3, 3];
                        case 2:
                            error_1 = _a.sent();
                            return [3, 3];
                        case 3:
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setPanelPawView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var that_1, error_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            that_1 = this;
                            return [4, this.$open({
                                title: '修改面板密码',
                                area: ['380px', '235px'],
                                btn: ['提交', '取消'],
                                content: {
                                    data: {password1: '', password2: ''},
                                    template: function () {
                                        var lineWidth = '75px', inputWidth = '210px';
                                        return (0, snabbdom_1.jsx)("div", {class: {'bt-form': true, 'pd25': true}},
                                            this.$line({
                                                title: '密码',
                                                width: lineWidth
                                            }, this.$box(this.$input({
                                                model: 'password1',
                                                width: inputWidth
                                            }), this.$icon({
                                                type: 'repeat',
                                                click: this.showPaw.bind(this),
                                                class: 'ml5'
                                            }))),
                                            this.$line({title: '重复', width: lineWidth}, this.$input({
                                                model: 'password2',
                                                width: inputWidth
                                            })));
                                    },
                                    methods: {
                                        showPaw: function () {
                                            this.password1 = that_1.$getRandom(10);
                                            this.password2 = this.password1;
                                        }
                                    }
                                },
                                yes: function (config) {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var close, vm, password1, password2, weakCipher, rdata;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    close = config.close, vm = config.vm;
                                                    password1 = vm.password1, password2 = vm.password2;
                                                    weakCipher = this.$checkWeakCipher(password1);
                                                    return [4, this.$verifySubmitList([
                                                        [password1 !== password2, '两次输入的密码不一致'],
                                                        [password1.length <= 5, '密码长度必须大于5位'],
                                                        [!weakCipher.status, lan.bt.pass_err + weakCipher.msg]
                                                    ])];
                                                case 1:
                                                    _a.sent();
                                                    password1 = encodeURIComponent(password1);
                                                    password2 = encodeURIComponent(password2);
                                                    return [4, this.$request('setPassword', {
                                                        password1: password1,
                                                        password2: password2
                                                    })];
                                                case 2:
                                                    rdata = _a.sent();
                                                    rdata.status && close() && this.$refreshBrowser('/login?dologin=True');
                                                    return [2];
                                            }
                                        });
                                    });
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [3, 3];
                        case 2:
                            error_2 = _a.sent();
                            return [3, 3];
                        case 3:
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setPanelSslView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var certSource, _a, certPem, privateKey;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [4, this.$request('getCertSource')];
                        case 1:
                            certSource = _b.sent();
                            return [4, this.$request('getPanelSsl')];
                        case 2:
                            _a = _b.sent(), certPem = _a.certPem, privateKey = _a.privateKey;
                            return [4, this.$open({
                                title: '面板证书SSL',
                                area: ['450px', '575px'],
                                btn: ['提交', '取消'],
                                skin: 'panel-ssl',
                                content: {
                                    data: {
                                        cert_type: certSource.cert_type || 1,
                                        email: '',
                                        certPem: certPem,
                                        privateKey: privateKey,
                                        agreement: false
                                    },
                                    template: function () {
                                        var lineWidth = '80px', inputWidth = '280px';
                                        return (0, snabbdom_1.jsx)("div", {class: this.$class('bt-form pd25')},
                                            this.$warningTitle('风险操作！此功能不懂请勿开启！'),
                                            this.$ul({className: 'explainDescribeList pd15',}, [
                                                ['必须要用到且了解此功能才决定自己是否要开启!', 'red'],
                                                ['面板SSL是自签证书，不被浏览器信任，显示不安全是正常现象'],
                                                ['开启后导致面板不能访问，可以点击下面链接了解解决方法']
                                            ]),
                                            (0, snabbdom_1.jsx)("div", {class: {pt10: true}},
                                                this.$line({
                                                    title: '类型',
                                                    width: lineWidth
                                                }, this.$select({
                                                    model: 'cert_type',
                                                    width: inputWidth,
                                                    options: [{label: '自签证书', value: 1}, {
                                                        label: 'Let\'s Encrypt',
                                                        value: 2
                                                    }]
                                                })),
                                                this.$line({
                                                    title: '邮箱',
                                                    width: lineWidth,
                                                    hide: parseInt(this.cert_type) !== 2
                                                }, this.$input({model: 'mail', width: inputWidth})),
                                                this.$line({
                                                    title: '密钥(KEY)',
                                                    width: lineWidth,
                                                    hide: parseInt(this.cert_type) !== 1
                                                }, this.$textarea({
                                                    model: 'privateKey',
                                                    width: inputWidth,
                                                    height: '80px',
                                                    style: 'line-height: 16px;padding: 5px 8px;'
                                                })),
                                                this.$line({
                                                    title: '证书(PEM)',
                                                    width: lineWidth,
                                                    hide: parseInt(this.cert_type) !== 1
                                                }, this.$textarea({
                                                    model: 'certPem',
                                                    width: inputWidth,
                                                    height: '80px',
                                                    style: 'line-height: 16px;padding: 5px 8px;'
                                                })),
                                                this.$learnMore({
                                                    model: 'agreement',
                                                    id: 'checkSSL',
                                                    style: 'margin-left:35px;',
                                                    title: (0, snabbdom_1.jsx)("span", null,
                                                        "\u6211\u5DF2\u4E86\u7ECF\u89E3\u8BE6\u60C5,\u5E76\u613F\u610F\u627F\u62C5\u98CE\u9669",
                                                        this.$link({
                                                            title: '了解详情',
                                                            className: 'mlr15',
                                                            href: 'https://www.bt.cn/bbs/forum.php?mod=viewthread&tid=4689'
                                                        })),
                                                })));
                                    }
                                },
                                success: function (layers) {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            layers[0].style.height = 'auto';
                                            layers[0].querySelector('.layui-layer-content').style.height = 'auto';
                                            return [2];
                                        });
                                    });
                                },
                                yes: function (config) {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var close, vm, cert_type, email, privateKey, certPem, agreement, _a, rdata;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    close = config.close, vm = config.vm;
                                                    cert_type = vm.cert_type, email = vm.email, privateKey = vm.privateKey, certPem = vm.certPem, agreement = vm.agreement;
                                                    if (!agreement)
                                                        return [2, this.$tips({el: '#checkSSL', msg: '请阅读并同意承担风险'})];
                                                    return [4, this.$verifySubmitList([
                                                        [!certPem || !privateKey, '请填写完整证书信息'],
                                                        [cert_type === '2' && !email, '请填写管理员邮箱']
                                                    ])];
                                                case 1:
                                                    _b.sent();
                                                    _a = cert_type === '1';
                                                    if (!_a) return [3, 3];
                                                    return [4, this.$request('savePanelSsl', {
                                                        privateKey: privateKey,
                                                        certPem: certPem
                                                    }, false)];
                                                case 2:
                                                    _a = (_b.sent());
                                                    _b.label = 3;
                                                case 3:
                                                    _a;
                                                    return [4, this.$request('setPanelSsl', Object.assign({cert_type: cert_type}, vm.cert_type === '2' ? {email: email} : {}))];
                                                case 4:
                                                    _b.sent();
                                                    return [4, this.$request('restartPanel', {
                                                        loading: false,
                                                        msg: false
                                                    })];
                                                case 5:
                                                    rdata = _b.sent();
                                                    rdata.status && close() && this.$refreshBrowser(location.href.replace(/^http:/, 'https:'), 800);
                                                    return [2];
                                            }
                                        });
                                    });
                                }
                            })];
                        case 3:
                            _b.sent();
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setPanelSslConfigView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var that, _a, certPem, privateKey, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            that = this;
                            return [4, this.$request('getPanelSsl')];
                        case 1:
                            _a = _b.sent(), certPem = _a.certPem, privateKey = _a.privateKey;
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4, this.$open({
                                title: '自定义面板证书',
                                area: ['700px', '500px'],
                                content: {
                                    data: {certPem: certPem, privateKey: privateKey},
                                    template: function () {
                                        return (0, snabbdom_1.jsx)("div", {class: this.$class('bt-form pd25')},
                                            (0, snabbdom_1.jsx)("div", {class: this.$class('myKeyCon ptb15')},
                                                (0, snabbdom_1.jsx)("div", {
                                                        class: this.$class('ssl-con-key pull-left mr20'),
                                                        style: {width: '48%'}
                                                    },
                                                    "\u5BC6\u94A5(KEY)",
                                                    (0, snabbdom_1.jsx)("br", null),
                                                    this.$textarea({model: 'privateKey'})),
                                                (0, snabbdom_1.jsx)("div", {
                                                        class: this.$class('ssl-con-key pull-left'),
                                                        style: {width: '48%'}
                                                    },
                                                    "\u8BC1\u4E66(PEM\u683C\u5F0F)",
                                                    (0, snabbdom_1.jsx)("br", null),
                                                    this.$textarea({model: 'certPem'})),
                                                (0, snabbdom_1.jsx)("div", {
                                                    class: this.$class('ssl-btn pull-left mtb15'),
                                                    style: {width: "100%"}
                                                }, this.$button({title: '保存', click: this.savePanelSsl.bind(this)}))),
                                            this.$ul({style: 'clear: both;'}, [
                                                [(0, snabbdom_1.jsx)("span", null,
                                                    "\u7C98\u8D34\u60A8\u7684*.key\u4EE5\u53CA*.pem\u5185\u5BB9\uFF0C\u7136\u540E\u4FDD\u5B58\u5373\u53EF",
                                                    this.$link({
                                                        title: '帮助',
                                                        href: 'http://www.bt.cn/bbs/thread-704-1-1.html'
                                                    }),
                                                    "\u3002")],
                                                ['如果浏览器提示证书链不完整,请检查是否正确拼接PEM证书'],
                                                ['PEM格式证书 = 域名证书.crt + 根证书(root_bundle).crt'],
                                            ]));
                                    },
                                    methods: {
                                        savePanelSsl: function () {
                                            return __awaiter(this, void 0, void 0, function () {
                                                var _a, certPem, privateKey;
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            return [4, that.$verifySubmitList([
                                                                [!this.certPem, '密钥（KEY）不能为空'],
                                                                [!this.privateKey, '证书(PEM格式)不能为空'],
                                                            ])];
                                                        case 1:
                                                            _b.sent();
                                                            _a = this, certPem = _a.certPem, privateKey = _a.privateKey;
                                                            return [4, that.$request('savePanelSsl', {
                                                                privateKey: privateKey,
                                                                certPem: certPem
                                                            })];
                                                        case 2:
                                                            _b.sent();
                                                            return [2];
                                                    }
                                                });
                                            });
                                        }
                                    }
                                }
                            })];
                        case 3:
                            _b.sent();
                            return [3, 5];
                        case 4:
                            error_3 = _b.sent();
                            return [3, 5];
                        case 5:
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setBasicAuthView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve, reject) {
                        return __awaiter(_this, void 0, void 0, function () {
                            var error_4;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4, this.$open({
                                            title: '开启BasicAuth认证提示',
                                            area: ['500px', '385px'],
                                            btn: ['提交', '取消'],
                                            content: {
                                                data: {agreement: false},
                                                template: function () {
                                                    return (0, snabbdom_1.jsx)("div", {class: this.$class('bt-form pd25')},
                                                        this.$warningTitle('风险操作！此功能不懂请勿开启！'),
                                                        this.$ul({className: 'explainDescribeList pd15'}, [
                                                            ['必须要用到且了解此功能才决定自己是否要开启!', 'red'],
                                                            ['开启后，以任何方式访问面板，将先要求输入BasicAuth用户名和密码'],
                                                            ['开启后，能有效防止面板被扫描发现，但并不能代替面板本身的帐号密码'],
                                                            ['请牢记BasicAuth密码，一但忘记将无法访问面板'],
                                                            ['如忘记密码，可在SSH通过bt命令来关闭BasicAuth验证']
                                                        ]),
                                                        this.$learnMore({
                                                            title: (0, snabbdom_1.jsx)("span", null,
                                                                "\u6211\u5DF2\u7ECF\u4E86\u89E3\u8BE6\u60C5,\u5E76\u613F\u610F\u627F\u62C5\u98CE\u9669  ",
                                                                this.$link({
                                                                    title: '什么是BasicAuth认证？',
                                                                    href: 'https://www.bt.cn/bbs/thread-34374-1-1.html'
                                                                })), model: 'agreement', id: 'checkBasicAuth'
                                                        }));
                                                }
                                            },
                                            yes: function (config) {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    var close, vm, error_5;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                close = config.close, vm = config.vm;
                                                                if (!vm.agreement)
                                                                    return [2, this.$tips({
                                                                        el: '#checkBasicAuth',
                                                                        msg: '请阅读并同意承担风险'
                                                                    })];
                                                                close();
                                                                _a.label = 1;
                                                            case 1:
                                                                _a.trys.push([1, 3, , 4]);
                                                                return [4, this.setBasicAuthConfigView()];
                                                            case 2:
                                                                _a.sent();
                                                                return [3, 4];
                                                            case 3:
                                                                error_5 = _a.sent();
                                                                reject(error_5);
                                                                return [3, 4];
                                                            case 4:
                                                                return [2];
                                                        }
                                                    });
                                                });
                                            }
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [3, 3];
                                    case 2:
                                        error_4 = _a.sent();
                                        reject(error_4);
                                        return [3, 3];
                                    case 3:
                                        return [2];
                                }
                            });
                        });
                    })];
                });
            });
        };
        Config.prototype.setBasicAuthConfigView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var that;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            that = this;
                            return [4, this.$open({
                                title: '配置BasicAuth认证',
                                area: ['500px', '400px'],
                                content: {
                                    data: {open: true, basic_user: '', basic_pwd: ''},
                                    template: function () {
                                        var inputWidth = '280px';
                                        return (0, snabbdom_1.jsx)("div", {class: this.$class('bt-form pd25')},
                                            this.$line({title: '服务状态'}, this.$switch({
                                                model: 'open',
                                                change: this.setBasicAuthConfig.bind(this)
                                            })),
                                            this.$line({title: '用户名'}, this.$input({
                                                model: 'basic_user',
                                                placeholder: '请设置用户名',
                                                width: inputWidth
                                            })),
                                            this.$line({title: '密码'}, this.$input({
                                                model: 'basic_pwd',
                                                placeholder: '请设置密码',
                                                width: inputWidth
                                            })),
                                            this.$line({title: ''}, this.$button({
                                                title: '保存配置',
                                                click: this.saveBasicAuth.bind(this)
                                            })),
                                            this.$ul([
                                                ['注意：请不要在这里使用您的常用密码，这可能导致密码泄漏！', 'red'],
                                                ['开启后，以任何方式访问面板，将先要求输入BasicAuth用户名和密码'],
                                                ['开启后，能有效防止面板被扫描发现，但并不能代替面板本身的帐号密码'],
                                                ['请牢记BasicAuth密码，一但忘记将无法访问面板'],
                                                ['如忘记密码，可在SSH通过bt命令来关闭BasicAuth验证']
                                            ]));
                                    },
                                    methods: {
                                        setBasicAuthConfig: function () {
                                            var basicAuth = document.getElementById('basicAuth');
                                            basicAuth.checked = this.open;
                                        },
                                        saveBasicAuth: function () {
                                            return __awaiter(this, void 0, void 0, function () {
                                                var _a, basic_user, basic_pwd, open, rdata;
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            _a = this, basic_user = _a.basic_user, basic_pwd = _a.basic_pwd, open = _a.open;
                                                            return [4, that.$request('setBasicAuth', {
                                                                basic_user: basic_user,
                                                                basic_pwd: basic_pwd,
                                                                open: open ? 'True' : 'False'
                                                            })];
                                                        case 1:
                                                            rdata = _b.sent();
                                                            rdata.status && this.$closeLayer() && that.$refreshBrowser();
                                                            return [2];
                                                    }
                                                });
                                            });
                                        }
                                    }
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setGoogleAuthView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, this.$open({
                                title: '设置动态口令认证',
                                area: ['500px', '560px'],
                                btn: ['提交', '取消'],
                                content: {
                                    data: {agreement: false},
                                    template: function () {
                                        return (0, snabbdom_1.jsx)("div", {class: this.$class('bt-form pd25')},
                                            this.$warningTitle('风险操作！此功能不懂请勿开启！'),
                                            this.$ul({className: 'explainDescribeList pd15'}, [
                                                ['必须要用到且了解此功能才决定自己是否要开启!', 'red'],
                                                ['如果无法验证，命令行输入"bt 24" 取消动态口令认证', 'red'],
                                                ['开启服务后，请立即绑定，以免出现面板不能访问。'],
                                                ['请先下载宝塔APP或(谷歌认证器)，并完成安装和初始化。'],
                                                [(0, snabbdom_1.jsx)("span", null,
                                                    "\u57FA\u4E8Egoogle Authenticator \u5F00\u53D1,\u5982\u9047\u5230\u95EE\u9898\u8BF7 ",
                                                    this.$link({
                                                        title: '查看详情',
                                                        href: 'https://www.bt.cn/bbs/forum.php?mod=viewthread&tid=37437'
                                                    }))],
                                            ]),
                                            (0, snabbdom_1.jsx)("div", {class: {"download_Qcode": true}},
                                                (0, snabbdom_1.jsx)("div", {class: {"item_down": true}},
                                                    (0, snabbdom_1.jsx)("div", {class: {"qcode_title": true}}, "Android/IOS\u5E94\u7528 \u626B\u7801\u4E0B\u8F7D"),
                                                    (0, snabbdom_1.jsx)("div", {class: {"qcode_conter": true}},
                                                        (0, snabbdom_1.jsx)("img", {props: {src: "/static/img/bt_app.png"}})))),
                                            this.$learnMore({
                                                title: '我已安装APP和了解详情,并愿意承担风险！',
                                                model: 'agreement',
                                                id: 'checkAuthenticator'
                                            }));
                                    }
                                },
                                yes: function (config) {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var close, vm, rdata, _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    close = config.close, vm = config.vm;
                                                    if (!vm.agreement)
                                                        return [2, this.$tips({
                                                            el: '#checkAuthenticator',
                                                            msg: '请阅读并同意承担风险'
                                                        })];
                                                    return [4, this.$request('setTwoStepAuth', {act: 1})];
                                                case 1:
                                                    rdata = _b.sent();
                                                    _a = rdata.status && close();
                                                    if (!_a) return [3, 3];
                                                    return [4, this.googleAuthRelationView()];
                                                case 2:
                                                    _a = (_b.sent());
                                                    _b.label = 3;
                                                case 3:
                                                    _a;
                                                    return [2];
                                            }
                                        });
                                    });
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Config.prototype.googleAuthRelationView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var that, rdata, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            that = this;
                            return [4, this.$request('getTwoStepKey', false)];
                        case 1:
                            rdata = _a.sent();
                            if (typeof rdata.status === 'boolean' && !rdata.status)
                                return [2, this.setGoogleAuthView()];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, this.$open({
                                title: '设置动态口令认证',
                                area: ['550px', '400px'],
                                content: {
                                    data: {},
                                    template: function () {
                                        return (0, snabbdom_1.jsx)("div", {class: this.$class('bt-form pd25')},
                                            (0, snabbdom_1.jsx)("div", {class: this.$class('verify_item')},
                                                (0, snabbdom_1.jsx)("div", {
                                                    class: this.$class('verify_vice_title'),
                                                    style: this.$style('font-weight: 500;font-size:16px;')
                                                }, "\u626B\u7801\u7ED1\u5B9A\uFF08\u4F7F\u7528\u5B9D\u5854\u9762\u677FAPP\u6216Google\u8EAB\u4EFD\u9A8C\u8BC1\u5668APP\u626B\u7801\uFF09"),
                                                (0, snabbdom_1.jsx)("div", {
                                                        class: this.$class('verify_conter'),
                                                        style: this.$style('text-align:center;padding-top:10px;')
                                                    },
                                                    (0, snabbdom_1.jsx)("div", {
                                                        props: {id: 'verify_qrcode'},
                                                        key: 'verifyQrcode'
                                                    }))),
                                            this.$ul({className: 'verify_tips'}, [
                                                [(0, snabbdom_1.jsx)("span", null,
                                                    "\u63D0\u793A\uFF1A\u8BF7\u4F7F\u7528\u201C \u5B9D\u5854\u9762\u677FAPP\u6216Google\u8EAB\u4EFD\u9A8C\u8BC1\u5668APP \u201D\u7ED1\u5B9A,\u5404\u5927\u8F6F\u4EF6\u5546\u5E97\u5747\u53EF\u4E0B\u8F7D\u8BE5APP\uFF0C\u652F\u6301\u5B89\u5353\u3001IOS\u7CFB\u7EDF\u3002",
                                                    this.$link({
                                                        title: '使用教程',
                                                        href: 'https://www.bt.cn/bbs/forum.php?mod=viewthread&amp;tid=37437'
                                                    }))],
                                                ['开启服务后，请立即使用“宝塔面板APP或Google身份验证器APP”绑定，以免出现无法登录的情况。', 'red']
                                            ]));
                                    },
                                    mounted: function () {
                                        return __awaiter(this, void 0, void 0, function () {
                                            var rdata;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        return [4, that.$request('getQrcodeData', {act: 1})];
                                                    case 1:
                                                        rdata = _a.sent();
                                                        return [4, that.$require('jquery.qrcode')];
                                                    case 2:
                                                        _a.sent();
                                                        $('#verify_qrcode').qrcode({
                                                            render: "canvas",
                                                            width: 150,
                                                            height: 150,
                                                            text: rdata
                                                        });
                                                        return [2];
                                                }
                                            });
                                        });
                                    }
                                }
                            })];
                        case 3:
                            _a.sent();
                            return [3, 5];
                        case 4:
                            error_6 = _a.sent();
                            return [3, 5];
                        case 5:
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setAccessDeviceAuthView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, crl, ca;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [4, this.$request('getSslVerify', false)];
                        case 1:
                            _a = _b.sent(), crl = _a.crl, ca = _a.ca;
                            return [4, this.$open({
                                title: '设置访问设备验证',
                                area: ['700px', '700px'],
                                btn: ['提交', '取消'],
                                content: {
                                    data: {agreement: '', crl: crl, ca: ca},
                                    template: function () {
                                        return (0, snabbdom_1.jsx)("div", {class: this.$class('bt-form pd25')},
                                            this.$warningTitle('风险操作！此功能不懂别开启！'),
                                            this.$ul({className: 'explainDescribeList pd15'}, [
                                                ['必须要用到且了解此功能才决定自己是否要开启！', 'red'],
                                                ['开启后电脑需要安装此证书，否则将无法访问，属于【极高安全级别】的限制，类似银行账号U盘密钥登录。'],
                                                ['注销列表(crl)和证书(cert)可通过企业版插件[堡塔限制访问型证书->双向认证->服务器证书]获取。'],
                                                ['开启之前请先下载好对应的[客户端证书]，否则将无法访问面板。'],
                                                ['开启访问设备验证后，未授权的用户访问将会出现400错误。'],
                                                ['开启后导致面板不能访问，命令行：bt 29 关闭访问设备验证。'],
                                            ]),
                                            (0, snabbdom_1.jsx)("div", {class: {'line': true}},
                                                (0, snabbdom_1.jsx)("div", {class: {'myKeyCon': true}},
                                                    (0, snabbdom_1.jsx)("div", {
                                                            class: this.$class('ssl-con-key pull-left ca_show'),
                                                            style: {width: "48.5%"}
                                                        },
                                                        "\u6CE8\u9500\u5217\u8868(crl)",
                                                        (0, snabbdom_1.jsx)("br", null),
                                                        this.$textarea({model: 'crl'})),
                                                    (0, snabbdom_1.jsx)("div", {
                                                            class: this.$class('ssl-con-key pull-right ca_show'),
                                                            style: {width: "48.5%"}
                                                        },
                                                        "\u8BC1\u4E66(cert)",
                                                        (0, snabbdom_1.jsx)("br", null),
                                                        this.$textarea({model: 'ca'})),
                                                    (0, snabbdom_1.jsx)("div", {class: {'clear': true}}))),
                                            this.$learnMore({
                                                title: (0, snabbdom_1.jsx)("span", null,
                                                    "\u6211\u5DF2\u4E86\u7ECF\u89E3\u8BE6\u60C5,\u5E76\u613F\u610F\u627F\u62C5\u98CE\u9669\uFF01 ",
                                                    this.$link({
                                                        title: '了解详情',
                                                        href: 'https://www.bt.cn/bbs/thread-77863-1-1.html'
                                                    })), model: 'agreement', id: 'checkSslVerify'
                                            }));
                                    }
                                },
                                yes: function (content) {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var close, vm, rdata;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    close = content.close, vm = content.vm;
                                                    if (!vm.agreement)
                                                        return [2, this.$tips({
                                                            el: '#checkSslVerify',
                                                            msg: '请阅读并同意承担风险'
                                                        })];
                                                    return [4, this.$verifySubmitList([
                                                        [!vm.crl, '注销列表(crl)不能为空'],
                                                        [!ca.ca, '证书(cert)不能为空']
                                                    ])];
                                                case 1:
                                                    _a.sent();
                                                    return [4, this.$request('setSslVerify', {
                                                        crl: vm.crl,
                                                        ca: vm.ca,
                                                        status: 1
                                                    })];
                                                case 2:
                                                    rdata = _a.sent();
                                                    return [4, this.$request('restartPanel', false)];
                                                case 3:
                                                    _a.sent();
                                                    rdata.status && close() && this.$refreshBrowser();
                                                    return [2];
                                            }
                                        });
                                    });
                                }
                            })];
                        case 2:
                            _b.sent();
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setAccessCertificateView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var that, _a, crl, ca, error_7;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            that = this;
                            return [4, this.$request('getSslVerify', false)];
                        case 1:
                            _a = _b.sent(), crl = _a.crl, ca = _a.ca;
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4, this.$open({
                                title: '自定义证书',
                                area: ['700px', '475px'],
                                content: {
                                    data: {crl: crl, ca: ca},
                                    template: function () {
                                        return (0, snabbdom_1.jsx)("div", {class: this.$class('pd20')},
                                            (0, snabbdom_1.jsx)("div", {class: this.$class('myKeyCon ptb15')},
                                                (0, snabbdom_1.jsx)("div", {
                                                        class: this.$class('ssl-con-key pull-left mr20'),
                                                        style: {width: '48%'}
                                                    },
                                                    "\u6CE8\u9500\u5217\u8868(crl)",
                                                    (0, snabbdom_1.jsx)("br", null),
                                                    this.$textarea({model: 'crl'})),
                                                (0, snabbdom_1.jsx)("div", {
                                                        class: this.$class('ssl-con-key pull-left'),
                                                        style: {width: '48%'}
                                                    },
                                                    "\u8BC1\u4E66(cert)",
                                                    (0, snabbdom_1.jsx)("br", null),
                                                    this.$textarea({model: 'ca'})),
                                                (0, snabbdom_1.jsx)("div", {
                                                    class: this.$class('ssl-btn pull-left mtb15'),
                                                    style: {width: "100%"}
                                                }, this.$button({title: '保存', click: this.saveSslVerify.bind(this)}))),
                                            this.$ul({style: 'clear: both;'}, [
                                                ['粘贴您的注销列表(crl)以及证书(cert)，然后保存即可。'],
                                                ['注销列表(crl)和证书(cert)可通过企业版插件[堡塔限制访问型证书->双向认证->服务器证书]获取。'],
                                            ]));
                                    },
                                    methods: {
                                        saveSslVerify: function () {
                                            return __awaiter(this, void 0, void 0, function () {
                                                var rdata;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            return [4, that.$verifySubmitList([
                                                                [!this.ca, '注销列表(crl)不能为空'],
                                                                [!this.crl, '证书(cert)不能为空'],
                                                            ])];
                                                        case 1:
                                                            _a.sent();
                                                            return [4, that.$request('setSslVerify', {
                                                                crl: this.crl,
                                                                ca: this.ca,
                                                                status: 0
                                                            })];
                                                        case 2:
                                                            rdata = _a.sent();
                                                            return [4, that.$request('restartPanel', false)];
                                                        case 3:
                                                            _a.sent();
                                                            rdata.status && that.$refreshBrowser();
                                                            return [2];
                                                    }
                                                });
                                            });
                                        }
                                    }
                                }
                            })];
                        case 3:
                            _b.sent();
                            return [3, 5];
                        case 4:
                            error_7 = _b.sent();
                            return [3, 5];
                        case 5:
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setSafetyEntranceView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_8;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.$open({
                                title: '设置面板安全入口',
                                area: ['400px', '180px'],
                                btn: ['提交', '取消'],
                                content: {
                                    data: {expire: this.configInfo.admin_path},
                                    template: function () {
                                        return (0, snabbdom_1.jsx)("div", {class: this.$class('pd20 bt-form')}, this.$line({title: '安全入口'}, this.$input({
                                            model: 'expire',
                                            placeholder: '请输入面板安全入口',
                                            width: '240px'
                                        })));
                                    }
                                },
                                yes: function (content) {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var close, vm, admin_path, rdata, adminPathValue;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    close = content.close, vm = content.vm, admin_path = vm.expire;
                                                    return [4, this.$verifySubmit(!admin_path, '安全入口不能为空')];
                                                case 1:
                                                    _a.sent();
                                                    return [4, this.$request('setAdminPath', {admin_path: admin_path})];
                                                case 2:
                                                    rdata = _a.sent();
                                                    adminPathValue = document.querySelector('[name="admin_path"]');
                                                    rdata.status && close() && (adminPathValue.value = admin_path);
                                                    this.configInfo.admin_path = admin_path;
                                                    return [2];
                                            }
                                        });
                                    });
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [3, 3];
                        case 2:
                            error_8 = _a.sent();
                            return [3, 3];
                        case 3:
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setPawExpirationView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_9;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.$open({
                                title: '设置密码过期时间',
                                area: ['350px', '245px'],
                                btn: ['提交', '取消'],
                                content: {
                                    data: {expire: this.configInfo.paw_expire_time},
                                    template: function () {
                                        return (0, snabbdom_1.jsx)("div", {class: this.$class('pd20 bt-form')},
                                            this.$line({title: '密码过期时间'}, this.$box(this.$input({
                                                model: 'expire',
                                                placeholder: '',
                                                width: '120px'
                                            }), (0, snabbdom_1.jsx)("span", null, "\u5929"))),
                                            this.$ul([
                                                ['面板密码过期时间设置，过期后需要重新设置密码', 'red'],
                                                ['密码过期时间为“0天”，则关闭密码过期时间功能']
                                            ]));
                                    }
                                },
                                yes: function (config) {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var close, vm, expire, rdata, pawExpireValue, _a, expire_time, expire_day;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    close = config.close, vm = config.vm, expire = vm.expire;
                                                    return [4, this.$request('setPawExpire', {expire: expire})];
                                                case 1:
                                                    rdata = _b.sent();
                                                    pawExpireValue = document.querySelector('[name="paw_expire_time"]');
                                                    return [4, this.$request('getPasswordConfig', false)];
                                                case 2:
                                                    _a = _b.sent(), expire_time = _a.expire_time, expire_day = _a.expire_day;
                                                    rdata.status && close() && (pawExpireValue.value = (expire > 0 ? "".concat(this.$formatTime(expire_time), " ( \u5269\u4F59").concat(expire_day, "\u5929\u8FC7\u671F )") : "\u672A\u8BBE\u7F6E"));
                                                    this.configInfo.paw_expire_time = expire;
                                                    return [2];
                                            }
                                        });
                                    });
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [3, 3];
                        case 2:
                            error_9 = _a.sent();
                            return [3, 3];
                        case 3:
                            return [2];
                    }
                });
            });
        };
        Config.prototype.unbindUser = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rdata;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, this.$confirm({
                                title: '解绑宝塔账号',
                                msg: '解绑宝塔账号绑定，继续操作！'
                            })];
                        case 1:
                            _a.sent();
                            return [4, this.$request('unbindUserInfo')];
                        case 2:
                            rdata = _a.sent();
                            rdata.status && this.$refreshBrowser();
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setStatusCodeView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_10;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.$open({
                                title: '设置未认证时的响应状态',
                                area: ['420px', '220px'],
                                btn: ['提交', '取消'],
                                content: {
                                    data: {status_code: parseInt(sessionInfo.statusCode)},
                                    template: function () {
                                        return (0, snabbdom_1.jsx)("div", {class: this.$class('pd20 bt-form')},
                                            this.$line({title: '响应状态', width: '80px'}, this.$select({
                                                model: 'status_code', width: '250px', options: [
                                                    {label: '默认-安全入口错误提示', value: 0},
                                                    {label: '403-拒绝访问', value: 403},
                                                    {label: '404-页面不存在', value: 404},
                                                    {label: '416-无效的请求', value: 416},
                                                    {label: '408-客户端超时', value: 408},
                                                    {label: '400-客户端请求错误', value: 400},
                                                    {label: '401-未授权访问', value: 401},
                                                ]
                                            })),
                                            this.$ul([
                                                ['用于未登录且未正确输入安全入口时的响应,用于隐藏面板特征', 'red']
                                            ]));
                                    }
                                },
                                yes: function (config) {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var close, vm, rdata;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    close = config.close, vm = config.vm;
                                                    return [4, this.$request('setNotAuthStatus', {status_code: vm.status_code})];
                                                case 1:
                                                    rdata = _a.sent();
                                                    rdata.status && close() && this.$refreshBrowser();
                                                    return [2];
                                            }
                                        });
                                    });
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [3, 3];
                        case 2:
                            error_10 = _a.sent();
                            return [3, 3];
                        case 3:
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setPanelGroundView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rdata, html, is_option, that, arry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, this.$request('getMenuList')];
                        case 1:
                            rdata = _a.sent(), html = '', is_option = '', that = this;
                            arry = ["dologin", "memuAconfig", "memuAsoft", "memuA"];
                            rdata.map(function (item, index) {
                                is_option = "<div class=\"index-item\" style=\"float:right;\"><input class=\"btswitch btswitch-ios\" id=\"".concat(item.id, "-").concat(index, "\" name=\"").concat(item.id, "\" type=\"checkbox\" ").concat((item.show ? 'checked' : ''), "><label class=\"btswitch-btn\" for=\"").concat(item.id, "-").concat(index, "\"></label></div>");
                                arry.indexOf(item.id) > -1 && (is_option = '不可操作');
                                html += "<tr><td>".concat(item.title, "</td><td><div style=\"float:right;\">").concat(is_option, "</div></td></tr>");
                            });
                            return [4, this.$open({
                                title: '设置面板菜单栏目管理',
                                area: ['350px', '530px'],
                                content: "<div class=\"divtable softlist\" id=\"panel_menu_tab\" style=\"padding: 20px 15px;\"><table class=\"table table-hover\"><thead><tr><th>\u83DC\u5355\u680F\u76EE</th><th style=\"text-align:right;width:120px;\">\u662F\u5426\u663E\u793A</th></tr></thead><tbody>".concat(html, "</tbody></table></div>"),
                                success: function () {
                                    $('#panel_menu_tab input').click(function () {
                                        var arry = [];
                                        $(this).parents('tr').siblings().each(function (index, el) {
                                            if ($(this).find('input').length > 0 && !$(this).find('input').prop('checked')) {
                                                arry.push($(this).find('input').attr('name'));
                                            }
                                        });
                                        !$(this).prop('checked') && arry.push($(this).attr('name'));
                                        that.$request('setHideMenuList', {hide_list: JSON.stringify(arry)});
                                    });
                                }
                            })];
                        case 2:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setAlarmView = function (configInfo) {
            return __awaiter(this, void 0, void 0, function () {
                var rdata, _a, mail, dingding, error_11;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [4, this.$request('getLoginAlarm')];
                        case 1:
                            rdata = _b.sent();
                            _a = (rdata.msg ? rdata.msg : rdata), mail = _a.mail, dingding = _a.dingding;
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4, this.$open({
                                area: ['1010px', '540px'],
                                title: "设置登录告警",
                                content: "<div class=\"bt-w-main\" style=\"height:498px\">\n            <div class=\"bt-w-menu\"><p class=\"bgw\">\u767B\u5F55\u65E5\u5FD7</p><p>IP\u767D\u540D\u5355</p></div>\n            <div class=\"bt-w-con pd15\">\n              <div class=\"plugin_body\">\n                <div class=\"conter_box active\">\n                  <div class=\"ptb10\">\n                    <span class=\"set-tit\" style=\"display:inline-block;vertical-align: top;margin: 3px;color:#666\" title=\"\u901A\u77E5\u90AE\u7BB1\">\u901A\u77E5\u90AE\u7BB1</span>\n                    <div class=\"mail mr10\" style=\"display:inline-block;\">\n                      <input class=\"btswitch btswitch-ios\" id=\"mail_alarm\" name=\"mail\" type=\"checkbox\" ".concat(mail ? 'checked' : '', " />\n                      <label class=\"btswitch-btn\" for=\"mail_alarm\"></label>\n                    </div>\n                    <span class=\"set-tit\" style=\"display:inline-block;vertical-align: top;margin: 3px;color:#666\" title=\"\u901A\u77E5\u9489\u9489\">\u901A\u77E5\u9489\u9489</span>                    <div class=\"dingding mr10\" style=\"display:inline-block;\">\n                      <input class=\"btswitch btswitch-ios\" id=\"dingding_alarm\" name=\"dingding\" type=\"checkbox\" ").concat(dingding ? 'checked' : '', "/>\n                      <label class=\"btswitch-btn\" for=\"dingding_alarm\"></label>\n                    </div>\n                  </div>\n                  <div class=\"divtable\" id=\"config_server_table\">\n                    <table class=\"table table-hover\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><thead><tr><th width=\"100%\">\u8BE6\u60C5</th></tr></thead>\n                      <tbody id=\"server_table\"></tbody>\n                    </table>\n                    <div class=\"page\" id=\"server_table_page\"></div>\n                  </div>\n                  <ul class=\"help-info-text c7\">\n                    <li style=\"list-style:inside disc\">\u90AE\u7BB1\u901A\u9053\u548C\u9489\u9489\u901A\u9053\u53EA\u80FD\u540C\u65F6\u5F00\u542F\u4E00\u4E2A</li>\n                  </ul>\n                </div>\n                <div class=\"conter_box\" style=\"display:none;height:440px\">\n                  <div class=\"bt-form\">\n                    <div class=\"box\" style=\"display:inline-block;\">\n                      <input name=\"ip_write\" class=\"bt-input-text mr5\" type=\"text\" style=\"width: 220px;\" placeholder=\"\u8BF7\u8F93\u5165IP\">\n                      <button class=\"btn btn-success btn-sm add_ip_write\" >\u6DFB\u52A0</button>\n                    </div>\n                    <div class=\"pull-right\"><button class=\"btn btn-default btn-sm clear_all\" style=\"text-align:right\">\u6E05\u7A7A\u5168\u90E8</button></div>\n                    <div class=\"divtable mt10\">\n                      <table class=\"table table-hover\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><thead><tr><th width=\"60%\">IP</th><th width=\"40%\" style=\"text-align:right\">\u64CD\u4F5C</th></tr></thead>\n                        <tbody id=\"ip_write_table\"></tbody>\n                      </table>\n                    </div>\n                    <ul class=\"help-info-text c7\">\n                      <li style=\"list-style:inside disc\">\u53EA\u5141\u8BB8\u8BBE\u7F6Eipv4\u767D\u540D\u5355</li>\n                    </ul>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>"),
                                success: function () {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            this.reanderLoginTable();
                                            $(".bt-w-menu p").on('click', function (ev) {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    var el, index;
                                                    return __generator(this, function (_a) {
                                                        el = $(ev.target), index = el.index();
                                                        el.addClass('bgw').siblings().removeClass('bgw');
                                                        switch (index) {
                                                            case 0:
                                                                this.reanderLoginTable();
                                                                break;
                                                            case 1:
                                                                this.reanderLoginIpTable();
                                                                break;
                                                        }
                                                        $('.conter_box').eq(index).show().siblings().hide();
                                                        return [2];
                                                    });
                                                });
                                            });
                                            $('#mail_alarm,#dingding_alarm').on('click', function (ev) {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    var that, checked, type, _a, error_12;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0:
                                                                that = $(ev.target), checked = that.prop('checked'), type = that.attr('name');
                                                                if (type == 'mai' && !configInfo.user_mail.user_name) {
                                                                    that.prop('checked', !checked);
                                                                    return [2, this.$error('未配置消息通道 [邮箱]')];
                                                                }
                                                                if (type == 'dingding' && !configInfo.dingding.dingding) {
                                                                    that.prop('checked', !checked);
                                                                    return [2, this.$error('未配置消息通道 [钉钉/企业微信]')];
                                                                }
                                                                _b.label = 1;
                                                            case 1:
                                                                _b.trys.push([1, 6, , 7]);
                                                                if (!checked) return [3, 3];
                                                                return [4, this.$request('setLoginAlarm', {type: type})];
                                                            case 2:
                                                                _a = _b.sent();
                                                                return [3, 5];
                                                            case 3:
                                                                return [4, this.$request('clearLoginAlarm', {type: type})];
                                                            case 4:
                                                                _a = _b.sent();
                                                                _b.label = 5;
                                                            case 5:
                                                                _a;
                                                                return [3, 7];
                                                            case 6:
                                                                error_12 = _b.sent();
                                                                that.prop('checked', !checked);
                                                                return [3, 7];
                                                            case 7:
                                                                return [2];
                                                        }
                                                    });
                                                });
                                            });
                                            $('.add_ip_write').on('click', function () {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    var ip_write, ip;
                                                    var _this = this;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                ip_write = $('[name="ip_write"]');
                                                                ip = ip_write.val();
                                                                return [4, this.$verifySubmit(!this.$checkIp(ip), '请输入正确的ip地址')];
                                                            case 1:
                                                                _a.sent();
                                                                return [4, this.$request(['config/login_ipwhite', '添加登录告警IP白名单'], {
                                                                    ip: ip,
                                                                    type: 'add'
                                                                })];
                                                            case 2:
                                                                _a.sent();
                                                                rdata.status && setTimeout(function () {
                                                                    _this.reanderLoginIpTable();
                                                                }, 1000);
                                                                ip_write.val('');
                                                                return [2];
                                                        }
                                                    });
                                                });
                                            });
                                            $('#ip_write_table').on('click', '.del_ip_write', function (ev) {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    var that, ip;
                                                    var _this = this;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                that = $(ev.target), ip = that.data('ip');
                                                                return [4, this.$confirm({
                                                                    title: '删除IP白名单',
                                                                    msg: "\u5220\u9664IP\u767D\u540D\u5355[ ".concat(ip, " ]\uFF0C\u7EE7\u7EED\u64CD\u4F5C\uFF1F")
                                                                })];
                                                            case 1:
                                                                _a.sent();
                                                                return [4, this.$request(['config/login_ipwhite', '删除IP白名单'], {
                                                                    ip: ip,
                                                                    type: 'del'
                                                                })];
                                                            case 2:
                                                                _a.sent();
                                                                rdata.status && setTimeout(function () {
                                                                    _this.reanderLoginIpTable();
                                                                }, 1000);
                                                                return [2];
                                                        }
                                                    });
                                                });
                                            });
                                            $('.clear_all').on('click', function () {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    var rdata;
                                                    var _this = this;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                return [4, this.$confirm({
                                                                    title: '清空全部',
                                                                    msg: '清空全部IP白名单，继续操作？'
                                                                })];
                                                            case 1:
                                                                _a.sent();
                                                                return [4, this.$request(['config/login_ipwhite', '清空全部IP白名单'], {type: 'clear'})];
                                                            case 2:
                                                                rdata = _a.sent();
                                                                rdata.status && setTimeout(function () {
                                                                    _this.reanderLoginIpTable();
                                                                }, 1000);
                                                                return [2];
                                                        }
                                                    });
                                                });
                                            });
                                            $('#server_table_page').on('click', 'a', function (ev) {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    var page;
                                                    return __generator(this, function (_a) {
                                                        ev.stopPropagation();
                                                        ev.preventDefault();
                                                        page = $(ev.target).attr('href').match(/p=([0-9]*)/)[1];
                                                        this.reanderLoginTable(page);
                                                        return [2];
                                                    });
                                                });
                                            });
                                            return [2];
                                        });
                                    });
                                }
                            })];
                        case 3:
                            _b.sent();
                            return [3, 5];
                        case 4:
                            error_11 = _b.sent();
                            return [3, 5];
                        case 5:
                            return [2];
                    }
                });
            });
        };
        Config.prototype.reanderLoginTable = function (p) {
            if (p === void 0) {
                p = 1;
            }
            return __awaiter(this, void 0, void 0, function () {
                var rdata, html, i, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, this.$request(['config/get_login_log', '获取登录日志中'], {p: p})];
                        case 1:
                            rdata = _a.sent(), html = '';
                            $('#server_table').empty();
                            if (!rdata.data)
                                return [2, false];
                            for (i = 0; i < rdata.data.length; i++) {
                                item = rdata.data[i];
                                html += "<tr><td><span class=\"size_ellipsis\" title=\"".concat(item.log, "\">").concat(item.log, "</span></td></tr>");
                            }
                            !html && (html = "<tr><td class=\"text-center\">\u6682\u65E0\u6570\u636E</td></tr>");
                            $('#server_table').html(html);
                            $('#server_table_page').html(rdata.page);
                            return [2];
                    }
                });
            });
        };
        Config.prototype.reanderLoginIpTable = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rdata, html, i, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, this.$request(['config/login_ipwhite', '获取IP白名单列表'], {type: 'get'})];
                        case 1:
                            rdata = _a.sent(), html = '';
                            for (i = 0; i < rdata.msg.length; i++) {
                                item = rdata.msg[i];
                                html += "<tr>\n        <td>".concat(item, "</td>\n        <td style=\"text-align:right\"><a href=\"javascript:;\" class=\"btlink del_ip_write\" data-ip=\"").concat(item, "\">\u5220\u9664</a></td>\n      </tr>");
                            }
                            !html && (html = "<tr><td colspan=\"2\" class=\"text-center\">\u6682\u65E0\u6570\u636E</td></tr>");
                            $('#ip_write_table').html(html);
                            return [2];
                    }
                });
            });
        };
        Config.prototype.setTempAuthView = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_13;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, this.$open({
                                area: ["700px", '550px'],
                                title: "临时授权管理",
                                content: "<div class=\"login_view_table pd15\">\n            <button class=\"btn btn-success btn-sm va0 create_temp_login\" >\u521B\u5EFA\u4E34\u65F6\u6388\u6743</button>\n            <div class=\"divtable mt10\">\n              <table class=\"table table-hover\">\n              <thead><tr><th>\u767B\u5F55IP</th><th>\u72B6\u6001</th><th>\u767B\u5F55\u65F6\u95F4</th><th>\u8FC7\u671F\u65F6\u95F4</th><th style=\"text-align:right;\">\u64CD\u4F5C</th></tr></thead>\n              <tbody id=\"temp_login_view_tbody\"></tbody>\n              </table>\n              <div class=\"temp_login_view_page page\"></div>\n            </div>\n          </div>",
                                success: function () {
                                    _this.reanderTempAuthList();

                                    function fixed_table(name) {
                                        $('#' + name).parent().bind('scroll', function () {
                                            var scrollTop = this.scrollTop;
                                            $(this).find("thead").css({
                                                "transform": "translateY(" + scrollTop + "px)",
                                                "position": "relative",
                                                "z-index": "1"
                                            });
                                        });
                                    }

                                    $('.create_temp_login').on('click', function () {
                                        return __awaiter(_this, void 0, void 0, function () {
                                            var error_14;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        return [4, this.$confirm({
                                                            title: '风险提示',
                                                            msg: '<span style="color:red">注意1：滥用临时授权可能导致安全风险。</br>注意2：请勿在公共场合发布临时授权连接</span></br>即将创建临时授权连接，继续吗？'
                                                        })];
                                                    case 1:
                                                        _a.sent();
                                                        _a.label = 2;
                                                    case 2:
                                                        _a.trys.push([2, 4, , 5]);
                                                        return [4, this.$open({
                                                            area: '570px',
                                                            title: "创建临时授权",
                                                            content: "<div class=\"bt-form create_temp_view\">\n                    <div class=\"line\"><span class=\"tname\">\u4E34\u65F6\u6388\u6743\u5730\u5740</span><div class=\"info-r ml0\"><textarea id=\"temp_link\" class=\"bt-input-text mr20\" style=\"margin: 0px;width: 500px;height: 50px;line-height: 19px;\"></textarea></div></div>\n                    <div class=\"line\"><button type=\"submit\" class=\"btn btn-success btn-sm btn-copy-temp-link\" data-clipboard-text=\"\">\u590D\u5236\u5730\u5740</button></div>\n                    <ul class=\"help-info-text c7\"><li>\u4E34\u65F6\u6388\u6743\u751F\u6210\u540E1\u5C0F\u65F6\u5185\u4F7F\u7528\u6709\u6548\uFF0C\u4E3A\u4E00\u6B21\u6027\u6388\u6743\uFF0C\u4F7F\u7528\u540E\u7ACB\u5373\u5931\u6548</li><li>\u4F7F\u7528\u4E34\u65F6\u6388\u6743\u767B\u5F55\u9762\u677F\u540E1\u5C0F\u65F6\u5185\u62E5\u6709\u9762\u677F\u6240\u6709\u6743\u9650\uFF0C\u8BF7\u52FF\u5728\u516C\u5171\u573A\u5408\u53D1\u5E03\u4E34\u65F6\u6388\u6743\u8FDE\u63A5</li><li>\u6388\u6743\u8FDE\u63A5\u4FE1\u606F\u4EC5\u5728\u6B64\u5904\u663E\u793A\u4E00\u6B21\uFF0C\u82E5\u5728\u4F7F\u7528\u524D\u5FD8\u8BB0\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210</li></ul>\n                  </div>",
                                                            success: function () {
                                                                return __awaiter(_this, void 0, void 0, function () {
                                                                    var rdata, temp_link, clipboard, clipboards;
                                                                    var _this = this;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                return [4, this.$request('setTempAuthLink')];
                                                                            case 1:
                                                                                rdata = _a.sent();
                                                                                temp_link = "".concat(location.origin, "/login?tmp_token=").concat(rdata.token);
                                                                                $('#temp_link').val(temp_link);
                                                                                $('.btn-copy-temp-link').attr('data-clipboard-text', temp_link);
                                                                                this.reanderTempAuthList();
                                                                                return [4, this.$require('clipboard')];
                                                                            case 2:
                                                                                clipboard = (_a.sent()).clipboard;
                                                                                clipboards = new clipboard('.btn');
                                                                                clipboards.on('success', function (ev) {
                                                                                    _this.$msg({
                                                                                        status: true,
                                                                                        msg: '复制成功！'
                                                                                    });
                                                                                    ev.clearSelection();
                                                                                });
                                                                                clipboards.on('error', function (ev) {
                                                                                    _this.$msg({
                                                                                        status: false,
                                                                                        msg: '复制失败，请手动复制地址'
                                                                                    });
                                                                                });
                                                                                return [2];
                                                                        }
                                                                    });
                                                                });
                                                            }
                                                        })];
                                                    case 3:
                                                        _a.sent();
                                                        return [3, 5];
                                                    case 4:
                                                        error_14 = _a.sent();
                                                        return [3, 5];
                                                    case 5:
                                                        return [2];
                                                }
                                            });
                                        });
                                    });
                                    $('#temp_login_view_tbody').on('click', '.logs_temp_login', function (ev) {
                                        var _a = $(ev.target).data(), id = _a.id, ip = _a.ip;
                                        try {
                                            _this.$open({
                                                area: ['700px', '550px'],
                                                title: "\u67E5\u770B\u64CD\u4F5C\u65E5\u5FD7[".concat(ip, "]"),
                                                content: "<div class=\"pd15\">\n                    <button class=\"btn btn-default btn-sm va0 refresh_login_logs\">\u5237\u65B0\u65E5\u5FD7</button>\n                    <div class=\"divtable mt10 tablescroll\" style=\"max-height: 420px;overflow-y: auto;border:none\">\n                      <table class=\"table table-hover\" id=\"logs_login_view_table\">\n                        <thead><tr><th width=\"90px\">\u64CD\u4F5C\u7C7B\u578B</th><th width=\"140px\">\u64CD\u4F5C\u65F6\u95F4</th><th>\u65E5\u5FD7</th></tr></thead>\n                        <tbody ></tbody>\n                      </table>\n                    </div>\n                  </div>",
                                                success: function () {
                                                    _this.reanderTempLogsList(id);
                                                    $('.refresh_login_logs').click(function () {
                                                        _this.reanderTempLogsList(id);
                                                    });
                                                    fixed_table('logs_login_view_table');
                                                }
                                            });
                                        } catch (error) {
                                        }
                                    });
                                    $('#temp_login_view_tbody').on('click', '.remove_temp_login', function (ev) {
                                        return __awaiter(_this, void 0, void 0, function () {
                                            var id, rdata;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        id = $(ev.target).data().id;
                                                        return [4, this.$confirm({
                                                            title: '删除未使用授权',
                                                            msg: '是否删除未使用授权记录，是否继续？'
                                                        })];
                                                    case 1:
                                                        _a.sent();
                                                        return [4, this.$request('removeTempAuthLink', {id: id})];
                                                    case 2:
                                                        rdata = _a.sent();
                                                        return [4, this.$delay()];
                                                    case 3:
                                                        (_a.sent()) && rdata.status && this.reanderTempAuthList();
                                                        return [2];
                                                }
                                            });
                                        });
                                    });
                                    $('#temp_login_view_tbody').on('click', '.clear_temp_login', function (ev) {
                                        return __awaiter(_this, void 0, void 0, function () {
                                            var _a, id, ip, rdata;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        _a = $(ev.target).data(), id = _a.id, ip = _a.ip;
                                                        return [4, this.$confirm({
                                                            title: '强制登出[ ' + ip + ' ]',
                                                            msg: '是否强制登出[ ' + ip + ' ]，是否继续？'
                                                        })];
                                                    case 1:
                                                        _b.sent();
                                                        return [4, this.$request('clearTempAuth', {id: id})];
                                                    case 2:
                                                        rdata = _b.sent();
                                                        return [4, this.$delay()];
                                                    case 3:
                                                        (_b.sent()) && rdata.status && this.reanderTempAuthList();
                                                        return [2];
                                                }
                                            });
                                        });
                                    });
                                    $('.temp_login_view_page').on('click', 'a', function (ev) {
                                        ev.stopPropagation();
                                        ev.preventDefault();
                                        var href = $(ev.target).attr('href'), reg = /([0-9]*)$/, p = reg.exec(href)[0];
                                        _this.reanderTempAuthList(p);
                                    });
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [3, 3];
                        case 2:
                            error_13 = _a.sent();
                            return [3, 3];
                        case 3:
                            return [2];
                    }
                });
            });
        };
        Config.prototype.reanderTempAuthList = function (p) {
            if (p === void 0) {
                p = 1;
            }
            return __awaiter(this, void 0, void 0, function () {
                var html, rdata, _loop_1, this_1, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            html = '';
                            return [4, this.$request('getTempAuthList', {p: p, rows: 10})];
                        case 1:
                            rdata = _a.sent();
                            _loop_1 = function (i) {
                                var item = rdata.data[i];
                                html += "<tr>\n      <td>".concat((item.login_addr || '未登录'), "</td>\n      <td>").concat((function () {
                                    switch (item.state) {
                                        case 0:
                                            return '<a style="color:green;">待使用</a>';
                                        case 1:
                                            return '<a style="color:brown;">已使用</a>';
                                        case -1:
                                            return '<a>已过期</a>';
                                    }
                                }()), "</td>\n        <td>").concat((item.login_time == 0 ? '未登录' : this_1.$formatTime(item.login_time)), "</td>\n        <td>").concat(this_1.$formatTime(item.expire), "</td>\n        <td style=\"text-align:right;\">").concat((function () {
                                    if (item.state != 1)
                                        return "<a href=\"javascript:;\" class=\"btlink remove_temp_login\" data-ip=\"".concat(item.login_addr, "\" data-id=\"").concat(item.id, "\">\u5220\u9664</a>");
                                    if (item.online_state)
                                        return "<a href=\"javascript:;\" class=\"btlink clear_temp_login\" style=\"color:red\" data-ip=\"".concat(item.login_addr, "\" data-id=\"").concat(item.id, "\">\u5F3A\u5236\u767B\u51FA</a>&nbsp;&nbsp;|&nbsp;&nbsp;\n            <a href=\"javascript:;\" class=\"btlink logs_temp_login\" data-ip=\"").concat(item.login_addr, "\" data-id=\"").concat(item.id, "\">\u64CD\u4F5C\u65E5\u5FD7</a>");
                                    return "<a href=\"javascript:;\" class=\"btlink logs_temp_login\" data-ip=\"".concat(item.login_addr, "\" data-id=\"").concat(item.id, "\">\u64CD\u4F5C\u65E5\u5FD7</a>");
                                }()), "</td>\n      </tr > ");
                            };
                            this_1 = this;
                            for (i = 0; i < rdata.data.length; i++) {
                                _loop_1(i);
                            }
                            $('#temp_login_view_tbody').html(html);
                            $('.temp_login_view_page').html(rdata.page);
                            return [2];
                    }
                });
            });
        };
        Config.prototype.reanderTempLogsList = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var html, rdata, i, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            html = '';
                            return [4, this.$request('getTempOperationLogs', {id: id})];
                        case 1:
                            rdata = _a.sent();
                            for (i = 0; i < rdata.length; i++) {
                                item = rdata[i];
                                html += "<tr>\n        <td>".concat(item.type, "</td>\n        <td>").concat(item.addtime, "</td>\n        <td><span title=\"").concat(item.log, "\" style=\"white-space: pre;\">").concat(item.log, "</span></td>\n      </tr>");
                            }
                            $('#logs_login_view_table tbody').html(html);
                            return [2];
                    }
                });
            });
        };
        Config.prototype.render = function () {
            var _this = this;
            var loadT = this.$load(lan.public.the);
            Promise.all([
                this.$request('getConfig', false),
                this.$request('getCheckTwoStep', {loading: false, msg: false}),
                this.$request('getPasswordConfig', {loading: false, msg: false}),
                this.$request('getUserInfo', {loading: false, msg: false}),
                this.$request('getMessageChannel', {loading: false, msg: false}),
                this.$request('getLoginAlarm', {loading: false, msg: false}),
                this.$request('getMenuList', {loading: false, msg: false})
            ]).then(function (resArr) {
                var configInfo = resArr[0], twoStep = resArr[1], pawComplexity = resArr[2], bindUserInfo = resArr[3],
                    messageChannelInfo = resArr[4], loginAlarmInfo = resArr[5], menuList = resArr[6];
                panelConfig.init({configInfo: configInfo, menuList: menuList, bindUserInfo: bindUserInfo});
                safeConfig.init({configInfo: configInfo, twoStep: twoStep, pawComplexity: pawComplexity});
                noticeConfig.init({messageChannelInfo: messageChannelInfo, loginAlarmInfo: loginAlarmInfo});
            }).catch(function (err) {
                console.log(err);
                _this.$error(err.msg || 'Server Error');
            }).finally(function () {
                loadT.close();
            });
        };
        Config.prototype.event = function () {
            var _this = this;
            $('#configTab').on('click', '.tabs-item', function (ev) {
                var el = $(ev.target), index = el.index();
                el.addClass('active').siblings().removeClass('active');
                var panelConfig = $('.configure-box .panel-config');
                if (index !== 0) {
                    panelConfig.eq(index - 1).removeClass('hide').siblings().addClass('hide');
                } else {
                    panelConfig.removeClass('hide');
                }
                _this.$setCookie('config-tab', index);
            });
            var configTab = this.$getCookie('config-tab');
            $('#configTab .tabs-item:eq(' + (configTab || 0) + ')').trigger('click');
            $('input[type="text"]').on('input', function (ev) {
                return __awaiter(_this, void 0, void 0, function () {
                    var el, value, oldValue;
                    return __generator(this, function (_a) {
                        el = $(ev.target);
                        value = el.val();
                        oldValue = el.attr('value');
                        value != oldValue ? el.parent().next().removeAttr('disabled') : el.parent().next().attr('disabled', 'disabled');
                        return [2];
                    });
                });
            });
            $('.savePanelConfig').click(function () {
                return __awaiter(_this, void 0, void 0, function () {
                    var data, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                data = this.getInputData();
                                return [4, this.$request('setPanelConfig', data)];
                            case 1:
                                res = _a.sent();
																var href = '';
																if (data.domain) {
																	href = window.location.protocol + '//' + data.domain + ':' + window.location.port + window.location.pathname;
																} else {
																	href = window.location.protocol + '//' + data.address + ':' + window.location.port + window.location.pathname;
																}
                                res.status && this.$refreshBrowser(href);
                                return [2];
                        }
                    });
                });
            });
            $('.setPanelPort').click(function () {
                return _this.setPanelPortView();
            });
            panelConfig.event();
            safeConfig.event();
            noticeConfig.event();
        };
        Config.prototype.setPanelPortView = function () {
            var _this = this;
            var $input = $('input[name="port"]');
            var port = $input.val();
            this.$open({
                title: 'Change Panel Port',
                area: ['380px', '380px'],
                btn: ['Confirm', 'Cancel'],
                content: {
                    data: {port: port, agreement: false},
                    template: function () {
                        return (0, snabbdom_1.jsx)("div", {class: this.$class('pd20 bt-form')},
                            this.$ul({className: 'explainDescribeList', style: 'margin-top:0;'}, [
                                ['1. Have a security group server, please release the new port in the security group in advance.', 'red'],
                                ['2. If the panel is inaccessible after modifying the port, change the original port to the SSH command line by using the bt command.', 'red']
                            ]),
                            this.$line({title: 'Port', width: '60px'}, this.$input({model: 'port', width: '210px'})),
                            this.$learnMore({
                                title: (0, snabbdom_1.jsx)("span", null,
                                    "I already understand, ",
                                    this.$link({
                                        title: 'How to release the port?',
                                        href: 'https://forum.aapanel.com/d/599-how-to-release-the-aapanel-port'
                                    })), model: 'agreement', id: 'checkPanelPort'
                            }));
                    }
                },
                yes: function (content) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var close, vm, port, data, rdata;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    close = content.close, vm = content.vm, port = parseInt(vm.port);
                                    if (!vm.agreement)
                                        return [2, this.$tips({
                                            el: '#checkPanelPort',
                                            msg: 'Please tick the one I already know'
                                        })];
                                    return [4, this.$verifySubmit(!this.$checkPort(port), 'Please enter correct panel port!')];
                                case 1:
                                    _a.sent();
                                    data = this.getInputData();
                                    data.port = port;
                                    return [4, this.$request('setPanelConfig', data)];
                                case 2:
                                    rdata = _a.sent();
                                    if (rdata.status) {
                                        close();
                                        this.$refreshBrowser("".concat(location.protocol, "//").concat(location.hostname, ":").concat(port).concat(location.pathname));
                                    }
                                    return [2];
                            }
                        });
                    });
                }
            }).catch(function (err) {
            });
        };
        Config.prototype.getInputData = function () {
            var data = {};
            $('.savePanelConfig').each(function (index, item) {
                var $input = $(item).parents('.line').find('input[type="text"]');
                var key = $input.attr('name');
                var value = $input.val();
                data[key] = value;
            });
            return data;
        };
        Config.prototype.eventBind = function () {
            return __awaiter(this, void 0, void 0, function () {
                var configTab;
                var _this = this;
                return __generator(this, function (_a) {
                    $('#configTab').on('click', '.tabs-item', function (ev) {
                        var el = $(ev.target), index = el.index();
                        el.addClass('active').siblings().removeClass('active');
                        var panelConfig = $('.configure-box .panel-config');
                        if (index !== 0) {
                            panelConfig.eq(index - 1).removeClass('hide').siblings().addClass('hide');
                        } else {
                            panelConfig.removeClass('hide');
                        }
                        _this.$setCookie('config-tab', index);
                    });
                    configTab = this.$getCookie('config-tab');
                    $('#configTab .tabs-item:eq(' + (configTab || 0) + ')').trigger('click');
                    $('input[type="checkbox"]').on('change', function (ev) {
                        return __awaiter(_this, void 0, void 0, function () {
                            var el, _a, name, checked, status, config, _b, rdata, error_15;
                            var _this = this;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        el = $(ev.target);
                                        _a = ev.target, name = _a.name, checked = _a.checked;
                                        status = checked ? '开启' : '关闭';
                                        config = {
                                            title: '',
                                            msg: '',
                                            confirm: function () {
                                            }
                                        };
                                        _c.label = 1;
                                    case 1:
                                        _c.trys.push([1, 28, , 29]);
                                        _b = name;
                                        switch (_b) {
                                            case 'close_panel':
                                                return [3, 2];
                                            case 'ipv6':
                                                return [3, 3];
                                            case 'is_local':
                                                return [3, 4];
                                            case 'show_workorder':
                                                return [3, 5];
                                            case 'ssl':
                                                return [3, 6];
                                            case 'basic_auth':
                                                return [3, 10];
                                            case 'check_two_step':
                                                return [3, 14];
                                            case 'ssl_verify':
                                                return [3, 19];
                                            case 'paw_complexity':
                                                return [3, 24];
                                        }
                                        return [3, 25];
                                    case 2:
                                        config = {
                                            title: lan.config.close_panel_title,
                                            msg: lan.config.close_panel_msg,
                                            confirm: function () {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                return [4, this.$request('closePanel')];
                                                            case 1:
                                                                _a.sent();
                                                                this.$refreshBrowser();
                                                                return [2];
                                                        }
                                                    });
                                                });
                                            }
                                        };
                                        return [3, 25];
                                    case 3:
                                        this.$request('setIpv6Status');
                                        return [3, 25];
                                    case 4:
                                        config = {
                                            title: "".concat(status, " \u79BB\u7EBF\u6A21\u5F0F"),
                                            msg: checked ? "".concat(status, " \u79BB\u7EBF\u6A21\u5F0F\u540E\u9762\u677F\u5C06\u505C\u6B62\u8FDE\u63A5\u4E91\u7AEF\uFF0C\u4ECB\u65F6\u8F6F\u4EF6\u5B89\u88C5\u3001\u5378\u8F7D\u3001\u9762\u677F\u66F4\u65B0\u7B49\u529F\u80FD\u5C06\u65E0\u6CD5\u4F7F\u7528\uFF0C\u662F\u5426\u7EE7\u7EED\uFF01") : "\u662F\u5426".concat(status, " \u79BB\u7EBF\u6A21\u5F0F\uFF0C\u7EE7\u7EED\u64CD\u4F5C\uFF01"),
                                            confirm: function () {
                                                return _this.$request('setLocal');
                                            }
                                        };
                                        return [3, 25];
                                    case 5:
                                        config = {
                                            title: "".concat(status, " \u5728\u7EBF\u5BA2\u670D"),
                                            msg: !checked ? "".concat(status, " \u5728\u7EBF\u5BA2\u670D\u540E\uFF0C\u5C06\u4E0D\u5728\u652F\u6301\u5728\u7EBF\u5BA2\u670D\u529F\u80FD\uFF0C\u7EE7\u7EED\u64CD\u4F5C\uFF1F") : "".concat(status, " \u5728\u7EBF\u5BA2\u670D\u540E\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5728\u7EBF\u5BA2\u670D\u529F\u80FD\uFF0C\u5411\u5B9D\u5854\u6280\u672F\u4EBA\u5458\u53CD\u9988\u95EE\u9898\uFF0C\u7EE7\u7EED\u64CD\u4F5C"),
                                            confirm: function () {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                return [4, this.$request('setWorkorder')];
                                                            case 1:
                                                                _a.sent();
                                                                this.$refreshBrowser();
                                                                return [2];
                                                        }
                                                    });
                                                });
                                            }
                                        };
                                        return [3, 25];
                                    case 6:
                                        if (!checked) return [3, 8];
                                        return [4, this.setPanelSslView()];
                                    case 7:
                                        _c.sent();
                                        return [3, 9];
                                    case 8:
                                        config = {
                                            title: "\u5173\u95ED\u9762\u677FSSL",
                                            msg: "\u5173\u95ED\u9762\u677FSSL\u8BC1\u4E66".concat(this.configInfo.ssl_verify ? '，<span style="color:red">检测到当前面板已开启访问设备验证，关闭后，访问设备验证将会失效</span>' : '', "\uFF0C\u662F\u5426\u7EE7\u7EED\uFF01"),
                                            confirm: function () {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    var rdata;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                return [4, this.$request('setPanelSsl')];
                                                            case 1:
                                                                _a.sent();
                                                                return [4, this.$request('restartPanel', false)];
                                                            case 2:
                                                                rdata = _a.sent();
                                                                rdata.status && this.$refreshBrowser(location.href.replace(/^https:/, 'http:'));
                                                                return [2];
                                                        }
                                                    });
                                                });
                                            }
                                        };
                                        _c.label = 9;
                                    case 9:
                                        return [3, 25];
                                    case 10:
                                        if (!checked) return [3, 12];
                                        return [4, this.setBasicAuthView()];
                                    case 11:
                                        _c.sent();
                                        return [3, 13];
                                    case 12:
                                        config = {
                                            title: "\u5173\u95EDBasicAuth\u8BA4\u8BC1",
                                            msg: "\u5173\u95EDBasicAuth\u8BA4\u8BC1\u540E\uFF0C\u9762\u677F\u767B\u5F55\u5C06\u4E0D\u518D\u9A8C\u8BC1BasicAuth\u57FA\u7840\u8BA4\u8BC1\uFF0C\u8FD9\u5C06\u4F1A\u5BFC\u81F4\u9762\u677F\u5B89\u5168\u6027\u4E0B\u964D\uFF0C\u7EE7\u7EED\u64CD\u4F5C\uFF01",
                                            confirm: function () {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    var rdata;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                return [4, this.$request('setBasicAuth', {
                                                                    open: 'False',
                                                                    basic_user: '',
                                                                    basic_pwd: ''
                                                                })];
                                                            case 1:
                                                                rdata = _a.sent();
                                                                rdata.status && this.$refreshBrowser();
                                                                return [2];
                                                        }
                                                    });
                                                });
                                            }
                                        };
                                        _c.label = 13;
                                    case 13:
                                        return [3, 25];
                                    case 14:
                                        if (!checked) return [3, 16];
                                        return [4, this.setGoogleAuthView()];
                                    case 15:
                                        _c.sent();
                                        return [3, 18];
                                    case 16:
                                        return [4, this.$request('setTwoStepAuth', {act: 0})];
                                    case 17:
                                        _c.sent();
                                        _c.label = 18;
                                    case 18:
                                        return [3, 25];
                                    case 19:
                                        if (!checked) return [3, 21];
                                        if (!this.configInfo.ssl) {
                                            el.prop('checked', !checked);
                                            return [2, this.$warning('请先开启面板SSL证书后重试')];
                                        }
                                        return [4, this.setAccessDeviceAuthView()];
                                    case 20:
                                        _c.sent();
                                        return [3, 23];
                                    case 21:
                                        return [4, this.$request('setSslVerify', {status: 0})];
                                    case 22:
                                        rdata = _c.sent();
                                        rdata.status && this.$refreshBrowser();
                                        _c.label = 23;
                                    case 23:
                                        return [3, 25];
                                    case 24:
                                        config = {
                                            title: "".concat(status, " \u5BC6\u7801\u590D\u6742\u5EA6\u9A8C\u8BC1"),
                                            msg: "".concat(status).concat(!checked ? '密码复杂度后，密码登录将不再验证密码复杂度，这将会导致面板安全性下降' : '密码复杂度验证后，将会对密码进行复杂度判断，规则：<span style="color:red;">密码必须满足密码长度大于8位且大写字母、小写字母、数字、特殊字符至少3项组合</span>', "\uFF0C\u7EE7\u7EED\u64CD\u4F5C\uFF01"),
                                            confirm: function () {
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    var rdata;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                return [4, this.$request('setPasswordSafe')];
                                                            case 1:
                                                                rdata = _a.sent();
                                                                rdata.status && this.$refreshBrowser();
                                                                return [2];
                                                        }
                                                    });
                                                });
                                            }
                                        };
                                        return [3, 25];
                                    case 25:
                                        if (!(config.title !== '')) return [3, 27];
                                        return [4, this.$confirm({title: config.title, msg: config.msg})];
                                    case 26:
                                        _c.sent();
                                        config.confirm();
                                        _c.label = 27;
                                    case 27:
                                        return [3, 29];
                                    case 28:
                                        error_15 = _c.sent();
                                        if (typeof error_15.cancel === 'boolean' && error_15.cancel)
                                            el.prop('checked', !checked);
                                        return [3, 29];
                                    case 29:
                                        return [2];
                                }
                            });
                        });
                    });
                    $('input[type="text"]').on('input', function (ev) {
                        return __awaiter(_this, void 0, void 0, function () {
                            var el, value, oldValue, name;
                            return __generator(this, function (_a) {
                                el = $(ev.target);
                                value = el.val();
                                oldValue = el.attr('value');
                                name = el.attr('name');
                                value != oldValue ? el.parent().next().removeAttr('disabled') : el.parent().next().attr('disabled', 'disabled');
                                this.configInfo[name] = value;
                                return [2];
                            });
                        });
                    });
                    $('.savePanelConfig').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            var _a, webname, session_timeout, domain, limitip, sites_path, backup_path, address,
                                systemdate;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = this.configInfo, webname = _a.webname, session_timeout = _a.session_timeout, domain = _a.domain, limitip = _a.limitip, sites_path = _a.sites_path, backup_path = _a.backup_path, address = _a.address, systemdate = _a.systemdate;
                                        return [4, this.$request('setPanelConfig', {
                                            webname: webname,
                                            session_timeout: session_timeout,
                                            domain: domain,
                                            limitip: limitip,
                                            sites_path: sites_path,
                                            backup_path: backup_path,
                                            address: address,
                                            systemdate: systemdate
                                        })];
                                    case 1:
                                        _b.sent();
                                        this.$refreshBrowser();
                                        return [2];
                                }
                            });
                        });
                    });
                    $('.syncDateBtn').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.$request('setSyncDate')];
                                    case 1:
                                        return [2, (_a.sent()) && this.$refreshBrowser(1500)];
                                }
                            });
                        });
                    });
                    $('.editPanelAccount').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.setPanelUserView()];
                                    case 1:
                                        return [2, _a.sent()];
                                }
                            });
                        });
                    });
                    $('.editPanelPassword').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.setPanelPawView()];
                                    case 1:
                                        return [2, _a.sent()];
                                }
                            });
                        });
                    });
                    $('.panelSslConfig').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.setPanelSslConfigView()];
                                    case 1:
                                        return [2, _a.sent()];
                                }
                            });
                        });
                    });
                    $('.basicAuthConfig').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!this.configInfo.basic_auth) return [3, 2];
                                        return [4, this.setBasicAuthConfigView()];
                                    case 1:
                                        _a = _b.sent();
                                        return [3, 4];
                                    case 2:
                                        return [4, this.setBasicAuthView()];
                                    case 3:
                                        _a = _b.sent();
                                        _b.label = 4;
                                    case 4:
                                        _a;
                                        return [2];
                                }
                            });
                        });
                    });
                    $('.checkTwoStepConfig').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.googleAuthRelationView()];
                                    case 1:
                                        return [2, _a.sent()];
                                }
                            });
                        });
                    });
                    $('.sslVerifyConfig').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.setAccessCertificateView()];
                                    case 1:
                                        return [2, _a.sent()];
                                }
                            });
                        });
                    });
                    $('.setPanelPort').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.setPanelPortView()];
                                    case 1:
                                        return [2, _a.sent()];
                                }
                            });
                        });
                    });
                    $('.setSafetyEntrance').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.setSafetyEntranceView()];
                                    case 1:
                                        return [2, _a.sent()];
                                }
                            });
                        });
                    });
                    $('.setPawExpiration').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.setPawExpirationView()];
                                    case 1:
                                        return [2, _a.sent()];
                                }
                            });
                        });
                    });
                    $('.bindBtUser').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.bindBtAccount()];
                                    case 1:
                                        return [2, _a.sent()];
                                }
                            });
                        });
                    });
                    $('.unbindBtUser').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.unbindUser()];
                                    case 1:
                                        return [2, _a.sent()];
                                }
                            });
                        });
                    });
                    $('.menuBarManage').on('click', function () {
                        return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4, this.setPanelGroundView()];
                                    case 1:
                                        return [2, _a.sent()];
                                }
                            });
                        });
                    });
                    $('.sitesPath').on('click', function () {
                        return _this.selectFileDir('[name="sites_path"]', 'dir', function () {
                        });
                    });
                    $('.backupPath').on('click', function () {
                        return _this.selectFileDir('[name="backup_path"]', 'dir', function () {
                        });
                    });
                    $('.setAlarmMail,.setAlarmMailBtn').on('click', function () {
                        return _this.setAlarmView(_this.Info.message_channel_info);
                    });
                    $('.setStatusCodeView').on('click', function () {
                        return _this.setStatusCodeView();
                    });
                    $('.setTempAuthView').on('click', function () {
                        return _this.setTempAuthView();
                    });
                    return [2];
                });
            });
        };
        Config.renderFormColumn = function (configInfo) {
            for (var key in configInfo) {
                if (Object.prototype.hasOwnProperty.call(configInfo, key)) {
                    var value = configInfo[key].value;
                    var el = $('input[name="' + key + '"]');
                    var type = el.attr('type');
                    if (type === 'checkbox') {
                        el.prop('checked', value);
                    } else {
                        el.val(value);
                    }
                }
            }
        };
        return Config;
    }(public_1.default));
    exports.Config = Config;
});
