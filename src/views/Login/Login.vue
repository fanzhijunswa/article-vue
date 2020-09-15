<template lang="pug">
#Login
  .login-container
  van-nav-bar(
    class="login-nav-bar"
    title="注册/登录",
    left-arrow,
  )
  van-form(@submit="onSubmit")
    van-field(
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="userNameRules")
    van-field(
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="passwordRules")
    div(style="margin: 16px;")
      van-button(round block type="info" native-type="submit") 提交
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    passwordRules () {
      return [{ required: true, message: '请填写密码' }, { pattern: /^\d{6,12}$/, message: '请注意格式', trigger: 'onChange' }]
    },
    userNameRules () {
      return [{ required: true, message: '请填写姓名' }, { pattern: /^\d{6}$/, message: '请注意格式', trigger: 'onChange' }]
    }
  },
  methods: {
    onSubmit () {
      console.log(arguments)
    }
  }
}
</script>

<style lang="sass" scoped>
#Login
</style>
