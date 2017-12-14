<template>
  <div id="order-detail">
    <!--头部-->
    <header class="header">
      <router-link to="/my_order?type=1">
        <i class="back-pre"></i>
      </router-link>
      <span class="title">订单详情</span>
    </header>

    <div v-if="payStatus == 0" class="status">未支付</div>
    <div v-if="payStatus == 1" class="status">已支付</div>
    <div v-if="payStatus == 2" class="status">已发货</div>
    <div v-if="payStatus == 3" class="status">已收货</div>
    <div v-if="payStatus == 4" class="status">取消订单</div>
    <div v-if="payStatus == 5" class="status">申请退款</div>
    <div v-if="payStatus == 6" class="status">交易关闭</div>

    <div class="address">
      <div class="one">
        <i></i>
        <span class="name">{{orderAddress.linkman}}</span>
        <span class="phone">{{orderAddress.linkmanMobile}}</span>
      </div>
      <div class="two">
        <span>地址：</span>
        <span
          class="user-address">{{orderAddress.province + orderAddress.city + orderAddress.district + orderAddress.address}}</span>
      </div>
    </div>

    <!--商品列表-->
    <div class="shop-list">
      <div v-for="(item,index) in productList" :id="item.id" class="wrap">
        <!--订单详情-->
        <router-link to="">
          <div class="order-detail clearfix">
            <div class="left">
              <img :src="item.coverImg"/>
            </div>
            <ul class="right">
              <li>
                <a class="text-1">{{item.name}}</a>
              </li>
              <li class="text-2">{{item.norms}}</li>
              <li class="text-3">{{item.price}}</li>
              <li class="text-4">
                <span class="price">{{item.preferentialPrice}}</span>
                <span class="count">x{{item.quantity}}</span>
              </li>
            </ul>
          </div>
        </router-link>

        <!--操作-->
        <!--<div v-if="payStatus == 3" class="order-operate">
          <span @click="goEvaluate(item.productList[index].id)" class="btn">评价</span>
        </div>-->
      </div>
    </div>

    <!--配送方式-->
    <div class="policy">
      <span>配送方式</span>
      <span>快递￥{{order.expressFee}}（不含港澳台地区）</span>
    </div>

    <!--买家留言-->
    <div class="leave">
      <span>买家留言</span>
      <span>{{order.meessage}}</span>
    </div>

    <!--订单号-->
    <div class="order-id">
      订单号：<span>{{order.outTradeNo}}</span>
    </div>

    <!--创建时间-->
    <div class="create-time">
      创建时间：<span>{{order.createDate}}</span>
    </div>

    <!--商品金额-->
    <ul class="money">
      <li>
        <span>商品总额</span>
        <span>&yen;{{order.payAmount}}</span>
      </li>
      <li>
        <span>+运费</span>
        <span>&yen; {{order.expressFee}}</span>
      </li>
    </ul>
    <!--实付款-->
    <div class="pay">
      <span>实付款：</span>
      <span class="price">&yen;{{total}}</span>
    </div>

    <!--未付款-->
    <footer v-if="payStatus == 0" class="footer">
      <span @click="cancalOrder(order.id)" class="btn">取消订单</span>
      <router-link :to="'/select_pay?id='+order.id"><span class="btn">付款</span></router-link>
    </footer>

    <!--已付款-->
    <footer v-if="payStatus == 1" class="footer hide"></footer>

    <!--已发货-->
    <footer v-if="payStatus == 2" class="footer">
      <span @click="extendTheReceiving(order.id)" class="btn">延长收货</span>
      <span @click="requestReturn(order.id)" class="btn">申请退货</span>
      <span @click="seaLogistics(order.id)" class="btn">查看物流</span>
      <span @click="confirmReceipt(order.id)" class="btn">确认收货</span>
    </footer>

    <!--已收货-->
    <footer v-if="payStatus == 3" class="footer">
      <span @click="goEvaluate(order.id)" class="btn">评价</span>
    </footer>

    <!--取消订单-->
    <footer v-if="payStatus == 4" class="footer hide"></footer>

    <!--申请退款-->
    <footer v-if="payStatus == 5" class="footer hide"></footer>

    <!--交易关闭-->
    <footer v-if="payStatus == 6" class="footer hide"></footer>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data() {
      return {
        order: {},
        orderAddress: {},
        productList: [],
        payStatus: "",
        pay: this.$route.query.pay,
      }
    },
    computed: {
      total() {
        return parseFloat(this.order.payAmount) + parseInt(this.order.expressFee);
      }
    },
    mounted() {
      this.getOrderDetail();
    },
    methods: {
      /**
       *  获取订单详情
       */
      getOrderDetail() {
        if (this.$route.query.id) {
          con.get("/api/order/detail?id=" + this.$route.query.id, (response) => {
            if (response.result === 1) {
              this.order = response.data.order;
              this.payStatus = response.data.order.payStatus;
              this.orderAddress = response.data.orderAddress;
              this.productList = response.data.productList;
            } else {
              con.toast(response.msg);
            }
          })
        }
      },
      /**
       * 去评价
       * @param id 以下id均为订单id
       */
      goEvaluate(id) {
        this.$router.push("/evaluate?id=" + id);
      },
      /**
       * 取消订单
       * @param id
       */
      cancalOrder(id) {
        con.post("/api/order/cancel", {
          "id": id,
        }, (response) => {
          if (response.result === 1) {
            con.toast(response.msg, "center");
          } else {
            con.toast(response.msg);
          }
        })
      },
      /**
       * 延长收货
       * @param id
       */
      extendTheReceiving(id) {
        this.requestPost("/api/order/extension", id);
      },
      /**
       * 申请退货
       * @param id
       */
      requestReturn(id) {
        this.requestPost("/api/order/refund", id);
      },
      /**
       * 查看物流
       */
      seaLogistics(id) {
        this.$router.push("/logist?id=" + id);
      },
      /**
       * 确认收货
       * @param id
       */
      confirmReceipt(id) {
        this.requestPost("/api/order/confirm", id);
      },
      requestPost(url, id) {
        con.post(url, {
          "id": id
        }, (response) => {
          if (response.result === 1) {
            con.toast("操作成功", "center");
          } else {
            con.toast(response.msg, "center");
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #order-detail {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
    padding-bottom: 1.306666rem;
  }
  .hide{
    display: none;
  }
  .status {
    height: 1.066666rem;
    background: #fff;
    font-size: 0.4rem;
    color: #c63535;
    padding: 0 0.4rem;
    line-height: 1.066666rem;
    margin-bottom: 0.133333rem;
  }

  .address {
    min-height: 2.133333rem;
    background: #fff;
    padding: 0 0.4rem;
    margin-bottom: 0.133333rem;
    .one {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      padding: 0.333333rem 0;
      font-size: 0.346666rem;
      color: #333;
      i {
        display: inline-block;
        width: 0.32rem;
        height: 0.4rem;
        background: url(../../assets/web/icon_position.png) no-repeat 0 0;
        background-size: cover;
        margin-right: 0.266666rem;
      }
      .name {
        margin-right: 0.666666rem;
      }
    }
    .two {
      font-size: 0.32rem;
      color: #666;
      padding-left: 0.6rem;
      .user-address {
        display: inline-block;
        vertical-align: top;
        width: 7.5rem;
        line-height: 0.4rem;
      }
    }
  }

  .shop-list {
    margin-bottom: 0.133333rem;
  }

  .wrap {
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;

    &:last-child {
      border-bottom: none;
    }
    .order-detail {
      width: 100%;
      min-height: 2.5rem;
      padding: 0.226666rem 0.4rem;

      .left {
        float: left;
        width: 2.4rem;
        min-height: 2.4rem;
        a {
          /*display: block;
          width: 100%;
          height: 100%;*/
        }
        img {
          width: 100%;
          height: 2.4rem;
        }
      }
      .right {
        float: right;
        width: 6.533333rem;
        min-height: 2.5rem;
        li {
          width: 100%;
          a {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .text-1 {
          font-size: 0.32rem;
          color: #333;
          line-height: 0.44rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          min-height: 65/75rem;
        }
        .text-2 {
          padding: 0.23rem 0;
        }
        .text-2, .text-3, .text-4 {
          font-size: 0.32rem;
          color: #666;
        }
        .text-3 {
          text-decoration: line-through;
        }
        .text-4 {
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          justify-content: space-between;
          -webkit-justify-content: space-between;
          .price {
            color: #c63535;
            font-weight: 600;
          }
        }
      }
    }

    .order-operate {
      width: 100%;
      padding: 0 0.4rem 0.266666rem;
      text-align: right;
      .btn {
        display: inline-block;
        width: 1.6rem;
        height: 0.8rem;
        border: 1px solid #565656;
        font-size: 0.346666rem;
        color: #333;
        text-align: center;
        line-height: 0.8rem;
        border-radius: 0.4rem;
        -webkit-border-radius: 0.4rem;
        margin-left: 0.2rem;
      }
    }

  }

  .policy, .leave, .order-id, .create-time, .money, .pay {
    width: 100%;
    background: #fff;
    padding: 0 0.4rem;
  }

  .policy, .leave {
    height: 1.066666rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.133333rem;
    color: #333;
    span:nth-of-type(1) {
      font-size: 0.346666rem;
    }
    span:nth-of-type(2) {
      font-size: 0.32rem;
    }
  }

  .order-id {
    border-bottom: 1px solid #e5e5e5;
  }

  .order-id, .create-time {
    height: 1.066666rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.346666rem;
    color: #333;
  }

  .create-time {
    margin-bottom: 0.133333rem;
  }

  .money {
    padding-top: 0.266666rem;
    border-bottom: 1px solid #e5e5e5;
    li {
      padding-bottom: 0.266666rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.346666rem;
      color: #333;
    }
  }

  .pay {
    font-size: 0.346666rem;
    color: #333;
    text-align: right;
    height: 1.2rem;
    line-height: 1.2rem;

    .price {
      color: #f24545;
    }
  }

  .footer {
    width: 100%;
    height: 1.293333rem;
    padding: 0 0.4rem;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    line-height: 1.293333rem;
    text-align: right;
    .btn {
      display: inline-block;
      width: 1.6rem;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      border: 1px solid #565656;
      color: #333;
      font-size: 0.32rem;
      border-radius: 0.4rem;
      margin-left: 0.133333rem;
      &.active {
        border-color: #c63535;
        color: #c63535;
      }
    }
  }
</style>
