'use client';

import { useEffect, useState } from 'react';
import { randInt } from '../utils/randInt';
import { useAppDispatch } from '../store/hooks';
import { initialize } from '../store/reducers/gameSlice';
import Modal from '../components/Modal';

const capitalize = (description: string) => {
  return description.charAt(0).toUpperCase() + description.slice(1);
};

const strip = (description: string) => {
  return (
    description.split('is the number of ')[1] ??
    description.split('is the ')[1] ??
    description.split('is a ')[1] ??
    description
  ).slice(0, -1);
};

export default function Header() {
  const [numbers, setNumbers] = useState<any[]>([]);
  useEffect(() => {
    const getNumberData = async () => {
      const numbers = [
        randInt(0, 101),
        randInt(0, 101),
        randInt(0, 101),
        randInt(0, 101),
        randInt(0, 101),
      ]
        .sort()
        .map((x) => x.toString());
      const p = numbers.join(',');
      const response = await fetch(`http://numbersapi.com/${p}`);
      const result = await response.json();
      const data = numbers.map((number) => {
        return {
          description: capitalize(strip(result[number])),
          value: number,
        };
      });
      setNumbers(data);
    };
    getNumberData();
  }, []);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (numbers.length > 0) {
      dispatch(initialize({ numbers: numbers }));
    }
  }, [numbers]);

  const [infoModalIsOpen, setInfoModalIsOpen] = useState(true);
  const [helpModalIsOpen, setHelpModalIsOpen] = useState(false);
  const [rocketModalIsOpen, setRocketModalIsOpen] = useState(false);
  const handleCloseInfoModal = () => {
    setInfoModalIsOpen(false);
  };
  const handleCloseHelpModal = () => {
    setHelpModalIsOpen(false);
  };
  const handleCloseRocketModal = () => {
    setRocketModalIsOpen(false);
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
              className='w-10 h-10 text-m text-gray-600 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 shadow-md hover:bg-gray-100'
              onClick={() => setHelpModalIsOpen(true)}
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
          modalIsOpen={helpModalIsOpen}
          onClose={handleCloseHelpModal}
          titleCopy='Settings'
          bodyCopy='Find us on Github!'
          closeCopy='GOT IT'
        />
      </div>
    </>
  );
}
