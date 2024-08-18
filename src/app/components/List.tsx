'use client';

import { Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { makeGuess, updateGuessResults } from '../store/reducers/gameSlice';
import Progress from '../components/Progress';
import { shuffle } from '../utils/shuffle';

const indexItems = (items: { description: string; value: string }[]) => {
  return items.map((item, idx) => ({ idx, item }));
};

export default function List() {
  const {
    game: { numbers, correctOrdering, guessesRemaining },
  } = useAppSelector((state) => state);
  const [items, setItems] = useState(indexItems(numbers));
  const [numCorrect, setNumCorrect] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [itemStyles] = useState(
    shuffle([
      'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-m px-5 py-2.5 text-center me-2 mb-2',
      'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-m px-5 py-2.5 text-center me-2 mb-2',
      'text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-m px-5 py-2.5 text-center me-2 mb-2',
      'text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-m px-5 py-2.5 text-center me-2 mb-2',
      'text-white bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-m px-5 py-2.5 text-center me-2 mb-2',
    ])
  );
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    if (correctOrdering.length > 0) {
      setItems(indexItems(numbers));
      setNumCorrect(0);
      setGameIsOver(false);
    }
  }, [correctOrdering]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setChanged(true);
  }, [items]);
  const handleOnSubmit = () => {
    const result = items.map(
      (item, idx) => item.item.value === correctOrdering[idx].value
    );
    const newNumCorrect = result.filter((x) => x).length;
    setNumCorrect(newNumCorrect);
    dispatch(makeGuess());
    dispatch(updateGuessResults(newNumCorrect));
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
    var className = `text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 shadow-md`;
    if (!gameIsOver && changed) {
      className += ` hover:bg-gray-100`;
    } else {
      className += ` opacity-40`;
    }
    return className;
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
            className={itemStyles[item.idx] + ' shadow-md'}
            style={{ width: '500px' }}
          >
            <div className='py-2'>
              {!gameIsOver
                ? item.item.description
                : `${correctOrdering.indexOf(item.item) + 1}. ${item.item.description} ${item.item.value === correctOrdering[idx].value ? '✅' : ''}`}
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      {!gameIsOver && (
        <button
          type='button'
          onClick={handleOnSubmit}
          disabled={gameIsOver || !changed}
          style={{ width: '500px' }}
          className={getGuessButtonStyle()}
        >
          GUESS
        </button>
      )}
    </>
  );
}
