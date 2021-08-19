/* eslint-disable */
/**
 * 解决hbuilder打包app之后点击手机返回键直接退出app
 */

document.addEventListener("plusready", function() {
  var webview = plus.webview.getLaunchWebview();
  var first = null;
  plus.key.addEventListener("backbutton", function() {
    webview.canBack(function(e) {
      if (e.canBack) {
        webview.back();
      } else {
        //webview.close(); //hide,quit
        //plus.runtime.quit();
        //首页返回键处理
        //处理逻辑：1秒内，连续两次按返回键，则退出应用；
        if (!first) {
          first = new Date().getTime();
          // plus.nativeUI.toast("再按一次退出应用");
          plus.nativeUI.toast("再按一次退出应用");
          setTimeout(function() {
            first = null;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 1500) {
            plus.runtime.quit();
          }
        }
      }
    });
  });
});

