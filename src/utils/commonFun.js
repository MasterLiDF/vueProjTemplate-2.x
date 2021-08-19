/* eslint-disable */
//公共函数
import store from "@/store";
const commonFun = {
  //简易版克隆
  mclone(data) {
    try {
      let step1 = JSON.stringify(data);
      let step2 = JSON.parse(step1);
      return step2;
    } catch (e) {
      return false;
    }
  },
  logOut(){
    store.commit("auth/setToken", null);
    store.commit("auth/setLoginState", false);
    store.commit("auth/setUserInfo", {});
    localStorage.clear();
    sessionStorage.clear();
  },
  //判断平台
  isAndroidOs(){
    return /android/i.test(navigator.userAgent);
  },
  isIosOs(){
    return /ipad|iphone|mac/i.test(navigator.userAgent);
  },
  // 设置系统状态栏背景颜色
  setStatusBarBg(bg){
    // 默认红色
    let _bg = bg || '#dc3d40';
    if (window.plus) {
    	window.plus.navigator.setStatusBarBackground(_bg);
    }
  },
  //  设置应用全屏
  setFullScreen(){
    if (window.plus) {
      window.plus.navigator.setFullscreen(true);  
      // plus.navigator.hideSystemNavigation()
    }
  },
  setNotFullScreen(){
    if (window.plus) {
      window.plus.navigator.setFullscreen(false);  
      // plus.navigator.hideSystemNavigation()
    }
  }
};

export default commonFun;
