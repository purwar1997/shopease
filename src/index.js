import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './app/store';
import { Provider } from 'react-redux';
import { fetchLoggedInUserAsync } from './app/slices/userSlice';
import App from './App';
import './index.css';

(async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  try {
    await store.dispatch(fetchLoggedInUserAsync(2)).unwrap();
  } catch (error) {
    console.log(error);
  }

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
})();
