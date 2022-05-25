<template>
  <!-- body -->
  <router-view />
  <!-- body -->

  <!-- foot -->
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item v-for="(item, index) in routers" :key="index" :name="item.path"
      :icon="item.icon">{{item.label}}</van-tabbar-item>
  </van-tabbar>
  <!-- foot -->

</template>
<script>
import logService from './services/log-service'
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        routers: [],
        active: '/',
      }
    },
    watch: {
      $route(to, from) {
        this.active = to.path
      }
    },
    created() {
      logService.remoteLog('app vue created')
    },
    mounted() {
      logService.remoteLog('app vue mounted')
      this.fetchRouters()
    },

    methods: {
      onChange(event) {
        this.$router.push(event)
      },

      /**
       * 組合router資料內容
       */
      fetchRouters() {
        let routerData = this.$router.getRoutes()
        this.routers = routerData.map(x => {
          return {
            name: x.name,
            path: x.path,
            icon: x.meta.icon,
            label: x.meta.label
          }
        })
      }
    }
  };

</script>


<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }

</style>
