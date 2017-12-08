<template>
  <div id="seckill">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">秒杀抢购</span>
    </header>

    <section class="content">

      <ul class="shop-list clearfix">
        <li v-for="item in productInfo.productList">
        	<router-link :to="'/details?id='+item.id">
        	  <img :src="item.coverImg"/>
        	  <span class="shop-text">{{item.name}}</span>
        	  <span class="bottom clearfix">
        	    <span class="price">&yen;{{item.price}}</span>
        	    <a class="btn">去看看</a>
        	  </span>

        	  <!--倒计时-->
        	  <div class="countdown">
        	    <span>距开始</span>
        	    <em>
        	      <span class="time">23</span> :
        	      <span class="time">12</span> :
        	      <span class="time">57</span>
        	    </em>
        	  </div>
        	</router-link>
        </li>
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
        con.get("/api/productType/list?type=1",(response) => {
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
#seckill{
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

.content{
  width: 100%;

  .shop-list{
    width: 100%;

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

        .price{
          float: left;
          font-size: 0.373333rem;
          color: #c63535;
          font-weight: 600;
        }
        .btn{
          float: right;
          font-size: 0.293333rem;
          color: #fff;
          width: 1.333333rem;
          height: 0.533333rem;
          text-align: center;
          background: #c63535;
          line-height: 0.533333rem;
          border-radius: 0.066666rem;
          -webkit-border-radius: 0.066666rem;
          margin-top: -4px;
        }
      }

      .countdown{
        width: 100%;
        height: 0.666666rem;
        background: rgba(0,0,0,.4);
        position: absolute;
        top: 4.266666rem;
        line-height: 0.666666rem;
        >span{
          color: #fff;
          font-size: 0.32rem;
          margin-left: 1.6rem;
        }

        em{
          font-style: normal;
          color: #fff;
          .time{
            display: inline-block;
            width: 0.426666rem;
            height: 0.426666rem;
            background: #fff;
            font-size: 0.293333rem;
            color: #333;
            text-align: center;
            line-height: 0.426666rem;
            border-radius: 3px;
            -webkit-border-radius: 3px;
          }
        }
      }


    }
  }
}

</style>
