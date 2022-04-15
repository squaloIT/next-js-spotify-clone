import { NextRequest, NextResponse } from "next/server";

const urlsToCheck = ['/', 'library', '/playlist']

export default function(req: NextRequest) {
  console.log("running middleware")
  if(urlsToCheck.find(url => url === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;
  
    if(!token) {
      return NextResponse.redirect('/signin')
    }
  }
}