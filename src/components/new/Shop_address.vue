<template>
  <div id="shop_address">
    <!--头部-->
    <header class="header">
      <a onclick="history.back()">
        <i class="back-pre"></i>
      </a>
      <span class="title">收货地址管理</span>
    </header>

    <!--用户地址-->
    <section class="content">
      <!---------------无内容状态------------------>
      <div v-if="getContent" class="null-content">
        <router-link v-if="isLogin" to="/compile"><img src="../../assets/web/img_address_empty.png"/></router-link>
        <a v-else><img src="../../assets/web/img_address_empty.png"/></a>
        <p class="text">亲，您还没有收货地址</p>
      </div>


      <!--------------有内容状态------------------->
      <div v-else>
        <div v-for="item in addressList" class="user-address" :id="item.id">
          <div @click="getInfo(item)">
            <div class="user-info">
              <span class="name">{{item.linkman}}</span>
              <span class="phone-num">{{item.linkmanMobile}}</span>
            </div>

            <div class="address">
              {{item.province+item.city+item.district+item.address}}
            </div>
          </div>

          <div class="uesr-operate clearfix">
            <div v-if="item.fixed==1" class="left-box">
              <i class="checked"></i>
              <span class="default">默认地址</span>
            </div>
            <div v-if="item.fixed==0" class="left-box">
              <i @click="setDefault(item.id)" class="checkbox"></i>
              <span class="text">设为默认</span>
            </div>
            <div class="right-box">
              <a @click="editAddress(item)" class="edit">
                <i></i>
                <span>编辑</span>
              </a>
              <a @click="deleteAddress(item.id)" class="delete">
                <i></i>
                <span>删除</span>
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>


    <!--新建地址-->
    <footer class="footer">
      <a @click="addAddress" class="outer">
        <i class="add"></i>
        <span>新建地址</span>
      </a>
    </footer>

    <!--删除地址弹窗-->
    <!--<div class="popup">
      <div class="confirm">
        &lt;!&ndash;提示文字&ndash;&gt;
        <div class="tips">
          <span class="cancel-order">确定删除地址吗?</span>
        </div>

        &lt;!&ndash;按钮&ndash;&gt;
        <div class="btn">
          <div class="cancel" title="false">取消</div>
          <div class="ensure" title="true">确定</div>
        </div>
      </div>
    </div>-->



  </div>
</template>

<script>
  import {con} from "../../assets/js/common"
  import $ from "jquery"
  import {MessageBox} from 'mint-ui'

  export default {
    data () {
      return {
        getContent:true,
        addressList:[],
        isLogin:false,
      }
    },
    mounted () {
      this.getAddressList();
    },
    methods:{
      /**
       * 获取收货地址列表
       */
      getAddressList(){
        con.get("/api/orderAddress/list",(response) => {
          if(response.result === 1){
            this.isLogin = true;
            if(response.data.addressList.length !== 0){
              this.getContent = false;
              this.addressList = response.data.addressList;
            }
          }else{
            con.toast(response.msg);
          }
        })
      },
      /**
       *  设置默认地址
       */
      setDefault(id){
        con.post("/api/orderAddress/fixed",{
          "id":id,
        },(response) => {
          if(response.result === 1){
            con.toast("设置成功","center");
            this.getAddressList();
          }else{
            con.toast(response.msg,"center")
          }
        })
      },
      /**
       * 删除收货地址
       * @param id  后台返回的当前地址的id
       */
      deleteAddress(id){
        MessageBox.confirm("确定删除吗?","删除地址").then(() => {
          con.post("/api/orderAddress/delete",{
            "id": id
          },(response) => {
            if(response.result === 1){
              con.toast("删除成功","center");
              this.getAddressList();
            }else{
              con.toast(response.msg,"center");
            }
          })
        });
      },
      /**
       * 编辑地址
       * @param item  当前项的数据
       */
      editAddress(item) {
        localStorage.setItem("address", JSON.stringify({
          id: item.id,
          province: item.province,
          city: item.city,
          district: item.district,
          address: item.address,
          linkman: item.linkman,
          linkmanMobile: item.linkmanMobile
        }));
        this.$router.push("/compile")
      },
      /**
       * 新增收货地址
       */
      addAddress(){
        localStorage.removeItem("address");
        if(this.isLogin){
          this.$router.push("/compile");
        }else{
          con.toast("请先登录");
        }
      },
      /**
       * 获取用户信息跳转确认订单页
       */
      getInfo(item){
//        console.log(item)
        sessionStorage.removeItem("info");
        this.$router.go(-1);
        sessionStorage.setItem("info",JSON.stringify({
          id: item.id,
          name: item.linkman,
          phone: item.linkmanMobile,
          address: item.province+item.city+item.district+item.address
        }))
      }
    }
  }
</script>

<style scoped lang="less">
  #shop_address{
    width: 100%;
    min-height: 100vh;
    background: #f5f5f5;
  }

  .content{
    width: 100%;

    .null-content{
      padding-top: 2.933333rem;
      width: 100%;
      text-align: center;
      a{
        display: block;
        width: 100%;
        height: 100%;
      }
      img{
        width: 4.826666rem;
        height: 4.826666rem;
      }
      .text{
        font-size: 0.373333rem;
        color: #999;
        padding: 0.333333rem 0;
      }
    }

    .user-address{
      width: 100%;
      min-height: 3.266666rem;
      padding: 0 0.4rem;
      background: #fff;

      margin-bottom: 0.266666rem;

    }

    .user-info{
      padding-top: 0.533333rem;
      .name{
        font-weight: 500;
      }
      .phone-num{
        padding-left: 1.066666rem;
      }
    }

    .address{
      padding: 0.266666rem 0;
      border-bottom: 0.013333rem solid #ddd;
      line-height: 0.4rem;
      min-height: 1.3rem;
      font-size: 26/75rem;
      color: #333;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .uesr-operate{
      width: 100%;
      .left-box{
        float: left;

        .default{
          color: #f24545;
        }

        .checked{
          background: url(../../assets/web/checkbox_checked.png) 0 0 no-repeat;
        }
        .checkbox{
          background: url(../../assets/web/checkBox.png) 0 0 no-repeat;
        }

        .checked,.checkbox{
          display: inline-block;
          width: 0.48rem;
          height: 0.48rem;
          background-size: cover;
          vertical-align: -22%;
        }

      }
      .right-box{
        float: right;
        .edit{
          margin-right: 0.266666rem;
          i{
            width: 0.32rem;
            background: url(../../assets/web/icon_address_edit.png) 0 0 no-repeat;
          }
        }
        .delete{
          i{
            width: 0.346666rem;
            background: url(../../assets/web/btn_delete2.png) 0 0 no-repeat;
          }
        }
        .edit,.delete{
          i{
            display: inline-block;
            height: 0.4rem;
            background-size: cover;
            vertical-align: -13%;
            margin-right: 0.133333rem;
          }
        }

      }
      .left-box,.right-box{
        padding-top: 0.266666rem;
        span{
          font-size: 26/75rem;
          color: #666;
        }
      }
    }

  }
  .footer{
    width: 100%;
    height: 1.173333rem;
    background: #c63535;
    padding: 0 0.4rem;
    position: fixed;
    bottom: 0;
    text-align: center;
    a{
      display: block;
      width: 100%;
      height: 100%;
      line-height: 1.173333rem;
    }
    .outer{
      color: #fff;

      .add{
        display: inline-block;
        width: 0.533333rem;
        height: 0.533333rem;
        background: url(../../assets/web/icon_add.png) 0 0 no-repeat;
        background-size: cover;
        vertical-align: text-top;
      }
    }
  }


/*弹窗*/
.popup{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  z-index: 10;

  .confirm{
    width: 7.2rem;
    min-height: 2.773333rem;
    background: rgba(242,242,242,.9);
    margin: 7.333333rem auto 0;
    border-radius: 0.2rem;
    -webkit-border-radius: 0.2rem;
    .tips{
      width: 100%;
      min-height: 1.573333rem;
      border-bottom: 2px solid #dfe0e2;
      padding: 0.6rem 1.7rem;
      text-align: center;
      font-size: 0.4rem;
      color: #000;
      font-weight: 500;
    }
    .btn{
      width: 100%;
      height: 1.173333rem;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      >div{
        width: 50%;
        height: 100%;
        line-height: 1.173333rem;
        text-align: center;
        font-size: 0.4rem;
        color: #0076ff;
      }
      .cancel{
        border-right: 2px solid #dfe0e2;
      }
    }
  }

}
</style>
