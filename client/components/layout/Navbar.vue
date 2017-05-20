<template>
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }" v-if="$auth.check()">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item is-hidden-tablet" @click="toggleSidebar(!sidebar.opened)">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </a>
        </div>
        <div class="nav-center">
          <a class="nav-item hero-brand" href="/">
              <div class="is-hidden-mobile">
                <strong><span>WMManhattan</span></strong>
              </div>
          </a>
        </div>
        <div class="nav-right is-flex">
          <a v-if="$auth.check()" @click="logout" class="nav-item">Logout</a>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  props: {
    show: Boolean
  },

  computed: mapGetters({
    sidebar: 'sidebar'
  }),

  methods: {
    ...mapActions([
      'toggleSidebar'
    ]),
    logout () {
      this.$auth.logout({
        redirect: 'Login',
        makeRequest: false
      })
    }
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/variables';

.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .container {
    margin: auto 10px;
  }

  .nav-right {
    align-items: stretch;
    align-items: stretch;
    flex: 1;
    justify-content: flex-end;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }
}

</style>
