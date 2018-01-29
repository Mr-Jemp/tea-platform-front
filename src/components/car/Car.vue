<template>
  <div id="car">
    <!--头部-->
    <header class="car-header">
      <div class="head clearfix">
        <a onclick="history.back()">
          <i class="back-pre"></i>
        </a>
        <span class="title">购物车</span>
        <span @click="editor($event)" class="editor">编辑</span>
      </div>
    </header>

    <!--商品列表-->
    <section class="commodity">
      <ul v-if="shopList.length != 0 && isLogin" class="list">
        <li v-for="(item, index) in shopList" class="item" :id="item.id">
          <div class="child">
            <input @click="checkedShop($event, index)" type="button" class="checkbox">
            <div class="img">
              <router-link :to="'/details?id='+item.pid">
                <a><img :src="item.src"/></a>
              </router-link>
            </div>
            <div class="text-box">
              <router-link :to="'/details?id='+item.pid">
                <p class="text1">
                  <a>{{item.name}}</a>
                </p>
              </router-link>
              <p class="text2">{{item.firstStand}} {{item.secondStand}}</p>
              <p class="text3">&yen;{{item.price}}</p>
              <div class="text4">
                <span class="price">&yen;{{item.original}}</span>
                <ul class="num-count clearfix">
                  <li @click="subtract(index)" class="subtract">-</li>
                  <li class="num">{{item.count}}</li>
                  <li @click="addition(index)" class="addition">+</li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="no-shop" v-else>暂无商品,快去添加吧！</div>
    </section>

    <!--结算-->
    <div class="close-count">
      <div class="check">
        <input @click="getAllShop($event)" type="button" class="checkbox"/>
        <span class="all-check">全选</span>
      </div>
      <div class="total">合计：<span class="price">&yen;{{countPrice}}</span></div>
      <div class="count">
        <a @click="goClose" v-if="isEdit == false" class="count-price">去结算({{countNum}})</a>
        <a v-else @click="deleteShop" class="count-price">删除</a>
      </div>
    </div>

    <!--底部固定导航-->
    <my-nav :current="3"></my-nav>
  </div>
</template>

<script>
  import {con} from "../../assets/js/common"
  import $ from "jquery"
  import index from "../../router/index";

  let num = 0;
  let arr = [];
  export default {
    name: 'car',
    data() {
      return {
        shopList: [],
        countNum: 0,
        countPrice: 0,
        isChecked: false,
        isEdit: false,
        isLogin: false,
      }
    },
    created() {
      this.getLoginStatus(this.getCarShop);
    },
    mounted() {
//      this.getCarShop();
      arr = [];//默认清空数组，防止从确认订单页返回的时候arr还带了值导致第二次点击商品订单重复
    },
    methods: {
      getLoginStatus(callback) {
        con.get("/api/my/index", (response) => {
          if (response.result === 1) {
            this.isLogin = true;
            callback();
          } else {
            con.toast("未登录，请先登录");
            setTimeout(() => {
              this.$router.replace("/login");
            }, 1000)
          }
        })
      },
      /**
       * 获取购物车商品列表
       */
      getCarShop() {
        if (this.isLogin) {
          let obj = JSON.parse(localStorage.getItem("good"));
          this.shopList = obj || [];
        }
      },
      /**
       * 获取选中的商品
       * @param e 当前点击的元素
       * @param index
       */
      checkedShop(e, index) {
        let ele = e.target;
        let $ele = $(ele);
        if ($ele.hasClass("checked")) {
          //删除
          $ele.removeClass("checked").addClass("checkbox");
          let id = this.shopList[index]['id'];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i]['id'] === id) {
              $(".check > input").removeClass("checked").addClass("checkbox");
              this.countNum -= 1;
              this.countPrice -= arr[i]["original"] * arr[i]["count"];
              arr.splice(i, 1);
              break;
            }
          }
        } else {
          //添加
          $ele.removeClass("checkbox").addClass("checked");
          arr.push(this.shopList[index]);
          this.countNum += 1;
          this.countPrice += arr[arr.length - 1]["original"] * arr[arr.length - 1]["count"];
          if (arr.length === this.shopList.length) {
            $(".check > input").removeClass("checkbox").addClass("checked");
          }
        }
      },
      /**
       * 选择所有商品
       */
      getAllShop(e) {
        let $ele = $(e.target);
        if ($ele.hasClass("checkbox")) {
          $ele.removeClass("checkbox").addClass("checked");

          let allCheck = $(".child input");
          allCheck.removeClass("checkbox").addClass("checked");
          this.countNum = allCheck.length;

          for (let i = 0; i < this.shopList.length; i++) {
            arr[i] = this.shopList[i];
          }

          let price = 0;
          for (let i = 0; i < this.shopList.length; i++) {
            price += this.shopList[i].original * this.shopList[i].count;
          }
          this.countPrice = Math.floor(price * 100) / 100;
        } else {
          $(e.target).removeClass("checked").addClass("checkbox");
          $(".child input").removeClass("checked").addClass("checkbox");
          this.countPrice = 0;
          this.countNum = 0;
          arr = [];
        }
      },
      /**
       * 编辑
       * @param e
       */
      editor(e) {
        num++;
        if (num % 2 === 1) {
          //编辑
          e.target.innerText = "完成";
          this.isEdit = true;
        } else {
          //完成
          e.target.innerText = "编辑";
          this.isEdit = false;
          if (arr.length >= 0) { //完成以后清空
            arr = [];
            this.countNum = 0;
            this.countPrice = 0;
            $(".child input").removeClass("checked").addClass("checkbox");
            $(".check > input").removeClass("checked").addClass("checkbox");
          }
        }
      },
      /**
       * 结算
       */
      goClose() {
        if (arr.length === 0) {
          con.toast("请选择您要购买的产品", 'center');
        } else {
          let status = [];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].count <= 0) {
              status.push(false)
            } else {
              status.push(true)
            }
          }

          for (let j = 0; j < status.length; j++) {
            if (status.indexOf(false) === -1) {
              localStorage.removeItem("shop");
              localStorage.setItem("shop", JSON.stringify(arr));
              this.$router.push("/confirm_order");
            } else {
              con.toast("请选择商品购买数量,如您不想购买该商品，请取消选择", "center");
            }
          }
        }
      },
      /**
       * 删除商品
       */
      deleteShop() {
        if (this.shopList.length === arr.length) {
          this.shopList = [];
          arr = [];
          this.countPrice = 0;
          $(".check > input").removeClass("checked").addClass("checkbox");
        } else {
          let id;
          let index;

          for (let i = arr.length - 1; i >= 0; i--) {
            id = arr[i]["id"];

            for (let i = 0; i < this.shopList.length; i++) {
              if (this.shopList[i]['id'] === id) {
                index = i;
              }
            }
            if (index !== -1) {
              this.countPrice -= arr[i]['original'] * arr[i]['count'];

              this.shopList.splice(index, 1);
              arr.splice(i, 1);
              $(".child input").removeClass("checked").addClass("checkbox");
            }
          }
        }

        localStorage.setItem("good", JSON.stringify(this.shopList));
      },
      /**
       * 减去购买数量
       */
      subtract(index) {
        let price = 0;
        let now = 0;
        if (arr.length <= 1) {
          if (this.shopList[index].count > 0) {
            this.shopList[index].count--;
            localStorage.setItem("good", JSON.stringify(this.shopList));
          } else {
            con.toast("不能再减了哦", "center")
          }
          if (arr.length === 1) {
            if (arr[0].original) {
              this.countPrice = Math.floor((arr[0].original * arr[0].count) * 100) / 100;
            }
          }
        } else {
          for (let i = 0; i < arr.length; i++) {
            if (i === index && arr[index].count > 0) {
              arr[i].count--;
              now = Math.floor((arr[i].original * arr[i].count) * 100) / 100;
            } else {
              price += Math.floor((arr[i].original * arr[i].count) * 100) / 100;
            }
            localStorage.setItem("good", JSON.stringify(this.shopList));
          }
          this.countPrice = Math.floor((price + now) * 100) / 100;
        }
      },
      /**
       * 增加购买数量
       */
      addition(index) {
        let price = 0;
        let now = 0;
        if (arr.length <= 1) {
          this.shopList[index].count++;
          localStorage.setItem("good", JSON.stringify(this.shopList));
          if (arr.length === 1) {
            if (arr[0].original) {
              this.countPrice = Math.floor((arr[0].original * arr[0].count) * 100) / 100;
            }
          }
        } else {
          for (let i = 0; i < arr.length; i++) {
            if (i === index) {
              arr[i].count++;
              now = Math.floor((arr[i].original * arr[i].count) * 100) / 100;
            } else {
              price += Math.floor((arr[i].original * arr[i].count) * 100) / 100;
            }
            localStorage.setItem("good", JSON.stringify(this.shopList));
          }
          this.countPrice = Math.floor((price + now) * 100) / 100;
        }
      },
    }
  }

</script>

<style scoped lang="less">
  #car {
    padding-bottom: 180/75rem;
  }

  /*公用*/
  .price {
    width: 1.866666rem;
    font-size: 0.35rem;
    font-weight: 600;
    color: #c63535 !important;
  }

  .car-header {
    width: 100%;
    height: 1.173333rem;
    background: #303030;
    color: #fff;
    padding: 0.333333rem 0.4rem;
    position: relative;

    .head {
      height: 100%;
      width: 100%;
      text-align: center;
    }
    a {
      display: inline-block;
      width: 150/75rem;
      height: 100%;
      position: absolute;
      left: -30/75rem;
      top: 0;
      padding-top: 30/75rem;
    }
    .back-pre {
      display: inline-block;
      width: 0.24rem;
      height: 0.426666rem;
      background: url(../../assets/web/btn_arrow_back2.png) 0 0 no-repeat;
      background-size: cover;
    }
    .title {
      font-size: 0.48rem;
      margin-left: 30/75rem;
    }

    .editor {
      font-size: 0.4rem;
      float: right;
      padding-top: 0.08rem;
    }

  }

  .checked {
    width: 0.48rem;
    height: 0.48rem;
    background: url(../../assets/web/checkbox_checked.png) 0 0 no-repeat;
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
    position: absolute;
  }

  .no-shop {
    text-align: center;
    padding-top: 200/75rem;
    color: #333;
  }

  .commodity {
    width: 100%;
    min-height: 90vh;
    background: #f5f5f5;

    .list {
      width: 100%;
    }

    .item {
      width: 100%;
      height: 3.2rem;
      background: #fff;
      margin-bottom: 0.213333rem;
      padding: 0.4rem;
    }

    .child {
      position: relative;
      width: 100%;
      height: 100%;

      .checkbox {
        left: 0;
        width: 0.48rem;
        height: 0.48rem;
        background: url(../../assets/web/checkBox.png) 0 0 no-repeat;
        background-size: cover;
        display: block;
      }
      .checked {
        top: 70/75rem !important;
      }
      /*.checkbox:checked{
        background: url(../../assets/web/checkbox_checked.png) 0 0 no-repeat;
        background-size: cover;
      }*/

      .checkbox, .img, .text-box {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
      }

      .img {
        width: 2.4rem;
        height: 2.4rem;
        border: 1px solid #e5e5e5;
        left: 0.866666rem;
        border-radius: 0.133333rem;
        -webkit-border-radius: 0.133333rem;
        -moz-border-radius: 0.133333rem;
        text-align: center;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
        img {
          width: 2.4rem;
          height: 2.4rem;
        }
      }

      .text-box {
        left: 3.533333rem;
        width: 5.666666rem;
        height: 100%;

        .text1 {
          font-size: 0.346666rem;
          min-height: 65/75rem;
          color: #333;
          margin-bottom: 0.266666rem;
        }
        .text2 {
          font-size: 0.293333rem;
          color: #666;
          margin-bottom: 0.266666rem;
        }
        .text3 {
          font-size: 0.293333rem;
          color: #999;
          text-decoration: line-through;
        }
        .text4 {
          position: relative;
          .num-count {
            min-width: 2.266666rem;
            min-height: 0.4rem;
            position: absolute;
            right: 0;
            bottom: 0;

            li {
              float: left;
              line-height: 0.6rem;
            }

            .subtract, .addition {
              width: 0.6rem;
              height: 0.6rem;
              background: #ccc4a6;
              border-radius: 0.066666rem;
              -webkit-border-radius: 0.066666rem;
              -moz-border-radius: 0.066666rem;
              text-align: center;
              color: #fff;
            }
            .num {
              padding: 0 0.3rem;
            }

          }

        }

      }

    }

  }

  .close-count {
    width: 100%;
    max-width: 600px;
    height: 1.173333rem;
    background: #fff;
    padding: 0 0 0 0.4rem;
    position: fixed;
    bottom: 1.306666rem;
    border: 1px solid #e3e5e9;

    .check {
      width: 1.4rem;
      height: 100%;
      line-height: 1.173333rem;
      position: absolute;
      .checked {
        position: relative;
      }
    }
    .all-check {
      font-size: 0.3rem;
      color: #666;
    }
    .checkbox {
      width: 0.48rem;
      height: 0.48rem;
      background: url(../../assets/web/checkBox.png) 0 0 no-repeat;
      background-size: cover;
      display: inline-block;
      vertical-align: text-bottom;

    }


    .total {
      position: absolute;
      left: 2.52rem;
      height: 100%;
      line-height: 1.173333rem;
    }

    .count {
      position: absolute;
      right: 0;
      width: 2.933333rem;
      height: 100%;
      text-align: center;
      background: #c63535;
      a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 1.173333rem;
      }
      .count-price {
        color: #fff;
        font-size: 0.4rem;
      }
    }

  }

</style>
