<template>
  <div id="idea">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">意见反馈</span>
    </header>

    <section class="content">
      <!--问题和建议-->
      <div class="title">问题和建议</div>
      <div class="one clearfix">
        <textarea maxlength="200" class="textarea" v-model="textarea" placeholder="请输入您的宝贵意见"></textarea>
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

      <!--联系方式-->
      <div class="title">联系方式</div>
      <div class="contact">
        <input v-model="contact" type="number" placeholder="选填，便于我们与您联系">
      </div>

      <div class="submit">
        <button @click="sumbitIdea">提交意见</button>
      </div>
    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"
  import $ from "jquery"

  let self;
  export default {
    data () {
      return {
        textarea: "",
        imgLength:3,
        arr:[],
        imgName:[],
        userImg:"",
        contact:"",
        hasGetPhone:false,
      }
    },
    watch:{
      textarea(newVal){
        if(newVal.trim().length >= 200){
          con.toast("已到达最大长度");
        }
      },
      contact(value){
        this.hasGetPhone = /^1[34578]\d{9}$/.test(value);
      }
    },
    created() {
      self = this;
    },
    methods:{
      /**
       * 提交意见
       */
      sumbitIdea(){
        if(self.textarea.length < 2){
          con.toast("您输入的意见长度太小，请重新输入");
        }else{
//          if(self.hasGetPhone){
            con.post("/api/feedback",{
              "textContent":self.textarea,
              "images":self.userImg,
              "contact":self.contact
            },(response) => {
              if(response.result === 1){
                con.toast("提交成功，我们会根据您的意见不断改进");
                setTimeout(() => {
                  this.$router.replace('/home');
                },2000)
              }else{
                con.toast(response.msg)
              }
            })
//          }
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
          self.userImg = self.arr.join(";");
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
              self.imgName.push(response.data.name);
              self.userImg = self.imgName.join(";");
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
  #idea{
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }

  .content{
    width: 100%;
    .title{
      width: 100%;
      height: 84/75rem;
      padding: 0 30/75rem;
      line-height: 84/75rem;
      font-size: 26/75rem;
      color: #666;
    }
    .one{
      width: 100%;
      min-height: 2.933333rem;
      background: #fff;
      padding: 0.266666rem 0.4rem;
      .textarea{
        border: none;
        outline: none;
        width: 100%;
        min-height: 2.133333rem;
        resize: none;
        font-size: 0.373333rem;
        color: #333;
        line-height: 0.5rem;

        &::-webkit-scrollbar{
          display: none;
        }
      }
      .length{
        font-size: 0.346666rem;
        color: #999;
        float: right;
      }
    }
    .two{
      width: 100%;
      height: 3.44rem;
      background: #fff;
      margin-top: 0.266666rem;
      padding: 0 0.4rem;

      .caption{
        font-size: 0.373333rem;
        padding-top: 0.266666rem;
      }
      .img-box{
        padding: 0.4rem 0;
        li{
          width: 2rem;
          height: 2rem;
          float: left;
          margin-right: 0.266666rem;
          position: relative;
          img{
            width: 100%;
            height: 100%;
          }
          i.close{
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
        li:last-child{
          background: url(../../assets/web/btn_add_image.png) no-repeat 0 0 ;
          background-size: cover;
          overflow: hidden;
          input{
            opacity: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .contact{
      width: 100%;
      height: 80/75rem;
      background: #fff;
      padding: 0 30/75rem;
      input[type="text"]{
        width: 100%;
        height: 100%;
        font-size: 28/75rem;
        color: #999;
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
