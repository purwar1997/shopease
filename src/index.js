import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { fetchLoggedInUserAsync } from './app/slices/userSlice';
import store from './app/store';
import App from './App';
import './index.css';

(async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  try {
    await store.dispatch(fetchLoggedInUserAsync(1)).unwrap();
  } catch (error) {
    console.log(error);
  }

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
})();