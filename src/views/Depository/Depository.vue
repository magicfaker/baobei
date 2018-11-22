<template>
    <div class="Depository">
        <div class="table-title">
            <div class="search">
                <x-input @on-focus="searchBtn = true" @on-blur="searchBtn = false" class="input" :show-clear="false" text-align="center" placeholder="请输入关键字">
                    <div slot="right" v-if="searchBtn">
                        <x-button class="searchBtn" @click.native="search">搜索</x-button>
                    </div>
                </x-input>
            </div>
            <x-table class="table" :cell-bordered="false" style="background-color:#fff;">
                <thead>
                <tr>
                    <th>名称</th>
                    <th>银行</th>
                    <th>机构</th>
                    <th>状态</th>
                </tr>
                </thead>
            </x-table>
        </div>
        <x-table :cell-bordered="false" style="background-color:#fff;">
            <tbody>
            <tr v-for="i in 50">
                <td v-if="i == 1">张三物流公司张三物流公司张三物流公司</td>
                <td v-else>张三物流公司</td>
                <td>上饶银行</td>
                <td>名优金融</td>
                <td>
                    <span v-if="i == 1" class="gold">开户中</span>
                    <span v-else-if="i == 2" class="red">开户失败</span>
                    <span v-else-if="i == 3" class="green" @click="DepositoryData">待补资料</span>
                    <span v-else>开户成功</span>
                </td>
            </tr>
            </tbody>
        </x-table>
        <div class="addDepository">
            <x-button class="btn" @click.native="show = true">添加存管</x-button>
        </div>
        <popup v-model="show">
            <group title="请选择存管机构">
                <cell  title="名优金融" isLink>上饶银行</cell>
            </group>
        </popup>
    </div>
</template>

<script>
    import { XTable, XButton, Popup, Cell, Group, XInput } from "vux"
    export default {
        name: "depository",
        components:{ XTable, XButton, Popup, Cell, Group, XInput },
        data(){
          return {
              show:false,
              searchBtn:false,
          }
        },
        methods:{
            DepositoryData(){
                this.$router.push("/app/HomeLayout/DepositoryData")
            },
            search(){
                console.log(111)
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.Depository{
    .table-title{
        height: 80px;
        .search{
            background-color: #e5e5e5;
            width: 100%;
            position: fixed;
            left: 0;
            top: 46px;
            height: 40px;
            z-index: 2;
            .input{
                background-color: #ffffff;
                height: 10px;
                width: 80%;
                margin: auto;
                margin-top: 5px;
                border-radius: 5px;
                .searchBtn{
                    padding: 0;
                    font-size: 12px;
                    padding: 0 5px;
                    margin-left: 10px;
                    background-color: @themeColor;
                    color: #ffffff;
                    &:active{
                        background-color: @themeColor + 255*0.1;
                    }
                }
            }
        }
        .table{
            position: fixed;
            left: 0;
            top: 86px;
            z-index: 2;
            box-shadow: 0 0 10px #e5e5e5;
            thead{
                tr{
                    th{
                        font-weight: bold;
                        font-size: 14px;
                        &:before{
                            border: none;
                        }
                        &:after{
                            border: none;
                        }
                    }
                }
            }
        }
    }
    td{
        font-size: 12px;
        width: 25%;
        line-height: initial;
        padding: 10px 0;
        height: 40px;
        span{
            color: #ccc;
            &.red{
                color: red;
            }
            &.gold{
                color: @themeColor;
            }
            &.green{
                background-color: green;
                color: #ffffff;
                padding: 5px;
                border-radius: 5px;
                &:active{
                    background-color: green+255*0.1;
                }
            }
        }
    }
    .addDepository{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        .btn{
            /*position: fixed;*/
            /*left: 0;*/
            /*bottom: 0;*/
            width: 100%;
            background-color: @themeColor;
            border: none;
            border-radius: 0;
            color: #ffffff;
            z-index: 5;
            &:active{
                background-color: @themeColor*0.9;
            }
        }
    }
}
</style>