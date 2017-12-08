<template>
  <div id="my-order">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">我的订单</span>
    </header>

    <!--顶部导航-->
    <nav class="nav">
      <ul>
        <li>
          <a :class="{'active': type == 1}" @click="type = 1;getOrderList(type);">全部</a>
        </li>
        <li>
          <a :class="{'active': type == 2}" @click="type = 2;getOrderList(type)">待付款</a>
        </li>
        <li>
          <a :class="{'active': type == 3}" @click="type = 3;getOrderList(type)">待收货</a>
        </li>
        <li>
          <a :class="{'active': type == 4}" @click="type = 4;getOrderList(type)">待评价</a>
        </li>
        <li>
          <a :class="{'active': type == 5}" @click="type = 5;getOrderList(type)">售后</a>
        </li>
      </ul>
    </nav>

    <!--全部订单列表-->
    <section v-show="type == 1" class="order-list">
      <div v-for="(item, index) in allOrderList" class="wrap">
        <!--待付款-->
        <div v-if="item.payStatus === 0">
          <!--订单号-->
          <div class="order-num">
            <span class="id">订单号：{{item.outTradeNo}}</span>
            <span class="status">待付款</span>
          </div>
          <!--订单详情-->
          <router-link :to="'/order_detail?id='+item.id">
            <div class="order-detail clearfix">
              <div class="left">
                <a>
                  <img :src="item.productList[0].coverImg"/>
                </a>
              </div>
              <ul class="right">
                <li>
                  <a class="text-1">{{item.productList[0].name}}</a>
                </li>
                <li class="text-2">{{item.productList[0].norms}}</li>
                <li class="text-3">{{item.productList[0].price}}</li>
                <li class="text-4">
                  <span class="price">{{item.productList[0].preferentialPrice}}</span>
                  <span class="count">x{{item.productList[0].quantity}}</span>
                </li>
              </ul>
            </div>
          </router-link>
          <!--合计-->
          <div class="total">
            共{{item.quantity}}件商品 合计：<span>&yen;{{item.payAmount + item.expressFee}}</span>（含运费￥{{item.expressFee}}.00）
          </div>
          <!--操作-->
          <div class="order-operate">
            <span @click="cancalOrder(item.id)" class="btn">取消订单</span>
            <router-link :to="'/select_pay?id='+item.id"><span class="btn">付款</span></router-link>
          </div>
        </div>
        <!--待发货-->
        <div v-else-if="item.payStatus === 1">
          <!--订单号-->
          <div class="order-num">
            <span class="id">订单号：{{item.outTradeNo}}</span>
            <span class="status">待发货</span>
          </div>
          <!--订单详情-->
          <router-link :to="'/order_detail?id='+item.id">
            <div class="order-detail clearfix">
              <div class="left">
                <a>
                  <img :src="item.productList[0].coverImg"/>
                </a>
              </div>
              <ul class="right">
                <li>
                  <a class="text-1">{{item.productList[0].name}}</a>
                </li>
                <li class="text-2">{{item.productList[0].norms}}</li>
                <li class="text-3">{{item.productList[0].price}}</li>
                <li class="text-4">
                  <span class="price">{{item.productList[0].preferentialPrice}}</span>
                  <span class="count">x{{item.productList[0].quantity}}</span>
                </li>
              </ul>
            </div>
          </router-link>
          <!--合计-->
          <div class="total">
            共{{item.quantity}}件商品 合计：<span>&yen;{{item.payAmount + item.expressFee}}</span>（含运费￥{{item.expressFee}}.00）
          </div>
          <!--操作-->
          <div class="order-operate">
            <span @click="requestReturn(item.id)" class="btn">申请退货</span>
          </div>
        </div>
        <!--待收货-->
        <div v-else-if="item.payStatus === 2">
          <!--订单号-->
          <div class="order-num">
            <span class="id">订单号：{{item.outTradeNo}}</span>
            <span class="status">已发货</span>
          </div>
          <!--订单详情-->
          <router-link :to="'/order_detail?id='+item.id">
            <div class="order-detail clearfix">
              <div class="left">
                <a>
                  <img :src="item.productList[0].coverImg"/>
                </a>
              </div>
              <ul class="right">
                <li>
                  <a class="text-1">{{item.productList[0].name}}</a>
                </li>
                <li class="text-2">{{item.productList[0].norms}}</li>
                <li class="text-3">{{item.productList[0].price}}</li>
                <li class="text-4">
                  <span class="price">{{item.productList[0].preferentialPrice}}</span>
                  <span class="count">x{{item.productList[0].quantity}}</span>
                </li>
              </ul>
            </div>
          </router-link>
          <!--合计-->
          <div class="total">
            共{{item.quantity}}件商品 合计：<span>&yen;{{item.payAmount + item.expressFee}}</span>（含运费￥{{item.expressFee}}.00）
          </div>
          <!--操作-->
          <div class="order-operate">
            <span @click="extendTheReceiving(item.id)" class="btn">延长收货</span>
            <span @click="requestReturn(item.id)" class="btn">申请退货</span>
            <span @click="seaLogistics(item.id)" class="btn">查看物流</span>
            <span @click="confirmReceipt(item.id)" class="btn">确认收货</span>
          </div>
        </div>
        <!--已收货-->
        <div v-else-if="item.payStatus === 3">
          <!--订单号-->
          <div class="order-num">
            <span class="id">订单号：{{item.outTradeNo}}</span>
            <span class="status">已发货</span>
          </div>
          <!--订单详情-->
          <router-link :to="'/order_detail?id='+item.id">
            <div class="order-detail clearfix">
              <div class="left">
                <a>
                  <img :src="item.productList[0].coverImg"/>
                </a>
              </div>
              <ul class="right">
                <li>
                  <a class="text-1">{{item.productList[0].name}}</a>
                </li>
                <li class="text-2">{{item.productList[0].norms}}</li>
                <li class="text-3">{{item.productList[0].price}}</li>
                <li class="text-4">
                  <span class="price">{{item.productList[0].preferentialPrice}}</span>
                  <span class="count">x{{item.productList[0].quantity}}</span>
                </li>
              </ul>
            </div>
          </router-link>
          <!--合计-->
          <div class="total">
            共{{item.quantity}}件商品 合计：<span>&yen;{{item.payAmount + item.expressFee}}</span>（含运费￥{{item.expressFee}}.00）
          </div>
          <!--操作-->
          <div class="order-operate">
            <span @click="requestReturn(item.id)" class="btn">申请退货</span>
            <span @click="goEvaluate(item.productList[index].id)" class="btn">评价</span>
          </div>
        </div>
        <!--交易关闭-->
        <div v-else-if="item.payStatus === 4">
          <!--订单号-->
          <div class="order-num">
            <span class="id">订单号：{{item.outTradeNo}}</span>
            <span class="status">交易关闭</span>
          </div>
          <!--订单详情-->
          <router-link :to="'/order_detail?id='+item.id">
            <div class="order-detail clearfix">
              <div class="left">
                <a>
                  <img :src="item.productList[0].coverImg"/>
                </a>
              </div>
              <ul class="right">
                <li>
                  <a class="text-1">{{item.productList[0].name}}</a>
                </li>
                <li class="text-2">{{item.productList[0].norms}}</li>
                <li class="text-3">{{item.productList[0].price}}</li>
                <li class="text-4">
                  <span class="price">{{item.productList[0].preferentialPrice}}</span>
                  <span class="count">x{{item.productList[0].quantity}}</span>
                </li>
              </ul>
            </div>
          </router-link>
          <!--合计-->
          <div class="total">
            共{{item.quantity}}件商品 合计：<span>&yen;{{item.payAmount + item.expressFee}}</span>（含运费￥{{item.expressFee}}.00）
          </div>
          <!--操作-->
          <div class="order-operate">
            <!--<span @click="deleteOrder(item.id)" class="btn">删除订单</span>-->
          </div>
        </div>
        <!--申请退款-->
        <div v-else-if="item.payStatus === 5">
          <!--订单号-->
          <div class="order-num">
            <span class="id">订单号：{{item.outTradeNo}}</span>
            <span class="status">申请退货</span>
          </div>
          <!--订单详情-->
          <router-link :to="'/order_detail?id='+item.id">
            <div class="order-detail clearfix">
              <div class="left">
                <a>
                  <img :src="item.productList[0].coverImg"/>
                </a>
              </div>
              <ul class="right">
                <li>
                  <a class="text-1">{{item.productList[0].name}}</a>
                </li>
                <li class="text-2">{{item.productList[0].norms}}</li>
                <li class="text-3">{{item.productList[0].price}}</li>
                <li class="text-4">
                  <span class="price">{{item.productList[0].preferentialPrice}}</span>
                  <span class="count">x{{item.productList[0].quantity}}</span>
                </li>
              </ul>
            </div>
          </router-link>
          <!--合计-->
          <div class="total">
            共{{item.quantity}}件商品 合计：<span>&yen;{{item.payAmount + item.expressFee}}</span>（含运费￥{{item.expressFee}}.00）
          </div>
          <!--操作-->
          <div class="order-operate">
            <span @click="cancelAppli(item.id)" class="btn">取消申请</span>
          </div>
        </div>
        <!--交易完成-->
        <div v-else-if="item.payStatus === 6">
          <!--订单号-->
          <div class="order-num">
            <span class="id">订单号：{{item.outTradeNo}}</span>
            <span class="status">交易完成</span>
          </div>
          <!--订单详情-->
          <router-link :to="'/order_detail?id='+item.id">
            <div class="order-detail clearfix">
              <div class="left">
                <a>
                  <img :src="item.productList[0].coverImg"/>
                </a>
              </div>
              <ul class="right">
                <li>
                  <a class="text-1">{{item.productList[0].name}}</a>
                </li>
                <li class="text-2">{{item.productList[0].norms}}</li>
                <li class="text-3">{{item.productList[0].price}}</li>
                <li class="text-4">
                  <span class="price">{{item.productList[0].preferentialPrice}}</span>
                  <span class="count">x{{item.productList[0].quantity}}</span>
                </li>
              </ul>
            </div>
          </router-link>
          <!--合计-->
          <div class="total">
            共{{item.quantity}}件商品 合计：<span>&yen;{{item.payAmount + item.expressFee}}</span>（含运费￥{{item.expressFee}}.00）
          </div>
          <!--操作-->
          <div class="order-operate">
            <!--<span @click="deleteOrder(item.id)" class="btn">删除订单</span>-->
          </div>
        </div>
      </div>

    <div class="no-data" v-show="anyOrders == false">暂无数据</div>
    </section>

    <!--待付款列表-->
    <section v-show="type == 2" class="order-list">
      <div v-for="(item,index) in obligationList" v-show="anyOrders" class="wrap">
        <!--订单号-->
        <div class="order-num">
          <span class="id">订单号：{{item.outTradeNo}}</span>
          <span class="status">待付款</span>
        </div>
        <!--订单详情-->
        <router-link :to="'/order_detail?id='+item.id">
          <div class="order-detail clearfix">
            <div class="left">
              <a>
                <img :src="item.productList[0].coverImg"/>
              </a>
            </div>
            <ul class="right">
              <li>
                <a class="text-1">{{item.productList[0].name}}</a>
              </li>
              <li class="text-2">{{item.productList[0].norms}}</li>
              <li class="text-3">{{item.productList[0].price}}</li>
              <li class="text-4">
                <span class="price">{{item.productList[0].preferentialPrice}}</span>
                <span class="count">x{{item.productList[0].quantity}}</span>
              </li>
            </ul>
          </div>
        </router-link>
        <!--合计-->
        <div class="total">
          共{{item.quantity}}件商品 合计：<span>&yen;{{item.payAmount + item.expressFee}}</span>（含运费￥{{item.expressFee}}.00）
        </div>
        <!--操作-->
        <div class="order-operate">
          <span @click="cancalOrder(item.id)" class="btn">取消订单</span>
          <router-link :to="'/select_pay?id='+item.id"><span class="btn">付款</span></router-link>
        </div>
      </div>
      <div class="no-data" v-show="anyOrders == false">暂无数据</div>
    </section>

    <!--待收货列表-->
    <section v-show="type == 3" class="order-list">
      <div v-for="(item,index) in receivingList" v-show="anyOrders" class="wrap">
        <!--订单号-->
        <div class="order-num">
          <span class="id">订单号：{{item.outTradeNo}}</span>
          <span class="status">已发货</span>
        </div>
        <!--订单详情-->
        <router-link :to="'/order_detail?id='+item.id">
          <div class="order-detail clearfix">
            <div class="left">
              <a>
                <img :src="item.productList[0].coverImg"/>
              </a>
            </div>
            <ul class="right">
              <li>
                <a class="text-1">{{item.productList[0].name}}</a>
              </li>
              <li class="text-2">{{item.productList[0].norms}}</li>
              <li class="text-3">{{item.productList[0].price}}</li>
              <li class="text-4">
                <span class="price">{{item.productList[0].preferentialPrice}}</span>
                <span class="count">x{{item.productList[0].quantity}}</span>
              </li>
            </ul>
          </div>
        </router-link>
        <!--合计-->
        <div class="total">
          共{{item.quantity}}件商品 合计：<span>&yen;{{item.payAmount + item.expressFee}}</span>（含运费￥{{item.expressFee}}.00）
        </div>
        <!--操作-->
        <div class="order-operate">
          <span @click="extendTheReceiving(item.id)" class="btn">延长收货</span>
          <span @click="requestReturn(item.id)" class="btn">申请退货</span>
          <span @click="seaLogistics(item.id)" class="btn">查看物流</span>
          <span @click="confirmReceipt(item.id)" class="btn">确认收货</span>
        </div>
      </div>
      <div class="no-data" v-show="anyOrders == false">暂无数据</div>
    </section>

    <!--待评价列表-->
    <section v-show="type == 4" class="order-list">
      <div v-for="(item,index) in evaluateList" v-show="anyOrders" class="wrap">
        <!--订单号-->
        <div class="order-num">
          <span class="id">订单号：{{item.outTradeNo}}</span>
          <span class="status">交易完成</span>
        </div>
        <!--订单详情-->
        <router-link :to="'/order_detail?id='+item.id">
          <div class="order-detail clearfix">
            <div class="left">
              <a>
                <img :src="item.productList[0].coverImg"/>
              </a>
            </div>
            <ul class="right">
              <li>
                <a class="text-1">{{item.productList[0].name}}</a>
              </li>
              <li class="text-2">{{item.productList[0].norms}}</li>
              <li class="text-3">{{item.productList[0].price}}</li>
              <li class="text-4">
                <span class="price">{{item.productList[0].preferentialPrice}}</span>
                <span class="count">x{{item.productList[0].quantity}}</span>
              </li>
            </ul>
          </div>
        </router-link>
        <!--合计-->
        <div class="total">
          共{{item.quantity}}件商品 合计：<span>&yen;{{item.payAmount + item.expressFee}}</span>（含运费￥{{item.expressFee}}.00）
        </div>
        <!--操作-->
        <div class="order-operate">
          <span @click="goEvaluate(item.productList[index].id)" class="btn">评价</span>
        </div>
      </div>
      <div class="no-data" v-show="anyOrders == false">暂无数据</div>
    </section>

    <!--售后列表-->
    <section v-show="type == 5" class="order-list">
      <div v-for="(item,index) in afterList" v-show="anyOrders" class="wrap">
        <!--订单号-->
        <div class="order-num">
          <span class="id">订单号：{{item.outTradeNo}}</span>
          <span class="status">申请退货</span>
        </div>
        <!--订单详情-->
        <router-link :to="'/order_detail?id='+item.id">
          <div class="order-detail clearfix">
            <div class="left">
              <a>
                <img :src="item.productList[0].coverImg"/>
              </a>
            </div>
            <ul class="right">
              <li>
                <a class="text-1">{{item.productList[0].name}}</a>
              </li>
              <li class="text-2">{{item.productList[0].norms}}</li>
              <li class="text-3">{{item.productList[0].price}}</li>
              <li class="text-4">
                <span class="price">{{item.productList[0].preferentialPrice}}</span>
                <span class="count">x{{item.productList[0].quantity}}</span>
              </li>
            </ul>
          </div>
        </router-link>
        <!--合计-->
        <div class="total">
          共{{item.quantity}}件商品 合计：<span>&yen;{{item.payAmount + item.expressFee}}</span>（含运费￥{{item.expressFee}}.00）
        </div>
        <!--操作-->
        <div class="order-operate">
          <!--<span @click="cancelAppli(item.id)" class="btn">取消申请</span>-->
        </div>
      </div>
      <div class="no-data" v-show="anyOrders == false">暂无数据</div>
    </section>

    <!--弹窗-->
    <div class="popup" style="display: none;">
      <!--确认弹窗-->
      <!--<div class="confirm" style="display: none;">-->
        <!--&lt;!&ndash;提示文字&ndash;&gt;-->
        <!--<div class="tips">-->
          <!--&lt;!&ndash;取消订单&ndash;&gt;-->
          <!--<span class="cancel-order">确定要取消订单吗?</span>-->
          <!--&lt;!&ndash;确认收货&ndash;&gt;-->
          <!--<span class="receipt" style="display: none;">确认收获后无法退货,<br/>是否确认收货？</span>-->
        <!--</div>-->

        <!--&lt;!&ndash;按钮&ndash;&gt;-->
        <!--<div class="btn">-->
          <!--<div class="cancel" title="false">取消</div>-->
          <!--<div class="ensure" title="true">确定</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--升级弹窗-->
      <div class="upgrade">
        <div class="one">
          <img src="../../assets/web/icon_order_list_medal.png"/>
          <p class="hint">恭喜您升级了</p>
        </div>
        <div class="two">
          <div class="now">
            <h4 class="title">当前等级权益：</h4>
            <p class="item">1、购买普通商品可享受9折优惠；</p>
            <p class="item">2、可以邀请好友，好友购买商品后可获得佣金收益。</p>
          </div>
          <div class="next">
            <h4 class="title">下一等级权益：</h4>
            <p class="item">1、购买普通商品可享受8折优惠；</p>
            <p class="item">2、可以邀请好友，好友购买商品后可获得佣金收益。</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common";
  import {MessageBox} from "mint-ui"

  export default {
    data() {
      return {
        type: parseInt(this.$route.query.type),
        allOrderList: [],//交易完成 || 全部订单
        obligationList: [],//待付款
        receivingList: [],//待收货
        evaluateList: [],//待评价
        afterList: [],//售后
        anyOrders: false,
        arr: []
      }
    },
    mounted() {
      this.getOrderList(this.type);
    },
    methods: {
      /**
       * 获取订单列表
       * @param type
       */
      getOrderList(type) {
        let payStatus;
        let orderType;
        switch (type) {
          case 1://全部订单
            payStatus = null;
            orderType = "allOrderList";
            this.requestOrder(payStatus, orderType);
            break;
          case 2://待付款
            payStatus = 0;
            orderType = "obligationList";
            this.requestOrder(payStatus, orderType);
            break;
          case 3://待收货
            payStatus = 2;
            orderType = "receivingList";
            this.requestOrder(payStatus, orderType);
            break;
          case 4://待评价
            payStatus = 3;
            orderType = "evaluateList";
            this.requestOrder(payStatus, orderType);
            break;
          case 5://售后
            payStatus = 5;
            orderType = "afterList";
            this.requestOrder(payStatus, orderType);
            break;
        }
      },
      requestOrder(payStatus, orderType) {
        if(payStatus === null){
          con.get("/api/order/list?rows=20", (response) => {
            if (response.result === 1) {
              this.hasOrder(response.data, orderType);
            } else {
              con.toast(response.msg);
            }
          });
        }else{
          con.get("/api/order/list?payStatus=" + payStatus, (response) => {
            if (response.result === 1) {
              this.hasOrder(response.data, orderType);
            } else {
              con.toast(response.msg);
            }
          });
        }
      },
      /**
       * 有无订单
       * @param data 请求服务器响应的数据
       * @param order 当前订单列表的名字
       */
      hasOrder(data, order) {
        if (data.orderList.length === 0) {
          this.anyOrders = false;
        } else {
          this[order] = data.orderList;
          this.anyOrders = true;
        }
      },
      /**
       * 取消订单
       * @param id 当前商品id
       */
      cancalOrder(id) {
        con.post("/api/order/cancel", {
          "id": id,
        }, (response) => {
          if (response.result === 1) {
            con.toast(response.msg, "center");
            this.getOrderList(2);
          } else {
            con.toast(response.msg);
          }
        })
      },
      /**
       * 延长收货
       * @param id  当前操作的订单id
       */
      extendTheReceiving(id) {
        this.messageBox(id, "每笔订单只能延长一次", "确定延长收货吗?", "/api/order/extension", "已为您延长收货时间");
      },
      /**
       * 申请退货
       * @param id  当前操作的订单id
       */
      requestReturn(id) {
        this.$router.push("/return?id="+id);
      },
      /**
       * 查看物流
       * @param id  当前操作的订单id
       */
      seaLogistics(id) {
        this.$router.push("/logist?id=" + id);
      },
      /**
       * 确认收货
       * @param id  当前操作的订单id
       */
      confirmReceipt(id) {
        this.messageBox(id, "确认收货", "确认收货后无法撤销，您确定吗?", "/api/order/confirm", "操作成功");
      },
      /**
       * 去评价
       * @param id  当前操作的订单id
       */
      goEvaluate(id) {
        this.$router.push("/evaluate?id=" + id);
      },
      /**
       * 取消申请退货
       * @param id  当前操作的订单id
       */
      cancelAppli(id) {
        //todo 取消申请退货
      },
      messageBox(id, title, msg, url, toast,type) {
        MessageBox({
          title: title,
          message: msg,
          showCancelButton: true
        }).then((val) => {
          if (val === "confirm") {
            con.post(url, {
              "id": id,
            }, response => {
              if (response.result === 1) {
                con.toast(toast);
                this.getOrderList(this.type);
              } else {
                con.toast(response.msg);
              }
            })
          }
        });
      },
    }
  }
</script>

<style scoped lang="less">
  #my-order {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }

  .nav {
    width: 100%;
    height: 1.066666rem;
    background: #303030;
    padding: 0 0.4rem;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: space-between;

      li {
        width: 1.333333rem;
        height: 100%;
        .active {
          color: #C63535;
        }
        .active:after {
          content: "";
          display: block;
          width: 1.333333rem;
          height: 3px;
          background: #C63535;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
          color: #fff;
          font-size: 0.373333rem;
          line-height: 1.066666rem;
          text-align: center;
          position: relative;
        }
      }
    }
  }

  .no-data {
    text-align: center;
    padding-top: 100/75rem;
    color: #333;
  }

  .wrap {
    width: 100%;
    min-height: 5.733333rem;
    background: #fff;
    margin: 0.213333rem 0;

    .order-num {
      width: 100%;
      height: 1.066666rem;
      padding: 0 0.4rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      span {
        font-size: 0.32rem;
        &.id {
          color: #333;
        }
        &.status {
          color: #f24545;
        }
      }
    }

    .order-detail {
      width: 100%;
      min-height: 2.5rem;
      background: #fcfcfc;
      padding: 0 0.4rem;

      .left {
        float: left;
        width: 2.4rem;
        min-height: 2.4rem;
        a {
          display: block;
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 2.4rem;
          }
        }
      }
      .right {
        float: right;
        width: 6.533333rem;
        min-height: 2.5rem;
        li {
          width: 100%;
          a {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .text-1 {
          font-size: 0.32rem;
          color: #333;
          min-height: 70/75rem;
          line-height: 0.44rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .text-2 {
          padding: 0.23rem 0;
        }
        .text-2, .text-3, .text-4 {
          font-size: 0.32rem;
          color: #666;
        }
        .text-3 {
          text-decoration: line-through;
        }
        .text-4 {
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          justify-content: space-between;
          -webkit-justify-content: space-between;
          .price {
            color: #c63535;
            font-weight: 600;
          }
        }
      }
    }

    .total {
      width: 100%;
      height: 0.8rem;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 0.4rem;
      font-size: 0.32rem;
      color: #333;
      text-align: right;
      line-height: 0.8rem;
      span {
        font-size: 0.373333rem;
        font-weight: 600;
      }
    }

    .order-operate {
      width: 100%;
      height: 1.333333rem;
      padding: 0 0.4rem;
      text-align: right;
      line-height: 1.333333rem;
      .btn {
        box-sizing: inherit;
        display: inline-block;
        min-width: 1.573333rem;
        height: 0.666666rem;
        border: 1px solid #565656;
        font-size: 0.32rem;
        color: #333;
        text-align: center;
        line-height: 0.666666rem;
        border-radius: 0.306666rem;
        margin-left: 0.2rem;
        padding: 0 10/75rem;
      }
    }

  }

  /*弹窗*/
  .popup {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 10;

    .confirm {
      width: 7.2rem;
      min-height: 2.773333rem;
      background: rgba(242, 242, 242, .9);
      margin: 7.333333rem auto 0;
      border-radius: 0.2rem;
      -webkit-border-radius: 0.2rem;
      .tips {
        width: 100%;
        min-height: 1.573333rem;
        border-bottom: 2px solid #dfe0e2;
        padding: 0.6rem 1.7rem;
        text-align: center;
        font-size: 0.4rem;
        color: #000;
        font-weight: 500;
      }
      .btn {
        width: 100%;
        height: 1.173333rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        > div {
          width: 50%;
          height: 100%;
          line-height: 1.173333rem;
          text-align: center;
          font-size: 0.4rem;
          color: #0076ff;
        }
        .cancel {
          border-right: 2px solid #dfe0e2;
        }
      }
    }

    .upgrade {
      width: 5.64rem;
      min-height: 6.666666rem;
      background: #fff;
      margin: 5.24rem auto 0;
      position: relative;
      border-radius: 0.2rem;
      -webkit-border-radius: 0.2rem;

      .one {
        width: 100%;
        min-height: 2.866666rem;
        border-bottom: 2px solid #f24545;
        position: relative;

        img {
          width: 4.506666rem;
          height: 3.666666rem;
          position: absolute;
          left: 0;
          right: 0;
          top: -2rem;
          margin: auto;
        }
        .hint {
          width: 100%;
          position: absolute;
          top: 1.666666rem;
          padding: 0.333333rem 0;
          text-align: center;
          font-size: 0.373333rem;
        }
      }
      .two {
        padding: 0 0.266666rem 0.333333rem;
        .title {
          padding: 0.24rem 0;
          font-size: 0.346666rem;
        }
        .item {
          font-size: 0.293333rem;
          color: #333;
          line-height: 0.4rem;
        }
      }

    }

  }

</style>
