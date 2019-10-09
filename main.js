'use strict';
var task = require('./lib/task');

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('icecream-game');
    },
    'fb-copy-debug' () {
      task.fbCopyDebug();
    },
    'fb-import-level' () {
      task.fbImportLevel();
    },
    'tt-copy-build' () {
      task.ttCopyBuild();
    },
    'install' () {
      task.install();
    },
    'md5_map' () {
      task.makeMD5Map('ttgame');
    },
    'zipRes' () {
      task.zipRes('ttgame')
    },
    'uploadRes' () {
      Editor.log('上传res包');
      task.uploadRes();
    },
    'readLanguage' () {
      Editor.log('读取语言翻译');
      task.readLanguage();
    },
    'editor:build-finished'(event, arg) {
      const cfg = task.loadConfig();
      if (cfg.autoCopy && arg.actualPlatform == 'wechatgame') {
        Editor.Ipc.sendToMain('icecream-game:tt-copy-build');
      }
    }
  },
};