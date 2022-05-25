<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <p>測試頁面</p>
    <van-row justify="center">
      <van-col>
    <p>{{ contents }}</p>
    <input v-model="encryptConfig.password" placeholder="密碼">
    <p>加密後的token:{{token||'無'}}</p>
      </van-col>
    </van-row>
    <p>解密後的token:{{password}}</p>
    <van-button type="success" @click="clickEvent">主要按鈕</van-button>
    <van-button type="success" @click="openFingerPrint">開啟指紋辨識</van-button><br>
    <van-button type="danger" @click="加密">加密測試</van-button>
    <van-button type="success" @click="解密">解密測試</van-button>
    <!-- <van-datetime-picker v-model="currentDate" type="date" title="選擇年月日" :min-date="minDate"
      :max-date="maxDate" /> -->
  </div>


</template>

<script>
  import logService from '../services/log-service'
  export default {
    name: 'TestView',
    components: {},
    data() {
      return {
        contents: '這是一個基本的網站架構',
        currentDate: '',
        minDate: new Date(2019, 0, 1),
        maxDate: new Date(2025, 0, 1),
        encryptConfig: {
          clientId: "1234567",
          username: "test-app",
          locale: 'zh_TW',
          password: "I'amPassword",
          userAuthRequired: true
        },
        token: '',
        password: ''
      }
    },
    methods: {
      clickEvent() {
        this.$dialog.alert({
          message: '你好世界',
          confirmButtonColor: '#65db03',
        });
      },

      解密() {
        try {
          var thisVue = this
          logService.remoteLog('開始解密')
          var decryptConfig = {
            clientId: this.encryptConfig.clientId,
            username: this.encryptConfig.username,
            locale: 'zh_TW',
            token: this.token
          };
          logService.remoteLog(decryptConfig)
          FingerprintAuth.decrypt(decryptConfig, successCallback, errorCallback);

          function successCallback(result) {
            console.log("successCallback(): " + JSON.stringify(result));
            logService.remoteLog('successCallback 解密', result)
            thisVue.password = result.password
            if (result.withFingerprint) {
              logService.remoteLog('成功手指解密')
              console.log("Successful biometric authentication.");
              if (result.password) {
                console.log("Successfully decrypted credential token.");
                console.log("password: " + result.password);
              }
            } else if (result.withBackup) {
              logService.remoteLog('備案解密', result)
              console.log("Authenticated with backup password");
            }
          }

          function errorCallback(error) {
            logService.remoteLog('解密失敗', error)
            if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
              console.log("FingerprintAuth Dialog Cancelled!");
            } else {
              console.log("FingerprintAuth Error: " + error);
            }
          }
        } catch (err) {
          logService.remoteLog('解密catch ', err)
        }


      },
      加密() {
        var thisVue = this
        logService.remoteLog('加密')
        function successCallback(result) {
          console.log("successCallback(): " + JSON.stringify(result));
          logService.remoteLog(`加密成功`)
          if (result.withFingerprint) {
            console.log("Successfully encrypted credentials.");
            console.log("Encrypted credentials: " + result.token);
            logService.remoteLog('withFingerprint', result)
            thisVue.token = result.token
          } else if (result.withBackup) {
            console.log("Authenticated with backup password");
            logService.remoteLog('Authenticated with backup password', result)
          }
        }

        function errorCallback(error) {
          if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
            alert("e1");
            console.log("FingerprintAuth Dialog Cancelled!");
            logService('FingerprintAuth Dialog Cancelled!', error)
          } else {
            alert("e2");
            console.log("FingerprintAuth Error: " + error);
            logService.remoteLog('FingerprintAuth Error: ', error)
          }
        }
        FingerprintAuth.encrypt(this.encryptConfig, successCallback, errorCallback);
      },
      openFingerPrint() {
        logService.remoteLog('openFingerPrint click')

      }
    }
  };

</script>
