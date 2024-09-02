import { render } from 'preact'
import { App } from '@/app'
import Provider from '@/provider'

import 'bootstrap/scss/bootstrap.scss'
import '@/style/global.css'
import 'virtual:svg-icons-register'

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('app')!
)
