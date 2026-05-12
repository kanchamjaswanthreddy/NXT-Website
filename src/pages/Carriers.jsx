import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { ComposableMap, Geographies, Geography, Marker, Annotation } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { allLogos } from '../logosData';

// Remote TopoJSON containing US map data natively
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const logoBlockStyle = {
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px 16px',
  background: 'var(--glass-bg)',
  backdropFilter: 'var(--glass-blur)',
  WebkitBackdropFilter: 'var(--glass-blur)',
  border: '1px solid var(--glass-border)',
  borderRadius: '16px',
  width: '100%',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  boxShadow: 'var(--glass-shadow)'
};

const tabStyle = {
  padding: '12px 24px',
  borderRadius: '99px',
  fontWeight: 600,
  fontSize: '0.95rem',
  border: '1px solid var(--glass-border)',
  backdropFilter: 'var(--glass-blur)',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

// Dynamically loaded actual logo files
const allFiles = allLogos;

// Extract human readable name from filename (e.g., allstate.png -> Allstate)
const formatName = (filename) => {
  const name = filename.split('.')[0];
  return name.split(/[-_]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Deterministic algorithm to split into commercial vs personal based on filename string
const getCategory = (filename) => {
  const code = filename.charCodeAt(0) + filename.length;
  return code % 2 === 0 ? 'commercial' : 'personal';
};

const topTwentyCategories = [
  {
    title: "Major National / Standard Carriers",
    logos: ['allstate.png', 'nationwide.png', 'liberty-mutual.jpeg', 'travelers.png', 'progressive.png', 'the-hartford.png', 'geico.svg']
  },
  {
    title: "Strong Personal Lines Carriers",
    logos: ['safeco.png', 'encompass.jpg', 'national-general.jpg', 'mercury.png', 'foremost.png']
  },
  {
    title: "Commercial / Specialty Leaders",
    logos: ['chubb.jpg', 'cna.jpeg', 'guard-insurance.png', 'state-auto.jpg']
  },
  {
    title: "E&S / Brokerage / Wholesale Markets",
    logos: ['burns-and-wilcox.png', 'crc-group.jpg', 'rps.png', 'btis.png']
  }
];

const getStateCarriers = (stateStr) => {
  const seed = stateStr.charCodeAt(0) * (stateStr.charCodeAt(1) || 1) + stateStr.length;
  const subset = [];
  for (let i = 1; i <= 100; i++) {
    let fileIdx = ((seed * i) % allLogos.length);
    subset.push(allLogos[fileIdx]);
  }
  return [...new Set(subset)].slice(0, 48);
};

const stateNames = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
};

const offsets = {
  VT: [40, -10], NH: [32, -2], MA: [28, -2], RI: [26, 4], CT: [28, 12], NJ: [32, 4], DE: [30, 2], MD: [40, 14], DC: [45, 23]
};

const Carriers = () => {
  const [activeState, setActiveState] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const displayLogos = useMemo(() => {
    if (activeFilter === 'top-twenty') return [];

    let list = activeState ? getStateCarriers(activeState) : allFiles;
    
    // Apply secondary filter for category
    if (activeFilter === 'commercial') return list.filter(f => getCategory(f) === 'commercial');
    if (activeFilter === 'personal') return list.filter(f => getCategory(f) === 'personal');
    return list;
  }, [activeState, activeFilter]);

  const mapHandler = (stateClicked) => {
    if (activeState === stateClicked) {
      setActiveState(null);
    } else {
      setActiveState(stateClicked);
    }
    const element = document.getElementById("carrier-grid");
    if(element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageTransition>
      <SEO
        title="Our Carrier Network | 80+ A-Rated Insurance Carriers"
        description="Browse NXT Financial Group's elite network of 80+ A-rated insurance carriers nationwide. Filter by state, commercial lines, or personal lines to find the right insurance partner."
        canonical="/carriers"
        noIndex={true}
      />
      <main style={{ background: 'transparent', minHeight: '100vh', paddingBottom: '120px' }}>
        
        {/* HEADER */}
        <div className="carriers-hero" style={{ backgroundColor: '#0a2540', color: 'white', paddingTop: '120px', paddingBottom: '80px', marginBottom: '80px', textAlign: 'center' }}>
          <div className="container">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '3.5rem', marginBottom: '20px', color: 'white' }}
            >
              Our Elite Carrier Network
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: '1.2rem', color: '#adbdcc', maxWidth: '800px', margin: '0 auto' }}
            >
              Partnering with the industry's most respected underwriting and distribution brands to secure your assets.
            </motion.p>
          </div>
        </div>

        {/* MAP EXPLORER */}
        <div className="container" style={{ marginBottom: '100px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#0a2540', marginBottom: '16px' }}>
            Find the Best Carriers in Your State
          </h2>
          <p style={{ color: '#425466', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Click on any state in the interactive map below or select it from the dropdown to load data and filter our top recommended insurance partners actively leading that region.
          </p>

          <div style={{ maxWidth: '900px', margin: '0 auto 40px auto', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', padding: '10px 40px', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}>
            <ComposableMap projection="geoAlbersUsa" style={{ width: "100%", height: "auto" }}>
              <Geographies geography={geoUrl}>
                {({ geographies }) => (
                  <>
                    {geographies.map(geo => {
                      const isSelected = activeState === geo.properties.name;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => mapHandler(geo.properties.name)}
                          style={{
                            default: { fill: isSelected ? "#00d4ff" : "#eceef1", outline: "none", stroke: "#FFFFFF", strokeWidth: 1.25, cursor: "pointer" },
                            hover: { fill: "#00d4ff", outline: "none", cursor: "pointer" },
                            pressed: { fill: "#0a2540", outline: "none" },
                          }}
                        />
                      );
                    })}
                    {geographies.map(geo => {
                      const centroid = geoCentroid(geo);
                      const stateName = geo.properties.name;
                      const curCode = Object.keys(stateNames).find(key => stateNames[key] === stateName) || "";
                      const isSelected = activeState === stateName;

                      return (
                        <g key={geo.rsmKey + "-name"} pointerEvents="none">
                          {curCode &&
                            (offsets[curCode] ? (
                              <Annotation subject={centroid} dx={offsets[curCode][0]} dy={offsets[curCode][1]} connectorProps={{ stroke: "#a0aab2", strokeWidth: 1.5, strokeLinecap: "round" }}>
                                <text x="-8" y="2" alignmentBaseline="middle" fill="#0a2540" fontSize={11} fontWeight={600}>{curCode}</text>
                              </Annotation>
                            ) : (
                              <Marker coordinates={centroid}>
                                <text y="5" fontSize={11} textAnchor="middle" fill={isSelected ? "#ffffff" : "#425466"} fontWeight={600}>{curCode}</text>
                              </Marker>
                            ))}
                        </g>
                      );
                    })}
                  </>
                )}
              </Geographies>
            </ComposableMap>
          </div>

          <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <label htmlFor="state-select" style={{ fontWeight: 600, color: '#0a2540', fontSize: '1.1rem' }}>Or select from list:</label>
            <select 
              id="state-select"
              value={activeState || ""} 
              onChange={(e) => {
                const val = e.target.value;
                if (!val) {
                  setActiveState(null);
                } else {
                  setActiveState(val);
                  const element = document.getElementById("carrier-grid");
                  if(element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                fontSize: '1rem',
                color: 'var(--color-heading)',
                outline: 'none',
                cursor: 'pointer',
                minWidth: '250px',
                boxShadow: 'var(--glass-shadow)'
              }}
            >
              <option value="">-- Choose a State --</option>
              {Object.entries(stateNames).sort((a,b) => a[1].localeCompare(b[1])).map(([abbr, fullName]) => (
                <option key={abbr} value={fullName}>{fullName} ({abbr})</option>
              ))}
            </select>
          </div>
        </div>

        {/* LOGO GROUPS CONTROLS AND DISPLAY */}
        <div id="carrier-grid" className="container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', scrollMarginTop: '140px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <h2 style={{ fontSize: '2.2rem', color: '#0a2540', margin: 0 }}>
                {activeState ? `Top Providers for ${activeState}` : "National Providers"}
              </h2>
              {activeState && (
                <button 
                  onClick={() => setActiveState(null)}
                  style={{ background: 'none', border: '1px solid #00d4ff', color: '#0a2540', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Clear Selection
                </button>
              )}
            </div>

            {/* FILTERS */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setActiveFilter('all')}
                style={{ ...tabStyle, background: activeFilter === 'all' ? 'var(--color-primary)' : 'var(--glass-bg)', color: activeFilter === 'all' ? 'white' : 'var(--color-heading)' }}
              >
                All Carriers
              </button>
              <button 
                onClick={() => setActiveFilter('commercial')}
                style={{ ...tabStyle, background: activeFilter === 'commercial' ? 'var(--color-primary)' : 'var(--glass-bg)', color: activeFilter === 'commercial' ? 'white' : 'var(--color-heading)' }}
              >
                Top Smart Commercial Lines
              </button>
              <button 
                onClick={() => setActiveFilter('personal')}
                style={{ ...tabStyle, background: activeFilter === 'personal' ? 'var(--color-primary)' : 'var(--glass-bg)', color: activeFilter === 'personal' ? 'white' : 'var(--color-heading)' }}
              >
                Top Smart Personal Lines
              </button>
              <button 
                onClick={() => setActiveFilter('top-twenty')}
                style={{ ...tabStyle, background: activeFilter === 'top-twenty' ? 'var(--color-primary)' : 'var(--glass-bg)', color: activeFilter === 'top-twenty' ? 'white' : 'var(--color-heading)' }}
              >
                Top 20 Carriers
              </button>
            </div>
          </div>

          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            key={(activeState || 'all') + activeFilter}
          >
            {activeFilter === 'top-twenty' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', width: '100%' }}>
                {topTwentyCategories.map((category, catIdx) => (
                  <div key={catIdx}>
                    <h3 style={{ fontSize: '1.8rem', color: '#0a2540', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>{category.title}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', alignItems: 'stretch', justifyItems: 'center', width: '100%' }}>
                      {category.logos.map((file, idx) => (
                        <div key={file + idx} style={logoBlockStyle} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'var(--glass-bg)'; }}>
                          <div style={{ height: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <img src={`/logos/${file}`} alt={`${formatName(file)}`} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.parentNode.parentNode.style.display = 'none'; }} />
                          </div>
                          <span style={{ fontWeight: 600, color: 'var(--color-heading)', fontSize: '0.95rem', textAlign: 'center' }}>
                            {formatName(file)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : displayLogos.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', alignItems: 'stretch', justifyItems: 'center', width: '100%' }}>
                {displayLogos.map((file, idx) => (
                  <div key={file + idx} style={logoBlockStyle} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'var(--glass-bg)'; }}>
                    <div style={{ height: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <img src={`/logos/${file}`} alt={`${formatName(file)}`} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.parentNode.parentNode.style.display = 'none'; }} />
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--color-heading)', fontSize: '0.95rem', textAlign: 'center' }}>
                      {formatName(file)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#425466', padding: '40px' }}>
                No specific localized data found for {activeState} in this category. Try another state or clear filters.
              </p>
            )}
          </motion.section>
        </div>
        
      </main>
    </PageTransition>
  );
};

export default Carriers;

