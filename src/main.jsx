import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import App from './App.jsx';
import { store, persistor } from './redux/store.js'; 
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Wrap your app with PersistGate */}
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
