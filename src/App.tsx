import './App.css'
import Typing from './components/Typing'
import TypingAltr from './components/TypingAltr'

function App() {
  return (
    <div className="w-screen h-screen text-white bg-black p-10 overflow-hidden flex items-center justify-center">
      {/* <Typing /> */}
      <TypingAltr></TypingAltr>
    </div>
  )
}

export default App
