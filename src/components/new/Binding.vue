<template>
  <div id="binding">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">绑定手机</span>
    </header>

    <!--注册填写信息-->
    <section class="content">
      <div class="phone">
        <i class="icon-phone"></i>
        <input type="number" v-model="mobile" placeholder="请输入11位的手机号码"/>
        <i class="clear" @click="mobile=''"></i>
      </div>

      <div class="verify">
        <i class="lock"></i>
        <input v-model="authCode" type="text" placeholder="请输入验证码"/>
        <span class="get-code" @click="getCode($event)">获取验证码</span>
      </div>

      <div class="invite">
        <i class="lock"></i>
        <input v-model="invitationCode" type="text" placeholder="请输入邀请码（如没有，可跳过）"/>
      </div>

      <button class="login-btn" @click="confirm">确认</button>

    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"
  import $ from "jquery"

  export default {
    data() {
      return {
        mobile: "",
        authCode: "",
        invitationCode: "",
        whetherCode: false,
      }
    },
    watch: {
      mobile(val) {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/.test(val);
        if (reg && val.trim().length === 11) {
          this.whetherCode = true;
        } else {
          this.whetherCode = false;
        }
      }
    },
    methods: {
      getCode(e) {//获取验证码
        if (this.whetherCode) {
          if ($(e.target).attr("disabled")) {
            console.log('请勿重复点击');
          } else {
            $(e.target).attr("disabled", "disabled");
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
        } else {
          con.toast("请输入正确的手机号码");
        }
      },
      confirm() {
        if (this.mobile) {
          if (this.whetherCode) {
            if (this.authCode.length === 6) {
              let obj = con.urlToObj(location.href);
              let username = obj.username;
              let nickname = obj.nickname;
              let headerImg = obj.headerImg;
              let province = obj.province;
              let city = obj.city;
              let source = obj.source;

              con.post("/api/security/authorizationRegister", {
                "username": username,
                "nickname": nickname,
                "headerImg": headerImg,
                "source": source,
                "mobile": this.mobile,
                "mobileCode": this.authCode,
                "invitationCode": this.invitationCode,
                "province": province,
                "city": city,
              }, (response) => {
                if(response.result === 1){
                  con.toast("登录成功");
                  this.$router.replace("/me");
                }else{
                  con.toast(response.msg);
                }
              })
            } else {
              con.toast("验证码长度有误")
            }
          } else {
            con.toast("手机号码有误");
          }
        } else {
          con.toast("请填写手机号码");
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #binding {
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
    }

    .rapid-reg {
      color: #fff;
      text-align: center;
      font-size: 0.346666rem;
    }
  }

</style>
