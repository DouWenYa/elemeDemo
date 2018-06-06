<template>
    <div class="rating-select">
        <ul class="desc-wrap">
            <li class="select-item positive active">
                <span class="item">{{desc.all}}</span>
                <span class="num">{{ratings.length}}</span>
            </li>
            <li class="select-item positive">
                <span class="item">{{desc.positive}}</span>
                <span class="num">{{positives.length}}</span>
            </li>
            <li class="select-item negative">
                <span class="item">{{desc.negative}}</span>
                <span class="num">{{negatives.length}}</span>
            </li>
        </ul>
        <div class="onlysee-wrap"></div>
    </div>
</template>

<script>
const POSITIVE = '0'
const NEGATIVE = '1'
const ALL = '2'
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
            ratings: Array
        },
        computed: {
            positives () {
                return this.ratings.filter((pos) => {
                    return pos.rateType === POSITIVE
                })
            },
            negatives () {
                return this.ratings.filter((pos) => {
                    return pos.rateType === NEGATIVE
                })
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
    
</style>
