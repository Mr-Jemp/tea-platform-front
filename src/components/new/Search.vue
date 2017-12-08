<template>
  <div id="search">
    <!--头部搜索栏-->
    <header class="header-search">
      <a onclick="history.go(-1)">
        <i class="back-pre"></i>
      </a>
      <div class="search">
        <i class="search-icon"></i>
        <input v-model="keyword" type="text" placeholder="大家都在搜">
        <i @click="keyword=null" class="delete-icon"></i>
      </div>
      <a @click="searchClick" class="search-btn">搜索</a>
    </header>

    <!--历史记录-->
    <section v-show="historys" class="history">
      <div class="record clearfix">
        <span class="left-text">历史记录</span>
        <span class="right-icon"></span>
      </div>

      <ul class="list clearfix">
      	<li v-for="item in searchHistory">
      		<router-link to=""><span>{{item}}</span></router-link>
      	</li>
      </ul>
    </section>

  </div>
</template>

<script>
  import {con} from "../../assets/js/common"

  export default {
    data(){
      return{
        historys:true,
        keyword:"",
        searchHistory:[],
      }
    },
    mounted(){

    },
    methods:{
      searchClick(){
        /*this.searchHistory.push(this.keyword)
        sessionStorage.setItem("keyword",this.searchHistory);*/
        this.$router.replace("/result?keyword="+encodeURI(this.keyword));
      }
    }
  }
</script>

<style scoped lang="less">
  #search{
    width: 100%;
    height: 100vh;
    background: #f5f5f5;

    .header-search{
      width: 100%;
      height: 1.173333rem;
      background: #303030;
      padding: 0.213333rem 0.4rem;
      font-size: 0.346666rem;
      line-height: 1rem;
      position: relative;

      >a{
        display: inline-block;
        width: 0.9rem;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        padding-top: 30/75rem;
        text-align: center;
      }
      .back-pre{
        display: inline-block;
        width: 0.24rem;
        height: 0.426666rem;
        background: url(../../assets/web/btn_arrow_back2.png) 0 0 no-repeat;
        background-size: cover;
      }

      .search {
        width: 7.4rem;
        height: 100%;
        display: inline-block;
        background: #fff;
        -webkit-border-radius: 0.746666rem;
        -moz-border-radius: 0.746666rem;
        border-radius: 0.746666rem;
        padding: 0 0.24rem 0.2rem;
        position: relative;
        left: 50/75rem;

        .search-icon{
          display: inline-block;
          width: 0.48rem;
          height: 0.48rem;
          background: url(../../assets/web/icon_search2.png) 0 0 no-repeat;
          background-size: cover;
          margin-top: 0.133333rem;
          margin-right: 0.266666rem;
        }
        .delete-icon{
          display: inline-block;
          width: 0.306666rem;
          height: 0.306666rem;
          background: url(../../assets/web/btn_clear2.png) center center no-repeat;
          background-size: cover;
          position: absolute;
          right: 0.306666rem;
          top: 0;
          bottom: 0;
          margin: auto;
        }

        input{
          width: 5.466666rem;
          color: #333;
          height: 0.48rem;
          line-height: 0.24rem;
          padding-left: 20/75rem;
          padding-top: 5/75rem;
          border-left: 1px solid #333;
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          z-index: 10;
        }

      }

      .search-btn{
        color: #fff;
        margin-left: .8rem;
        position: absolute;
        left: 8rem;
        top: 5/75rem;
      }
    }
  }

  .history{
    width: 100%;
    padding: 0px 0.4rem;

    .record{
      width: 9.2rem;
      padding: 0.4rem 0;

      .left-text{
        float: left;
        color: #333;
      }
      .right-icon{
        float: right;
        display: inline-block;
        width: 0.32rem;
        height: 0.373333rem;
        background: url(../../assets/web/btn_delete2.png) 0 0 no-repeat;
        background-size: cover;
        vertical-align: text-bottom;
      }
    }

    .list{

      li{
        float: left;
        background: #e5e5e5;
        padding: 0.093333rem 0.266666rem;
        border-radius: 0.266666rem;
        -webkit-border-radius: 0.266666rem;
        -moz-border-radius: 0.266666rem;
        margin: 0 0.266666rem 0.266666rem 0;

        a{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }

  }
</style>
