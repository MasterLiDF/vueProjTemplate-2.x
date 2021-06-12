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
  //号码生成
  numArrGen(min, max, withZero = false) {
    let arr = [];
    for (let i = min; i <= max; i++) {
      let _i = i < 10 && withZero ? `0${i}` : `${i}`;
      arr.push({
        en_name: `${i}`,
        name: `${_i}`
      });
    }
    return arr;
  },
  //排序:从小到大
  mSort(data = []) {
    let arr = [...data];
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  },
  //秒->时:分:秒
  secondToHMS(time) {
    let h = Math.floor(time / (60 * 60));
    let m = Math.floor((time - h * (60 * 60)) / 60);
    let s = time - h * (60 * 60) - m * 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  },
  //清理缓存
  clearSomeCache() {
    let whiteList = ["isLogin", "token", "userInfo"];
    // 待办。
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (whiteList.includes(key)) {
        continue;
      }
      localStorage.removeItem(key);
    }
    sessionStorage.clear();
    // 置空使用了localstorage的store
    store.commit("lottery/initAllLotterys", null); 
    store.commit("lottery/setSeries_menu", null);
    store.commit("thirdGame/initAllThirdGames", null);
    store.commit("thirdGame/setThirdGameMenu", null);
    store.commit("lottery/clearFavList", null);
  },
  logOut(){
    store.commit("auth/setToken", null);
    store.commit("auth/setLoginState", false);
    store.commit("auth/setUserInfo", {});
    store.commit("lottery/clearFavList");
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
