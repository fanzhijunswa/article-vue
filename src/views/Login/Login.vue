<template lang="pug">
#Login
  .login-container
  van-nav-bar(
    class="login-nav-bar"
    title="注册/登录",
    left-arrow,
  )
  van-form(ref="login-form" @submit="onSubmit")
    van-field(
      v-model="formData.mobile"
      name="mobile"
      label="手机号"
      placeholder="手机号"
      :rules="mobileRules")
    van-field(
      v-model="formData.code"
      type="code"
      name="code"
      label="验证码"
      placeholder="验证码"
      :rules="codeRules")
      template(#button)
        van-count-down(v-if="showTime" :time="time" format="ss秒" @finish="showTime = false")
        van-button(v-else size="small" type="primary" native-type="button" @click="sendCode") 发送验证码
    div(style="margin: 16px;")
      van-button(round block type="info" native-type="submit") 提交
</template>

<script>
import { sendSms, login } from '@/api'
export default {
  name: 'Login',
  components: {},
  data () {
    return {
      time: 60000,
      buttonLoading: false,
      showTime: false,
      formData: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {
    codeRules () {
      return [{ required: true, message: '请填写验证码' }, { pattern: /^\d{6}$/, message: '请注意格式', trigger: 'onChange' }]
    },
    mobileRules () {
      return [{ required: true, message: '请填写手机号' }, { pattern: /^1[3579]\d{9}$/, message: '请注意格式', trigger: 'onChange' }]
    }
  },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '登录中...', // 提示文本
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
      })
      try {
        const { token, refresh_token } = await login(this.formData)
        localStorage.setItem('article_token', token)
        localStorage.setItem('article_refresh_token', refresh_token)
        this.$router.push('/')
        this.$toast.success('欢迎回来')
      } catch (e) {
        // this.$toast.fail(e.message)
      }
    },
    async sendCode () {
      this.buttonLoading = true
      try {
        await this.$refs['login-form'].validate('mobile')
        await sendSms(this.formData.mobile)
        this.showTime = true
      } catch (e) {
        this.$toast.fail(e.message)
      } finally {
        this.buttonLoading = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
#Login
</style>
