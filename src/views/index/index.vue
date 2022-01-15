<template>
  <div id="indexPage">
    welcome
    <div class="loader">{{ title }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'vue2 template',
    }
  },
}
</script>
<style lang="scss" scoped>
$red: red;
#indexPage {
  text-align: center;
  margin: 100px;
  .loader {
    color: $red;
  }
}
</style>
