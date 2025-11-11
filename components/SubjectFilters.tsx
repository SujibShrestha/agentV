"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const SubjectFilters = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("subject") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const isInitialRender = useRef(true);

  // ✅ Only update URL when user changes value manually
  useEffect(() => {
    // Skip running on first render (to prevent feedback loop)
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: searchQuery,
        });
        router.replace(newUrl, { scroll: false }); // ✅ use replace to prevent history spam
      } else if (pathname === "/companions") {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });
        router.replace(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]); 

  return (
    <Select
      value={searchQuery}
      onValueChange={(value) => setSearchQuery(value)}
    >
      <SelectTrigger className="relative border border-black items-center rounded-lg flex gap-2 px-2 py-1 h-fit w-[180px]">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject} className="capitalize">
              {subject}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubjectFilters;
