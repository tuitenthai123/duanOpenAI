"use client";

import Sidebar from "./sidebar";
import { Button } from "./ui/button";
import { Menu} from "lucide-react";
import { Sheet,SheetTrigger,SheetContent } from "./ui/sheet";
import { useEffect, useState } from "react";



const MobileSidebar = () => {
    const [isMounted,setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null;
    }

    return(
        <Sheet>
            <SheetTrigger>
                <Button variant={"ghost"} size={"icon"} className="md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar/>
            </SheetContent>
        </Sheet>

    )
}
export default MobileSidebar