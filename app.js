var request = require('request');
var io = require('socket.io-client');

var devhub_url = process.env.DEVHUB;
var google_home_notifier_url = process.env.GOOGLE_HOME;
var name = 'GoogleHome';

var socket = io.connect(devhub_url);
socket.on('connect', function(){
  console.log("connect: " + devhub_url);
  socket.emit('name', {name: name});
});

socket.on('message', function(data){
  var command = "";
  console.log(data);
  if (data.msg.match(/@GoogleHome/i)){
    //GoogleHome へメッセージを投げる
    console.log(data.msg);

    var options = {
      uri: google_home_notifier_url + 'google-home-notifier',
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      form: {
        "text": data.msg.replace(/@GoogleHomeさん/i,"")
      }
    };
    request.post(options, function(error, response, body){});
  }else if (data.msg.match(/@GH-GET/i)){
    //GoogleHome へGETの命令を投げる
    console.log(data.msg);
    var get_url = data.msg.replace(/@GH-GET/i,"").trim();

    var options = {
      uri: google_home_notifier_url + get_url,
    };
    request.get(options, function(error, response, body){});
  }
});
socket.on('disconnect', function(){});
