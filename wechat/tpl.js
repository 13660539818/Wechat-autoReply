"use strict"

var ejs = require("ejs");
var heredoc = require("heredoc");

var tpl = heredoc(function () {/*
    <xml> 
        <ToUserName>< ![CDATA[<%= toUserName %>] ]></ToUserName>
        <FromUserName>< ![CDATA[<%= fromUserName %>] ]></FromUserName> 
        <CreateTime><%= createTime %></CreateTime>
        <MsgType>< ![CDATA[<%= msgType %>] ]></MsgType>
        <Content>< ![CDATA[<%= content %>] ]></Content> 
    </xml>    
*/});

var compiled = ejs.compile(tpl);

exports = module.exports = {
    compiled: compiled
};