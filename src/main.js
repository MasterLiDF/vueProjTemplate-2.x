import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// 设计稿以750px为宽度，把页面宽度设计为10rem的情况下
// const baseSize = 75; // 这个是设计稿中1rem的大小。
// function setRem() {
//     // 实际设备页面宽度和设计稿的比值
//     const scale = document.documentElement.clientWidth / 750;
//     // 计算实际的rem值并赋予给html的font-size
//     document.documentElement.style.fontSize = (baseSize * scale) + 'px';
// }
// setRem();
// window.addEventListener('resize', () => {
//     setRem();
// });
