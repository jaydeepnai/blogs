/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import Link from '@/components/Link'
import Tag from '@/components/Tag'

interface ListLayoutProps {
  posts: any
  title: string
}

const tagData = ["Sports", "Entertainment", "WebDev", "Science", "Maths", "Hollywood", "Politics", "YouTube", "Technology", "Twitter"]

export default function ListLayoutWithTags({
  posts,
  title,
}: ListLayoutProps) {
  const pathname = usePathname()

  const displayPosts = posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className=" mr-5 bg-gray-200	h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {tagData.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {pathname.split('/tags/')[1] === slug(t) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                          {`${t}`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} `}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul  className='ml-5 pl-5'>
              {displayPosts.length > 0 && (
                displayPosts.map((post) => {
                  const { createdAt: date, title, desciption, tags, author, _id } = post
                  return (
                    <li key={_id} style={{padding:"20px",width:"900px",borderRadius:"20px", margin:"10px"}} className="px-2 m-2	py-2 border border-slate-100">
                      <article className="flex flex-col space-y-2 xl:space-y-0">
                        <div className="space-y-3">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link href={`/blog/${_id}`} className="text-gray-900 dark:text-gray-100">
                                {title}
                              </Link>
                              <div style={{paddingTop:"0px",fontSize:"15px"}} className='prose max-w-none text-gray-500 dark:text-gray-400'>
                                By {author?.username}
                              </div>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {desciption}
                          </div>
                        </div>
                      </article>
                    </li>
                  )
                })
              ) }
                     {displayPosts.length === 0 && (<h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 text-4xl md:leading-14">
                  That is Strange, We haven't Found Anything!
                </h1>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
