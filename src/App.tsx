import { useState } from 'react';
import './App.css'

function App() {
  const words = 'apple, elephant, guitar, lamp, rainbow, butterfly, ocean, mountain, laughter, sunshine, castle, computer, airplane, chocolate, happiness, friendship, book, adventure, moonlight, forest, diamond, starlight, waterfall, unicorn, pillow, dream, freedom, melody, courage, treasure, whisper, harmony, magic, galaxy, balloon, island, mystery, sunrise, innocence, peace, journey, smile, wonder, dragon';
  const wordsArr = words.split(',').map(i => i.trim());
  const [pointerPos, setPointerPos] = useState([0, 0]);
  return (
    <div className='w-screen h-screen text-white bg-black p-10 overflow-hidden flex items-center justify-center'>
      <div className="words-wrap h-1/2 w-9/12 overflow-hidden flex flex-row gap-4 flex-wrap">
        {wordsArr.map((word, wordId) => {
          return (
            <div className="word flex flex-row gap-[2px] text-2xl items-center" key={wordId}>
              {
                word.split('').map((letter, letterId) => {
                  if (pointerPos[0] === wordId && pointerPos[1] === letterId) {
                    return (<span className='bg-white text-black' key={letterId}>{letter}</span>)
                  }
                  return (<span key={letterId}>{letter}</span>)
                })
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
