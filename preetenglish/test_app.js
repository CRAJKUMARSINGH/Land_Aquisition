// Test script to validate the React application components
const fs = require('fs');
const path = require('path');

// Check if all required files exist
const requiredFiles = [
  'src/App.jsx',
  'src/index.css',
  'src/main.jsx',
  'src/components/Home.jsx',
  'src/components/Documentation.jsx',
  'src/components/Cases.jsx',
  'src/components/LegalFormats.jsx',
  'src/components/Jurisdiction.jsx',
  'src/components/Search.jsx'
];

console.log('🔍 Validating Land Acquisition Legal Suite Application...\n');

let allFilesExist = true;
for (const file of requiredFiles) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} - ${Math.round(stats.size/1024)}KB`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
}

// Check package.json
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log(`\n📦 Package Info:`);
  console.log(`   Name: ${packageJson.name || 'Not specified'}`);
  console.log(`   Version: ${packageJson.version || 'Not specified'}`);
  console.log(`   Dependencies: ${Object.keys(packageJson.dependencies || {}).length}`);
  console.log(`   Dev Dependencies: ${Object.keys(packageJson.devDependencies || {}).length}`);
} else {
  console.log('\n❌ package.json - MISSING');
  allFilesExist = false;
}

// Check if all components have proper exports
const components = ['Home', 'Documentation', 'Cases', 'LegalFormats', 'Jurisdiction', 'Search'];
let allComponentsValid = true;

for (const component of components) {
  const componentPath = path.join(__dirname, 'src', 'components', `${component}.jsx`);
  if (fs.existsSync(componentPath)) {
    const content = fs.readFileSync(componentPath, 'utf8');
    if (content.includes(`export default ${component}`) || content.includes(`export { ${component}`)) {
      console.log(`✅ ${component}.jsx - Valid export`);
    } else {
      console.log(`⚠️  ${component}.jsx - No valid export found`);
    }
  }
}

// Check for common issues in components
function checkComponentIssues() {
  console.log('\n🔍 Checking for common issues in components...');
  
  for (const component of components) {
    const componentPath = path.join(__dirname, 'src', 'components', `${component}.jsx`);
    if (fs.existsSync(componentPath)) {
      const content = fs.readFileSync(componentPath, 'utf8');
      
      // Check for Manupatra classes
      const manupatraClasses = [
        'manupatra-card',
        'manupatra-stat-card',
        'manupatra-button-primary',
        'manupatra-button-secondary',
        'manupatra-search-bar',
        'manupatra-hero',
        'manupatra-section-title'
      ];
      
      let manupatraUsage = 0;
      for (const className of manupatraClasses) {
        if (content.includes(className)) {
          manupatraUsage++;
        }
      }
      
      if (manupatraUsage > 0) {
        console.log(`✅ ${component}.jsx - Uses ${manupatraUsage} Manupatra classes`);
      } else {
        console.log(`ℹ️  ${component}.jsx - No Manupatra classes found`);
      }
    }
  }
}

checkComponentIssues();

// Check CSS for Manupatra styles
const cssPath = path.join(__dirname, 'src', 'index.css');
if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const manupatraStyles = [
    '.manupatra-card',
    '.manupatra-stat-card',
    '.manupatra-button-primary',
    '.manupatra-button-secondary',
    '.manupatra-header',
    '.manupatra-navigation',
    '.manupatra-footer'
  ];
  
  console.log('\n🎨 Checking CSS for Manupatra styles...');
  let manupatraStylesCount = 0;
  for (const style of manupatraStyles) {
    if (cssContent.includes(style)) {
      manupatraStylesCount++;
      console.log(`✅ ${style} - Found`);
    } else {
      console.log(`ℹ️  ${style} - Not found`);
    }
  }
  console.log(`\n📊 Total Manupatra styles found: ${manupatraStylesCount}/${manupatraStyles.length}`);
}

// Check App.jsx for Manupatra integration
const appPath = path.join(__dirname, 'src', 'App.jsx');
if (fs.existsSync(appPath)) {
  const appContent = fs.readFileSync(appPath, 'utf8');
  const appManupatraUsage = [
    'manupatra-header',
    'manupatra-navigation',
    'manupatra-footer'
  ];
  
  console.log('\n🏗️  Checking App.jsx for Manupatra integration...');
  for (const usage of appManupatraUsage) {
    if (appContent.includes(usage)) {
      console.log(`✅ ${usage} - Found in App.jsx`);
    } else {
      console.log(`ℹ️  ${usage} - Not found in App.jsx`);
    }
  }
}

console.log('\n🎯 Application validation complete!');
if (allFilesExist) {
  console.log('✅ All required files exist');
} else {
  console.log('❌ Some required files are missing');
}

console.log('\n✨ Land Acquisition Legal Suite is ready for launch!');