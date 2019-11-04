let task = require(Editor.url('packages://icecream-game/lib/task.js'))
var path = require('path')

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
    <h2>通用配置</h2>
      <section>
        <ui-prop name="当前打包的平台" tooltip="标识需要做对应处理的平台">
          <ui-select id="pf" value="wechat">
            <option value="normal">normal</option>
            <option value="wechat">wechat</option>
            <option value="ttgame">ttgame</option>
            <option value="facebook">facebook</option>
            <option value="googleplay">googleplay</option>
            <option value="qqgame">qqgame</option>
            <option value="oppo">oppo</option>
            <option value="shareit">shareit</option>
            <option value="vivo">vivo</option>
            <option value="kuaishou">kuaishou</option>
            <option value="ios">ios</option>
          </ui-select>
        </ui-prop>
      </section>
      <section>
        <ui-prop name="remotePath" tooltip="修改res.zip上传的远程路径">
          <ui-input id="remote_path" placeholder="输入res.zip上传的远程路径"></ui-input>
        </ui-prop>
      </section>
    <h2>头条小游戏(ttgame)</h2>
      <section>
        <ui-prop name="自动拷贝" tooltip="自动拷贝构建完成的wechatgame到ttgame">
        <ui-checkbox id="tt_auto_copy"></ui-checkbox>
        </ui-prop>
        <ui-prop name="AppID" tooltip="头条小程序的AppID，真机调试需要填写正确">
        <ui-input id="tt_appid" placeholder="输入头条小程序appid"></ui-input>
        </ui-prop>
      </section>
    <hr />
    <h2>微信小游戏(wechat)</h2>
    <section>
        <ui-prop name="AppID" tooltip="微信小游戏的AppID，真机调试需要填写正确">
          <ui-input id="wx_appid" placeholder="输入微信小游戏appid"></ui-input>
        </ui-prop>
    </section>
    <div style="margin-top: 20px; margin-bottom: 20px; text-align: center">
      <ui-button id="save_btn" class="green">保存</ui-button>
    </div>
  `,

  // element and variable binding
  $: {
    pf: '#pf',
    tt_auto_copy: '#tt_auto_copy',
    tt_appid: '#tt_appid',
    wx_appid: '#wx_appid',
    save_btn: '#save_btn',
    remote_path: '#remote_path'
  },

  run(data) {},

  // method executed when template and styles are successfully loaded and initialized
  ready() {
    var cfg = task.loadConfig()
    // Editor.info(JSON.stringify(cfg))
    this.$remote_path.value = cfg.remotePath;
    this.$tt_auto_copy.checked = cfg.tt.autoCopy;
    this.$tt_appid.value = cfg.tt.appid;
    this.$wx_appid.value = cfg.wx.appid;
    this.$pf.value = cfg.pf;

    this.$save_btn.addEventListener('confirm', () => {
      cfg.wx.appid = this.$wx_appid.$input.value;
      cfg.tt.appid = this.$tt_appid.$input.value;
      cfg.tt.autoCopy = this.$tt_auto_copy.checked;
      cfg.remotePath = this.$remote_path.value;
      cfg.pf = this.$pf.value;
      task.saveConfig(cfg)
    })

    this.$prefab_count_checkbox.addEventListener('change', (event) => {
      this.$prefab_count.disabled = !!this.$prefab_count_checkbox.checked
    });
  },

  // register your ipc messages here
  messages: {
    'facebook-instant-game-debug:hello'(event) {
      this.$label.innerText = 'Hello!'
    }
  }

})