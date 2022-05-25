# cordova-test

## 如何建立一個Cordova 專案

### 1.安裝cordova與vue-cli 全域套件
[資料參考來源](https://dotblogs.com.tw/wasichris/2021/02/05/093906)
``` bash
npm install -g cordova
npm install -g @vue/cli
```

安裝好機套件後，建立一個專案名稱「test-app」的cordova基本專案模板，資料會建立於在當前目錄下的 test-app 資料夾中，並且給予此 app 獨一無二的 com.test.app 識別 ID。
輸入下列指令：
``` bash
 cordova create test-app com.test.app toolset
```
