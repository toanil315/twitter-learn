import React, { useEffect, useState } from 'react'
import { Comment, Tweet } from '../types'
import TimeAgo from 'react-timeago'
import { ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon, UploadIcon } from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'
import CommentItem from './CommentItem'

interface Props {
    tweet: Tweet
}

export default function TweetItem({tweet}: Props) {
    const [comments, setComments] = useState<Comment[]>([])
    useEffect(() => {
        const handleFetchComment = async (tweetId: string) => {
            const commentList: Comment[] = await fetchComments(tweetId)
            setComments(commentList)
        }

        handleFetchComment(tweet._id)
    }, [])

  return (
    <div className="py-4 border-t border-gray-100">
        <div className="flex space-x-2">
            <img className="w-10 h-10 rounded-full object-cover" src={tweet.profileImg} alt="profile" />
            <div className="flex-1">
                <div className="flex space-x-2 items-center">
                    <h5 className="font-bold text-gray-600">{tweet.userName}</h5>
                    <p className="text-sm text-gray-400">@{tweet.userName.replace(/\s+/g, '').toLowerCase()} <span>&#183;</span></p>
                    <TimeAgo className="text-sm text-gray-400" date={tweet._createdAt} />
                </div>
                <p className="mt-2 font-semibold text-gray-600">{tweet.text}</p>
                <img className="max-h-60 lg:max-h-72
                 object-cover rounded-lg shadow-md mt-2" src={tweet.image} alt="tweet image" />
            </div>
        </div>
        <div className="mt-5 flex justify-between">
            <div className="flex items-center space-x-3">
                <ChatAlt2Icon className='h-5 text-gray-500' />
                <p>{comments.length ? comments.length : ""}</p>
            </div>
            <div className="flex items-center space-x-3">
                <SwitchHorizontalIcon className='h-5 text-gray-500' />
            </div>
            <div className="flex items-center space-x-3">
                <HeartIcon className='h-5 text-gray-500' />
            </div>
            <div className="flex items-center space-x-3">
                <UploadIcon className='h-5 text-gray-500' />
            </div>
        </div>
        <div>
            {
                comments.map((comment, index) => {
                    return <CommentItem key={comment._id} comment={comment} />
                })
            }
        </div>
    </div>
  )
}
