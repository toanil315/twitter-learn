import React, { SVGProps } from 'react'

interface SidebarItemProps {
    title: String,
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
    onClick?: () => {}
}

export default function SidebarItem({title, Icon, onClick} : SidebarItemProps) {
  return (
    <div onClick={() => {onClick?.()}} className="flex items-center max-w-fit space-x-2 py-2 px-4 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-150 group">
      <Icon className="h-6 group-hover:text-twitter" />
      <p className="font-semibold group-hover:text-twitter hidden md:inline-block">{title}</p>
    </div>
  )
}
