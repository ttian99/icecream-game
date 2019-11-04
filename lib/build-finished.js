var fs = require('fs-extra');
var path = require('path');
var task = require('./task');
var zip = require('node-zip-dir');
var moment = require('moment');

/** 快手操作 */
function kuaishou(options) {
    Editor.log('== kuaishou start =');
    // 拷贝web-mobile到kuaishou
    var kuaishouDir = path.join(options.dest, '../kuaishou/');
    fs.emptyDirSync(kuaishouDir);
    fs.copySync(options.dest, kuaishouDir);
    // 压缩目录
    const destDir = path.join(kuaishouDir, '../res-bake/kuaishou/kuaishou_' + moment().format('YYYYMMDD_HHmmss') + '.zip');
    Editor.log('开始压缩: destDir = ' + destDir);
    zip.zip(kuaishouDir, destDir).then(() => {
        Editor.log('完成压缩: destDir = ' + destDir);
    }).catch(function (err) {
        console.error(err);
    });
    Editor.log('== kuaishou end =');
}

// shareit
function shareit(options) {
    // 拷贝web-mobile到shareit
    var shareitDir = path.join(options.dest, '../shareit/');
    fs.emptyDirSync(shareitDir);
    fs.copySync(options.dest, shareitDir);
    // 写入html
    var tempPath = Editor.url('packages://icecream-game/templete/shareit.txt');
    var str = fs.readFileSync(tempPath);
    var indexHtmlPath = path.join(shareitDir, 'index.html'); // 获取发布目录下的 main.js 所在路径
    var html = fs.readFileSync(indexHtmlPath, 'utf8');
    var idx = html.match().index;
    Editor.log('idx = ' + idx);
    html = html.slice(0, idx) + '\n' + str + '\n' + html.slice(idx);
    fs.writeFileSync(indexHtmlPath, html, 'utf8');
}

function ttgame(options) {
    task.ttCopyBuild(options);
}

module.exports = function (options, callback) {
    Editor.info('==> Building Finished: ' + options.platform + ' to ' + options.dest);
    var cfg = task.loadConfig();
    if (options.platform == 'web-mobile') {
        cfg.pf == 'kuaishou' && kuaishou(options);
    } else if (options.platform == 'wechatgame') {
        cfg.pf == 'ttgame' && ttgame(options);
    }
    callback();
}