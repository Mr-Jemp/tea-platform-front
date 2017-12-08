<template>
  <div id="result">
    <!--头部搜索栏-->
    <header class="result-header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <div class="search">
        <router-link replace to="/search">
          <i class="search-icon"></i>
          <span class="placeholder">大家都在搜</span>
        </router-link>
      </div>
    </header>

    <nav class="nav">
      <ul class="clearfix">
        <li>
          <a :class="{'active':type==1}" @click="getPopularity">人气</a>
        </li>
        <li>
          <a :class="{'active':type==2}" @click="getSales">销量</a>
        </li>
        <li>
          <a :class="{'active':type==3}" @click="getPrice">
            <span>价格</span>
            <i class="icon-order"></i>
          </a>
        </li>
        <li>
          <a :class="{'active':type==4}" @click="filter=true;type=4">
            <span>筛选</span>
            <i class="icon-filter"></i>
          </a>
        </li>
      </ul>
    </nav>


    <section class="content">
      <ul class="shop-list clearfix">
        <li v-for="item in productList">
          <router-link :to="'/details?id='+item.id">
            <img :src="item.coverImg"/>
            <span class="shop-text">{{item.name}}</span>
            <span class="bottom">
              <span class="price">&yen;{{item.price}}</span><span class="integr">+300积分</span>
            </span>
          </router-link>
        </li>
      </ul>
    </section>

    <!--侧边筛选-->
    <transition name="slide-wrap">
      <aside @click="asideShow($event)" v-show="filter" class="aside">
        <transition name="slide">
          <div v-show="filter" class="wrap">
            <div class="title">价格区间</div>
            <div class="extent">
              <div class="min">
                <input v-model="lowPrice" type="text" placeholder="最低价">
              </div>
              <div class="line"></div>
              <div class="max">
                <input v-model="highPrice" type="text" placeholder="最高价">
              </div>
            </div>
          </div>
        </transition>
      </aside>
    </transition>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"
  import $ from "jquery"

  export default {
    data() {
      return {
        type: 1,
        filter: false,
        keyword: "",
        pageNo: 1,
        rows: 10,
        orderStatus: 1,
        lowPrice: "",
        highPrice: "",
        productList: [],
        clickNum: 0,
      }
    },
    watch: {
      orderStatus() {
        this.getSearchResult();
      },
      /*lowPrice(){
        this.getSearchResult();
      },
      highPrice(){
        this.getSearchResult();
      }*/
    },
    mounted() {
      this.getSearchResult();
    },
    methods: {
      /**
       * 侧边筛选
       * @param e
       */
      asideShow(e) {
        if ($(".aside")[0] === e.target) {
          this.filter = false;
          this.getSearchResult();
        }
      },
      /**
       * 获取搜索结果
       */
      getSearchResult() {
        let url = window.location.href;
        if(url.indexOf("?") !== -1){
          this.keyword = decodeURI(url.split("?")[1].split("=")[1]);
        }
        con.get("/api/product/search?pageNo=" + this.pageNo + "&rows=" + this.rows +
          "&orderStatus=" + this.orderStatus + "&lowPrice=" + this.lowPrice + "&highPrice=" +
          this.highPrice + "&keyword=" + this.keyword, (response) => {
          if (response.result === 1) {
            if (response.data.productList.length <= 0) {
              con.toast("抱歉，没有数据呢", "center")
            } else {
              this.productList = response.data.productList;
//              console.log(this.productList);
            }
          } else {
            con.toast(response.msg)
          }
        })
      },
      /**
       * 人气
       */
      getPopularity() {
        this.type = 1;
        this.orderStatus = 2;
      },
      /**
       * 销量
       */
      getSales() {
        this.type = 2;
        this.orderStatus = 1;
      },
      /**
       * 价格
       */
      getPrice() {
        this.type = 3;
        this.clickNum++;
        if (this.clickNum % 2 == 1) {
          this.orderStatus = 3;
          $('.icon-order').css("transform", "rotateX(180deg)");
        } else {
          this.orderStatus = 4;
          $('.icon-order').css("transform", "rotateX(0deg)");
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .slide-enter {
    opacity: 0;
    transform: translateX(8rem);
  }

  .slide-enter-active, .slide-leave-active {
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .slide-enter-to {
    opacity: 1;
  }

  .slide-leave {
    opacity: 1;
    transform: translateX(0);
  }

  .slide-leave-to {
    opacity: 0;
    transform: translateX(8rem);
  }

  .slide-wrap-enter {
    opacity: 0;
  }

  .slide-wrap-enter-active, .slide-wrap-leave-active {
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .slide-wrap-enter-to {
    opacity: 1;
  }

  .slide-wrap-leave {
    opacity: 1;
  }

  .slide-wrap-leave-to {
    opacity: 0;
  }

  #result {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;

    .result-header {
      width: 100%;
      height: 1.173333rem;
      background: #303030;
      padding: 0.213333rem 0.4rem;
      font-size: 0.346666rem;
      line-height: 1rem;

      .back-pre {
        display: inline-block;
        width: 0.24rem;
        height: 0.426666rem;
        background: url(../../assets/web/btn_arrow_back2.png) 0 0 no-repeat;
        background-size: cover;
        margin-right: 0.266666rem;
      }

      .search {
        width: 8.466666rem;
        height: 100%;
        display: inline-block;
        background: #fff;
        -webkit-border-radius: 0.746666rem;
        -moz-border-radius: 0.746666rem;
        border-radius: 0.746666rem;
        padding: 0 0.24rem 0rem;
        position: relative;
        a {
          display: flex;
          align-items: center;
          padding-top: 4/75rem;
        }
        .search-icon {
          display: inline-block;
          width: 0.48rem;
          height: 0.48rem;
          background: url(../../assets/web/icon_search2.png) 0 0 no-repeat;
          background-size: cover;
          margin-top: 0.1rem;
          margin-right: 0.266666rem;
        }
        .delete-icon {
          display: inline-block;
          width: 0.306666rem;
          height: 0.306666rem;
          background: url(../../assets/web/btn_clear2.png) 0 0 no-repeat;
          background-size: cover;
          position: absolute;
          right: 0.306666rem;
          top: 0;
          bottom: 0;
          margin: auto;
        }

        .placeholder {
          color: #999;
          padding-left: 20/75rem;
          font-size: 24/75rem;
          border-left: 1px solid #ccc;
          margin-top: 8/75rem;
        }
      }
    }
  }

  .nav {
    width: 100%;
    height: 1.066666rem;
    background: #fff;
    margin-bottom: 1px;

    ul {
      width: 100%;
      height: 100%;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;
      li {
        width: 2.493333rem;
        height: 100%;
        a {
          display: block;
          width: 100%;
          height: 100%;
          font-size: 0.4rem;
          text-align: center;
          line-height: 1.066666rem;
        }

        .icon-order {
          display: inline-block;
          width: 0.12rem;
          height: 0.213333rem;
          background: url(../../assets/web/arrow_order_descending.png) no-repeat 0 0;
          background-size: cover;
        }
        .icon-filter {
          display: inline-block;
          width: 0.333333rem;
          height: 0.32rem;
          background: url(../../assets/web/icon_filter.png) no-repeat 0 0;
          background-size: cover;
        }
        .active {
          color: #c63535;
        }
      }
    }

  }

  .content {
    width: 100%;

    .shop-list {
      width: 100%;

      li {
        float: left;
        width: 4.933333rem;
        height: 6.746666rem;
        background: #fff;
        margin: 0 0.133333rem 0.133333rem 0;
        position: relative;
        overflow: hidden;
        &:nth-of-type(even) {
          margin-right: 0;
        }

        > a {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
        }
        img {
          width: 4.933333rem;
          height: 4.933333rem;
        }

        .shop-text {
          display: block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.373333rem;
          color: #666;
          padding: 0.266666rem 0.133333rem;
        }

        .bottom {
          display: block;
          width: 100%;
          padding: 0.2rem 0.133333rem;
          font-size: 0.373333rem;
          .price, .integr {
            color: #c63535;
            font-weight: 600;
          }

        }

      }
    }
  }

  .aside {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    right: 0;

    .wrap {
      width: 8rem;
      height: 100%;
      background: #fff;
      position: absolute;
      top: 0;
      right: 0;

      .title {
        padding: 0.8rem 0.4rem;
        font-size: 0.4rem;
      }

      .extent {
        padding: 0 0.4rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;

        .min, .max {
          width: 2.666666rem;
          height: 0.933333rem;
          line-height: 0.933333rem;
          text-align: center;
          background: #e5e5e5;
          font-size: 0.346666rem;
          color: #999;
          input {
            width: 1.1rem;
            height: 100%;
          }
        }
        .line {
          width: 1.066666rem;
          height: 1px;
          background: #666;
          margin: 0 0.4rem;
        }
      }
    }
  }

</style>
