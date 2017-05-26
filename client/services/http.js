import axios from 'axios'

const client = axios.create({
  timeout: 1000
})

export default client
