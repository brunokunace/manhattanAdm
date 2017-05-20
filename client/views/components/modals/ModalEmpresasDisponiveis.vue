<template>
  <modal :visible="visible" @close="close">
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <img src="http://placehold.it/128x128" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p><strong>{{ info.Sigla }}</strong><br>
            Responsável: {{ info.Responsavel }}<br>
            ID: {{ info.IdEmpresa }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </modal>
</template>

<script>
  import { Modal } from 'vue-bulma-modal'
  export default {
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
      }
    }
  }
</script>
