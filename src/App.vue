<template>
  <div id="app">
    <div class="routeWrap">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
.routeWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
</style>
