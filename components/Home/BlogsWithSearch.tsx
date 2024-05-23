'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Tag from '../Tag'
import Select from 'react-select'
import { DislikeFilled, EyeFilled, HeartFilled } from '@ant-design/icons'

const BlogsWithSearch = ({ posts }: { posts: any }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleChange = (option) => {
    setSelectedOption(option)
  }

  const options = posts.map((post) => ({
    value: post._id,
    label: post.title,
  }))

  const filteredPosts = selectedOption
    ? posts.filter((post) => post.title.toLowerCase().includes(selectedOption?.label.toLowerCase()))
    : posts

  return (
    <div>
      <div className="mb-30">
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder="Search by title..."
          isClearable
          classNamePrefix="react-select"
          styles={{
            control: (provided) => ({
              ...provided,
              padding: '0.5rem',
              borderColor: 'gray',
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
            }),
          }}
        />
      </div>
      {filteredPosts.length === 0 && <p>No posts found.</p>}
      {filteredPosts.length > 0 && (
        <ul>
          {filteredPosts.map((post) => {
            const {
              slug,
              createdAt: date,
              title,
              desciption,
              tags,
              author,
              _id,
              views,
              likes,
              dislikes,
            } = post
            return (
              <li key={slug} className="py-5 border-b-slate-300 border-b-2">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${_id}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div style={{marginTop:"5px"}} className="text-2xl">By {author?.username}</div>
                        <div style={{marginTop:"5px"}}  className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {desciption}
                        </div>
                        <div style={{marginTop:"5px"}} >
                          <div className="flex items-center space-x-4 pt-4">
                            <EyeFilled size={45} className="text-blue-500" />
                            <span className="text-gray-500">{views}</span>
                            <button
                              disabled
                              className="flex items-center text-gray-500 hover:text-red-500 focus:outline-none"
                            >
                              <HeartFilled size={45} className="text-red-500" />
                              <span className="ml-1">{likes.length}</span>
                            </button>
                            <button
                              disabled
                              className="flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
                            >
                              <DislikeFilled className="text-blue-500" />
                              <span className="ml-1">{dislikes.length}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${_id}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
          <li className='text-center pt-4'>
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-400 dark:text-gray-100 sm:leading-10 md:leading-14">
            We are Finished Here!
          </h1>
          </li>
        </ul>
      )}
    </div>
  )
}

export default BlogsWithSearch
