"use client"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";


const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams() 
    const query = searchParams.get('topic') || ''
    const [searchQuery, setSearchQuery] = useState("")


    useEffect(()=>{
        const delayDebounce = setTimeout(()=>{
            
        if(searchQuery){
            const newUrl = formUrlQuery({
            params:searchParams.toString(),
            key:"topic",
            value:searchQuery,
            })

            router.push(newUrl,{scroll:false})
        }else{
            if(pathname === '/companions'){
                 const newUrl = removeKeysFromUrlQuery({
                params:searchParams.toString(),
                keysToRemove:["topic"],
            })
        
            router.push(newUrl,{scroll:false})
    }
    }},2000)
    },[searchQuery,router,pathname,searchParams])

  return (
   <div className="relative border border-black items-center rounded-lg flex gap-2 px-2 py-1 h-fit">
    <Image src="/icons/search.svg" alt="search" width={16} height={16} />
    <input type="text" placeholder="Search..." className="outline-none " value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
   </div>
  )
}

export default SearchInput