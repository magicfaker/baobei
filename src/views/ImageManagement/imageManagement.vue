<template>
    <div class="imageManagement vux-1px-t">
        <search @on-change="searchChange" :auto-fixed="false"></search>
        <div class="notData" v-if="notData">无结果!</div>
        <group class="group">
            <swipeout>
                <swipeout-item class="swipeout-item"  v-for="(item,index) in list" :key="index">
                    <div slot="content">
                        <cell v-if="sousuoVal.length == 0" @click.native="go(item)" :title="item.type_name" is-link :value="item.count">
                            <img slot="icon" width="20"  height="20"  v-if="item.first_img && item.first_img.length > 0" style="display:block;margin-right:5px;" :src="item.first_img">
                            <img slot="icon" width="20"  height="20" v-else style="display:block;margin-right:5px;" src="http://placeholder.qiniudn.com/20x20/d8d8d8/d8d8d8">
                        </cell>
                    </div>
                    <div slot="right-menu">
                        <swipeout-button @click.native="addFolder(item,index)" type="primary">修改名称</swipeout-button>
                    </div>
                </swipeout-item>
            </swipeout>
            <!--<cell v-if="sousuoVal.length == 0" @click.native="go(item)" :title="item.type_name" v-for="(item,index) in list" is-link :value="item.count" :key="index">-->
                <!--<img slot="icon" width="20"  height="20"  v-if="item.first_img && item.first_img.length > 0" style="display:block;margin-right:5px;" :src="item.first_img">-->
                <!--<img slot="icon" width="20"  height="20" v-else style="display:block;margin-right:5px;" src="http://placeholder.qiniudn.com/20x20/d8d8d8/d8d8d8">-->
            <!--</cell>-->
            <cell v-if="sousuoVal.length != 0" @click.native="go(item)" :title="item.type_name" v-for="(item,index) in list.type" is-link value="分类" :key="index">
                <img slot="icon" width="20"  height="20"  v-if="item.first_img && item.first_img.length > 0" style="display:block;margin-right:5px;" :src="item.first_img">
                <img slot="icon" width="20"  height="20" v-else style="display:block;margin-right:5px;" src="http://placeholder.qiniudn.com/20x20/d8d8d8/d8d8d8">
            </cell>
            <cell v-if="sousuoVal.length != 0" @click.native="go(item,true)" :title="item.messige" v-for="(item,index) in list.messige" is-link value="图片" :key="index+'messige'">
                <img slot="icon" width="20"  height="20"  v-if="item.img && item.img.length > 0" style="display:block;margin-right:5px;" :src="item.img">
                <img slot="icon" width="20"  height="20" v-else style="display:block;margin-right:5px;" src="http://placeholder.qiniudn.com/20x20/d8d8d8/d8d8d8">
            </cell>
            <x-button v-if="sousuoVal.length == 0" class="group-x-button" @click.native="addFolder(null)">添加分类</x-button>
        </group>

        <div v-transfer-dom>
            <x-dialog v-model="show" :hideOnBlur="true" class="addFolderBox">
                <h1 class="title" v-if="typeof airforce.imageManagement.index == 'number'">修改文件夹</h1>
                <h1 class="title" v-else>添加文件夹</h1>
                <group>
                    <x-input :value="airforce.imageManagement.selectFolder.type_name" @on-change="airforce.change.set($event,'selectFolder.type_name','imageManagement')" placeholder="请输入文件夹名称"></x-input>
                    <x-button v-if="typeof airforce.imageManagement.index == 'number'" class="addFolderBtn" @click.native="addFolderSave">保存</x-button>
                    <x-button v-else class="addFolderBtn" @click.native="addFolderSave">添加</x-button>
                </group>
            </x-dialog>
        </div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XDialog,TransferDomDirective as TransferDom, Group, XInput, XButton, Cell, Swipeout, SwipeoutItem, SwipeoutButton, Search  } from 'vux'
    import { mapGetters, mapActions } from "vuex"
    export default {
        name: "image-management",
        components:{ Flexbox, FlexboxItem, XDialog, Group, XInput, XButton, Cell, Swipeout, SwipeoutItem, SwipeoutButton, Search  },
        data(){return{
            index:2,
            show:false,
            sousuoVal:''
        }},
        methods:{
            ...mapActions(['action']),
            searchChange(v){
                this.sousuoVal = v;
                this.action({
                    moduleName:"imageManagement_sousuo",
                    method:"post",
                    url:"App/Img/sousuo",
                    isFormData:true,
                    data:{
                        token:this.airforce.login_post.data.token,
                        uid:this.airforce.login_post.data.uid,
                        messige:v
                    }
                }).then(res=>{
                    if (res.code != 200){
                        this.$vux.toast.text(res.message);
                        return;
                    };
                    this.action({
                        moduleName:"sousuoData",
                        goods:null
                    });
                    try {
                        const sousuoData = res.data.messige.map(e=>{
                            try {
                                e.img = JSON.parse(e.img)[0];
                            }catch (ee){}
                            return e;
                        });
                        res.data.messige = sousuoData;
                    }catch (d){}
                    this.action({
                        moduleName:"sousuoData",
                        goods:res.data
                    });
                }).catch(err=>{
                    this.$vux.toast.text(err);
                })
            },
            addFolder(item,index){
                if(item){
                    this.action({
                        moduleName:"imageManagement",
                        goods:{
                            selectFolder:item,
                            index:index,
                        }
                    })
                }else {
                    this.action({
                        moduleName:"imageManagement",
                        goods:{
                            selectFolder:null,
                            index:null
                        }
                    })
                    this.action({
                        moduleName:"imageManagement",
                        goods:{
                            selectFolder:{}
                        }
                    });
                }
                this.show = true;
            },
            addFolderSave(){
                if(!this.airforce.imageManagement.selectFolder.type_name || this.$utils.is_S(this.airforce.imageManagement.selectFolder.type_name)){
                    this.$vux.toast.text("请输入文件夹名称");
                    return;
                }
                if(typeof this.airforce.imageManagement.index == "number"){
                    //修改
                    this.action({
                        moduleName:"imageManagement_add_type",
                        method:"post",
                        url:"App/Img/update_type",
                        isFormData:true,
                        data:{
                            type_name:this.airforce.imageManagement.selectFolder.type_name,
                            id:this.airforce.imageManagement.selectFolder.id,
                            token:this.airforce.login_post.data.token,
                            uid:this.airforce.login_post.data.uid,
                        }
                    }).then(res=>{
                        if(res.code != 200){
                            this.$vux.toast.text(res.message);
                            return;
                        };
                        var lists = JSON.parse(JSON.stringify(this.airforce.imageManagement_list.data));
                        lists[this.airforce.imageManagement.index].type_name = this.airforce.imageManagement.selectFolder.type_name;
                        this.action({
                            moduleName:"imageManagement_list",
                            goods:null
                        });
                        this.action({
                            moduleName:"imageManagement_list",
                            goods:{
                                data:lists
                            }
                        });
                        this.$vux.toast.text("保存成功！");
                        this.show = false;
                    }).catch(err=>{
                        this.show = false;
                        this.$vux.toast.text(err);
                    });
                    // this.list[this.airforce.imageManagement.index].title =  this.airforce.imageManagement.selectFolder.type_name;
                }else {
                    //添加
                    this.action({
                        moduleName:"imageManagement_add_type",
                        method:"post",
                        url:"App/Img/add_type",
                        isFormData:true,
                        data:{
                            type_name:this.airforce.imageManagement.selectFolder.type_name,
                            token:this.airforce.login_post.data.token,
                            uid:this.airforce.login_post.data.uid,
                        }
                    }).then(res=>{
                        if(res.code != 200){
                            this.$vux.toast.text(res.message);
                            return;
                        };
                        var lists = JSON.parse(JSON.stringify(this.airforce.imageManagement_list.data));
                        this.action({
                            moduleName:"imageManagement_list",
                            goods:null
                        });
                        this.action({
                            moduleName:"imageManagement_list",
                            goods:{
                                data:lists.concat([{type_name:this.airforce.imageManagement.selectFolder.type_name,id:res.data}])
                            }
                        });
                        this.$vux.toast.text("添加成功！");
                        this.show = false;
                    }).catch(err=>{
                        this.show = false;
                        this.$vux.toast.text(err);
                    });
                }

            },
            go(item,bool){
                this.action({
                    moduleName:"imageManagement",
                    goods:{
                        itemFolder:item,
                    }
                });
                var url = "/app/HomeLayout/imageManagementDetails?id=";
                if(bool){
                    url += item.type + "&imgId="+ item.i_id;
                }else {
                    url += item.id;
                }
                this.$router.push(url)
            }
        },
        directives: {
            TransferDom
        },
        computed:{
            ...mapGetters(['airforce']),
            height(){
                return (window.innerWidth - 30) / this.index + "px"
            },
            list(){
                try {
                    if(this.airforce.sousuoData && this.sousuoVal.length > 0){
                        return this.airforce.sousuoData;
                    }
                    return this.airforce.imageManagement_list.data;
                }catch (e){
                    return [];
                }
            },
            notData(){
                try {
                    return (this.sousuoVal.length != 0 && this.list.type.length == 0 && this.list.messige.length == 0);
                }catch (e){
                    return false;
                }
            }
        },
        mounted(){
            this.action({
                moduleName:"imageManagement_list",
                method:"post",
                url:"App/Img/imgType",
                isFormData:true,
                data:{
                    token:this.airforce.login_post.data.token,
                    uid:this.airforce.login_post.data.uid,
                }
            }).then(res=>{
                if(res.code != 200){
                    this.$vux.toast.text(res.message);
                    return;
                }
            }).catch(err=>{
                this.$vux.toast.text(err);
            });
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.imageManagement{
    &/deep/ .swipeout-item{
        &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #D9D9D9;
            color: #D9D9D9;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            left: 15px;
            z-index: 4;
        }
    }
    .notData{
        text-align: center;
        font-size: 12px;
        line-height: 50px;
        color: #9c9c9c;
    }
    .group-x-button{
        position: fixed;
        left: 0;
        bottom: 0;
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
    .folder{
        width: 100%;
        position: relative;
        overflow: hidden;
        margin-bottom: 10px;
        border-radius: 0 20px 20px 20px;
        @index:24px;
        .folderIcon{
            width: 70%;
            line-height: @index;
            height: @index;
            font-size: 12px;
            background-color: #643219;
            padding: 0 10px;
            border-radius: 0 24px 0 0;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            color: #ffffff;
        }
        .folderBody{
            position: absolute;
            left: 0;
            top: @index;
            width: 90%;
            height: 100%;
            background-color: #b74e24;
            z-index: 1;
            border-radius: 0 20px 20px 20px;
            color: #FF6C33;
            font-size: 80px;
            text-align: center;
            overflow: hidden;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;
        }
        .index{
            width: 90%;
            position: absolute;
            right: 10%;
            bottom: 5px;
            z-index: 3;
            text-align: right;
            padding: 0 15px;
            color: #ffffff;
            font-size: 12px;
        }
    }
}
.addFolderBox{
    .title{
        color:@themeColor;
        font-size: 18px;
        line-height: 40px;
    }
    &/deep/ .vux-no-group-title{
        margin: 0;
    }
    .addFolderBtn{
        background-color: @themeColor;
        border-radius: 0;
        color: #ffffff;
        &:active{
            background-color: @themeColor*0.9;
            color: #ffffff;
        }
    }
}
</style>