import React, { useRef } from 'react'
import { Comment } from '../types'
import TimeAgo from 'react-timeago'

interface Props {
    comment: Comment
}

export default function CommentItem({comment} : Props) {

  return (
    <div className='flex items-start space-x-3 mt-3 py-3 px-1 md:px-2 bg-gray-50 rounded-lg'>
        <div className='relative'>
            <img className='w-9 h-9 rounded-full object-cover' src={comment.profileImg} alt="profile image" />
        </div>
        <div>
            <div className='flex items-end space-x-2 mb-1'>
                <h6 className='text-gray-600 font-semibold'>{comment.userName}</h6>
                <p className='text-gray-400'>@{comment.userName.replace(/\s+g/, '').toLocaleLowerCase()}</p>
                <TimeAgo className="text-sm text-gray-400" date={comment._createdAt} />
            </div>
            <p>{comment.comment}</p>
        </div>
    </div>
  )
}
