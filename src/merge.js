const fs = require('fs');
const glob = require('glob');
const {create} = require('xmlbuilder2');

/**
 * @param {Array<string>} files The XML results to merge.
 * @param {string} into Path where to save the merged XML result.
 * @return {Promise<*>}
 */
function merge(files, into) {
  return new Promise((resolve) => {
    const expanded = files.map(
        (pattern) => glob.sync(pattern, {dot: true}),
    ).flat();
    const merged = create({
      testExecutions: {'@version': 1},
    });
    expanded.forEach((file) => {
      const xml = fs.readFileSync(file, {encoding: 'utf-8'});
      const document = create(xml, {version: '1.0'});
      document.root().each(
          (builder) => {
            if (builder.node.nodeName.toLowerCase() === 'file') {
              merged.root().import(builder);
            }
          },
          true,
          true,
      );
    });
    fs.writeFileSync(
        into,
        merged.toString({prettyPrint: true}),
        {encoding: 'utf-8'},
    );
    resolve();
  });
}

module.exports = {merge};
