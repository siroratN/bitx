
import { DarkMode } from "./DarkMode"
import Menu from "./Menu"
import Link from 'next/link';

const nav = [
  { label: "Markets", href: '/'},
  { label: "Assets", href: '/assets' },
  { label: "Activity", href: '/activity' }
];


const Navbar = () => {
  return (
    <nav className='shadow-sm '>
        <div className="container flex justify-between items-center py-4 ">
            <div className='flex items-center gap-20  font-semibold text-lg '>
              <p className="mr-2 font-medium text-[rgb(147,137,43)]">BitX</p>
              <div className='flex justify-between '>
                {nav.map((item, index) => (
                    <Link key={index} href={item.href} className="mr-7 cursor-pointer hover:text-yellow-500 duration-500 hover:translate-y-[-3px]">
                            <span className=" text-sm font-medium">{item.label}</span>

                    </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
                <DarkMode/>
                <Menu/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar