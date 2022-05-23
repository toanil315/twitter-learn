import React from 'react'
import {HomeIcon, HashtagIcon, BellIcon, MailIcon, BookmarkIcon, CollectionIcon, UserIcon, DotsCircleHorizontalIcon} from "@heroicons/react/outline"
import SidebarItem from './SidebarItem'
import { signIn, signOut, useSession } from 'next-auth/react'

const routeSidebar = [
    {
        title: "Home",
        Icon: HomeIcon
    },
    {
        title: "Explore",
        Icon: HashtagIcon
    },
    {
        title: "Notifications",
        Icon: BellIcon
    },
    {
        title: "Messages",
        Icon: MailIcon
    },
    {
        title: "Bookmarks",
        Icon: BookmarkIcon
    },
    {
        title: "List",
        Icon: CollectionIcon
    },
    {
        title: "Auth",
        Icon: UserIcon
    },
    {
        title: "More",
        Icon: DotsCircleHorizontalIcon
    },
]

export default function Sidebar() {

    const {data: session} = useSession()

  return (
    <div className="space-y-2 col-span-1 flex flex-col items-center sm:col-span-2 md:items-start">
        <img className="h-10 mt-2 md:ml-4" src="https://links.papareact.com/drq" alt="logo twitter" />
        {
            routeSidebar.map((route, index) => {
                if(!session && route.title === "Auth") {
                    return <SidebarItem key={index} Icon={route.Icon} title={"Sign In"} onClick={signIn} />
                }

                if(session && route.title === "Auth") {
                    return <SidebarItem key={index} Icon={route.Icon} title={"Sign Out"} onClick={signOut} />
                }
                return <SidebarItem key={index} Icon={route.Icon} title={route.title} />
            })
        }
    </div>
  )
}
