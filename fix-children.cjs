const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'design-system');
function fixComponents(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            fixComponents(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Basic generated structure replacement
            const regex = /export function ([A-Za-z0-9_]+)\(\{ className, style, \.\.\.rest \}: [A-Za-z0-9_]+Props\) \{\n    return \(\n        <div className=\{className\} style=\{style\} \{\.\.\.rest\}>\n            \1\n        <\/div>\n    \);\n\}/g;
            if (regex.test(content)) {
                content = content.replace(regex, (match, name) => {
                    return `export function ${name}({ className, style, children, ...rest }: ${name}Props) {
    return (
        <div className={className} style={style} {...rest}>
            {children || '${name}'}
        </div>
    );
}`;
                });
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

['components', 'layouts', 'compositions', 'internal'].forEach(sub => {
    fixComponents(path.join(srcDir, sub));
});
