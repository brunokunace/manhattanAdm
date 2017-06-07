<template>
  <modal :visible="visible" @close="close">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Importar Resultados CSV</h1>
        <div class="block">
          <form>
            <div class="field has-addons">
              <p class="control">
                <input type="file" placeholder="Selecione o arquivo CSV" v-on:change="fileChanged">
              </p>
              <p class="control">
                <a class="button is-primary" @click="importCsv()" v-bind:class="{ 'is-loading': btnState }">
                  Importar
                </a>
              </p>
            </div>
            <hr/>
            <h1 class="title is-3">Tarifas</h1>

            <div class="columns" v-for="(rateType, index) in rateTypes.data">
              <div class="column is-1">
                <label class="label labelRate">{{ rateType.initial }}</label>
              </div>
              <div class="column">
                <label class="label is-small">Emolumento</label>
                <p class="control">
                  <input class="input" type="text" v-model="rateType.emolumento">
                </p>
              </div>
              <div class="column">
                <label class="label is-small">Corretagem</label>
                <p class="control">
                  <input class="input" type="text" v-model="rateType.corretagem">
                </p>
              </div>
              <div class="column">
                <label class="label is-small">Ganho</label>
                <p class="control">
                  <input class="input" type="text" v-model="rateType.ganho">
                </p>
              </div>
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
        importFile: null,
        error: null,
        success: null,
        btnState: false,
        rateTypes: []
      }
    },
    components: {
      Modal
    },
    props: {
      visible: Boolean
    },
    mounted () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.$http({
          url: 'ratetypes/all'
        }).then((response) => {
          this.rateTypes = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      fileChanged (fileEvent) {
        this.importFile = fileEvent.currentTarget.files[0]
        this.error = null
        this.success = null
      },
      close () {
        this.$emit('close')
        this.error = null
        this.success = null
        this.btnState = false
      },
      importCsv () {
        if (this.importFile !== null) {
          let formData = new FormData() // eslint-disable-line no-undef
          formData.append('importFile', this.importFile)
          this.btnState = true
          this.$http({
            url: 'ratetypes',
            method: 'put',
            data: this.rateTypes
          })
          .then(() => {
            this.$http({
              method: 'post',
              url: 'results/import',
              data: formData,
              headers: {
                'Content-Type': 'application/vnd.ms-excel'
              }
            })
          .then((response) => {
            if (response.data) {
              this.error = null
              this.success = response.data.success
              this.btnState = false
            }
          })
          }).catch((error) => {
            if (error.response) {
              this.success = null
              this.error = error.response.data.error
              this.btnState = false
            } else {
              console.log('Error', error.message)
            }
          })
        } else {
          this.error = 'Selecione um arquivo antes de enviar'
        }
      }
    }
  }
</script>
<style scoped>
  .labelRate{
    padding-top: 30px;
  }
</style>
