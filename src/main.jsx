import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './store/store.js'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <UserProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </UserProvider>
  </Provider>
)
