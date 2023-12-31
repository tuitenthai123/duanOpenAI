"use client"

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import * as apis from '../../api/xulyapi'
import { useEffect } from "react";
import { Dispatch } from "react";
import { useState } from "react";



const DashBoardLayout = ({children}: {children: React.ReactNode;}) => {
    
// const[playlistData, setPlaylistData] = useState({})

// useEffect(() => {
    
//     const fetchDetailPlaylist = async ()=>{
//       const response = await apis.getHome()
//       }
//     fetchDetailPlaylist()
//   },[])


    return(
        <div className="relative h-full">
            <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <div>
                   <Sidebar/>
                </div>
            </div>
            <main className="md:pl-72">
                <Navbar/>
                {children}
            </main>
        </div>
    )
}
export default DashBoardLayout