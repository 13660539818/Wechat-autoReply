"use strict"

var sha1 = require("sha1");
var getRawBody = require("raw-body");
var Wechat = require("./wechat");
var util = require("./util");

module.exports = function(opts, handler) {
    var wechat = new Wechat(opts);

    return function *(next){
        var that = this;
        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join(""); //按字典顺序拼接字符串
        var sha = sha1(str); //加密

        if(this.method === "GET") {
            this.body = (sha === signature) ? echostr + "" : "failed";
        }
        else if (this.method === "POST") {
            if (sha !== signature){
                this.body = "failed";
                return false;
            }
            var data = yield getRawBody(this.req, {
                length: this.length,
                limit: "1mb",
                encoding: this.charset,
            });

            var content = yield util.parseXMLAsnyc(data);

            var message = util.formatMessage(content.xml);
            console.log(message);

            this.weixin = message;
            yield handler.call(this, next);
            wechat.reply.call(this);
        }
    }
}
