const fs = require('fs');
const mkdirp = require('mkdirp');

class Author {
  constructor(obj, settings) {
    this.obj = obj;
    this.settings = settings;
  }

  authorExtractor() {
    console.log('Extracting authors...');
    const dir = `./${this.settings.dataDir}/entries/author`;
    mkdirp(dir, err => {
      if (err) console.error(err);
      else this.extractAuthors();
    });
  }

  extractAuthors() {
    const authors = this.getAuthors();
    const authorArray = [];
    authors.forEach(item => {
      const author = this.extractedData(item);
      const { id } = author;
      const json = JSON.stringify(author, null, 2);
      fs.writeFileSync(
        `./${this.settings.dataDir}/entries/author/${id}.json`,
        json
      );
      authorArray.push({
        id,
        type: 'Entry'
      });
    });
    return authorArray;
  }

  extractedData(author) {
    return {
      id: this.getId(author),
      email: this.getEmail(author),
      display_name: this.getDisplayName(author),
      first_name: this.getFirstName(author),
      last_name: this.getLastName(author),
      wordpress_login: this.getLogin(author)
    };
  }

  getAuthors() {
    return this.obj.rss.channel[0]['wp:author'];
  }

  getId(author) {
    return `author_${author['wp:author_id'][0]}`;
  }

  getLogin(author) {
    return author['wp:author_login'][0];
  }

  getEmail(author) {
    return author['wp:author_email'][0];
  }

  getDisplayName(author) {
    return author['wp:author_display_name'][0];
  }

  getFirstName(author) {
    return author['wp:author_first_name'][0];
  }

  getLastName(author) {
    return author['wp:author_last_name'][0];
  }
}

module.exports = Author;
