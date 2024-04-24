import { KeyboardEvent, useState } from "react";

export default function Typing() {
  const words =
    "apple, elephant, guitar, lamp, rainbow, butterfly, ocean, mountain, laughter, sunshine, castle, computer, airplane, chocolate, happiness, friendship, book, adventure, moonlight, forest, diamond, starlight, waterfall, unicorn, pillow, dream, freedom, melody, courage, treasure, whisper, harmony, magic, galaxy, balloon, island, mystery, sunrise, innocence, peace, journey, smile, wonder, dragon";
  const wordsArr = words.split(",").map((i) => i.trim());
  const [pointerPos, setPointerPos] = useState([0, 0]);
  const [isTestStarted, setIsTestStarted] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key.trim().length == 1 || event.key === 'Backspace' || event.key === ' ') {
      if (!isTestStarted) {
        //starting the test
        setIsTestStarted(true);

        //starting the clock
        let timeSec = 0;
        const interval = setInterval(() => {
          console.log(timeSec)
          timeSec++
          if (timeSec === 60) {
            clearInterval(interval);
          }
        }, 1000)
      }
      //calculating the stats
      console.log(wordsArr[pointerPos[0]][pointerPos[1]], event.key);
      if (wordsArr[pointerPos[0]][pointerPos[1]] === event.key) {
        setPointerPos(prevPointerPos => [prevPointerPos[0], prevPointerPos[1] + 1])
      } else if (event.key === ' ') {
        setPointerPos(prevPointerPos => [prevPointerPos[0] + 1, 0])
      }
    }
  }


  return (
    <div className="words-wrap h-1/2 w-9/12 overflow-hidden flex flex-row gap-4 flex-wrap focus:outline-none" onKeyDown={handleKeyDown} tabIndex={0}>
      {wordsArr.map((word, wordId) => {
        return (
          <div
            className="word flex flex-row gap-[2px] text-2xl items-center"
            key={wordId}
          >
            {word.split("").map((letter, letterId) => {
              if (pointerPos[0] === wordId && pointerPos[1] === letterId) {
                return (
                  <span className="bg-white text-black" key={letterId}>
                    {letter}
                  </span>
                );
              }
              return <span key={letterId}>{letter}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}
