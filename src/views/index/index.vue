<template>
  <div id="indexPage">
    IndexPage {{ title }}
    <div class="loader">test loader</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'vue template',
    }
  },
}
</script>
<style lang="scss" scoped>
$red: red;
#indexPage {
  .loader {
    color: $red;
  }
}
</style>
