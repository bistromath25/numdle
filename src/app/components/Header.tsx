'use client';

import { useEffect, useState } from 'react';
import { randInts } from '../utils/randInt';
import { useAppDispatch } from '../store/hooks';
import { initialize, loadSaved } from '../store/reducers/gameSlice';
import { Modal } from '../components/Modal';
import { decrypt } from '../utils/encrypt';
import { supabaseClient, numberMaxId } from '../utils/supabase';
import { env } from 'next-runtime-env';

const capitalize = (description: string) => {
  return description.charAt(0).toUpperCase() + description.slice(1);
};

const strip = (description: string) => {
  return (
    description.split('is the number of ')[1] ??
    description.split('is number of ')[1] ??
    description.split('is the ')[1] ??
    description.split('is a ')[1] ??
    description
  ).slice(0, -1);
};

export default function Header() {
  const [numbers, setNumbers] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getGameFromLS = () => {
      return localStorage.getItem('game');
    };
    const getNumberData = async () => {
      console.log('getNumberData');
      console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      console.log(env('NEXT_PUBLIC_SUPABASE_URL'));
      console.log(env('NEXT_PUBLIC_SUPABASE_ANON_KEY'));
      if (supabaseClient) {
        console.log('has supabaseClient');
        console.log('numberMaxId', numberMaxId);
        const numbersToGet = randInts(
          numberMaxId ? parseInt(numberMaxId) : 5,
          5
        );
        const response = await supabaseClient
          .from('numbers')
          .select()
          .in('id', numbersToGet);
        const result = response.data;
        const resultNumbers = result?.map((n) => {
          return {
            description: capitalize(n.description[0]),
            value: n.value as string,
          };
        });
        console.log('result', result);
        console.log('resultNumbers', resultNumbers);
        if (resultNumbers) {
          setNumbers(resultNumbers);
        }
      }
    };
    const savedGame = getGameFromLS();
    if (savedGame) {
      dispatch(loadSaved(JSON.parse(decrypt('game', savedGame))));
    } else {
      getNumberData();
    }
  }, [dispatch]);
  useEffect(() => {
    if (numbers.length > 0) {
      dispatch(initialize({ numbers: numbers }));
    }
  }, [dispatch, numbers]);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(true);
  const [statsModalIsOpen, setStatsModalIsOpen] = useState(false);
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const handleCloseInfoModal = () => {
    setInfoModalIsOpen(false);
  };
  const handleCloseSettingsModal = () => {
    setSettingsModalIsOpen(false);
  };
  const handleCloseStatsModal = () => {
    setStatsModalIsOpen(false);
  };
  return (
    <>
      <div className='content-center text-center w-screen grid grid-cols-3 gap-4 bg-white shadow-md'>
        <div>
          <div className='flex flex-row space-x-2 float-left px-4 py-4'>
            <h1 className='text-3xl font-bold'>NUMDLE</h1>
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-bold w-full pt-1'>
            Order the numbers from smallest to largest in 5 guesses or less!
          </h2>
        </div>
        <div>
          <div className='flex flex-row space-x-2 float-right px-4 py-4'>
            <button
              className='w-10 h-10 text-lg text-gray-600 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 shadow-md hover:bg-gray-100'
              onClick={() => setInfoModalIsOpen(true)}
            >
              i
            </button>
            <button
              className='w-10 h-10 text-lg text-gray-600 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 shadow-md hover:bg-gray-100'
              onClick={() => setStatsModalIsOpen(true)}
            >
              🏆
            </button>
            <button
              className='w-10 h-10 text-m text-gray-600 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 shadow-md hover:bg-gray-100'
              onClick={() => setSettingsModalIsOpen(true)}
            >
              &middot; &middot; &middot;
            </button>
          </div>
        </div>
        <Modal
          modalIsOpen={infoModalIsOpen}
          onClose={handleCloseInfoModal}
          titleCopy='Welcome to Numdle!'
          bodyCopy='Yet another Wordle-inspired game! Order the numbers from smallest to largest in 5 guesses or less!'
          closeCopy='START'
        />
        <Modal
          modalIsOpen={statsModalIsOpen}
          onClose={handleCloseStatsModal}
          titleCopy='Results'
          bodyCopy='Stay tuned...'
          closeCopy='GOT IT'
        />
        <Modal
          modalIsOpen={settingsModalIsOpen}
          onClose={handleCloseSettingsModal}
          titleCopy='Settings'
          bodyCopy='Find us on Github!'
          closeCopy='ALL SET'
        />
      </div>
    </>
  );
}
