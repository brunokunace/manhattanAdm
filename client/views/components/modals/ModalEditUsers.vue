<template>
  <modal :visible="visible" @close="close">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Criar Usuário</h1>
        <div class="block">
          <form>
            <p>Dados:</p>
            <div class="control is-horizontal">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Nome" v-model="info.name" required>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Sub Conta" v-model="info.cod_subconta" required>
                </p>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="email" placeholder="Email" v-model="info.email" required>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Senha" disabled>
                </p>
              </div>
            </div>
            <p>Documentos:</p>
            <div class="control is-horizontal">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="RG" v-model="info.rg" required>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Emissor do RG" v-model="info.rg_emissor" required>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="UF do RG" v-model="info.rg_uf" required>
                </p>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="CPF" v-model="info.cpf" required>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Data de Nascimento" v-model="info.data_nascimento" required>
                </p>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control is-grouped">
                <div class="select">
                  <select v-model="info.sexo" required>
                    <option disabled value="">Sexo...</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </select>
                </div>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Naturalidade" v-model="info.naturalidade" required>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Estado Civil" v-model="info.estado_civil" required>
                </p>
              </div>
            </div>
            <p>Endereço:</p>
            <div class="control is-horizontal">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="CEP" v-model="info.cep" required>
                </p>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Logradouro" v-model="info.logradouro" required>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Número" v-model="info.numero" required>
                </p>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Bairro" v-model="info.bairro" required>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Localidade" v-model="info.localidade" required>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="UF" v-model="info.uf" required>
                </p>
              </div>
            </div>
            <p>Contato:</p>
            <div class="control is-horizontal">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Skype" v-model="info.skype" required>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Celular" v-model="info.telefone_celular" required>
                </p>
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="Fixo" v-model="info.telefone_fixo" required>
                </p>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="info.ativo" required>
                    <option disabled value="">Status...</option>
                    <option value="1">Ativo</option>
                    <option value="0">Inativo</option>
                  </select>
                </div>
                <div class="select is-fullwidth">
                  <select v-model="info.level_id" required>
                    <option disabled value="">Permissão...</option>
                    <option value="4">Usuário</option>
                    <option value="3">Moderador</option>
                    <option value="1">Administrador</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control">
                <button class="button is-primary" @click="createUser">Salvar</button>
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
      createUser () {
        this.$http({
          method: 'put',
          url: 'users/update',
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
