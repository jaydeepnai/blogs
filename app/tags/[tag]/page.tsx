import { slug } from 'github-slugger'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { toast } from 'react-toastify'


const getData= async()=> {
  try{
    const res = await fetch('https://blogify-jaydeepnai-jaydeepnais-projects.vercel.app/api/v1/blogs/',{ cache: 'no-store' })
    if (!res) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }
  catch(error:any){
    toast.error(error?.message ? error?.message : error?.msg)
  }
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getData()
  const tag = params.tag
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = posts.filter((post:any) => post.tags && post.tags.map((t:any) => slug(t)).includes(tag)
  )
  return <ListLayout posts={filteredPosts} title={title} />
}
