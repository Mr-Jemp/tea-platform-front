<template>
  <div id="logist">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">物流详情</span>
    </header>

    <section class="content">
      <div class="tracking">
        <a>
          <i class="icon-track"></i>
          <span class="text-1">物流跟踪</span>
        </a>
      </div>

      <div class="track-info">
        <div class="left">
          <ul class="left-line">
            <li v-for="item in leftLength"></li>
          </ul>
        </div>
        <div class="right">
          <ul>
            <li v-for="item in list">
              <p class="text-info">
                <span class="text-2">{{item.remark}}</span>
              </p>
              <p class="date">
                <span class="text-3">{{item.datetime}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    name: "logist",
    data() {
      return {
        id: this.$route.query.id,
        list: [{}],
        leftLength: [],
        company: "",
        no: "",
      }
    },
    mounted() {
      this.getLogisticsInfo();
    },
    methods: {
      getLogisticsInfo() {
        con.get("/api/order/logistics?id=" + this.id, response => {
          if (response.result === 1) {
            this.list = response.data.list;
            /*
                //3   2
                //4   3
                //5   4
                //6   5
                左边生成点的对应规律：点对应数组长度，竖线对应数组长度减一
                    如果数组长度等于一，对应生成一个点不带竖线，否则，生成
                    的li个数为：数组的长度个点 + 数组长度减一根竖线
            */
            if(this.list.length == 1){
              this.leftLength = this.list.length;
            }else{
              this.leftLength = this.list.length + (this.list.length - 1);
            }
          } else {
            con.toast(response.msg);
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #logist {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }

  .content {
    width: 100%;
    .tracking {
      width: 100%;
      height: 1.333333rem;
      background: #fff;
      padding: 0 0.4rem;
      box-shadow: 0 2px 1px #d0cfd0;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        .icon-track {
          display: inline-block;
          width: 0.4rem;
          height: 0.293333rem;
          background: url(../../assets/web/icon_expressage.png) no-repeat 0 0;
          background-size: cover;
        }
        .text-1 {
          font-size: 0.4rem;
          color: #333;
          margin-left: 0.133333rem;
        }
      }
    }

    .track-info {
      width: 100%;
      min-height: 1.6rem;
      background: #fff;
      margin-top: 0.213333rem;
      padding-left: 0.4rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;

      .left {
        width: 0.533333rem;
        .left-line {
          position: relative;
          li:nth-of-type(odd) {
            width: 0.133333rem;
            height: 0.133333rem;
            background: #ccc;
            border-radius: 50%;
            -webkit-border-radius: 50%;
          }
          li:nth-of-type(even) {
            width: 1px;
            height: 1.6rem;
            background: #ccc;
            margin-left: 2px;
          }
          li:first-child {
            width: 0.266666rem;
            height: 0.266666rem;
            background: url(../../assets/web/img_expressage_current.png) 0 0 no-repeat;
            background-size: cover;
            margin-left: -2px;
          }
        }
      }
      .right {
        width: 9.066666rem;
        ul {
          li {
            width: 100%;
            padding: 0.4rem 0.4rem 0.4rem 0;
            border-bottom: 1px solid #e5e5e5;

            &:last-child {
              border-bottom: none;
            }

            .text-2, .text-3 {
              color: #999;
            }
            .text-2 {
              font-size: 0.32rem;
              padding-bottom: 0.266666rem;
            }
            .text-3 {
              font-size: 0.293333rem;
            }

            &:first-child {
              .text-2 {
                color: #333;
              }
            }
            p {
              span:nth-of-type(2) {
                margin-left: 0.133333rem;
              }
            }
          }
        }
      }
    }
  }

</style>
