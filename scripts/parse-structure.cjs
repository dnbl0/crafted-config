const fs = require('fs');

const content = fs.readFileSync('src/design-system/design-system-info.md', 'utf8');
const lines = content.split('\n');

const components = { components: [], layouts: [], compositions: [] };
let currentSection = 'components';

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line || line === '--') continue;
    if (line === 'COMPOSITIONS') { currentSection = 'compositions'; continue; }
    if (line === 'LAYOUTS') { currentSection = 'layouts'; continue; }

    if (lines[i+1] && (lines[i+1].trim() === 'Documentation' || lines[i+1].trim() === 'Checklists')) {
        if (line === 'components' || line === 'Navigation') continue;
        components[currentSection].push(line);
    }
}

function toPascalCase(str) {
    return str.replace(/ \((DEPRECATED)\)/i, '').split(/[\s-]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

const categorized = { components: [], layouts: [], compositions: [] };
for (const key in components) {
    categorized[key] = [...new Set(components[key])].map(toPascalCase);
}

const existing = fs.readdirSync('src/design-system/components').filter(f => !f.includes('.'));

console.log('--- EXPECTED STRUCTURE ---');
console.log('Components count:', categorized.components.length);
console.log('Layouts count:', categorized.layouts.length);
console.log('Compositions count:', categorized.compositions.length);

console.log('\n--- MODULES WE HAVE THAT MIGHT NEED MOVING ---');
const toMoveToLayouts = categorized.layouts.filter(l => existing.includes(l));
const toMoveToCompositions = categorized.compositions.filter(c => existing.includes(c));
console.log('To Layouts:', toMoveToLayouts);
console.log('To Compositions:', toMoveToCompositions);

console.log('\n--- MODULES WE HAVE THAT AREN\'T IN THE DOC ---');
const allDocumented = new Set([...categorized.components, ...categorized.layouts, ...categorized.compositions]);
const undocumented = existing.filter(c => !allDocumented.has(c));
console.log('Undocumented / Probable Utilities:', undocumented);
