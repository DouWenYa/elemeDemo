<template>
<transition name="fade">
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
            <div class="rating-wrap">
                <p class="title">商品评价</p>
                <div class="ratingSelect-wrap">
                    <rating-select :ratings="food.ratings" :onlysee-type="onlyseeType" :active-type="activeType" @tabSelect="ratingType($event)" @onlySelct="onlyType($event)"></rating-select>
                </div>
                <ul class="rating-lists">
                    <li class="rating-item" v-for="(info,index) in selectRating" :key="index">
                        <div class="head">
                            <span class="date">{{info.rateTime|formatDate}}</span>
                            <div class="user">
                               <span class="username">{{info.username}}</span>
                               <img :src="info.avatar" alt="">
                            </div>
                        </div>
                        <div class="bottom">
                            <span class="iconfont icon-thumbdown" :class='{"icon-thumbup":info.rateType===0,"icon-thumbdown":info.rateType===1}'></span>
                            <span class="text" v-show="info.text">{{info.text}}</span>
                        </div>
                    </li>
                    <li class="no-rating" v-show="!selectRating.length">
                        暂无评论
                    </li>
                </ul>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
// 引入格式化事件工具
import moment from 'moment'
// 引入时区
import 'moment/locale/zh-cn'
// 引入自己的公用时间格式化方法
import {formatDate} from '@/common/js/date'
import cartControl from '@/components/common/cartControl/cartControl'
import ratingSelect from '@/components/common/ratingSelect/ratingSelect'
// 使用中国时间
moment.locale('zh-cn')
    export default {
        props: {
            food: Object
        },
       data () {
           return {
              isShow: false,
              desc: {
                    positive: '推荐',
                    negative: '吐槽',
                    all: '全部'
                },
              onlyseeType: false,
              activeType: 2
           }
       },
       computed: {
           selectRating () {
               let select = []
               if (this.activeType===2) {
                   select = this.food.ratings
               } else {
                   select = this.food.ratings.filter((rating) => {
                       return this.activeType === rating.rateType
                   })
               }
               if (this.onlyseeType) {
                   select = select.filter((rate) => {
                       return !!rate.text
                   })
               }
               return select
           }
       },
       methods: {
           show () {
                this.isShow = true
               if (!this.scroll) {
                   this.$nextTick(() => {
                       this.scroll = new BScroll(this.$refs.wrapper, {
                           click: 'click',
                           probeType: 2
                       })
                   })
               } else {
                   this.scroll.refresh()
               }
           },
           hide () {
               this.isShow = false
           },
           addFirst (e) {
               if (!e._constructed) {
                   return 
               }
            Vue.set(this.food, 'count', 1)
           },
           ratingType (type) {
               this.activeType = type
               this.$nextTick(() => {
                   this.scroll.refresh()
               }) 
           },
           onlyType (type) {
               this.onlyseeType = type
               this.$nextTick(() => {
                   this.scroll.refresh()
               })
           }
       },
       components: {
           cartControl,
           ratingSelect
       },
       filters: {
           formatDate (date) {
               // return moment(date).format('YYYY-MM-DD hh:mm')
               // 使用自己的方法
              return formatDate(date, 'YYYY-MM-DD hh:mm')
           }
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
        .rating-wrap
            .title
                font-size :14px
                color:rgb(7,17,27)
                margin:18px 18px 0
        .rating-lists
            padding:0 18px
            box-sizing:border-box
            .rating-item
                padding:16px 0
                border-1px(rgba(7,17,27,.1))
                .head
                    display:flex
                    justify-content space-between
                    margin-bottom:6px
                    .date
                       color:rgb(147,153,159)
                       font-size :10px
                    .user
                        color:rgb(147,153,159)
                        font-size :10px
                        .username
                            display: inline-block
                        img
                            width:12px
                            height:12px
                .bottom
                    font-size :12px
            .no-rating
                font-size :12px 
                color:rgb(147,153,159)
                padding:18px
                text-align :center
.fade-enter-active, .fade-leave-active
    transform :translate3d(0,0,0)
    transition: all .5s
.fade-enter, .fade-leave-to
  transform :translate3d(100%,0,0)
</style>
