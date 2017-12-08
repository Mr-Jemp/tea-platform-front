<template>
  <div id="contact">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">联系我们</span>
    </header>

    <!---->
    <section class="content">
      <div class="top">
        <img src="../../assets/web/logo.png"/>
        <p class="name">广州市百年保健食品有限公司</p>
      </div>

      <ul class="bottom">
        <li class="item">电话：400-880-9915</li>
        <li class="item">传真：020-81891117</li>
        <li class="item">QQ：4408809915</li>
        <li class="item">邮箱：chamoting_2011@yahoo.com.cn</li>
        <li class="item">官网：www.chamoting.com</li>
        <li class="item">地址：广州市荔湾区芳村南方茶叶市场天易茶叶广场后茶莫
停四楼</li>
      </ul>
    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data () {
      return {

      }
    },
    mounted(){
      this.getContactInfo();
    },
    methods:{
      getContactInfo(){
        con.get("/api/my/contact",(response) => {
          if(response.result === 1){
            console.log(response)
            //todo 联系我们
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
#contact{
  width: 100%;
  height: 100vh;
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
  padding: 0 0.4rem;

  .top{
    width: 100%;
    height: 6.293333rem;
    text-align: center;
    padding-top: 1.333333rem;

    img{
      width: 1.866666rem;
      height: 2.666666rem;
    }
    .name{
      font-size: 0.4rem;
      color: #333;
      padding: 0.373333rem 0;
    }
  }

  .bottom{
    .item{
      font-size: 0.346666rem;
      color: #666;
      padding-bottom: 0.346666rem;
      line-height: 0.4rem;
    }
  }

}

</style>
