<template>
  <div id="nav">
    <ul>
      <li :class="{'active': current === 0}">
        <router-link to="/home">
          <i class="home"></i>
          <span>首页</span>
        </router-link>
      </li>
      <li :class="{'active': current === 1}">
        <router-link to="/sort">
          <i class="sort"></i>
          <span>分类</span>
        </router-link>
      </li>
      <li :class="{'active': current === 2}">
        <router-link to="/shop">
          <i class="shop"></i>
          <span>商城</span>
        </router-link>
      </li>
      <li :class="{'active': current === 3}">
        <router-link to="/car">
          <i class="car"></i>
          <span>购物车</span>
        </router-link>
      </li>
      <li :class="{'active': current === 4}">
        <router-link to="/me">
          <i class="me"></i>
          <span>我的</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'nav',
    props: ['current'],
  }
</script>

<style lang="less">
  #nav {
    position: fixed;
    z-index: 999;
    bottom: 0;
    width: 100%;
    height: 98/75rem;
    background-color: #fff;
    max-width: 600px;
    ul {
      display: flex;
      height: 100%;
      li {
        flex: 1;
        a {
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          display: flex;
        }
        i {
          display: block;
          background: no-repeat 0 0;
          background-size: 100% 100%;
          -webkit-background-size: 100% 100%;
        }

        i.home {
          width: 48/75rem;
          height: 44/75rem;
          background-image: url(./../../assets/web/icon_home.png);
        }
        i.sort {
          width: 44/75rem;
          height: 44/75rem;
          background-image: url(./../../assets/web/icon_type.png);
        }
        i.shop {
          width: 41/75rem;
          height: 44/75rem;
          background-image: url(./../../assets/web/icon_shop.png);
        }
        i.car {
          width: 53/75rem;
          height: 44/75rem;
          background-image: url(./../../assets/web/icon_car.png);
        }
        i.me {
          width: 37/75rem;
          height: 45/75rem;
          background-image: url(./../../assets/web/icon_me.png);
        }

        span {
          margin-top: 12/75rem;
          font-size: 20/75rem;
          color: #aaaaaa;
        }

        &.active {
          i.home {
            background-image: url(./../../assets/web/icon_home_active.png);
          }
          i.sort {
            background-image: url(./../../assets/web/icon_type_active.png);
          }
          i.shop {
            background-image: url(./../../assets/web/icon_shop_active.png);
          }
          i.car {
            background-image: url(./../../assets/web/icon_car_active.png);
          }
          i.me {
            background-image: url(./../../assets/web/icon_me_active.png);
          }

          span {
            color: #2a2a2a;
          }
        }

      }
    }

  }

</style>
