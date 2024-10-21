import React from 'react';
import ReactDOM from 'react-dom';
import AppMicrofront from './components/App'; // Основной компонент микрофронта

// Функция для загрузки и рендера микрофронта
const loadApp = (params, parentFuncs) => () => {
  return new Promise((resolve) => {
    const element = document.createElement('wc-places');
    ReactDOM.render(<AppMicrofront params={params} parentFuncs={parentFuncs} />, element);
    resolve(element);
  });
};


export const unloadApp = (app) => {
    ReactDOM.unmountComponentAtNode(app);
};
