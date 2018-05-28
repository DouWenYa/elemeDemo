<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left" @click="toggleList">
                <div class="logo-wrap">
                    <div class="logo" :class="totalCount>0?'heighLight':''">
                        <i class="iconfont icon-shopcart" :class="{'heighLight':totalCount>0}"></i>
                    </div>
                    <div class="count" v-show="totalCount>0">
                        {{totalCount}}
                    </div>
                </div>
                <div class="totalPrice" :class="{'heighLight':totalPrice>0}">¥{{totalPrice}}</div>
                <div class="desc">另需¥{{deliveryPrice}}元配送费</div>
            </div>
            <div class="content-right" :class="{'account':totalPrice>=minPrice}" @click="payment">
                <div class="pay">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-title">
                    <span class="left">购物车</span>
                    <span class="clean" @click="emptyList">清空</span>
                </div>
                <div class="list-wrap" ref="listWrap">
                    <ul>
                        <li class="list-item" v-for="(good,index) in selectFoods" :key="index">
                            <div class="food-info">
                                <span class="name">{{good.name}}</span>
                                <span class="price">¥{{good.price}}</span>
                            </div>
                            <div class="food-control">
                                <cart-control :food="good"></cart-control>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <transition name="mask">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartControl from '@/components/common/cartControl/cartControl'
    export default {
        props: {
            selectFoods: {
                type: Array, // 数值类型为object或是array default为function
                default () {
                    return [
                        {
                            price: 10,
                            count: 0
                        }
                    ]
                }
            },
            minPrice: {
                type: Number,
                default: 0
            },
            deliveryPrice: {
               type: Number,
                default: 0 
            }
        },
        data () {
          return {
              isShow: true
          }
        },
        computed: {
            totalPrice () {
                let total = 0 
                this.selectFoods.forEach((item) => {
                    total += item.price*item.count
                })
                return total
            },
            totalCount () {
                let count = 0
                this.selectFoods.forEach((item) => {
                    count += item.count
                })
                return count
            },
            payDesc () {
                if (this.totalPrice === 0) {
                    return `¥${this.minPrice}元起送`
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice
                     return `还差¥${diff}元起送`
                } else {
                    return `去结算`
                }
            },
            listShow () {
                 if (!this.totalCount) {
                    this.isShow = true
                     return false
                 }
                 if (!this.isShow) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.listWrap, {
                            click: true
                        })
                        } else {
                        this.scroll.refresh()
                        }
                    })
                    }
                return !this.isShow
            }
        },
        components: {
            cartControl
        },
        methods: {
            emptyList () {
                this.selectFoods.forEach((good) => {
                    good.count = 0 
                })
            },
            toggleList () {
                if (!this.totalCount) {
                    return
                }
                this.isShow = !this.isShow
                console.log(this.isShow)
            },
            hideList () {
                this.isShow = !this.isShow
            },
            payment () {
                if (this.totalPrice>this.minPrice) {
                    if (!this.isShow) {
                          this.isShow = !this.isShow 
                    }
                   // alert(`总计¥${this.totalPrice},确认支付？`)
                }
            }
        }
    }


</script>

<style scoped lang='stylus'>
@import '../../../common/style/mixin.styl'
.shopcart
    position :fixed
    left:0
    bottom :0
    width:100%
    height:46px
    z-index 10
    background:#141d27
    .content
        display:flex
        height:100%
        color: rgba(255, 255, 255, 0.4)
        .content-left
            flex :1
            display:flex
            .logo-wrap
                position :relative
                top:-12px
                box-sizing:border-box
                width:56px
                height:56px
                flex:0 0 56px
                margin:0 12px
                padding:6px
                border-radius:56px
                background:#141d27
                .logo
                   width:100%
                   height:100%
                   border-radius:100%
                   background-color:#2b343c
                   text-align:center
                   &.heighLight
                     background-color:rgb(0, 160, 220)
                   .icon-shopcart
                       font-size :24px
                       color:#80858a
                       line-height :44px
                       &.heighLight
                           color:#fff
                .count
                    position :absolute
                    top:0
                    right:0
                    width:24px
                    height:16px
                    font-size :10px
                    text-align:center
                    line-height 16px
                    border-radius:16px
                    color:#fff
                    background:rgb(240, 20, 20)
            .totalPrice
                box-sizing:border-box
                margin:12px 0
                padding-right:12px
                line-height 22px
                font-size :16px
                border-right:1px solid rgba(255,255,255,.1)
                &.heighLight
                    color:#fff
            .desc
                font-size :12px
                line-height 44px
                margin-left :12px
                

        .content-right
            flex:0 0 105px
            width:105px
            background:#2b333b
            &.account
                background: #00b43c
                color: #fff
            .pay
                font-size 14px
                line-height :44px
                text-align:center
    .shopcart-list
        position :absolute
        left :0
        bottom:46px
        z-index :-1
        width:100%
        .list-title
            box-sizing:border-box
            height:40px
            width :100%
            padding :0 18px
            display :flex
            justify-content :space-between
            align-items:center
            background:#f3f5f7
            border-bottom:1px solid rgba(7,17,27,.1)
            .left
                font-size 14px
                color:rgb(7,17,27)
            .clean
                font-size 12px
                color:rgb(0,120,220)
        .list-wrap
            max-height :217px
            padding :0 18px
            background :#fff
            overflow :hidden
            .list-item
                box-sizing:border-box
                height :48px
                padding:12px 0
                line-height :24px
                display:flex
                justify-content :space-between
                align-items :center
                border-1px(rgba(7,17,27,.1))
                .food-info
                    flex:1
                    display :flex
                    justify-content :space-between
                    align-items :center
                    padding-right:12px
                    .name
                        font-size :14px
                        color:rgb(7,17,27)
                    .price
                        font-size :14px
                        color:rgb(220,20,20)
    .list-mask
        position :fixed
        left :0
        top:0
        z-index :-2
        width:100%
        height:100%
        background :rgba(7,17,27,.6)
        filter :blur(10px)
.mask-enter-active, .mask-leave-active
    transition: all .5s
.mask-enter, .mask-leave-to
  opacity: 0
.fade-enter-active, .fade-leave-active
    transform :translate3d(0,0,0)
    transition: all .5s
.fade-enter, .fade-leave-to
  opacity: 0
  transform :translate3d(0,100%,0)
</style>
