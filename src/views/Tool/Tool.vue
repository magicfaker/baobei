<template>
    <div class="Tool">
        工具中心
        <div @click="exit">退出</div>
    </div>
</template>

<script>
    import { mapActions } from  "vuex"
    export default {
        name: "tool",
        methods:{
            ...mapActions(['action']),
            exit(){
                this.action({
                    moduleName:'login_post',
                    goods:undefined,
                });
                delete localStorage.login_post;
                this.$router.push("/Login")
            }
        }
    }
</script>

<style scoped lang="less">
.Tool{

}
</style>