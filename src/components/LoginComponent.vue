<template>
  <v-card>
    <v-toolbar color="indigo" dark>
      <v-toolbar-title class="layout row">
        {{ type === 'login' ? 'Авторизация' : 'Регистрация' }}
      </v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-layout row>
        <v-form xs4 v-model="valid" @submit.prevent ref="authForm">
          <section>
            <v-text-field label="Email" type="text" v-model="user.email"
              style="margin-right: 8px;" required :rules="[v => !!v || 'Введите пароль']"></v-text-field>
          </section>
          <section>
            <v-text-field label="Password" type="password" v-model="user.password"
              style="margin-right: 8px;" required :rules="[v => !!v || 'Введите пароль']"></v-text-field>
          </section>
          <v-layout row justify-space-between>
            <v-btn type="button" :disabled="!valid"
              @click="onAuth()">{{ type === 'login' ? 'Войти' : 'Зарегистрироваться' }}</v-btn>
            <v-btn type="button" flat
              @click="changeType()">{{ type === 'login' ? 'Нет аккаунта?' : 'Авторизоваться' }}</v-btn>
          </v-layout>
        </v-form>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      type: 'login',
      valid: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    changeType () {
      this.type = this.type === 'login' ? 'register' : 'login'
    },
    onAuth () {
      this.$store.dispatch(this.type, this.user).then(() => {
        this.$router.push({name: 'Calendar'})
      })
    }
  }
}
</script>

