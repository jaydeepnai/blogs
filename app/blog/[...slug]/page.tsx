import { notFound } from 'next/navigation'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import PageTitle from '@/components/PageTitle'
import Tag from '@/components/Tag'
import Link from 'next/link'
import CommentsSection from '@/components/CommentBox'
import PostInfo from '@/components/Blogs/ViewIncreament'

const getData= async(postId)=> {
  try {
    const res = await fetch('https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/blogs/'+postId,{ next : {revalidate: 20}, cache: 'no-store', })
    if (!res) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/')
  const post = await getData(slug)
  if (!post) {
    return notFound()
  }
  const { createdAt : date,dislikes,likes, title, desciption, tags,author,content:contentDetails, views  } = post
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-left">
              <div>
                <PageTitle>{author.username} About "{title}"</PageTitle>
                <PostInfo postInfo={{email:author.email,date:date,dislikes:dislikes,likes:likes}} postId={slug} />
              </div>
            </div>
          </header>
          <div className="grid-rowss-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{contentDetails}</div>
              <CommentsSection postId={slug} />
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={"/home"}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </section>
  )

}
