export interface TeamMember {
  name: string
  role: string
  image: string
  group: 'leadership' | 'advisors'
}

export const team: TeamMember[] = [
  // Executive Leadership
  { name: 'Shiv Thakur', role: 'Founder & CEO', image: '/images/team/shiv-thakur.jpg', group: 'leadership' },
  { name: 'Sony Pradhan', role: 'Chief Growth Officer', image: '/images/team/sony-pradhan.jpeg', group: 'leadership' },
  { name: 'Sandeep Charaya', role: 'Chief Technology Officer', image: '/images/team/sandeep-charaya.png', group: 'leadership' },
  { name: 'Ashish Sood', role: 'Chief Financial Officer', image: '/images/team/ashish-sood.png', group: 'leadership' },
  { name: 'James R. Vigeant', role: 'Chief Strategy & Innovation Officer', image: '/images/team/james-vigeant.jpeg', group: 'leadership' },
  { name: 'Wilfredo Munguia', role: 'Director of Technology', image: '/images/team/wilfredo-munguia.jpeg', group: 'leadership' },
  { name: 'Joe Sabourin', role: 'Senior Partner', image: '/images/team/joe-sabourin.jpg', group: 'leadership' },
  { name: 'Marsha Jones', role: 'Director of Administration', image: '/images/team/marsha-jones.jpeg', group: 'leadership' },
  { name: 'Jaswanth Reddy Kancham', role: 'VP of Agent Training & Development', image: '/images/team/jaswanth-reddy.png', group: 'leadership' },
  { name: 'Naresh Gajula', role: 'Director of Commissions', image: '/images/team/naresh-gajula.jpeg', group: 'leadership' },
  { name: 'Rigoberto Ayala', role: 'Director, Business Development', image: '/images/team/rigoberto-ayala.png', group: 'leadership' },
  { name: 'Carmelo Aguilar', role: 'Senior Staff Accountant', image: '/images/team/carmelo-aguilar.png', group: 'leadership' },
  { name: 'Gita Thakur', role: 'Director of Events Operations', image: '/images/team/gita-thakur.jpg', group: 'leadership' },
  { name: 'Samyak Jain', role: 'Director of Risk & Analytics', image: '/images/team/samyak-jain.jpeg', group: 'leadership' },
  { name: 'Uday Chaudhary', role: 'Director of Marketing', image: '/images/team/uday-chaudhary.png', group: 'leadership' },
]

export const leadership = team.filter((m) => m.group === 'leadership')
export const advisors = team.filter((m) => m.group === 'advisors')
