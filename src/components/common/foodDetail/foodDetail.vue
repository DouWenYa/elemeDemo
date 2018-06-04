<template>
    <div class="food-detail" v-show='isShow' ref="wrapper">
        <div class="food-container">
            <div class="food-banner">
                <div class="food-img">
<img :src="food.image" alt="">
                </div>
                <div class="back" @click="hide">
                    <span class="iconfont icon-left"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            food: Object
        },
       data () {
           return {
              isShow: false 
           }
       },
       methods: {
           show () {
               this.isShow = true
           },
           hide () {
               this.isShow = false
           }
       }
    }
</script>

<style scoped lang="stylus">
@import '../../../common/style/index.styl'
.food-detail
    position :fixed
    left :0
    top:0
    bottom:46px
    background:#fff
    .food-container
        width:100%
        height:100%
        .food-banner
            width:100%
            height:0
            padding-bottom:100%
            box-sizing:border-box
            position :relative
            .food-img
                img 
                    width:100%
                    height:100%
            .back
                position :absolute
                top:10px
                left:0px
                padding:10px
                span
                   font-size :15px 
                   color:#fff

</style>
