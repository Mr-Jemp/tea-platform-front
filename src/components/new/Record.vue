<template>
  <div id="record">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">提现记录</span>
    </header>

    <section class="content">

      <div class="select-date">
        <i class="icon-calendar"></i>
        <div class="box">
          <input class="start" type="button" v-model="startValue" @click="startOpenPicker">
          <span>—</span>
          <input class="end" type="button" v-model="endValue" @click="endOpenPicker">
        </div>
        <button class="search" @click="searchResult($event)">搜索</button>
      </div>
      <mt-datetime-picker type="date"
                          ref="startPicker"
                          @confirm="startDate">
      </mt-datetime-picker>
      <mt-datetime-picker2 type="date"
                           ref="endPicker"
                           @confirm="endDate">
      </mt-datetime-picker2>


      <!--无记录状态-->
      <div class="null-content" v-if="listShow">
        <img src="../../assets/web/icon_null.png"/>
        <p class="hint">亲，您没有留下任何痕迹</p>
      </div>

      <!--有记录状态-->
      <div v-else="listShow" class="my-record">
        <ul v-for="item in financeCashList" class="list-1">
          <li class="item clearfix">
            <div class="left">
              <div class="name">{{item.bankBelong}}</div>
              <!--<div class="date">2017年10月09日<span class="time">12:00:00</span></div>-->
              <div class="date">{{item.createTime}}</div>
            </div>
            <div class="right">
              <span class="label" v-if="item.status === '0'">申请提现中</span>
              <span class="label" v-if="item.status === '1'">提现成功</span>
              <span class="label" v-if="item.status === '2'">提现失败</span>
            </div>
          </li>
          <li class="item clearfix">
            <div class="left">
              <div class="card">{{item.bankNumber}}</div>
              <div class="bank">{{item.bankName}}</div>
            </div>
            <div class="right">
              <span class="money">&yen; {{item.cashAmount}}</span>
            </div>
          </li>
        </ul>
      </div>

    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data() {
      return {
        listShow: true,
        financeCashList: [],
        startValue: "开始日期",
        endValue: "结束日期"
      }
    },
    mounted() {
      this.getRecordList();
    },
    methods: {
      getRecordList() {
        con.get("/api/cash/list", (response) => {
          if (response.result === 1) {
            if (response.data.financeCashList.length !== 0) {
              this.listShow = false;
              this.financeCashList = response.data.financeCashList;
            }
          } else {
            con.toast(response.msg);
          }
        })
      },
      startOpenPicker() {
        this.$refs.startPicker.open();
      },
      endOpenPicker() {
        this.$refs.endPicker.open();
      },
      startDate(value) {
        var date = new Date(value);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        this.startValue = y + "-" + this.addZero(m) + "-" + this.addZero(d);
      },
      endDate(value) {
        var date = new Date(value);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        this.endValue = y + "-" + this.addZero(m) + "-" + this.addZero(d);
      },
      addZero(time) {
        return time = time > 9 ? time : "0" + time;
      },
      searchResult(e) {
        var start = new Date(this.startValue).getTime();
        var end = new Date(this.endValue).getTime();
        var nowTime = new Date().getTime();
        if (end - start >= 0) {
          if (end <= nowTime) {
            if (!e.target.disabled) {
              e.target.disabled = true;
              con.get("/api/cash/list?startTime=" + this.startValue + "&endTime=" + this.endValue, (response) => {
                if (response.result === 1) {
                  e.target.disabled = false;
                  this.financeCashList = response.data.financeCashList;
                } else {
                  con.toast(response.msg);
                }
              })
            }
          } else {
            con.toast("请选择当前日期之前的时间");
          }
        } else {
          con.toast("请选择正确的日期区间");
        }
      }
    },
  }
</script>

<style scoped lang="less">
  #record {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }

  .content {
    width: 100%;

    .select-date {
      height: 80/75rem;
      padding: 0 30/75rem;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon-calendar {
        display: block;
        width: 32/75rem;
        height: 32/75rem;
        background: url("../../assets/web/icon_calendar.png") 0 0 no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
      }
      .start, .end {
        width: 240/75rem;
        height: 52/75rem;
        background-color: #e5e5e5;
        border: none;
        outline: none;
        color: #aaa;
        -webkit-border-radius: 15/75rem;
        -moz-border-radius: 15/75rem;
        border-radius: 15/75rem;
      }
      .search {
        border: none;
        outline: none;
        background-color: transparent;
        color: #8798a6;
        height: 100%;
      }
    }

    .null-content {
      width: 100%;
      text-align: center;
      padding-top: 2.933333rem;

      img {
        width: 4.826666rem;
        height: 4.826666rem;
      }
      .hint {
        font-size: 0.373333rem;
        color: #999;
        padding: 0.4rem 0;
      }
    }

    .my-record {
      width: 100%;
      padding: 0 0.4rem 0.266666rem;

      .list-1 {
        width: 100%;
        min-height: 3.733333rem;
        background: #fff;
        margin-top: 0.266666rem;
        border-radius: 0.133333rem;
        -webkit-border-radius: 0.133333rem;
        border: 1px solid #ddd;
      }

      .item {
        width: 100%;
        padding: 0.266666rem 0.4rem;

        .error-info {
          font-size: 0.32rem;
          color: #c53636;
          padding: 0.266666rem 0;
        }
      }

      .left {
        float: left;
        min-width: 4rem;

        .name {
          font-size: 0.373333rem;
          color: #333;
          padding: 0.266666rem 0;
        }

        .date {
          font-size: 0.32rem;
          color: #aaa;
          .time {
            margin-left: 0.2rem;
          }
        }

        .card, .bank {
          font-size: 0.373333rem;
          color: #333;
        }
        .bank {
          padding: 0.226666rem 0 0 0;
        }

      }
      .right {
        float: right;
        margin-top: 0.2rem;

        .label {
          display: inline-block;
          min-width: 1.6rem;
          font-size: 0.32rem;
          color: #fff;
          box-sizing: inherit;
          text-align: center;
          background: #09a86a;
          padding: 0.06rem 0.1rem;
          border-radius: 0.1rem;
          -webkit-border-radius: 0.1rem;
        }

        .money {
          color: #c53636;
          font-size: 0.453333rem;
        }
      }

    }

  }
</style>
