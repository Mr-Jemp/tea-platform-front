<template>
  <div id="bill-detail">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">账单详情</span>
    </header>

    <section class="content">
      <div class="wrap">

        <div v-if="detailList.method == 1" class="income">-{{detailList.amount}}</div>
        <div v-if="detailList.method == 2" class="income">+{{detailList.amount}}</div>
        <div v-if="detailList.method == 3" class="income">+{{detailList.amount}}</div>
        <div v-if="detailList.method == 4" class="income">-{{detailList.amount}}</div>

        <ul class="details">
          <li class="item">
            <span class="left-text">交易类型</span>
            <div class="right-text">
              <span v-if="detailList.method == 1">支出</span>
              <span v-if="detailList.method == 2">收入</span>
              <span v-if="detailList.method == 3">收入</span>
              <span v-if="detailList.method == 4">支出</span>
            </div>
          </li>
          <li class="item" >
            <span class="left-text">账单说明</span>
            <div class="right-text">
              <span v-if="detailList.method == 1">购买商品</span>
              <span v-if="detailList.method == 2">佣金</span>
              <span v-if="detailList.method == 3">退款</span>
              <span v-if="detailList.method == 4">提现</span>
            </div>
          </li>
          <li class="item" >
            <span class="left-text">积分说明</span>
            <div class="right-text">
              <span v-if="detailList.method == 1">{{detailList.discount}}</span>
              <span v-if="detailList.method == 2">{{detailList.discount}}</span>
              <span v-if="detailList.method == 3">+{{detailList.discount}}积分</span>
              <span v-if="detailList.method == 4">{{detailList.discount}}</span>
            </div>
          </li>
          <li class="item">
            <span class="left-text">商品名称</span>
            <div class="right-text">
              <p v-for="name in detailList.productNameList">{{name}}</p>
            </div>
          </li>

        </ul>

        <ul class="create-info">
          <li class="item">
            <span class="left-text">创建时间</span>
            <span class="right-text">{{detailList.date}}</span>
          </li>
          <li class="item">
            <span class="left-text">订单号</span>
            <span class="right-text">{{detailList.outTradeNo}}</span>
          </li>
        </ul>
      </div>
      <p v-if="detailList.method == 1 || detailList.method == 5" class="notice">注意：确认收货后，积分才会到账</p>
    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data() {
      return {
        detailList: {},
      }
    },
    mounted() {
      this.getBillDetail();
    },
    methods: {
      getBillDetail() {
        if (this.$route.query.id) {
          con.get("/api/turnover/detail?id=" + this.$route.query.id, (response) => {
            if (response.result === 1) {
              this.detailList = response.data;
            } else {
              con.toast(response.msg);
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #bill-detail {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }

  .content {
    width: 100%;

    .wrap {
      width: 100%;
      padding: 0 0.4rem;
      background: #fff;

      .income {
        width: 100%;
        height: 2.6rem;
        text-align: center;
        font-size: 0.666666rem;
        color: #333;
        font-weight: 600;
        line-height: 2.6rem;
      }
      .left-text, .right-text {
        font-size: 0.373333rem;
      }
      .left-text {
        float: left;
        color: #999;
      }
      .right-text {
        float: right;
        color: #333;
        line-height: 0.426666rem;
        text-align: right;
        max-width: 6.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        padding-bottom: 0.02rem;
        -webkit-box-orient: vertical;
        p{
          margin-bottom: 10/75rem;
        }
      }

      .item {
        padding-bottom: 0.426666rem;
      }

      .details {
        border-bottom: 1px solid #f5f5f5;
        li {
          display: flex;
          justify-content: space-between;
        }
      }
      .create-info {
        padding-top: 0.426666rem;
        li {
          display: flex;
          justify-content: space-between;
        }
      }

    }
    .notice{
      font-size: 26/75rem;
      color: #ec3a3a;
      padding: 20/75rem 30/75rem;
    }
  }
</style>
