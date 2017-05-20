<template>
  <div class="content has-text-centered">
    <p>
      <img class="logo" src="~assets/logo.png">
    </p>
    <pre>{{ user }}</pre>

  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    this.user = this.$auth.user()
  }
}
</script>

<style lang="scss" scoped>
  .logo {
    max-width: 50%;
  }
</style>
