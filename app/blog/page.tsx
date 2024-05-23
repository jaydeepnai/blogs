import ListLayout from '@/layouts/ListLayoutWithTags'
export const posts = [
  {
    slug:"slug", 
    createdAt:"date", 
    title:"title", 
    desciption:"summary", 
    tags:["tag1","tag2","tag3","tag4","tag5"],
    content:"hare krishna",
    author : "author1",
  },
  {
    slug:"slug2", 
    createdAt:"date2", 
    title:"title2", 
    desciption:"summary2", 
    content:"",
    // tags:"tags2"
    tags:["tag1","tag2","tag3","tag4","tag5"],
    author : "author1",
  },
  {
    slug:"slug3", 
    content:"",
    createdAt:"date3", 
    title:"title3", 
    desciption:"summary3", 
    // tags:"tags3"
    tags:["tag1","tag2","tag3","tag4","tag5"],
    author : "author1",
  },
  {
    slug:"slug4", 
    createdAt:"date4", 
    content:"",
    title:"title4", 
    desciption:"summary4", 
    // tags:"tags4"
    tags:["tag1","tag2","tag3","tag4","tag5"],
    author : "author1",
  },
  {
    slug:"slug5", 
    createdAt:"date5", 
    content:"",
    title:"title5", 
    desciption:"summary5", 
    // tags:"tags5"
    author : "author1",
    tags:["tag1","tag2","tag3","tag4","tag5"]
  }
]

export default function BlogPage() {
  return (
    <ListLayout
      posts={posts}
      title="All Posts"
    />
  )
}
