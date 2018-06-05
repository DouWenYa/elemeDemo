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
            <div class="food-info">
                <p class="name">{{food.name}}</p>
                <p class="sell">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                </p>
                <p class="price">
                    <span class="current-price">¥{{food.price}}</span>
                    <span class="old-price" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </p>
                <div class="btn-control">
                    <div class="addIntoCart" v-show="!food.count||food.count==0" @click.stop.prevent="addFirst">加入购物车</div>
                    <div class="cartControl">
                        <cart-control :food="food"></cart-control>
                    </div>
                </div>
            </div>
            <div class="food-intro">
                <div class="text">
                    <header>商品介绍</header>
                    <p>{{food.info}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartControl from '@/components/common/cartControl/cartControl'
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
               if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.wrapper, {
                        click: 'click',
                        probeType:2
                    })
               } else {
                   this.scroll.refresh()
               }
               console.log(this.scroll)
           },
           hide () {
               this.isShow = false
           },
           addFirst (e) {
               if (!e._constructed) {
                   return 
               }
            Vue.set(this.food, 'count', 1)
           }
       },
       components: {
           cartControl
       }
    }
</script>

<style scoped lang="stylus">
@import '../../../common/style/index.styl'
.food-detail
    position :fixed
    left :0
    right :0
    top:0
    bottom:46px
    background:#fff
    .food-container
        width:100%
        height:auto
        .food-banner
            width:100%
            height:auto
            //padding-bottom:100%
            box-sizing:border-box
            position :relative
            .food-img
                img 
                    width:100%
                    height:auto
            .back
                position :absolute
                top:10px
                left:0px
                padding:10px
                span
                   font-size :15px 
                   color:#fff
        .food-info
            padding:18px
            position :relative
            .name
                font-size :14px
                color:rgb(7,17,27)
            .sell
                font-size :12px
                color:rgb(147,153,159)
                margin-top:8px
            .price
                margin-top:18px
                .current-price
                  font-size :14px
                  color:rgb(240,20,20)
                .old-price
                    font-size :12px
                    color:rgb(147,153,159)
            .btn-control
                position :absolute
                right :18px
                bottom:18px
                .addIntoCart
                    position :absolute
                    right:0
                    top:5px
                    z-index:10
                    height:24px
                    width:74px
                    border-radius:24px
                    text-align :center
                    line-height :24px
                    color:#fff
                    font-size :12px
                    background:rgb(0,160,220)
        .food-intro
            background:#f3f5f7
            border-top:1px solid  rgba(7,17,27,.1)            
            border-bottom:1px solid  rgba(7,17,27,.1)
            padding:16px 0 
            .text
                padding:18px
                background:#fff
                border-top:1px solid  rgba(7,17,27,.1)            
                border-bottom:1px solid  rgba(7,17,27,.1)
                header
                    font-size :14px
                    color :rgb(7,17,27)
                    margin-bottom:6px
                p
                    color:rgb(77,85,93)
                    font-size :12px
                    line-height :2


</style>
