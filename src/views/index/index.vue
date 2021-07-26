<template>
  <div id="indexPage">
    <!-- IndexPage {{ title }}
    <div class="loader">test loader</div> -->
    <vScroll />
  </div>
</template>
<script>
import vScroll from '@/components/vScroll'
export default {
  components: {
    vScroll,
  },
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
