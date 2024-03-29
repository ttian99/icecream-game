﻿(function () {
    var path = require('path');
    var fs = require('fs-extra');
    var spawn = require(Editor.url('./spawn.js'));
    var zip = require('node-zip-dir');
    var moment = require('moment');
    var put = require(Editor.url('./sftp.js'));
    var readLanguage = require(Editor.url('./read-language.js'));
    var readQuestion = require(Editor.url('./read-question.js'));
    var readNews = require(Editor.url('./read-news.js'));

    function Task() {
        this.config = null;
    }

    Task.prototype.install = function () {
        Editor.info('开始: 安装第三方依赖包');
        try {
            var cwd = Editor.Package.packagePath('icecream-game');
            var params = ['install'];
            spawn(cwd, params, function () {
                Editor.success('完成: 安装第三方依赖包');
            });
        } catch (error) {
            Editor.error('错误: 安装第三方依赖包: ' + error.name + ' - ' + error.message);
        }
    }

    Task.prototype.ttCopyBuild = function () {
        Editor.log('开始拷贝wechatgame到ttgame');
        try {
            var cfg = this.loadConfig();
            var src = path.join(Editor.Project.path, 'build/wechatgame');
            var dest = path.join(Editor.Project.path, 'build/ttgame');
            fs.removeSync(dest);
            // fs.emptyDirSync(dest);
            fs.copySync(src, dest);

            var jsonPath = path.join(dest, 'project.config.json');
            var json = fs.readJSONSync(jsonPath, { encoding: 'utf8' });
            Editor.info('ttgame appid = ' + cfg.tt.appid);
            json.appid = cfg.tt.appid;
            fs.writeJSONSync(jsonPath, json, { encoding: 'utf8' });
            Editor.success('完成拷贝wechatgame到ttgame');
        } catch (error) {
            Editor.error('错误拷贝wechatgame到ttgame: ' + error.name + ' - ' + error.message);
        }
    }

    Task.prototype.saveConfig = function (data) {
        Editor.log('开始saveConfig');
        try {
            // Editor.info(this.config);
            fs.writeJsonSync(Editor.url('packages://icecream-game/config/config.json'), this.config, { encoding: 'utf8' })
            Editor.success('完成saveConfig');
            return this.config;   
        } catch (error) {
            Editor.error('错误saveConfig: ' + error.name + ' - ' + error.message);
            return {};
        }
        // Editor.info(this.config);
        // fs.writeJsonSync(Editor.url('packages://icecream-game/config/config.json'), data, { encoding: 'utf8' })
    }

    Task.prototype.loadConfig = function () {     
        // Editor.log('开始loadConfig');
        try {
            if (!this.config) {
                let cfg = fs.readJsonSync(Editor.url('packages://icecream-game/config/config.json'));
                this.config = cfg;
                // Editor.info('== config 为： ' + JSON.stringify(cfg));
            }
            Editor.success('完成loadConfig');
            return this.config;   
        } catch (error) {
            Editor.error('错误loadConfig: ' + error.name + ' - ' + error.message);
            return {};
        }
    }
    /** 压缩res目录 */
    Task.prototype.zipRes = function (pf) {
        try {
            const outDir = path.join(Editor.Project.path, 'build/res-bake/' + pf); 
            fs.ensureDirSync(outDir);
            var resPath = path.join(Editor.Project.path, 'build', pf, 'res');
            const filename = 'res.' + moment().format('YYYYMMDD_HHmmss') + '.zip';
            var outPath = path.join(outDir, filename);
            Editor.log(outPath);
            Editor.log('开始压缩res目录: pf = ' + pf);
            // 压缩
            zip.zip(resPath, outPath).then(() => {
                Editor.log('完成压缩res目录: pf = ' + pf);
                Editor.log('开始删除res目录: pf = ' + pf);
                fs.removeSync(resPath)
                Editor.log('完成删除res目录: pf = ' + pf);
            }).catch(function (err) {
                console.error(err);
            });
        } catch (error) {
            Editor.error('异常zipRes: pf = ' + pf);
            Editor.error(error);
        }
    }

    Task.prototype.uploadRes = function (pf) {
        try {
            Editor.log('开始上传压缩包');
            const DEFAULT_PATH = path.join(Editor.Project.path, 'build/res-bake/', pf);
            let res = Editor.Dialog.openFile({
                title: "选择res压缩包",
                defaultPath: DEFAULT_PATH,
                properties: ['openFile'],
            });
            if (!res) {
                Editor.Dialog.messageBox({
                    type: 'error',
                    buttons: [],
                    message: '请选择一个res的压缩包!',
                });
                return;
            }
            let filename = path.basename(res[0]);
            Editor.info('选择的压缩包为' + filename);
            const cfg = this.loadConfig();
            Editor.info(cfg);
            const localPath = path.join(Editor.Project.path, 'build/res-bake/', pf, filename);
            const remotePath = cfg.remotePath + pf + '/' + filename;
            Editor.log(remotePath);
            put(cfg.ssh, localPath, remotePath, (err) => {
                const type = err ? 'error' : 'info';
                const msg = err ? '上传出现错误' : '上传完成!'; 
                Editor.Dialog.messageBox({
                    type: type,
                    buttons: [],
                    message: msg,
                });
            });
        } catch (error) {
            Editor.error('异常上传压缩包');
            Editor.error(error);
        }
    }

    Task.prototype.readLanguage = function () {
        try {
            Editor.log('开始读取语言配置');
            const excelFile = path.join(path.join(Editor.Project.path, 'doc/excel/《放置牧语》in-game_全语言.xlsx'));
            const outDir = path.join(path.join(Editor.Project.path, 'doc/config/language'));
            readLanguage(excelFile, outDir);
            Editor.success('完成读取语言配置');
        } catch (error) {
            Editor.error('异常读取语言配置');
            Editor.error(error);
        }
    }

    Task.prototype.readQuestion = function () {
        try {
            Editor.log('开始读取问答配置');
            const excelFile = path.join(path.join(Editor.Project.path, 'doc/excel/答题系统问题列表.xlsx'));
            const outDir = path.join(path.join(Editor.Project.path, 'doc/config/question'));
            readQuestion(excelFile, outDir);
            Editor.success('完成读取问答配置');
        } catch (error) {
            Editor.error('异常读取问答配置');
            Editor.error(error);
        }
    }

    Task.prototype.readNews = function () {
        try {
            Editor.log('开始读取新闻列表');
            const excelFile = path.join(path.join(Editor.Project.path, 'doc/excel/放置牧语新闻列表.xlsx'));
            const outDir = path.join(path.join(Editor.Project.path, 'doc/config/news'));
            readNews(excelFile, outDir);
            Editor.success('完成读取新闻列表');
        } catch (error) {
            Editor.error('异常读取新闻列表');
            Editor.error(error);
        }
    }

    /** 修改远程服务器地址和appid */
    Task.prototype.editConfig = function(pf) {
        // this.config = 
    }

    var task = new Task();
    module.exports = task;
})();