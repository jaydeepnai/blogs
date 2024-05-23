'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Cookie from 'js-cookie'

const CommentsSection = ({ postId }) => {
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState([])
  const [User, setUser] = useState(() => {
    const userCookie = Cookie.get('user')
    return userCookie != undefined ? JSON.parse(userCookie) : {}
  })
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyContent, setReplyContent] = useState('')

  const addComment = async (e) => {
    e.preventDefault()
    if(Object.keys(User).length>0){
      try {
        const res = await fetch('https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: newComment, author: User?.userId, post: postId }),
        })
        if (res.ok) {
          toast.success('Comment added successfully')
          setNewComment('')
          await fetchComments(postId)
        } else {
          throw new Error('Failed to add comment')
        }
      } catch (error) {
        toast.error(error.message)
      }
    }else{
    toast.error("Please Login 1st")
  }
  }

  const addReply = async (e, parentId) => {
    e.preventDefault()
    if(Object.keys(User).length>0){
    try {
      const res = await fetch('https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent, author: User?.userId, post: postId, parentComment: parentId }),
      })
      if (res.ok) {
        toast.success('Reply added successfully')
        setReplyContent('')
        setReplyingTo(null)
        await fetchComments(postId)
      } else {
        throw new Error('Failed to add reply')
      }
    } catch (error) {
      toast.error(error.message)
    }}else{
      toast.error("Please Login 1st")
    }
  }

  useEffect(() => {
    fetchComments(postId)
  }, [postId])

  const fetchComments = async (postId) => {
    try {
      const res = await fetch(`https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/comments/${postId}`, { cache: 'no-store' })
      if (!res.ok) { 
        throw new Error('Failed to fetch comments')
      }
      const data = await res.json()
      setComments(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment._id} className="mt-4 ml-4 border-l pl-4">
        <div>
          <strong>{comment.author.username} Says</strong> "{comment.content}"
        </div>
        <button
          onClick={() => setReplyingTo(comment._id)}
          className="mt-2 rounded bg-gray-300 px-2 py-1 text-sm"
        >
          Reply
        </button>
        {replyingTo === comment._id && (
          <form onSubmit={(e) => addReply(e, comment._id)} className="mt-2">
            <textarea
              className="w-full rounded border p-2"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Add a reply..."
              required
            />
            <button type="submit" className="mt-2 rounded bg-blue-500 px-4 py-2 text-white">
              Submit
            </button>
          </form>
        )}
        {comment.children && comment.children.length > 0 && (
          <div className="ml-4">
            {renderComments(comment.children)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Comments</h2>
      <form onSubmit={addComment} className="mt-4">
        <textarea
          className="w-full rounded border p-2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit" className="mt-2 rounded bg-blue-500 px-4 py-2 text-white">
          Submit
        </button>
      </form>
      <div className="mt-8">
        {comments.length > 0 ? (
          renderComments(comments)
        ) : (
          <div>No comments yet. Be the first to comment!</div>
        )}
      </div>
    </div>
  )
}

export default CommentsSection
