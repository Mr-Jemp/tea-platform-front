<template>
  <div id="integral">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">积分商品</span>
    </header>

    <section class="content">

      <ul class="shop-list clearfix">
        <li v-if="productInfo.productList.length >= 0" v-for="item in productInfo.productList">
          <router-link :to="'/details?id=' + item.id">
            <img :src="item.coverImg"/>
            <span class="shop-text">{{item.name}}</span>
            <span class="bottom">
              <span class="price">&yen;{{item.preferentialPrice}}</span><span class="integr">+{{item.discount}}积分</span>
            </span>
          </router-link>
        </li>
        <div v-if="productInfo.productList.length == 0">暂无数据</div>
      </ul>

    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data(){
      return {
        productInfo:{}
      }
    },
    mounted(){
      this.getProductList();
    },
    methods:{
      getProductList(){
        con.get("/api/productType/list?type=2",(response) => {
          if(response.result === 1){
            this.productInfo = response.data;
          }else{
            con.toast(response.msg)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
#integral{
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}


.content{
  width: 100%;

  .shop-list{
    width: 100%;
    div{
      text-align: center;
      padding-top: 200/75rem;
      color: #333;
      font-size: 0.35rem;
    }
    li{
      float: left;
      width: 4.933333rem;
      height: 6.746666rem;
      background: #fff;
      margin: 0 0.133333rem 0.133333rem 0;
      position: relative;
      overflow: hidden;
      &:nth-of-type(even){
        margin-right: 0;
      }

      >a{
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
      }
      img{
        width: 4.933333rem;
        height: 4.933333rem;
      }

      .shop-text{
        display: block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.373333rem;
        color: #666;
        padding: 0.266666rem 0.133333rem;
      }

      .bottom{
        display: block;
        width: 100%;
        padding: 0.2rem 0.133333rem;
        font-size: 0.373333rem;
        .price,.integr{
          color: #c63535;
          font-weight: 600;
        }

      }


    }
  }
}

</style>
