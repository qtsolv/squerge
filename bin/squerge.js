#!/usr/bin/env node

const args = require('yargs');
const {merge} = require('../src/merge');

args.command(
    '$0 [sources..]', 'Merge multiple SonarQube execution reports.',
    (args) => {
      args.positional('sources', {
        describe: 'Source or input files',
        type: 'array',
      });
    })
    .option('output', {
      alias: 'o',
      demandOption: true,
      describe: 'Output file',
      type: 'string',
    })
    .help();

const {sources, output} = args.argv;

merge(sources, output)
    .then(() => console.info(`Reports merged into ${output}`))
    .catch((error) => {
      console.error('Failed to merge reports.');
      console.error(error);
      process.exit(1);
    });
