<template>
    <div class="goods">
        <div class="menu-wrap" ref="menuWrap">
            <ul class="menu-lists">
                <li v-for="(good,index) in goods" :key="index" class="menu-item menu-item-hock" :class="mapMenuIndex==index?'active':''" @click="scrollToType(index,$event)">
                    <span class="icon" :class="classMap[good.type]" v-if="good.type!==-1"></span>
                    <span class="name" :style='{textAlign:good.type==-1?"center":""}'>{{good.name}}</span>
                </li>
            </ul>
        </div>
        <div class="foods-wrap" ref="foodsWrap">
            <ul class="foods-list">
                <li class="foods-type foods-type-hock" v-for="(good,index) in goods" :key="index">
                    <p>{{good.name}}</p>
                    <ul v-if="good.foods.length">
                        <li class="foods-item" v-for='(item,index) in good.foods'  :key="index" @click="currentFood(item,$event)">
                            <div class="foods-icon">
                                <img :src="item.icon" alt="">
                            </div>
                            <div class="foods-info">
                                <p class="name">{{item.name}}</p>
                               <p class="desc" v-if="item.description">{{item.description}}</p>
                               <p class="sells">月售{{item.sellCount}}份 好评{{item.rating}}%</p>
                               <p class="price"><span class="nowPrice">¥{{item.price}}</span><span v-show="item.oldPrice" class="oldPrice">¥{{item.oldPrice}}</span></p>
                                <div class="control-wrap">
                                    <cart-control :food="item"></cart-control>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart  :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>  
        <food-detail ref="foodDetail" :food='food'></food-detail>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '@/components/common/shopcart/shopcart'
import cartControl from '@/components/common/cartControl/cartControl'
import foodDetail from '@/components/common/foodDetail/foodDetail'
    export default {
        props: {
             seller: Object,
             goods: Array
        },
        components: {
            shopcart,
            cartControl, 
            foodDetail
        },
        data () {
            return {
                scrollY: 0,
                foodsHeight: [],
                food: {}
            }
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        },
        mounted () {
            this.$nextTick(() => {
                this._initScroll() // 初始化BSscroll
                this._foodsScroll() // 监听页面滚动
                this._calcFoodsHeight() // 计算foods列表高度
            })
        },
        methods: {
            _initScroll () {
                this.menuScroll = new BScroll(this.$refs.menuWrap, {
                    click: true
                })
                this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
                    click: true,
                    probeType: 3
                })
            },
            _foodsScroll () {
               this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y))
                   // console.log(this.scrollY)
                    // this.$refs.menuWrap.querySelector('.active').scrollIntoView()
               }) 
            },
            _calcFoodsHeight () {
             let LiDoms = this.$refs.foodsWrap.querySelectorAll('.foods-type-hock')
             let heightList = 0
             for (let i=0; i<LiDoms.length; i++) {
                 heightList += LiDoms[i].offsetHeight
                this.foodsHeight.push(heightList)
             }
            },
            scrollToType (index, e) {
                if (!e._constructed) { // BSscroll判断pc端，防止pc重复派发事件
                    return
                }
                // foods滑动到对应位置
               this.foodsScroll.scrollToElement(this.$refs.foodsWrap.querySelectorAll('.foods-type-hock')[index], 100)
                // menu点击后改变
                this.$refs.menuWrap.querySelector('.active').classList.remove('active')
                this.$refs.menuWrap.querySelectorAll('.menu-item-hock')[index].classList.add('active')
            },
            currentFood (food, e) {
                if (!e._constructed) {
                    return 
                }
                this.food = food
                this.$refs.foodDetail.show()
            }
        },
        computed: {
           mapMenuIndex () {
               for (let i=0; i<this.foodsHeight.length; i++) {
                   let nowHeigth = this.foodsHeight[i]
                   let nextHeigth = this.foodsHeight[i+1]
                    if (nextHeigth?(this.scrollY>=nowHeigth&&this.scrollY<nextHeigth):this.scrollY>=nowHeigth) {
                        this.menuScroll.scrollToElement(this.$refs.menuWrap.querySelector('.active'))
                        return i+1
                    }  
               }
               this.menuScroll&&this.menuScroll.scrollToElement(this.$refs.menuWrap.querySelector('.active'))
               return 0
           },
           selectFoods () {
               let foods = []
               this.goods.forEach((good) => {
                   good.foods.forEach((food) => {
                       if (food.count) {
                           foods.push(food) 
                       }
                   })
               })
               return foods
           }
        }
    }
</script>

<style scoped lang='stylus'>
// @import '../../../common/style/mixin.styl'
@import '../../../common/style/index.styl'
.goods
    display:flex
    position :absolute
    left:0
    top:171px
    bottom:46px
    width:100%
    //height:calc(100% - 171px)
    overflow :hidden
    .menu-wrap
        box-sizing:border-box
        width:80px
        //padding:0 12px
        background-color:#f3f5f7
        .menu-lists
            width:100%
            position :relative
            .menu-item
                display :flex
                //width:100%
                height:56px
                padding:0 12px
                justify-content :center
                align-items :center
                border-1px(rgba(7,17,27,.1))
                &.active
                    top:-1px //遮盖上边线
                    background-color:#fff
                    border-none() //去掉下边线
                &:last-child
                    border-none()
                span 
                    display:inline-block
                    font-size:12px
                    line-height :14px
                    &.icon
                        //align-self :flex-start
                        width:15px
                        height :15px
                        margin-right:4px
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
                    &.name
                        flex:1
    .foods-wrap
        flex:1
        .foods-type
            >p
              font-size :12px
              height:26px
              padding-left :14px
              border-left :2px solid #d9dde1
              line-height :26px
              color:rgb(147,153,159)
              background-color:#f3f5f7
            .foods-item
                display :flex
                padding:18px
                border-1px(rgba(7,17,27,.1))
                &:last-child
                    border-none()
                &:after
                    width:calc(100% - 36px)
                    left:18px
                .foods-icon
                    width:56px
                    height:56px
                    padding-right:10px
                    img
                      width:56px
                      height:56px
                .foods-info
                    position: relative
                    width:100%
                    p
                      color:rgb(147,153,159)
                      font-size :10px
                      margin-bottom:8px
                      &:last-child
                        margin-bottom:0px
                      &.name
                        color:rgb(7,17,27)
                        font-size :14px 
                      &.price
                          .nowPrice
                             color:rgb(240, 20, 20)
                             font-size :14px 
                             margin-right :8px
                          .oldPrice
                             color:rgb(147, 153, 159)
                             font-size :10px 
                             text-decoration:line-through
                    .control-wrap
                        position :absolute
                        right :0
                        bottom:-5px
                        z-index :10
</style>

