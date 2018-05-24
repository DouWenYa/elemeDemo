<template>
    <div>
        <div class="nav_bar">
            <router-link class="nav_item" :to='{name:"goods"}'>商品</router-link>
            <router-link class="nav_item" :to='{name:"ratings"}'>评论</router-link>
            <router-link class="nav_item" :to='{name:"seller"}'>商家</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
    }
</script>
<style lang="stylus" scoped>
.nav_bar
    display: flex
    height: 40px
    .nav_item
      flex: 1
      line-height 40px
      text-align:center
</style>

