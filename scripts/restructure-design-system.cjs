const fs = require('fs');
const path = require('path');

const designSystemInfoPath = path.join(__dirname, '../src/design-system/design-system-info.md');
const content = fs.readFileSync(designSystemInfoPath, 'utf8');
const lines = content.split('\n');

const rawInfo = { components: [], layouts: [], compositions: [] };
let currentSection = 'components';

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line || line === '--') continue;
    if (line === 'COMPOSITIONS') { currentSection = 'compositions'; continue; }
    if (line === 'LAYOUTS') { currentSection = 'layouts'; continue; }

    if (lines[i+1] && (lines[i+1].trim() === 'Documentation' || lines[i+1].trim() === 'Checklists')) {
        if (line === 'components' || line === 'Navigation') continue;
        rawInfo[currentSection].push(line);
    }
}

function toPascalCase(str) {
    return str.replace(/ \((DEPRECATED)\)/i, '').split(/[\s-]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

const categorized = { components: [], layouts: [], compositions: [] };
for (const key in rawInfo) {
    categorized[key] = [...new Set(rawInfo[key])].map(toPascalCase);
}

// Special case: some components are listed under Composition (Advanced Checkbox) but the base is Checkbox.
// We will favor keeping base items in Components if they appear in both.
const finalLayouts = new Set(categorized.layouts);
const finalCompositions = new Set(categorized.compositions);

categorized.components.forEach(c => {
    finalCompositions.delete(c);
    finalLayouts.delete(c);
});

const baseDir = path.join(__dirname, '../src/design-system');
const componentsDir = path.join(baseDir, 'components');
const layoutsDir = path.join(baseDir, 'layouts');
const compositionsDir = path.join(baseDir, 'compositions');
const internalDir = path.join(baseDir, 'internal');

[layoutsDir, compositionsDir, internalDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const existingComponents = fs.readdirSync(componentsDir).filter(f => !f.includes('.'));
const allDocumented = new Set([...categorized.components, ...finalLayouts, ...finalCompositions]);

existingComponents.forEach(component => {
    const srcPath = path.join(componentsDir, component);
    if (!fs.statSync(srcPath).isDirectory()) return;

    let destDir = null;

    if (finalLayouts.has(component)) {
        destDir = layoutsDir;
    } else if (finalCompositions.has(component)) {
        destDir = compositionsDir;
    } else if (!allDocumented.has(component)) {
        destDir = internalDir;
    }

    if (destDir) {
        fs.renameSync(srcPath, path.join(destDir, component));
        console.log(`Moved ${component} to ${path.basename(destDir)}`);
    }
});

// Helper to generate index.ts based on folder contents
function regenerateBarrel(dir) {
    const items = fs.readdirSync(dir).filter(f => !f.includes('.') && fs.statSync(path.join(dir, f)).isDirectory());
    const exportsFile = path.join(dir, 'index.ts');
    
    let indexContent = items.map(item => `export { ${item} } from './${item}';\nexport type { ${item}Props } from './${item}.types';\n`).join('\n');
    
    if (indexContent) {
        fs.writeFileSync(exportsFile, indexContent);
        console.log(`Regenerated ${path.basename(dir)}/index.ts`);
    }
}

regenerateBarrel(componentsDir);
regenerateBarrel(layoutsDir);
regenerateBarrel(compositionsDir);
regenerateBarrel(internalDir);
