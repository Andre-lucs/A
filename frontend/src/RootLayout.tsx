import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";



export function RootLayout () {
    return  (
        <div className="w-full">
          <main className=" h-screen flex flex-col items-center gap-5 pt-5 ">
            <Navbar/>
             <Outlet/>
          </main>
        </div>
    )
}