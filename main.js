'use strict';
var task = require('./lib/task');
var onBuildStart = require('./lib/build-start');
var onBeforeChangeFiles = require('./lib/before-change-files');
var onBuildFinished = require('./lib/build-finished');

module.exports = {
  load () {
    // execute when package loaded
    Editor.log('==== load ===');
    Editor.Builder.on('build-start', onBuildStart);
    Editor.Builder.on('before-change-files', onBeforeChangeFiles);
    Editor.Builder.on('build-finished', onBuildFinished);
    task.loadConfig();
  },

  unload () {
    // execute when package unloaded
    Editor.Builder.removeListener('build-start', onBuildStart);
    Editor.Builder.removeListener('before-change-files', onBeforeChangeFiles);
    Editor.Builder.removeListener('build-finished', onBuildFinished);
    // task.saveConfig();
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
    'tt-zip-res'() {
      task.zipRes('ttgame')
    },
    'tt-upload-res'() {
      Editor.log('上传res包: ttgame');
      task.uploadRes('ttgame');
    },
    'wx-zip-res'() {
      task.zipRes('wechatgame')
    },
    'wx-upload-res'() {
      Editor.log('上传res包: wechat');
      task.uploadRes('wechatgame');
    },
    'readLanguage' () {
      Editor.log('读取语言翻译');
      task.readLanguage();
    },
    'readQuestion' () {
      Editor.log('读取问答翻译');
      task.readQuestion();
    },
    'editor:build-finished'(event, arg) {
      // const cfg = task.loadConfig();
      // if (cfg.autoCopy && arg.actualPlatform == 'wechatgame') {
      //   Editor.Ipc.sendToMain('icecream-game:tt-copy-build');
      // }
    }
  },
};