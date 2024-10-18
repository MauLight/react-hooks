// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import { useState, useEffect } from 'react'

const useLocalStorageState = (key, initialValue, { serialize = JSON.stringify, deserialize = JSON.parse } = {}) => {
  const [data, setData] = useState(() => {
    const storageValue = deserialize(window.localStorage.getItem(key))
    if (storageValue) {
      return storageValue
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  useEffect(() => {
    const lastKey = window.localStorage.getItem('lastKey')
    if (lastKey !== key) {
      window.localStorage.removeItem(lastKey)
      window.localStorage.setItem('lastKey', key)
      window.localStorage.setItem(key, serialize(data))
    } else {
      window.localStorage.setItem(key, serialize(data))
    }

  }, [key, data, serialize])

  return [data, setData]
}

function Greeting({ initialName = '' }) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
