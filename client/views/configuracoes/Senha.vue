<template>
  <div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Trocar Senha</h1>
        <div class="block">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Senha Antiga</label>
            </div>
            <div class="control is-grouped">
              <p class="control is-expanded">
                <input class="input" type="password" placeholder="Senha Antiga" v-model="senha.antiga">
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Senha Nova</label>
            </div>
            <div class="control is-grouped">
              <p class="control is-expanded">
                <input class="input" type="password" placeholder="Senha Nova" v-model="senha.nova">
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label"></label>
            </div>
            <div class="control">
              <button class="button is-primary" @click="resetSenha()">Salvar</button>
            </div>
          </div>
          <div v-show="error" class="notification is-info has-text-centered">{{ error }}</div>
          <div v-show="success" class="notification is-success has-text-centered">{{ success }}</div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        senha: {
          antiga: '',
          nova: ''
        },
        error: null,
        success: null
      }
    },
    methods: {
      resetSenha () {
        this.$http({
          method: 'put',
          url: 'users/updatePassword',
          data: this.senha
        }).then((response) => {
          if (response.data) {
            this.success = response.data.success
            this.error = null
            this.senha = {
              antiga: '',
              nova: ''
            }
          }
        }).catch((error) => {
          if (error.response) {
            this.error = error.response.data.error
            this.success = null
          } else {
            console.log('Error', error.message)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .table-responsive {
    display: block;
    width: 100%;
    min-height: .01%;
    overflow-x: auto;
  }
</style>
