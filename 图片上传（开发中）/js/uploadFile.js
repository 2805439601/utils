"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//jquery
var $, Promise, layer;
/**
 * 文件上传类
 */
var UploadFile = /** @class */ (function () {
    /* 构造函数 */
    function UploadFile(param) {
        /* 保存边框颜色 */
        this.lineColor = '';
        //需要处理数据的参数
        this.specialParams = ['drag', 'dragChildEl'];
        /* 验证是否可运行 */
        this.isAction = true;
        //保存数据
        this.param = param;
        //初始化
        this.init();
        //拖放上传
        this.dragUpload();
        //引入依赖文件
        this.includeFile();
    }
    /* 初始化 */
    UploadFile.prototype.init = function () {
        var _this = this;
        if (!$ && typeof $ != 'function') {
            this.isAction = false;
            console.error('未引入jQuery');
            return;
        }
        if (!this.param) {
            this.isAction = false;
            console.error('缺少参数');
            return;
        }
        var _loop_1 = function (item) {
            if (_this.specialParams.filter(function (val) { return val == item; }).length) {
                //保存拖拽元素参数
                for (var val in UploadFile.config[item]) {
                    UploadFile.config[item][val] = this_1.param[item][val] || UploadFile.config[item][val];
                }
                return "continue";
            }
            UploadFile.config[item] = this_1.param[item] || UploadFile.config[item];
        };
        var this_1 = this;
        //参数赋值
        for (var item in this.param) {
            _loop_1(item);
        }
        if (!UploadFile.config.el) {
            this.isAction = false;
            console.error('缺少file元素');
            return;
        }
        //回显元素
        if (UploadFile.config.drag.el) {
            var tagName = $(UploadFile.config.drag.el)[0].tagName;
            switch (tagName.toLowerCase()) {
                case 'div':
                    UploadFile.element = 'div';
                    break;
                case 'ul':
                case 'ol':
                    UploadFile.element = 'li';
                    break;
                case 'dl':
                    UploadFile.element = 'dd';
                    break;
            }
        }
        //最大上传文件数量参数不为数字则不限制上传数量
        UploadFile.config.maxFile = isNaN(UploadFile.config.maxFile) ? 0 : parseInt(UploadFile.config.maxFile);
        //设置元素属性
        $(UploadFile.config.el).attr('multiple', 'multiple');
        //绑定change事件
        $(document).on('change', UploadFile.config.el, function (e) {
            var cloneEl = $(UploadFile.config.el).clone().val('');
            /* 替换元素(可重复上传) */
            $(UploadFile.config.el).replaceWith(cloneEl);
            // 文件验证、保存
            _this.handleSaveFiles(e.target.files);
        });
    };
    //拖拽上传
    UploadFile.prototype.dragUpload = function () {
        var _this = this;
        //保存拖拽元素
        var drag = UploadFile.config.drag;
        if (drag.el) {
            //禁止浏览器打开文件    
            document.addEventListener('drop', function (e) {
                e.preventDefault();
            }, false);
            //文字
            var textEl = document.createElement('span');
            $(textEl).text(drag.text).css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                'font-size': '18px',
                transform: 'translate(-50%,-50%)'
            });
            //设置元素样式
            $(drag.el).css({
                position: 'relative',
                width: drag.width,
                height: drag.height,
                border: drag.border,
                'text-align': 'center',
                'color': '#ccc',
            }).html(textEl);
            //兼容谷歌火狐
            $('html').bind('dragover', drag.el, function (e) {
                var event = e || window.event;
                event.preventDefault();
                event.stopPropagation();
                event.originalEvent.dataTransfer.dropEffect = 'copy';
            });
            //进入目标元素
            $(drag.el).bind('dragenter', function () {
                //保存默认边框颜色
                _this.lineColor = _this.lineColor || $(drag.el).css('border-color');
                $(drag.el).css('border-color', drag.enterLineColor || 'red');
            });
            //离开目标元素
            $(drag.el).on('dragleave', function () {
                //还原默认边框颜色
                $(drag.el).css('border-color', _this.lineColor || $(drag.el).css('border'));
            });
            //在目标元素释放文件
            $(drag.el).on('drop', function (e) {
                var event = e || window.event;
                event.preventDefault();
                event.stopPropagation();
                //还原默认边框颜色
                $(drag.el).css('border-color', _this.lineColor || $(drag.el).css('border'));
                //保存文件
                var files = e.originalEvent.dataTransfer.files;
                // 文件验证、保存
                _this.handleSaveFiles(files);
            });
        }
    };
    //文件上传
    UploadFile.prototype.upload = function () {
        if (!this.isAction) {
            console.error('参数有误');
            return;
        }
    };
    /**
     * 保存文件
     * @param files 文件数组对象
     */
    UploadFile.prototype.handleSaveFiles = function (files) {
        //图片上传最大数量
        var maxFile = UploadFile.config.maxFile;
        if ((UploadFile.files.length + files.length) <= maxFile || maxFile == 0) {
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                _handleAsync(file);
            }
        }
        else {
            layer.msg('超过最大上传文件数量');
        }
    };
    /* 引入依赖文件 */
    UploadFile.prototype.includeFile = function () {
        if (!$ && typeof $ != 'function') {
            this.isAction = false;
            return;
        }
        //引入依赖文件
        var file = '<link href="//cdn.bootcss.com/layer/3.0.1/skin/default/layer.css" rel="stylesheet"> <script src="//cdn.bootcss.com/layer/3.0.1/layer.min.js"></script>';
        $('head').append(file);
    };
    /* 配置参数 */
    UploadFile.config = {
        el: '',
        param: 'file',
        data: {},
        maxFile: 0,
        suffix: ['jpg', 'png', 'gif', 'jpeg'],
        size: 0,
        specs: [],
        drag: {
            el: '',
            text: '拖放文件到此处',
            width: 500,
            height: 200,
            border: '3px dashed #ccc',
            enterLineColor: 'red',
        },
        dragChildEl: {
            width: 200,
            height: 200,
            margin: '10px'
        },
        isRepeat: false,
        handleError: function () { } //文件验证回调
    };
    //保存传入的文件
    UploadFile.files = [];
    return UploadFile;
}());
/**
* 异步保存文件
* @param file 二进制文件
*/
function _handleAsync(file) {
    return __awaiter(this, void 0, void 0, function () {
        var isRepeat, res, style, index_1, el_1, reader, delImg_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isRepeat = false;
                    return [4 /*yield*/, _checkFile(file)
                        //保存文件
                    ];
                case 1:
                    res = _a.sent();
                    //保存文件
                    if (res !== false) {
                        //检查图片重复
                        if (UploadFile.config.isRepeat) {
                            UploadFile.files.forEach(function (val) {
                                if (val.name == res.name && val.lastModified == res.lastModified && val.type == res.type) {
                                    isRepeat = true;
                                }
                            });
                        }
                        if (!isRepeat) {
                            style = UploadFile.config.dragChildEl;
                            //保存数据
                            UploadFile.files.push(res);
                            index_1 = UploadFile.files.length - 1;
                            el_1 = document.createElement(UploadFile.element);
                            //设置元素样式
                            $(el_1).addClass('xy_drag').attr('data-index', index_1).css({
                                position: 'relative',
                                float: 'left',
                                width: style.width,
                                height: style.height,
                                margin: style.margin,
                                'box-shadow': '0 2px 6px #ccc',
                                'background': '#fff',
                                'pointer-events': 'none',
                                'z-index': 6,
                            });
                            reader = new FileReader();
                            //转base64
                            reader.readAsDataURL(file);
                            delImg_1 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiivNfEnxw8LeGNeudHuYNSubi2bbK9rFGyBscjLODkdDxQB6VRXj/8Aw0d4P/6Buuf9+If/AI7R/wANHeD/APoG65/34h/+O0AewUV80/Ef46HxHpX9k+GobuytplxdTzhVlcf3FCscL6nOT04Gc+LUAff9FfCega9qPhrWbfVdLuDDcwtkEdGHdWHcHuK+hbL9pDw01nEb7SdWjuiv71IEjdA3+yS4JH1AoA9norx//ho7wf8A9A3XP+/EP/x2j/ho7wf/ANA3XP8AvxD/APHaAPYKK5zwX410rx1o8mpaUtxHHHMYXjuECurAA9ASMYI710dABRRRQAUUUUAFeE6l+znJqeqXd/N4vJluZnmcnTsnLEk8+b717tRQB8IaFpn9t+IdM0nzvJ+3XcVt5u3ds3uF3YyM4znGRXt5/ZmABJ8XgAdSdN/+215B4E/5KH4a/wCwra/+jVr6V+O9xNB8LbwRSMglnijfacblLZI+nAoA4eL9mqOaMPF4ySRD0ZNOyP8A0bSSfs1xQ7fN8Zom44G7TwMn0/1tJ+zTcTfavENt5jeRshkCZ4DZcZ+uP5Cuf/aIuJpPiJBA8jGKKwj2ITwuWbJA9/6CgDpP+GZf+pu/8pv/ANtpB+zQjOVHjFSy9QNO5H/kWvT/AADeXEvwm0e6klZ5xpwPmMcn5QQP5Cvm34S392Pizo032mUyXE7LMxckyBlbO71z70AavxH+D/8Awr/w9b6t/bv2/wA67W28r7J5WMo7bs72/uYxjvWf8Mvhl/wsb+1P+Jv/AGf9g8r/AJdvN379/wDtrjGz3616/wDtHf8AJPNP/wCwrH/6Klrn/wBmX/maf+3T/wBrUAehfDP4av8ADpNSj/to6hHemMhfs3lCMru5++2c7vbpXfUUUAFFFFABRRRQAUUUUAfEHgT/AJKH4a/7Ctr/AOjVr6Q+Pv8AyS64/wCvqH+dfN/gT/kofhr/ALCtr/6NWvpD4+/8kuuP+vqH+dAHC/s0f8hTxD/1xh/9Ceuf/aF/5KWn/XhF/wChPXQfs0f8hTxD/wBcYf8A0J65/wDaF/5KWn/XhF/6E9AHuPw+/wCSOaT/ANg4/wAjXzX8J/8Akqfh/wD6+f8A2Vq+lPh9/wAkc0n/ALBx/ka+a/hP/wAlT8P/APXz/wCytQB7Z+0d/wAk80//ALCsf/oqWuf/AGZf+Zp/7dP/AGtXQftHf8k80/8A7Csf/oqWuf8A2Zf+Zp/7dP8A2tQB9AUUUUAFFFFABRRRQAUUUUAfEHgT/kofhr/sK2v/AKNWvpD4+/8AJLrj/r6h/nXzf4E/5KH4a/7Ctr/6NWvpD4+/8kuuP+vqH+dAHC/s0f8AIU8Q/wDXGH/0J65/9oX/AJKWn/XhF/6E9dB+zR/yFPEP/XGH/wBCeuf/AGhf+Slp/wBeEX/oT0Ae4/D7/kjmk/8AYOP8jXzX8J/+Sp+H/wDr5/8AZWr6U+H3/JHNJ/7Bx/ka+a/hP/yVPw//ANfP/srUAe2ftHf8k80//sKx/wDoqWuf/Zl/5mn/ALdP/a1dB+0d/wAk80//ALCsf/oqWuf/AGZf+Zp/7dP/AGtQB9AUUUUAFFFFABRRRQAUUUUAfEHgT/kofhr/ALCtr/6NWvpD4+/8kuuP+vqH+dfN/gT/AJKH4a/7Ctr/AOjVr6f+M+i6hrvw3vLXTLWS6uUljl8mJdzsobnA7nnOPagDzb9mj/kKeIf+uMP/AKE9c/8AtC/8lLT/AK8Iv/Qnrtf2efDWs6RJrd7qenXNlFOsUcX2iIxs5BYnAPOBkc+9Yfx58J6/qPjm21DT9IvL21ls0jD20LSYcM2VO0HB5B/GgD1j4ff8kc0n/sHH+Rr5r+E//JU/D/8A18/+ytX1F4L0i8074Z6XpV3F5V4lgI3jY/cYg8H3Gea+efhd4M8SWnxS0trrRb63js5meeSaBlRAFP8AERg5PTHXNAHqH7R3/JPNP/7Csf8A6Klrn/2Zf+Zp/wC3T/2tXQftHf8AJPNP/wCwrH/6Klrn/wBmX/maf+3T/wBrUAfQFFFFABRRRQAUUUUAFFFFAHwbc21/oGsvBMslrf2U3I6NG6nqD9R1r022/aJ8ZwW0cUlto9y6DBmlt3DP7na4H5AV7ZrGm6brV+11eaNplzJjaHubKKV9o6Dcyk1n/wDCL6F/0Lmh/wDgrg/+IoA8p/4aO8Yf9A3Q/wDvxN/8do/4aO8Yf9A3Q/8AvxN/8dr1b/hF9C/6FzQ//BXB/wDEUf8ACL6F/wBC5of/AIK4P/iKAPKf+GjvGH/QN0P/AL8Tf/HaP+GjvGH/AEDdD/78Tf8Ax2vVv+EX0L/oXND/APBXB/8AEUf8IvoX/QuaH/4K4P8A4igD538a/EnxD48MKatLDHbQtvjtbZCkYbGN3JJJxnqTjJxjNer/ALM9tOlp4kumiYQSvbxpIRwzKJCwH0DL+Yrsf+EX0L/oXND/APBXB/8AEV2HhtIbewNnb2tvbQwn5Y7eJY0GcnhVAA5zQBs0UUUAFFFFABRRRQAUUUUAY0dkDKgYcZGa1nIhj+VeB0A4pdijtSkAjBoAjhlMgOV2ke9JLMY2ACbvXmpQoHQUFQTyKABW3IGxjIqGO4Z5NpTAPfNTgYGKQKoOQKAKl/bpKittG/PX2pNPh8nzOOuP61cIB6igKB0FAC0UUUAFFFFAH//Z';
                            //读取图片资源
                            reader.onload = function () {
                                var hmtl = "\n                    <img src=\"" + this.result + "\" style=\"display:block;width:100%\" draggable=\"false\"/>\n                    <div style=\"text-align:center;line-height:0;font-size:12px;\">" + file.name + "</div>\n                    <img src=\"" + delImg_1 + "\" style=\"position: absolute;width: 20%;right:25%;bottom:5px;cursor: pointer;\" data-index=\"" + index_1 + "\" class=\"drag_del\" />\n                ";
                                //回显文件
                                $(UploadFile.config.drag.el).append($(el_1).html(hmtl));
                            };
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * 图片验证
 * @param file 二进制文件
 */
function _checkFile(file) {
    //文件类型
    var type = file.type;
    if (type.indexOf('image/') == -1) {
        layer.msg('请上传图片');
        return false;
    }
    //验证图片类型
    var check = UploadFile.config.suffix.filter(function (val) { return file.name.toLowerCase().indexOf(val) != '-1'; });
    //判断图片类型是否正确
    if (check.length) {
        //判断图片的大小
        if (!(file.size / 1024 / 1024 < UploadFile.config.size)) {
            layer.msg('上传图片的大小不能超过' + UploadFile.config.size + 'M');
            return false;
        }
        var isSize = new Promise(function (resolve, reject) {
            var valid = false;
            var _URL = window.URL || window.webkitURL;
            var img = new Image();
            img.onload = function () {
                //图片尺寸验证
                UploadFile.config.specs.forEach(function (val) {
                    var size = val.split('*');
                    //验证图片尺寸
                    if (img.width == size[0] && img.height == size[1]) {
                        valid = true;
                    }
                });
                valid ? resolve() : reject();
            };
            img.src = _URL.createObjectURL(file);
        }).then(function () {
            return file;
        }, function () {
            layer.msg('上传的图片宽高必须是' + UploadFile.config.specs.join(',') + '!');
            return false;
        });
        return isSize;
    }
    else {
        layer.msg('允许上传的图片格式为：' + UploadFile.config.suffix.join(','));
        return false;
    }
}
