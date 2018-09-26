import 'bulma/css/bulma.css'
import localforage from 'localforage'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/QuizShowApp'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

localforage.config({
  name: 'QuizShow',
  version: 1.0
})

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
