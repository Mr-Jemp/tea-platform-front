<template>
  <div id="details">
    <!--头部-->
    <header class="header-detail">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <ul class="head-nav">
        <li @click="getShop" :class="{'active':type == 1}">
          <a>商品</a>
        </li>
        <li @click="getDetail" :class="{'active':type == 2}">
          <a>详情</a>
        </li>
        <li @click="getEvaluate" :class="{'active':type == 3}">
          <a>评价</a>
        </li>
      </ul>
      <a @click="share=true">
        <i class="icon-share"></i>
      </a>
    </header>


    <section v-show="shop" class="content">
      <!--轮播图-->
      <div class="swiper-container banner-swiper">
        <div class="swiper-wrapper">
          <div v-for="item in imageList" class="swiper-slide">
            <router-link :to="'/details?id='+item.id"><img :src="item.image"></router-link>
          </div>
        </div>
        <!--<div class="amount">-->
        <!--<span class="num-1">1</span>/<span class="num-2">5</span>-->
        <!--</div>-->
        <div class="swiper-pagination"></div>
      </div>


      <ul class="shop-info">
        <li>
          <p class="text">{{shopInfo.name}}</p>
        </li>
        <li>
          <span class="price">&yen;{{shopInfo.preferentialPrice}}</span>
          <span class="original">&yen;{{shopInfo.price}}</span>
        </li>
        <li>
          <p class="express">快递费：￥{{shopInfo.fee}}.00或{{shopInfo.discount}}积分(满{{shopInfo.feeReachFree}}元免邮)</p>
        </li>
      </ul>

      <!--选择产品类型-->
      <div class="shop-type clearfix">
        <a @click="selectType">
          <span class="left-text">选择产品类型</span>
          <i class="icon-right"></i>
        </a>
      </div>
    </section>

    <section v-show="detail" class="detail-wrap">
      <!--商品详情-->
      <div class="shop-detail">
        <h3 class="caption">商品详情</h3>
        <!--<ul class="detail-list">
          <li>生产许可证编号：SC11432010400101</li>
          <li>产品标准号：GB/T14456.2-2008</li>
          <li>配料表：茶鲜叶</li>
          <li>储藏方法：密封、干燥、防潮、低温</li>
          <li>保质期：540 天</li>
          <li>食品添加剂：无</li>
          <li>净含量: 250g（125g*2）</li>
          <li>包装方式: 包装</li>
          <li>包装种类: 罐装</li>
          <li>品牌: 秦府茶行</li>
          <li>系列: 0001</li>
          <li>食品工艺: 炒青绿茶</li>
          <li>采摘时间: 明前</li>
        </ul>
        <router-link class="detail-img" to="/">
          <img src="../../assets/web/detail_img2.png"/>
        </router-link>-->
        <div v-html="details">{{details}}</div>
      </div>
    </section>

    <section v-show="evaluate" class="evaluate-wrap">
      <!--评价-->
      <div class="evaluate">
        <h3 class="caption">评价</h3>
        <div v-for="item in evaluateList" v-show="evaluateList.length != 0" class="user-evaluate">
          <div class="one clearfix">
            <div class="left">
              <img class="head" :src="item.headerImg"/>
              <span class="user-name">{{item.nickname}}</span>
            </div>
            <div class="right">
              <span class="date">{{item.createTime}}</span>
            </div>
          </div>
          <div class="two">{{item.content}}</div>
          <div class="three">
            <img v-for="srcIndex in item.src.split(',')" :src="srcIndex" alt=""/>
            <!--<img src="../../assets/web/user_img.png" alt="" />-->
          </div>
        </div>
        <div v-show="evaluateList.length == 0" class="not-evaluate">暂无评价</div>
      </div>
    </section>

    <div class="foot-nav">
      <ul>
        <li>
          <router-link to="">
            <i class="icon-server"></i>
            <span class="contact-ser">联系客服</span>
          </router-link>
        </li>
        <li>
          <a @click="buy">加入购物车</a>
        </li>
        <li>
          <a @click="buy">立即购买</a>
        </li>
      </ul>
    </div>

    <!--弹出框-->
    <transition name="shade-wrap">
      <footer v-show="share" class="footer">
        <!--分享-->
        <transition name="slide1">
          <div v-show="share" class="share">
            <h3 class="caption">分享到</h3>
            <ul class="share-list">
              <li>
                <router-link to="">
                  <i><img class="weibo" src="../../assets/web/icon_share_weibo.png"/></i>
                  <span class="text">新浪微博</span>
                </router-link>
              </li>
              <li>
                <router-link to="">
                  <i><img class="friend" src="../../assets/web/icon_share_friends.png"/></i>
                  <span class="text">朋友圈</span>
                </router-link>
              </li>
              <li>
                <router-link to="">
                  <i><img class="qq" src="../../assets/web/icon_share_qq.png"/></i>
                  <span class="text">QQ</span>
                </router-link>
              </li>
              <li>
                <router-link to="">
                  <i><img class="weichat" src="../../assets/web/icon_share_wechat.png"/></i>
                  <span class="text">新浪微博</span>
                </router-link>
              </li>
            </ul>
            <div @click="share=false" class="btn">取消</div>
          </div>
        </transition>
      </footer>
    </transition>

    <transition name="shade-wrap-2">
      <div @click="cancal($event)" v-show="argument" class="footer-2">
        <transition name="slide2">
          <!--选择参数-->
          <div v-show="argument" class="arguments">
            <div class="one">
              <div class="shop-img">
                <img :src="shopInfo.coverImg" alt=""/>
              </div>
              <ul class="shop-info">
                <li class="price">&yen;{{shopInfo.preferentialPrice}}</li>
                <li class="repertory">库存：{{this.quantityShow}}件</li>
                <li id="select" class="select">请选择 规格</li>
              </ul>
            </div>

            <div class="two">
              <!--茶叶-->
              <!--<div class="tea">-->
              <!--<div class="caption">规格</div>-->
              <!--<ul class="sort-list clearfix">-->
              <!--<li>乐品乐茶碧螺春</li>-->
              <!--</ul>-->
              <!--</div>-->

              <!--&lt;!&ndash;茶具&ndash;&gt;-->
              <!--<div class="tea-things">-->
              <!--<div class="caption">颜色分类</div>-->
              <!--<ul class="sort-list clearfix">-->
              <!--<li class="active">红紫砂咖啡色</li>-->
              <!--<li>七彩咖啡色祥云</li>-->
              <!--<li>孔雀绿咖啡色祥云</li>-->
              <!--<li>孔雀绿立体盘龙</li>-->
              <!--<li>孔雀绿立体盘龙</li>-->
              <!--<li>七彩咖啡色祥云</li>-->
              <!--<li>孔雀绿咖啡色祥云</li>-->
              <!--<li>孔雀绿立体盘龙</li>-->
              <!--</ul>-->
              <!--</div>-->

              <!--服装-->
              <div class="clothing">
                <div class="caption">分类</div>
                <ul class="sort-list clearfix">
                  <li v-for="sort in firstList" @click="getSecondList($event,sort.secondType)">{{sort.secondType}}</li>
                </ul>
                <div v-if="false" class="three-list">
                  <div class="caption margin-top">尺码</div>
                  <ul class="sort-list clearfix">
                    <li class="active">S</li>
                    <li>M</li>
                    <li>L</li>
                    <li>XL</li>
                    <li>XXL</li>
                  </ul>
                </div>
              </div>

            </div>

            <div class="three clearfix">
              <div class="left">购买数量</div>
              <div class="right">
                <span @click="minusCount" class="minus">-</span>
                <span class="num">{{buyCount}}</span>
                <span @click="addCount" class="add">+</span>
              </div>
            </div>

            <div class="btn clearfix">
              <div @click="addToCar" class="add-car">加入购物车</div>
              <div class="buy">
                <a @click="purchaseNow" v-if="isLogin == true">立即购买</a>
                <a v-else @click="goBuy">立即购买</a>
              </div>
            </div>

          </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.min.css'
  import {con} from "../../assets/js/common"
  import $ from "jquery"


  export default {
    name: 'details',
    data() {
      return {
        isLogin: false,
        imageList: [],//轮播图
        type: 1,
        share: false,
        argument: false,
        details: "",
        shopInfo: {//商品信息
          name: "",
          preferentialPrice: "",
          price: "",
          fee: "",
          discount: "",
          feeReachFree: "",
          coverImg: "",
        },
        //一级列表
        firstList: [],
        //二级列表
        secondList: [],
        //库存
        quantityShow: "",
        //一级分类id
        firstId: "",
        //规格
        firstStand: "",
        firstStandId: "",
        secondStand: "",
        //购买数量
        buyCount: 1,
        //评价列表
        evaluateList: [],
        evaluateSrc: [],
        //导航切换
        shop: true,
        detail: false,
        evaluate: false,
        pid: "",
      }
    },
    watch: {
      firstStand(newVal, oldVal) {
        if (newVal !== oldVal) {
          $("#select").html("已选择 " + newVal);
        }
      },
      secondStand(newVal, oldVal) {
        if (newVal !== oldVal) {
          $("#select").html("已选择 " + this.firstStand + " " + newVal);
        }
      }
    },
    mounted() {
      this.getLoginStatus();
      this.getShopDetail();
    },
    methods: {
      getLoginStatus() {
        con.get("/api/my/index", (response) => {
          if (response.result === 1) {
            this.isLogin = true;
          } else {
            this.isLogin = false;
          }
        })
      },
      getShop() {
        this.type = 1;
        this.shop = true;
        this.detail = false;
        this.evaluate = false;
      },
      getDetail() {
        this.type = 2;
        this.shop = false;
        this.detail = true;
        this.evaluate = false;
      },
      /**
       * 获取评价
       */
      getEvaluate() {
        this.type = 3;
        this.shop = false;
        this.detail = false;
        this.evaluate = true;
        let url = location.href;
        if (url.indexOf("?") !== -1) {
          let id = url.split("?")[1].split("=")[1];
          con.get("/api/comment/product/list?id=" + id, (response) => {
            if (response.result === 1) {
              this.evaluateList = response.data.commentProductList;
            } else {
              con.toast(response.msg)
            }
          })
        }
      },
      /**
       * 商品轮播
       */
      getSwiper() {
        new Swiper('.banner-swiper', {
          pagination: '.swiper-pagination',
          paginationType: 'fraction',
          loop: false,
        });
      },
      /**
       * 获取商品信息
       */
      getShopDetail() {
        let url = window.location.href;
        if (url.indexOf("?") !== -1) {
          let id = url.split("?")[1].split("=")[1];
          this.pid = id;
          con.get("/api/product/detail?id=" + id, (response) => {
            if (response.result === 1) {
//              console.log(response.data)
              this.details = response.data.detail;
              this.imageList = response.data.imageList;
              this.shopInfo.name = response.data.name;
              this.shopInfo.preferentialPrice = response.data.preferentialPrice;
              this.shopInfo.price = response.data.price;
              this.shopInfo.fee = response.data.expressFee.fee;
              this.shopInfo.discount = response.data.expressFee.discount;
              this.shopInfo.feeReachFree = response.data.expressFee.feeReachFree;
              this.shopInfo.coverImg = response.data.coverImg;
              this.firstList = response.data.allSecondTypes;
              setTimeout(() => {
                this.getSwiper();
              }, 200);
            } else {
              con.toast(response.msg)
            }
          })
        }
      },
      /**
       * 选择商品规格
       */
      selectType() {
        this.argument = true;
      },
      cancal(e) {
        if ($(".footer-2")[0] === e.target) {
          this.argument = false;
        }
      },
      /**
       * 获取二级列表
       * @param secondType
       */
      getSecondList(e, secondType) {
        this.firstStand = secondType;
        $(e.target).addClass("active").siblings().removeClass("active");
        let url = window.location.href;
        if (url.indexOf("?") !== -1) {
          let id = url.split("?")[1].split("=")[1];
          con.get("/api/product/standard?id=" + id + "&secondType=" + secondType, (response) => {
            if (response.result === 1) {
//              console.log(response.data)
              this.secondList = response.data.secondTypes[0].warehouses;
              this.quantityShow = response.data.secondTypes[0].quantityShow;
              this.firstId = response.data.secondTypes[0].id;
//            if(this.secondList.length !== 0){//服装
//              this.firstStand = secondType;
//              this.secondStand = secondType;
//            }
            } else {
              con.toast(response.msg);
            }
          })
        }
      },
      addCount() {
        if (this.buyCount < this.quantityShow) {
          this.buyCount++;
        } else {
          con.toast("库存不足")
        }
      },
      minusCount() {
        if (this.buyCount > 1) {
          this.buyCount--;
        } else {
          con.toast("亲，至少购买一件吧")
        }
      },
      buy() {
        con.toast("请选择产品类型", "center");
        this.argument = true;
      },
      /**
       * 加入购物车
       */
      addToCar() {
        if (this.isLogin) {
          if (this.firstStand) {
            if(this.quantityShow > 0){
              let shopCar = {
                id: this.firstId,
                src: this.shopInfo.coverImg,
                name: this.shopInfo.name,
                original: this.shopInfo.preferentialPrice,
                price: this.shopInfo.price,
                count: this.buyCount,
                firstStand: this.firstStand,
                pid: this.pid,
                fee: this.shopInfo.fee,
              };
              con.addgood(shopCar.id, shopCar.src, shopCar.name, shopCar.original, shopCar.price, shopCar.count, shopCar.firstStand, shopCar.pid, this.shopInfo.fee);
              con.toast("添加购物车成功");
            }else{
              con.toast("库存不足,去看看其他商品吧");
            }
          } else {
            con.toast("请选择商品规格");
          }
        } else {
          con.toast("未登录，请先登录");
          setTimeout(() => {
            this.$router.replace("/login");
          }, 1000)
        }
      },
      /**
       * 立即购买
       */
      purchaseNow() {
        if (this.firstStand) {
          if(this.quantityShow > 0){
            this.$router.push("/confirm_order?id=" + this.firstId + "&count=" + this.buyCount + "&name=" + this.shopInfo.name
              + "&firstStand=" + this.firstStand + "&firstStandId=" + this.firstId + "&repertory=" + this.quantityShow + "&original="
              + this.shopInfo.price + "&price=" + this.shopInfo.preferentialPrice + "&pid=" + this.pid);
          }else{
            con.toast("库存不足,去看看其他商品吧");
          }
        }else{
          con.toast("请选择商品规格");
        }
      },
      goBuy() {
        con.toast("未登录，请先登录");
        setTimeout(() => {
          this.$router.replace("/login");
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="less">
  .slide1-enter, .slide2-enter {
    opacity: 0;
    transform: translateY(417px);
  }

  .slide1-enter-active, .slide1-leave-active, .slide2-enter-active, .slide2-leave-active {
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .slide1-enter-to, .slide2-enter-to {
    opacity: 1;
  }

  .slide1-leave, .slide2-leave {
    opacity: 1;
    transform: translateY(0);
  }

  .slide1-leave-to, .slide2-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }

  .shade-wrap-enter, .shade-wrap-2-enter {
    opacity: 0;
  }

  .shade-wrap-enter-active, .shade-wrap-leave-active, .shade-wrap-2-enter-active, .shade-wrap-2-leave-active {
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .shade-wrap-enter-to, .shade-wrap-2-enter-to {
    opacity: 1;
  }

  .shade-wrap-leave, .shade-wrap-2-leave {
    opacity: 1;
  }

  .shade-wrap-leave-to {
    opacity: 0;
  }

  #details {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;

    .header-detail {
      width: 100%;
      height: 1.173333rem;
      background: #303030;
      padding: 0.213333rem 0.4rem;
      position: relative;
      a {
        display: inline-block;
        width: 1.2rem;
        height: 100%;
      }
      .back-pre {
        display: inline-block;
        width: 0.24rem;
        height: 0.426666rem;
        background: url(../../assets/web/btn_arrow_back2.png) 0 0 no-repeat;
        background-size: cover;
        margin-top: 0.133333rem;
        margin-right: 0.266666rem;
        position: absolute;
        left: 0.4rem;
        top: 0.266666rem;
      }

      .head-nav {
        width: 4.266666rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        left: 2.8rem;
        top: 0;
        li {
          height: 100%;
          a {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 1.173333rem;
            font-size: 0.453333rem;
            color: #fff;
          }
          &.active {
            border-bottom: 3px solid #f24545;
          }
        }
      }
      .icon-share {
        display: inline-block;
        width: 0.533333rem;
        height: 0.533333rem;
        background: url(../../assets/web/icon_share.png) no-repeat 0 0;
        background-size: cover;
        position: absolute;
        right: 0.4rem;
        top: 0.333333rem;
      }

    }
  }

  .content {
    padding-bottom: 1.16rem;
    .banner-swiper {
      width: 100%;
      height: 10rem;
      position: relative;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        height: 10rem;
      }
      .swiper-pagination {
        width: 0.933333rem !important;
        height: 0.933333rem !important;
        left: 8.9rem;
        bottom: 0.133333rem !important;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        background: rgba(0, 0, 0, .3);
        position: absolute;
        right: 0.4rem;
        bottom: 0.133333rem;
        z-index: 999;
        text-align: center;
        color: #fff;
        font-size: 0.346666rem;
        line-height: 0.933333rem;
      }
      /*.amount{
        width: 0.933333rem;
        height: 0.933333rem;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        background: rgba(0,0,0,.3);
        position: absolute;
        right: 0.4rem;
        bottom: 0.133333rem;
        z-index: 999;
        text-align: center;
        color: #fff;
        font-size: 0.346666rem;
        line-height: 0.933333rem;
        .num-1{
          font-size: 0.426666rem;
        }
      }*/
    }

    .caption {
      font-size: 0.4rem;
      padding: 0.4rem 0;
      color: #333;
    }

    .shop-info {
      width: 100%;
      min-height: 2.586666rem;
      background: #fff;
      padding: 0 0.4rem;

      li {
        .text {
          font-size: 0.346666rem;
          color: #333;
          line-height: 0.5rem;
          padding: 0.333333rem 0;
        }

        .price {
          font-size: 0.4rem;
          color: #c63535;
        }
        .original {
          font-size: 0.32rem;
          color: #999;
          text-decoration: line-through;
          margin-left: 0.266666rem;
        }
        .express {
          font-size: 0.32rem;
          color: #666;
          padding: 0.2rem 0;
        }
      }
    }

    .shop-type {
      width: 100%;
      height: 1.066666rem;
      background: #fff;
      margin: 0.266666rem 0;

      a {
        display: block;
        width: 100%;
        height: 100%;
      }

      .left-text {
        float: left;
        height: 100%;
        line-height: 1.066666rem;
        margin-left: 0.4rem;
      }

      .icon-right {
        float: right;
        width: 0.173333rem;
        height: 0.293333rem;
        background: url(../../assets/web/btn_arrow_back-.png) 0 0 no-repeat;
        background-size: cover;
        margin-top: 0.4rem;
        margin-right: 0.4rem;
      }
    }
  }

  .detail-wrap {
    .shop-detail {
      width: 100%;
      min-height: 13.666666rem;
      background: #fff;
      padding: 0 0.4rem;
      .caption {
        font-size: 0.4rem;
        padding: 0.4rem 0;
        color: #333;
      }
      .detail-list {

        li {
          font-size: 0.346666rem;
          color: #333;
          padding-bottom: 0.133333rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .detail-img {
        display: block;
        width: 9.2rem;
        height: 5.6rem;
        margin-top: 0.4rem;
        img {
          width: 100%;
        }
      }
    }
  }

  .evaluate-wrap {
    /*min-height: 15.333333rem;*/
    .evaluate {
      width: 100%;
      background: #fff;
      padding: 0 0.4rem;
      .caption {
        font-size: 0.4rem;
        padding: 0.4rem 0;
        color: #333;
        border-bottom: 1px solid #e5e5e5;
      }
      .not-evaluate {
        padding: 0.3rem 0;
        font-size: 28/75rem;
        color: #666;
      }

      .user-evaluate {
        width: 100%;
        padding: 0.4rem 0;
        border-bottom: 1px solid #e5e5e5;
        .one {
          .left {
            float: left;
            display: flex;
            display: -webkit-flex;
            align-items: center;

            img.head {
              width: 0.666666rem;
              height: 0.666666rem;
            }
            .user-name {
              font-size: 0.346666rem;
              color: #333;
              margin-left: 0.133333rem;
            }
          }
          .right {
            float: right;
            .date {
              font-size: 0.266666rem;
              color: #999;
            }
          }
        }

        .two {
          font-size: 0.32rem;
          line-height: 0.4rem;
          color: #333;
          padding: 0.266666rem 0;
        }

        .three {
          img {
            width: 2.133333rem;
            height: 2.133333rem;
            margin-right: 0.266666rem;
          }
        }
      }

    }

  }

  /*商品详情页底部导航按钮*/
  .foot-nav {
    width: 100%;
    height: 1.173333rem;
    position: fixed;
    left: 0;
    bottom: 0;
    border-top: 1px solid #e5e5e5;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      li {
        width: 3.333333rem;
        height: 100%;
        a {
          display: block;
          width: 100%;
          height: 100%;
          text-align: center;
          .icon-server {
            display: inline-block;
            width: 0.586666rem;
            height: 0.533333rem;
            background: url(../../assets/web/icon_service.png) no-repeat 0 0;
            background-size: cover;
          }
          .contact-ser {
            display: block;
            font-size: 0.266666rem;
            color: #333;
          }
        }
        &:nth-of-type(1) {
          padding-top: 0.066666rem;
          border-right: 1px solid #e5e5e5;
        }
        &:nth-of-type(2), &:nth-of-type(3) {
          a {
            font-size: 0.346666rem;
            line-height: 1.173333rem;
          }
        }
        &:nth-of-type(3) {
          background: #C63535;
          a {
            color: #fff;
          }
        }
      }
    }
  }

  /*弹出框*/
  .footer {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6666;

    /*公共*/
    .btn {
      width: 100%;
      height: 1.173333rem;
      position: absolute;
      left: 0;
      bottom: 0;
      border-top: 1px solid #e5e5e5;
      .add-car, .buy {
        width: 50%;
        height: 100%;
        line-height: 1.173333rem;
        text-align: center;
      }
      .add-car {
        float: left;
      }
      .buy {
        float: right;
        a {
          display: block;
          width: 100%;
          height: 100%;
          background: #C63535;
          color: #fff;
          line-height: 1.173333rem;
        }
      }
    }

    /*分享*/
    .share {
      width: 100%;
      height: 5.56rem;
      background: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      border-top-left-radius: 0.133333rem;
      -webkit-border-top-left-radius: 0.133333rem;
      border-top-right-radius: 0.133333rem;
      -webkit-border-top-right-radius: 0.133333rem;
      display: block;
      .caption {
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        color: #333;
        font-size: 0.4rem;
        border-bottom: 1px solid #e5e5e5;
      }
      .btn {
        background: #c63535;
        font-size: 30/75rem;
        color: #fff;
        text-align: center;
        line-height: 1.173333rem;
      }
      .share-list {
        width: 100%;
        height: 3.2rem;
        padding: 0 0.746666rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: space-between;
        li {
          /*background: red;*/
          padding-top: 0.266666rem;
          a {
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            i {
              display: inline-block;
              width: 1.8rem;
              height: 1.8rem;
              border: 1px solid #e5e5e5;
              border-radius: 0.4rem;
              position: relative;
            }
            .text {
              display: block;
              font-size: 0.346666rem;
              padding: 0.266666rem 0;
              color: #666;
            }
            .weibo, .friend, .qq, .weichat {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
            }
            .weibo {
              width: 0.973333rem;
              height: 0.84rem;
            }
            .friend {
              width: 0.866666rem;
              height: 0.853333rem;
            }
            .qq {
              width: 0.733333rem;
              height: 0.866666rem;
            }
            .weichat {
              width: 0.986666rem;
              height: 0.8rem;
            }

          }
        }
      }

    }

  }

  .footer-2 {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 666;

    /*公共*/
    .btn {
      width: 100%;
      height: 1.173333rem;
      position: absolute;
      left: 0;
      bottom: 0;
      border-top: 1px solid #e5e5e5;
      .add-car, .buy {
        width: 50%;
        height: 100%;
        line-height: 1.173333rem;
        text-align: center;
      }
      .add-car {
        float: left;
      }
      .buy {
        float: right;
        a {
          display: block;
          width: 100%;
          height: 100%;
          background: #C63535;
          color: #fff;
          line-height: 1.173333rem;
        }
      }
    }

    /*选择参数*/
    .arguments {
      width: 100%;
      height: 12rem;
      background: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      .one {
        width: 100%;
        height: 2.666666rem;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        .shop-img {
          width: 2.666666rem;
          height: 2.666666rem;
          /*border: 1px solid #e5e5e5;*/
          border-radius: 0.2rem;
          -webkit-border-radius: 0.2rem;
          position: absolute;
          left: 0.4rem;
          bottom: 0.4rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .shop-info {
          position: absolute;
          left: 3.533333rem;
          .price {
            font-size: 0.4rem;
            color: #c63535;
            font-weight: 600;
            padding-top: 0.533333rem;
          }
          .repertory, .select {
            font-size: 0.32rem;
            color: #333;
            padding-top: 0.266666rem;
          }
        }
      }
      .two {
        width: 100%;
        min-height: 2.8rem;
        border-bottom: 1px solid #e5e5e5;
        padding: 0 0.4rem;

        .caption {
          padding-top: 0.44rem;
          font-size: 0.373333rem;
          color: #333;
          font-weight: 600;

          &.margin-top {
            margin-top: -0.533333rem;
          }
        }
        .sort-list {
          width: 8rem;
          padding: 0.666666rem 0 0.266666rem 0;
          li {
            min-width: 1.04rem;
            text-align: center;
            float: left;
            font-size: 0.346666rem;
            border: 1px solid #e5e5e5;
            padding: 0.133333rem 0.266666rem;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            margin-right: 0.4rem;
            margin-bottom: 0.4rem;

            &.active {
              color: #fff;
              background: #C63535;
            }
          }
        }
        .tea {
          display: none;
        }
        .tea-things {
          display: none;
        }
        .clothing {
          /*padding-bottom: 0.4rem;*/
        }
      }
      .three {
        width: 100%;
        padding: 0 0.4rem;
        .left {
          float: left;
          font-size: 0.373333rem;
          color: #333;
          margin-top: 0.533333rem;
        }
        .right {
          float: right;
          margin-top: 0.4rem;
          .minus, .add {
            display: inline-block;
            width: 0.586666rem;
            height: 0.586666rem;
            line-height: 0.586666rem;
            text-align: center;
            color: #fff;
            background: #ccc4a6;
            border-radius: 0.066666rem;
            -webkit-border-radius: 0.066666rem;
          }
          .num {
            font-size: 0.346666rem;
            color: #333;
            margin: 0 0.4rem;
          }
        }
      }

    }
  }
</style>
