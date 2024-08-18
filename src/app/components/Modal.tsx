export interface ModalProps {
  modalIsOpen: boolean;
  onClose: () => void;
  titleCopy: string;
  bodyCopy: string;
  closeCopy: string;
}

export default function Modal({
  modalIsOpen,
  onClose,
  titleCopy,
  bodyCopy,
  closeCopy,
}: ModalProps) {
  return modalIsOpen ? (
    <>
      <div
        className='backdrop-blur-sm justify-center items-center text-left flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
        onClick={onClose}
      >
        <div
          className='relative w-auto my-6 mx-auto max-w-3xl'
          style={{ width: '520px' }}
        >
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>{titleCopy}</h3>
            </div>
            <div className='relative p-6 flex-auto'>
              <p className='my-4 text-blueGray-500 text-lg leading-relaxed'>
                {bodyCopy}
              </p>
            </div>
            <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
              <button
                className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={onClose}
              >
                {closeCopy}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  ) : null;
}
