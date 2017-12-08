<template>
  <div id="friend">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">我的好友</span>
    </header>

    <!--好友列表-->
    <section class="content">
      <!---------------无好友状态---------------->
      <div v-show="getFriendStatus" class="not-friend" style="display: none;">
        <router-link to="/allowinvite"><img src="../../assets/web/img_friends_empty.png"/></router-link>
        <p class="status">亲，您还没有好友，快去邀请吧</p>
      </div>


      <!---------------有好友状态---------------->
      <div class="my-friend" >

        <div v-for="item in friendList.userDtoList" v-show="getFriendStatus" class="item clearfix">
          <div class="head-img">
            <router-link to=""><img :src="item.headerImg"/></router-link>
          </div>
          <div class="right-box">
            <div class="name">
              <router-link to="">{{item.nickname}}</router-link>
            </div>
            <div class="num-box">
              下线人数：<span class="people">{{item.userNumber}}</span>
              业绩：<span class="performance">{{item.achievement}}</span>
            </div>
            <i class="label">{{item.showName}}</i>
          </div>
        </div>

      </div>

    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data(){
      return {
        getFriendStatus:true,
        friendList:{},
      }
    },
    mounted(){
      this.getFriend();
    },
    methods:{
      getFriend(){
        con.get("/api/my/friends",(response) => {
          if(response.result === 1){
            this.friendList = response.data;
            if(this.friendList.userDtoList.length != 0){
              this.getFriendStatus = false;
            }
          }else{
            con.toast(response.msg)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
#firend{
  width: 100%;
  min-height: 100vh;
}
.header{
  width: 100%;
  height: 1.173333rem;
  background: #303030;
  padding: 0.36rem 0.4rem;
  text-align: center;
  position: relative;
  a{
    display: inline-block;
    width: 150/75rem;
    height: 100%;
    position: absolute;
    left: -30/75rem;
    top: 0;
    padding-top: 30/75rem;
  }
  .back-pre{
    display: inline-block;
    width: 0.24rem;
    height: 0.426666rem;
    background: url(../../assets/web/btn_arrow_back2.png) 0 0 no-repeat;
    background-size: cover;
  }
  .title{
    font-size: 0.48rem;
    color: #fff;
  }
}

.content{
  width: 100%;

  .not-friend{
    width: 100%;
    height: 94vh;
    background: #f5f5f5;
    text-align: center;
    padding-top: 2.933333rem;

    img{
      width: 4.826666rem;
      height: 4.826666rem;
    }

    .status{
      font-size: 0.373333rem;
      color: #999;
      padding: 0.346666rem 0;
    }
  }



  .item{
    padding: 0.4rem 0 0 .4rem;
    a{
      display: block;
      width: 100%;
      height: 100%;
    }

    .head-img{
      width: 0.96rem;
      height: 0.96rem;
      float: left;

      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        -webkit-border-radius: 50%;
      }
    }

    .right-box{
      width: 8rem;
      float: right;
      position: relative;
      padding-bottom: 0.32rem;
      border-bottom: 0.013333rem solid #eee;

      .name{
        font-size: 0.373333rem;
        color: #333;
      }
      .num-box{
        font-size: 0.346666rem;
        color: #999;
        margin-top: 0.213333rem;

        .people{
          padding-right: 0.4rem;
        }
        .performance,.people{
          color: #333;
        }

      }
      .label{
        display: inline-block;
        width: 1.6rem;
        font-size: 0.266666rem;
        color: #fff;
        background: #dbbd8d;
        padding: 0.066666rem 0;
        text-align: center;
        border-radius: 0.066666rem;
        -webkit-border-radius: 0.066666rem;
        position: absolute;
        right: 0.4rem;
        top: 0.2rem;
      }

    }

  }
}

</style>
