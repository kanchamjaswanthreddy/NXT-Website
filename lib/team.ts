export interface TeamMember {
  name: string
  role: string
  image: string
  /** executive: the executive team; senior: the senior leadership team */
  group: 'executive' | 'senior' | 'advisors'
  link?: string
}

export const team: TeamMember[] = [
  // Executive Team
  { name: 'Shiv Thakur', role: 'Founder & CEO', image: '/images/team/shiv-thakur.jpg', group: 'executive', link: '/nxt-life/shiv-thakur-founder-story' },
  { name: 'James R. Vigeant', role: 'Chief Strategy & Innovation Officer', image: '/images/team/james-vigeant.jpeg', group: 'executive', link: '/nxt-life/james-vigeant-joins-nxt-as-csio' },
  { name: 'Ashish Sood', role: 'Chief Financial Officer', image: '/images/team/ashish-sood.png', group: 'executive', link: '/nxt-life/ashish-sood-joins-nxt-as-cfo' },
  { name: 'Sandeep Charaya', role: 'Chief Technology Officer', image: '/images/team/sandeep-charaya.png', group: 'executive', link: '/nxt-life/sandeep-charaya-joins-nxt-as-cto' },
  { name: 'Sony Pradhan', role: 'Chief Growth Officer', image: '/images/team/sony-pradhan.jpeg', group: 'executive', link: '/nxt-life/sony-pradhan-joins-nxt-as-cgo' },
  { name: 'Rick Akatyszewski', role: 'Senior Executive Partner', image: '/images/team/rick-akatyszewski.jpeg', group: 'executive' },
  { name: 'Shelly Akatyszewski', role: 'Senior Executive Partner', image: '/images/team/shelly-akatyszewski.jpeg', group: 'executive' },
  // Senior Leadership
  { name: 'Rigoberto Ayala', role: 'Vice President of Sales', image: '/images/team/rigoberto-ayala.png', group: 'senior', link: '/nxt-life/rigoberto-ayala-rodas-joins-nxt-as-vp-sales' },
  { name: 'Alana Malla', role: 'Vice President of Agent Development', image: '/images/agents/alana-malla.jpeg', group: 'senior', link: '/nxt-life/alana-malla-joins-nxt-as-vp-agent-development' },
  { name: 'Minakshi Rajbanshi', role: 'Vice President of Marketing', image: '/images/agents/minakshi-rajbanshi.jpeg', group: 'senior', link: '/nxt-life/minakshi-rajbanshi-joins-nxt-as-licensed-insurance-advisor' },
  { name: 'Jaswanth Reddy Kancham', role: 'VP of Technology Innovation', image: '/images/team/jaswanth-reddy.png', group: 'senior' },
  { name: 'Marsha Jones', role: 'Director of Commissions', image: '/images/team/marsha-jones.jpeg', group: 'senior' },
  { name: 'Gama Altidor', role: 'Director of Agent Success', image: '/images/agents/gama-altidor.jpeg', group: 'senior' },
  { name: 'Arbin Poudel', role: 'Director of Agent Development & Experience', image: '/images/agents/arbin-poudel.jpeg', group: 'senior' },
  { name: 'Wilfredo Munguia', role: 'Director of Technology', image: '/images/team/wilfredo-munguia.jpeg', group: 'senior' },
  { name: 'Carmelo Aguilar', role: 'Senior Staff Accountant', image: '/images/team/carmelo-aguilar.png', group: 'senior' },
  { name: 'Gita Thakur', role: 'Director of Events Operations', image: '/images/team/gita-thakur.jpeg', group: 'senior' },
]

export const executive = team.filter((m) => m.group === 'executive')
export const seniorLeadership = team.filter((m) => m.group === 'senior')
export const leadership = [...executive, ...seniorLeadership]
export const advisors = team.filter((m) => m.group === 'advisors')
