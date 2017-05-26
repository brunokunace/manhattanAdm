import lazyLoading from './lazyLoading'

export default {
  name: 'Resultados',
  meta: {
    auth: ['admin', 'usuario'],
    icon: 'fa-laptop',
    expanded: false,
    link: 'resultados/index.vue'
  },
  children: [
    {
      name: 'Meus Resultados',
      path: '/resultados/meusresultados',
      meta: {
        auth: ['admin', 'usuario'],
        link: 'resultados/MeusResultados.vue'
      },
      component: lazyLoading('resultados/MeusResultados')
    },
    {
      name: 'Todos Resultados',
      path: '/resultados/todosresultados',
      meta: {
        auth: ['admin', 'usuario'],
        link: 'resultados/TodosResultados.vue'
      },
      component: lazyLoading('resultados/TodosResultados')
    },
    {
      name: 'Consolidado Todos',
      path: '/resultados/consolidadotodosresultados',
      meta: {
        auth: ['admin', 'usuario'],
        link: 'resultados/ConsolidadoTodosResultados.vue'
      },
      component: lazyLoading('resultados/ConsolidadoTodosResultados')
    }

  ]
}
