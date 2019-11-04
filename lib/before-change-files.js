var fs = require('fs-extra');
var path = require('path');
var task = require('./task');

function kuaishou(options) {
    const templeteDir = path.join(Editor.Project.path, 'build-templates/kuaishou');
    fs.copySync(templeteDir, options.dest);
}


module.exports = function (options, callback) {
    Editor.info('开始 before-change-files: ' + options.platform + ' to ' + options.dest);
    try {
        var cfg = task.loadConfig();
        if (options.platform == 'web-mobile') {
            cfg.pf == 'kuaishou' && kuaishou(options);
        } else if (options.platform == 'wechatgame') {
            // modifyRemotePath(options, cfg.pf);
        }
        Editor.success('完成 before-change-files');
    } catch (error) {
        Editor.error('错误 before-change-files: ' + error.name + ' - ' + error.message);
    }
    callback();
}