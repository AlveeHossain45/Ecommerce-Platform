const fs = require('fs');
const path = require('path');

function fixTypeScriptSyntax(content) {
    // Remove React.FC and TypeScript types
    let fixed = content
        // Remove React.FC<Props>
        .replace(/React\.FC<[^>]+>/g, '')
        .replace(/React\.Component<[^>]+>/g, '')
        
        // Remove variable type annotations
        .replace(/(const|let|var)\s+(\w+)\s*:\s*([^=]+)\s*=/g, '$1 $2 =')
        
        // Remove function return types
        .replace(/\)\s*:\s*([^{]+)\s*{/g, ') {')
        
        // Remove function parameter types
        .replace(/\(([^)]+)\)/g, (match, params) => {
            return '(' + params.replace(/:\s*[^,)]+/g, '') + ')';
        })
        
        // Remove interface definitions
        .replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
        
        // Remove type definitions
        .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
        
        // Remove generic types
        .replace(/<[^>]+>/g, '')
        
        // Remove useState types
        .replace(/useState<[^>]+>\(/g, 'useState(')
        
        // Remove event types
        .replace(/React\.(\w+)Event<[^>]+>/g, 'React.$1Event');

    return fixed;
}

function fixImports(content, filePath) {
    return content.replace(/from\s+['"](\.\.?\/[^'"]+)['"]/g, (match, importPath) => {
        // If import already has extension, keep it
        if (importPath.match(/\.(jsx|js|css|json|png|jpg|svg)$/)) {
            return `from '${importPath}'`;
        }
        
        // For component files, add .jsx
        if (filePath.endsWith('.jsx')) {
            return `from '${importPath}.jsx'`;
        }
        
        // For regular JS files, add .js
        return `from '${importPath}.js'`;
    });
}

function fixFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        console.log(`Fixing: ${filePath}`);
        
        // Fix imports first
        content = fixImports(content, filePath);
        
        // Fix TypeScript syntax
        content = fixTypeScriptSyntax(content);
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Fixed: ${filePath}`);
        return true;
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
        return false;
    }
}

function processDirectory(dir) {
    const items = fs.readdirSync(dir);
    let fixedCount = 0;
    let errorCount = 0;

    items.forEach(item => {
        if (item === 'node_modules' || item === '.git') return;
        
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            const result = processDirectory(fullPath);
            fixedCount += result.fixedCount;
            errorCount += result.errorCount;
        } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
            if (fixFile(fullPath)) {
                fixedCount++;
            } else {
                errorCount++;
            }
        }
    });
    
    return { fixedCount, errorCount };
}

// Main execution
console.log('🚀 Fixing all TypeScript to JavaScript conversions...\n');
const result = processDirectory('./src');
console.log('\n📊 Fix Results:');
console.log(`✅ Successfully fixed: ${result.fixedCount} files`);
console.log(`❌ Errors: ${result.errorCount} files`);

if (result.errorCount === 0) {
    console.log('\n🎉 All files converted successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Remove TypeScript dependencies:');
    console.log('   npm remove typescript @types/react @types/react-dom');
    console.log('2. Install missing dependencies:');
    console.log('   npm install');
    console.log('3. Start development server:');
    console.log('   npm run dev');
} else {
    console.log('\n⚠️  Some files had errors. Check the logs above.');
}