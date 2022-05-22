import { Tweet } from "../types"

export const fetchTweets = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`)
    const data = await result.json()
    const tweets: Tweet[] = data.tweets
    return tweets
}