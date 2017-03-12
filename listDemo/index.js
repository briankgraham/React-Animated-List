import React from 'react'
import {render} from 'react-dom'
import HomePage from './ListHome/index'
import './styles/global-styles'

import '!file-loader?name=[name].[ext]!./../favicon.ico'

render(
  <div id='outer'>
    <HomePage />
  </div>,
  document.getElementById('root')
)
