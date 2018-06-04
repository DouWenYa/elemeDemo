<template>
    <div class="cart-control">
        <transition name="fade">
            <div class="decrese_btn" v-show="food.count>0" @click.stop.prevent='decrese'>
                <i class="iconfont icon-decrese"></i>
            </div>
        </transition>
        <div class="current_num" v-show="food.count>0">{{food.count}}</div>
        <div class="add_btn" @click.stop.prevent="add">
            <i class="iconfont icon-add"></i>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
    export default {
        props: {
            food: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        methods: {
            add (e) {
                if (!e._constructed) {
                    return 
                }
                console.log('add')
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1)
                } else {
                    this.food.count++
                }
            },
            decrese (e) {
                if (!e._constructed) {
                    return 
                }
                if (this.food.count) {
                    this.food.count--
                }
            }
        }
        
    }
</script>

<style scoped lang='stylus'>
.cart-control
    font-size :0
    >div
      display:inline-block
    .decrese_btn,.add_btn
        padding: 6px
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        .icon-add,.icon-decrese
            font-size: 24px
    .current_num
        width: 12px
        padding-top: 6px
        line-height: 24px
        vertical-align :top
        text-align: center
        font-size: 10px
        color: rgb(147, 153, 159)
.fade-enter-active, .fade-leave-active
    transform :translate3d(0,0,0)
    transition: all .5s
.fade-enter, .fade-leave-to
  opacity: 0
  transform :translate3d(24px,0,0)

</style>
