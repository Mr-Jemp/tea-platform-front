<template>
  <div id="me">
    <!--头部-->
    <div class="me-header">
      <router-link to="/personal" class="user" v-if="isLogin">
        <div class="user-info">
          <img :src="me.userInfo.headerImg">
          <div>
            <p class="nickname">{{me.userInfo.nickname || '无昵称'}}</p>
            <p class="grade">{{me.userInfo.showName}}</p>
          </div>
        </div>
      </router-link>
      <!--未登录-->
      <router-link class="login" to="/login" v-else>
        <img src="../../assets/web/avater.png"/>
        <p class="login-info">（点击头像登录或注册）</p>
      </router-link>
      <router-link to="/set" class="setting" v-show="isLogin">
        <i></i>
      </router-link>

    </div>

    <!--订单状态-->
    <ul class="status">
      <li>
        <router-link to="/my_order"><i class="icon1"><mt-badge v-show="me.Unpaid" size="small" type="error">{{me.Unpaid}}</mt-badge></i><span>待付款</span></router-link>
      </li>
      <li>
        <router-link to="/my_order"><i class="icon2"><mt-badge v-show="me.unreceived" size="small" type="error">{{me.customerService}}</mt-badge></i><span>待收货</span></router-link>
      </li>
      <li>
        <router-link to="/my_order"><i class="icon3"><mt-badge v-show="me.notEvaluated" size="small" type="error">{{me.notEvaluated}}</mt-badge></i><span>待评价</span></router-link>
      </li>
      <li>
        <router-link to="/my_order"><i class="icon4"><mt-badge v-show="me.customerService" size="small" type="error">{{me.unreceived}}</mt-badge></i><span>售后</span></router-link>
      </li>
      <li>
        <router-link to="/my_order"><i class="icon5"><mt-badge v-show="count" size="small" type="error">{{countOrder}}</mt-badge></i><span>全部订单</span></router-link>
      </li>
    </ul>

    <!--列表-->
    <ul class="list">
      <li>
        <router-link to="/bill"><i class="icon6"></i><span>账单</span><i class="more"></i></router-link>
      </li>
      <li>
        <router-link to="/wallet"><i class="icon7"></i><span>我的钱包</span><i class="more"></i></router-link>
      </li>
      <li>
        <router-link to="/invite"><i class="icon8"></i><span>推荐好友</span><i class="code"></i><i class="more"></i></router-link>
      </li>
      <li>
        <router-link to="/friend"><i class="icon9"></i><span>我的好友</span><i class="more"></i></router-link>
      </li>
    </ul>



    <my-nav :current="4"></my-nav>
  </div>
</template>

<script>

  import axios from 'axios'
  import { Toast } from 'mint-ui'

  export default {
    name: 'me',
    data() {
      return {
        isLogin: false,
        me: {},
        count:true
      }
    },
    computed:{
      /**
       * 计算所有订单数量
       * @returns {*} 计算结果
       */
      countOrder(){
        return this.count = this.me.Unpaid + this.me.customerService + this.me.notEvaluated + this.me.unreceived;
      }
    },
    mounted() {
      //获取个人信息
      axios.get("/api/my/index")
        .then((response) => {
        console.log(response.data.data)
            if(response.data.result === 1){
                this.isLogin = true;
                this.me = response.data.data;
            } else {
              this.isLogin = false;
              Toast({
                position: "bottom",
                message: response.data.msg
              })
            }
        });
    }
  }
</script>

<style scoped lang="less">
  #me {
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;

    .me-header {
      position: relative;
      height: 380/75rem;
      background: url(../../assets/web/me_bj.png) 0 0 no-repeat;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      a.user {
        /*width: 100%;*/
        .user-info {
          width: 100%;
          padding-left: 60/75rem;
          height: 120/75rem;
          display: flex;

          img {
            width: 120/75rem;
            height: 120/75rem;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }

          > div {
            margin-left: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .nickname {
              font-size: 30/75rem;
              color: #ffffff;
              margin-bottom: 27/75rem;
            }
            .grade {
              width: 140/75rem;
              height: 36/75rem;
              line-height: 28/75rem;
              border: 2px solid #e7e1cf;
              color: #e6e0d1;
              font-size: 20/75rem;
              text-align: center;
              -webkit-border-radius: 18/75rem;
              -moz-border-radius: 18/75rem;
              border-radius: 18/75rem;
            }
          }
        }
      }
      a.login {
        margin: 0 auto;
        text-align: center;
        img {
          width: 1.6rem;
          height: 1.6rem;
        }
        .login-info {
          color: #fff;
          font-size: 0.373333rem;
          margin: 0.266666rem 0;
        }
      }

      a.setting {
        position: absolute;
        top: 25/75rem;
        right: 30/75rem;
        i {
          display: block;
          width: 38/75rem;
          height: 38/75rem;
          background: url(../../assets/web/icon_personal_setting.png) 0 0 no-repeat;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
        }
      }
    }
  }



  .status {
    display: flex;
    background-color: #fff;
    margin-bottom: 16/75rem;
    li {
      flex: 1;
      height: 144/75rem;

      > a {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        span {
          margin-top: 21/75rem;
          font-size: 22/75rem;
          color: #333333;
        }

        i {
          position: relative;

          .mint-badge {
            position: absolute;
            top: -20px;
            right: -15px;
            color: #fff;
            font-size: 12px;
            font-style: normal;
          }
        }

        i.icon1 {
          width: 44/75rem;
          height: 44/75rem;
          background-image: url(../../assets/web/icon_personal_obligation.png);
        }

        i.icon2 {
          width: 44/75rem;
          height: 44/75rem;
          background-image: url(../../assets/web/icon_personal_receive.png);
        }

        i.icon3 {
          width: 44/75rem;
          height: 44/75rem;
          background-image: url(../../assets/web/icon_personal_evaluate.png);
        }

        i.icon4 {
          width: 46/75rem;
          height: 44/75rem;
          background-image: url(../../assets/web/icon_personal_service.png);
        }

        i.icon5 {
          width: 40/75rem;
          height: 44/75rem;
          background-image: url(../../assets/web/icon_personal_all.png);
        }
        i {
          display: block;
          background: no-repeat 0 0;
          -webkit-background-size: 100%;
          background-size: 100%;
        }

      }
    }
  }

  .list {
    background-color: #fff;

    li {
      padding: 0 30/75rem;
      border-bottom: 1px solid #f5f5f5;
      a {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0.4rem 0;
        position: relative;

        .icon6 {
          width: 0.32rem;
          height: 0.4rem;
          background: url(../../assets/web/icon_person_item_bill.png) no-repeat 0 0;
        }
        .icon7 {
          width: 0.373333rem;
          height: 0.346666rem;
          background: url(../../assets/web/icon_person_item_wallet.png) no-repeat 0 0;
        }
        .icon8 {
          width: 0.4rem;
          height: 0.4rem;
          background: url(../../assets/web/icon_person_item_recommend.png) no-repeat 0 0;
        }
        .icon9 {
          width: 0.4rem;
          height: 0.373333rem;
          background: url(../../assets/web/icon_person_item_friends.png) no-repeat 0 0;
        }

        .code {
          display: inline-block;
          width: 0.48rem;
          height: 0.48rem;
          background: url(../../assets/web/icon_personal_qrcode.png) 0 0 no-repeat;
          background-size: cover;
          position: absolute;
          right: 0.533333rem;
        }
        .more {
          display: inline-block;
          width: 0.16rem;
          height: 0.266666rem;
          background: url(../../assets/web/btn_more.png) 0 0 no-repeat;
          background-size: cover;
          position: absolute;
          right: 0;
          top: 0.533333rem;
        }
        .icon6, .icon7, .icon8, .icon9 {
          display: inline-block;
          background-size: cover;
          margin-right: 0.266666rem;
          vertical-align: middle;
        }

      }

      &:nth-of-type(3) {
        border-top: 0.2rem solid #f5f5f5;
      }
    }
  }


</style>
