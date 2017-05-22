<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Todos os Resultados</h4>
          <div class="columns">
            <div class="column is-3">
              <div class="field">
                <label class="label">Filtrar por SubTitular</label>
                <p class="control">
                  <input class="input" type="text" placeholder="Nome do subtitular" v-model="filter.subtitular">
                </p>
              </div>
            </div>
            <div class="column is-3">
              <div class="field">
                <label class="label">Filtrar por Data</label>
                <datepicker placeholder="Selecione a data" :config="{ dateFormat: 'd/m/Y', locale: ptbr, defaultDate: today}" v-model="filter.data"></datepicker>
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
              <th class="alignth">Validade</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="result in list">
              <td class="has-text-centered">{{ result.sub_conta }}</td>
              <td class="has-text-centered">{{ result.sub_titular }}</td>
              <td class="has-text-centered">{{ result.ativo }}</td>
              <td class="has-text-centered">{{ result.lado }}</td>
              <td class="has-text-centered">{{ result.criacao }}</td>
              <td class="has-text-centered">{{ result.ultima_atualizacao }}</td>
              <td class="has-text-centered">R$ {{ result.preco }}</td>
              <td class="has-text-centered">{{ result.quantidade }}</td>
              <td class="has-text-centered">R$ {{ result.preco_medio }}</td>
              <td class="has-text-centered">{{ result.quantidade_executada }}</td>
              <td class="has-text-centered">{{ result.quantidade_restante }}</td>
              <td class="has-text-centered">R$ {{ result.total }}</td>
              <td class="has-text-centered">R$ {{ result.total_executado }}</td>
              <td class="has-text-centered">{{ result.validade }}</td>
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
  import _ from 'lodash'
  import {pt} from 'flatpickr/dist/l10n/pt.js'
  import Datepicker from 'vue-bulma-datepicker'
  export default {
    components: {
      Datepicker
    },
    data () {
      return {
        results: [],
        filter: {
          subtitular: '',
          data: ''
        }
      }
    },
    mounted () {
      this.$http({
        url: 'results/all'
      }).then((response) => {
        this.results = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    computed: {
      today () {
        let date = new Date()
        let day = date.getDate().toString()
        this.day = (day.length === 1) ? ('0' + day) : day
        let month = (date.getMonth() + 1).toString()
        this.month = (month.length === 1) ? ('0' + month) : month
        this.filter.data = this.day + '/' + this.month + '/' + date.getFullYear()
      },
      ptbr () {
        return pt
      },
      list () {
        const filterSubTitular = this.filter.subtitular
        const filterData = this.filter.data
        const result = this.results
        if (_.isEmpty(filterSubTitular) && _.isEmpty(filterData)) {
          return result
        }
        let data = _.filter(result, function (result) {
          return _.includes(result.sub_titular, filterSubTitular)
        })
        return _.filter(data, function (data) {
          return _.includes(data.criacao, filterData)
        })
      }
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
