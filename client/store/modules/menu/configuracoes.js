import lazyLoading from './lazyLoading'

export default {
  name: 'Configurações',
  meta: {
    auth: ['admin', 'usuario'],
    icon: 'fa-cog',
    expanded: false,
    link: 'configuracoes/index.vue'
  },
  children: [
    {
      name: 'Usuários',
      path: '/configuracoes/usuarios',
      component: lazyLoading('configuracoes/Usuarios'),
      meta: {
        auth: ['admin'],
        link: 'configuracoes/Usuarios.vue'
      }
    },
    {
      name: 'Senha',
      path: '/configuracoes/senha',
      component: lazyLoading('configuracoes/Senha'),
      meta: {
        auth: ['admin', 'usuario'],
        link: 'configuracoes/Senha.vue'
      }
    }
  ]
}
