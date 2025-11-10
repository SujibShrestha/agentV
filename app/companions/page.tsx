import CompanionCards from '@/components/CompanionCards'
import SearchInput from '@/components/SearchInput'
import SubjectFilters from '@/components/SubjectFilters'
import { getAllCompanions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'

const Companions = async({searchParams}:SearchParams) => {
   const filters = await searchParams
   const subject = filters.subject? filters.subject : ''
   const topic = filters.topic? filters.topic : ''

   const companions = await getAllCompanions({subject, topic})



  return (
   <main>
    <section className='flex justify-between gap-4 max-sm:flex-col'>
    <h1>Companion Library</h1>
    <div className='flex gap-4'>
      <SubjectFilters />
      <SearchInput />
    </div>
    </section>
    <section className='companions-grid'>
    {companions.map((companion)=>(
      <CompanionCards key={companion.id}{...companion} color={getSubjectColor(companion.subject)} />
    ))}
    </section>
   </main>
  )
}

export default Companions