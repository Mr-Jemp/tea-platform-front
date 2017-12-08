<template>
  <div id="personal">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">个人信息</span>
    </header>


    <section class="content">
      <!--个人信息列表-->
      <ul class="list1">
        <li class="item head clearfix">
          <span class="left">头像</span>
          <span class="right">
            <img class="head-img" :src="userInfo.headerImg"/>
              <input type="file" id="choose" @change="imgChange($event)"/>
          </span>
        </li>
        <li @click="setName" class="item clearfix">
          <span class="left">昵称</span>
          <router-link to=""><span class="right">{{userInfo.nickname || "无昵称"}}<i class="more"></i></span>
          </router-link>
        </li>
        <li @click="showSelectSex" class="item clearfix">
          <span class="left">性别</span>
          <router-link to=""><span class="right gray">{{userInfo.sex}}<i class="more"></i></span></router-link>
        </li>
      </ul>

      <ul class="list2">
        <li class="item clearfix">
          <router-link class="grade clearfix" to="/grade">
            <span class="left">我的等级</span>
            <span class="right">{{userInfo.showName}}<i class="more"></i></span>
          </router-link>
        </li>
        <li class="item clearfix">
          <span @click="showIntegral" class="left">我的积分<i class="query"></i></span>
          <router-link to=""><span class="right">{{userInfo.accumulatePoints}}<i class="more"></i></span></router-link>
        </li>
        <li class="item clearfix">
          <span class="left">我的业绩</span>
          <span class="right">&yen; {{userInfo.achievement}}</span>
        </li>
      </ul>
    </section>

    <!--选择性别-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>

    <!--积分弹出框-->
    <div class="integral-wrap" v-show="integralShow">
      <div class="inner">
        <div class="close-box">
          <div class="close" @click="closeIntegral"></div>
        </div>
        <div class="top">
          <h5>积分获得方法</h5>
          <ul>
            <li>1、每日签到可获得积分</li>
            <li>2、购买商品可获得积分</li>
          </ul>
        </div>
        <div class="bottom">
          <h5>积分用途</h5>
          <ul>
            <li>1、兑换礼品</li>
            <li>2、抵扣运费</li>
            <li>3、购买部分商品可用积分抵扣</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery/dist/jquery.min'
  import {MessageBox} from 'mint-ui'
  import {minimg} from '../../assets/js/compress.img'
  import {con} from '../../assets/js/common'

  let self;

  export default {
    data() {
      return {
        userInfo: {},
        sheetVisible: false,
        integralShow: false,
        actions: [
          {
            name: "男",
            method: this.selectSex
          },
          {
            name: "女",
            method: this.selectSex
          },
        ],
      }
    },
    mounted() {
      self = this;
      con.get("/api/my/info", (response) => {
        if (response.result === 1) {
          this.userInfo = response.data;
          if (this.userInfo.sex === 1) {
            this.userInfo.sex = "男";
          } else if (this.userInfo.sex === 2) {
            this.userInfo.sex = "女";
          } else {
            this.userInfo.sex = "未选择";
          }
        }
      })
    },
    methods: {
      showSelectSex() {
        this.sheetVisible = true;
      },
      /**
       * 选择性别
       * @param value
       */
      selectSex(value) {
        let sex;
        if (value.name === "男") {
          sex = 1;
        } else {
          sex = 2;
        }
        con.post("/api/my/editInfo", {
          "nickname": this.userInfo.nickname || '',
          "sex": sex
        }, (response) => {
          if (response.result === 1) {
            con.toast("修改成功");
            this.userInfo.sex = value.name;
          } else {
            con.toast(response.msg);
          }
        })
      },
      /**
       * 设置昵称
       */
      setName() {
        MessageBox.prompt('请输入昵称').then(({value, action}) => {
          if (value) {
            con.post("/api/my/editInfo", {
              "nickname": value
            }, (response) => {
              if (response.result === 1 && value.length <= 10) {
                con.toast("修改成功");
                this.userInfo.nickname = value;
              } else {
                con.toast("修改失败");
              }
            })
          } else {
            con.toast("昵称不能为空!");
          }
        });
      },
      /**
       * 上传头像
       * @param e
       */
      imgChange(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
          let img = this.result;
          con.post("/api/upload/avatar", {
            "data": img
          }, (response) => {
            if (response.result === 1) {
              let imgName = response.data.name;
              let imgSrc = response.data.src;
              con.post("/api/my/editInfo", {
                "headerImg": imgName,
              }, (response) => {
                if (response.result === 1) {
                  con.toast("头像修改成功");
                  self.userInfo.headerImg = imgSrc;
                  e.target.value = null;//清空文件，防止上传同一张图片无效
                } else {
                  con.toast(response.msg);
                }
              })
            } else {
              con.toast(response.msg)
            }
          })
        };
        reader.readAsDataURL(file);
      },
      /**
       * 显示积分弹框
       */
      showIntegral() {
        this.integralShow = true;
      },
      /**
       * 关闭积分弹框
       */
      closeIntegral() {
        this.integralShow = false;
      }
    }
  }
</script>

<style scoped lang="less">

  #personal {
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }

  .content {
    .list1, .list2 {
      width: 100%;
      background: #fff;
      margin-top: 0.24rem;
    }

    .item {
      width: 100%;
      position: relative;
      padding: 0.333333rem 0.4rem;
      border-bottom: 1px solid #f5f5f5;
      font-size: 0.373333rem;
      &.head {
        padding-top: 0;
        padding-bottom: 0;
        height: 1.6rem;
        a {
          margin-bottom: 30/75rem;
        }

        .right {
          width: 48px;
          height: 100%;
          position: relative;
        }
        .head-img {
          position: absolute;
          right: 0;
          top: 10/75rem;
          z-index: 10;
        }

        input[type='file'] {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 10;
          top: 0;
          left: 0;
          opacity: 0;
          -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
          filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
        }
      }

      .left {
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
      }

      &.right {
        width: 48px;
      }
    }

    .left {
      float: left;
      color: #333;

      .query {
        display: inline-block;
        width: 0.346666rem;
        height: 0.346666rem;
        background: url(../../assets/web/icon_personal_item_question.png) 0 0 no-repeat;
        background-size: cover;
        margin-left: 0.266666rem;
      }

    }
    .right {
      float: right;
      color: #666;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }

      .more {
        display: inline-block;
        width: 0.16rem;
        height: 0.266666rem;
        background: url(../../assets/web/btn_more.png) 0 0 no-repeat;
        background-size: cover;
        margin-left: 0.24rem;
      }

      &.gray {
        color: #999;
      }
    }

    .head-img {
      width: 1.28rem;
      height: 1.28rem;
    }
    .list2{
      .item{
        a.grade{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }

  }

  .integral-wrap {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 12;
    .inner {
      width: 540/75rem;
      min-height: 370/75rem;
      background: #fff;
      position: relative;
      margin: 440/75rem auto 0;
      border-radius: 10/75rem;
      -webkit-border-radius: 10/75rem;
      padding-bottom: 20/75rem;
      .close-box {
        width: 100%;
        height: 50/75rem;
        padding: 0 20/75rem;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: flex-end;
        .close {
          width: 20/75rem;
          height: 20/75rem;
          background: url("../../assets/web/btn_close.png") no-repeat 0 0;
          background-size: cover;
        }
      }
      .top, .bottom {
        padding: 0 30/75rem;
        h5 {
          font-size: 26/75rem;
          color: #333;
          padding-bottom: 16/75rem;
        }
        ul {
          margin-bottom: 20/75rem;
          li {
            font-size: 24/75rem;
            color: #333;
            padding-bottom: 15/75rem;
          }
        }
      }
    }
  }
</style>
