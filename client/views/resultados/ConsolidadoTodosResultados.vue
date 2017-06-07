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
                <select class="input" v-model="filter.sub_conta">
                  <option value="">Selecione...</option>
                  <option v-for="sub in subtitular" :value="sub.sub_conta">{{ sub.sub_titular }}</option>
                </select>
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
            <div class="column is-3">
              <div class="field">
                <div class="label">Buscar</div>
                <a class="button is-primary" @click="loadData()">
                <span class="icon">
                  <i class="fa fa-search"></i>
                </span>
                  <span>Buscar</span>
                </a>
              </div>
            </div>
          </div>
          <div class="box" v-for="(result, index) in results" v-if="result.length !== 0">
            <div class="table-responsive">
              <table class="table is-striped" >
                <thead>
                <tr>
                  <th>Ativo</th>
                  <th class="alignth">{{ index }}</th>
                  <th class="alignth" colspan="2">Contratos</th>
                  <th class="alignth" colspan="3">Resultado</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Nome</td>
                  <td class="has-text-centered">SubConta</td>
                  <td class="has-text-centered">C</td>
                  <td class="has-text-centered">V</td>
                  <td class="has-text-centered">Bruto</td>
                  <td class="has-text-centered">Custo</td>
                  <td class="has-text-centered">Net</td>
                </tr>
                <tr v-for="r in result">
                  <td style="width: 30%">{{ r.sub_titular }}</td>
                  <td class="has-text-centered">{{ r.sub_conta }}</td>
                  <td class="has-text-centered">{{ r.ContratosC }}</td>
                  <td class="has-text-centered">{{ r.ContratosV }}</td>
                  <td class="has-text-centered">{{ r.bruto | currencyBrl }}</td>
                  <td class="has-text-centered">{{ r.custo | currencyBrl }}</td>
                  <td class="has-text-centered" :class="{negative: (r.net < 0)}">{{ r.net | currencyBrl }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="box" v-for="(acao, index) in acoes" v-if="acao.length !== 0">
            <div class="table-responsive">
              <table class="table is-striped" >
              <thead>
              <tr>
                <th>Ativo</th>
                <th class="alignth">{{ index }}</th>
                <th class="alignth" colspan="2">Contratos</th>
                <th class="alignth" colspan="2">Volume</th>
                <th class="alignth" colspan="3">Resultado</th>

              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Nome</td>
                <td class="has-text-centered">SubConta</td>
                <td class="has-text-centered">C</td>
                <td class="has-text-centered">V</td>
                <td class="has-text-centered">C</td>
                <td class="has-text-centered">V</td>
                <td class="has-text-centered">Bruto</td>
                <td class="has-text-centered">Custo</td>
                <td class="has-text-centered">Net</td>
              </tr>
              <tr v-for="a in acao">
                <td style="width: 30%">{{ a.sub_titular }}</td>
                <td class="has-text-centered">{{ a.sub_conta }}</td>
                <td class="has-text-centered">{{ a.ContratosC }}</td>
                <td class="has-text-centered">{{ a.ContratosV }}</td>
                <td class="has-text-centered">{{ a.VolumesC | currencyBrl }}</td>
                <td class="has-text-centered">{{ a.VolumesV | currencyBrl }}</td>
                <td class="has-text-centered">{{ a.bruto | currencyBrl }}</td>
                <td class="has-text-centered">{{ a.custo | currencyBrl }}</td>
                <td class="has-text-centered" :class="{negative: (a.net < 0)}">{{ a.net | currencyBrl }}</td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import * as moment from 'moment'
  import Datepicker from 'vuejs-datepicker'

  export default {
    components: {
      Datepicker
    },
    data () {
      return {
        results: [],
        acoes: [],
        subtitular: [],
        filter: {
          dataInicio: '',
          dataFim: '',
          sub_conta: ''
        }
      }
    },
    mounted () {
      this.filter.dataFim = moment().format()
      this.filter.dataInicio = moment().subtract(1, 'days').format()
      this.loadSelect()
      this.loadData()
    },
    methods: {
      activeSubConta (subconta) {
        this.filter.sub_conta = subconta
      },
      loadSelect () {
        this.$http({
          url: 'results/subtitular'
        }).then((response) => {
          this.subtitular = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      loadData () {
        this.$http({
          url: 'results/porativo',
          method: 'post',
          data: this.filter
        }).then((response) => {
          this.results = response.data
          this.$http({
            url: 'results/poracao',
            method: 'post',
            data: this.filter
          }).then((response) => {
            this.acoes = response.data
          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
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
  .negative{
    color: red;
  }

</style>
