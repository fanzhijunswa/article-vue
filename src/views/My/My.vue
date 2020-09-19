<template>
  <div class="my-container">
    <van-cell-group v-if="userId" class="my-info">
      <van-cell class="base-info" center :border="false">
        <van-image class="avatar" slot="icon" round fit="cover" :src="userInfo.photo" />
        <div class="name" slot="title">{{ userInfo.name }}</div>
        <van-button class="update-btn" size="small" round to="/user/profile">编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ userInfo.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ userInfo.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ userInfo.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ userInfo.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else-if="!isAuth" class="not-login">
      <div
        @click="$router.push({
        name: 'login',
        query: {
          redirect: '/my'
        }
      })"
      >
        <img class="mobile" src="./手机.png" />
      </div>
      <div class="text">登录 / 注册</div>
    </div>

    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/user/chat" />
    <van-cell v-if="userId" class="logout-cell" title="退出登录" @click="onLogout" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MyIndex',
  computed: {
    isAuth () {
      const token = localStorage.getItem('article_token')
      return token
    },
    ...mapState('User', {
      userInfo: 'userInfo'
    }),
    ...mapGetters('User', {
      userId: 'userId'
    })
  },
  methods: {
    ...mapMutations('User', {
      removeAll: 'removeAll'
    }),
    onLogout () {
      this.removeAll()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="sass">
.my-container
  .my-info
    background: url("./banner.png") no-repeat
    background-size: cover
    .base-info
      box-sizing: border-box
      height: 115px
      background-color: unset
      padding-top: 38px
      padding-bottom: 11px
      .avatar
        box-sizing: border-box
        width: 66px
        height: 66px
        border: 1px solid #fff
        margin-right: 11px

      .name
        font-size: 15px
        color: #fff

      .update-btn
        height: 16px
        font-size: 10px
        color: #666666

    .data-info
      .data-info-item
        height: 65px
        color: #fff
        .text-wrap
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          .count
            font-size: 18px

          .text
            font-size: 11px

    ::v-deep .van-grid-item__content
            background-color: unset

  .not-login
    height: 180px
    background: url("./banner.png") no-repeat
    background-size: cover
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    .mobile
      width: 66px
      height: 66px

    .text
      font-size: 14px
      color: #fff

  ::v-deep .nav-grid
    .nav-grid-item
      height: 70px
      .toutiao
        font-size: 22px

      .toutiao-shoucang
        color: #eb5253

      .toutiao-lishi
        color: #ff9d1d

      .van-grid-item__text
        font-size: 14px
        color: #333333

  .logout-cell
    text-align: center
    color: #d86262

  .mb-4
    margin-bottom: 4px
</style>
