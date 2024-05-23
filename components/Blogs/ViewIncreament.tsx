'use client'

import {
  DislikeFilled,
  DislikeOutlined,
  EyeFilled,
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Cokkies from "js-cookie"


const PostInfo = ({ postId, postInfo: { email, date} }) => {
  const [View, setView] = useState(0)
  const user = Cokkies.get("user") == undefined ? {} :JSON.parse(Cokkies.get("user")) 
  const [likes, setLikes] = useState([])
  const [dislikes, setDislikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  
  useEffect(() => {
    const incrementViews = async () => {
      try {
        const res = await fetch(`https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/blogs/addingViews/${postId}`, {
          method: 'POST',
        })
        const res2 = await fetch(`https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/blogs/${postId}`)
        if (!res.ok) {
          throw new Error('Failed to increment views')
        } else {
          var result = await res.json()
          var {dislikes:DisLike,likes:Likes} = await res2.json()
          setLikes(Likes.length)
          setDislikes(DisLike.length)
          setDisliked(DisLike.includes(user.userId))
          setLiked(Likes.includes(user.userId))
          setView(result.views)
        }
      } catch (error) {
        console.error(error.message)
        toast.error('Failed to increment views')
      }
    }

    incrementViews()
  }, [])

  const handleLike = async () => {
    if(Object.keys(user).length>0){
      try {
        const res = await fetch(`https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/blogs/like/${postId}`, {
          method: 'POST',
            headers: {
          'Content-Type': 'application/json',
            },
          body: JSON.stringify({ userId : user.userId }),
        })
        if (!res.ok) {
          throw new Error('Failed to like post')
        }
        var result = await res.json()
        toast.success('Liked the post!')
        setDislikes(result.dislikesCount)
        setLikes(result.likesCount)
        if (disliked) {
          setDisliked(false)
        }
        setLiked(true)
      } catch (error) {
        console.error(error.message)
        toast.error('Failed to like post')
      }
    }else{
      toast.error("Please Login 1st")
    }
  }

  const handleDislike = async () => {
    if(Object.keys(user).length>0){
    try {
      const res = await fetch(`https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/blogs/dislike/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ userId : user.userId }),
        headers: {
          'Content-Type': 'application/json',
            },
      })
      if (!res.ok) {
        throw new Error('Failed to dislike post')
      }
      var result = await res.json()
      setDislikes(result.dislikesCount)
      setLikes(result.likesCount)
      if (liked) {
        setLiked(false)
      }
      setDisliked(true)
      toast.success('Disliked the post!')
    } catch (error) {
      console.error(error.message)
      toast.error('Failed to dislike post')
    }
  }else{
    toast.error("Please Login 1st")
  }
  }

  return (
    <div>
      <div>
        From: {email} | Posted Date: {date}
      </div>
      <div className="flex items-center space-x-4 pt-4">
        <EyeFilled size={45} className="text-blue-500" />
        <span className="text-gray-500">{View}</span>
        <button
          className="flex items-center text-gray-500 hover:text-red-500 focus:outline-none"
          onClick={handleLike}
        >
          {liked ? <HeartFilled size={45} className="text-red-500" /> : <HeartOutlined />}
          <span className="ml-1">{likes}</span>
        </button>
        <button
          className="flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
          onClick={handleDislike}
        >
          {disliked ? <DislikeFilled className="text-blue-500" /> : <DislikeOutlined />}
          <span className="ml-1">{dislikes}</span>
        </button>
      </div>
    </div>
  )
}

export default React.memo(PostInfo)
