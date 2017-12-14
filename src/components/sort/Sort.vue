<template>
  <div id="type">
    <!--头部搜索栏-->
    <header class="sort-header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <div class="search">
        <router-link replace to="/search">
          <i class="search-icon"></i>
          <span class="placeholder">大家都在搜</span>
        </router-link>
      </div>
    </header>

    <section class="sort-content clearfix">

      <div class="left">
        <ul class="left-list">
          <li class="all-list">
            <a @click="getAllList($event)" :class="{'active':true}">全部</a>
          </li>
          <li v-for="(item,index) in childList">
            <a @click="secondList($event)" :id="item.id">{{item.catagory}}</a>
          </li>
        </ul>
      </div>

      <div class="right">
        <!--头部导航-->
        <ul class="nav">
          <li v-for="(item, index) in catagoryList">
            <a :class="{'active':type === index}" @click="changeType(index)">{{item.catagory}}</a>
          </li>
        </ul>

        <!--日期导航-->
        <div v-show="thirdShow" class="date-nav">
          <div @click="allSort($event)" class="all active">全部</div>
          <div class="data-wrap">
            <ul class="date-list clearfix">
              <li v-for="item in threeList">
                <a class="" @click="getThirdList($event)" :id="item.id">{{item.catagory}}</a>
              </li>
            </ul>
          </div>
        </div>

        <!--商品列表-->
        <ul class="shop-list clearfix">
          <li v-if="list.length>0" v-for="item in list">
            <router-link :to="'details?id='+item.id">
              <img :src="item.coverImg"/>
              <span class="text">{{item.name}}</span>
              <span class="price">&yen;{{item.preferentialPrice}}</span>
            </router-link>
          </li>
          <div v-if="list.length<=0">暂无数据</div>
        </ul>

      </div>

    </section>

    <my-nav :current="1"></my-nav>
  </div>
</template>

<script>
  import {con} from '../../assets/js/common'
  import $ from "jquery"

  export default {
    name: 'shop',
    data() {
      return {
        type: 0,
        list: [],
        thirdShow: false,
        catagoryList: [],
        childList: [],
        threeList: [],
        id: "",
        secondId: "",
        thirdId: "",
        pageNo: 1
      }
    },
    mounted() {
      this.getIds();
    },
    methods: {
      getIds() {
        con.get("/api/product/classify ", (response) => {
          if (response.result === 1) {
            this.list = response.data.productList;
            this.catagoryList = response.data.fatherCatagoryList;
            this.id = response.data.fatherCatagoryList[0].id;
            this.childList = response.data.childCatagoryList;
            this.threeList = response.data.secondChildCatagoryList;
            if (this.thirdList.length > 0) {
              this.thirdShow = true;
            } else {
              this.thirdShow = false;
            }
          } else {
            con.toast(response.msg);
          }
        })
      },
      /**
       * 获取分类列表
       * @param index 分类索引
       */
      changeType(index) {
        this.type = index;
        this.id = this.catagoryList[index].id;
        this.getShopList();
      },
      getShopList() {
        con.get("/api/product/classify?pageNo=" + this.pageNo + "&fatherCatagory=" + this.id, (response) => {
          if (response.result === 1) {
            if (this.pageNo === 1) {
              this.list = response.data.productList;
            } else {
              this.list = this.list.concat(response.data.productList);
            }
            this.childList = response.data.childCatagoryList;
            if (parseInt(this.id) === 1) {
              this.thirdShow = true;
            } else {
              this.thirdShow = false;
            }
          } else {
            con.toast(response.msg);
          }
        });
      },
      /**
       * 二级列表
       * @param e
       */
      secondList(e) {
        $(e.target).addClass("active").parent().siblings().find("a").removeClass("active");
        if (parseInt(this.id) === 1) {
          this.thirdShow = true;
        }
        this.thirdList(e);
      },
      /**
       * 获取三级导航
       */
      thirdList(e) {
        this.secondId = e.target.id;
        con.get("/api/product/classify?fatherCatagory=" + this.id + "&childCategory=" + this.secondId,
          (response) => {
            if (response.result === 1) {
              this.threeList = response.data.secondChildCatagoryList;
              this.list = response.data.productList;
            } else {
              con.toast(response.msg);
            }
          })
      },
      allSort(e) {
        $(e.target).addClass("active").nextAll().children().children().children().removeClass("active");
        con.get("/api/product/classify?fatherCatagory=" + this.id + "&childCategory=" + this.secondId,
          (response) => {
            if (response.result === 1) {
              this.threeList = response.data.secondChildCatagoryList;
              this.list = response.data.productList;
            } else {
              con.toast(response.msg);
            }
          })
      },
      /**
       * 获取三级商品列表
       */
      getThirdList(e) {
        this.thirdId = e.target.id;
        if (parseInt(this.id) === 1) {
          con.get("/api/product/classify?fatherCatagory=" + this.id + "&childCategory=" + this.secondId + "&secondChildCatagory=" + this.thirdId,
            (response) => {
              if (response.result === 1) {
                $(e.target).addClass("active").parent().siblings().find("a").removeClass("active");
                $(e.target).parent().parent().parent().prev().removeClass("active");
                if (response.data.productList.length === 0) {
                  this.list = [];
                } else {
                  this.list = response.data.productList;
                }
              } else {
                con.toast(response.msg)
              }
            })
        }
      },
      /**
       * 全部
       * @param e
       */
      getAllList(e) {
        if (parseInt(this.id) === 1) {
          this.thirdShow = true;
        } else {
          this.thirdShow = false;
        }
        $(e.target).addClass("active").parent().siblings().find("a").removeClass("active");
        con.get("/api/product/classify?pageNo=" + this.pageNo + "&fatherCatagory=" + this.id, (response) => {
          if (response.result === 1) {
            if (this.pageNo === 1) {
              this.list = response.data.productList;
            } else {
              this.list = this.list.concat(response.data.productList);
            }
            this.childList = response.data.childCatagoryList;
          } else {
            con.toast(response.msg);
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  #type {
    /*padding-bottom: 98/75rem;*/
    .sort-header {
      width: 100%;
      height: 1.173333rem;
      background: #303030;
      padding: 0.213333rem 0.4rem;
      font-size: 0.346666rem;
      line-height: 1rem;

      .back-pre {
        display: inline-block;
        width: 0.24rem;
        height: 0.426666rem;
        background: url(../../assets/web/btn_arrow_back2.png) 0 0 no-repeat;
        background-size: cover;
        /*margin-top: 0.133333rem;*/
        margin-right: 0.266666rem;
      }

      .search {
        width: 8.466666rem;
        height: 100%;
        display: inline-block;
        background: #fff;
        -webkit-border-radius: 0.746666rem;
        -moz-border-radius: 0.746666rem;
        border-radius: 0.746666rem;
        padding: 0 0.24rem 0.2rem;
        position: relative;
        > a {
          display: flex;
          align-items: center;
          padding-top: 5/75rem;
        }
        .search-icon {
          display: inline-block;
          width: 0.48rem;
          height: 0.48rem;
          background: url(../../assets/web/icon_search2.png) 0 0 no-repeat;
          background-size: cover;
          margin-top: 0.1rem;
          margin-right: 0.266666rem;
        }
        .placeholder {
          color: #999;
          padding-left: 20/75rem;
          font-size: 24/75rem;
          border-left: 1px solid #ccc;
          margin-top: 8/75rem;
        }

      }
    }
  }

  .sort-content {
    width: 100%;
    position: relative;

    .left {
      float: left;
      width: 2rem;
      min-height: 100vh;
      border-right: 1px solid #e5e5e5;
      background: #f5f5f5;

      .left-list {
        width: 100%;
        background: #fff;
        li {
          width: 100%;
          height: 1.173333rem;

          .active {
            background: #C63535;
            color: #fff;
          }
          a {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 1.173333rem;
            text-align: center;
            font-size: 0.32rem;
            color: #999;
          }

        }
      }
    }

    .right {
      width: 8rem;
      float: right;
      .nav {
        width: 100%;
        height: 1.293333rem;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        li {
          width: 2.666666rem;
          height: 100%;
          a {
            display: block;
            width: 100%;
            height: 100%;
            padding: 0.466666rem 0.5rem;
            text-align: center;
            font-size: 0.346666rem;
            position: relative;
          }
          .active {
            color: #C63535;
          }
          .active:after {
            content: "";
            display: block;
            width: 1.666666rem;
            height: 0.066666rem;
            background: #C63535;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
          }
          &:nth-of-type(3) {
            a {
              padding-top: 0.266666rem;
              line-height: 0.4rem;
            }
          }

        }
      }

      .date-nav {
        width: 100%;
        height: 1.066666rem;
        position: relative;
        border-bottom: 1px solid #e5e5e5;
        .active {
          color: #C63535;
        }
        .all {
          width: 1.4rem;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          text-align: center;
          line-height: 1.066666rem;
          font-size: 0.293333rem;
        }

        .data-wrap {
          width: 6.6rem;
          height: 100%;
          position: absolute;
          top: 0;
          left: 1.4rem;

          .date-list {
            min-width: 6.6rem;
            height: 1.066666rem;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            overflow-x: auto;

            &::-webkit-scrollbar { /*隐藏滚动条*/
              display: none;
            }

            li {
              height: 100%;
              a {
                display: block;
                width: 100%;
                height: 100%;
                line-height: 1.066666rem;
                margin-right: 0.4rem;
                font-size: 0.293333rem;
                color: #333;
                &.active {
                  color: #C63535;
                }
              }
            }
          }
        }
      }

      .shop-list {
        width: 100%;
        height: 14.2rem;
        overflow-y: auto;

        &::-webkit-scrollBar {
          display: none;
        }
        div{
          text-align: center;
          font-size: 0.32rem;
          color: #333;
          padding-top: 100/75rem;
        }

        li {
          width: 4rem;
          height: 4.066666rem;
          float: left;
          border: 1px solid #e5e5e5;
          border-top: none;
          margin-left: -1px;

          &:nth-of-type(even) {
            border-right: none;
          }
          a {
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            img {
              width: 2.133333rem;
              height: 2.133333rem;
              margin-top: 0.426666rem;
            }
            .text, .price {
              display: block;
            }
            .text {
              width: 2.8rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin: 0 auto;
              padding: 0.266666rem 0;
              font-size: 0.32rem;
              color: #333;
            }
            .price {
              font-size: 0.32rem;
              color: #C63535;
            }
          }
        }
      }

    }

  }
</style>
