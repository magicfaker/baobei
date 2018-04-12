<template>
    <div class="LayoutFooter">
        <tabbar :class="`homeTabbar ${(!airforce.layout.navShow)? 'hide':''}`" @on-index-change="tabMenuNav">
            <tabbar-item class="homeTabbarItem" v-for="(item,index) in airforce.homeTabbar" :key="index" :selected="item.selected">
                <img slot="icon" v-if="!item.iconSelectBool" :src="item.icon">
                <img slot="icon" v-else :src="item.iconSelect">
                <span slot="label" :ref="'LayoutFooterhomeTabbarItem'+index">{{item.txt}}</span>
            </tabbar-item>
        </tabbar>
        <div style="display: none">{{watchObj}}</div>
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
                // console.log(e)
                const homeTabbar = JSON.parse(JSON.stringify(this.airforce.homeTabbar));
                for(let i in homeTabbar){
                    homeTabbar[i].iconSelectBool = false;
                }
                homeTabbar[e].iconSelectBool = true;
                this.action({
                    moduleName:'homeTabbar',
                    goods:homeTabbar
                });
                try {
                    for(let i in this.$refs){
                        this.$refs[i][0].className = "";
                    }
                    this.$refs['LayoutFooterhomeTabbarItem'+e][0].className = "selectObj"
                }catch (e){}
                this.$router.push(homeTabbar[e].link)
            }
        },
        computed:{
            ...mapGetters({
               airforce: 'airforce'
           }),
           watchObj(){
                if(typeof this.airforce.layout.homeTabbarIndex == 'number'){
                    this.tabMenuNav(this.airforce.layout.homeTabbarIndex)
                }
           }
        } ,
    }
</script>

<style scoped lang="less">
.LayoutFooter{
    &/deep/ .homeTabbar{
        position: fixed;
        .homeTabbarItem{
            /*&.weui-bar__item_on{*/
                .weui-tabbar__label{
                    color: #999999;
                    .selectObj{
                        color: #f38431;
                    }
                }
            /*}*/
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