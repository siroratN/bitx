import { ThemeProvider } from "./theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Providers = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        {children}
        <Toaster />
        <ToastContainer />
    </ThemeProvider>
    </>
  )
}
export default Providers