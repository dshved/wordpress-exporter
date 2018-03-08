#!/usr/bin/env node
const program = require('commander');
const { exporter } = require('./../index');

program
  .version('0.2.0', '-v, --version')
  .description('Executable file of Wordpress exporter')
  .option('--config-file <path>', 'config file')
  .option(
    '--extract-to-json',
    'Extract data from Wordpress XML dump file and save as JSON files'
  )
  .option(
    '--create-contentful-model-from-json',
    'Create content types files, based on contentful structure json file. View README'
  )
  .option(
    '--convert-content-model-to-json',
    'Transform content_model file into contentful_structure import form. View README'
  )
  .option(
    '--convert-markup',
    'Convert markup to markdown in post content. View README'
  )
  .option(
    '-c, --cheese [type]',
    'Add the specified type of cheese [marble]',
    'marble'
  )
  .parse(process.argv);

if (program.configFile && program.extractToJson) {
  exporter(program.configFile);
}
if (!program.configFile) {
  console.log(
    `Missing '--config-file' argument.\nThe correct is form: 'wordpress-exporter --config-file PATH_TO_CONFIGURATION_FILE --action'.\nView README.`
  );
}
