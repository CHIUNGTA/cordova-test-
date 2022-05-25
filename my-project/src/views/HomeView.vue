<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/animeGirl.jpeg" width="300">
  </div>
  <van-button type="success" @click="clickEvent">主要按鈕</van-button>
  <p>{{$store.state.count}}</p>
  <p>地理資料：{{ locationList.length }}</p>
  <van-button type="info" @click="clickEvent2">主要按鈕</van-button>
  <van-button type="info" @click="seeSimpleData">查看暫存資料</van-button>
  <van-button type="success" @click="openGPS">開始收集GPS</van-button>
  <van-button type="danger" @click="closeGPS">關閉收集GPS</van-button>

  <van-button type="info" @click="open">開啟後台運行</van-button>
  <van-button type="info" @click="disable">關閉後台運行</van-button>
  <van-button type="danger" @click="getKey">取得key</van-button>
  <van-button type="success" @click="setKey">設定key</van-button>

  <br>
  <van-button type="success" @click="openFlashlight">開啟手電筒</van-button>
  <van-button type="danger" @click="closeFlashlight">關閉手電筒</van-button>

</template>

<script>
  import objectApi from '../api/objects'
  import axios from 'axios'
  import {
    computed
  } from '@vue/runtime-core';
  import {
    mapGetters
  } from 'vuex'
  import logService from '../services/log-service'
  import simpleStorage from '../utils/simple-storage'
  export default {
    name: 'HomeView',
    components: {},
    computed: {
      //  使用對象展開運算符將getter 融入 computed 對象中
      ...mapGetters([
        'get2Count',
        'getMemberById',
      ])
    },
    data() {
      return {
        timer: 0,
        locationList: []
      }
    },
    created() {
      try {
        // cordova.plugins.backgroundMode.enable()
        // console.log('定時開始')
        // this.timer = setInterval(() => {
        //   this.saveLocation()
        //   this.openAndClose()
        // }, 500)
        // logService.remoteLog('開始定時', {
        //   time: new Date()
        // })
      } catch (err) {
        logService.remoteLog('home_created()', err)
      }
    },
    beforeUnmount() {
      console.log('out')
      clearInterval(this.timer)
      logService.remoteLog('beforeUnmount 跳出', {
        time: new Date()
      })
    },
    mounted() {},
    watch: {},
    methods: {
      clickEvent() {
        this.$store.commit('login', '邱炯達')
        this.$store.commit('increment')
        // 有兩種呼叫vuex的方法法
        console.log(this.$store.getters.getMemberById('1'))
        console.log(this.getMemberById('1'))
      },

      clickEvent2() {
        this.$store.dispatch('addAsync', {
          name: '逢甲大學'
        })
        var onSuccess = function (position) {
          alert('Latitude: ' + position.coords.latitude + '\n' +
            'Longitude: ' + position.coords.longitude + '\n' +
            'Altitude: ' + position.coords.altitude + '\n' +
            'Accuracy: ' + position.coords.accuracy + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
            'Heading: ' + position.coords.heading + '\n' +
            'Speed: ' + position.coords.speed + '\n' +
            'Timestamp: ' + position.timestamp + '\n');
        }

        function onError(error) {
          alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      },

      /**
       * 儲存定位資訊
       */
      saveLocation() {
        let thisVue = this
        var onSuccess = function (position) {
          thisVue.locationList.push({
            x: position.coords.latitude,
            y: position.coords.longitude
          })
          logService.remoteLog('定位服務', {
            time: new Date(),
            y: position.coords.latitude,
            x: position.coords.longitude,
            count: simpleStorage.get('locationList').length
          })
          simpleStorage.add('locationList', {
            time: new Date(),
            y: position.coords.latitude,
            x: position.coords.longitude
          })
        }

        function onError(error) {
          console.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

      },

      open() {
        cordova.plugins.backgroundMode.enable()
      },

      disable() {
        cordova.plugins.backgroundMode.disable()
      },

      seeSimpleData() {
        console.log(JSON.stringify(simpleStorage.get('locationList')))
        alert(JSON.stringify(simpleStorage.get('locationList')))
      },

      /**
       * 讓閃光燈亮500 毫秒
       */
      openAndClose() {
        this.openFlashlight()
        setTimeout(() => {
          this.closeFlashlight()
        }, 50)
      },

      /**
       * 開啟閃光燈
       */
      openFlashlight() {
        window.plugins.flashlight.available(function (isAvailable) {
          if (isAvailable) {
            // switch on
            window.plugins.flashlight.switchOn(
              function () {}, // optional success callback
              function () {}, // optional error callback
              {
                intensity: 1
              } // optional as well
            );
          } else {
            alert("閃光燈無法使用")
          }
        })
      },

      /**
       * 關閉閃光燈
       */
      closeFlashlight() {
        window.plugins.flashlight.switchOff()
      },

      /**
       *
       */
      getKey() {
        var kc = new Keychain()
        console.log(kc)
        logService.remoteLog('key object', kc)

        kc.getForKey(
          function (item) {
            logService.remoteLog('get kry success', item)
          },
          function (err) {
            logService.remoteLog('get kry error', err)
          },
          '1234567',
          'test-app',
        )

      },

      setKey() {
        var kc = new Keychain()
        try {
          kc.setForKey(
            function (item) {
              logService.remoteLog('set kry success', item)
            },
            function (err) {
              logService.remoteLog('set kry error', err)
            },
            '1234567',
            'test-app',
            'iampassword'
          )
        } catch (err) {
          logService.remoteLog('setkry', err)
        }
      },

      openGPS() {
        this.$dialog.alert({
          title: `定位開始`,
           message:  `定位開始`,
           confirmButtonColor: '#65db03',
         });
        logService.remoteLog('開始定位', {
          time: new Date()
        })
        this.timer = setInterval(() => {
          this.saveLocation()
          this.openAndClose()
        }, 6000)
      },

      closeGPS() {
         clearInterval(this.timer)
         this.$dialog.alert({
           title: '成功關閉',
           message: '成功關閉'
         })
      }
    }
  };

</script>
