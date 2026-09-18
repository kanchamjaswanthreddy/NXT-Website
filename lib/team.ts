export interface TeamMember {
  name: string
  role: string
  image: string
  group: 'leadership' | 'team' | 'advisors'
}

export const team: TeamMember[] = [
  // Leadership
  { name: 'Shiv Thakur', role: 'Founder & CEO', image: '/images/team/shiv-thakur.jpg', group: 'leadership' },
  { name: 'Sandeep Charaya', role: 'Chief Information Officer', image: '/images/team/sandeep-charaya.png', group: 'leadership' },
  { name: 'Rochelle Whalen', role: 'Senior Life Expert Partner', image: '/images/team/rochelle-whalen.png', group: 'leadership' },
  { name: 'Nick Marcello', role: 'Senior Annuity Expert Partner', image: '/images/team/nick-marcello.png', group: 'leadership' },
  { name: 'Alecia Barnette', role: 'Senior Care Planning Expert Partner', image: '/images/team/alecia-barnette.png', group: 'leadership' },

  // Team
  { name: 'Jaswanth Reddy', role: 'Chief Technology Officer', image: '/images/team/jaswanth-reddy.png', group: 'team' },
  { name: 'Prabhakar Elavala', role: 'Chief Digital & AI Officer', image: '/images/team/prabhakar-elavala.jpg', group: 'team' },
  { name: 'Andrew Barnett', role: 'Senior Technology Partner', image: '/images/team/andrew-barnett.png', group: 'team' },
  { name: 'Minakshi Rajbanshi', role: 'Chief Strategy Officer', image: '/images/team/minakshi-rajbanshi.png', group: 'team' },
  { name: 'Rigoberto Ayala Rodas', role: 'Director of Business Development', image: '/images/team/rigoberto-ayala.png', group: 'team' },
  { name: 'Uday Chaudhary', role: 'Head of Marketing', image: '/images/team/uday-chaudhary.png', group: 'team' },
  { name: 'Gita Thakur', role: 'Sales Account Manager', image: '/images/gita-thakur.jpg', group: 'team' },

  // Advisors
  { name: 'Matt Earhart', role: 'Strategic Industry Advisor', image: '/images/team/matt-earhart.png', group: 'advisors' },
  { name: 'Ashish Sood', role: 'Technology & AI Advisor', image: '/images/team/ashish-sood.png', group: 'advisors' },
  { name: 'Nikhil Bhatt', role: 'Strategic Compliance Advisor', image: '/images/team/nikhil-bhatt.png', group: 'advisors' },
  { name: 'Sony Pradhan', role: 'Client Experience Advisor', image: '/images/team/sony-pradhan.png', group: 'advisors' },
]

export const leadership = team.filter((m) => m.group === 'leadership')
export const coreTeam = team.filter((m) => m.group === 'team')
export const advisors = team.filter((m) => m.group === 'advisors')
