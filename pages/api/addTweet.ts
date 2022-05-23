// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TweetBody } from '../../types'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const endpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`

  const data: TweetBody = JSON.parse(req.body)
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'tweet',
          text: data.text,
          image: data.image,
          profileImg: data.profileImg,
          userName: data.userName,
          blockTweet: false,
        },
      },
    ],
  }

  const result = await fetch(endpoint, {
      headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
      },
      method: 'post',
      body: JSON.stringify(mutation),
  })

  const json = await result.json()

  res.status(200).json({ message: 'DONE!' })
}
