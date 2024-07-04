import React from 'react'
import ReactDOM from 'react-dom/client'
import Countdown from './App.jsx'
import { Analytics } from "@vercel/analytics/react"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Countdown />
    <Analytics />
  </React.StrictMode>,
)
