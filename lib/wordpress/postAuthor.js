const fs = require('fs');

class PostAuthor {
  constructor(obj, post, settings) {
    this.obj = obj;
    this.post = post;
    this.settings = settings;
  }

  authorExtractor() {
    console.log('Extracting post author...');
    const authorId = this.getId();
    return {
      id: authorId,
      type: "Entry"
    }
  }

  getId() {
    return `author_${this.getAuthorIdByLogin(this.getAuthorLogin())}`;
  }

  getAuthorIdByLogin(login) {
    const authors = this.obj.rss.channel[0]['wp:author'];
    const authorId = authors.find((element) => {
      return element['wp:author_login'][0] === login;
    });
    return authorId['wp:author_id'][0];
  }

  getAuthorLogin() {
    return this.post['dc:creator'][0];
  }


}

module.exports = PostAuthor;