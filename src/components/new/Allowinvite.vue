<template>
  <div id="allowinvite">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
        <span class="back-text">返回</span>
      </a>
      <span class="title">邀请注册</span>
    </header>

    <div class="box">
      <p class="text-info">识别二维码进行注册，或注册时输入ta的邀请码，成为 ta 的好友吧！</p>
      <div class="wrap">
        <div class="left">
          <img :src="qrCode" alt="">
        </div>
        <div class="right">
          <img src="../../assets/web/Android.png" alt="">
          <img src="../../assets/web/IOS.png" alt="">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data(){
      return {
        qrCode:""
      }
    },
    mounted(){
      this.getAllow();
    },
    methods:{
      getAllow(){
        con.get("/api/my/invitationCode",(response) => {
          if(response.result === 1){
            this.qrCode = response.data.qrCode;
          }else{
            con.toast("获取二维码失败")
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #allowinvite {
    width: 100%;
    height: 100vh;
    background: url(../../assets/web/allowinvite_bj.png) 0 0 no-repeat;
    background-size: cover;
    position: relative;
    .header{
      a{
        left: 0;
      }
      .back-text{
        color: #fff;
        vertical-align: text-top;
        padding-left: 10/75rem;
      }
    }

    .box{
      width: 100%;
      min-height: 514/75rem;
      padding: 0 30/75rem;
      position: absolute;
      left: 0;
      bottom: 0;
      .text-info{
        font-size: 28/75rem;
        color: #333;
      }
      .wrap{
        width: 100%;
        height: 438/75rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: space-around;
        .left,.right{
          width: 320/75rem;
          height: 320/75rem;
        }
        .left{
          img{
            width: 100%;
            height: 100%;
          }
        }
        .right{
          text-align: center;
          img{
            width: 240/75rem;
            height: 80/75rem;
            margin-top: 45/75rem;
            &:nth-of-type(1){
              margin-top: 55/75rem;
            }
          }
        }
      }
    }
  }

</style>
