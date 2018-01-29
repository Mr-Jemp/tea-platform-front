<template>
  <div id="home">
    <!--头部搜索栏-->
    <header class="header">
      <div class="search">
        <router-link replace to="/search">
          <i></i><span class="placeholder">大家都在搜</span>
        </router-link>
      </div>
    </header>

    <!--轮播图-->
    <div class="swiper-container banner-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in bannerList">
          <a v-if="item.type == 1" :href="item.url"><img :src="item.coverImage" :title="item.name" :alt="item.name"></a>
          <router-link v-else-if="item.type == 2" :to="'/details?id='+item.url"><img :src="item.coverImage"
                                                                                     :title="item.name"
                                                                                     :alt="item.name"></router-link>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

    <!--订单-->
    <div class="order">
      <div class="order-inner">
        <span class="text1">订单</span>
        <span class="text2">最新订单</span>
        <div class="swiper-container order-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in orderrolls">
              <span>用户： {{item.city}}  {{item.nickname}} 下单成功</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--商品分类-->
    <div class="shop-type">

      <ul class="type1">
        <li v-for="(item,index) in fathterCatagory">
          <router-link :to="'/shop?type='+index">
            <span>{{item.catagory}}</span>
            <img :src="item.catagoryImage">
          </router-link>
        </li>
      </ul>

      <ul class="type2">
        <li>
          <router-link to="/seckill">
            <i class="icon1"></i><span>限时抢购</span>
          </router-link>
        </li>
        <li>
          <router-link :to="'/details?id='+newId">
            <i class="icon2"></i><span>新品上市</span>
          </router-link>
        </li>
        <li>
          <router-link to="/integral">
            <i class="icon3"></i><span>积分商品</span>
          </router-link>
        </li>
        <li>
          <router-link to="/video">
            <i class="icon4"></i><span>视频直播</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!--热门商品区域-->
    <div class="hot">
      <ul>
        <li>
          <router-link :to="'/details?id=' + hot.url">
            <i class="hot-icon"></i>
            <img :src="hot.coverImage">
          </router-link>
        </li>
      </ul>
    </div>

    <ul class="list clearfix"
        v-infinite-scroll="getData"
        :infinite-scroll-disabled="loading"
        infinite-scroll-distance="0">
      <li class="item" v-for="item in recommendList">
        <router-link :to="'/details?id='+item.id">
          <img :src="item.coverImg"/>
          <span class="text-info">{{item.name}}</span>
          <span class="price">&yen; {{item.price}}</span>
        </router-link>
      </li>
    </ul>

    <!--底部导航栏-->
    <my-nav :current="0"></my-nav>
  </div>
</template>

<script>
  import {con} from '../../assets/js/common'

  let self,swiper1, swiper2;
  export default {
    name: 'home',
    data() {
      return {
        bannerList: [],
        fathterCatagory: [],
        newId: "",
        orderrolls: [],
        hot: {},
        recommendList: [],
        loading: false
      }
    },
    created(){
      this.pageNo = 1;
      self = this;
    },
    mounted() {
      // self = this;
      // console.log(self);
      //初始化轮播图
      self.initSwiper();

      //请求首页数据
      // self.getData();

    },
    methods: {
      /**
       * 初始化轮播图
       */
      initSwiper() {
        swiper1 = new Swiper('.banner-swiper', {
          loop: true,
          autoplay: 5000,
          pagination: '.swiper-pagination',
          autoplayDisableOnInteraction: false
        });
        swiper2 = new Swiper('.order-swiper', {
          direction: 'vertical',
          loop: true,
          autoplay: 5000,
          autoplayDisableOnInteraction: false
        });
      },

      /**
       * 获取首页数据
       */
      getData() {

        if(this.loading) {
          return;
        }
        this.loading = true;
        con.get("/api/index/home?rows=4&pageNo=" + this.pageNo, function (response) {
          if (response.result === 1) {
            if(self.pageNo === 1) {
              self.bannerList = response.data.bannerList;
              self.fathterCatagory = response.data.fathterCatagory;
              self.newId = response.data.newId;
              self.orderrolls = response.data.orderrolls;
              self.hot = response.data.hot;
              setTimeout(() => {
                swiper1.update();
                swiper2.update();
              }, 0);
            }
            if(response.data.recommendList.length > 0) {
              self.recommendList = self.recommendList.concat(response.data.recommendList);
              self.pageNo++;
              self.loading = false;
            }
          } else {
            con.toast(response.msg);
          }
        });
      }
    }
  }
</script>

<style scoped lang="less">

  @import "./../../assets/css/reset";

  #home {
    padding-bottom: 98/75rem;
  }

  .header {
    padding: 16/75rem 30/75rem;
    height: 88/75rem;
    background-color: #303030;
    .search {
      height: 100%;
      /*line-height: 100%;*/
      background-color: #444444;
      -webkit-border-radius: 56/75rem;
      -moz-border-radius: 56/75rem;
      border-radius: 56/75rem;
      a {
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 80/75rem;
      }
      i {
        display: block;
        width: 36/75rem;
        height: 36/75rem;
        background: url(./../../assets/web/icon_search.png) 0 0 no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }
      .placeholder {
        color: #999;
        padding-left: 20/75rem;
        font-size: 24/75rem;
        border-left: 1px solid #999;
        margin-left: 20/75rem;
        margin-top: 8/75rem;
      }
    }

  }

  .banner-swiper {
    width: 100%;
    height: 386/75rem;
    .swiper-slide {
      height: 386/75rem;

      a {
        display: block;
        height: 100%;

        img {
          display: block;
          width: 100%;
        }
      }
    }
    .swiper-pagination-bullets {
      bottom: 13/75rem;
      .swiper-pagination-bullet {
        background: #ffffff;
        width: 14/75rem;
        height: 14/75rem;
      }
      .swiper-pagination-bullet-active {
        background: #e70015;
      }
    }

  }

  .order {
    height: 80/75rem;
    background-color: #f5f5f5;
    padding: 16/75rem 30/75rem;
    .order-inner {
      height: 48/75rem;
      background-color: #fff;
      -webkit-border-radius: 24/75rem;
      -moz-border-radius: 24/75rem;
      border-radius: 24/75rem;
      padding: 0 40/75rem;
      display: flex;
      align-items: center;

      .text1 {
        font-size: 26/75rem;
        color: #c63535;
        font-style: italic;
        font-weight: bold;
        font-family: PingFang, serif;
        padding-right: 20/75rem;
        border-right: 1px solid #c63535;
      }
      .text2 {
        margin-left: 20/75rem;
        border: 1px solid #c63535;
        height: 30/75rem;
        line-height: 30/75rem;
        padding: 0 14/75rem;
        -webkit-border-radius: 15/75rem;
        -moz-border-radius: 15/75rem;
        border-radius: 15/75rem;
        color: #c63535;
        font-size: 18/75rem;
        margin-right: 32/75rem;
      }

      .order-swiper {
        flex: 1;
        font-size: 22/75rem;
        color: #333333;
        text-align: left;
        height: 0.64rem;

        .swiper-slide {
          line-height: 0.64rem;
          height: 0.64rem;
          .text-hidden;
        }
      }
    }
  }

  .shop-type {
    background-color: #f5f5f5;
    padding-bottom: 16/75rem;

    .type1 {
      height: 199/75rem;
      display: flex;
      margin-bottom: 3px;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        flex: 1;
        width: 244/75rem;
        margin-right: 4px;
        background-color: #fff;

        &:last-of-type {
          margin-right: 0;
        }
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100%;
          span {
            font-size: 24/75rem;
            color: #333333;
          }
          img {
            width: 204/75rem;
            height: 106/75rem;
          }
        }
      }
    }
    .type2 {
      height: 150/75rem;
      display: flex;
      li {
        flex: 1;
        margin-right: 2px;
        background-color: #fff;

        &:last-of-type {
          margin-right: 0;
        }

        a {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          align-items: center;

          i {
            margin-bottom: 20/75rem;
            background: no-repeat 0 0;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;

            &.icon1 {
              width: 43/75rem;
              height: 48/75rem;
              background-image: url(../../assets/web/icon_flash_sale.png);
            }

            &.icon2 {
              width: 46/75rem;
              height: 48/75rem;
              background-image: url(../../assets/web/icon_new_arrival.png);
            }

            &.icon3 {
              width: 44/75rem;
              height: 48/75rem;
              background-image: url(../../assets/web/icon_integral_goods.png);
            }

            &.icon4 {
              width: 46/75rem;
              height: 48/75rem;
              background-image: url(../../assets/web/icon_live_video1.png);
            }

          }

          span {
            font-size: 24/75rem;
            color: #333333;
          }
        }
      }
    }
  }

  .hot {
    li {
      a {
        display: block;
        height: 100%;
        position: relative;
        .hot-icon {
          position: absolute;
          top: 0;
          left: 0;
          width: 96/75rem;
          height: 96/75rem;
          background: url(../../assets/web/img_hot_sell.png) 0 0 no-repeat;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
        }

        img {
          width: 100%;
        }
      }
    }
  }

  .list {
    padding-top: 10/75rem;
    background-color: #f5f5f5;
    .item {
      float: left;
      width: 4.933333rem;
      min-height: 6.493333rem;
      background: #fff;
      font-size: 0.373333rem;
      margin-right: 0.133333rem;
      margin-bottom: 0.133333rem;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }

      img {
        width: 4.933333rem;
        height: 4.933333rem;
      }

      .text-info {
        display: block;
        padding: 0.2rem 0.133333rem;
        color: #666;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .price {
        display: block;
        color: #c63535;
        padding: 0px 0.133333rem;
        font-weight: 600;
      }
    }
    .item:nth-of-type(even) {
      margin-right: 0;
    }
  }
</style>
