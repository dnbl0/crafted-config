const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// 1. Fix ThemeProvider.tsx
const themeProviderPath = path.join(srcDir, 'design-system', 'ThemeProvider.tsx');
let themeContent = fs.readFileSync(themeProviderPath, 'utf8');
themeContent = themeContent.replace(', PrimitiveColors', '').replace('PrimitiveColors;', 'typeof primitiveColors;');
fs.writeFileSync(themeProviderPath, themeContent);

// 2. Fix barrel files
const dirsWithBarrels = [
    path.join(srcDir, 'design-system', 'components'),
    path.join(srcDir, 'design-system', 'layouts'),
    path.join(srcDir, 'design-system', 'compositions'),
    path.join(srcDir, 'design-system', 'internal'),
];

dirsWithBarrels.forEach(dir => {
    const indexPath = path.join(dir, 'index.ts');
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        // Replace: export type { XProps } from './X.types';
        // With:    export type { XProps } from './X';
        content = content.replace(/from '\.\/([^']+)\.types';/g, "from './$1';");
        fs.writeFileSync(indexPath, content);
    }
});

// 3. Remove unused React imports across all generated components
function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.startsWith("import React from 'react';\n")) {
                content = content.slice("import React from 'react';\n".length);
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}
dirsWithBarrels.forEach(walk);

console.log('Fixed all errors!');
