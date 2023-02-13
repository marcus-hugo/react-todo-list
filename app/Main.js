import React from "react"
import ReactDOM from "react-dom/client"
const useState = React.useState
const useEffect = React.useEffect

function Main() {
  return (
    <>
      <main>
        <h1>Hello From React Land!!</h1>
      </main>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
