<template>
  <div style="height:100vh;">
    <van-row>
      <van-col span="24">
        <van-image round width="10rem" height="10rem" fit="cover" position="left"
          src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" />

      </van-col>
      <van-col span="24">
        <span class="">作者：Jim Chiu</span>

      </van-col>
      <van-col span="24"><a @click="goToBlog">部落格：老達遊記</a></van-col>
    </van-row>

    <van-row justify="center">
      <van-col>
        <button @click="consoleWrite">按我紀錄log</button>
        <button @click="clearLoaction">清除經緯度</button>
        <button @click="readLoaction">查看暫存經緯度</button>
      </van-col>
    </van-row>
<!--
    <van-row justify="center">
      <van-col>
      <div id="html_element"></div>
      </van-col>
    </van-row> -->


  </div>
</template>
<script>
  import logService from '../services/log-service'
  import simpleStorage from '../utils/simple-storage'
  export default {
    name: 'AboutView',
    components: {},
    data() {
      return {
        blogUrl: 'https://chiungta.github.io/'
      }
    },
    methods: {
      goToBlog() {
        if (!!window.cordova) {
          cordova.InAppBrowser.open(this.blogUrl, '_system', 'location=yes')
        } else {
          window.open(this.blogUrl)
        }
      },
      consoleWrite() {
        simpleStorage.set('locationList', [{
          time: new Date(),
          x: 121,
          y: 23
        }])
        try {
          logService.remoteLog('我有一隻小毛驢', {
            'errorMessage': new Date()
          })
        } catch (err) {
          alert(err)
        }
      },
      clearLoaction() {
        simpleStorage.remove('locationList')
        simpleStorage.set('locationList', [])
      },
      readLoaction() {
        this.$dialog.alert({
          title: `共有${simpleStorage.get('locationList').length}筆`,
          message: JSON.stringify(simpleStorage.get('locationList')),
          confirmButtonColor: '#65db03',
        });
      },

      // /**
      //  * reCAPTCHA 驗證使用
      //  */
      // onloadCallback() {
      //   grecaptcha.render('html_element', {
      //     'sitekey': '6Le-KgUgAAAAAMM1Q6hn7CHIYA6oQW1CfF6oTopL'
      //     // 'sitekey': '6Le-KgUgAAAAABdFhvqj6KaSvRsvSL_lmH0ERIb3'
      //   });
      // }
    },
    mounted() {
      // this.onloadCallback()
    },
  };

</script>
