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
        </div>

    </div>
</template>

<script>
// import BScroll from 'better-scroll'
import star from '@/components/common/star/star'
    export default {
        props: {
            seller: Object
        },
        components: {
            star
        },
        data () {
            return {
                isCollected: false
            }
        },
        methods: {
            addCollect () {
                this.isCollected = !this.isCollected
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


</style>

