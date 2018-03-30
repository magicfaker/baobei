<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <router-view class="animated"/>
  </div>
</template>

<script>

import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
      Loading
  },
  computed: {
      ...mapState({
          isLoading: state => state.vux.isLoading
      })
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import './assets/css/animate.min.css';
  //*
  @font-face {
    font-family: 'iconfont';
    src: url('./assets/fonts/iconfont.eot');
    src: url('./assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/iconfont.woff') format('woff'),
    url('./assets/fonts/iconfont.ttf') format('truetype'),
    url('./assets/fonts/iconfont.svg#iconfont') format('svg');
  }
  //*/
  /*
  @Nb:"font_590408_gk10bzn1u9sve7b9";
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/@{Nb}.eot');
    src: url('//at.alicdn.com/t/@{Nb}.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/@{Nb}.woff') format('woff'),
    url('//at.alicdn.com/t/@{Nb}.ttf') format('truetype'),
    url('//at.alicdn.com/t/@{Nb}.svg#iconfont') format('svg');
  }
  //*/
  .iconfont{
    font-family: 'iconfont';
  }
  body{
    background-color: #f7f6f5;
  }
</style>
