import lazyLoading from './lazyLoading'

export default {
  name: 'Cadastros Gerais',
  meta: {
    auth: ['admin', 'usuario'],
    icon: 'fa-plus-circle',
    expanded: false,
    link: 'cadastrosgerais/index.vue'
  },
  children: [
    {
      name: 'Importar CSV',
      path: '/cadastrosgerais/importarcsv',
      component: lazyLoading('cadastrosgerais/ImportarCsv'),
      meta: {
        auth: ['admin', 'usuario'],
        link: 'cadastrosgerais/ImportarCsv.vue'
      }
    }
  ]
}
