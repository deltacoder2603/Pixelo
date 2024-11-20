"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm) {
      setSearchTerm("");
      window.location.href = `/search/${searchTerm}`;
    }
  };

  return (
    <div className='shadow-md'>
      <div className="flex justify-between h-[10vh] pr-4 pt-4 ml-20 mr-20"> 
        <div className="flex">
          <a href="/"><img src="https://cdn-icons-png.flaticon.com/128/4926/4926526.png" className="h-10 w-10" alt="Logo" /></a>

          <form
            onSubmit={handleSubmit}
            className="flex flex-row text-foreground gap-2 bg-primary/5 rounded-full w-full md:w-[50vw] lg:w-[30vw] px-3 py-2 transition-all duration-300 items-center"
          >
            <Search className="size-4 text-primary/80" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
              className="bg-transparent w-full placeholder:text-primary/50 active:text-primary text-primary/80 focus:border-none focus:outline-none focus:ring-0"
            />
          </form>
        </div>
        <div className='pt-1'>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
