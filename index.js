const fs = require('fs');
const Export = require('./lib/wordpress/export');
const parseString = require('xml2js').parseString;

async function xml2json(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, json) => {
      if (err) {
        reject(err);
      } else {
        resolve(json);
      }
    });
  });
}

async function exporter(path) {
  const config = JSON.parse(fs.readFileSync(path, 'utf8'));
  const data = fs.readFileSync(config.wordpressXmlPath);
  const file = await xml2json(data);
  const blog = new Export(file, config);
  blog.exportBlog();
}

module.exports = {
  exporter
};
