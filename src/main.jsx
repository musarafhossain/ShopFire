import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.jsx'
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { AppProvider } from './context/AppProvider';
import toast, { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </AppProvider>
    </Provider>
  </StrictMode>,
)
