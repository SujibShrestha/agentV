"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SubjectFilters = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams() 
    const query = searchParams.get('subject') || ''
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(()=>{
           const delayDebounce = setTimeout(()=>{
               const currentSubject = searchParams.get("subject") || "";
        if(searchQuery){
            const newUrl = formUrlQuery({
            params:searchParams.toString(),
            key:"subject",
            value:searchQuery,
            })
            router.push(newUrl,{scroll:false})
        }else{
            if(pathname === '/companions'){
                 const newUrl = removeKeysFromUrlQuery({
                params:searchParams.toString(),
                keysToRemove:["subject"],
    })
router.push(newUrl,{scroll:false})
}}
 },2000)} ,[searchQuery,router,pathname,searchParams])
  return (
  
        <Select onValueChange={(value) => setSearchQuery(value)}
      defaultValue={searchQuery}>
      <SelectTrigger className="relative border border-black items-center rounded-lg flex gap-2 px-2 py-1 h-fit w-[180px]">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          {subjects.map((subject)=>(
            <SelectItem key={subject} value={subject} className="capitalize">
              {subject} 
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
        
       
  )
}

export default SubjectFilters