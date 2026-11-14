export interface TeamMember {
  name: string
  role: string
  image: string
  group: 'leadership' | 'advisors'
  link?: string
}

export const team: TeamMember[] = [
  // Executive Leadership
  { name: 'Shiv Thakur', role: 'Founder & CEO', image: '/images/team/shiv-thakur.jpg', group: 'leadership', link: '/nxt-life/shiv-thakur-founder-story' },
  { name: 'Sony Pradhan', role: 'Chief Growth Officer', image: '/images/team/sony-pradhan.jpeg', group: 'leadership', link: '/nxt-life/sony-pradhan-joins-nxt-as-cgo' },
  { name: 'Sandeep Charaya', role: 'Chief Technology Officer', image: '/images/team/sandeep-charaya.png', group: 'leadership', link: '/nxt-life/sandeep-charaya-joins-nxt-as-cto' },
  { name: 'Ashish Sood', role: 'Chief Financial Officer', image: '/images/team/ashish-sood.png', group: 'leadership', link: '/nxt-life/ashish-sood-joins-nxt-as-cfo' },
  { name: 'James R. Vigeant', role: 'Chief Strategy & Innovation Officer', image: '/images/team/james-vigeant.jpeg', group: 'leadership', link: '/nxt-life/james-vigeant-joins-nxt-as-csio' },
  { name: 'Rigoberto Ayala', role: 'Vice President of Sales', image: '/images/team/rigoberto-ayala.png', group: 'leadership', link: '/nxt-life/rigoberto-ayala-rodas-joins-nxt-as-vp-sales' },
  { name: 'Alana Malla', role: 'Vice President of Agent Development', image: '/images/agents/alana-malla.jpeg', group: 'leadership', link: '/nxt-life/alana-malla-joins-nxt-as-vp-agent-development' },
  { name: 'Minakshi Rajbanshi', role: 'Vice President of Marketing', image: '/images/agents/minakshi-rajbanshi.jpeg', group: 'leadership', link: '/nxt-life/minakshi-rajbanshi-joins-nxt-as-licensed-insurance-advisor' },
  { name: 'Jaswanth Reddy Kancham', role: 'VP of Technology Innovation', image: '/images/team/jaswanth-reddy.png', group: 'leadership' },
  { name: 'Joe Sabourin', role: 'Senior Partner', image: '/images/team/joe-sabourin.jpg', group: 'leadership' },
  { name: 'Marsha Jones', role: 'Director of Administration', image: '/images/team/marsha-jones.jpeg', group: 'leadership' },
  { name: 'Wilfredo Munguia', role: 'Director of Technology', image: '/images/team/wilfredo-munguia.jpeg', group: 'leadership' },
  { name: 'Carmelo Aguilar', role: 'Senior Staff Accountant', image: '/images/team/carmelo-aguilar.png', group: 'leadership' },
  { name: 'Samyak Jain', role: 'Director of Risk & Analytics', image: '/images/team/samyak-jain.jpeg', group: 'leadership' },
  { name: 'Naresh Gajula', role: 'Director of Commissions', image: '/images/team/naresh-gajula.jpeg', group: 'leadership' },
  { name: 'Uday Chaudhary', role: 'Director of Marketing', image: '/images/team/uday-chaudhary.jpeg', group: 'leadership' },
  { name: 'Gita Thakur', role: 'Director of Events Operations', image: '/images/team/gita-thakur.jpeg', group: 'leadership' },
]

export const leadership = team.filter((m) => m.group === 'leadership')
export const advisors = team.filter((m) => m.group === 'advisors')
