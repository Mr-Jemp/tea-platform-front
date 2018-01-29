<template>
  <div id="reg">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">注册</span>
    </header>

    <!--注册填写信息-->
    <section class="content">
      <div class="phone">
        <i class="icon-phone"></i>
        <input v-model="mobile" type="number" placeholder="请输入11位的手机号码"/>
        <i class="clear" @click="clear"></i>
      </div>

      <div class="verify">
        <i class="lock"></i>
        <input type="text" placeholder="请输入验证码" v-model="mobileCode"/>
        <span class="get-code" @click="getCode($event)">获取验证码</span>
      </div>

      <div class="invite">
        <i class="lock"></i>
        <input v-model="invitationCode" type="text" placeholder="请输入邀请码（如没有，可跳过）"/>
      </div>

      <button class="login-btn" @click="reg($event)">立即注册</button>

      <router-link to="/login" replace class="rapid-reg">跳转登录</router-link>

    </section>

  </div>
</template>

<script>
  import $ from 'jquery'
  import {con} from "../../assets/js/common"

  export default {
    data() {
      return {
        mobile: "",
        mobileCode: "",
        hasGetCode: false,
        invitationCode: ""
      }
    },
    watch: {
      mobile(value) {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
        if (reg && value.trim().length === 11) {
          this.hasGetCode = true;
        } else {
          this.hasGetCode = false;
        }
      }
    },
    mounted() {
      this.getInvitationCode();
    },
    methods: {
      /**
       * 获取验证码
       * @param e 点击的元素
       */
      getCode(e) {
        if(this.hasGetCode){
          if($(e.target).attr("disabled")){
            console.log("请勿重复点击");
          }else{
            $(e.target).attr("disabled",true)
            con.get("/api/mobile/code?mobile=" + this.mobile, (response) => {
              if (response.result === 1) {
                let countDown = 60;
                let timer = setInterval(function () {
                  if (countDown >= 1) {
                    countDown--;
                    e.target.innerHTML = countDown + "s后获取";
                  } else {
                    e.target.innerHTML = "重新获取验证码";
                    clearInterval(timer);
                    $(e.target).removeAttr("disabled");
                  }
                }, 1000)
              }
            })
          }
        }else{
          con.toast("请输入正确的手机号码");
        }
      },

      /**
       * 清空输入框的值
       */
      clear() {
        this.mobile = "";
      },

      reg(e) {
        if (this.mobile.trim()) {
          if(this.hasGetCode){
            if(this.mobileCode){
              con.post("/api/security/registerByMobile", {
                "mobile": this.mobile,
                "mobileCode": this.mobileCode,
                "invitationCode": this.invitationCode,
                "province": "",
                "city": "",
                "district": "",
              }, (response) => {
                if(response.result === 1){
                  //注册成功
                  con.toast("注册成功");
                  if (response.data.openidUrl) {//跳转微信
                    window.location.href = response.data.openidUrl;
                  }
                  setTimeout(() => {
                    this.$router.push("/me");
                  }, 1500);
                }else{
                  //注册失败
                  con.toast(response.msg);
                }
              })
            }else{
              con.toast("请输入验证码");
            }

          }else{
            con.toast("手机号码有误");
          }
        }else{
          con.toast("请输入手机号码")
        }
      },
      getInvitationCode() {
        this.invitationCode = this.$route.query.invitationCode || '';
      }
    }
  }
</script>

<style scoped lang="less">
  #reg {
    width: 100%;
    height: 100vh;
    background: url(../../assets/web/bg.png) 0 0 no-repeat;
    background-size: cover;
  }

  .content {
    width: 100%;
    padding: 0 0.4rem;

    .phone, .verify, .invite {
      position: relative;
      width: 100%;
      padding: 0.24rem 0;
      border-bottom: 0.026666rem solid #e0e0e0;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      input {
        color: #999;
        font-size: 0.346666rem;
        width: 6.133333rem;
      }
    }
    .phone {
      margin-top: 2.933333rem;
    }

    .icon-phone {
      background: url(../../assets/web/icon_phone.png) 0 0 no-repeat;
    }
    .lock {
      background: url(../../assets/web/icon_verification_code.png) 0 0 no-repeat;
    }
    .icon-phone, .lock {
      display: inline-block;
      width: 0.346666rem;
      height: 0.533333rem;
      background-size: cover;
      margin-left: 0.266666rem;
      margin-right: 0.4rem;
    }

    .clear, .get-code {
      display: inline-block;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    .clear {
      width: 0.426666rem;
      height: 0.426666rem;
      background: url(../../assets/web/btn_clear.png) 0 0 no-repeat;
      background-size: cover;
    }

    .get-code {
      min-width: 1.866666rem;
      height: 0.64rem;
      font-size: 0.266666rem;
      color: #fff;
      line-height: 0.6rem;
      text-align: center;
      -webkit-border-radius: 5px;
      border-radius: 5px;
      border: 1px solid #e0e0e0;
      padding: 0 0.2rem;
    }

    .login-btn {
      background: #803737;
      width: 100%;
      height: 1.066666rem;
      border: none;
      color: #fff;
      border-radius: 0.133333rem;
      margin: 1.066666rem 0;
      outline: none;
    }

    .rapid-reg {
      display: block;
      color: #fff;
      text-align: center;
      font-size: 0.346666rem;
    }
  }

</style>
