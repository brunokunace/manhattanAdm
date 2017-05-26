import Vue from 'vue'
import * as moment from 'moment'
export default Vue.filter('dataBrlWithHour', (value) => {
  return moment(value).format('DD/MM/YYYY HH:mm:ss')
})
