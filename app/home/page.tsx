import BlogsWithSearch from '@/components/Home/BlogsWithSearch'

async function getData() {
  const res = await fetch('https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/blogs/', { cache: 'no-store' })
  if (!res) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Page() {
  const posts = await getData()
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-32">
          <BlogsWithSearch posts={posts}/>
        </ul>
      </div>
    </>
  )
}
