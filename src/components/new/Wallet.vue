<template>
  <div id="wallet">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">我的钱包</span>
    </header>

    <section class="content">
      <!--我的余额-->
      <div class="balance">
        <div class="one">我的余额（元）</div>
        <div class="two">{{myBalance}}</div>
      </div>

      <!--提现-->
      <ul class="deposit">
      	<li class="deposit-item clearfix">
      	  <router-link :to="'/withdraw?balance=' + myBalance">
      	    <span class="left"><i class="deposit-icon"></i>提现</span>
            <i class="right"></i>
      	  </router-link>
      	</li>
      	<li class="deposit-item clearfix">
      	  <router-link to="/record">
      	    <span class="left"><i class="history-icon"></i>提现记录</span>
            <i class="right"></i>
      	  </router-link>
        </li>
      </ul>

    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data(){
      return {
        myBalance:"",
      }
    },
    mounted(){
      this.getMyWallet();
    },
    methods:{
      getMyWallet(){
        con.get("/api/my/wallet",(response) => {
          if(response.result === 1){
            this.myBalance = response.data.balance;
          }else{
            con.toast(response.msg);
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
#wallet{
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

.content{
  width: 100%;

  .balance{
    width: 100%;
    height: 3.533333rem;
    background: #303030;
    padding: 0 0.4rem;

    .one{
      padding: 0.4rem 0;
      font-size: 0.346666rem;
      color: #ccc;
    }
    .two{
      padding: 0.666666rem 0;
      font-size: 1.28rem;
      font-weight: 500;
      color: #fff;
    }
  }

  .deposit{
    width: 100%;
    background: #fff;
    padding: 0 0.4rem;

    .deposit-item{
      width: 100%;
      height: 1.333333rem;
      border-bottom: 1px solid #f5f5f5;
      a{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .left{
      float: left;
      font-size: 0.373333rem;

      .deposit-icon{
        background: url(../../assets/web/icon_withdraw.png) 0 0 no-repeat;
      }
      .history-icon{
        background: url(../../assets/web/icon_withdraw_history.png) 0 0 no-repeat;
      }
      .deposit-icon,.history-icon{
        display: inline-block;
        width: 0.48rem;
        height: 0.48rem;
        background-size: cover;
        margin-right: 0.266666rem;
      }

    }
    .right{
      float: right;
    }
    .left,.right{
      display: flex;
      display: -webkit-flex;
      align-items: center;
      height: 100%;
    }

  }

}
</style>
