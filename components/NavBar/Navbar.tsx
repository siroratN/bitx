import { DarkMode } from "./DarkMode"
import Menu from "./Menu"
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const nav = [
  { label: "Markets", href: '/' },
  { label: "Assets", href: '/assets' },
  { label: "Activity", href: '/' }
];

const Navbar = () => {
  return (
    <nav className="shadow-sm bg-[#fafafa] dark:bg-[#0c0b0b]">
      <div className="mx-[30px] flex justify-between items-center py-[13px] px-[20px]">
        <div className='flex items-center gap-20 font-semibold text-lg'>
          <p className="mr-2 font-medium text-[rgb(255,90,90)]">BitX</p>
          <div className='flex justify-between'>
            {nav.map((item, index) => (
              <div key={index}>
                {item.label === 'Activity' ? (
                  <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                      <span className="mr-7 text-sm font-medium cursor-pointer hover:text-yellow-500 duration-500 hover:translate-y-[-3px] ">
                        {item.label}
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel ><p className="text-sm font-medium text-gray-800 dark:text-white">{item.label}</p></DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/favorites">
                          <p className="text-sm font-medium text-gray-500 dark:text-white">Favorites</p>
                        </Link>
                      </DropdownMenuItem>                      
                      <DropdownMenuItem>
                        <Link href="/transaction">
                          <p className="text-sm font-medium text-gray-500 dark:text-white">Transactions</p>
                        </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href={item.href} className="mr-7 cursor-pointer hover:text-yellow-500 duration-500 hover:translate-y-[-3px]">
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DarkMode />
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
