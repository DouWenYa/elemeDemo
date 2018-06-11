<template>
    <div class="ratings" ref='wrap'>
        <div class="scroller">
            <div class="service-score">
                <div class="wrap-left">
                    <p class="score">{{seller.score}}</p>
                    <p class="score-desc">综合评分</p>
                    <p class="score-compare">高于周边商家{{seller.rankRate}}%</p>
                </div>
                <div class="wrap-right">
                    <p class="service">
                        <span class="text">服务态度</span>
                        <star :size="36" :score="seller.serviceScore" class="star"></star>
                        <span class="serviceScore">{{seller.serviceScore}}</span>
                    </p>
                    <p class="goods">
                        <span class="text">服务态度</span>
                        <star :size="36" :score="seller.foodScore"  class="star"></star>
                        <span class="serviceScore">{{seller.foodScore}}</span>
                    </p>
                    <p class="delivery-time">
                        <span class="text">送达时间</span>
                        <span class="time">{{seller.deliveryTime}}分钟</span>
                    </p>
                </div>
            </div>
            <div class="rating-wrap">
                <div class="rating-content">
                    <div class="ratingSelect-wrap">
                        <rating-select :ratings="ratings" :desc="desc" :onlysee-type="onlyseeType" :active-type="activeType" @tabSelect="ratingType($event)" @onlySelct="onlyType($event)"></rating-select>
                    </div>
                    <ul class="rating-list">
                        <li class="rating-item" v-for='(rating,index) in ratings' :key="index" v-show='needShow(rating.rateType,rating.text)'>
                            <div class="headPic">
                                <img :src="rating.avatar" alt="">
                            </div>
                            <div class="rating-info">
                                <p class="customName">{{rating.username}}</p>
                                <p class="score">
                                 <star :size="24" :score="rating.score"  class="star"></star> 
                                 <span v-show="rating.deliveryTime" class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>  
                                </p>
                                <p class="text" v-show="rating.text">
                                    {{rating.text}}
                                </p>
                                <p class="recommend">
                                    <span class="iconfont" :class='{"icon-thumbup":rating.rateType===0,"icon-thumbdown":rating.rateType===1}'></span>
                                    <span  v-for='(recommend,index) in rating.recommend' :key="index" class="food">{{recommend}}</span>
                                </p>
                                <span class="rating-time">{{rating.rateTime | formatDate}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {formatDate} from '@/common/js/date'
import star from '@/components/common/star/star'
import ratingSelect from '@/components/common/ratingSelect/ratingSelect'
    export default {
        props: {
            ratings: {
                type: Array,
                default () {
                    return []
                }
            },
            seller: Object
        },
        data () {
            return {
                onlyseeType: true,
                activeType: 2, // 全部
                desc: {
                    positive: '满意',
                    negative: '不满意',
                    all: '全部'
                }
            }
        },
        mounted () {
            this.$nextTick(() => {
                if (this.scroll) {
                    this.scroll.refresh()
                } else {
                    this.scroll = new BScroll(this.$refs.wrap, {
                        click: true,
                        probeType: 2
                    })
                }
            })
        },
        methods: {
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
            }, 
            needShow (type, text) {
                if (this.onlyseeType && !text) {
                   return false
                }
                if (this.activeType === 2) {
                  return true
                } else {
                 return type === this.activeType  
                }
            }
        },
        components: {
            star,
            ratingSelect
        },
        filters: {
            formatDate (date) {
                return formatDate(date, 'YYYY-MM-DD hh:mm')
            }
        }
    }
</script>

<style scoped lang="stylus">
@import '../../../common/style/index.styl'
.ratings
    position :absolute
    top:171px
    bottom:0
    left:0
    right:0
    z-index :-1
    overflow :hidden
    .service-score
        display :flex
        padding:18px 10px
        .wrap-left
            flex:1
            border-right:1px solid rgba(7,17,27,.1)
            p
            text-align:center
            .score
                font-size :24px
                color:rgb(255,153,0)
                line-height :28px
                margin-bottom:6px
            .score-desc
                font-size :12px
                color:rgb(7,17,27)
                line-height :12px
                margin-bottom:8px
            .score-compare
                font-size :10px
                color:rgba(7,17,27,.3)
                line-height :10px
                margin-bottom:6px
        .wrap-right  
            flex:0 0 190px
            width:190px 
            padding-left :20px
            p
              font-size:0px
              margin-bottom :8px
              span 
                display :inline-block
              .star
                  display inline-block
                  margin:0 12px
              .serviceScore
                  color:rgb(255,153,0)
                  font-size :12px
                  line-height :18px
                  
              .text
                  font-size :12px
                  color:rgb(7,17,27)
              .time
                  font-size :12px
                  color:rgb(147,153,159)
                  line-height:18px
                  margin-left:12px 
    .rating-wrap
        background:#f3f5f7
        padding-top:18px
        border-top:1px solid rgba(7,17,27,.1)
        .rating-content
            background :#fff
            border-top:1px solid rgba(7,17,27,.1)
            .rating-list
                padding:0 18px
                .rating-item
                    display:flex
                    padding:18px 0
                    border-1px(rgba(7,17,27,.1))
                    .headPic
                        flex:0 0 28px
                        width:28px
                        height:28px
                        margin-right:12px
                        img 
                            width:100%
                            height:100%
                    .rating-info
                        flex:1
                        position :relative
                        .customName
                            font-size :10px
                            color:rgb(7,17,27)
                            line-height :12px
                        .score
                            .star
                                margin:4px 6px 6px 0
                                display :inline-block
                            .deliveryTime
                                font-size :10px
                                color:rgb(147,153,159)
                                line-height :12px
                                display :inline-block
                        .text
                            font-size :12px
                            color:rgb(7,17,27)
                            line-height :18px 
                        .recommend
                            .icon-thumbdown
                                font-size :12px
                                color:rgb(183,187,191)
                                line-height :16px
                            .icon-thumbup
                                font-size :12px
                                color:rgb(0,160,220)
                                line-height :16px 
                            .food
                                display:inline-block 
                                padding :3px 6px
                                border:1px solid rgba(7,17,27,.1)
                                border-radius:2px
                                font-size :9px
                                color:rgb(147,153,159)
                                line-height :16px
                                margin-bottom :6px
                                margin-right:6px
                        .rating-time
                            position :absolute
                            top:0
                            right :0
                            font-size :10px
                            color:rgb(147,153,159)
                            line-height :12px
</style>
