<template>
  <div id="shop">
    <!--头部搜索栏-->
    <header class="header">
      <div class="search">
        <router-link replace to="/search">
          <i></i><span class="placeholder">大家都在搜</span>
        </router-link>
      </div>
    </header>

    <!--商品信息-->
    <section class="shop-info">
      <!--商品分类-->
      <header class="head">
        <ul class="menu">
          <li v-for="(item, index) in catagorieList">
            <a :class="{'active':type === index}" @click="changeType(index)">{{item.catagory}}</a>
          </li>
        </ul>
      </header>

      <!--商品列表-->
      <ul class="shop-list clearfix">
        <li class="item" v-for="item in list">
          <router-link :to="'/details?id='+item.id">
            <img :src="item.coverImg"/>
            <span class="text-info">{{item.name}}</span>
            <span class="price">&yen; {{item.price}}</span>
          </router-link>
        </li>
      </ul>
    </section>

    <my-nav :current="2"></my-nav>
  </div>
</template>

<script>
  import {con} from '../../assets/js/common'

  export default {
    name: 'shop',
    data() {
      return {
        type: 0,
        list: [],
        catagorieList: [],
        id: "",
        pageNo: 1,
        href:false,
      }
    },
    watch:{
      type(newVal,old){

      }
    },
    mounted(){
      this.getIds();
      this.type = parseInt(this.$route.query.type) || 0;
    },
    methods:{
      getIds(){
        con.get("/api/product/marketPage", (response) => {
          if(response.result === 1) {
            this.list = response.data.productList;
            this.catagorieList = response.data.catagorieList;
            this.id = response.data.catagorieList[0].id;
          } else {
            con.toast(response.msg);
          }
        })
      },
      /**
       * 获取分类列表
       * @param index 分类索引
       */
      changeType(index){
        this.type = index;
        this.id = this.catagorieList[index].id;
        this.getShopList();
      },
      getShopList(){
        con.get("/api/product/marketPage?pageNo=" + this.pageNo + "&fatherCatagory=" + this.id, (response) => {
          if(response.result === 1) {
            if(this.pageNo === 1) {
              this.list = response.data.productList;
            } else {
              this.list = this.list.concat(response.data.productList);
            }
          } else {
            con.toast(response.msg);
          }
        });
      },
    }
  }
</script>

<style scoped lang="less">
  #shop {
    padding-bottom: 98/75rem;
    background: #f5f5f5;
    min-height: 100vh;
  }

  .header{
    padding: 16/75rem 30/75rem;
    height: 88/75rem;
    background-color: #303030;
    .search {
      height: 100%;
      line-height: 100%;
      background-color: #fff;
      -webkit-border-radius: 56/75rem;
      -moz-border-radius: 56/75rem;
      border-radius: 56/75rem;
      padding: 0 20/75rem;
      a{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 80/75rem;
        padding-bottom: 30/75rem;
      }
      i {
        display: block;
        width: 36/75rem;
        height: 36/75rem;
        background: url(./../../assets/web/icon_search2.png) 0 0 no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }
      .placeholder{
        color: #999;
        padding-left: 20/75rem;
        font-size: 20/75rem;
        border-left: 1px solid #999;
        margin-left: 20/75rem;
        margin-top: 5/75rem;
      }
    }
  }

  .shop-info{
    width: 100%;

    .head{
      width: 100%;
      height: 1.066666rem;
      background: #303030;
    }

    .menu{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;

      li{
        width: 3.333333rem;
        height: 100%;
        text-align: center;
        line-height: 1.066666rem;
        a{
          display: block;
          width: 100%;
          height: 100%;
          line-height: 1.066666rem;
        }

        .active{
          color: #f24545;
          &:after{
            content: "";
            display: block;
            width: 0.866666rem;
            height: 0.066666rem;
            background: #f24545;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0.066666rem;
            margin: auto;
          }
        }


        a{
          color: #fff;
          font-size: 0.4rem;
          position: relative;
        }
      }
    }

    .shop-list{
      width: 100%;

      .item{
        float: left;
        width: 4.933333rem;
        height: 6.493333rem;
        background: #fff;
        font-size: 0.373333rem;
        margin-right: 0.133333rem;
        margin-bottom: 0.133333rem;
        a{
          display: block;
          width: 100%;
          height: 100%;
        }

        img{
          width: 4.933333rem;
          height: 4.933333rem;
        }

        .text-info{
          display: block;
          padding: 0.2rem 0.133333rem;
          color: #666;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .price{
          display: block;
          color: #c63535;
          padding: 0px 0.133333rem;
          font-weight: 600;
        }
      }
      .item:nth-of-type(even){
        margin-right: 0;
      }

    }

  }
</style>

