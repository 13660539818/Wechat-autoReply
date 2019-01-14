"use strict"

var path = require("path");
var util = require("./libs/util");
var wechat_file = path.join(__dirname, "./config/wechat.txt");

var config = {
    wechat: {
        appID: "wxd222a3fb7d906e2f",
        appSecret: "183d8735275bb173cc4c89340278d6c0",
        token: "wechat",
        getAccessToken: function() {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function(data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data);
        }
    }
}

module.exports = config;