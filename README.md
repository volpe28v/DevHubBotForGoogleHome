DevHubBotForGoogleHome
==========

DevHubとGoogleHomeを接続してDevHubからの発言をGoogleHomeに喋らせるボットです。
ローカルでは google-home-notifier をサーバとして起動しておく想定。

Usage
----

例：
 * DevHub : 192.168.1.5:3000
 * DevHubBotForGoogleHome: 192.168.1.5:4000
 * google-home-notifier: 192.168.1.6:8091
の場合、下記のようにする。

```
$ git clone https://github.com/volpe28v/DevHubBotForGoogleHome/
$ cd DevHubForGoogleHome
$ npm install
```

```
PORT=4000 DEVHUB=http://user:pass@192.168.1.5:3000/ SERVER_HOST=192.168.1.5 GOOGLE_HOME=http://192.168.1.6:8091/ node app.js
```
