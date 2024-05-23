import BlogPostEditForm from '@/components/Forms/EditForm'

async function getData(postId) {
  const res = await fetch('https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/blogs/' + postId, { cache: 'no-store' })
  if (!res) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/')
  const data = await getData(slug)
  return (
    <div>
      <h1 className="my-8 mr-4 text-4xl font-bold">Edit Your Blog</h1>
      <BlogPostEditForm formData={data} />
    </div>
  )
}
