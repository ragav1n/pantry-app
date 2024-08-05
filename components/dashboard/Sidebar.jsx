import { ChevronLeft, Home, ShoppingCart, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
  return (
    <div className='w-60 min-h-screen bg-slate-800 text-slate-50 justify-between'>
      {/*Top Part*/}

      <div className="flex flex-col">
        {/*Logo*/}
        <nav>
        <div className="bg-slate-950 flex items-center space-x-3 py-4 px-2">
          <Link className='flex items-center space-x-2 p-2' href='/dashboard/home/'>
            <ShoppingCart/>
            <span className='text-xl font-semibold'>Pantry</span>
            </Link>
        </div>
        </nav>
        {/*Links*/}
        <nav className='flex flex-col gap-8 px-3 py-6'>
            <Link className='flex items-center space-x-2 p-2' href='/dashboard/home/'>
                <Home className='w-4 h-4'/>
                <span>Home</span>
            </Link>
            <Link className='flex items-center space-x-2 p-2' href='/dashboard/home/itemsList/'>
                <ShoppingCart className='w-4 h-4'/>
                <span>Pantry</span>
            </Link>
        </nav>
        {/*Bottom*/}
      </div>
    </div>
  )
}