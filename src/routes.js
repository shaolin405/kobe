import Home from './views/Home'
import About from './views/About'
import Season from './views/Season'

export default [
  {
    key: 'home',
    name: 'Mambaout',
    Component: Home,
    path: {
      path: '/',
      exact: true
    }
  },
  {
    key: 'about',
    name: 'About',
    Component: About,
    path: {
      path: '/about',
      exact: true
    }
  },
  {
    key: 'season',
    multiple: true,
    name: 'Season',
    Component: Season,
    path: {
      path: '/season/:id',
      exact: true
    }
  }
]
