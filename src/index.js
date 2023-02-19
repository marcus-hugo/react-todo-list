import React from "react"
import ReactDOM from "react-dom/client"
import Footer from "./components/Footer"

const useState = React.useState
const useEffect = React.useEffect

function Main() {
  const [items, setItems] = useState([])

  // run only once when the component is rendered
  useEffect(() => {
    if (localStorage.getItem("listItems")) {
      setItems(JSON.parse(localStorage.getItem("listItems")))
    }
  }, [])

  // run every time state changes
  useEffect(() => {
    localStorage.setItem("listItems", JSON.stringify(items))
  }, [items])

  return (
    <>
      <main>
        <h1>
          React Todo List App <i class="bi bi-list-check" aria-hidden="true"></i>
        </h1>

        <ListForm setItems={setItems} />
        <ul>
          {items.map(item => (
            <Item setItems={setItems} id={item.id} entry={item.entry} key={item.id} />
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
}

// Form Component
function ListForm(props) {
  const [entry, setEntry] = useState()

  function handleSubmit(e) {
    e.preventDefault()
    props.setItems(prev => prev.concat({ entry: entry, id: Date.now() }))
    setEntry("") // call with an empty string to clear the form
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add an item</legend>
        <input value={entry} onChange={e => setEntry(e.target.value)} placeholder="i.e. laundry" />
        <button className="add-button">
          <i class="bi bi-plus" alt="add item"></i>Add
        </button>
      </fieldset>
    </form>
  )
}

// Item Component
function Item(props) {
  function handleDelete() {
    props.setItems(prev => prev.filter(item => item.id != props.id))
  }
  return (
    <li>
      <span>
        <input type="checkbox" />
        <p>{props.entry}</p>
      </span>
      <button onClick={handleDelete} className="delete-button">
        <i class="bi bi-x" alt="delete item"></i>Delete
      </button>
    </li>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
