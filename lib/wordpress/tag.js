const fs = require('fs');
const mkdirp = require('mkdirp');

class Tag {
  constructor(obj, settings) {
    this.obj = obj;
    this.settings = settings;
  }

  tagExtractor() {
    console.log('Extracting tags...');
    const dir = `./${this.settings.dataDir}/entries/tag`;
    mkdirp(dir, err => {
      if (err) console.error(err);
      else this.extractTags();
    });
  }

  extractTags() {
    const tags = this.getTags();
    const tagArray = [];
    tags.forEach(item => {
      const tag = this.extractedData(item);
      const { id } = tag;
      const json = JSON.stringify(tag, null, 2);
      fs.writeFileSync(
        `./${this.settings.dataDir}/entries/tag/${id}.json`,
        json
      );
      tagArray.push({
        id,
        type: 'Entry'
      });
    });
    return tagArray;
  }

  extractedData(tag) {
    return {
      id: this.getId(tag),
      nicename: this.getSlug(tag),
      name: this.getName(tag)
    };
  }

  getTags() {
    return this.obj.rss.channel[0]['wp:tag'];
  }

  getId(tag) {
    return `tag_${tag['wp:term_id'][0]}`;
  }

  getSlug(tag) {
    return tag['wp:tag_slug'][0];
  }

  getName(tag) {
    return tag['wp:tag_name'][0];
  }
}

module.exports = Tag;
