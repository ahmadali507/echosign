import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store.js';
import { ContextProvider } from './context/useStateContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </ContextProvider>,
  </Provider>,
)
