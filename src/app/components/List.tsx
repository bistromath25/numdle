'use client';

import { Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  initialize,
  makeGuess,
  updateGuessResults,
} from '../store/reducers/gameSlice';
import Progress from '../components/Progress';
import {
  equal,
  indexItems,
  itemStylesClassNames,
  shuffle,
} from '../utils/utils';
import { getNumberData } from '../utils/supabase';

export default function List() {
  const {
    game: { numbers, correctOrdering, guessesRemaining, guessResults },
  } = useAppSelector((state) => state);
  const [items, setItems] = useState(indexItems(numbers));
  const [numCorrect, setNumCorrect] = useState(
    guessResults.length ? guessResults[guessResults.length - 1] : 0
  );
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessButtonIsDisabled, setGuessButtonIsDisabled] = useState(false);
  const [itemStyles, setItemStyles] = useState(shuffle(itemStylesClassNames));
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    if (correctOrdering.length > 0) {
      setItems(indexItems(numbers));
      setNumCorrect(
        guessResults.length ? guessResults[guessResults.length - 1] : 0
      );
      setGameIsOver(false);
    }
  }, [correctOrdering, guessResults, numbers]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setChanged(true);
  }, [items]);
  const handleOnSubmit = () => {
    const result = items.map((item, idx) =>
      equal(item.item, correctOrdering[idx])
    );
    const newNumCorrect = result.filter((x) => x).length;
    setNumCorrect(newNumCorrect);
    const newNumbers = items.map((item) => item.item);
    dispatch(makeGuess(newNumbers));
    dispatch(updateGuessResults(newNumCorrect));
    const newItemStyles = items.map((item) => itemStyles[item.idx]);
    setItemStyles(newItemStyles);
    setChanged(false);
  };
  useEffect(() => {
    setGameIsOver(numCorrect === 5 || guessesRemaining === 0);
  }, [numCorrect, guessesRemaining]);
  const getGuessInfoCopy = () => {
    if (gameIsOver) {
      if (numCorrect === 5) {
        return `CORRECT! 🥳`;
      } else {
        return `GAME OVER! 😅`;
      }
    } else if (guessesRemaining === 5) {
      return `GOOD LUCK! 🙏`;
    } else {
      return `${numCorrect} OUT OF 5! 🔥`;
    }
  };
  const getGameOverCopy = () => {
    return `You correctly ordered ${numCorrect === 5 ? 'all' : ''} ${numCorrect} number${numCorrect === 1 ? '' : 's'}!`;
  };
  const getGuessButtonStyle = () => {
    var className = `text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 shadow-md`;
    if (!guessButtonIsDisabled) {
      className += ` hover:bg-gray-100`;
    } else {
      className += ` opacity-40`;
    }
    return className;
  };
  const getPlayAgainButtonStyle = () => {
    return `text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 shadow-md hover:bg-gray-100`;
  };
  useEffect(() => {
    if (guessesRemaining === 5) {
      setGuessButtonIsDisabled(false);
    } else if (gameIsOver || !changed) {
      setGuessButtonIsDisabled(true);
    } else {
      const unchangedNumbers = items.filter((item, idx) => {
        return equal(item.item, numbers[idx]);
      });
      setGuessButtonIsDisabled(unchangedNumbers.length === 5);
    }
  }, [changed, guessesRemaining, gameIsOver, items, numbers]);
  const handleOnPlayAgain = () => {
    getNumberData().then((resultNumbers) => {
      if (resultNumbers) {
        dispatch(initialize({ numbers: resultNumbers }));
      }
    });
  };
  return (
    <>
      <div
        className='text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-sm px-2.5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 shadow-md'
        style={{ width: '500px' }}
      >
        <div className='text-2xl flex flex-row space-x-4 float-left py-1 pl-2'>
          {getGuessInfoCopy()}
        </div>
        <Progress />
      </div>
      {gameIsOver && <div>{getGameOverCopy()}</div>}
      <Reorder.Group
        axis='y'
        values={items}
        onReorder={gameIsOver ? () => {} : setItems}
        className='py-2'
      >
        {items.map((item, idx) => (
          <Reorder.Item
            key={item.item.value}
            value={item}
            className={itemStyles[item.idx] + ' shadow-md cursor-pointer'}
            style={{ width: '500px' }}
          >
            <div className='py-2'>
              {!gameIsOver
                ? item.item.description
                : `${correctOrdering.findIndex((x) => equal(item.item, x)) + 1}. ${item.item.description} ${item.item.value === correctOrdering[idx].value ? '✅' : ''}`}
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <button
        type='button'
        onClick={gameIsOver ? handleOnPlayAgain : handleOnSubmit}
        disabled={gameIsOver ? false : guessButtonIsDisabled}
        style={{ width: '500px' }}
        className={
          gameIsOver ? getPlayAgainButtonStyle() : getGuessButtonStyle()
        }
      >
        {gameIsOver ? `PLAY AGAIN` : `GUESS`}
      </button>
    </>
  );
}
