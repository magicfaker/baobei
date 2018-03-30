<template>
    <div class="HomeLayout">
        <layout-header></layout-header>
        <div class="homeMain">
            <router-view></router-view>
        </div>
        <layout-footer></layout-footer>
    </div>
</template>

<script>
    import LayoutHeader from './LayoutHeader'
    import LayoutFooter from './LayoutFooter'
    export default {
        name: "home-layout",
        components:{
            LayoutHeader, LayoutFooter
        }
    }
</script>

<style scoped lang="less">
.HomeLayout{
    .homeMain{
        padding-bottom: 50px;
    }
}
</style>