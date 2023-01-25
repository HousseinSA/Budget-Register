import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import AppContext from "./context/AppContext"
// import the compoent needed to run the component

// making i root render to the dom
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    {/* appContext to spread all the value to the app */}
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>
)
