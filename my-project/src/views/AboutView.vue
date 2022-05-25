<template>
  <div style="height:100vh;">
    <!-- <iframe frameborder="0" scrolling="yes" marginheight="0" marginwidth="0" width="100%" height="100%"
      src="https://chiungta.github.io/" />  -->
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
     <form action="?" method="POST">
      <div class="g-recaptcha" data-sitekey="6Le-KgUgAAAAABdFhvqj6KaSvRsvSL_lmH0ERIb3"></div>
      <br/>
      <input type="submit" value="Submit">
    </form> -->

    <div id="RecaptchaField1" >
      <p @click="onloadCallback">hihi</p>
    </div>
 <form action="?" method="POST">
      <div id="html_element"></div>
      <br>
      <input type="submit" value="Submit">
    </form>

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
        simpleStorage.set('locationList',[{time:new Date(), x:121,y:23}])
        try{
          logService.remoteLog('我有一隻小毛驢',{'errorMessage': new Date()})
        }catch(err){
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
      onloadCallback() {
        console.log('hihi')
        grecaptcha.render('html_element', {
          'sitekey' : '6Le-KgUgAAAAAMM1Q6hn7CHIYA6oQW1CfF6oTopL'
        });
      }
    },
    mounted() {

    },
  };

</script>
