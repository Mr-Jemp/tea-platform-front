<template>
  <div id="open-shop">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">申请开店</span>
    </header>

    <section class="content">
      <!--用户信息-->
      <ul class="user-info-list">
        <li><input v-model="name" class="name" type="text" placeholder="请输入您的名字"></li>
        <li><input v-model="contact" class="contact" type="text" placeholder="请输入您的联系方式"></li>
        <li><input v-model="address" class="address" type="text" placeholder="请输入店铺地址"></li>
      </ul>

      <div class="one clearfix">
        <textarea v-model="textarea" maxlength="200" class="textarea" placeholder="请输入您的宝贵意见"></textarea>
        <div class="length">
          <span class="num">{{textarea.length}}</span><span class="max-length">/200</span>
        </div>
      </div>

      <!--上传图片-->
      <div class="two">
        <div class="caption">添加图片（选填，最多3张）</div>
        <ul class="img-box clearfix">
          <li v-for="item in arr" class="clearfix">
            <img :src="item"/>
            <i @click="deleteImg($event)" class="close"></i>
          </li>
          <li>
            <input @change="updataImg($event)" id="file" type="file" />
          </li>
        </ul>
      </div>

      <div class="submit">
        <button @click="sumbitIdea">提交申请</button>
      </div>

    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"
  import $ from "jquery"

  let self;
  export default {
    data (){
      return {
        textarea: "",
        imgLength:3,
        arr:[],
        userImg:"",
        name:"",
        contact:"",
        address:"",
        hasGetPhone:false,
      }
    },
    created(){
      self = this;
    },
    watch:{
      textarea(newVal){
        if(newVal.trim().length >= 200){
          con.toast("已到达最大长度");
        }
      },
      contact(value){
        this.hasGetPhone = /^1[34578]\d{9}$/.test(value);
      },
    },
    created() {
      self = this;
    },
    methods:{
      /**
       * 提交意见
       */
      sumbitIdea(){
        if(this.hasGetPhone && this.name && this.address && this.textarea){
          con.post("/api/my/shopApply",{
            "realName":this.name,
            "contactWay":this.address,
            "address":this.contact,
            "content":this.textarea,
            "name":this.userImg
          },(response) => {
            if(response.result === 1){
              //
            }else{
              con.toast(response.msg);
            }
          })
        }else{
          con.toast("您还有信息未填写")
        }
      },
      /**
       * 删除图片
       * @param e 当前元素
       */
      deleteImg(e){
        if(self.arr.length) {
          self.arr.splice($(e.target.parentNode).index(), 1);//删除当前元素的下标
          con.toast("删除成功");
          self.userImg = self.arr.join(",");
        }
      },
      /**
       * 上传图片
       * @param e 当前元素
       */
      updataImg(e){
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
          let img = this.result;
          if(self.arr.length < self.imgLength){
            con.post("/api/upload/image",{
              "data" : img
            },(response) => {
              self.arr.push(response.data.src);
              self.userImg = self.arr.join(",");
              if(e.target.value){//清空input value值
                e.target.value = "";
              }
            })
          }else{
            con.toast("最多上传三张图片");
          }

        };
        reader.readAsDataURL(file);
      }
    }
  }
</script>

<style scoped lang="less">
  #open-shop{
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }
  .content{
    width: 100%;
    padding: 15/75rem 30/75rem;

    .user-info-list{
      width: 100%;
      border-radius: 5/75rem;
      background: #fff;
      li{
        width: 100%;
        height: 96/75rem;
        border-bottom: 1px solid #e3e5e9;
        &:last-child{
          border: none;
        }
        input{
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          font-size: 28/75rem;
          padding: 20/75rem;
          color: #666;
          &::-webkit-input-placeholder{
            color: #ccc;
          }
        }
      }
    }

    .one{
      width: 100%;
      height: 300/75rem;
      background: #fff;
      padding: 0.266666rem 20/75rem;
      margin: 20/75rem 0;
      border-radius: 5/75rem;
      -webkit-border-radius: 5/75rem;
      .textarea{
        border: none;
        outline: none;
        width: 100%;
        min-height: 230/75rem;
        resize: none;
        font-size: 0.373333rem;
        line-height: 0.5rem;
        font-style: normal;
        color: #666;

        &::-webkit-scrollbar{
          display: none;
        }
        &::-webkit-input-placeholder{
          font-style: normal;
          color: #ccc;
          font-size: 28/75rem;
          font-weight: 500;
        }
      }
      .length{
        font-size: 0.346666rem;
        color: #999;
        float: right;
      }
    }

    .two {
      width: 100%;
      height: 3.44rem;
      background: #fff;
      margin-top: 0.266666rem;
      padding: 0 0.4rem;
      color: #333;
      border-radius: 5/75rem;
      -webkit-border-radius: 5/75rem;

      .caption {
        font-size: 0.373333rem;
        padding-top: 0.266666rem;
      }
      .img-box {
        padding: 0.4rem 0;
        li {
          width: 2rem;
          height: 2rem;
          float: left;
          margin-right: 0.1rem;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          i.close {
            display: inline-block;
            width: 24/75rem;
            height: 24/75rem;
            padding: 24/75rem;
            background: url("../../assets/web/btnDelete4.png") no-repeat center;
            background-size: 24/75rem 24/75rem;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
        li:last-child {
          background: url(../../assets/web/btn_add_image.png) no-repeat 0 0;
          background-size: cover;
          overflow: hidden;
          input {
            opacity: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .submit{
      width: 9.2rem;
      height: 1.173333rem;
      margin: 50/75rem auto;
      button{
        display: block;
        width: 100%;
        height: 100%;
        background: #C63535;
        color: #fff;
        line-height: 1.173333rem;
        font-size: 0.4rem;
        text-align: center;
        border-radius: 0.133333rem;
        -webkit-border-radius: 0.133333rem;
        border: none;
        outline: none;
      }
    }

  }
</style>
