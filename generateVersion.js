const fs = require('fs');
const { execSync } = require('child_process');

// Function to get the last commit date
const getLastCommitDate = () => {
  try {
    const date = execSync('git log -1 --format=%cd').toString().trim();
    return date;
  } catch (error) {
    console.error('Error getting last commit date:', error);
    return 'Unknown';
  }
};

// Function to get the current version
const getVersion = () => {
  // Get the number of commits
  const commitCount = execSync('git rev-list --count HEAD').toString().trim();
  // Define the version
  const version = `1.0.${commitCount}`;
  return version;
};

// Function to write version information to a file
const writeVersionFile = () => {
  const version = getVersion();
  const lastCommitDate = getLastCommitDate();
  console.log('Version:', version);
  console.log('Last Commit Date:', lastCommitDate);
  const versionInfo = `export const VERSION = '${version}';\nexport const UPDATED = '${lastCommitDate}';\n`;

  fs.writeFileSync('src/version.js', versionInfo, 'utf8');
  console.log('Version file updated successfully');
};

// Execute the function to write the version file
writeVersionFile();
