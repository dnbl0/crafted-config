const fs = require('fs');

const content = fs.readFileSync('src/design-system/design-system-info.md', 'utf8');
const lines = content.split('\n');

const components = { components: [], layouts: [], compositions: [] };
let currentSection = 'components';

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) continue;

    if (line === 'COMPOSITIONS') { currentSection = 'compositions'; continue; }
    if (line === 'LAYOUTS') { currentSection = 'layouts'; continue; }
    if (line === '--') continue;

    if (line === 'components' || line.startsWith('Documentation') || line.startsWith('Checklists')) continue;

    // A module name in this doc is usually followed by 'Documentation' or 'Checklists' or is standalone before variations
    if (lines[i+1] && (lines[i+1].trim() === 'Documentation' || lines[i+1].trim() === 'Checklists' || lines[i+1].trim() === '')) {
         components[currentSection].push(line);
    }
}

// Remove duplicates and clean up
for (const key in components) {
    components[key] = [...new Set(components[key])].filter(name => !name.startsWith('Default'));
}

console.log(JSON.stringify(components, null, 2));
