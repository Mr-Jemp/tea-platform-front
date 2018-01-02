<template>
  <div id="seckill">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">秒杀抢购</span>
    </header>

    <section class="content">
      <div class="no-content" v-if="!!productInfo.productList">暂无数据</div>

      <ul class="shop-list clearfix">
        <li v-for="item in productInfo.productList">
          <router-link :to="'/details?id='+item.id">
            <img :src="item.coverImg"/>
            <span class="shop-text">{{item.name}}</span>
            <span class="bottom clearfix">
        	    <span class="price">&yen;{{item.price}}</span>
        	    <a v-if="item.limitStartTime" class="btn">去看看</a>
        	    <a v-else class="btn">马上抢</a>
        	  </span>

            <!--倒计时-->
            <div v-if="item.limitStartTime" class="countdown">
              <span>距开始</span>
              <em>
                <span class="time">{{item.day}}</span> 天
                <span class="time">{{item.hour}}</span> :
                <span class="time">{{item.minute}}</span> :
                <span class="time">{{item.second}}</span>
              </em>
            </div>
          </router-link>
        </li>
      </ul>

    </section>


  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data() {
      return {
        productInfo: {},
      }
    },
    mounted() {
      this.getProductList();
    },
    methods: {
      getProductList() {
        con.get("/api/productType/list?type=1", (response) => {
          if (response.result === 1) {
            response.data.productList.map(function (product) {
              if(new Date(product.limitStartTime) - Date.now() < 0) {
                product.limitStartTime = "";
              } else {
                let time = new Date(product.limitStartTime) - Date.now();
                time /= 1000;
                let day = parseInt(time / 60 / 60 / 24);
                let hour = parseInt(time % (3600 * 24) / 3600);
                let minute = parseInt(time % 3600 / 60);
                let second = parseInt(time % 60);
                product.day = day;
                product.hour = hour;
                product.minute = minute;
                product.second = second;
                product.timer = setInterval(function () {
                  if(product.second > 0) {
                    product.second--;
                  } else {
                    if(product.minute > 0) {
                      product.second = 59;
                      product.minute--;
                    } else {
                      if(product.hour > 0) {
                        product.minute = 59;
                        product.hour--;
                      } else {
                        if(product.day > 0){
                          product.hour = 23;
                          product.day--;
                        }else{
                          clearInterval(product.timer);
                          product.limitStartTime = "";
                        }
                      }
                    }
                  }
                }, 1000);
              }
              return product;
            });
            this.productInfo = response.data;

          } else {
            con.toast(response.msg)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #seckill {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
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

          .price {
            float: left;
            font-size: 0.373333rem;
            color: #c63535;
            font-weight: 600;
          }
          .btn {
            float: right;
            font-size: 0.293333rem;
            color: #fff;
            width: 1.333333rem;
            height: 0.533333rem;
            text-align: center;
            background: #c63535;
            line-height: 0.533333rem;
            border-radius: 0.066666rem;
            -webkit-border-radius: 0.066666rem;
            margin-top: -4px;
          }
        }

        .countdown {
          width: 100%;
          height: 0.666666rem;
          background: rgba(0, 0, 0, .4);
          position: absolute;
          top: 4.266666rem;
          line-height: 0.666666rem;
          > span {
            color: #fff;
            font-size: 0.32rem;
            margin-left: 1rem;
          }

          em {
            font-style: normal;
            color: #fff;
            font-size: 0.293333rem;
            .time {
              display: inline-block;
              min-width: 0.426666rem;
              height: 0.426666rem;
              background: #fff;
              font-size: 0.293333rem;
              color: #333;
              text-align: center;
              line-height: 0.426666rem;
              border-radius: 3px;
              -webkit-border-radius: 3px;
            }
          }
        }

      }
    }
  }
  .no-content{
    text-align: center;
    padding-top: 2.66666667rem;
    font-size: 0.35rem;
    color: #333;
  }

</style>
