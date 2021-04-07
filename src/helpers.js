const fs = require('fs');
const path = require('path');

const getComponentName = (fileContent, pattern) => {
  const matches = fileContent.match(pattern);

  if (matches === null) {
    throw new Error("Couldn't find component name, check componentNamePattern");
  }

  const match = matches[0];

  return match.toLowerCase().replace(/\//, '-');
};

const getComponentStoriesNames = (fileContent, pattern) => {
  const match = fileContent.match(pattern);

  if (match === null) {
    throw new Error("Couldn't find story name, check storyNamePattern");
  }

  return match.map((storyName) => storyName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase());
};

const getTestDirectoryPath = (pathToStory, relatedPathToTestDirectory) =>
  path.resolve(pathToStory, relatedPathToTestDirectory);

const generateTest = (
  testDirectoryPath,
  componentName,
  componentStoryName,
  postfix,
  testTemplate
) => {
  const testPath = path.resolve(testDirectoryPath, `${componentStoryName}.${postfix}.js`);

  if (fs.existsSync(testPath)) {
    return;
  }

  fs.createWriteStream(testPath, 'utf8');
  fs.writeFileSync(testPath, testTemplate(componentName, componentStoryName), 'utf8');
};

module.exports = {
  generateTest,
  getComponentName,
  getComponentStoriesNames,
  getTestDirectoryPath,
};
