import { useState } from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 class="text-6xl font-bold underline">
        Hello world!
      </h1>
    </>
  )
}

export default App
