import Vue from 'vue'
export default Vue.filter('trueFalse', (value) => {
  if (value) {
    return 'Sim'
  }
  return 'Não'
})
