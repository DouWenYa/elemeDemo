<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="nav_bar border-1px">
      <router-link class="nav_item" :to='{name:"goods"}' tag="div">商品</router-link>
      <router-link class="nav_item" :to='{name:"ratings"}' tag="div">评论</router-link>
      <router-link class="nav_item" :to='{name:"seller"}' tag="div">商家</router-link>
      <div class="close">
        <!-- <img src="/static/icon/add_circle.svg" alt=""> -->
        <!-- <span class="icon-more"></span> -->
        
      </div>
    </div>
    <!-- 缓存组件 -->
<keep-alive>
    <router-view :seller="seller" :ratings="ratings" :goods="goods"></router-view>
</keep-alive>
  </div>
</template>

<script>
import Header from '@/components/common/Header/Header'
import goods from '@/components/common/goods/goods'
import axios from 'axios'
// import '@/common/style/index.styl'
export default {
  name: 'App',
  data () {
    return {
      seller: {},
      goods: [],
      ratings: []
      }
  },
  components: {
    'v-header': Header,
    goods
  },
  created () {
    axios.get('/static/data.json').then((res) => {
      if (res.status === 200) {
        this.seller = res.data.seller
        this.goods = res.data.goods
        this.ratings = res.data.ratings
        console.log(res.data.seller)
      }
    })
  }
}
</script>

<style lang="stylus">
// @import './common/style/mixin.styl'
// @import './common/style/base.styl'
@import './common/style/index.styl'
// @import './common/style/icon.styl'
.nav_bar
    display: flex
    height: 40px
    border-1px(rgba(7,17,27,.1))
    .nav_item
      flex: 1
      line-height 40px
      text-align:center
      &.active
         color: rgb(240,20,20)
  .close
    img
     width:20px
     height:20px

</style>
