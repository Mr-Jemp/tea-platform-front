<template>
  <div id="me">
    <!--头部-->
    <div class="me-header">
      <div class="user-info">
        <router-link to="/personal" class="user" v-if="isLogin">
          <img :src="me.userInfo.headerImg">
          <div>
            <p class="nickname">{{me.userInfo.nickname || '无昵称'}}</p>
            <span class="grade">{{me.userInfo.showName}}</span>
          </div>
        </router-link>

        <!--未登录-->
        <router-link class="login" to="/login" v-else>
          <img src="../../assets/web/avater.png"/>
          <p class="login-info">（点击头像登录或注册）</p>
        </router-link>
      </div>
      <router-link to="/set" class="setting" v-show="isLogin">
        <i></i>
      </router-link>

    </div>

    <!--订单状态-->
    <ul class="status">
      <li>
        <router-link v-if="isLogin" to="/my_order?type=2"><i class="icon1">
          <mt-badge v-show="me.Unpaid" size="small" type="error">{{me.Unpaid}}</mt-badge>
        </i><span>待付款</span></router-link>
        <a v-else @click="tips"><i class="icon1">
          <mt-badge v-show="me.Unpaid" size="small" type="error">{{me.Unpaid}}</mt-badge>
        </i><span>待付款</span></a>
      </li>
      <li>
        <router-link v-if="isLogin" to="/my_order?type=3"><i class="icon2">
          <mt-badge v-show="me.unreceived" size="small" type="error">{{me.unreceived}}</mt-badge>
        </i><span>待收货</span></router-link>
        <a v-else @click="tips"><i class="icon2">
          <mt-badge v-show="me.unreceived" size="small" type="error">{{me.unreceived}}</mt-badge>
        </i><span>待收货</span></a>
      </li>
      <li>
        <router-link v-if="isLogin" to="/my_order?type=4"><i class="icon3">
          <mt-badge v-show="me.notEvaluated" size="small" type="error">{{me.notEvaluated}}</mt-badge>
        </i><span>待评价</span></router-link>
        <a v-else @click="tips"><i class="icon3">
          <mt-badge v-show="me.notEvaluated" size="small" type="error">{{me.notEvaluated}}</mt-badge>
        </i><span>待评价</span></a>
      </li>
      <li>
        <router-link v-if="isLogin" to="/my_order?type=5"><i class="icon4">
          <mt-badge v-show="me.customerService" size="small" type="error">{{me.customerService}}</mt-badge>
        </i><span>售后</span></router-link>
        <a v-else @click="tips"><i class="icon4">
          <mt-badge v-show="me.customerService" size="small" type="error">{{me.customerService}}</mt-badge>
        </i><span>售后</span></a>
      </li>
      <li>
        <router-link class="allOrder" v-if="isLogin" to="/my_order?type=1"><i class="icon5">
        </i><span>全部订单</span></router-link>
        <a class="allOrder" v-else @click="tips"><i class="icon5">
        </i><span>全部订单</span></a>
      </li>
    </ul>

    <!--列表-->
    <ul class="list">
      <li>
        <router-link v-if="isLogin" to="/bill"><i class="icon6"></i><span>账单</span><i class="more"></i></router-link>
        <a v-else @click="tips"><i class="icon6"></i><span>账单</span><i class="more"></i></a>
      </li>
      <li>
        <router-link v-if="isLogin" to="/wallet"><i class="icon7"></i><span>我的钱包</span><i class="more"></i>
        </router-link>
        <a v-else @click="tips"><i class="icon7"></i><span>我的钱包</span><i class="more"></i></a>
      </li>
      <li>
        <router-link v-if="isLogin" to="/invite"><i class="icon8"></i><span>推荐好友</span><i class="code"></i><i
          class="more"></i></router-link>
        <a v-else @click="tips"><i class="icon8"></i><span>推荐好友</span><i class="code"></i><i class="more"></i></a>
      </li>
      <li>
        <router-link v-if="isLogin" to="/friend"><i class="icon9"></i><span>我的好友</span><i class="more"></i>
        </router-link>
        <a v-else @click="tips"><i class="icon9"></i><span>我的好友</span><i class="more"></i></a>
      </li>
    </ul>


    <my-nav :current="4"></my-nav>
  </div>
</template>

<script>

  import axios from 'axios'
  import {Toast} from 'mint-ui'

  export default {
    name: 'me',
    data() {
      return {
        isLogin: false,
        me: {},
        count: true
      }
    },
    computed: {
      /**
       * 计算所有订单数量
       * @returns {*} 计算结果
       */
      countOrder() {
        return this.count = parseInt(this.me.Unpaid) + parseInt(this.me.customerService) +
          parseInt(this.me.notEvaluated) + parseInt(this.me.unreceived);
      }
    },
    mounted() {
      //获取个人信息
      axios.get("/api/my/index")
        .then((response) => {
//        console.log(response.data.data)
          if (response.data.result === 1) {
            this.isLogin = true;
            this.me = response.data.data;
//                console.log(this.me)
          } else {
            this.isLogin = false;
            Toast({
              position: "center",
              message: response.data.msg
            });
            setTimeout(() => {
              this.$router.replace("/login");
            }, 1000)
          }
        });
    },
    methods: {
      tips() {
        Toast({
          position: "center",
          message: "请先登录"
        });
        setTimeout(() => {
          this.$router.replace("/login");
        }, 1000)
      }
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
      .user-info {
        width: 100%;
        height: 205/75rem;
        padding: 42/75rem 60/75rem;
        text-align: center;
        a.user {
          display: block;
          width: 400/75rem;
          height: 100%;
          position: relative;
          img {
            width: 120/75rem;
            height: 120/75rem;
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 50%;
            -webkit-border-radius: 50%;
          }
          > div {
            position: absolute;
            min-width: 155/75rem;
            left: 157/75rem;

            .nickname {
              font-size: 30/75rem;
              color: #fff;
              padding-bottom: 28/75rem;
              padding-top: 10/75rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .grade {
              width: 2rem;
              border: 2px solid #e7e1cf;
              text-align: center;
              color: #e6e0d1;
              font-size: .26666667rem;
              border-radius: .26666667rem;
              -webkit-border-radius: 0.26666667rem;
              background: rgba(61, 59, 57, .5);
              display: block;
              padding: 4/75rem 10/75rem;
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
      .allOrder{
        position: relative;
      }
      .allOrder:after{
        content: "";
        display: block;
        width: 1px;
        height: 75%;
        background: #ddd;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
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
