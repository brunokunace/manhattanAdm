<template>
  <modal :visible="visible" @close="close">
    <div class="tile is-parent">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Deletar Usuário</p>
        </header>
        <section class="modal-card-body">
          <div class="block has-text-centered">
            <p class="modal-card-title mensagem">Tem certeza que deseja apagar o usuário {{ info.name }}?</p>
            <div v-show="error" class="notification is-info has-text-centered">{{ error }}</div>
            <div v-show="success" class="notification is-success has-text-centered">{{ success }}</div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-danger" @click="deleteUser" v-if="!success">Deletar</a>
        </footer>
      </div>

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
      visible: Boolean,
      info: {}
    },
    methods: {
      close () {
        this.$emit('close')
        this.error = null
        this.success = null
      },
      deleteUser () {
        this.$http({
          method: 'delete',
          url: 'users/delete/' + this.info.id,
          data: this.info
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
<style scoped>
  .modal-card-title {
    color: white;
  }
  .modal-card-head{
    background-color: #ff3860;
  }
  .mensagem{
    margin: 10% 0 10% 0;
    color: #000;
  }
</style>
