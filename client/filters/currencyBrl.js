import Vue from 'vue'
export default Vue.filter('currencyBrl', (value) => {
  let formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
  return formatter.format(value)
})
