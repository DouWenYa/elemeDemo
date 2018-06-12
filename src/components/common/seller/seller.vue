<template>
    <div class="seller-wrap" ref="wrapper">
        <div class="seller-content">
            <div class="sale-info">
                <div class="top">
                    <p class="seller-name">{{seller.name}}</p>
                    <p class="sales">
                        <star class="star" :size="36" :score="seller.score"></star>
                        <span class="ratingCount">({{seller.ratingCount}})</span>  
                        <span class="sellCount">月售{{seller.sellCount}}单</span>  
                    </p>
                    <p class="collect" @click="addCollect">
                        <span class="iconfont icon-favorite" :class="{active:isCollected}"></span>
                        <span class="collected" v-show='isCollected'>已收藏</span>
                    </p>
                </div>
                <div class="bottom">
                    <div class="item deliveryPrice">
                        <span class="text">起送价</span>
                        <p class="price">
                            {{seller.deliveryPrice}}<span class="unit">元</span>
                        </p>
                    </div>
                    <div class="item minPrice">
                        <span class="text">商家配送</span>
                        <p class="price">
                            {{seller.minPrice}}<span class="unit">元</span>
                        </p>
                    </div>
                    <div class="item deliveryTime">
                        <span class="text">平均配送时间</span>
                        <p class="price">
                            {{seller.deliveryTime}}<span class="unit">分钟</span>
                        </p>
                    </div>
                </div>
            </div>
            <split></split>   
            <div class="activity-wrap">
                <div class="desc">
                    <p class="title">公告与活动</p>
                    <p class="text">{{seller.bulletin}}</p>
                </div>
                <ul class="discount-list">
                    <li v-for="(item,index) in seller.supports" :key="index" class="item">
                        <span class="icon" :class="iconMap[item.type]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <split></split> 
            <div class="seller-image">
                <p class="title">商家实景</p>
                <div class="image-wrap" ref="imgwrap">
                    <ul class="image-scroller" ref="scroller">
                        <li class="image-item" v-for='(img,index) in seller.pics' :key="index">
                            <img :src="img" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="seller-info">
                <p class="title">
                    商家信息
                </p>
                <ul class="info-list">
                    <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '@/components/common/star/star'
import split from '@/components/common/split/split'
    export default {
        props: {
            seller: Object
        },
        components: {
            star,
            split
        },
        data () {
            return {
                isCollected: false,
                iconMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
            }
        },
        watch: {
            seller () { // 防止props异步传值，mounted时页面高度计算有误
                 this._pageInitScroll()
                 this._picInitScroll()
            }
        },
        mounted () {
            this.$nextTick(() => {
                 this._pageInitScroll()
                 this._picInitScroll()
            })
        },
        methods: {
            addCollect () {
                this.isCollected = !this.isCollected
            },
            _picInitScroll () {
               let picWidth = 120
                let margin = 6
                let len = this.seller.pics.length
                let picTotalWidth = (picWidth + margin)*len - margin + 'px'
               // console.log(this.seller.pics.length)
                this.$refs.scroller.style.width = picTotalWidth
                if (!this.picScroll) {
                    this.picScroll = new BScroll(this.$refs.imgwrap, {
                        scrollX: true,
                        eventPassthrough: 'vertical'
                    })
                } else {
                    this.picScroll.refresh()
                } 
            },
            _pageInitScroll () {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.wrapper, {
                        click: true,
                        probeType: 2
                    })
                } else {
                    this.scroll.refresh()
                }
            }
        }
    }
</script>

<style scoped lang='stylus'>
@import '../../../common/style/index.styl'
.seller-wrap
    position :absolute
    top:171px
    bottom:0
    left:0
    right:0
    z-index :-1
    overflow :hidden
    .seller-content
      .sale-info
         padding:18px
         .top
            padding-bottom:18px
            border-1px(rgba(7,17,27,.1))
            position :relative
            .collect
                position :absolute
                top:0
                right:0
                width:40px
                height:40px
                .iconfont
                    display:block
                    font-size :24px
                    line-height :24px
                    text-align :center
                    &.active
                        color:rgb(240,20,20)
                .collected
                    display:block
                    margin-top:4px
                    font-size :10px
                    line-height :10px
                    color:rgb(77,85,93)
            .seller-name
                font-size :14px
                color:rgb(7,17,27)
                line-height :14px
            .sales
                margin:8px 0 0px
                font-size :0
                .star
                    margin-top:0
                    display: inline-block
                .ratingCount
                    font-size :10px
                    color:rgb(77,85,93)
                    line-height :18px
                    display:inline-block
                    margin:0 12px 0 8px
                    vertical-align :top 
                .sellCount
                    font-size :10px
                    color:rgb(77,85,93)
                    line-height :18px
                    display:inline-block
                    vertical-align :top
         .bottom
            padding-top:18px
            display :flex
            justify-content :center
            align-items :center
            .item
                flex:1
                border-right:1px solid rgba(7,17,27,.1)
                text-align :center
                &:last-child
                    border:none 
                .text
                    font-size :10px
                    color:rgb(147,153,159)
                    line-height :10px 
                .price
                    font-size :24px
                    color:rgb(7,17,27)
                    line-height :24px
                    margin-top:4px 
                    .unit
                        font-size :10px
                        color:rgb(7,17,27)
                        line-height :24px
      .activity-wrap
         padding:18px 18px 0
         .desc
            padding-bottom:16px
            border-1px(rgba(7,17,27,.1))
            .title
               font-size :14px 
               color:rgb(7,17,27)
               line-height 14px
               margin-bottom:8px
            .text
               padding:0 12px
               font-size :12px 
               color:rgb(240,20,20)
               line-height 24px
         .discount-list
            .item
                padding:16px
                border-1px(rgba(7,17,27,.1))
                font-size:0
                &:last-child
                    border-none()
                .icon
                    display:inline-block
                    width:15px
                    height :15px
                    margin-right:4px
                    background-size :15px 15px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('../Header/decrease_1')
                    &.discount
                        bg-image('../Header/discount_1')
                    &.special
                        bg-image('../Header/special_1')
                    &.invoice
                        bg-image('../Header/invoice_1')
                    &.guarantee
                        bg-image('../Header/guarantee_1')
                .text
                    display :inline-block
                    font-size :12px
                    line-height 16px
                    color:rgb(7,17,27)
                    vertical-align :top
      .seller-image
         padding: 18px
        .title
           font-size :14px 
           color:rgb(7,17,27)
           line-height 14px
           margin-bottom:12px
        .image-wrap
            width:100%
            overflow :hidden
            //.image-scroller
            .image-item
                width:120px
                height:90px
                margin-right:6px
                float :left
                &:last-child
                    margin:0
                img 
                    width:100%
                    height:100%
      .seller-info
        padding: 18px 18px 0 18px
        .title
           font-size :14px 
           color:rgb(7,17,27)
           line-height 14px
           padding-bottom:12px
           margin:0
           border-1px(rgba(7,17,27,.1))
        .info-list
            .info-item
                padding:16px 12px
                font-size:12px 
                color:rgb(7,17,27)
                line-height 16px
                border-1px(rgba(7,17,27,.1))
                &:last-child
                    border-none()

</style>

