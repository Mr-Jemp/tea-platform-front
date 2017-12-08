<template>
  <div id="select_pay">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">选择支付方式</span>
    </header>

    <!--支付方式列表-->
    <section class="content">
      <ul class="pay-list">
      	<li class="pay-way">
      	  <a>
      	    <i class="pay-balance"></i>
      	    <span class="text">账户余额</span>
      	  </a>
      	</li>
      	<li class="pay-way">
      	  <a @click="wechatPay">
            <i class="pay-wechat"></i>
            <span class="text">微信支付</span>
          </a>
      	</li>
      	<li class="pay-way">
      	  <a>
            <i class="pay-alipay"></i>
            <span class="text">支付宝</span>
          </a>
      	</li>
      	<li class="pay-way">
      	  <a>
            <i class="pay-unionpay"></i>
            <span class="text">银联支付</span>
          </a>
      	</li>
      </ul>
    </section>

  </div>

</template>

<script>
  let id;
  import {con} from '../../assets/js/common'
  export default {
    name: 'selectPay',
    mounted(){
      id = this.$route.query.id;
    },
    methods: {
      wechatPay(){
//        alert("wechat");
//        alert(this.isWeixn());
//        if(this.isWeixn()){
          con.get('/api/wechat/mpOrder?id=' + this.$route.query.id, response => {
            if(response.result === 1) {
              function onBridgeReady(){
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    "appId": response.data.appId,     //公众号名称，由商户传入
                    "timeStamp": response.data.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr": response.data.nonceStr, //随机串
                    "package": response.data.package,
                    "signType": response.data.signType,         //微信签名方式：
                    "paySign": response.data.paySign //微信签名
                  },
                  function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                      let url = location.href.split("/#")[0];
                      back(url + "/order_detail?id=" + id);
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                  }
                );
              }
              if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
              }else{
                onBridgeReady();
              }
            } else {

            }
          });
//        } else {
          //不是微信
//        }
      },

//      isWeixn(){
//        let ua = navigator.userAgent.toLowerCase();
//        return ua.match(/MicroMessenger/i) === "micromessenger";
//      }
    }
  }
</script>

<style scoped lang="less">
  #select_pay{
    width: 100%;
    height: 100vh;
    background: #f5f5f5;
  }


  .content{
    width: 100%;

    .pay-way{
      width: 100%;
      height: 1.6rem;
      background: #fff;
      border-bottom: 0.013333rem solid #e3e5e9;
      a{
        width: 100%;
        height: 100%;
        display: flex;
        padding: 0 0.4rem;
        display: -webkit-flex;
        align-items: center;
      }

      .pay-balance{
        background: url(../../assets/web/icon_payment_balance.png) 0 0 no-repeat;
      }
      .pay-wechat{
        background: url(../../assets/web/icon_payment_wechat.png) 0 0 no-repeat;
      }
      .pay-alipay{
        background: url(../../assets/web/icon_payment_alipay.png) 0 0 no-repeat;
      }
      .pay-unionpay{
        background: url(../../assets/web/icon_payment_unionpay.png) 0 0 no-repeat;
      }

      .pay-balance,.pay-wechat,.pay-alipay{
        display: inline-block;
        width: 0.853333rem;
        height: 0.853333rem;
        background-size: cover;
        vertical-align: middle;
      }
      .pay-unionpay{
        width: 0.853333rem;
        display: inline-block;
        height: 0.533333rem;
        background-size: cover;
        vertical-align: text-bottom;
      }
      .text{
        font-size: 0.4rem;
        color: #333;
        padding-left: 0.266666rem;
      }

      /*&:nth-of-type(4){
        line-height: 2rem;
      }*/

    }

  }
</style>
