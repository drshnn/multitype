import './App.css'

function App() {
  return (
    <div className="w-screen h-screen text-white bg-black p-10 overflow-hidden flex items-center justify-center">
      <div className="flex">
        <h1 className='text-7xl font-bold flex-1'>Typee, test your typing speed</h1>
        <div className="flex flex-col flex-1 items-center justify-center gap-3">
          <input type="text" className="min-w-72 h-10 p-1 text-black" placeholder='Username or Email' />
          <button className='min-w-72 h-10 bg-gray-100 text-black focus:border-gray-700 focus:border hover:bg-gray-200 rounded-sm active:bg-gray-300'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default App
