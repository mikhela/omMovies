import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MoviesSection from '../components/MoviesSection';

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <div className='bg-black'>
      <Navbar setSearchTerm={setSearchTerm} />
      <div className="container px-2 h-[90vh] overflow-y-auto ">
        <MoviesSection searchTerm={searchTerm} />
      </div>
    </div>
  );
}
