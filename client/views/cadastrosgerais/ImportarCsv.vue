<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Importar CSV</h4>
          <a class="button is-primary is-1" @click="openModalImportCsv()">
                <span class="icon">
                  <i class="fa fa-plus"></i>
                </span>
            <span>Novo CSV</span>
          </a>
          <div class="table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th class="alignth">ID</th>
                <th class="alignth">Código</th>
                <th class="alignth">Data de Importação</th>
                <th class="alignth">Ações</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="historical in historicals">
                <td class="is-icon has-text-centered">{{ historical.id }}</td>
                <td class="is-icon has-text-centered">{{ historical.code }}</td>
                <td class="is-icon has-text-centered">{{ historical.created_at | dataBrlWithHour }}</td>
                <td class="is-icon has-text-centered">
                  <a @click="openModalDelete(historical)"><i class="fa fa-trash" style="color: red"></i></a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </article>
      </div>
    </div>
    <modal-import-csv :visible="showModalImportCsv"  @close="closeModalImportCsv"></modal-import-csv>
    <modal-delete :visible="showModalDelete" :info="historicalAtivo" @close="closeModalDelete"></modal-delete>
  </div>
</template>

<script>

  import ModalImportCsv from '../components/modals/ModalImportCsv.vue'
  import ModalDelete from '../components/modals/ModalDeleteHistorical.vue'

  export default {
    components: {
      ModalImportCsv,
      ModalDelete
    },
    data () {
      return {
        historicals: [],
        showModalImportCsv: false,
        showModalDelete: false,
        historicalAtivo: {}
      }
    },
    methods: {
      loadData () {
        this.$http({
          url: 'historical/all'
        }).then((response) => {
          this.historicals = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      openModalDelete (historical) {
        this.historicalAtivo = historical
        this.showModalDelete = true
      },
      closeModalDelete () {
        this.historicalAtivo = {}
        this.showModalDelete = false
        this.loadData()
      },
      openModalImportCsv () {
        this.showModalImportCsv = true
      },
      closeModalImportCsv () {
        this.showModalImportCsv = false
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
