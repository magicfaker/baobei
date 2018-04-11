<template>
    <div class="HomeLayout">
        <layout-header></layout-header>
        <div class="homeMain">
            <router-view :class="`animated ${airforce.layout.animatedName}`"></router-view>
        </div>
        <layout-footer></layout-footer>
    </div>
</template>

<script>
    import LayoutHeader from './LayoutHeader'
    import LayoutFooter from './LayoutFooter'
    import { mapGetters } from "vuex"
    export default {
        name: "home-layout",
        components:{
            LayoutHeader, LayoutFooter
        },
        computed:{
            ...mapGetters(['airforce'])
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