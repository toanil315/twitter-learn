import { SearchIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'
import { TwitterTimelineEmbed} from 'react-twitter-embed';

export default function Widgets() {
  return (
    <div className="col-span-2 hidden lg:block h-screen">
        <div className="mt-4 mx-2 mb-2 flex items-center space-x-2 p-2 bg-gray-100 rounded-full">
            <SearchIcon className="h-6 text-gray-300" />
            <input type="text" className="bg-transparent outline-none" placeholder="Search" />
        </div>

        <TwitterTimelineEmbed
            sourceType="profile"
            screenName="sonnysangha"
            autoHeight={true}
        />
    </div>
  )
}
