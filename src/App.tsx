import React from 'react'
import { hot } from 'react-hot-loader/root'
import style from'./test.module.scss'

function App() {
  return (
    <div className={style.test}>
      <i className="fab fa-500px"></i>2233333
    </div>
  );
}

export default hot(App);