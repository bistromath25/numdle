'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { initialize, loadSaved } from '../store/reducers/gameSlice';
import { Modal } from '../components/Modal';
import { decrypt } from '../utils/utils';
import { getNumberData } from '../utils/supabase';
import Link from 'next/link';

export default function Header() {
  const [numbers, setNumbers] = useState<any[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);
    setIsLargeScreen(window.innerWidth > 1280);
  }, []);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getGameFromLS = () => {
      return localStorage.getItem('game');
    };
    const savedGame = getGameFromLS();
    if (savedGame) {
      dispatch(loadSaved(JSON.parse(decrypt('game', savedGame))));
    } else {
      getNumberData().then((resultNumbers) => {
        if (resultNumbers) {
          setNumbers(resultNumbers);
        }
      });
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
      <div
        className={`content-center text-center w-${isSmallScreen ? 'full' : 'screen'} grid grid-cols-${isSmallScreen ? '2' : '3'} gap-4 bg-white shadow-md`}
      >
        <div>
          <div className='flex flex-row space-x-2 float-left px-4 py-4'>
            <Link href='https://github.com/bistromath25/numdle'>
              <img src='../../favicon.ico' className='w-9 h-9'></img>
            </Link>
            <h1 className='text-3xl font-bold'>NUMDLE</h1>
          </div>
        </div>
        {!isSmallScreen && (
          <div>
            <h2 className='text-2xl font-bold w-full pt-1'>
              {isLargeScreen ? (
                <>
                  Order the numbers from smallest to<br></br>largest in 5
                  guesses or less!
                </>
              ) : (
                <>
                  Order the numbers from smallest to largest in 5 guesses or
                  less!
                </>
              )}
            </h2>
          </div>
        )}
        <div>
          <div className='flex flex-row space-x-2 float-right px-4 py-4'>
            <button
              className='w-10 h-10 text-lg text-gray-600 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm shadow-md hover:bg-gray-100'
              onClick={() => setInfoModalIsOpen(true)}
            >
              i
            </button>
            <button
              className='w-10 h-10 text-lg text-gray-600 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm shadow-md hover:bg-gray-100'
              onClick={() => setStatsModalIsOpen(true)}
            >
              🏆
            </button>
            <button
              className='w-10 h-10 text-m text-gray-600 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm shadow-md hover:bg-gray-100'
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
          bodyDiv={
            <span>
              <p>
                Find us on{' '}
                <a
                  href='https://github.com/bistromath25/numdle'
                  className='underline'
                >
                  Github
                </a>
                !
              </p>
            </span>
          }
          closeCopy='ALL SET'
        />
      </div>
      {isSmallScreen && (
        <div>
          <h2 className='text-md font-bold w-full pt-1'>
            Order the numbers from smallest to largest in 5 guesses or less!
          </h2>
        </div>
      )}
    </>
  );
}
