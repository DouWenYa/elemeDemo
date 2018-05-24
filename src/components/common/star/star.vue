<template>
    <div class="star" :class="mapSize">
        <span  v-for="(item,index) in mapType" :class="item" :key="index" class="item"></span>
    </div>
</template>

<script type="text/ecmascript6">
const LEN = 5 // 星星总数
const CLS_HALF = 'half'
const CLS_OFF = 'off'
const CLS_ON = 'on'
    export default {
       props: {
           size: Number,
           score: Number
       },
       created () {
           // console.log(this.score)
       },
       computed: {
           mapSize () {
               return 'star' + this.size
           },
           mapType () {
               let stars = []
               let score = Math.floor(this.score*2)/2
               let hasDot = score % 1 !== 0
               let integer = Math.floor(score)
               for (let i = 0; i < integer; i++) {
                   stars.push(CLS_ON)
               }
               if (hasDot) {
                    stars.push(CLS_HALF)
               }
               if (stars.length < LEN) {
                   stars.push(CLS_OFF) 
               }
               return stars
           }
       }
    }
</script>

<style scoped lang="stylus">
@import '../../../common/style/mixin.styl'
.star
    margin-top:24px
    &.star48
        span 
            width: 20px
            height: 20px
            margin-right: 22px
            background-size: 20px 20px
            &:last-child
              margin-right: 0
            &.on
                bg-image('star48_on')
            &.half
                bg-image('star48_half')
            &.off
                bg-image('star48_off')
    &.star36
        span
            width: 15px
            height: 15px
            margin-right: 6px
            background-size: 15px 15px
            &:last-child
                margin-right: 0
            &.on
                bg-image('star36_on')
            &.half
                bg-image('star36_half')
            &.off
                bg-image('star36_off')
    &.star24
        span
            width: 10px
            height: 10px
            margin-right: 3px
            background-size: 10px 10px
            &:last-child
                margin-right: 0
            &.on
                bg-image('star24_on')
            &.half
                bg-image('star24_half')
            &.off
                bg-image('star24_off')
    span 
     display:inline-block
     background-repeat:no-repeat
</style>
