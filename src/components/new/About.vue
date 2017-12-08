<template>
  <div id="about">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">关于我们</span>
    </header>

    <!--内容-->
    <section class="content">
      <div class="item-box">
        <h4 class="title">我们的态度：</h4>
        <p class="item-text">创造空间；（空间包含市场空间、利润空间、发展空间、创新空间）</p>
        <p class="item-text">财富共盈；（共盈包含商家共盈、员工共盈、茶友共盈、收藏共盈）</p>
        <p class="item-text">品牌巅峰；（巅峰包含一流品质、远大理想、优质服务、雄厚资金）</p>
        <p class="item-text">体现价值；（价值包含品牌价值、人生价值、友谊价值、增长价值）</p>
      </div>
      <div class="item-box">
        <h4 class="title">我们的理想：</h4>
        <p class="item-text">成为同行业产品质量、服务意识、经营理念、价格制度的标杆；成为爱茶之人的终身伴侣成功人士品质生活的要素；高贵身份显著的礼品</p>
      </div>
      <div class="item-box">
        <h4 class="title">我们的观念：</h4>
        <p class="item-text">一直只做纯料易武茶，物美价实，品质保证，童叟无欺！</p>
      </div>
      <div class="item-box">
        <h4 class="title">我们的追求：</h4>
        <p class="item-text">全国品牌链锁经营，“茶莫停”总会有一间就在你身边，总有一份关爱时刻陪伴着你。</p>
      </div>
      <!--{{text}}-->
    </section>

    <!--版权信息-->
    <footer class="footer">
      <p>Copyright© 2017茶莫停</p>
      <p>广州百年保健食品有限公司</p>
    </footer>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data(){
      return {
        text: ""
      }
    },
    mounted(){
      this.getAboutInfo();
    },
    methods:{
      getAboutInfo(){
        con.get("/api/my/about",(response) => {
          if(response.result === 1){
            console.log(response);
            this.text = response.data.content;
            //todo 关于我们
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
#about{
  width: 100%;
  height: 100vh;
}

.content{
  width: 100%;
  padding: 0 0.4rem;

  .item-box{
    color: #333;
  }
  .title{
    font-size: 0.373333rem;
    padding: 0.346666rem 0;
  }
  .item-text{
    font-size: 0.346666rem;
    line-height: 0.426666rem;
    margin-bottom: 0.346666rem;
  }
}

.footer{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.4rem;
  margin: auto;
  text-align: center;
  p{
    font-size: 0.346666rem;
    color: #666;
    margin-top: 0.2rem;
  }
}

</style>
