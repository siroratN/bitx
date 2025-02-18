
import { DarkMode } from "./DarkMode"
import Menu from "./Menu"

const Navbar = () => {
  return (
    <nav className='bg-black backdrop-blur-sm'>
        <div className="container flex justify-between items-center py-4">
            <div className='flex items-center text-white font-semibold text-lg'>
              <p>BitX</p>
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