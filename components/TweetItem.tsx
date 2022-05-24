import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet } from '../types'
import TimeAgo from 'react-timeago'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import CommentItem from './CommentItem'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Props {
  tweet: Tweet
}

export default function TweetItem({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false)
  const [commentInput, setCommentInput] = useState<string>("")
  const {data: session} = useSession()

  const handleFetchComment = async (tweetId: string) => {
    const commentList: Comment[] = await fetchComments(tweetId)
    setComments(commentList)
  }

  useEffect(() => {
    handleFetchComment(tweet._id)
  }, [])

  const postComment = async () => {
    const commentData : CommentBody = {
        comment: commentInput,
        userName: session?.user?.name || "unknown user",
        profileImg: session?.user?.image || "https://links.papareact.com/gll",
        tweetId: tweet._id,
    }

    const result = await fetch("/api/addComment", {
        body: JSON.stringify(commentData),
        method: "POST"
    })

    const json = result.json()
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const toastId = toast.loading("Posting...")

    await postComment()

    await handleFetchComment(tweet._id)

    setCommentInput("")
    setShowCommentBox(false)
    toast.success("Comment Success!", {
        id: toastId
    })
  }

  return (
    <div className="border-t border-gray-100 py-4">
      <div className="flex space-x-2">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt="profile"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h5 className="font-bold text-gray-600">{tweet.userName}</h5>
            <p className="text-sm text-gray-400">
              @{tweet.userName.replace(/\s+/g, '').toLowerCase()}{' '}
              <span>&#183;</span>
            </p>
            <TimeAgo
              className="text-sm text-gray-400"
              date={tweet._createdAt}
            />
          </div>
          <p className="mt-2 font-semibold text-gray-600">{tweet.text}</p>
          <img
            className="mt-2 max-h-60
                 rounded-lg object-cover shadow-md lg:max-h-72"
            src={tweet.image}
            alt="tweet image"
          />
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <div onClick={() => {setShowCommentBox(n => !n)}} className="flex items-center space-x-3 cursor-pointer">
          <ChatAlt2Icon className="h-5 text-gray-500" />
          <p>{comments.length ? comments.length : ''}</p>
        </div>
        <div className="flex items-center space-x-3">
          <SwitchHorizontalIcon className="h-5 text-gray-500" />
        </div>
        <div className="flex items-center space-x-3">
          <HeartIcon className="h-5 text-gray-500" />
        </div>
        <div className="flex items-center space-x-3">
          <UploadIcon className="h-5 text-gray-500" />
        </div>
      </div>

      {showCommentBox && (
        <form onSubmit={handleSubmit} className="w-full mt-3 flex items-center space-x-2">
          <input onChange={(e) => {setCommentInput(e.target.value)}} className='outline-none flex-1 p-2 bg-gray-100 rounded-md' type="text" placeholder="Comment here..." />
          <button className="font-semibold text-twitter p-2" type="submit">Post</button>
        </form>
      )}

      <div>
        {comments.map((comment, index) => {
          return <CommentItem key={comment._id} comment={comment} />
        })}
      </div>
    </div>
  )
}
