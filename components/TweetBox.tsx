import { CalendarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'

export default function TweetBox() {
    const [tweetInput, setTweetInput] = useState<string>("")

  return (
    <div className="mt-4 flex space-x-2">
        <img className="h-12 w-12 rounded-full" src="https://links.papareact.com/gll" alt="default image" />
        <form className="flex-1">
            <input onChange={(e) => {setTweetInput(e.target.value)}} value={tweetInput} className="w-full outline-none py-4 text-lg" type="text" placeholder="What's Happening" />
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <PhotographIcon className="h-5 text-twitter hover:scale-125 transition-transform duration-200 ease-out cursor-pointer" />
                    <SearchCircleIcon className="h-5  text-twitter hover:scale-125 transition-transform duration-200 ease-out cursor-pointer" />
                    <EmojiHappyIcon className="h-5  text-twitter hover:scale-125 transition-transform duration-200 ease-out cursor-pointer" />
                    <CalendarIcon className="h-5  text-twitter hover:scale-125 transition-transform duration-200 ease-out cursor-pointer" />
                    <LocationMarkerIcon className="h-5  text-twitter hover:scale-125 transition-transform duration-200 ease-out cursor-pointer" />
                </div>
                <button disabled={!tweetInput} className="px-5 py-1 rounded-full bg-twitter text-white font-bold hover:bg-blue-500 transition duration-150 disabled:bg-blue-200">Tweet</button>
            </div>
        </form>
    </div>
  )
}
