import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'

import CssBaseline from '@mui/material/CssBaseline'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </Provider>
  </React.StrictMode>
)
