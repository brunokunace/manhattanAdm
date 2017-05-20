<template>
  <section class="app-main" v-bind:class="{ appmargin: $auth.check() }">
    <div class="container is-fluid is-marginless app-content">
      <levelbar v-if="$auth.check()"></levelbar>
      <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <router-view class="animated"></router-view>
      </transition>
    </div>
  </section>
</template>

<script>
import Levelbar from './Levelbar'

export default {
  components: {
    Levelbar
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/variables';
@import '~bulma/sass/utilities/mixins';

.app-main {
  padding-top: 50px;
  transform: translate3d(0, 0, 0);
}
.appmargin {
  margin-left: 180px;
  @include mobile() {
    margin-left: 0;
  }
}

.app-content {
  padding: 20px;
}
</style>
