<template>
  <div id="withdraw">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">提现</span>
    </header>

    <section class="content">
      <!--银行卡-->
      <ul class="list-1">
        <li class="item clearfix">
          <span class="left">持卡人</span>
          <input v-model="name" type="text" class="center" placeholder="请输入持卡人姓名"/>
        </li>
        <li class="item bank clearfix">
          <span class="left">银行</span>
          <!--选择银行-->
          <select name="" class="select-bank" id="select-bank">
            <option v-for="item in bankList" value="">{{item}}</option>
          </select>
        </li>
        <li class="item clearfix">
          <span class="left">卡号</span>
          <input v-model="bankNum" type="number" class="center" placeholder="请输入银行卡号码"/>
        </li>
      </ul>

      <!--提现金额-->
      <ul class="list-2">
        <li class="item clearfix">
          <span class="left">提现金额</span>
          <input v-model="getMoney" type="number" class="center" placeholder="请输入金额"/>
        </li>
        <li class="item clearfix">
          <span class="left">&yen;{{getMoney}}</span>
        </li>
      </ul>

      <div class="hint">
        <p class="hint-text">(我们将在3个工作内完成对账、打款)</p>
      </div>

      <div class="affirm-btn">
        <a :disabled="disabled" @click="verifyFn">确认</a>
      </div>

    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"
  import $ from "jquery"

  export default {
    data() {
      return {
        name: "",
        bankNum: "",
        isBankNum: false,
        getMoney: "",
        disabled: false,
        bankList: ["中国农业银行", "中国建设银行", "中国工商银行", "招商银行", "中国银行", "中国邮政储蓄银行", "交通银行", "中国民生银行"],
        myBalance: "",
        cashAmount: "",
      }
    },
    mounted() {
      this.selectDefault();
      this.getMyBalance();
    },
    watch: {
      bankNum(val) {
        this.isBankNum = /^(\d{16}|\d{19})$/.test(val);
      },
      getMoney(val) {
        if (parseInt(val) > this.myBalance) {
          con.toast("余额不足")
        } else {
          con.toast("当前可提现余额为：" + this.myBalance + "元");
          this.cashAmount = val;
        }
      }
    },
    methods: {
      /**
       *  清空select的初始值
       */
      selectDefault() {
        $(".select-bank")[0].selectedIndex = -1;
      },
      /**
       *  获取可提现的余额数
       */
      getMyBalance() {
        if (location.href.split("?") !== -1) {
          this.myBalance = window.location.href.split("?")[1].split("=")[1];
        }
      },
      /**
       * 确认提交
       */
      verifyFn() {
        let selectVal = $('#select-bank option:selected').text();//获取选中的option的文本值
        if (this.name) {
          if (selectVal) {
            if (this.bankNum) {
              if (this.isBankNum) {
                if (this.cashAmount) {
                  if (this.disabled === false) {
                    con.post("/api/cash/apply", {
                      "bankNumber": this.bankNum,
                      "bankName": selectVal,
                      "bankBelong": this.name,
                      "cashAmount": this.cashAmount
                    }, (response) => {
                      if (response.result === 1) {
                        con.toast("提现成功");
                        this.$router.push("/record");
                        setTimeout(() => {
                          this.disabled = true;
                        }, 100)
                      } else {
                        con.toast(response.msg);
                      }
                    })
                  } else {
                    con.toast("请勿重复提交,30秒后再试");
                    setTimeout(() => {
                      this.disabled = false;
                    }, 1000 * 30)
                  }
                } else {
                  con.toast("请输入提现金额");
                }
              } else {
                con.toast("银行卡号有误，请检查后重新填写");
              }
            } else {
              con.toast("请填写银行卡号");
            }
          } else {
            con.toast("请选择银行");
          }
        } else {
          con.toast("请填写持卡人姓名");
        }
      }
    },
  }
</script>

<style scoped lang="less">
  #withdraw {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }

  .content {
    width: 100%;

    .list-1, .list-2 {
      width: 100%;
      background: #fff;
    }

    .item {
      padding: 0 0.4rem;
      width: 100%;
      height: 1.066666rem;
      line-height: 1.066666rem;
      border-bottom: 1px solid #f5f5f5;
      font-size: 0.373333rem;
      display: flex;
      align-items: center;
      /*position: relative;*/

      .selectBox {
        margin-left: 0.746666rem;
        width: 510/75rem;
        border: none;
        outline: none;
        padding-left: 20/75rem;
      }
    }

    .left {
      color: #333;
      display: inline-block;
      width: 1.633333rem;
      white-space: nowrap;
    }
    .center {
      color: #333;
      margin-left: 0.7rem;
    }
    .right {
      position: absolute;
      right: 30/75rem;
      width: 0.266666rem;
      height: 0.16rem;
      background: url(../../assets/web/arrow_down.png) 0 0 no-repeat;
      background-size: cover;
      margin-top: 0.466666rem;
    }
    #select-bank {
      width: 80%;
      height: 100%;
      outline: none;
      border: none;
      padding-left: 55/75rem;
      color: #333;

      /*很关键：将默认的select选择框样式清除*/
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;

      /*在选择框的最右侧中间显示小箭头图片*/
      background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;

      /*为下拉小箭头留出一点位置，避免被文字覆盖*/
      padding-right: 14px;
      /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
      &::-ms-expand {
        display: none;
      }
    }

    .list-2 {
      margin-top: 0.8rem;
    }

    .hint {
      width: 100%;
      padding: 0.266666rem 0.4rem;

      .hint-text {
        font-size: 0.32rem;
        color: #333;
      }
    }

    .affirm-btn {
      width: 100%;
      padding: 0.4rem;
      a {
        display: block;
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        color: #fff;
        border-radius: 0.133333rem;
        -webkit-border-radius: 0.133333rem;
        background: #c63535;
      }
    }
  }

</style>
