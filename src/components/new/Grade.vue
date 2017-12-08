<template>
  <div id="grade">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">我的等级</span>
    </header>

    <section class="content">

      <div class="my-grades">
        <img :src="userData.headerImg"/>
        <div class="now-grade">
          <i class="icon_lv"></i>
          <span class="now-text">当前等级：</span>
          <span class="label">{{userData.thisRole.showName}}</span>
        </div>
        <div v-if="userData.thisRole.upgradeConditions" class="need">({{userData.thisRole.upgradeConditions}})</div>
      </div>

      <div class="box">
        <h3 class="title"><i class="vertical-line"></i>当前等级权益：</h3>
        <div v-html="userData.thisRole.rightsAndInterests">{{userData.thisRole.rightsAndInterests}}</div>
      </div>

      <div class="box">
        <h3 class="title"><i class="vertical-line"></i>下一等级权益：</h3>
        <p class="one">购买普通商品可享受6折优惠</p>
        <p class="two">可以邀请好友，好友购买商品后可获得佣金收益</p>
      </div>

      <div v-if="userData.shopConditions == 0" :class="[{'hide':userData.shopConditions == 0},'apply']">
        <router-link  to="/open_shop">申请开店</router-link>
      </div>
      <div v-else-if="userData.shopConditions == 1" :class="[{'show':userData.shopConditions == 1},'apply']">
        <router-link  to="/open_shop">申请开店</router-link>
      </div>
      <div v-else="userData.shopConditions == 2" :class="[{'show':(userData.shopConditions == 2)},('ashen'),('apply')]">
        <a>申请开店</a>
      </div>

    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data (){
      return {
        userData:{}
      }
    },
    mounted(){
      this.getMyGrade();
    },
    methods:{
      getMyGrade(){
        con.get("/api/my/queryGrade",(response) => {
          if(response.result === 1){
            this.userData = response.data;
            console.log(this.userData)
          }else{
            con.toast(response.msg)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
#grade{
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}
.hide{
  display: none;
}
.show{
  display: block;
}
.ashen{
  background: #ddd !important;
  a{
    color: #ccc !important;
  }
}

.my-grades{
  width: 100%;
  height: 4.8rem;
  background: url(../../assets/web/grade_bj.png) 0 0 no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 0.8rem;

  img{
    width: 1.28rem;
    height: 1.28rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
  }

  .now-grade{
    color: #fff;
    padding-top: 0.533333rem;

    .icon_lv{
      display: inline-block;
      width: 0.4rem;
      height: 0.453333rem;
      background: url(../../assets/web/icon_personal_level.png) 0 0 no-repeat;
      background-size: cover;
      vertical-align: -12%;
    }

    .now-text{
      font-size: 0.4rem;
    }
    .label{
      font-size: 0.266666rem;
      background-color: #cfa767;
      padding: 1px 0.266666rem;
      border-radius: 0.266666rem;
    }

  }

  .need{
    font-size: 0.346666rem;
    color: #ccc;
    padding: 0.266666rem 0;
  }

}

.box{
  width: 100%;
  min-height: 2.6rem;
  background: #fff;
  padding: 0.533333rem 0.4rem;
  margin-bottom: 1px;

  .title{
    font-size: 0.373333rem;
    color: #333;
    margin-bottom: 0.333333rem;
    .vertical-line{
      display: inline-block;
      width: 0.08rem;
      height: 0.346666rem;
      background: url(../../assets/web/icon_personal_vertical_line.png) 0 0 no-repeat;
      background-size: cover;
      margin-right: 0.133333rem;
    }
  }

  .one,.two{
    font-size: 0.346666rem;
    color: #666;
    margin-left: 0.213333rem;
    line-height: 0.4rem;
  }

}

.apply{
  width: 100%;
  height: 1.146666rem;
  background: #fff;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin: 0.68rem 0;
  a{
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 1.146666rem;
    font-size: 0.4rem;
    color: #c63535;
  }
}

</style>
