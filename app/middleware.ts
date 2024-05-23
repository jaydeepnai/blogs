import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname == '/') {
    return NextResponse.redirect('/home')
  }
  return NextResponse.next()
}

export const config = {
    matcher: '/',
}