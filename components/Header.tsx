'use client'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {
  const [isClient, setIsClient] = useState(false)
  const path = usePathname()
  const router = useRouter()
  const [User, setUser] = useState({})

  const headerNavLinks = User?.userId
    ? [
        { title: 'Blog', href: '/home' },
        { title: 'Tags', href: '/tags' },
        { title: 'Profile', href: '/profile' },
        { title: 'Logout' , href: '/profile'},
      ]
    : [
        { title: 'Blog', href: '/home' },
        { title: 'Tags', href: '/tags' },
        { title: 'SignUp', href: '/signup' },
        { title: 'SignIn', href: '/signin' },
      ]

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      const userCookie = Cookie.get('user')
      setUser(userCookie != undefined ? JSON.parse(userCookie) : {})
    }
  }, [isClient])

  if (!isClient) {
    return null
  }

  return (
    <header className="flex items-center justify-between py-10">
      <div className="flex items-center justify-between">
        <div className="mr-3 text-5xl font-bold">Blogify</div>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .map((link) => {
            return link.title == "Logout" ?(
              <div className='hidden cursor-pointer font-medium text-gray-900 dark:text-gray-100 sm:block' onClick={()=>{
                Cookie.remove("user")
                router.push("/signin")
              }}> Logout </div>
            ):(
              <Link
                key={link.title}
                href={link?.href}
                className={`${path.includes(link?.href) ? "bg-blue-400 p-3 text-white rounded-full ":""}hidden font-medium text-gray-900 dark:text-gray-100 sm:block`}
              >
                {link.title}
              </Link>
            )
          })}
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
