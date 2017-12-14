<template>
  <div id="set">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">设置</span>
    </header>

    <!---->
    <section class="content">
      <!--设置列表-->
      <ul class="list">
      	<li class="item clearfix">
      		<router-link to="/shop_address">
      		  <span>收货地址管理</span>
      		  <i class="icon-right"></i>
      		</router-link>
      	</li>
      	<li class="item clearfix">
          <router-link to="/idea">
            <span>意见反馈</span>
            <i class="icon-right"></i>
          </router-link>
        </li>
        <li class="item clearfix">
          <router-link to="/about">
            <span>关于我们</span>
            <i class="icon-right"></i>
          </router-link>
        </li>
        <li class="item clearfix">
          <router-link to="/contact">
            <span>联系我们</span>
            <i class="icon-right"></i>
          </router-link>
        </li>
        <li class="item clearfix">
          <router-link to="">
            <span>版本号</span>
            <span class="version">1.0</span>
          </router-link>
        </li>
      </ul>
    </section>

    <div class="exit-login">
      <a :disabled="disable" class="exit-btn" @click="exitLogin">
        <span>退出登录</span>
      </a>
    </div>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data(){
      return {
        disable:true,
      }
    },
    mounted(){

    },
    methods:{
      exitLogin(){
        this.disable = false;
        if(this.disable === false){
          con.post("/api/security/logout",{},(response) => {
            if(response.result === 1){
              con.toast("退出成功");
              sessionStorage.clear();
              localStorage.clear();
              setTimeout(()=>{
                this.$router.replace("/me");
                this.disable = true;
              },1000)
            }else{
              con.toast(response.msg);
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
#set{
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}


.content{
  width: 100%;

  .list{
    width: 100%;
    padding: 0 0.4rem;
    background: #fff;
    .item{
      width: 100%;
      height: 1.266666rem;
      line-height: 1.266666rem;
      border-bottom: 0.013333rem solid #e3e5e9;
      a{
        display: block;
        width: 100%;
        height: 100%;
        line-height: 1.266666rem;
      }

      span{
        font-size: 0.373333rem;
        color: #333;
      }

      .icon-right{
        display: inline-block;
        width: 0.16rem;
        height: 0.266666rem;
        background: url(../../assets/web/btn_more.png) 0 0 no-repeat;
        background-size: cover;
        float: right;
        margin-top: 0.493333rem;
      }

      .version{
        float: right;
        margin-top: 0.493333rem;
      }

      &:last-child{
        border-bottom: none;
      }
    }

  }

}

.exit-login{
  width: 100%;
  padding: 1.066666rem 0.4rem;

  .exit-btn{
    display: block;
    width: 100%;
    height: 1.173333rem;
    line-height: 1.173333rem;
    background: #c63535;
    text-align: center;
    color: #fff;
    border-radius: 0.2rem;
    -webkit-border-radius: 0.2rem;
    -moz-border-radius: 0.2rem;
  }
}

</style>
