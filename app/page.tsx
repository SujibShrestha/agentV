export const dynamic = "force-dynamic";


import CompanionCards from '@/components/CompanionCards'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'


const Page = async() => {
  const companions = await getAllCompanions({limit:4})
  const recentSessions = await getRecentSessions(10);
  return (
    <main>
    <h1 className='text-2xl underline'>Popular Companions</h1>
    <section className='home-section'>
{companions.map((companion)=>(
  <CompanionCards
  key={companion.id}
  id={companion.id} 
  name={companion.name}
  topic={companion.topic}
  subject={companion.subject}
  color={getSubjectColor(companion.subject)}
  duration={companion.duration}
/>
))}

     
    
    </section>
    <section className='home-section'>
      <CompanionList
       title="Recently Completed Sessions"
      companions={recentSessions}
      className="w-fit max-lg:w-full"
      />
      <CTA/>
    </section>
    </main>
  )
}

export default Page