
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
    <nav className='bg-black bg-opacity-97 backdrop-blur-sm'>
        <div className="container flex justify-between items-center py-4">
            <div className='flex items-center gap-20 text-white font-semibold text-lg'>
              <p>BitX</p>
              <div className='flex justify-between'>
                {nav.map((item, index) => (
                    <Link key={index} href={item.href} className="mr-7">
                            <span className="text-gray-300 text-sm">{item.label}</span>
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