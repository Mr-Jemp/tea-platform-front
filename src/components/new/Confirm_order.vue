<template>
  <div id="confirm_order">
    <!--头部-->
    <header class="header">
      <a onclick="localStorage.removeItem('shop'); history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">确认订单</span>
    </header>

    <!---->
    <section class="content">
      <!--收货地址存在-->
      <div v-if="hasAddress" class="address">
        <router-link to="/shop_address">
          <div class="user-info">
            <i></i>
            <span class="name">{{addressList.name}}</span>
            <span class="phone-num">{{addressList.processed}}</span>
          </div>
          <div class="address-info">
            <ul class="clearfix">
              <li>地址：</li>
              <li>{{addressList.address}}</li>
              <li>
                <a><i></i></a>
              </li>
            </ul>
          </div>
        </router-link>
      </div>

      <!--收货地址不存在-->
      <div v-else class="not-address">
        <div class="user-info">
          <router-link v-if="isLogin" to="/shop_address">
            <span>
              <i class="icon-address"></i>
              <span class="edit-text">请填写收货地址</span>
            </span>
            <i class="icon-right"></i>
          </router-link>
          <a v-else @click="tips">
            <span>
              <i class="icon-address"></i>
              <span class="edit-text">请填写收货地址</span>
            </span>
            <i class="icon-right"></i>
          </a>
        </div>
      </div>

      <!--单品购买-->
      <div v-if="carShop == false" class="wrap">
        <div class="commodity clearfix">
          <router-link :to="'/details?id='+buyShop.pid">
            <div class="img">
              <a><img :src="buyShop.img"/></a>
            </div>
            <div class="text-box">
              <a>
                <p class="text1">{{buyShop.name}}</p>
                <p class="text2">{{buyShop.firstStand}} {{buyShop.secondStand}}</p>
                <p class="text3">&yen;{{buyShop.original}}</p>
                <p class="text4 clearfix">
                  <span class="price">&yen;{{buyShop.price}}</span>
                  <span class="num">×{{buyShop.count}}</span>
                </p>
              </a>
            </div>
          </router-link>
        </div>
      </div>

      <!--购物车列表-->
      <div v-else v-for="item in carList" class="wrap">
        <div class="commodity clearfix">
          <router-link :to="'/details?id='+item.pid">
            <div class="img">
              <a><img :src="item.src"/></a>
            </div>
            <div class="text-box">
              <a>
                <p class="text1">{{item.name}}</p>

                <p class="text2">{{item.firstStand}} {{item.secondStand}}</p>
                <p class="text3">&yen;{{item.price}}</p>
                <p class="text4 clearfix">
                  <span class="price">&yen;{{item.original}}</span>
                  <span class="num">×{{item.count}}</span>
                </p>
              </a>
            </div>
          </router-link>
        </div>
      </div>

      <!--配送方式-->
      <ul class="shipping-policy">
        <li class="clearfix">
          <a>
            <span class="left-text">配送方式</span>
            <span class="right-text" v-if="showFee">快递 ¥ {{fee}}</span>
            <span class="right-text" v-else>快递  {{discount}}积分</span>
          </a>
        </li>
        <li class="clearfix">
          <a>
            <span class="left-text">买家留言</span>
            <input v-model="message" type="text" class="right-text" placeholder="选填，对本次交易的说明">
          </a>
        </li>
        <li v-if="ifDiscount" class="clearfix">
          <a>
            <span class="left-text">积分抵扣运费</span>
            <span class="right-text">{{discount}}积分<i @click="checked($event)" class="checkbox"></i></span>
          </a>
        </li>
      </ul>

    </section>

    <!--提交订单-->
    <footer class="footer">
      <div class="order-total">
        <span class="count">共{{totalCount}}件，合计：
          <span class="price">&yen;{{sum}}</span>
        </span>
      </div>
      <a @click="sumbitOrder" class="sumbit-order">提交订单</a>
    </footer>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"
  import $ from "jquery"

  let obj;
  let param;
  export default {
    data() {
      return {
        isLogin: false,
        hasAddress: false,
        fixedAddress: {},
        addressList: {
          id: "",
          name: "",
          phone: "",
          processed: "",
          address: ""
        },
        buyShop: {
          id: "",
          count: "",//购买数量
          name: "",
          firstStand: "",//商品第二属性
          secondStand: "",
          firstStandId: "",//商品第二属性id
          repertory: "",//库存
          original: "",//商品原价
          price: "",//商品当前价格
          img: "",
          pid: "",
        },
        totalCount: "",
        fee: "",
        feeReachFree: "",
        discount: "",
        ifDiscount: true,
        checkeds: false,
        message: "",
        carShop: false,
        carList: [],
        productList: [],
        accumulatePoints: '',
        showFee: true,
        discountUse: "",
        orderId: "",
        userDiscount: "",
        disable: true,
      }
    },
    computed: {
      sum() {
        let total = 0;
        if (this.carList.length !== 0) {
          for (let i = 0; i < this.carList.length; i++) {
            total += this.carList[i].original * this.carList[i].count;
          }
          if (this.ifDiscount && this.checkeds) {
            return total + "+" + this.discount + "积分";
          } else {
            return total + this.fee;
          }
        } else {
          if (this.ifDiscount && this.checkeds) {
            return total = (this.buyShop.count * this.buyShop.price) + "+" + this.discount + "积分";
          } else {
            return total = (this.buyShop.count * this.buyShop.price) + this.fee;
          }
        }
      },
    },
    mounted() {
      this.getLoginStatus();
      if (!sessionStorage.getItem("info")) {
        this.getfiexdAddress();
      }
      this.getAddress();
      this.getBuyShop();
      this.getMyIntegral();
    },
    methods: {
      /**
       * 获取登录状态
       */
      getLoginStatus() {
        con.get("/api/my/info", (response) => {
          if (response.result === 1) {
            this.isLogin = true;
            this.userDiscount = response.data.accumulatePoints;
          } else {
            con.toast("登录失败，请重新登录", "center");
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000)
          }
        })
      },
      /**
       * 获取默认地址
       */
      getfiexdAddress() {
        let address;
        con.get("/api/orderAddress/list", (response) => {
          if (response.result === 1) {
            address = response.data.addressList;
            for (let i = 0; i < address.length; i++) {
              if (address[i].fixed === 1) {
                this.addressList.id = address[i].id;
                this.addressList.name = address[i].linkman;
                this.addressList.phone = address[i].linkmanMobile;
                this.addressList.processed = this.addressList.phone.substring(0, 3) + "****" + this.addressList.phone.substring(7);
                this.addressList.address = address[i].province + address[i].city + address[i].district + address[i].address;
                this.hasAddress = true;
              }
            }
          }
        })
      },
      /**
       * 获取收货地址
       */
      getAddress() {
        let address = sessionStorage.getItem("info");
        if (address) {
          let obj = (new Function('return' + address))();
          this.hasAddress = true;
          this.addressList.id = obj.id;
          this.addressList.name = obj.name;
          this.addressList.phone = obj.phone;
          this.addressList.processed = this.addressList.phone.substring(0, 3) + "****" + this.addressList.phone.substring(7);
          this.addressList.address = obj.address;
        }
      },
      /**
       * 获取购买商品的信息
       */
      getBuyShop() {
        let url = window.location.href;
        if (url.indexOf("?") !== -1) {//判断参数是否存在，存在则是单品购买
          let obj = con.urlToObj(url);
          this.buyShop.id = obj.id;
          this.buyShop.count = obj.count;//购买数量
          this.buyShop.name = decodeURI(obj.name);
          this.buyShop.firstStand = decodeURI(obj.firstStand);//商品第二属性
          this.buyShop.secondStand = decodeURI(obj.secondStand);//商品第二属性
          this.buyShop.firstStandId = obj.firstStandId;//商品第二属性id
          this.buyShop.repertory = obj.repertory;//库存
          this.buyShop.original = obj.original;//商品原价
          this.buyShop.price = obj.price;//商品当前价格
          this.buyShop.pid = obj.pid;
          this.totalCount = this.buyShop.count;
          con.get("/api/product/detail?id=" + this.buyShop.pid, (response) => {
            if (response.result === 1) {
              this.buyShop.img = response.data.coverImg;
            }
          })
        } else {//购物车购买
          this.carShop = true;
          let obj = JSON.parse(localStorage.getItem("shop"));
          this.carList = obj;
        }
      },
      /**
       * 获取积分运费信息
       */
      getMyIntegral() {
        con.get("/api/order/freight", (response) => {
          if (response.result === 1) {
            this.feeReachFree = response.data.expressFee.feeReachFree;
            this.discount = response.data.expressFee.discount;
            this.accumulatePoints = response.data.accumulatePoints;
            this.fee = response.data.expressFee.fee;
            this.fn();
          }
        })
      },

      fn() {
        if (this.feeReachFree <= 0) {
          //不满减
          if (this.discount <= 0) {
            this.ifDiscount = false;
          } else {
            this.ifDiscount = true;
          }
          this.discountUse = 0;
        } else {
          //满减
          if (this.sum >= this.feeReachFree) {//免邮
            this.fee = 0;
            this.ifDiscount = false;
            this.discountUse = 0;
          } else {
            //不免邮
            if (this.discount > 0) {//是否允许积分抵扣运费
              this.ifDiscount = true;
              this.discountUse = 1;
              $(".right-text i").removeClass("checkbox").addClass("checked");
              this.checkeds = true;
              if (this.accumulatePoints >= this.discount) {
                this.showFee = false;
              }
            } else {//不允许
              this.ifDiscount = false;
              this.discountUse = 0;
            }
          }
        }
      },
      checked(e) {
        if ($(e.target).attr("class") === "checkbox") {
          $(e.target).removeClass("checkbox").addClass("checked");
          this.checkeds = true;
          this.discountUse = 1;
          this.showFee = false;
        } else {
          $(e.target).removeClass("checked").addClass("checkbox");
          this.checkeds = false;
          this.discountUse = 0;
          this.showFee = true;
        }
      },
      tips() {
        con.toast("请先登录");
      },
      /**
       * 提交订单
       */
      sumbitOrder() {
        if (this.disable) {
          this.disable = false;
          if (this.isLogin && this.hasAddress) {
            let url = window.location.href;
            if (url.indexOf("?") !== -1) {//单品购买
              let obj1 = {};
              obj1.id = this.buyShop.firstStandId;
              obj1.quantity = this.buyShop.count;
              this.getDiscount(obj1);
            } else {//购物车
              let obj2;
              let carShop = [];
              for (let i = 0; i < this.carList.length; i++) {
                obj2 = {};
                obj2["id"] = this.carList[i].id;
                obj2["quantity"] = this.carList[i].count;
                carShop.push(obj2);
              }
              this.getDiscount(carShop);
              setTimeout(() => {
                this.disable = true;
              }, 500)
            }
          } else {
            con.toast("请填写收货地址", "center");
          }
        } else {
          con.toast("请勿重复提交");
        }
      },
      requestPost(discountUse, product) {
        con.post("/api/order/commit", {
          "discountUse": discountUse,
          "addressId": this.addressList.id,
          "message": this.message,
          "productSecondTypeList": product
        }, (response) => {
          if (response.result === 1) {
            this.orderId = response.data.orderId;
            con.toast("提交成功,即将跳转支付", "center");
            try {
              console.log(product);
              console.log(JSON.stringify(product));
              localStorage.setItem("param", JSON.stringify(product));//将提交的商品保存起来遍历购物车便于删除
              this.clearShopCar();
            } catch (e) {
              alert(e);
            }
            setTimeout(() => {
              this.$router.push("/select_pay?id=" + this.orderId);
            }, 500)
          } else {
            con.toast((this.errInfo(response.data.note)), "center");
          }
        })
      },
      /**
       * 提交失败的返回信息
       * @param num 根据num值判断
       * @returns {*} 返回的错误信息
       */
      errInfo(num) {
        if (num === 1) {
          return "商品购买数量有误";
        } else if (num === 2) {
          return "商品已下架";
        } else if (num === 3) {
          return "不在购买时间段";
        } else if (num === 4) {
          return "商品库存不足";
        } else if (num === 5) {
          return "积分不足";
        }
      },
      /**
       * 是否使用积分
       */
      getDiscount(obj) {
        let car = obj instanceof Array;
        this.productList = [];
        if (this.discountUse === 0) {//不使用积分
          this.productList.push(obj);
          if (car) {//购物车
            this.requestPost(this.discountUse, obj);
          } else {//单品
            this.requestPost(this.discountUse, this.productList);
          }
        } else {
          if (this.userDiscount >= this.discount) {
            this.productList.push(obj);
            if (car) {//购物车
              this.requestPost(this.discountUse, obj)
            } else {//单品
              this.requestPost(this.discountUse, this.productList);
            }
          } else {
            con.toast("积分不足", "center");
          }
        }
      },
      /**
       * 清空购物车
       */
      clearShopCar() {
        try {
          obj = JSON.parse(localStorage.good);
          param = JSON.parse(localStorage.param);
          obj.map((item, index) => {
            param.forEach((value, i) => {
              if (obj[index].id === param[i].id) {
                obj.splice(index, 1);
                localStorage.setItem("good", JSON.stringify(obj));//替换购物车列表
              }
            })
          });
        } catch (e) {

        }
      }
    }
  }
</script>

<style scoped lang="less">
  #confirm_order {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }

  .content {
    width: 100%;

    .address {
      display: block;
      width: 100%;
      min-height: 1.066666rem;
      background: #fff;
      padding: 0.333333rem 0.4rem;
      font-style: normal;
      margin-bottom: 0.133333rem;

      .user-info {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        margin-bottom: 0.2rem;
        color: #333;

        i {
          display: inline-block;
          width: 0.32rem;
          height: 0.4rem;
          background: url(../../assets/web/icon_position.png) 0 0 no-repeat;
          background-size: cover;
        }

        .name {
          padding: 0 0.666666rem 0 0.266666rem;
        }
      }

      .address-info {
        padding-left: 0.6rem;

        ul {
          font-size: 0.32rem;
          color: #666;
          li {
            float: left;

            &:nth-of-type(2) {
              width: 7rem;
            }
            &:nth-of-type(3) {
              float: right;
            }
          }
          i {
            display: inline-block;
            width: 0.16rem;
            height: 0.266666rem;
            background: url(../../assets/web/btn_arrow_right.png) 0 0 no-repeat;
            background-size: cover;
          }
        }
      }

    }

    .not-address {
      display: block;
      width: 100%;
      min-height: 1.066666rem;
      background: #fff;
      padding: 0.333333rem 0.4rem;
      font-style: normal;
      margin-bottom: 0.133333rem;

      .user-info {
        a {
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          justify-content: space-between;
          -webkit-justify-content: space-between;
          color: #333;
          > span {
            width: 50%;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
          }
        }

        .edit-text {
          font-size: 0.346666rem;
          color: #333;
          margin-left: 0.266666rem;
        }
        i.icon-address {
          display: inline-block;
          width: 0.32rem;
          height: 0.4rem;
          background: url(../../assets/web/icon_position.png) 0 0 no-repeat;
          background-size: cover;
        }
        i.icon-right {
          display: inline-block;
          width: 0.16rem;
          height: 0.266666rem;
          background: url(../../assets/web/btn_arrow_right.png) 0 0 no-repeat;
          background-size: cover;
        }
      }
    }

    .wrap {
      width: 100%;
      /*margin-bottom: 0.013333rem;*/
      background: #f5f5f5;

      .commodity {
        min-height: 2.666666rem;
        width: 100%;
        background: #fff;
        margin-bottom: 0.04rem;
        padding: 0.133333rem 0.4rem;
      }

      .img {
        width: 2.333333rem;
        height: 2.333333rem;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .text-box {
        width: 6.533333rem;
        float: right;
        font-size: 0.32rem;

        a {
          display: block;
          width: 100%;
          height: 100%;
        }

        .text1 {
          color: #333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          line-height: 0.44rem;
          min-height: .8rem;
        }
        .text2 {
          color: #666;
          padding: 0.266666rem 0;
        }
        .text3 {
          text-decoration: line-through;
          color: #666;
          padding-bottom: 0.026666rem;
        }
        .price {
          font-weight: 600;
          font-size: 0.346666rem;
          color: #c64545;
        }
        .num {
          float: right;
          color: #666;
        }

      }
    }

    .shipping-policy {
      width: 100%;

      li {
        width: 100%;
        height: 1.066666rem;
        background: #fff;
        padding: 0 0.4rem;
        margin-bottom: 0.04rem;

        .left-text, .right-text {
          padding-top: 0.373333rem;
        }
        .left-text {
          float: left;
          font-size: 0.346666rem;
        }

        .right-text {
          float: right;
          font-size: 0.32rem;
        }
        input.right-text {
          width: 330/75rem;
          text-align: right;
        }
        .gray {
          color: #999;
        }

        .checkbox {
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          background: url(../../assets/web/bg_checkbox_normal.png) 0 0 no-repeat;
          background-size: cover;
          vertical-align: text-bottom;
          margin-left: 0.266666rem;
        }
        .checked {
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          background: url(../../assets/web/checkbox_checked.png) 0 0 no-repeat;
          background-size: cover;
          vertical-align: text-bottom;
          margin-left: 0.266666rem;
        }
      }
    }

  }

  .footer {
    width: 100%;
    max-width: 600px;
    height: 88/75rem;
    background: #fff;
    padding-left: 30/75rem;
    position: fixed;
    bottom: 0;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    .count {
      font-size: 26/75rem;
      color: #333;
      .price {
        font-size: 28/75rem;
        color: #c63535;
        font-weight: 600;
      }
    }
    .sumbit-order {
      display: block;
      width: 220/75rem;
      height: 100%;
      background-color: #c63535;
      color: #fff;
      text-align: center;
      line-height: 88/75rem;
    }
  }

</style>
