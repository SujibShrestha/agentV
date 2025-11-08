'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [{label:'Home',href:'/'},
    {label:'Companions',href:'/companions'},
    {label:'My Journey',href:'/my-journey'},
]

const Navitems = () => {
const pathName = usePathname();
  return (
    <nav className='flex items-center gap-4'>
        {navItems.map(({label,href})=>(
<Link href={href} key={label} className={`${pathName===href? "text-primary font-semibold":"" }`}>{label}</Link>
        ))}
    </nav>
  )
}

export default Navitems