export interface Agent {
  name: string
  rank: string
  city: string
  state: string
  phone: string
  email: string
  image: string | null
}

export const agents: Agent[] = [
  { name: 'Nikhil Bhatt', rank: 'Senior Financial Director & Share Holder', city: 'Nashua', state: 'New Hampshire', phone: '(603) 521-5877', email: 'nikhilnxtfinancialgroup@gmail.com', image: '/images/team/nikhil-bhatt.png' },
  { name: 'Gita Thakur', rank: 'Senior Financial Director & Share Holder', city: 'Everett', state: 'Massachusetts', phone: '(339) 241-9074', email: 'gitanxtfinancialgroup@gmail.com', image: '/images/gita-thakur.jpg' },
  { name: 'Ram Shankar Yadav', rank: 'Financial Director & Share Holder', city: 'Austin', state: 'Texas', phone: '(737) 342-5042', email: 'ramshankarnxtfinancialgroup@gmail.com', image: '/images/agents/ram-shankar.jpeg' },
  { name: 'Dipendra Kumar Thakur', rank: 'Financial Director & Share Holder', city: 'Richmond', state: 'California', phone: '(510) 978-3891', email: 'dipendranxtfinancialgroup@gmail.com', image: '/images/agents/dipendra-thakur.png' },
  { name: 'Bimlesh Yadav (Marco Yadav)', rank: 'Financial Director & Share Holder', city: 'Pinole', state: 'California', phone: '(341) 247-3838', email: 'byadavnxtfinancialgroup@gmail.com', image: '/images/agents/marco-yadav.jpg' },
  { name: 'Pankaj Prakash Mandal', rank: 'Financial Director & Share Holder', city: 'Arlington', state: 'Massachusetts', phone: '(781) 518-3554', email: 'pankajnxtfinancialgroup@gmail.com', image: '/images/agents/pankaj-mandal.png' },
  { name: 'Bimlesh Kumar Yadav', rank: 'Financial Director & Share Holder', city: 'Pinole', state: 'California', phone: '(510) 804-9596', email: 'bimleshnxtfinancialgroup@gmail.com', image: '/images/agents/bimlesh-yadav.png' },
  { name: 'Carmelo Aguilar', rank: 'Senior Financial Associate', city: 'Peabody', state: 'Massachusetts', phone: '(857) 294-2204', email: 'carmelonxtfinancialgroup@gmail.com', image: '/images/agents/carmelo-aguilar.png' },
  { name: 'Makeshwar Yadav', rank: 'Financial Director & Share Holder', city: 'Worcester', state: 'Texas', phone: '(512) 521-8817', email: 'makeshwarnxtfinancialgroup@gmail.com', image: '/images/agents/makeshwar-yadav.png' },
  { name: 'Rigoberto Antonio Ayala Rodas', rank: 'Financial Director & Share Holder', city: 'Everett', state: 'Massachusetts', phone: '(617) 331-4093', email: 'rigonxtfinancialgroup@gmail.com', image: '/images/team/rigoberto-ayala.png' },
  { name: 'Dhwani Mandlia', rank: 'Senior Financial Associate', city: 'Brockton', state: 'Massachusetts', phone: '(215) 964-3460', email: 'dhwaninxtfinancialgroup@gmail.com', image: '/images/agents/dhwani-mandlia.png' },
  { name: 'Chintan Atulbhai Shah', rank: 'Financial Associate', city: 'Sayreville', state: 'New Jersey', phone: '(973) 572-2963', email: 'chintannxtfinancialgroup@gmail.com', image: '/images/agents/chintan-shah.png' },
  { name: 'Maira Elisabeth Ochoa Umana', rank: 'Financial Associate', city: 'Revere', state: 'Massachusetts', phone: '(617) 953-8118', email: 'mairanxtfinancialgroup@gmail.com', image: '/images/agents/maira-ochoa.png' },
  { name: 'Josue Araujo', rank: 'Financial Associate', city: 'Malden', state: 'Massachusetts', phone: '(781) 333-0908', email: 'josuenxtfinancialgroup@gmail.com', image: '/images/agents/josue-araujo.png' },
  { name: 'Vivek Daruka', rank: 'Financial Associate', city: 'Worcester', state: 'Massachusetts', phone: '(318) 789-4199', email: 'viveknxtfinancialgroup@gmail.com', image: null },
  { name: 'Andy M Martinez', rank: 'Financial Associate', city: 'Lynn', state: 'Massachusetts', phone: '(857) 261-5938', email: 'andynxtfinancialgroup@gmail.com', image: '/images/agents/andy-martinez.jpg' },
]

export function getAgentsByState(): Record<string, Agent[]> {
  const grouped: Record<string, Agent[]> = {}
  for (const agent of agents) {
    if (!grouped[agent.state]) {
      grouped[agent.state] = []
    }
    grouped[agent.state].push(agent)
  }
  const sorted: Record<string, Agent[]> = {}
  for (const state of Object.keys(grouped).sort()) {
    sorted[state] = grouped[state]
  }
  return sorted
}
