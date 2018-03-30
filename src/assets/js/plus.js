(function (win,doc) {
    win.pays={};
    function plusReady(){
        // 获取支付通道
        plus.payment.getChannels(function(channels){
            for(var i in channels){
                var channel=channels[i];
                if(channel.id=='qhpay'||channel.id=='qihoo'){	// 过滤掉不支持的支付通道：暂不支持360相关支付
                    continue;
                }
                win.pays[channel.id]=channel;
                checkServices(channel);
            }
        },function(e){
            // outLine('获取支付通道失败：'+e.message);
        });
    }
    doc.addEventListener('plusready', plusReady, false);
// 检测是否安装支付服务
    function checkServices(pc){
        if(!pc.serviceReady){
            var txt=null;
            switch(pc.id){
                case 'alipay':
                    txt='检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？';
                    break;
                default:
                    txt='系统未安装“'+pc.description+'”服务，无法完成支付，是否立即安装？';
                    break;
            }
            plus.nativeUI.confirm(txt, function(e){
                if(e.index==0){
                    pc.installService();
                }
            }, pc.description);
        }
    }
})(window,document);