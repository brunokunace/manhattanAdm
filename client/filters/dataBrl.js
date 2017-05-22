import Vue from 'vue'
import * as moment from 'moment'
export default Vue.filter('dataBrl', (value) => {
  return moment(value).format('DD/MM/YYYY')
})
