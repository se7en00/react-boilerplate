import React from 'react'
import { hot } from 'react-hot-loader/root'
import style from'./test.module.scss'

function App() {
  const a ={}
  const test = R.isEmpty(a)

  // console.log(test)
  return (
    <div className={style.test}>
      <i className="fab fa-500px"></i>2233333
    </div>
  );
}

export default hot(App);