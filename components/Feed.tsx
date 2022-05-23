import { RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Tweet } from '../types'
import TweetBox from './TweetBox'
import TweetItem from './TweetItem'
import toast from 'react-hot-toast';
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

export default function Feed({tweets: tweetsProp}: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)

  const handleRefreshTweets = async () => {
    const toastId = toast.loading('Refreshing...');
    const tweetsData: Tweet[] = await fetchTweets()
    setTweets(tweetsData)
    toast.success('Feed Updated!', {
      id: toastId,
    });
  }

  return (
    <div className="max-h-screen col-span-8 sm:col-span-7 lg:col-span-5 p-4 border-x overflow-y-scroll">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Home</h1>
        <RefreshIcon onClick={handleRefreshTweets} className="h-7 text-twitter hover:rotate-180 active:scale-125 transition-all duration-200 ease-out cursor-pointer" />
      </div>

      <TweetBox />

      <div className="mt-5">
          {
            tweets.map((tweet, index) => {
              return <TweetItem key={tweet._id} tweet={tweet} />
            })
          }
      </div>
    </div>
  )
}
