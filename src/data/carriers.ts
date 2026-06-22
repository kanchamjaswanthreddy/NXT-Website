export const allCarriers: string[] = [
  'aaa','aegis-general','allied-trust','allstate','american-modern','american-strategic',
  'amtrust','annex-risk','arrowhead','atlas-general','attune','back-nine','bamboo',
  'branch','bristol-west','btis','burns-and-wilcox','cabrillo-coastal','canngen',
  'chubb','clearcover','cna','cover-tree','cover-whale','cowbell-cyber','crc-group',
  'crc-tapco','crump','cypress','dairyland','donegal','elephant','embark','encompass',
  'epremium','foremost-signature','foremost','gainsco','gbli','geico','grange',
  'guard-insurance','guide-one','gulfstream','hagerty','hanover','heritage','hiscox',
  'homeowners-of-america','hugo','icat','indigo','isc','k2-specialty','kansas-city-life',
  'kemper-auto','kleeco','lamar-general','leeo','lemonade','liberty-mutual','liberty-surety',
  'lincoln-financial','main-street-america','mapfre','mercury','mexico-insurance-online',
  'mmg-insurance','nat-gen','national-general','nationwide','obie','openly','orchid',
  'orion180','palomar-specialty','pathpoint','philadelphia','progressive','propeller-bonds',
  'quick-life','risico','rohrer-and-associates','rps','safeco','sagesure','secura',
  'ses','sport-underwriters','starwind-wc','state-auto','steadily','swyfft','the-general',
  'the-hartford','tokio-marine-hcc','tower-hill','travelers','trexis','universal-property',
  'victor-insurance','wellington','wright-flood','xsb',
]

export const top20 = {
  national:   ['allstate','progressive','travelers','nationwide','the-hartford','liberty-mutual','chubb','safeco','geico','hiscox','cna','aaa','lincoln-financial','kansas-city-life','lemonade','branch','clearcover','donegal','hanover','grange'],
  personal:   ['allstate','progressive','geico','safeco','liberty-mutual','nationwide','travelers','lemonade','clearcover','branch','mercury','elephant','dairyland','trexis','the-general','gainsco','foremost','bamboo','openly','obie'],
  commercial: ['cna','the-hartford','travelers','hiscox','amtrust','attune','cowbell-cyber','guard-insurance','secura','philadelphia','victor-insurance','btis','crc-group','rps','burns-and-wilcox','crump','k2-specialty','gbli','icat','atlas-general'],
  wholesale:  ['burns-and-wilcox','crc-group','rps','crump','arrowhead','btis','atlas-general','k2-specialty','pathpoint','annex-risk','gbli','icat','palomar-specialty','orchid','ses','aegis-general','rohrer-and-associates','xsb','propeller-bonds','liberty-surety'],
}

export const stateNames: Record<string, string> = {
  AL:'Alabama', AK:'Alaska', AZ:'Arizona', AR:'Arkansas', CA:'California',
  CO:'Colorado', CT:'Connecticut', DE:'Delaware', FL:'Florida', GA:'Georgia',
  HI:'Hawaii', ID:'Idaho', IL:'Illinois', IN:'Indiana', IA:'Iowa',
  KS:'Kansas', KY:'Kentucky', LA:'Louisiana', ME:'Maine', MD:'Maryland',
  MA:'Massachusetts', MI:'Michigan', MN:'Minnesota', MS:'Mississippi', MO:'Missouri',
  MT:'Montana', NE:'Nebraska', NV:'Nevada', NH:'New Hampshire', NJ:'New Jersey',
  NM:'New Mexico', NY:'New York', NC:'North Carolina', ND:'North Dakota', OH:'Ohio',
  OK:'Oklahoma', OR:'Oregon', PA:'Pennsylvania', RI:'Rhode Island', SC:'South Carolina',
  SD:'South Dakota', TN:'Tennessee', TX:'Texas', UT:'Utah', VT:'Vermont',
  VA:'Virginia', WA:'Washington', WV:'West Virginia', WI:'Wisconsin', WY:'Wyoming',
}

/** Returns the correct file extension based on what actually exists in /public/logos/ */
function getExtension(name: string): string {
  // Confirmed .jpeg files
  const jpeg = new Set(['cna','hanover','liberty-mutual','mapfre','sagesure'])
  const jpg = new Set([
    'allied-trust','branch','clearcover','chubb','cover-tree','crc-group','crc-tapco',
    'embark','encompass','epremium','foremost-signature','gbli','guide-one',
    'hugo','icat','isc','k2-specialty','kemper-auto','kleeco','liberty-surety',
    'main-street-america','mexico-insurance-online','nat-gen','national-general',
    'orchid','palomar-specialty','pathpoint','philadelphia','quick-life',
    'ses','state-auto','tokio-marine-hcc','tower-hill',
  ])
  // Confirmed .svg
  const svg = new Set(['geico'])

  if (svg.has(name)) return '.svg'
  if (jpeg.has(name)) return '.jpeg'
  if (jpg.has(name)) return '.jpg'
  return '.png'
}

export function getLogoPath(name: string): string {
  return `/logos/${name}${getExtension(name)}`
}
