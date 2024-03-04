import { KeyboardEvent, useState } from "react";
import { WordsState } from "../assets/types/Types";

export default function TypingAltr() {
    const words =
        "apple, elephant, guitar, lamp, rainbow, butterfly, ocean, mountain, laughter, sunshine, castle, computer, airplane, chocolate, happiness, friendship, book, adventure, moonlight, forest, diamond, starlight, waterfall, unicorn, pillow, dream, freedom, melody, courage, treasure, whisper, harmony, magic, galaxy, balloon, island, mystery, sunrise, innocence, peace, journey, smile, wonder, dragon";
    const wordsArr = words.split(",").map((i) => i.trim());
    const [pointerPos, setPointerPos] = useState([0, 0]);
    const [isTestStarted, setIsTestStarted] = useState(false);
    const [wordsState, setWordsState] = useState<WordsState[][]>(wordsArr.map((i: string) => {
        return i.split("").map((j: string) => {
            return { class: 'init', char: j, extra: false }
        })
    }));




    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key.trim().length == 1 || event.key === 'Backspace' || event.key === ' ') {
            if (!isTestStarted) {
                //starting the test
                setIsTestStarted(true);

                //starting the clock
                let timeSec = 0;
                const interval = setInterval(() => {
                    timeSec++
                    if (timeSec === 60) {
                        clearInterval(interval);
                    }
                }, 1000)
            }

            //calculating the stats

            //if the key is correct
            if (wordsArr[pointerPos[0]][pointerPos[1]] === event.key) {
                setPointerPos(prevPointerPos => [prevPointerPos[0], prevPointerPos[1] + 1])
                setWordsState(prevWordsState => prevWordsState.map((i, indi) => {
                    return i.map((j, indj) => {
                        if (indi === pointerPos[0] && indj === pointerPos[1]) {
                            if (j.class !== 'wrong') {
                                return { ...j, class: 'correct' }
                            }
                            return j
                        } else {
                            return j
                        }
                    })
                }))
            }
            //if pressed key is not correct
            else {
                //if pressed key is "space" and the pointer is on last character of the word
                if (event.key === ' ' && pointerPos[1] === wordsArr[pointerPos[0]].length) {
                    setPointerPos(prevPointerPos => [prevPointerPos[0] + 1, 0])
                }
                //if pressed key is just incorrect
                else {
                    setWordsState(prevWordsState => prevWordsState.map((i, indi) => {
                        return i.map((j, indj) => {
                            if (indi === pointerPos[0] && indj === pointerPos[1]) {
                                return { ...j, class: 'wrong' }
                            } else {
                                return j
                            }
                        })
                    }))
                }
            }

        }
    }


    return (
        <div className="words-wrap h-1/2 w-9/12 overflow-hidden flex flex-row gap-4 flex-wrap focus:outline-none" onKeyDown={handleKeyDown} tabIndex={0}>
            {wordsState.map((word, wordId) => {
                return (
                    <div
                        className="word flex flex-row gap-[2px] text-2xl items-center"
                        key={wordId}
                    >
                        {word.map((letter, letterId) => {
                            if (pointerPos[0] === wordId && pointerPos[1] === letterId) {
                                return (
                                    <span className="bg-white text-black" key={letterId}>
                                        {letter.char}
                                    </span>
                                );
                            }
                            return <span key={letterId} className={letter.class}>{letter.char}</span>;
                        })}
                    </div>
                );
            })}
        </div>
    );
}
