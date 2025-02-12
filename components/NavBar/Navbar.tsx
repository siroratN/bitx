import { Search } from "lucide-react"
import Logo from "./logo"

const Navbar = () => {
  return (
    <nav>
        <div className="container flex justify-between">
            <Logo/>
            <Search/>

            <div>
                <h1>Darkmode</h1>
                <h1>Profile</h1>
            </div>
        </div>
    </nav>
  )
}
export default Navbar