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

        <div class="income">{{detailList.amount}}</div>

        <ul class="details">
          <li class="item clearfix">
            <span class="left-text">交易类型</span>
            <span v-if="detailList.method == 1 || 4" class="right-text">支出</span>
            <span v-if="detailList.method == 2 || 3" class="right-text">收入</span>
          </li>
          <li class="item clearfix">
            <span class="left-text">账单说明</span>
            <span v-if="detailList.method == 1" class="right-text">购买商品</span>
            <span v-if="detailList.method == 2" class="right-text">佣金</span>
            <span v-if="detailList.method == 3" class="right-text">退款</span>
            <span v-if="detailList.method == 4" class="right-text">提现</span>
          </li>
          <li class="item clearfix">
            <span class="left-text">商品名称</span>
            <span class="right-text">{{detailList.productNameList}}</span>
          </li>
        </ul>

        <ul class="create-info">
          <li class="item clearfix">
            <span class="left-text">创建时间</span>
            <span class="right-text">{{detailList.createTime}}</span>
          </li>
          <li class="item clearfix">
            <span class="left-text">订单号</span>
            <span class="right-text">{{detailList.outTradeNo}}</span>
          </li>
        </ul>

      </div>
    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data() {
      return {
        detailList:{},
      }
    },
    mounted() {
      this.getBillDetail();
    },
    methods: {
      getBillDetail() {
        if (this.$route.query.id) {
          con.get("/api/turnover/detail", (response) => {
            if(response.result === 1){
              this.detailList = response.data;
            }else{
              con.toast(response.msg)
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
      }

      .item {
        padding-bottom: 0.426666rem;
      }

      .details {
        border-bottom: 1px solid #f5f5f5;
      }
      .create-info {
        padding-top: 0.426666rem;
      }

    }
  }
</style>
