"use client"
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Modal, Skeleton } from 'antd';

const PostCard = ({ post, showDeleteModal }) => (
  <div className="bo my-4 ml-3 w-[500px] divide-slate-200 overflow-hidden rounded border-b-2 drop-shadow-lg">
    <div className="px-6 py-4">
      <div className="mb-2 text-xl font-bold">{post.title}</div>
      <p className="text-base text-gray-700">{post.desciption}</p>
      <div className="text-sm text-gray-500">{post.createdAt}</div>
    </div>
    <div className="px-6 pb-2 pt-4">
      {post.tags.map((tag, index) => (
        <span
          key={index}
          className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
        >
          #{tag}
        </span>
      ))}
    </div>
    <div className="flex justify-between rounded px-4 py-2 font-bold text-blue-500 hover:text-blue-700">
      <Link href={'blog/' + post._id}> Read more...</Link>
      <Link href={'blog/edit/' + post._id}> Edit</Link>
      <button onClick={(e)=>{
           e.preventDefault(); 
          showDeleteModal(post._id)
          }}> Delete</button>
    </div>
  </div>
)

const BlogList = () => {
  const [Posts, setPosts] = useState<any>([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [loading, setLoading] = useState(true);

  const showDeleteModal = (id) => {
    setCurrentPostId(id);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    await DeleteBlog(currentPostId);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getAuthorBlogs = useCallback(async () => {
    try {
      const userData = Cookies.get("user");
      if (!userData) {
        throw new Error("User data not found in cookie");
      }
      
      const user = JSON.parse(userData);
      const res = await fetch("https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/blogs/author/" + user.userId, { cache: 'no-store' });
      
      if (!res.ok) {
        throw new Error("Failed to fetch author blogs");
      }
      var result = await res.json();
      setPosts(result)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching author blogs:", error);
      setLoading(false);

    }
  }, [])

  const DeleteBlog = useCallback(async(id) => {
    try {
      const res = await fetch("https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/blogs/" + id, { method: "DELETE" });
      
      if (!res.ok) {
        throw new Error("Failed to delete the blog");
      }
      var result = await res.json();
      setPosts(Posts.filter(post => post._id !== id));
      toast.success("Deleted Successfully")
    } catch (error) {
      console.error("Error Deleting blog:", error.message ? error.message : error.msg);
    }
  }, [Posts])

  useEffect(() => {  
    getAuthorBlogs()
  }, [getAuthorBlogs])

  return (
    <div>
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>
      
      <div className="flex w-[1000px] items-center justify-between">
        <h1 className="my-8 mr-4 text-4xl font-bold">Blog Posts of {Posts[0]?.author.username}</h1>
        {loading && <Skeleton width={200} />}
        <div>
          <Link
            href="profile/create"
            className="rounded-full bg-blue-500 p-4 text-white shadow-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Create
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap">
      {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bo my-4 ml-3 w-[500px] divide-slate-200 overflow-hidden rounded border-b-2 drop-shadow-lg">
              <div className="px-6 py-4">
                <Skeleton height={30} width={`80%`} />
                <Skeleton height={20} count={3} />
                <Skeleton height={20} width={`60%`} />
              </div>
              <div className="px-6 pb-2 pt-4">
                <Skeleton height={25} width={80} />
              </div>
              <div className="flex justify-between rounded px-4 py-2">
                <Skeleton width={80} />
                <Skeleton width={80} />
                <Skeleton width={80} />
              </div>
            </div>
          ))
        ) : (
          Posts.length > 0 ? Posts.map((post, index) => (
            <PostCard showDeleteModal={showDeleteModal} key={index} post={post} />
          )) : (
            <h1 className="my-8 mr-4 text-3xl font-semibold text-gray-400">No Post Here, Lets Get Started with clicking on Create Button</h1>
          )
        )}
      </div> 
    </div>
  )
}

export default BlogList
