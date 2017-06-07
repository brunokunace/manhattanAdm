<template>
  <div class="content has-text-centered">
    <div class="columns is-vcentered">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <img class="logo-login" src="~assets/logo.png">
          <div v-show="error" class="notification is-info">{{ error }}</div>
          <form v-on:submit.prevent="login">
              <p class="control has-icon">
                <input v-model="data.body.cpf" class="input" type="text" placeholder="CPF ou Email">
                <span class="icon is-small">
                    <i class="fa fa-user"></i>
                  </span>
              </p>
              <p class="control has-icon">
                <input v-model="data.body.password" class="input" type="password" placeholder="Senha" required>
                <span class="icon is-small">
                    <i class="fa fa-lock"></i>
                  </span>
              </p>
              <p class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="data.rememberMe">
                  Lembrar
                </label>
              </p>

            <hr>
            <p class="control has-addons has-addons-right">
              <button type="submit" class="button is-primary is-medium">Login</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        body: {
          cpf: null,
          password: null
        },
        rememberMe: false
      },
      error: null
    }
  },
  mounted () {
    if (this.$auth.redirect()) {
      console.log('Redirect from: ' + this.$auth.redirect().from.name)
    }
  },
  methods: {
    login () {
      var redirect = this.$auth.redirect()
      this.$auth.login({
        data: this.data.body,
        rememberMe: this.data.rememberMe,
        redirect: {name: redirect ? redirect.from.name : 'Home'},
        success (res) {
        },
        error (err) {
          if (err.response) {
            this.error = err.response.data.error
          } else {
            console.log('Error', err.message)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  border-color: #656565;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  padding: 2%;
  margin-bottom: 2%;
}
.wrapperblank {
  padding: 2%;
}
.is-title {
    text-transform: capitalize;
}
.logo-login {
    padding: 5% 0 10% 0;
    max-width: 50%;
}
.notification{
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
}
</style>
