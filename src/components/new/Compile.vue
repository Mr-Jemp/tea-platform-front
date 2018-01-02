<template>
  <div id="compile">
    <!--头部-->
    <header class="header">
      <a onclick="history.back();localStorage.clear()">
        <i class="back-pre"></i>
      </a>
      <span class="title">编辑收货地址</span>
    </header>

    <section class="content">

      <ul class="list">
      	<li class="item">
    	    <span class="text">收&ensp;货&ensp;人：</span>
    	    <input v-model="linkman" type="text" />
      	</li>
      	<li class="item">
          <span class="text">手机号码：</span>
          <input v-model="linkmanMobile" type="number" />
        </li>
        <li class="item" id="area">
          <span class="text">所在地区：</span>
          <input id="region" type="text" readonly="" name="input_area"/>
          <input id="values" type="hidden">
          <i class="icon-right"></i>
        </li>
        <li class="item">
          <span class="text">详细地区：</span>
          <input v-model="address" type="text" />
        </li>
      </ul>

      <div @click="saveAddress" :disabled="disabled" class="btn">
        <span>保存</span>
      </div>
    </section>



  </div>
</template>

<script>
  import {con} from "../../assets/js/common"
  import $ from "jquery"
  import "../../assets/LArea/LArea.min.css"
  import {provs_data,citys_data,dists_data} from  "../../assets/LArea/LAreaData2"
  import  "../../assets/LArea/LArea"

  let self;
  let isEdit;
  export default {
    data () {
      return {
        linkman:"",
        linkmanMobile:"",
        province:"",
        city:"",
        district:"",
        address:"",
        hasPhone:false,
        disabled:false,
        id:""
      }
    },
    watch:{
      linkmanMobile(val){
        this.hasPhone = /^1[34578]\d{9}$/.test(val);
      }
    },
    created () {
      self = this;
    },
    mounted(){
      this.areaList();
      let address = localStorage.getItem("address");
      if(address) {
        let obj = JSON.parse(address);
        this.linkman = obj.linkman;
        this.linkmanMobile  = obj.linkmanMobile;
        this.province = obj.province;
        this.city = obj.city;
        this.district = obj.district;
        this.address = obj.address;
        this.id = obj.id;
        document.getElementById("region").value = obj.province + "," + obj.city + "," + obj.district;
        isEdit = true;
      } else {
        isEdit = false;
      }
    },
    methods:{
      /**
       * 保存地址信息
       */
      saveAddress(){
        if(this.linkman){
          if(this.linkmanMobile){
            if(this.hasPhone){
              if($("#region").val()){
                if(this.address){
                  if(this.disabled === false){
                    if(isEdit){//编辑跳转过来的
                      con.post("/api/orderAddress/edit",{
                        "linkman": this.linkman,
                        "linkmanMobile": this.linkmanMobile,
                        "province": this.province,
                        "city": this.city,
                        "district": this.district,
                        "address": this.address,
                        "fixed": 0,
                        "id": this.id
                      },(response)=>{
                        if(response.result === 1){
                          con.toast("保存成功");
                          this.disabled = true;
                          localStorage.clear();
                          setTimeout(()=>{
                            this.$router.replace("/shop_address");
                            this.disabled = false;
                          },1000)
                        }else{
                          con.toast(response.msg)
                        }
                      })
                    }else{//新建地址
                      this.province = $("#region").val().split(",")[0];
                      this.city = $("#region").val().split(",")[1];
                      this.district = $("#region").val().split(",")[2];
                      con.post("/api/orderAddress/create",{
                        "linkman":this.linkman,
                        "linkmanMobile":this.linkmanMobile,
                        "province":this.province,
                        "city":this.city,
                        "district":this.district || "",
                        "address":this.address
                      },(response) => {
                        if(response.result === 1){
                          con.toast("保存成功");
                          this.disabled = true;
                          setTimeout(()=>{
                            this.$router.replace("/shop_address");
                            this.disabled = false;
                          },1000)
                        }else{
                          con.toast(response.msg)
                        }
                      })
                    }
                  }else{
                    con.toast("请稍后再试");
                  }
                }else{
                  con.toast("请填写您的详细收货地址")
                }
              }else{
                con.toast("请选择所在地区");
              }
            }else{
              con.toast("手机号码有误，请重新输入");
            }
          }else{
            con.toast("手机号码不能为空");
          }
        }else{
          con.toast("请填写收货人姓名");
        }

      },
      /**
       * 地区选择列表
       */
      areaList(){
        let areas = new LArea();
        areas.init({
          'trigger': '#region',
          'valueTo': '#values',
          'keys': {
            id: 'value',
            name: 'text'
          },
          'type': 2,
          'data': [provs_data, citys_data, dists_data],
        })
      },
    }
  }
</script>

<style scoped lang="less">
#compile{
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

.content{
  width: 100%;

  .list{
    width: 100%;
    background: #fff;

    .item{
      width: 100%;
      padding: 0 0.4rem;
      min-height: 1.173333rem;
      border-bottom: 1px solid #e3e5e9;
      line-height: 1.173333rem;
      font-size: 0.373333rem;
      color: #333;

      input{
        width: 6rem;
        height: 100%;
      }
      .icon-right{
        display: inline-block;
        width: 0.16rem;
        height: 0.266666rem;
        background: url(../../assets/web/btn_more.png) 0 0 no-repeat;
        background-size: cover;
        float: right;
        margin-top: 0.466666rem;
      }

    }
  }

  .btn{
    width: 100%;
    min-height: 1.2rem;
    padding: 1.066666rem 0.4rem;
    span{
      display: block;
      width: 100%;
      height: 1.2rem;
      background: #c63535;
      text-align: center;
      line-height: 1.2rem;
      color: #FFF;
      border-radius: 0.133333rem;
      -webkit-border-radius: 0.133333rem;
    }
  }

}
</style>
