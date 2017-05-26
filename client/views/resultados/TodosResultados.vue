<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Todos os Resultados</h4>
          <div class="columns">
            <div class="column is-3">
              <div class="field">
                <label class="label">SubTitular</label>
                <p class="control">
                  <input class="input" type="text" placeholder="Nome do subtitular" v-model="filter.subtitular">
                </p>
              </div>
            </div>
            <div class="column is-3">
              <div class="field">
                <label class="label">Data Início</label>
                <datepicker input-class="input" language="pt-br" format="dd/MM/yyyy" v-model="filter.dataInicio"></datepicker>
              </div>
            </div>
            <div class="column is-3">
              <div class="field">
                <label class="label">Data Fim</label>
                <datepicker input-class="input" language="pt-br" format="dd/MM/yyyy" v-model="filter.dataFim"></datepicker>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table">
            <thead>
            <tr>
              <th class="alignth">SubConta</th>
              <th class="alignth">SubTitular</th>
              <th class="alignth">Ativo</th>
              <th class="alignth">Lado</th>
              <th class="alignth">Criação</th>
              <th class="alignth">Ult Atualização</th>
              <th class="alignth">Preço</th>
              <th class="alignth">Qtd</th>
              <th class="alignth">Preço Medio</th>
              <th class="alignth">Qtd Exec</th>
              <th class="alignth">Qtd Rest</th>
              <th class="alignth">Total</th>
              <th class="alignth">Total Exec</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="result in results">
              <td class="has-text-centered">{{ result.sub_conta }}</td>
              <td class="has-text-centered">{{ result.sub_titular }}</td>
              <td class="has-text-centered">{{ result.ativo }}</td>
              <td class="has-text-centered">{{ result.lado }}</td>
              <td class="has-text-centered">{{ result.criacao | dataBrlWithHour }}</td>
              <td class="has-text-centered">{{ result.ultima_atualizacao | dataBrlWithHour }}</td>
              <td class="has-text-centered">{{ result.preco | currencyBrl }}</td>
              <td class="has-text-centered">{{ result.quantidade }}</td>
              <td class="has-text-centered">{{ result.preco_medio | currencyBrl }}</td>
              <td class="has-text-centered">{{ result.quantidade_executada }}</td>
              <td class="has-text-centered">{{ result.quantidade_restante }}</td>
              <td class="has-text-centered">{{ result.total | currencyBrl }}</td>
              <td class="has-text-centered">{{ result.total_executado | currencyBrl }}</td>
            </tr>
            </tbody>
          </table>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'

  export default {
    components: {
      Datepicker
    },
    data () {
      return {
        results: [],
        filter: {
          subtitular: '',
          dataInicio: '',
          dataFim: ''
        }
      }
    },
    mounted () {
      this.filter.dataInicio = Date()
      this.$http({
        url: 'results/all'
      }).then((response) => {
        this.results = response.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>

<style scoped>
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
