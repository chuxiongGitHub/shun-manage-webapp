<template lang="pug">
#app
  app(style="margin-top:5px")
  hr(style="margin-top:10px")
  .layout
    Menu(@on-select="menuChange", :active-name="$router.name", :theme="theme" :width="this.menuWidth")
      Menu-item(name="user")
        Icon(type="person-stalker")
        | 用户管理
      Menu-item(name="map")
        Icon(type="ios-location-outline")
        | 地图打点
      Menu-item(name="note")
        Icon(type="android-notifications")
        | 公告管理
      Submenu(name="task")
        template(slot="title")
          Icon(type="ios-paper")
          | 任务管理
        Menu-item(name="task-new")
          Icon(type="share")
          | 新建工单
        Menu-item(name="task-old")
          Icon(type="share")
          | 维护工单
      Menu-item(name="device")
        Icon(type="iphone")
        | 设备管理
      Menu-item(name="sign")
        Icon(type="android-alarm-clock")
        | 签到管理
      Menu-item(name="company")
        Icon(type="ios-home-outline")
        | 商户管理
      .log-out
        Button(type="primary" @click="logout" long icon="log-out") 退出登录
    router-view.container
</template>

<script>
import App from './App'
export default {
  components: { App },
  data () {
    return {
      theme: 'dark',
      menuWidth: '150px'
    }
  },
  methods: {
    menuChange (name) {
      this.$router.push({ name })
    },
    logout () {
      // this.$store.dispatch(LOG_OUT)
      window.location.href = `${window.location.origin}/auth.html`
    }
  }
}
</script>

<style lang="stylus">
@import './base/main'
</style>

