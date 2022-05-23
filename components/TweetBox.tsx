import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import { METHODS } from 'http'
import { useSession } from 'next-auth/react'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../types'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
    setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

export default function TweetBox({setTweets} : Props) {
  const [tweetInput, setTweetInput] = useState<string>('')
  const { data: session } = useSession()
  const [imagePreview, setImagePreview] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files
    if (!!files?.[0]) {
      const formUpload = new FormData()
      formUpload.append('file', files[0])
      formUpload.append('upload_preset', 'twitter-clone-upload')

      const result = await fetch(
        'https://api.cloudinary.com/v1_1/toanil315/image/upload',
        {
          method: 'post',
          body: formUpload,
        }
      )

      let data = await result.json()
        setImagePreview(data.secure_url)
    } else {
      return false
    }
  }

  const postTweet = async () => {
    const tweet: TweetBody = {
        userName: session?.user?.name || 'unknow user',
        text: tweetInput,
        image: imagePreview,
        profileImg: session?.user?.image || 'https://links.papareact.com/gll'
    }

    const result = await fetch("/api/addTweet", {
        body: JSON.stringify(tweet),
        method: "POST"
    })

    const json = result.json()
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const toastId = toast.loading("Posting...")

    await postTweet()

    const tweetsData: Tweet[] = await fetchTweets()
    setTweets(tweetsData)

    setImagePreview("")
    setTweetInput("")
    toast.success("Post Tweet Success!", {
        id: toastId
    })
  }

  return (
    <div className="mt-4 flex space-x-3">
      <img
        className="h-12 w-12 rounded-full"
        src={session?.user?.image || 'https://links.papareact.com/gll'}
        alt="default image"
      />
      <form className="flex-1">
        <input
          onChange={(e) => {
            setTweetInput(e.target.value)
          }}
          value={tweetInput}
          className="w-full py-4 text-lg outline-none"
          type="text"
          placeholder="What's Happening"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <PhotographIcon
              onClick={() => {
                inputRef.current?.click()
              }}
              className="h-5 cursor-pointer text-twitter transition-transform duration-200 ease-out hover:scale-125"
            />
            <SearchCircleIcon className="h-5  cursor-pointer text-twitter transition-transform duration-200 ease-out hover:scale-125" />
            <EmojiHappyIcon className="h-5  cursor-pointer text-twitter transition-transform duration-200 ease-out hover:scale-125" />
            <CalendarIcon className="h-5  cursor-pointer text-twitter transition-transform duration-200 ease-out hover:scale-125" />
            <LocationMarkerIcon className="h-5  cursor-pointer text-twitter transition-transform duration-200 ease-out hover:scale-125" />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!session || !tweetInput}
            className="rounded-full bg-twitter px-5 py-1 font-bold text-white transition duration-150 hover:bg-blue-500 disabled:bg-blue-200"
          >
            Tweet
          </button>
        </div>
        <form>
          <input onChange={handleFileChange} ref={inputRef} type="file" className="hidden" />
        </form>
        {
            imagePreview ? <img className="max-h-40 object-cover mt-4 rounded-md shadow-sm" src={imagePreview} alt="preview image" /> : ""
        }
      </form>
    </div>
  )
}
