"use strict"

exports.reply = function* (next) {
    var message = this.weixin;
    if(message.MsgType === "event") {
        if(message.Event === "subscribe") {
            if(message.EventKey) {
                console.log("扫描二维码进来：" + message.EventKey + " " + message.ticket)
            }
            this.body = "欢迎订阅";
        }
        else if(message.Event === "unsubscribe") {
            console.log("取消关注");
            this.body = "";
        }
    }
    else if(message.MsgType === "text") {
        var content = message.Content;
        var reply = "你在说什么";
        this.body = reply;
    }
    console.log(this.body);
    yield next;
}