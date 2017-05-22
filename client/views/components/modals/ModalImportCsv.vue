<template>
  <modal :visible="visible" @close="close">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Importar Resultados CSV</h1>
        <div class="block">
          <form>
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="file" placeholder="Selecione o arquivo CSV">
              </p>
              <p class="control">
                <a class="button is-primary">
                  Importar
                </a>
              </p>
            </div>
            <div v-show="error" class="notification is-info has-text-centered">{{ error }}</div>
            <div v-show="success" class="notification is-success has-text-centered">{{ success }}</div>
          </form>
        </div>
      </article>
    </div>
  </modal>
</template>

<script>
  import { Modal } from 'vue-bulma-modal'
  export default {
    data () {
      return {
        error: null,
        success: null
      }
    },
    components: {
      Modal
    },
    props: {
      visible: Boolean
    },
    methods: {
      close () {
        this.$emit('close')
        this.error = null
        this.success = null
      },
      createUser () {
        this.$http({
          method: 'post',
          url: 'results/import'
        }).then((response) => {
          if (response.data) {
            this.success = response.data.success
            this.error = null
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
