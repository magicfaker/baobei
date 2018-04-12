<template>
  <div id="app" ref="app">
      <loading v-model="isLoading"></loading>
      <router-view/>
      <check-update :update="update"></check-update>
  </div>
</template>

<script>
import { Loading } from 'vux'
import Hammer from 'hammerjs'
import { mapState, mapActions, mapGetters } from 'vuex'
import CheckUpdate from '@/components/CheckUpdate.vue'
export default {
  name: 'App',
  data(){
    return {
        update:false,
        banners:[],
        confirmBack:0,
    }
  },
  components: {
      Loading, CheckUpdate
  },
  computed: {
      ...mapGetters(['airforce']),
      ...mapState({
          isLoading: state => state.vux.isLoading,
      })
  },
  methods:{
      ...mapActions(['action']),
      notWhiteListBack(event){
          var  callback = new Function();
          if(typeof event == "function"){
              callback = event;
          };
          //白名单
          const whiteList = ["车险分期","分期订单","工具","我的","登录"];
          if(!whiteList.some(title=>{return title == this.airforce.layout.title; })){
              this.$router.back();
          }else {
              callback();
          };
      }
  },
  mounted(){
      var time = setInterval(()=>{
          //检测版本更新
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
                          onConfirm:()=> {
                              this.update = true;
                              setTimeout(()=>{
                                  this.update = false;
                              },500);
                          }
                      })
                  }
              });
              //监听安卓返回键
              if(window.backListener && window.backListener.start){
                  window.backListener.start(()=> {
                      this.notWhiteListBack(()=>{
                          if(this.confirmBack > 0){
                              plus.runtime.quit();
                              return;
                          };
                          this.$vux.toast.show({
                              text:"再次点击退出",
                              type:"text",
                              width:"auto",
                              position:"bottom",
                          });
                          this.confirmBack += 1;
                          setTimeout(()=>{
                              this.confirmBack = 0;
                          },2500);
                      });
                  });
              };
              clearInterval(time);
          }
      },200);
      setTimeout(()=>{
          clearInterval(time);
      },10000);

      //滑动返回上一页
      var h = new Hammer(this.$refs.app);
      h.on('swiperight',(e) =>{
          this.notWhiteListBack(e);
      });

  }
}
</script>

<style lang="less">
    #app{
        min-height: 100%;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }
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
  .HomeXbutton{
    width: 80% !important;
    border: none !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    background-color: #f19820 !important;
    color: #fff !important;
    margin-top: 40px !important;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.09) !important;
    margin-bottom: 100px !important;
    &:active {
      border-color: rgba(241, 152, 32, 0.6) !important;
      background-color: rgba(241, 152, 32, 0.6) !important;
    }
    &:after{
      border: none !important;
    }
  }
</style>
