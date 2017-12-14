<template>
  <div id="video">
    <!--头部-->
    <header class="header">
      <router-link to="/home">
        <i class="back-pre"></i>
      </router-link>
      <span class="title">视频</span>
    </header>

    <!--视频列表-->
    <section class="content">
      <!--直播-->
      <div v-if="video.videoLive" class="solive">
        <h3 class="title">
          <i class="icon1"></i>
          <span class="text">直播</span>
        </h3>
        <router-link to="/" v-for="item in video.videoLive">
          <img :src="item.image"/>
          <span class="caption">{{item.title}}</span>
        </router-link>
      </div>

      <!--视频-->
      <div class="video-list">
        <h3 class="title">
          <i class="icon2"></i>
          <span class="text">视频</span>
        </h3>
        <div v-for="item in video.videoList" class="video-item">
          <router-link :to="'/video_play?id='+item.id">
            <img :src="item.image"/>
            <span class="caption">{{item.title}}</span>
          </router-link>
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
        video:{},
      }
    },
    mounted(){
      this.getVideoList();
    },
    methods:{
      getVideoList(){
        con.get("/api/video/list",(response) => {
          if (response.result === 1){
            this.video = response.data;
          }else{
            con.toast(response.msg)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
#video{
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

.content{
  width: 100%;
  padding: 0 0.4rem;

  .title{
    width: 100%;
    height: 1.066666rem;
    line-height: 1.066666rem;


    .icon1{
      background: url(../../assets/web/icon_live_video.png) no-repeat 0 0;
    }
    .icon2{
      background: url(../../assets/web/icon_video.png) no-repeat 0 0;
    }

    .icon1,.icon2{
      display: inline-block;
      width: 0.48rem;
      height: 0.48rem;
      background-size: cover;
      vertical-align: text-bottom;
    }
    .text{
      font-size: 0.373333rem;
      color: #333;
      font-weight: 400;
      margin-left: 0.066666rem;
    }
  }
  .video-item{

  }
  a{
    display: block;
    width: 8.8rem;
    height: 4.933333rem;
    margin: 0 auto;
    border-radius: 0.133333rem;
    -webkit-border-radius: 0.133333rem;
    position: relative;

    img{
      width: 100%;
      height: 100%;
      position: relative;
      border-radius: 0.133333rem;
      -webkit-border-radius: 0.133333rem;
    }
    .caption{
      position: absolute;
      top: 30/75rem;
      left: 30/75rem;
      color: #fff;
    }

  }
  .video-list a{
    margin-bottom: 0.266666rem;
  }

}

</style>
