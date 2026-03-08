const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const componentsDir = path.join(srcDir, 'design-system/components');
const layoutsDir = path.join(srcDir, 'design-system/layouts');
const compositionsDir = path.join(srcDir, 'design-system/compositions');

function getExportNames(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(f => !f.includes('.'))
        .filter(f => fs.statSync(path.join(dir, f)).isDirectory());
}

const comps = getExportNames(componentsDir);
const lays = getExportNames(layoutsDir);
const compo = getExportNames(compositionsDir);

const appContent = `import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './design-system/ThemeProvider';
import { ChevronRight, Search, Menu, ExternalLink } from 'lucide-react';

// dynamic mass imports
${comps.map(c => `import { ${c} } from './design-system/components/${c}';`).join('\n')}
${lays.map(c => `import { ${c} } from './design-system/layouts/${c}';`).join('\n')}
${compo.map(c => `import { ${c} } from './design-system/compositions/${c}';`).join('\n')}

const ALL_COMPONENTS = {
  Components: [${comps.map(c => `'${c}'`).join(', ')}],
  Layouts: [${lays.map(c => `'${c}'`).join(', ')}],
  Compositions: [${compo.map(c => `'${c}'`).join(', ')}]
};

const MAPPED_COMPONENTS: Record<string, React.FC<any>> = {
  ${comps.map(c => `${c}`).join(',\n  ')},
  ${lays.map(c => `${c}`).join(',\n  ')},
  ${compo.map(c => `${c}`).join(',\n  ')}
};

function Topbar() {
  const { tokens, mode, toggleMode } = useTheme();
  return (
    <header style={{
      height: 64, borderBottom: \`1px solid \${tokens.modifiersMidlight}\`,
      backgroundColor: tokens.canvasDefault, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, background: '#D60000', borderRadius: 4 }}></div>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px', color: tokens.foregroundDefault }}>LK Design GEL</span>
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={toggleMode} style={{
          background: 'transparent', border: \`1px solid \${tokens.modifiersMidlight}\`,
          padding: '8px 16px', borderRadius: 20, cursor: 'pointer', color: tokens.foregroundDefault,
          fontWeight: 600, fontSize: 13
        }}>
          {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}

function Sidebar() {
  const { tokens } = useTheme();
  const location = useLocation();

  return (
    <nav style={{
      width: 260, borderRight: \`1px solid \${tokens.modifiersMidlight}\`,
      height: 'calc(100vh - 64px)', overflowY: 'auto', backgroundColor: tokens.canvasDefault,
      padding: '32px 0', flexShrink: 0
    }}>
      {Object.entries(ALL_COMPONENTS).map(([category, items]) => (
        <div key={category} style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px',
            color: tokens.foregroundDefault, opacity: 0.5, padding: '0 24px', marginBottom: 12
          }}>
            {category}
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {items.map(item => {
              const path = \`/component/\${item}\`;
              const isActive = location.pathname === path;
              const formattedName = item.replace(/([A-Z])/g, ' $1').trim()
              return (
                <li key={item}>
                  <Link to={path} style={{
                    display: 'block', padding: '10px 24px', textDecoration: 'none',
                    color: isActive ? tokens.accentPrimaryDefault : tokens.foregroundDefault,
                    backgroundColor: isActive ? tokens.elevationRaisedDefault : 'transparent',
                    borderRight: isActive ? \`3px solid \${tokens.accentPrimaryDefault}\` : '3px solid transparent',
                    fontWeight: isActive ? 600 : 400, fontSize: 14, transition: 'background-color 0.2s',
                    opacity: isActive ? 1 : 0.8
                  }}>
                    {formattedName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function PageContent({ name }: { name: string }) {
  const { tokens } = useTheme();
  const [activeTab, setActiveTab] = useState('Design');
  const ComponentToRender = MAPPED_COMPONENTS[name];

  if (!ComponentToRender) return <div style={{ padding: 40}}>Component not found.</div>;

  return (
    <main style={{ flex: 1, padding: '48px 64px', overflowY: 'auto', height: 'calc(100vh - 64px)', backgroundColor: tokens.canvasDefault }}>
      <div style={{ maxWidth: 960, margin: '0 0' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: tokens.foregroundDefault, opacity: 0.6, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>Home</span> <ChevronRight size={14} /> <span>Components</span> <ChevronRight size={14} /> <span>{name}</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-1.5px', color: tokens.foregroundDefault, margin: 0 }}>
            {name.replace(/([A-Z])/g, ' $1').trim()}
          </h1>
          <span style={{
            background: tokens.elevationRaisedLighter, padding: '4px 12px', borderRadius: 24,
            fontSize: 12, fontWeight: 600, color: tokens.successDefault, border: \`1px solid \${tokens.successDefault}\`
          }}>Ready</span>
        </div>
        
        <p style={{ fontSize: 20, lineHeight: 1.6, color: tokens.foregroundDefault, opacity: 0.7, maxWidth: 800, marginBottom: 48 }}>
          Provides detailed layout implementation documentation on {name}, representing the latest global UI token guidelines for scaling React applications effectively.
        </p>

        {/* Tabs */}
        <div style={{ borderBottom: \`1px solid \${tokens.modifiersMidlight}\`, display: 'flex', gap: 32, marginBottom: 48 }}>
          {['Design', 'Development', 'Accessibility'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', padding: '16px 0', fontSize: 16, fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? tokens.accentPrimaryDefault : tokens.foregroundDefault,
                borderBottom: activeTab === tab ? \`4px solid \${tokens.accentPrimaryDefault}\` : '4px solid transparent',
                cursor: 'pointer', marginBottom: -1, opacity: activeTab === tab ? 1 : 0.6, transition: 'all 0.2s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Design' && (
          <div style={{ paddingBottom: 64 }}>
            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 24, letterSpacing: '-0.5px' }}>Interactive Preview</h2>
            
            {/* Component Preview Box */}
            <div style={{
              border: \`1px solid \${tokens.modifiersMidlight}\`,
              borderRadius: 12, overflow: 'hidden', marginBottom: 48,
              boxShadow: tokens.shadowsLess
            }}>
              <div style={{ padding: '64px', backgroundColor: tokens.elevationRaisedDefault, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, backgroundImage: 'radial-gradient(circle, #8882 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                <ComponentToRender>
                  <div style={{ padding: 24, border: \`2px dashed \${tokens.accentPrimaryDefault}\`, borderRadius: 8, backgroundColor: tokens.canvasLighter, color: tokens.foregroundDefault, textAlign: 'center', opacity: 0.8, fontWeight: 500 }}>
                    Sample Data for {name.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </ComponentToRender>
              </div>
              <div style={{ borderTop: \`1px solid \${tokens.modifiersMidlight}\`, padding: '16px 24px', backgroundColor: tokens.elevationInsetDefault, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: tokens.foregroundDefault, opacity: 0.8 }}>Default Variant</span>
                <span style={{ fontSize: 14, fontFamily: 'monospace', opacity: 0.6 }}>&lt;{name} /&gt;</span>
              </div>
            </div>

            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 16, letterSpacing: '-0.5px' }}>Usage Strategy</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: tokens.foregroundDefault, opacity: 0.8, marginBottom: 24 }}>
              The <strong>{name}</strong> is designed to reduce architectural overhead while scaling. Used internally across the Lexus site to enforce UI consistency. Follow explicit token sizing patterns in documentation when customizing layout.
            </p>
          </div>
        )}

        {activeTab === 'Development' && (
          <div style={{ paddingBottom: 64 }}>
            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 24, letterSpacing: '-0.5px' }}>Installation</h2>
            <pre style={{
              backgroundColor: tokens.elevationInsetDarker, padding: 24, borderRadius: 12,
              fontSize: 15, fontFamily: 'monospace', overflowX: 'auto', border: \`1px solid \${tokens.modifiersMidlight}\`,
              color: '#d1d5db', marginBottom: 48
            }}>
              <code>
                import &#123; {name} &#125; from '@lk/design-system';
              </code>
            </pre>
            
            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 24, letterSpacing: '-0.5px' }}>Props API</h2>
            <div style={{ border: \`1px solid \${tokens.modifiersMidlight}\`, borderRadius: 12, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 15 }}>
                <thead style={{ backgroundColor: tokens.elevationRaisedLighter, borderBottom: \`1px solid \${tokens.modifiersMidlight}\` }}>
                  <tr>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Prop</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Type</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: \`1px solid \${tokens.modifiersMidlight}\`, backgroundColor: tokens.canvasDefault }}>
                    <td style={{ padding: '20px 24px', fontFamily: 'monospace', color: tokens.accentPrimaryDefault }}>className?</td>
                    <td style={{ padding: '20px 24px', fontFamily: 'monospace', opacity: 0.8 }}>string</td>
                    <td style={{ padding: '20px 24px', opacity: 0.8 }}>Overrides existing wrapper class definitions.</td>
                  </tr>
                  <tr style={{ backgroundColor: tokens.canvasLighter }}>
                    <td style={{ padding: '20px 24px', fontFamily: 'monospace', color: tokens.accentPrimaryDefault }}>style?</td>
                    <td style={{ padding: '20px 24px', fontFamily: 'monospace', opacity: 0.8 }}>CSSProperties</td>
                    <td style={{ padding: '20px 24px', opacity: 0.8 }}>Inline programmatic styling injections if external classes are unavailable.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Accessibility' && (
          <div style={{ paddingBottom: 64 }}>
            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 24, letterSpacing: '-0.5px' }}>Screen Readers</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: tokens.foregroundDefault, opacity: 0.8 }}>
              Native implementations inside {name} inherit standard browser semantics where possible. Please explicitly manage your React <code>aria-label</code> if wrapping this inside invisible context states. Complies with WCAG 2.1 AA.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function Welcome() {
  const { tokens } = useTheme();
  return (
    <main style={{ flex: 1, padding: '64px', overflowY: 'auto', backgroundColor: tokens.canvasDefault, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: 800, textAlign: 'center', marginTop: '4vh' }}>
        <h1 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-2px', marginBottom: 24, color: tokens.foregroundDefault }}>
          LK Design GEL
        </h1>
        <p style={{ fontSize: 22, lineHeight: 1.6, color: tokens.foregroundDefault, opacity: 0.7, marginBottom: 48 }}>
          The enterprise-grade scalable component system architecture for Lexus. 
          Use the explicit navigation schema defined in the core token documentation to build resilient and robust applications.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/component/Button" style={{
            background: tokens.accentPrimaryDefault, color: '#fff', padding: '14px 32px',
            borderRadius: 30, textDecoration: 'none', fontWeight: 600, fontSize: 16, transition: 'transform 0.2s'
          }}>
            Explore Components
          </Link>
          <a href="https://github.com" style={{
            background: 'transparent', color: tokens.foregroundDefault, padding: '14px 32px',
            borderRadius: 30, textDecoration: 'none', fontWeight: 600, fontSize: 16, border: \`2px solid \${tokens.modifiersMidlight}\`,
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            GitHub Reference <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </main>
  );
}

function Layout() {
  const { tokens } = useTheme();
  
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: tokens.canvasDefault, color: tokens.foregroundDefault, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/component/:name" element={<ComponentRouteWrapper />} />
        </Routes>
      </div>
    </div>
  );
}

import { useParams } from 'react-router-dom';
function ComponentRouteWrapper() {
  const { name } = useParams();
  return <PageContent key={name} name={name || ''} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  );
}
`;

fs.writeFileSync(path.join(srcDir, 'App.tsx'), appContent);
console.log('Successfully applied Enterprise GEL (Westpac) style layout to App.tsx.');
