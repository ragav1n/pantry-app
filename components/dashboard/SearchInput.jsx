'use client';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function SearchInput() {
    const [pantry, setPantry] = useState([]);
    const [filteredPantry, setFilteredPantry] = useState([]);
    const [open, setOpen] = useState(false);
    const [itemName, setItemName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filteredItems = pantry.filter(item => item.name.toLowerCase().includes(lowercasedQuery));
        setFilteredPantry(filteredItems);
    }, [searchQuery, pantry]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <form>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Search className='w-4 h-4 text-gray-500 dark:text-gray-400'/>
                </div>
                <input 
                    type="text" 
                    id="simple-search" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 px-3 py-1.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search items" 
                    required 
                    value={searchQuery} 
                    onChange={handleSearchChange} 
                />
            </div>
        </form>
    );
}
