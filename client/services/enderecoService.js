import Http from './http'

export const search = (cep) => Http.get('http://viacep.com.br/ws/' + cep + '/json/')
