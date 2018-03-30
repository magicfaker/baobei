<template>
    <div class="LayoutFooter">
        <tabbar :class="`homeTabbar ${(!airforce.layout.navShow)? 'hide':''}`" @on-index-change="tabMenuNav">
            <tabbar-item class="homeTabbarItem" v-for="(item,index) in airforce.homeTabbar" :key="index" :selected="item.selected">
                <img slot="icon" v-if="!item.iconSelectBool" :src="item.icon">
                <img slot="icon" v-else :src="item.iconSelect">
                <span slot="label">{{item.txt}}</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "layout-footer",
        components:{
            Tabbar, TabbarItem,
        },
        methods: {
            ...mapActions(['action']),
            tabMenuNav(e){
                const homeTabbar = JSON.parse(JSON.stringify(this.airforce.homeTabbar));
                for(let i in homeTabbar){
                    homeTabbar[i].iconSelectBool = false;
                }
                homeTabbar[e].iconSelectBool = true;
                this.action({
                    moduleName:'homeTabbar',
                    goods:homeTabbar
                })
                this.$router.push(homeTabbar[e].link)
            }
        },
        computed: mapGetters({
            airforce: 'airforce'
        }),
    }
</script>

<style scoped lang="less">
.LayoutFooter{
    &/deep/ .homeTabbar{
        position: fixed;
        .homeTabbarItem{
            &.weui-bar__item_on{
                .weui-tabbar__label{
                    color: #f38431;
                }
            }
            &.weui-tabbar__item{
                text-decoration: none;
                outline: medium;
            }
        }
        &.hide{
            display: none;
        }
    }
}
</style>