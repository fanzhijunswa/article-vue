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
      v-model="mobile"
      name="mobile"
      label="手机号"
      placeholder="手机号"
      :rules="mobileRules")
    van-field(
      v-model="password"
      type="code"
      name="code"
      label="验证码"
      placeholder="验证码"
      :rules="codeRules")
      template(#button)
        van-button(size="small" type="primary" native-type="button" @click="sendCode") 发送验证码
    div(style="margin: 16px;")
      van-button(round block type="info" native-type="submit") 提交
</template>

<script>
import { sendSms } from '@/api'
export default {
  name: 'Login',
  components: {},
  data () {
    return {
      mobile: '',
      password: ''
    }
  },
  computed: {
    codeRules () {
      return [{ required: true, message: '请填写验证码' }, { pattern: /^\d{6}$/, message: '请注意格式', trigger: 'onChange' }]
    },
    mobileRules () {
      return [{ required: true, message: '请填写姓名' }, { pattern: /^1[3579]\d{9}$/, message: '请注意格式', trigger: 'onChange' }]
    }
  },
  methods: {
    onSubmit () {
      console.log(arguments)
    },
    async sendCode () {
      try {
        await this.$refs['login-form'].validate('mobile')
        await sendSms('13147944665')
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
#Login
</style>
