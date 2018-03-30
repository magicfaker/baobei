<template>
    <div class="wrapper">
        <div class="wrappermain">
            <cell-box link="cxjsq" class="list">车险分期计算器</cell-box>
            <cell-box is-link link="" class="list">房产分期</cell-box>
            <cell-box link="hljs" class="list">汇率计算</cell-box>
            <x-button class="list" @click.native="exit">退出</x-button>
        </div>
    </div>

</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Group, Cell, CellBox, XButton } from 'vux'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'user',
        ...mapActions,
        computed: mapGetters({
            airforce: 'airforce'
        }),
        data() {
            return {
                msg: '工具',
            }
        },
        methods: {
            ...mapActions(['action']),
            exit(){
                this.action({
                    moduleName:'login_post',
                    goods:undefined,
                });
                delete localStorage.login_post;
                this.$router.push("/Login")
            }
        },
        components: {
            Group,
            Cell,
            CellBox,
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            XButton
        },
        created() {
            this.action({
                moduleName: "s",
                goods: "1212"
            })
        }
    }
</script>

<style scoped lang="less">
    @font-face {
        font-family: 'iconfont';
        /* project id 590408 */
        src: url('https://at.alicdn.com/t/font_590408_zasoa4yz6te53ik9.eot');
        src: url('https://at.alicdn.com/t/font_590408_zasoa4yz6te53ik9.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_590408_zasoa4yz6te53ik9.woff') format('woff'), url('https://at.alicdn.com/t/font_590408_zasoa4yz6te53ik9.ttf') format('truetype'), url('https://at.alicdn.com/t/font_590408_zasoa4yz6te53ik9.svg#iconfont') format('svg');
    }

    .iconfont {
        font-family: "iconfont";
        font-size: 18px;
        font-style: normal;
    }

    .active {
        color: #ff7300;
    }

    /** {
        margin: 0;
        padding: 0;
    }*/

    ol,
    ul,
    li {
        list-style: none;
    }

    img {
        border: 0;
        vertical-align: middle;
    }

    body {
        color: #000000;
        background: #FFF;
        text-align: center;
    }

    .clear {
        clear: both;
        height: 1px;
        width: 100%;
        overflow: hidden;
        margin-top: -1px;
    }

    a {
        color: #000000;
        text-decoration: none;
    }
    .wrapper{
        min-width: 320px;
        max-width: 640px;
        margin: 0 auto;
        font-size: 14px;
        font-family: "微软雅黑";
        /*background: #f8f8f8;*/
        .header {
            width: 100%;
            min-width: 320px;
            max-width: 640px;
            position: fixed;
            top: 0;
            left: 50%;
            transform:translateX(-50%);
            background: #ff7200;
            overflow: hidden;
            text-align: center;
            z-index:1000;
            span {
                font-size: 18px;
                font-weight: 400;
                text-align: center;
                color: white;
            }
        }
        .wrappermain{
            margin-top: 40px;
            .list{
                line-height: 50px;
                font-size: 16px;
            }
        }
        .footer {
            min-width: 320px;
            max-width: 640px;
            margin: 0 auto;
            position: fixed;
            bottom: 0;
            left: 50%;
            transform:translateX(-50%);
            width: 100%;
            background: #ededed;
            border-top: 1px solid #b4b3b3;
            z-index: 1000;
            ul {
                display: flex;
                justify-content: space-around;
                li {
                    list-style: none;
                    display: inline-block;
                    padding: 5px 5% 3px;
                    .partition{
                        i {
                            display: block;
                            text-align: center;
                            line-height: 24px;
                            font-size: 26px;
                        }
                        span {
                            display: block;
                            line-height: 18px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>