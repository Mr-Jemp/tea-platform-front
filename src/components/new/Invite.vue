<template>
  <div id="invite">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">我的邀请码</span>
    </header>

    <section class="content">
      <!--邀请码-->
      <div class="invite-code">
        <span class="one">邀请码</span>
        <span class="two">{{getMyCode.invitationCode}}</span>
      </div>
      <div class="code-img">
        <img class="qr-code" :src="getMyCode.qrCode"/>
      </div>
      <div class="text">通过我的二维码或邀请码邀请好友注册，
好友购买商品后可获得佣金收益</div>
      <div @click="isThird = true" class="share-btn">马上分享</div>
    </section>

    <!--点击分享按钮弹出来的遮罩层-->
    <transition name="slide-fade2">
      <div v-show="isThird" class="shade clearfix">
        <!--分享到-->
        <transition name="slide-fade">
          <div v-show="isThird"  class="wrap">
            <div class="title">分享到</div>

            <ul class="share-to">
              <li>
                <router-link to="">
                <span class="img-wrap">
                  <img src="../../assets/web/icon_share_weibo.png"/>
                </span>
                  <span class="text">新浪微博</span>
                </router-link>
              </li>
              <li>
                <router-link to="">
                <span class="img-wrap">
                  <img src="../../assets/web/icon_share_friends.png"/>
                </span>
                  <span class="text">朋友圈</span>
                </router-link>
              </li>
              <li>
                <router-link to="">
                <span class="img-wrap">
                  <img src="../../assets/web/icon_share_qq.png"/>
                </span>
                  <span class="text">QQ</span>
                </router-link>
              </li>
              <li>
                <router-link to="">
                <span class="img-wrap">
                  <img src="../../assets/web/icon_share_wechat.png"/>
                </span>
                  <span class="text">微信</span>
                </router-link>
              </li>
            </ul>
            <div @click="isThird = false" class="cancel-btn">取消</div>
          </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data () {
      return {
        isThird: false,
        getMyCode:{}
      }
    },
    mounted(){
      this.getCode();
    },
    methods:{
      getCode(){
        con.get("/api/my/invitationCode",(response) => {
          if(response.result === 1){
            this.getMyCode = response.data;
            console.log(response.data)
          }else{
            con.toast(response.msg)
          }
        })
      },
    },
  }
</script>

<style scoped lang="less">
  .slide-fade-enter {
    opacity: 0;
    transform: translateY(447px);
  }

  .slide-fade-enter-active, .slide-fade-leave-active {
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .slide-fade-enter-to {
    opacity: 1;
  }

  .slide-fade-leave {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }




  .slide-fade2-enter {
    opacity: 0;
  }

  .slide-fade2-enter-active, .slide-fade2-leave-active {
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .slide-fade2-enter-to {
    opacity: 1;
  }

  .slide-fade2-leave {
    opacity: 1;
  }

  .slide-fade2-leave-to {
    opacity: 0;
  }











#invite{
  width: 100%;
  height: 100vh;
  background: url(../../assets/web/invite_bj.png) 0 0 no-repeat;
  background-size: cover;
}


.content{
  width: 100%;
  padding-top: 1.6rem;

  .invite-code{
    width: 5.6rem;
    height: 1.333333rem;
    background: #fff;
    border-radius: 0.133333rem;
    -webkit-border-radius: 0.133333rem;
    margin: 0 auto;
    line-height: 1.333333rem;
    text-align: center;

    .one{
      padding-right: 0.4rem;
      border-right: 1px solid #ccc;
      font-size: 0.4rem;
      color: #666;
    }
    .two{
      margin-left: 0.44rem;
      font-size: 0.453333rem;
      color: #333;
    }
  }

  .code-img{
    width: 5.6rem;
    height: 5.6rem;
    background: #fff;
    border-radius: 0.133333rem;
    -webkit-border-radius: 0.133333rem;
    text-align: center;
    padding-top: 0.266666rem;
    margin: 0.4rem auto;
  }

  .qr-code{
    width: 5.066666rem;
    height: 5.066666rem;
  }

  .text{
    width: 6.266666rem;
    font-size: 0.346666rem;
    color: #fff;
    text-align: center;
    line-height: 0.533333rem;
    margin: 0 auto;
  }

  .share-btn{
    width: 5.6rem;
    height: 1.2rem;
    background: #f24545;
    text-align: center;
    line-height: 1.2rem;
    color: #fff;
    border-radius: 0.133333rem;
    -webkit-border-radius: 0.133333rem;
    margin: 0.666666rem auto;
  }

}

.shade{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.5);

  .wrap{
    width: 100%;
    min-height: 4.8rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
  }

  .title{
    text-align: center;
    font-size: 0.373333rem;
    color: #333;
    padding: 0.4rem 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 30/75rem;
  }

  .share-to{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    padding-bottom: 0.133333rem;

    >li{
      text-align: center;
      a{
        display: block;
        width: 100%;
        height: 100%;
      }
      .img-wrap{
        display: inline-block;
        width: 1.64rem;
        height: 1.64rem;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        line-height: 2.1rem;
        border: 1px solid #dedede;
      }
      &:nth-of-type(1) img{
        width: 75/75rem;
        height: 63/75rem;
      }
      &:nth-of-type(2) img{
        width: 65/75rem;
        height: 64/75rem;
      }
      &:nth-of-type(3) img{
        width: 55/75rem;
        height: 65/75rem;
      }
      &:nth-of-type(4) img{
        width: 74/75rem;
        height: 60/75rem;
      }
    }

    /*img{
      width: 1.64rem;
      height: 1.64rem;
    }*/
    .text{
      display: block;
      font-size: 0.346666rem;
      color: #666;
      padding: 0.2rem 0;
    }
  }

  .cancel-btn{
    width: 100%;
    height: 1.2rem;
    color: #fff;
    text-align: center;
    font-size: 0.373333rem;
    background: #f24545;
    line-height: 1.2rem;
  }

}

</style>
