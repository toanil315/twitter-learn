import { Comment } from "../types"

export const fetchComments = async (tweetId: string) => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?tweetId=${tweetId}`)
    const data = await result.json()
    const comments: Comment[] = data.comments
    return comments
}