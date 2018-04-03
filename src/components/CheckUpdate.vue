<template>
    <div class="CheckUpdate">
        <x-dialog :show="show">
            <div class="downloading">
                <div class="title">下载中</div>
                <x-progress :show-cancel="false" :percent="percent"></x-progress>
            </div>
        </x-dialog>
        <div hidden="hidden">{{newUpdate}}</div>
    </div>
</template>

<script>
    import { XDialog, XProgress} from "vux"
    export default {
        name: "check-update",
        components:{
            XDialog, XProgress
        },
        data(){
            return {
                percent:0,
                show:false,
            }
        },
        props:{
            update:{
                type:Boolean,
                default:false,
            }
        },
        methods:{
            init(){
                window.checkUpdate({
                    callback:()=>{
                        this.show = true;
                        var time = setInterval(()=>{
                            if(this.percent >= 100){
                                clearInterval(time);
                                this.show = false;
                                return;
                            }
                            if(this.percent < 99){
                                this.percent += 1;
                            }
                        },300);
                    },
                    err:()=>{
                        this.show = false;
                    },
                    ok:()=>{
                        this.percent = 100;
                        this.show = false;
                    }
                });
            }
        },
        computed:{
          newUpdate(){
              if(this.update){
                  this.init();
              }
          }
        }
    }
</script>

<style scoped lang="less">
.CheckUpdate{
    .downloading{
        padding: 20px;
        .title{
            text-align: left;
            margin-bottom: 10px;
        }
    }
}
</style>