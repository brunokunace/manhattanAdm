<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Usuários</h4>
          <div class="table-responsive">
            <table class="table">
            <thead>
            <tr>
              <th class="alignth">ID</th>
              <th class="alignth">Nome</th>
              <th class="alignth">CPF</th>
              <th class="alignth">Skpe</th>
              <th class="alignth">Telefone Fixo</th>
              <th class="alignth">Telefone Celular</th>
              <th class="alignth">Cod Subconta</th>
              <th class="alignth">Permissão</th>
              <th class="alignth">Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="usuario in usuarios">
              <td class="is-icon has-text-centered">{{ usuario.id }}</td>
              <td class="is-icon has-text-centered">{{ usuario.name }}</td>
              <td class="is-icon has-text-centered">{{ usuario.cpf }}</td>
              <td class="is-icon has-text-centered">{{ usuario.skype }}</td>
              <td class="is-icon has-text-centered">{{ usuario.telefone_fixo }}</td>
              <td class="is-icon has-text-centered">{{ usuario.telefone_celular }}</td>
              <td class="is-icon has-text-centered">{{ usuario.cod_subconta }}</td>
              <td class="is-icon has-text-centered">{{ usuario.role }}</td>
              <td class="is-icon has-text-centered">
                <a><i class="fa fa-pencil"></i></a>
                <a><i class="fa fa-trash" style="color: red"></i></a>
              </td>
            </tr>
            </tbody>
          </table>
          </div>
        </article>
      </div>
    </div>
    <modal :visible="showModal" :info="usuarioAtivo" @close="closeModalBasic"></modal>
  </div>
</template>

<script>

  import Modal from '../components/modals/ModalEmpresasDisponiveis.vue'

  export default {
    components: {
      Modal
    },
    data () {
      return {
        usuarios: [],
        showModal: false,
        usuarioAtivo: {}
      }
    },
    methods: {
      loadData () {

      },
      openModalBasic (usuario) {
        this.usuarioAtivo = usuario
        this.showModal = true
      },
      closeModalBasic () {
        this.usuarioAtivo = {}
        this.showModal = false
      }
    },
    mounted () {
      this.$http({
        url: 'users'
      }).then((response) => {
        this.usuarios = response.data
      }).catch((error) => {
        console.log(error)
      })
    }

  }
</script>

<style scoped>
  a{
    padding: 0 2% 0 2%;
  }
  .alignth {
    text-align: center;
  }
  .table-responsive {
    display: block;
    width: 100%;
    min-height: .01%;
    overflow-x: auto;
  }
</style>
