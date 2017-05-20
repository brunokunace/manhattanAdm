import * as types from '../../mutation-types'
import cadastrosgerais from './cadastrosGerais'
import configuracoes from './configuracoes'
import resultados from './resultados'

const state = {
  items: [
    {
      name: 'Home',
      path: '/',
      meta: {
        auth: ['admin', 'usuario'],
        icon: 'fa-home'
      },
      component: require('views/Home')
    },
    resultados,
    cadastrosgerais,
    configuracoes
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
