const fs = require('fs');
const path = require('path');

const compositionsList = [
    'AdvancedCheckbox',
    'Checkbox',
    'CheckboxGroup',
    'AdvancedRadio',
    'Radio',
    'RadioGroup',
    'ButtonGroup',
    'CarCard',
    'CardTable',
    'CardWithHeader',
    'Carousel',
    'CarouselWithCards',
    'CookieConsent',
    'FilterSlide',
    'GenericTile',
    'GridWithCards',
    'HeadingAndText',
    'Hero',
    'LinkList',
    'LookupForm',
    'ModalSheet',
    'MultiRow',
    'PageHeader',
    'PWABottomNavigation',
    'Row',
    'SearchPreviewPopover',
    'SearchCard',
    'SecondaryNavigationBar',
    'ShadedRow',
    'SlideShowWithHero',
    'TableOfContent',
    'Tooltip'
];

const baseDir = path.join(__dirname, '../src/design-system');
const compositionsDir = path.join(baseDir, 'compositions');
const indexFilePath = path.join(compositionsDir, 'index.ts');

if (!fs.existsSync(compositionsDir)) {
    fs.mkdirSync(compositionsDir, { recursive: true });
}

// Ensure every single one exists in compositions/
let indexExports = '';

compositionsList.forEach(componentName => {
    const componentPath = path.join(compositionsDir, componentName);
    
    // Check if it exists elsewhere and move it if it does
    const possibleLocations = [
        path.join(baseDir, 'components', componentName),
        path.join(baseDir, 'layouts', componentName),
        path.join(baseDir, 'internal', componentName)
    ];

    let foundElsewhere = false;
    for (const loc of possibleLocations) {
        if (fs.existsSync(loc)) {
            fs.renameSync(loc, componentPath);
            console.log(`Moved ${componentName} from ${path.basename(path.dirname(loc))} to compositions`);
            foundElsewhere = true;
            break;
        }
    }

    if (!fs.existsSync(componentPath)) {
        fs.mkdirSync(componentPath, { recursive: true });

        // Component.tsx
        const tsxContent = `import React from 'react';\nimport type { ${componentName}Props } from './${componentName}.types';\n\nexport function ${componentName}({ className, style, ...rest }: ${componentName}Props) {\n    return (\n        <div className={className} style={style} {...rest}>\n            ${componentName}\n        </div>\n    );\n}\n`;
        fs.writeFileSync(path.join(componentPath, `${componentName}.tsx`), tsxContent);

        // Component.types.ts
        const typesContent = `import type { ReactNode, CSSProperties } from 'react';\n\nexport interface ${componentName}Props {\n    className?: string;\n    style?: CSSProperties;\n    children?: ReactNode;\n}\n`;
        fs.writeFileSync(path.join(componentPath, `${componentName}.types.ts`), typesContent);

        // index.ts
        const indexContent = `export { ${componentName} } from './${componentName}';\nexport type { ${componentName}Props } from './${componentName}.types';\n`;
        fs.writeFileSync(path.join(componentPath, 'index.ts'), indexContent);

        console.log(`Generated boilerplate for ${componentName} in compositions`);
    }

    indexExports += `export { ${componentName} } from './${componentName}';\nexport type { ${componentName}Props } from './${componentName}';\n\n`;
});

// Since we moved some stuff from components/layouts/internal, we must regenerate their index.ts too
function regenerateBarrel(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir).filter(f => !f.includes('.') && fs.statSync(path.join(dir, f)).isDirectory());
    const exportsFile = path.join(dir, 'index.ts');
    
    let content = items.map(item => `export { ${item} } from './${item}';\nexport type { ${item}Props } from './${item}';\n`).join(''); // Note: omitting .types for export type to match what we had
    // Actually the previous script did 'export type { XProps } from './X.types';'. Let's stick to safe syntax.
    content = items.map(item => `export { ${item} } from './${item}';\nexport type { ${item}Props } from './${item}.types';\n`).join('\n');
    
    fs.writeFileSync(exportsFile, content);
}

regenerateBarrel(path.join(baseDir, 'components'));
regenerateBarrel(path.join(baseDir, 'layouts'));
regenerateBarrel(path.join(baseDir, 'internal'));
regenerateBarrel(compositionsDir); // do standard regen for compositions too to be safe.

console.log('Done ensuring all compositions are present.');
