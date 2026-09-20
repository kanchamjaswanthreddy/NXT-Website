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
  { name: 'Gulshan K Gulati', rank: 'Senior Financial Director', city: 'Iselin', state: 'New Jersey', phone: '(732) 789-9390', email: 'gulshannxtfinancialgroup@gmail.com', image: '/images/agents/gulshan-gulati.png' },
  { name: 'Chintan Atulbhai Shah', rank: 'Financial Associate', city: 'Sayreville', state: 'New Jersey', phone: '(973) 572-2963', email: 'chintannxtfinancialgroup@gmail.com', image: '/images/agents/chintan-shah.png' },
  { name: 'Madhuri Kumari Mandal', rank: 'Senior Financial Associate', city: 'Arlington', state: 'Massachusetts', phone: '(339) 223-8832', email: 'madhurinxtfinancialgroup@gmail.com', image: '/images/agents/madhuri-mandal.png' },
  { name: 'Rajesh Thapa', rank: 'Financial Associate', city: 'Revere', state: 'Massachusetts', phone: '(857) 600-8488', email: 'rajeshnxtfinancialgroup@gmail.com', image: '/images/agents/rajesh-thapa.jpg' },
  { name: 'Robins Kumar Yadav', rank: 'Financial Associate', city: 'Houston', state: 'Texas', phone: '(757) 831-8753', email: 'robinsnxtfinancialgroup@gmail.com', image: '/images/agents/robins-yadav.jpg' },
  { name: 'Laxman Paudel', rank: 'Financial Associate', city: 'Garner', state: 'North Carolina', phone: '(714) 616-7169', email: 'laxmannxtfinancialgroup@gmail.com', image: '/images/agents/laxman-paudel.jpg' },
  { name: 'Ram Shankar Yadav', rank: 'Senior Financial Director', city: 'Austin', state: 'Texas', phone: '(737) 342-5042', email: 'ramshankarnxtfinancialgroup@gmail.com', image: null },
  { name: 'Dipendra Kumar Thakur', rank: 'Senior Financial Director', city: 'Richmond', state: 'California', phone: '(510) 978-3891', email: 'dipendranxtfinancialgroup@gmail.com', image: '/images/agents/dipendra-thakur.png' },
  { name: 'Marco Yadav', rank: 'Senior Financial Director', city: 'Pinole', state: 'California', phone: '(341) 247-3838', email: 'byadavnxtfinancialgroup@gmail.com', image: '/images/agents/marco-yadav.jpg' },
  { name: 'Bimlesh Kumar Yadav', rank: 'Senior Financial Director', city: 'Pinole', state: 'California', phone: '(510) 804-9596', email: 'bimleshnxtfinancialgroup@gmail.com', image: '/images/agents/bimlesh-yadav.png' },
  { name: 'Garrett Benjamin Weinstein', rank: 'Financial Associate', city: 'Lynn', state: 'Massachusetts', phone: '(617) 784-5866', email: 'garrettnxtfinancialgroup@gmail.com', image: '/images/agents/garrett-weinstein.png' },
  { name: 'Maira Elisabeth Ochoa Umana', rank: 'Financial Associate', city: 'Revere', state: 'Massachusetts', phone: '(617) 953-8118', email: 'mairanxtfinancialgroup@gmail.com', image: '/images/agents/maira-ochoa.png' },
  { name: 'Pankaj Prakash Mandal', rank: 'Senior Financial Director', city: 'Arlington', state: 'Massachusetts', phone: '(781) 518-3554', email: 'pankajnxtfinancialgroup@gmail.com', image: '/images/agents/pankaj-mandal.png' },
  { name: 'Aldryn David Tangui', rank: 'Financial Associate', city: 'Foxboro', state: 'Massachusetts', phone: '(774) 219-3895', email: 'aldrynnxtfinancialgroup@gmail.com', image: '/images/agents/aldryn-tangui.png' },
  { name: 'Dhwani Mandlia', rank: 'Senior Financial Associate', city: 'Brockton', state: 'Massachusetts', phone: '(215) 964-3460', email: 'dhwaninxtfinancialgroup@gmail.com', image: '/images/agents/dhwani-mandlia.png' },
  { name: 'Josue Araujo', rank: 'Financial Associate', city: 'Malden', state: 'Massachusetts', phone: '(781) 333-0908', email: 'josuenxtfinancialgroup@gmail.com', image: '/images/agents/josue-araujo.png' },
  { name: 'Md Sultan Mahmud Sifat', rank: 'Senior Financial Associate', city: 'Chelsea', state: 'Massachusetts', phone: '(857) 928-8573', email: 'sultannxtfinancialgroup@gmail.com', image: '/images/agents/sultan-sifat.jpg' },
  { name: 'Nikhil Bhatt', rank: 'Senior Financial Director', city: 'Nashua', state: 'New Hampshire', phone: '(603) 521-5877', email: 'nikhilnxtfinancialgroup@gmail.com', image: '/images/team/nikhil-bhatt.png' },
  { name: 'Vivek Daruka', rank: 'Financial Associate', city: 'Worcester', state: 'Massachusetts', phone: '(318) 789-4199', email: 'viveknxtfinancialgroup@gmail.com', image: null },
  { name: 'Andy M Martinez', rank: 'Financial Associate', city: 'Lynn', state: 'Massachusetts', phone: '(857) 261-5938', email: 'andynxtfinancialgroup@gmail.com', image: '/images/agents/andy-martinez.jpg' },
  { name: 'Makeshwar Yadav', rank: 'Senior Financial Director', city: 'Worcester', state: 'Massachusetts', phone: '(512) 521-8817', email: 'makeshwarnxtfinancialgroup@gmail.com', image: '/images/agents/makeshwar-yadav.png' },
  { name: 'Gita Thakur', rank: 'Senior Financial Director', city: 'Everett', state: 'Massachusetts', phone: '(339) 241-9074', email: 'gitanxtfinancialgroup@gmail.com', image: '/images/gita-thakur.jpg' },
  { name: 'Rigoberto Antonio Ayala Rodas', rank: 'Financial Director', city: 'Everett', state: 'Massachusetts', phone: '(617) 331-4093', email: 'rigonxtfinancialgroup@gmail.com', image: '/images/team/rigoberto-ayala.png' },
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
