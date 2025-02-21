
import { DarkMode } from "./DarkMode"
import Menu from "./Menu"
import Link from 'next/link';

const nav = [
  { label: "Market", href: '/'},
  { label: "Portfolio", href: '/portfolio' },
  { label: "My Wallet", href: '/mywallet' }
];


const Navbar = () => {
  return (
    <nav className='shadow-sm'>
        <div className="container flex justify-between items-center py-4">
            <div className='flex items-center gap-20  font-semibold text-lg '>
              <p >BitX</p>
              <div className='flex justify-between '>
                {nav.map((item, index) => (
                    <Link key={index} href={item.href} className="mr-7">
                            <span className=" text-sm text-[#828997]">{item.label}</span>
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