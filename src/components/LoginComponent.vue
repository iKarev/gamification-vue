<template>
  <div>
    <h5>{{ type === 'login' ? 'Авторизация' : 'Регистрация' }}</h5>
    <form @submit.prevent>
      <section>
        <span>Email</span>
        <input type="text" v-model="user.email" />
      </section>
      <section>
        <span>Password</span>
        <input type="password" v-model="user.password" />
      </section>
      <button type="button" @click="onAuth()">{{ type === 'login' ? 'Войти' : 'Зарегистрироваться' }}</button>
    </form>
    <p @click="changeType()">{{ type === 'login' ? 'Нет аккаунта?' : 'Авторизоваться' }}</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      type: 'login',
      user: {
        email: 'ilya@qwe.ru',
        password: '123'
      }
    }
  },
  methods: {
    changeType () {
      this.type = this.type === 'login' ? 'register' : 'login'
    },
    onAuth () {
      this.$store.dispatch(this.type, this.user)
      this.$router.push({name: 'Day'})
    }
  }
}
</script>

