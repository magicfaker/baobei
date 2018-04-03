<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <router-view class="animated"/>
    <check-update :update="update"></check-update>
  </div>
</template>

<script>

import { Loading } from 'vux'
import { mapState, mapActions } from 'vuex'
import CheckUpdate from '@/components/CheckUpdate.vue'
export default {
  name: 'App',
  data(){
    return {
        update:false,
    }
  },
  components: {
      Loading, CheckUpdate
  },
  computed: {
      ...mapState({
          isLoading: state => state.vux.isLoading,
      })
  },
  methods:{
      ...mapActions(['action']),
  },
  mounted(){
      //检测版本更新
      var time = setInterval(()=>{
          if(window.checkUpdate){
              window.checkUpdate({
                  bool:true,
                  callback:()=>{
                      this.action({
                          moduleName:"app_info",
                          goods:{
                              isNewV:true,
                          }
                      });
                      this.$vux.confirm.show({
                          title:"软件更新提示",
                          content:"1、修改",
                          confirmText:"马上更新",
                          cancelText:"稍后更新",
                          onCancel:()=>{
                          },
                          onConfirm () {
                              this.update = true;
                              setTimeout(()=>{
                                  this.update = false;
                              },500);
                          }
                      })
                  }
              });
              clearInterval(time);
          }
      },200);
      setTimeout(()=>{
          clearInterval(time);
      },10000)

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
  .vux-confirm{}
</style>
