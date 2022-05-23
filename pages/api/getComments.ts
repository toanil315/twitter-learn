// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Comment } from '../../types'
import { groq } from 'next-sanity'
import { sanityClient } from '../../sanity'

type Data = {
  comments: Comment[]
}

const getCommentsQuery = groq`
    *[_type == "comment" && tweet._ref == $tweetId] {
        _id,
        ...
    } | order(_createdAt desc)
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetId } = req.query
  const comments: Comment[] = await sanityClient.fetch(getCommentsQuery, {
    tweetId,
  })
  res.status(200).json({ comments })
}
