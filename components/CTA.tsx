import Image from "next/image"
import Link from "next/link"

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start Learning Your Way.</div>
      <h2 className="text-3xl font-bold ">
        Build personalized lessons with AI companions tailored to your
        learning style.
      </h2>
      <p>Pick a name, voice and subject, and let the learning begin!
      </p>
      <Image src="/images/cta.svg" alt="CTA Image" width={362} height={232} />
      <button className="btn-primary">
        <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
        <Link href="/companions/new">Create Your Companion</Link>
      </button>
    </section>
  )
}

export default CTA