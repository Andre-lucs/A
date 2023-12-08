import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { OccurrencesPreview } from "./components/OccurrencesPreview";
import { DashboardOverview } from "./components/DashboardOverview";

export function DashboardLayout () {
    return  (
        <div className="w-full bg-slate-100" id="cy-dashboard">
          <main className=" h-screen flex flex-col items-center gap-5 pt-5 pl-2 ">
            <Navbar/>
             <div className="flex gap-2 w-full">
              <div>
                  <OccurrencesPreview/>
                   <DashboardOverview/>
               </div>
               <Outlet/>
             </div>
          </main>
        </div>
    )
}