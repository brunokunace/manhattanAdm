<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">Meus Resultados</h4>
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
              <tr v-for="result in results">
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
  export default {

    data () {
      return {
        results: []
      }
    },
    mounted () {
      this.$http({
        url: 'results/me'
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
