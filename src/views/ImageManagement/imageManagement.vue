<template>
    <div class="imageManagement">
        <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/index" v-for="item,i in list" :key="i">
                <div class="folder" :style="{height:height}">
                    <div class="folderIcon" @click="addFolder(item,i)">{{item.type_name}}</div>
                    <div class="folderBody" @click="go(item)" v-if="item.first_img && item.first_img.length > 0" :style="{backgroundImage:`url('${item.first_img}')`}"></div>
                    <div class="folderBody iconfont" @click="go(item)" v-else>&#xe75b;</div>
                    <span class="index">({{item.count}})</span>
                </div>
            </flexbox-item>
            <flexbox-item :span="1/index" @click.native="addFolder(null)">
                <div class="folder" :style="{height:height}">
                    <div class="folderBody iconfont">&#xe61d;</div>
                </div>
            </flexbox-item>
        </flexbox>
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
    import { Flexbox, FlexboxItem, XDialog,TransferDomDirective as TransferDom, Group, XInput, XButton  } from 'vux'
    import { mapGetters, mapActions } from "vuex"
    export default {
        name: "image-management",
        components:{ Flexbox, FlexboxItem, XDialog, Group, XInput, XButton  },
        data(){return{
            index:2,
            show:false
        }},
        methods:{
            ...mapActions(['action']),
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
                                data:lists.concat([{type_name:this.airforce.imageManagement.selectFolder.type_name}])
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
            go(item){
                this.action({
                    moduleName:"imageManagement",
                    goods:{
                        itemFolder:item,
                    }
                })
                this.$router.push("/app/HomeLayout/imageManagementDetails?id="+item.id)
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
                    return this.airforce.imageManagement_list.data;
                }catch (e){
                    return [];
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
    padding: 15px;
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