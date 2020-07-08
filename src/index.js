import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    // material-ui의 Select, ItemMenu를 사용하는 경우 findDOMNode에 대한 오류가 뜨므로
    // 임시로 StrictMode 해제
    // <React.StrictMode>
    <App />
    // </React.StrictMode>,
    ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
