import React from 'react';

function Loader(props) {
  return (
    // <svg width={54} height={54} fill='none' {...props}>
    //   <path d='M17.55 16.2h-8.1v21.6h8.1V16.2z' fill='#65B4F6' />
    //   <path d='M31.05 16.2h-8.1v21.6h8.1V16.2z' fill='#E57273' />
    //   <path d='M44.55 16.2h-8.1v21.6h8.1V16.2z' fill='#81C784' />
    // </svg>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
      />
    </svg>
  );
}

export default Loader;
