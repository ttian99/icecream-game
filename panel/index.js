let task = require(Editor.url('packages://icecream-game/lib/task.js'));
var path = require('path');
let cfg = task.loadConfig();

// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  // css style for panel
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  // html template for panel
  template: `
    <h1>放置牧语（Icecream）游戏插件</h1>
    <hr />
    <h2>头条小游戏(ttgame)</h2>
      <section>
        <ui-prop name="自动拷贝" tooltip="自动拷贝构建完成的wechatgame到ttgame">
        <ui-checkbox id="tt_auto_copy"></ui-checkbox>
        </ui-prop>
        <ui-prop name="AppID" tooltip="头条小程序的AppID，真机调试需要填写正确">
        <ui-input id="tt_appid" placeholder="输入头条小程序appid"></ui-input>
        </ui-prop>
        <ui-prop name="remotePath" tooltip="修改res.zip上传的远程路径">
        <ui-input id="remote_path" placeholder="输入res.zip上传的远程路径"></ui-input>
        </ui-prop>
      </section>
      <div style="margin-top: 20px; margin-bottom: 20px; text-align: center">
        <ui-button id="tt_save_btn" class="green">保存</ui-button>
      </div>
    <hr />
    <h2>微信小游戏(wechat)</h2>
  `,

  // element and variable binding
  $: {
    tt_auto_copy: '#tt_auto_copy',
    tt_appid: '#tt_appid',
    tt_save_btn: '#tt_save_btn',
    remote_path: '#remote_path',
  },

  run(data) {

  },

  // method executed when template and styles are successfully loaded and initialized
  ready() {
    this.$remote_pat.value = cfg.$remote_path.value;
    this.$tt_auto_copy.checked = cfg.autoCopy;
    this.$tt_appid.value = cfg.appid;    
    this.$tt_save_btn.addEventListener('confirm', () => {
      const appid = this.$tt_appid.$input.value;
      const autoCopy = this.$tt_auto_copy.checked;
      const remotePath = this.$remote_path.value;
      cfg.appid = appid;
      cfg.autoCopy = autoCopy;
      cfg.remotePath = remotePath;
      Editor.info(`appid = ${appid} autoCopy = ${autoCopy} remotePath = ${remotePath}`);
      task.saveConfig(cfg);
    });

    this.$prefab_count_checkbox.addEventListener('change', (event) => {
      this.$prefab_count.disabled = !!this.$prefab_count_checkbox.checked;
    });
  },

  // register your ipc messages here
  messages: {
    'facebook-instant-game-debug:hello'(event) {
      this.$label.innerText = 'Hello!';
    }
  }

});