<template>
  <div id="video-play">
    <!--头部-->
    <header class="header">
      <router-link to="video">
        <i class="back-pre"></i>
      </router-link>
      <span class="title">视频</span>
    </header>

    <section class="content">
      <!--播放视频-->
      <div class="v-play">
        <video :poster="video.image" controls id="video" width="100%" :src="video.url"></video>
      </div>

      <!--更多视频-->
      <h3 class="more-video"><i class="icon-line"></i>更多视频</h3>

      <ul class="video-list clearfix">
        <li v-for="item in videoList" class="item">
          <a @click="moreVideo(item.id)">
            <img :src="item.image"/>
            <span class="item-text">{{item.title}}</span>
            <div class="vplay-btn"><i></i></div><!--播放按钮-->
          </a>
        </li>
      </ul>

    </section>


  </div>
</template>

<script>
  import {con} from "../../assets/js/common"
  import $ from "jquery"

  export default {
    data() {
      return {
        video: "",
        videoList: "",
      }
    },
    mounted() {
      this.getNowVideo();
      this.getMoreVideo();
    },
    methods: {
      getMoreVideo() {
        con.get("/api/video/list", (response) => {
          if (response.result === 1) {
            this.videoList = response.data.videoList;
          } else {
            con.toast(response.msg);
          }
        })
      },
      getNowVideo() {
        if (this.$route.query.id) {
          con.get("/api/video/queryOne?id=" + this.$route.query.id, (response) => {
            if (response.result === 1) {
              this.video = response.data;
            } else {
              con.toast(response.msg);
            }
          })
        }
      },
      moreVideo(id){
        this.$route.query.id = id;
        this.getNowVideo();
      }
    }
  }
</script>

<style scoped lang="less">
  #video-play {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }

  .content {

    .vplay-btn {
      display: block;
      width: 1.333333rem;
      height: 1.333333rem;
      border-radius: 50%;
      -webkit-border-radius: 50%;
      background: rgba(0, 0, 0, .7);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 999;
      i {
        display: block;
        width: 0.533333rem;
        height: 0.6rem;
        background: url(../../assets/web/v-play.png) 0 0 no-repeat;
        background-size: cover;
        position: absolute;
        left: 0.133333rem;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .v-play {
      width: 100%;
      height: 5.626666rem;
      background: #000;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 3;
      }
      video {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
      }
      .control {
        position: absolute;
        bottom: 0.4rem;
        left: 0;
        z-index: 999;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        padding: 0 0.4rem;

        .on-off {
          width: 0.28rem;
          height: 0.48rem;
          background: url(../../assets/web/btnPause.png) no-repeat 0 0;
          background-size: cover;
          margin-right: 0.133333rem;
        }

        .progress-box {
          color: #fff;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          span {
            font-size: 0.266666rem;
            padding: 0 0.133333rem;
          }

          .progress-bar {
            width: 6.133333rem;
            height: 0.066666rem;
            border-radius: 0.066666rem;
            -webkit-border-radius: 0.066666rem;
            background: #4d4d4d;
            position: relative;
            .progress-ball {
              width: 0.2rem;
              height: 0.2rem;
              border: 2px solid #fff;
              border-radius: 50%;
              -webkit-border-radius: 50%;
              background: #c63535;
              position: absolute;
              top: -0.066666rem;
              left: 0;
            }
          }

        }

        .full-screen {
          width: 0.413333rem;
          height: 0.426666rem;
          background: url(../../assets/web/full_screen.png) 0 0 no-repeat;
          background-size: cover;
          margin-left: 0.133333rem;
        }

      }

    }

    .more-video {
      width: 100%;
      height: 1.013333rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      padding: 0 0.4rem;

      .icon-line {
        display: inline-block;
        width: 0.106666rem;
        height: 0.333333rem;
        background: url(../../assets/web/icon_line.png) 0 0 no-repeat;
        background-size: cover;
        margin-right: 0.133333rem;
      }

    }

    .video-list {
      width: 100%;

      .item {
        float: left;
        width: 4.933333rem;
        margin: 0 0.133333rem 0.133333rem 0;
        position: relative;

        &:nth-of-type(even) {
          margin-right: 0;
        }

        a {
          display: block;
          width: 100%;
          height: 100%;
        }

        img {
          width: 100%;
          height: 2.8rem;
        }
        .item-text {
          display: block;
          color: #333;
          font-size: 0.32rem;
          padding: 0.266666rem;
        }
        .vplay-btn {
          width: 0.8rem;
          height: 0.8rem;
          top: -0.933333rem;
          i {
            width: 0.333333rem;
            height: 0.373333rem;
            background: url(../../assets/web/v-play.png) 0 0 no-repeat;
            background-size: cover;
            left: 0.066666rem;
          }
        }
      }
    }

  }

</style>
