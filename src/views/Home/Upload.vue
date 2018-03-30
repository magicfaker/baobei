<template>
    <div class="Upload">
        <!--idcard_front:'上传身份证正面',-->
        <!--idcard_back:'上传身份证反面',-->
        <!--vehicle_license:'上传行驶证整页/购车发票/车辆登记证明(三选一)',-->
        <!--bank_card:'上传接收借款的借记卡',-->
        <!--payment_slip:'上传保险缴费单',-->
        <!--safe_no:'上传保险公司收款账号'-->
        <!--
        :imgSrc="url + uploadOld.idcard_front"
        :imgSrc="url + uploadOld.idcard_back"
        :imgSrc="url + uploadOld.bank_card"
        -->
        <images-upload inputOfFile="idcard_front" text="上传身份证正面" toastText="身份证正面"></images-upload>
        <images-upload inputOfFile="idcard_back" text="上传身份证反面" toastText="身份证反面"></images-upload>
        <images-upload inputOfFile="vehicle_license" text="上传行驶证正页/购车发票/车辆登记证书" text2="(三选一)" toastText="三选一"></images-upload>
        <images-upload inputOfFile="bank_card" text="上传还款的借记卡" toastText="还款的借记卡"></images-upload>
        <images-upload inputOfFile="payment_slip" text="上传投保人变更凭证" toastText="投保人变更凭证"></images-upload>
        <images-upload inputOfFile="safe_no" text="上传保险公司的收款账号" toastText="保险公司的收款账号"></images-upload>
        <images-upload inputOfFile="other_img" :type="2" toastText="其它" :src="require('@/assets/img/home/addUpload.png')" title="其它上传(选填)" name="upload_account"></images-upload>
        <box>
            <x-button type="primary" class="HomeXbutton"  @click.native="homeSubmitNext">确认上传</x-button>
        </box>
    </div>
</template>

<script>
    import ImagesUpload from "@/components/ImagesUpload.vue"
    import { mapActions, mapGetters } from 'vuex'
    import {Box, XButton } from 'vux'
    export default {
        name: "upload",
        data(){
            return {
                url:'http://egretloan.img-cn-qingdao.aliyuncs.com/',
            }
        },
        methods: {
            ...mapActions(['action']),
            homeSubmitNext(){
                if(!this.airforce.homeSubmit.upload_idcard_front ||
                    !this.airforce.homeSubmit.upload_idcard_front.bool ){
                    this.$vux.toast.text("请上传身份证正面");
                    return;
                }else
                if(!this.airforce.homeSubmit.upload_idcard_back ||
                    !this.airforce.homeSubmit.upload_idcard_back.bool ){
                    this.$vux.toast.text("请上传身份证反面");
                    return;
                }else
                if(!this.airforce.homeSubmit.upload_vehicle_license ||
                    !this.airforce.homeSubmit.upload_vehicle_license.bool ){
                    this.$vux.toast.text("请上传三选一");
                    return;
                }else
                if(!this.airforce.homeSubmit.upload_bank_card ||
                    !this.airforce.homeSubmit.upload_bank_card.bool ){
                    this.$vux.toast.text("请上传还款借记卡");
                    return;
                }else
                if(!this.airforce.homeSubmit.upload_payment_slip ||
                    !this.airforce.homeSubmit.upload_payment_slip.bool ){
                    this.$vux.toast.text("请上传投保人变更凭证");
                    return;
                }else
                if(!this.airforce.homeSubmit.upload_safe_no ||
                    !this.airforce.homeSubmit.upload_safe_no.bool ){
                    this.$vux.toast.text("请上传保险公司收款账号");
                    return;
                }
                if(this.$router.currentRoute.query.editor == "true"){
                    this.$router.push("/app/HomeLayout/authentication?editor="+this.$router.currentRoute.query.editor);
                    return;
                }
                this.$router.push("/app/HomeLayout/authentication")
            }
        },
        computed: {
            ...mapGetters(['airforce']),
            uploadOld(){
                try {
                    if(typeof this.airforce.SelectType_post.data == "object"){
                        return this.airforce.SelectType_post.data;
                    }
                }catch (e){}
                return [];
            }
        },
        mounted(){
            this.action({
                moduleName:"layout",
                goods:{
                    marquee:"影像资料"
                }
            })
        },
        components:{
            ImagesUpload, Box, XButton
        }
    }
</script>

<style scoped lang="less">
    .Upload{
        padding-top: 1px;
        .HomeXbutton{
            width: 80%;
            border: none;
            border-radius: 10px;
            overflow: hidden;
            background-color: #f19820;
            color: #fff;
            margin-top: 40px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.09);
            margin-bottom: 100px;
            &:active {
                border-color: rgba(241, 152, 32, 0.6) !important;
                background-color: rgba(241, 152, 32, 0.6) !important;
            }
            &:after{
                border: none;
            }
        }
    }
</style>