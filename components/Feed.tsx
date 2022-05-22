import { RefreshIcon } from '@heroicons/react/outline'
import React from 'react'
import TweetBox from './TweetBox'

export default function Feed() {
  return (
    <div className="col-span-8 sm:col-span-7 lg:col-span-5 p-4 border-x">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Home</h1>
        <RefreshIcon className="h-7 text-twitter hover:rotate-180 active:scale-125 transition-all duration-200 ease-out cursor-pointer" />
      </div>

      <TweetBox />
    </div>
  )
}
