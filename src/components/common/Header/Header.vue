<template>
    <div class="header_wrap">
        <div class="seller_content">
            <div class="head_pic">
                <img :src="seller.avatar" alt="">
            </div>
            <div class="seller_info">
               <p class="seller_name">
                   <span class="icon_brand"></span>
                   <span class="name">{{seller.name}}</span>
               </p>
               <p class="delivery">
                  <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span> 
               </p>
               <p class="discount" v-if='seller.supports'>
                   <span class="icon_discount"></span>
                   <span>{{seller.supports[0].description}}</span>
               </p>
            </div>
            <div class="discount_info" v-if='seller.supports' @click="showDetail">
                {{seller.supports.length}}个
            </div>
        </div>
        <div class="announce"  @click="showDetail">
            <span></span>
            <p>{{seller.bulletin}}</p>
        </div>
        <div class="bg" :style='{backgroundImage:"url("+seller.avatar+")"}'></div>
        <transition name="fade">
        <div class="showDetail" v-show="isShowDetail">
            <div class="detail-wrap">
                <div class="title">
                    <p>{{seller.name}}</p>
                    <star :size="48" :score="seller.score"></star>
                </div>
                <div class="discount-lists">
                    <div class="discount-title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports">
                        <li v-for="(item,index) in seller.supports" :key="index">
                            <span class="icon_discount" :class="classMap[item.type]"></span>
                            <span>{{item.description}}</span>
                        </li>
                    </ul>
                </div>
                <div class="seller-intro">
                    <div class="seller-title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <p>
                      {{seller.bulletin}}  
                    </p>
                </div>
            </div>
            <div class="close-btn" @click="closeDetail">+</div>
        </div>
        </transition>
    </div>
</template>

<script>
import star from '@/components/common/star/star'
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return { 
                isShowDetail: false
            }
        },
        created () {
            console.log(this.seller)
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        },
        computed: {
            
        },
        methods: {
            showDetail () {
                this.isShowDetail = true
            },
            closeDetail () {
                this.isShowDetail = false
            }
        },
        components: {
            star
        }
    }
</script>

<style scoped lang='stylus'>
@import '../../../common/style/mixin.styl'
.header_wrap
    background-color:rgba(7,17,27,.5)
    position:relative
    overflow:hidden
   .seller_content
       display: flex
       padding: 24px 12px 18px 24px
       position:relative
       .head_pic
           padding-right: 16px
           img
               width: 64px
               height: 64px
               border-radius: 4px
       .seller_info
           color:#fff
           .seller_name
               display:flex
               justify-content:flex-start
               align-items:center 
               margin-bottom :8px
               span
                   font-size:16px
                   line-height :18px
               .icon_brand
                   height:18px
                   width:30px
                   margin-right:6px
                   bg-image('brand')
                   background-size :30px 18px
                   background-repeat: no-repeat
            .delivery
                 font-size 12px
                 margin-bottom:10px
            .discount
                display:flex
                justify-content:flex-start
                align-items:center 
                font-size :10px
                .icon_discount
                   width:15px
                   height :15px
                   margin-right:4px
                   bg-image('decrease_1')
                   background-size :15px 15px
                   background-repeat: no-repeat 
        .discount_info
            box-sizing:border-box
            position:absolute
            bottom:18px
            right:12px
            height :24px
            width :40px
            font-size :10px
            color:#fff
            line-height :24px
            border-radius:16px
            padding-left :5px
            background-color:rgba(0,0,0,.2)
            &:after
                content:''
                position :absolute
                right:7px
                bottom:7px
                width:8px
                height:8px
                border:1px solid #ffffff
                border-width:0 1px 1px 0
                transform :rotate(-45deg)
    .announce
        display:flex
        justify-content:flex-start
        align-items:center 
        height:23px
        background-color:rgba(7,17,27,.2)
        font-size :10px
        color:#fff
        line-height 23px
        padding:0 12px
        span 
            display :inline-block
            width:20px
            height :15px
            margin-right:4px
            bg-image('bulletin')
            background-size :20px 15px
            background-repeat: no-repeat 
        p
            flex:1 
            position :relative
            overflow :hidden
            white-space :nowrap
            text-overflow:ellipsis 
            &:after
                content:''
                position :absolute
                right:1px
                bottom:7px
                width:8px
                height:8px
                border:1px solid #ffffff
                border-width:0 1px 1px 0
                transform :rotate(-45deg) 
    .bg
        position :absolute
        z-index -1
        top:0
        left:0
        width:100%
        height:100%
        background-size :cover
        background-repeat: no-repeat
        filter :blur(10px)
    .showDetail
        box-sizing:border-box
        position :fixed
        z-index 100
        top:0
        left:0
        height:100%
        width:100%
        color:#fff
        background-color:rgba(7,17,27,.8)
        padding:64px 36px 0
        overflow :auto
        .close-btn
            position: relative
            top:-40px
            width:35px
            height:0
            font-size :30px
            color:#fff
            text-align:center
            line-height 35px
            margin: 0 auto
            transform :rotate(45deg)
        .detail-wrap
            width:100%
            min-height:calc(100% - 64px)
            padding-bottom:64px
            overflow :auto
            .title
                p
                  font-size :16px
                  line-height:16px
                  text-align :center
            .discount-lists
                .discount-title
                    display :flex
                    align-items center
                    margin-top:28px
                    .line
                        flex:1
                        height:0
                        border-top:1px solid rgba(255,255,255,.3)
                    .text
                        padding:0 10px
                        font-size:14px
                ul
                    padding:24px 0 28px
                li
                    display :flex
                    align-items :center
                    line-height :2
                   span 
                    font-size :12px
                  .icon_discount
                    display:inline-block
                    width:15px
                    height :15px
                    margin-right:4px
                    bg-image('decrease_1')
                    background-size :15px 15px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_1')
                    &.discount
                        bg-image('discount_1')
                    &.special
                        bg-image('special_1')
                    &.invoice
                        bg-image('invoice_1')
                    &.guarantee
                        bg-image('guarantee_1')
            .seller-intro
                .seller-title
                    display :flex
                    align-items center
                    .line
                        flex:1
                        height:0
                        border-top:1px solid rgba(255,255,255,.3)
                    .text
                        padding:0 10px
                        font-size:14px
                p
                  font-size :12px
                  line-height :2
                  margin-top:24px
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
