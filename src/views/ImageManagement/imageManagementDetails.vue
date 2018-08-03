<template>
    <div class="imageManagementDetails">
        <group class="group">
            <cell @click.native="previeweDemoImg(item,index)" :title="item.messige" v-for="(item,index) in list" is-link :value="item.count" :key="index">
                <img class="previewer-demo-img" slot="icon" width="20" height="20" style="display:block;margin-right:5px;" :src="item.src">
            </cell>
            <label class="folder iconfont folderAdd">
                &#xe60c;&nbsp;&nbsp;添加图片
                <input type="file" hidden @change="upload">
            </label>
        </group>
        <div v-transfer-dom>
            <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange" @on-close="onClose">
                <div slot="button-after" v-if="airforce.imageManagement.saveImgs && airforce.imageManagement.saveImgs.messige" class="imageManagementDetailsDescribe">
                    {{airforce.imageManagement.saveImgs.messige}}
                </div>
                <button @click.prevent.stop="DownloadImage" class="pswp__button imageManagementDetailsIconfont iconfont" slot="button-before">&#xe617;</button>
            </previewer>
        </div>
        <div v-transfer-dom>
            <x-dialog v-model="showXDialog" :hideOnBlur="true" class="addFolderBox">
                <h1 class="title">添加描述</h1>
                <group>
                    <x-input :value="airforce.imageManagementDetails.messige" @on-change="airforce.change.set($event,'messige','imageManagementDetails')" placeholder="描述一下文件（可选）"></x-input>
                    <x-button class="addFolderBtn" @click.native="addFolderSave">确定上传</x-button>
                </group>
            </x-dialog>
        </div>
    </div>
</template>

<script>
    import { Previewer, TransferDom, Flexbox, FlexboxItem, XButton, XInput, Group, XDialog, Cell } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        directives: {
            TransferDom
        },
        name: "image-management-details",
        components:{ Previewer, Flexbox, FlexboxItem, XButton, XInput, Group, XDialog, Cell },
        data(){return{
            index:3,
            showXDialog:false,
            file:null,
            img:'http://img.bbs.wisenjoy.com/forum/201405/14/090904nzs02u3f1un21bzq.jpg',
            options: {
                getThumbBoundsFn (index) {
                    // find thumbnail element
                    let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                    // get window scroll Y
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    // optionally get horizontal scroll
                    // get position of element relative to viewport
                    let rect = thumbnail.getBoundingClientRect()
                    // w = width
                    return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                    // Good guide on how to get element coordinates:
                    // http://javascript.info/tutorial/coordinates
                },
                isClickableElement: function (el) {
                    return /imageManagementDetailsIconfont/.test(el.className)
                }
            }
        }},
        methods:{
            ...mapActions(['action']),
            previeweDemoImg(item,index){
                this.$refs.previewer.show(index);
                this.logIndexChange({currentIndex:index});
            },
            logIndexChange (arg) {
               this.action({
                   moduleName:"imageManagement",
                   goods:{
                       saveImgs:null
                   }
               });
               this.action({
                   moduleName:"imageManagement",
                   goods:{
                       saveImgs:this.list[arg.currentIndex]
                   }
               })
            },
            onClose(){
                this.action({
                    moduleName:"imageManagement",
                    goods:{
                        saveImgs:null
                    }
                });
            },
            show (index) {
                this.$refs.previewer.show(index);
                try {
                    setTimeout(()=>{
                        this.logIndexChange({
                            currentIndex:this.$refs.previewer.photoswipe.getCurrentIndex()
                        });
                    },500);
                }catch (e){}
            },
            DownloadImage(){
                try {
                    plus.downloader.createDownload( this.airforce.imageManagement.saveImgs.src, {}, (d, status)=>{
                        if ( status == 200 ) {
                            plus.gallery.save(d.filename,()=> {
                                this.$vux.toast.text("保存成功！");
                            },()=> {
                                this.$vux.toast.text("保存失败！");
                            });
                        } else {
                            this.$vux.toast.text("保存失败！");
                        }
                    }).start();
                }catch (e){
                    this.$vux.toast.text("保存失败！");
                }
            },
            addFolderSave(){
                this.$store.commit('updateLoadingStatus', {isLoading: true})
                try {
                    this.action({
                        moduleName:"imageManagementDetails_updata",
                        method:"post",
                        url:"App/Img/img",
                        isFormData:true,
                        data:{
                            type:this.airforce.imageManagement.itemFolder.id,
                            token:this.airforce.login_post.data.token,
                            uid:this.airforce.login_post.data.uid,
                            messige:this.airforce.imageManagementDetails.messige,
                            'img[0]':this.file,
                        }
                    }).then(res=>{
                        this.$store.commit('updateLoadingStatus', {isLoading: false});
                        this.$vux.toast.text("上传成功");
                        this.$root.$children[0].onLoad();
                    }).catch(err=>{
                        this.$store.commit('updateLoadingStatus', {isLoading: false})
                    });
                }catch (e){
                    this.$store.commit('updateLoadingStatus', {isLoading: false})
                    this.$vux.toast.text("参数错误");
                }
            },
            upload(e){
                this.showXDialog = true;
                this.file = e.target.files[0];
            }
        },
        computed:{
            ...mapGetters(['airforce']),
            height(){
                return window.innerWidth / this.index + "px"
            },
            list(){
                try {
                    if(this.airforce.imageManagementDetails_post.data){
                        var DataList = JSON.parse(JSON.stringify(this.airforce.imageManagementDetails_post.data));
                        var resData = [];
                        DataList.forEach(e=>{
                            var img = JSON.parse(e.img);
                            try {
                                if(typeof img == "object"){
                                    img.forEach(forE=>{
                                        e.src = forE;
                                       resData.push(e) ;
                                    });
                                }
                            }catch (e){}
                        });
                        return resData;
                    }
                }catch (e){
                    return [];
                }
                return [];
            }
        },
        mounted(){
            try {
                let type = null;
                if(this.$route.query.id){
                    type = this.$route.query.id;
                }else {
                    type = this.airforce.imageManagement.itemFolder.id;
                }
                this.action({
                    moduleName:"imageManagementDetails_post",
                    goods:null,
                });
                this.action({
                    moduleName:"imageManagementDetails_post",
                    method:"post",
                    url:"App/Img/img_list",
                    isFormData:true,
                    data:{
                        type:type,
                        token:this.airforce.login_post.data.token,
                        uid:this.airforce.login_post.data.uid,
                    }
                }).then(res=>{
                    if(res.code != 200){
                        this.$vux.toast.text(res.message);
                        return;
                    };
                    if(!res.data || res.data.length == 0){
                        this.action({
                            moduleName: "imageManagementDetails_post",
                            goods:null
                        });
                    }
                    if(this.$route.query.imgId){
                        var Index = _.findIndex(res.data,{id:this.$route.query.imgId})
                        if(Index > -1){
                            this.previeweDemoImg(null,Index);
                        }
                    }
                }).catch(err=>{
                    this.$vux.toast.text(err);
                });
                this.action({
                    moduleName:'layout',
                    goods:{
                        title:this.airforce.imageManagement.itemFolder.type_name
                    }
                });
            }catch (e){}
        },
        watch:{
            showXDialog(v){
                if(!v){
                    this.file = null;
                }
                this.action({
                    moduleName:'imageManagementDetails',
                    goods:{
                        messige:""
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
@import "../../assets/css/vars";
.imageManagementDetails{
    .saveImgs{
        position:fixed;
        left: 15px;
        top: 0;
        z-index: 10000;
        line-height: 44px;
        height: 44px;
        width: 50px;
        color: #ffffff;
        text-align: center;
        font-size: 12px;
        span{
            font-size: 30px;
        }
        &:before{
            content: '下载本地';
            position: absolute;
            left: 0;
            bottom: -14px;
            font-size: 12px;
            transform: scale(0.7);
            width: 100%;
        }
    }
    .folder{
        width: 100%;
        position: relative;
        margin-top: 2px;
        .previewer-demo-img{
            position: absolute;
            left: 0;
            top: 0;
            width: 99%;
            width:~"calc( 100% - 2px)";
            height: 100%;

        }
        &.folderAdd{
            text-align: center;
            color:@themeColor;
            display: block;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: @themeColor;
            border: none;
            border-radius: 0;
            color: #ffffff;
            line-height: 42px;
            &:active{
                background-color: @themeColor*0.9;
            }
        }
    }
}
.imageManagementDetailsIconfont{
    color: #ffffff;
    background-image: none !important;
    font-size: 26px;
    outline: medium;
}
.imageManagementDetailsDescribe{
    color: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.4);
    padding: 15px;
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