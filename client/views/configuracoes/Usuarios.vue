<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Usuários</h4>
          <a class="button is-primary is-1" @click="openModalCreate()">
                <span class="icon">
                  <i class="fa fa-plus"></i>
                </span>
            <span>Criar Usuário</span>
          </a>
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
                  <a @click="openModalEdit(usuario)"><i class="fa fa-pencil"></i></a>
                  <a @click="openModalDelete(usuario)"><i class="fa fa-trash" style="color: red"></i></a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
    <modal-edit :visible="showModalEdit" :info="usuarioAtivo" @close="closeModalEdit"></modal-edit>
    <modal-create :visible="showModalCreate"  @close="closeModalCreate"></modal-create>
    <modal-delete :visible="showModalDelete" :info="usuarioAtivo" @close="closeModalDelete"></modal-delete>
  </div>
</template>

<script>

  import ModalCreate from '../components/modals/ModalCreateUsers.vue'
  import ModalEdit from '../components/modals/ModalEditUsers.vue'
  import ModalDelete from '../components/modals/ModalDeleteUsers.vue'

  export default {
    components: {
      ModalCreate,
      ModalEdit,
      ModalDelete
    },
    data () {
      return {
        usuarios: [],
        showModalCreate: false,
        showModalEdit: false,
        showModalDelete: false,
        usuarioAtivo: {}
      }
    },
    methods: {
      loadData () {
        this.$http({
          url: 'users/all'
        }).then((response) => {
          this.usuarios = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      openModalEdit (usuario) {
        this.usuarioAtivo = usuario
        this.showModalEdit = true
      },
      closeModalEdit () {
        this.usuarioAtivo = {}
        this.showModalEdit = false
        this.loadData()
      },
      openModalDelete (usuario) {
        this.usuarioAtivo = usuario
        this.showModalDelete = true
      },
      closeModalDelete () {
        this.usuarioAtivo = {}
        this.showModalDelete = false
        this.loadData()
      },
      openModalCreate () {
        this.showModalCreate = true
      },
      closeModalCreate () {
        this.showModalCreate = false
        this.loadData()
      }
    },
    mounted () {
      this.loadData()
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
