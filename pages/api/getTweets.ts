// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Tweet } from '../../types'
import {groq} from 'next-sanity'
import {sanityClient} from '../../sanity'

type Data = {
  tweets: Tweet[]
}

const getTweetsQuery = groq`
    *[_type == "tweet" && !blockTweet] {
        _id,
        ...
    } | order(_createdAt desc)
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const tweets: Tweet[] = await sanityClient.fetch(getTweetsQuery)
  res.status(200).json({tweets})
}