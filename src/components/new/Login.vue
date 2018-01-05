<template>
  <div id="login">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">登录</span>
    </header>

    <!--登录填写信息-->
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
      <button class="login-btn" @click="login">登录</button>

      <router-link to="/reg" replace class="rapid-reg">手机快速注册</router-link>

    </section>

    <!--第三方登录-->
    <footer class="footer">
      <ul class="footer-ul">
        <li></li>
        <li>第三方登录</li>
        <li></li>
      </ul>
      <ul class="thirdparty">
        <li>
          <a><img src="../../assets/web/btn_QQ.png" alt=""></a>
        </li>
        <li @click="weChatLogin">
          <a><img src="../../assets/web/btn_wechat.png" alt=""></a>
        </li>
        <li>
          <a><img src="../../assets/web/btn_weibo.png" alt=""></a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
  import {con} from "../../assets/js/common"
  import $ from 'jquery'

  let self;

  export default {
    data() {
      return {
        mobile: "",
        mobileCode: "",
        hasGetCode: false,
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
    created() {
      self = this;
    },
    mounted() {
      this.thirdpartyLogin(location.href);
      var startHeight = document.body.clientHeight;

      window.onresize = function () {//防止在安卓上打开会把底部固定定位元素挤上来
        if (document.body.clientHeight < startHeight) {
          document.getElementsByClassName("footer")[0].style.display = "none";
        } else {
          document.getElementsByClassName("footer")[0].style.display = "block";
        }
      }
    },
    methods: {
      getCode(e) {//获取验证码
        if (this.hasGetCode) {
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
      login() {
        if (this.mobile.length === 0) {
          con.toast("请输入手机号码");
        } else {
          if (this.mobile.trim().length === 11) {
            if (this.hasGetCode) {
              if (this.mobileCode.length === 0) {
                con.toast("请输入验证码");
              } else {
                if (this.mobileCode.length === 6) {
                  con.post("/api/security/login", {
                    "mobile": this.mobile,
                    "mobileCode": this.mobileCode
                  }, response => {
                    if (response.result === 1) {
                      //登录成功
                      con.toast("登陆成功");
                      if (response.data.openidUrl) {//跳转微信
                        window.location.href = response.data.openidUrl;
                      }
                      setTimeout(() => {
                        this.$router.replace("/me");
                      }, 1500);
                    } else {
                      con.toast(response.msg);
                    }
                  })
                } else {
                  con.toast("验证码有误");
                }
              }
            }
          } else {
            con.toast("手机号码有误，请重新输入")
          }
        }
      },
      clear() {//清空输入框的值
        this.mobile = "";
      },
      weChatLogin() {
        location.href = "http://tea.51feijin.com/admin/wechat/userInfo";
      },
      /**
       * 第三方登录
       * @param url
       */
      thirdpartyLogin(url) {
        if (url.indexOf("?") != -1) {
          let obj = con.urlToObj(url);
          let username = obj.username;
          let nickname = obj.nickname;
          let headerImg = obj.headerImg;
          let province = obj.province;
          let city = obj.city;
          let source = obj.source;

          con.post("/api/security/authorizationLogin", {
            "username": username,
            "nickname": nickname,
            "headerImg": headerImg,
            "province": province,
            "city": city,
            "source": source
          }, (response) => {
            if (response.result === 1) {
              con.toast("登陆成功");
              this.$router.replace("/me");
            } else if (response.result === -1) {
              con.toast(response.msg);
            } else if (response.result === -2) {
              con.toast(response.msg);
              this.$router.push("/binding?username=" + username + "&nickname=" + nickname + "&headerImg=" + headerImg +
                "&province=" + province + "&city=" + city + "&source=" + source);
            }
          })

        }
      }
    },
  };
</script>

<style scoped lang="less">
  #login {
    width: 100%;
    min-height: 100vh;
    background: url(../../assets/web/bg.png) 0 0 no-repeat;
    background-size: cover;
  }

  .content {
    width: 100%;
    padding: 0 0.4rem;

    .phone, .verify {
      position: relative;
      width: 100%;
      padding: 0.24rem 0;
      border-bottom: 0.026666rem solid #e0e0e0;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      input {
        width: 460/75rem;
        color: #999;
        font-size: 0.346666rem;
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

  .footer {
    width: 100%;
    position: fixed;
    bottom: 80/75rem;
    max-width: 600px;
    .footer-ul {
      width: 545/75rem;
      margin: 0 auto 70/75rem;
      display: flex;
      align-items: center;
      li:nth-of-type(1), li:nth-of-type(3) {
        width: 180/75rem;
        height: 1px;
        background-color: #999;
      }
      li:nth-of-type(2) {
        font-size: 26/75rem;
        color: #ccc;
        padding: 0 20/75rem;
      }
    }
    .thirdparty {
      width: 530/75rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      li {
        width: 72/75rem;
        height: 72/75rem;
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
        img {
          width: 72/75rem;
          height: 72/75rem;
        }
      }
    }
  }
</style>
