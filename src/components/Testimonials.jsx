import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO at Vercel',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    quote: 'Alex shipped our dashboard redesign 2 weeks ahead of schedule. The attention to animation detail and performance optimization was exceptional.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Lead at Stripe',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    quote: 'Working with Alex was a game-changer. Our conversion funnel improved by 40% after the checkout flow redesign. Truly world-class engineering.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Design Director at Figma',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    quote: 'Rare to find someone who can translate complex design systems into pixel-perfect, accessible code. Alex is that rare talent.',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.testimonials-header > *', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.testimonial-card', {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="testimonials" ref={sectionRef} className="py-28 md:py-40 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="testimonials-header text-center mb-20">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-4">
            What People Say
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Feedback from leaders at companies where I have shipped production code.
          </p>
        </div>

        <div className="testimonials-grid grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card p-8 rounded-[2rem] glass-card hover:border-primary/40 transition-all duration-500 relative"
            >
              <Quote size={32} className="text-primary/20 mb-6" />
              <p className="text-text-muted text-sm leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                  loading="lazy"
                />
                <div>
                  <p className="text-text font-semibold text-sm">{t.name}</p>
                  <p className="text-text-muted text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
