DevBotForGoogleHome
==========

DevHubとGoogleHomeを接続してDevHubからの発言をGoogleHomeに喋らせるボットです。
google-home-notifier を使用。

Usage
----


例：
 * Devhub : 192.168.1.5:3000
 * DevhubHook : 192.168.1.5:4000
 * google-home-notifier: 192.168.1.6:8091
の場合、下記のようにする。

```
$ git clone https://github.com/volpe28v/DevHubBotForGoogleHome/
$ cd DevHubForGoogleHome
$ npm install
```

指定の共有メモに通知を追加したい場合は下記のようにする。(NO:共有メモNo,LINE:挿入する行)
Basic認証にも対応
```
PORT=4000 DEVHUB=http://user:pass@192.168.1.5:3000/ SERVER_HOST=localhost NO=1 LINE=1 GOOGLE_HOME=http://192.168.1.6:8091/google-home-notifier node app.js
```
