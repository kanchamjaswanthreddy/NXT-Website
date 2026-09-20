'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    name: 'Makeshwar Yadav',
    role: 'Financial Director',
    image: '/images/testimonials/makeshwar-yadav.png',
    quote: 'I have been in the financial services industry long enough to know the difference between a company that talks about agent success and one that actually builds systems around it. NXT is the latter. From the moment I joined, I had access to real training, carrier support, and a leadership team that is genuinely invested in my growth.',
  },
  {
    name: 'Pankaj Mandal',
    role: 'Financial Director',
    image: '/images/testimonials/pankaj-mandal.png',
    quote: 'What drew me to NXT was the culture of ownership. This is not a place where you are just selling someone else\'s product — you are building something that belongs to you. The back-office platform, the training resources, and the support from leadership have made it possible for me to serve my clients at the highest level while also growing a team I am genuinely proud of.',
  },
  {
    name: 'Dipendra Thakur',
    role: 'Financial Director',
    image: '/images/testimonials/dipendra-thakur.png',
    quote: 'Joining NXT was one of the most important professional decisions I have made. The structure here is different — you are never left to figure things out alone. From licensing preparation to carrier appointments to building your book of business, there is a clear path and people who will walk it with you.',
  },
  {
    name: 'Bimlesh Yadav',
    role: 'Client',
    image: '/images/testimonials/bimlesh-yadav.png',
    quote: 'I never thought about life insurance seriously until I sat down with my NXT advisor. The conversation was not about selling me something — it was about understanding what I actually needed to protect my family. By the end, I had a plan that fit my budget and gave me real peace of mind.',
  },
  {
    name: 'Carmelo Aguilar',
    role: 'Client',
    image: '/images/testimonials/carmelo-aguilar.png',
    quote: 'I came to NXT with a lot of questions and some skepticism. I left with a coverage plan I understood completely and a level of confidence I did not expect. My advisor was professional, knowledgeable, and never made me feel like just another sale. NXT truly cares about the people they serve.',
  },
  {
    name: 'Dhwani Mandlia',
    role: 'Client',
    image: '/images/testimonials/dhwani-mandlia.png',
    quote: 'As someone who is careful about every financial decision I make, I did my research before choosing NXT. The advisor I worked with was thorough, transparent, and genuinely interested in finding the right solution for my situation. The entire process was smooth and professional. NXT has earned a client for life.',
  },
  {
    name: 'Andy M. Martinez',
    role: 'Client',
    image: '/images/testimonials/andy-martinez.jpg',
    quote: 'NXT made the process of getting life insurance simple and stress-free. I appreciated that my advisor listened first before recommending anything. The plan I ended up with was exactly what I needed — nothing more, nothing less. That kind of honest guidance is hard to find.',
  },
  {
    name: 'Rigoberto Ayala Rodas',
    role: 'Client',
    image: '/images/team/rigoberto-ayala.png',
    quote: 'I had been putting off getting coverage for years — I did not know where to start or who to trust. A friend referred me to NXT, and from the first call I knew I was in good hands. My advisor was patient, thorough, and made the process completely straightforward. I now have the protection my family deserves.',
  },
  {
    name: 'Ram Shankar Yadav',
    role: 'Financial Director',
    image: null,
    quote: 'NXT understands that financial advisors are entrepreneurs. The independence, the carrier access, the override structure — everything is designed to reward effort and loyalty. At NXT, I finally feel like my ceiling is determined by my own ambition, not by someone else\'s rules.',
  },
  {
    name: 'Madan Thakur',
    role: 'Client',
    image: null,
    quote: 'Working with NXT has been a completely different experience from anything I have had with financial services before. My advisor took the time to explain every option in plain language, answered every question I had, and never made me feel pressured. That kind of respect for the client is rare.',
  },
  {
    name: 'Ashish Sood',
    role: 'Technology & AI Advisor',
    image: '/images/team/ashish-sood.png',
    quote: 'The financial services industry is undergoing a fundamental transformation driven by technology and artificial intelligence — and NXT is positioning itself at the forefront of that shift. NXT is not trying to digitize the old model. They are building the new one.',
  },
  {
    name: 'Nikhil Bhatt',
    role: 'Strategic Compliance Advisor',
    image: '/images/testimonials/nikhil-bhatt.png',
    quote: 'In an industry where regulatory complexity can make or break an organization, NXT stands out for taking compliance seriously from day one. NXT\'s commitment to building a durable, compliant business is something I rarely see at this stage of a company\'s growth.',
  },
  {
    name: 'Sony Pradhan',
    role: 'Client Experience Advisor',
    image: '/images/team/sony-pradhan.png',
    quote: 'The measure of any financial services organization is not just the products it offers — it is how clients feel when they walk away. At NXT, the client experience is built into the DNA of how agents are trained and how the platform operates. Every touchpoint is designed to build trust, clarity, and confidence.',
  },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const t = TESTIMONIALS[idx]
  const hasPrev = idx > 0
  const hasNext = idx < TESTIMONIALS.length - 1

  return (
    <section className="section bg-stone">
      <div className="container max-w-4xl">
        <p className="label-sm mb-5 text-center">Testimonials</p>
        <h2 className="display text-center">What our clients and advisors say.</h2>
        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="card rounded-[24px] p-8 md:p-12"
            >
              <Quote size={36} className="mx-auto mb-6 text-gold/40" />
              <blockquote className="text-center">
                <p className="text-lg leading-relaxed text-ink md:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-8 flex flex-col items-center gap-4">
                  {t.image ? (
                    <div className="relative h-16 w-16 overflow-hidden rounded-full bg-platinum">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white font-display text-xl font-semibold">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <cite className="not-italic text-center">
                    <span className="block font-display text-lg font-semibold text-navy">{t.name}</span>
                    <span className="text-sm text-ink-soft">{t.role}</span>
                  </cite>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="fill-gold text-gold" />
                    ))}
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => setIdx((i) => i - 1)}
              disabled={!hasPrev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-platinum text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-navy"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === idx ? 'w-6 bg-gold' : 'w-2 bg-platinum hover:bg-navy/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((i) => i + 1)}
              disabled={!hasNext}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-platinum text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-navy"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
