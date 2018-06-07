<template>
    <div class="rating-select">
        <ul class="desc-wrap">
            <li class="select-item positive" :class="{active:activeType==2}" @click="$emit('tabSelect',2)">
                <span class="item">{{desc.all}}</span>
                <span class="num">{{ratings.length}}</span>
            </li>
            <li class="select-item positive" :class="{active:activeType==0}" @click="$emit('tabSelect',0)">
                <span class="item">{{desc.positive}}</span>
                <span class="num">{{positives.length}}</span>
            </li>
            <li class='select-item negative' :class="{active:activeType==1}"  @click="$emit('tabSelect',1)">
                <span class="item">{{desc.negative}}</span>
                <span class="num">{{negatives.length}}</span>
            </li>
        </ul>
        <div class="onlysee-wrap">
            <span class="iconfont icon-select" :class="{active:onlyseeType}" @click="onlyseeSelct"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
    props: {
        desc: {
            type: Object,
            default () {
                return {
                    positive: '推荐',
                    negative: '吐槽',
                    all: '全部'
                } 
            }
        },
        onlyseeType: Boolean,
        activeType:Number,
        ratings: Array
    },
    computed: {
        positives () {
            return this.ratings.filter((pos) => {
                console.log(pos)
                return pos.rateType === POSITIVE
            })
        },
        negatives () {
            return this.ratings.filter((pos) => {
                return pos.rateType === NEGATIVE
            })
        }
    },
    methods: {
        onlyseeSelct (e) {
            if (!e._constructed) {
                return
            }
            this.$emit('onlySelct', !this.onlyseeType)
        }
    }
}
</script>

<style scoped lang="stylus">
@import '../../../common/style/index.styl'
.rating-select
    width:100%
    .desc-wrap
        margin: 0 18px
        padding:18px 0
        border-1px(rgba(7,17,27,.1))
        display :flex
        .select-item
           box-sizing:border-box
           width:auto
           height:32px
           padding:8px 10px
           margin-right:8px
           border-radius:3px
           font-size:0
           line-height :16px
           .item
             font-size :12px
             display:inline-block
           .num
            font-size :10px
            display:inline-block 
            margin-left:2px
           &.positive
             background:rgba(0,160,220,.2)
             color:rgb(77,85,93)
             &.active
                background:rgb(0,160,220)
                color:#fff
            &.negative
             background:rgba(77,85,93,.2)
             color:rgb(77,85,93)
             &.active
                background:rgb(77,85,93)
                color:#fff
    .onlysee-wrap
        padding:12px 18px
        border-bottom:1px solid rgba(147,153,159,.2)
        span 
            display:inline-block
            color:rgb(147,153,159)
            vertical-align :top
            &.iconfont
                font-size :24px
                &.active
                    color: #00c850
            &.text
                font-size :12px
                line-height :24px

</style>
