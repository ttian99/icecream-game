try {
    var fs = require('fs');
    var path = require('path');
    var task = require('./task');
} catch (error) {
    throw error;
}

/** 获取版本号 */
function getProjectVersion() {
    var cfgPath = Editor.url('db://assets/scripts/config/cfg.ts');
    var cfgStr = fs.readFileSync(path.join(cfgPath), 'utf8');
    
    Editor.info(cfgStr);
    var result = cfgStr.match(/(version = )([A-z]|.|')*(;$)/igm);
    var version = '0.0.0';
    if (result) {
        version = result[0].replace(/(version = )|'|;|"/igm, '');
    }
    Editor.log('version = ' + version);
    return version;
}
/** 改写小游戏远程服务器地址 */
function modifyWechatGame(options, pf) {
    var version = getProjectVersion();
    var REMOTE_SERVER_ROOT = 'https://wx-ggs.r2games.com.cn:9110/icecream/' + pf + '/' + version;
    options.wechatgame.REMOTE_SERVER_ROOT = REMOTE_SERVER_ROOT;
    Editor.info('REMOTE_SERVER_ROOT = ' + REMOTE_SERVER_ROOT);
}

module.exports = function (options, callback) {
    Editor.info('开始 Building start: ' + options.platform + ' to ' + options.dest);
    var cfg = task.loadConfig();
    try {
        if (options.platform == 'wechatgame') {
            modifyWechatGame(options, cfg.pf);
        }
        Editor.success('完成 Building start');
    } catch (error) {
        Editor.error('错误 Building start: ' + error.name + ' - ' + error.message);
    }
    callback();
}