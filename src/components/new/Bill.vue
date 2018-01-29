<template>
  <div id="bill">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">账单</span>
    </header>


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

    <!--有账单内容-->
    <ul v-if="turnoverList.length > 0" class="bill-list">
      <li v-for="item in turnoverList" :id="item.id">
        <router-link :to="'/bill_detail?id='+item.id">
          <i v-if="item.method == 1 || item.method == 4" class="icon-express"></i>
          <i v-else-if="item.method == 2 || item.method == 3" class="icon-income"></i>
          <div class="center">
            <div class="one">
              <a>{{item.productName}}</a>
            </div>
            <div class="two">{{item.createTime}}</div>
          </div>
          <span v-if="item.method == 1 || item.method == 4" class="right-money">-{{item.amount}}</span>
          <span v-else-if="item.method == 2 || item.method == 3" class="right-money">+{{item.amount}}</span>
        </router-link>
      </li>
    </ul>

    <!--无账单内容-->
    <div class="null-content" v-else>
      <img src="../../assets/web/img_data_empty.png" alt=""/>
      <p class="tips">亲，您没有留下任何痕迹</p>
    </div>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data() {
      return {
        getBillContent: false,
        turnoverList: [],
        startValue: "开始日期",
        endValue: "结束日期"
      }
    },
    mounted() {
      con.get("/api/turnover/list", (response) => {
        if (response.result === 1) {
          this.getBillContent = true;
          this.turnoverList = response.data.turnoverList;
        } else {
          con.toast(response.msg);
        }
      })
    },
    methods: {
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
          if(end <= nowTime){
            if (!e.target.disabled) {
              e.target.disabled = true;
              con.get("/api/turnover/list?startTime=" + this.startValue + "&endTime=" + this.endValue, (response) => {
                if(response.result === 1){
                  e.target.disabled = false;
                  this.turnoverList = response.data.turnoverList;
                }else{
                  con.toast(response.msg);
                }
              })
            }
          }else{
            con.toast("请选择当前日期之前的时间");
          }
        } else {
          con.toast("请选择正确的日期区间");
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #bill {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }

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

  .bill-list {
    width: 100%;
    background: #fff;
    padding-left: 0.4rem;
    li {
      width: 100%;
      height: 1.6rem;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      > a {
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
      }

      &:last-child {
        border-bottom: none;
      }

      .icon-income {
        background: url(../../assets/web/icon_bill_income.png) no-repeat 0 0;
      }
      .icon-express {
        background: url(../../assets/web/icon_bill_expenditure.png) no-repeat 0 0;
      }
      .icon-income, .icon-express {
        display: inline-block;
        width: 0.346666rem;
        height: 0.32rem;
        background-size: cover;
      }

      .center {
        width: 6rem;
        height: 100%;
        margin-left: 0.4rem;
        padding: 0.333333rem 0;

        .one {
          font-size: 0.373333rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
          padding-bottom: 0.266666rem;

        }
        .two {
          font-size: 0.32rem;
          color: #888;
        }
      }
      .right-money {
        font-size: 0.4rem;
        color: #333;
        position: absolute;
        right: 0.4rem;
      }
    }
  }

  .null-content {
    text-align: center;
    padding-top: 2.933333rem;

    img {
      width: 4.826666rem;
      height: 4.826666rem;
    }
    .tips {
      font-size: 0.373333rem;
      color: #999;
      padding: 0.4rem 0;
    }
  }
</style>
