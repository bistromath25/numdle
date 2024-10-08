'use client';

import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { encrypt } from '../utils/utils';

export default function Progress() {
  const {
    game: { numbers, correctOrdering, guessesRemaining, guessResults },
  } = useAppSelector((state) => state);
  useEffect(() => {
    if (correctOrdering.length > 0) {
      localStorage.setItem(
        'game',
        encrypt(
          'game',
          JSON.stringify({
            numbers,
            guessesRemaining,
            guessResults,
          })
        )
      );
    }
  }, [correctOrdering, numbers, guessesRemaining, guessResults]);
  return (
    <div className='flex flex-row space-x-2.5 float-right px-2.5 py-2 rounded-md'>
      {[...guessResults, ...Array(guessesRemaining).fill(-1)].map(
        (result, idx) => {
          var className = `text-center text-sm border border-gray-300 rounded-md min-w-7`;
          if (guessResults.length === 5 && idx === 4) {
            className += ` text-green-800 bg-green-300`;
          } else if (result !== -1) {
            className += ` text-green-600 bg-green-200`;
          }
          return (
            <div className={className} key={idx}>
              {result !== -1 ? result : `🤔`}
            </div>
          );
        }
      )}
    </div>
  );
}
