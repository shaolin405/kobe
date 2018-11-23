import 'normalize.css'
import './index.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'

import App from './app'
import routes from './routes'
import registerServiceWorker from './registerServiceWorker'

const target = document.querySelector('#root')
const basename = process.env.REACT_APP_DEPLOY_ENV === 'GH_PAGES' ? '/pho/' : '/'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App routes={routes} basename={basename} />
    </ConnectedRouter>
  </Provider>,
  target
)
registerServiceWorker()
