<template>
  <div id="network">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">账单</span>
    </header>


    <!---->
    <section class="content">
      <img src="../../assets/web/img_network_wrong.png"/>
      <p class="status">人走茶凉，连网络都没了</p>
      <router-link class="reset-btn" to="/">重新加载</router-link>
    </section>

  </div>
</template>

<script>
</script>

<style scoped lang="less">
#network{
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}


.content{
  width: 100%;
  text-align: center;
  padding-top: 2.933333rem;

  img{
    width: 4.826666rem;
    height: 4.826666rem;
  }
  .status{
    font-size: 0.373333rem;
    padding: 0.373333rem 0;
    color: #999;
  }
  .reset-btn{
    display: inline-block;
    border: 0.026666rem solid #999;
    color: #999;
    padding: 0.2rem 0.4rem;
    margin: 0.266666rem 0;
    border-radius: 0.133333rem;
    -webkit-border-radius: 0.133333rem;
  }
}

</style>
