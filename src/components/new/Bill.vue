<template>
  <div id="bill">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">账单</span>
    </header>

    <!--有账单内容-->
    <ul v-if="turnoverList.length > 0" class="bill-list">
    	<li v-for="item in turnoverList">
    	  <i class="icon-income"></i>
    	  <div class="center">
    	    <div class="one">
            <router-link :to="'/bill_detail?id='+item.id">{{item.productName}}</router-link>
          </div>
    	    <div class="two">{{item.createTime}}</div>
    	  </div>
    	  <span class="right-money">{{item.amount}}</span>
    	</li>
    </ul>

    <!--无账单内容-->
    <div class="null-content" v-else>
      <img src="../../assets/web/img_data_empty.png" alt="" />
      <p class="tips">亲，您没有留下任何痕迹</p>
    </div>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data(){
      return {
        getBillContent:false,
        turnoverList:[],
      }
    },
    mounted(){
      con.get("/api/turnover/list",(response) => {
        if(response.result === 1){
          this.getBillContent = true;
          this.turnoverList = response.data.turnoverList;
        }else{
          con.toast(response.msg);
        }
      })
    }
  }
</script>

<style scoped lang="less">
#bill{
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

.bill-list{
  width: 100%;
  background: #fff;
  padding-left: 0.4rem;
  li{
    width: 100%;
    height: 1.6rem;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    position: relative;

    &:last-child{
      border-bottom: none;
    }

    .icon-income{
      background: url(../../assets/web/icon_bill_income.png) no-repeat 0 0;
    }
    .icon-express{
      background: url(../../assets/web/icon_bill_expenditure.png) no-repeat 0 0;
    }
    .icon-income,.icon-express{
      display: inline-block;
      width: 0.346666rem;
      height: 0.32rem;
      background-size: cover;
    }

    .center{
      width: 6rem;
      height: 100%;
      margin-left: 0.4rem;
      padding: 0.333333rem 0;

      .one{
        font-size: 0.373333rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
        padding-bottom: 0.266666rem;
      }
      .two{
        font-size: 0.32rem;
        color: #888;
      }
    }
    .right-money{
      font-size: 0.4rem;
      color: #333;
      position: absolute;
      right: 0.4rem;
    }
  }
}

.null-content{
  text-align: center;
  padding-top: 2.933333rem;

  img{
    width: 4.826666rem;
    height: 4.826666rem;
  }
  .tips{
    font-size: 0.373333rem;
    color: #999;
    padding: 0.4rem 0;
  }
}
</style>
