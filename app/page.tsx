import CompanionCards from '@/components/CompanionCards'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'


const Page = () => {
  return (
    <main>
    <h1 className='text-2xl underline'>Popular Companions</h1>
    <section className='home-section'>
      <CompanionCards
       id="123" 
      name="Neura The Brainy Expert"
      topic="Neural Networks"
      subject="Science"
      color="#ffda6e"
      duration={30}
      />
      <CompanionCards
       id="456" 
      name="Codey The Coding Guru"
      topic="Programming"
      subject="Computer Science"
      color="#e5d0ff"
      duration={45} />
      <CompanionCards 
       id="789" 
      name="Histy The History Buff"
      topic="World History"
      subject="History"
      color="#a0e7e5"
      duration={50}/>
    </section>
    <section className='home-section'>
      <CompanionList
       title="Recently Completed Sessions"
      companions={recentSessions}
      className="w-2/3 max-lg:w-full"
      />
      <CTA/>
    </section>
    </main>
  )
}

export default Page