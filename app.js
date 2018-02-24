
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var moment = require('moment');
var request = require('request');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('devhub', process.env.DEVHUB);
app.set('room_id', process.env.ROOM_ID || 1);
app.set('google_home_notifier', process.env.GOOGLE_HOME);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var io = require('socket.io-client');
var url = app.get('devhub');
var name = 'GoogleHome';

var socket = io.connect(url);
socket.on('connect', function(){
  console.log("connect: " + app.get('devhub'));
  socket.emit('name', {name: name});
});

socket.on('message', function(data){
  var command = "";
  if (data.msg.match(/@GoogleHome/i)){
    //GoogleHome へメッセージを投げる
    console.log(data.msg);

    var options = {
      uri: app.get('google_home_notifier') + 'google-home-notifier',
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      form: {
        "text": data.msg.replace(/@GoogleHomeさん/i,"")
      }
    };
    request.post(options, function(error, response, body){});
  }

});
socket.on('disconnect', function(){});
