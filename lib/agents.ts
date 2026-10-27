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
  { name: 'Gita Thakur', rank: 'Director of Events Operations', city: 'Everett', state: 'Massachusetts', phone: '(339) 241-9074', email: 'gitanxtfinancialgroup@gmail.com', image: '/images/gita-thakur.jpg' },
  { name: 'Ram Shankar Yadav', rank: 'Financial Director', city: 'Austin', state: 'Texas', phone: '(737) 342-5042', email: 'ramshankarnxtfinancialgroup@gmail.com', image: '/images/agents/ram-shankar.jpeg' },
  { name: 'Dipendra Kumar Thakur', rank: 'Financial Director', city: 'Richmond', state: 'California', phone: '(510) 978-3891', email: 'dipendranxtfinancialgroup@gmail.com', image: '/images/agents/dipendra-thakur.png' },
  { name: 'Bimlesh Yadav (Marco Yadav)', rank: 'Financial Director', city: 'Pinole', state: 'California', phone: '(341) 247-3838', email: 'byadavnxtfinancialgroup@gmail.com', image: '/images/agents/marco-yadav.jpg' },
  { name: 'Pankaj Prakash Mandal', rank: 'Financial Director', city: 'Arlington', state: 'Massachusetts', phone: '(781) 518-3554', email: 'pankajnxtfinancialgroup@gmail.com', image: '/images/agents/pankaj-mandal.png' },
  { name: 'Bimlesh Kumar Yadav', rank: 'Financial Director', city: 'Pinole', state: 'California', phone: '(510) 804-9596', email: 'bimleshnxtfinancialgroup@gmail.com', image: '/images/agents/bimlesh-yadav.png' },
  { name: 'Carmelo Aguilar', rank: 'Senior Staff Accountant', city: 'Peabody', state: 'Massachusetts', phone: '(857) 294-2204', email: 'carmelonxtfinancialgroup@gmail.com', image: '/images/agents/carmelo-aguilar.png' },
  { name: 'Makeshwar Yadav', rank: 'Financial Director', city: 'Austin', state: 'Texas', phone: '(512) 521-8817', email: 'makeshwarnxtfinancialgroup@gmail.com', image: '/images/agents/makeshwar-yadav.png' },
  { name: 'Rigoberto Antonio Ayala Rodas', rank: 'Vice President of Sales', city: 'Everett', state: 'Massachusetts', phone: '(617) 331-4093', email: 'rigonxtfinancialgroup@gmail.com', image: '/images/team/rigoberto-ayala.png' },
  { name: 'Maira Elisabeth Ochoa Umana', rank: 'Financial Associate', city: 'Revere', state: 'Massachusetts', phone: '(617) 953-8118', email: 'mairanxtfinancialgroup@gmail.com', image: '/images/agents/maira-ochoa.png' },
  { name: 'Josue Araujo', rank: 'Financial Associate', city: 'Malden', state: 'Massachusetts', phone: '(781) 333-0908', email: 'josuenxtfinancialgroup@gmail.com', image: '/images/agents/josue-araujo.png' },
  { name: 'Vivek Daruka', rank: 'Financial Associate', city: 'Worcester', state: 'Massachusetts', phone: '(318) 789-4199', email: 'viveknxtfinancialgroup@gmail.com', image: null },
  { name: 'Andy M Martinez', rank: 'Financial Associate', city: 'Lynn', state: 'Massachusetts', phone: '(857) 261-5938', email: 'andynxtfinancialgroup@gmail.com', image: '/images/agents/andy-martinez.jpg' },
  { name: 'Minakshi Rajbanshi', rank: 'Vice President of Marketing', city: 'Hooksett', state: 'New Hampshire', phone: '(603) 682-8507', email: 'minakshinxtfinancialgroup@gmail.com', image: '/images/agents/minakshi-rajbanshi.jpeg' },
  { name: 'Anjali Shrestha', rank: 'Financial Director', city: 'Manchester', state: 'New Hampshire', phone: '(603) 858-3083', email: 'anjalinxtfinancialgroup@gmail.com', image: '/images/agents/anjali-shrestha.jpeg' },
  { name: 'Alana Malla', rank: 'Vice President of Agent Development', city: 'Westford', state: 'Massachusetts', phone: '(857) 928-3409', email: 'alananxtfinancialgroup@gmail.com', image: '/images/agents/alana-malla.jpeg' },
  { name: 'Sharmila Khadka Karki', rank: 'Financial Director', city: 'Hooksett', state: 'New Hampshire', phone: '(603) 203-0062', email: 'sharmilanxtfinancialgroup@gmail.com', image: '/images/agents/sharmila-khadka-karki.jpeg' },
  { name: 'Sobi Rajbhandari', rank: 'Financial Director', city: 'Hooksett', state: 'New Hampshire', phone: '(603) 410-9521', email: 'sobinxtfinancialgroup@gmail.com', image: '/images/agents/sobi-rajbhandari.jpeg' },
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
