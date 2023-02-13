import React from "react"
import ReactDOM from "react-dom/client"
const useState = React.useState
const useEffect = React.useEffect

function Main() {
  const [items, setItems] = useState([])

  return (
    <>
      <main>
        <h1>My React Todo List</h1>
        <ListForm setItems={setItems} />
        <ul>
          {items.map(item => (
            <Item setItems={setItems} id={item.id} entry={item.entry} key={item.id} />
          ))}
        </ul>
      </main>
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
        <button>Add Item</button>
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
      {props.entry} <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
