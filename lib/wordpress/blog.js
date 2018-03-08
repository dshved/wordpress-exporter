const fs = require('fs');
const Author = require('./author');
const Category = require('./category');
const Post = require('./post');
const Tag = require('./tag');
const mkdirp = require('mkdirp');

class Blog {
  constructor(obj, settings) {
    this.obj = obj;
    this.settings = settings;
  }

  blogExtractor() {
    const dir = `./${this.settings.dataDir}/entries/blog`;
    mkdirp(dir, err => {
      if (err) console.error(err);
      else this.extractBlog();
    });
  }

  extractBlog() {
    console.log('Extracting blog data...');
    const blog = this.extractedData();
    const json = JSON.stringify(blog, null, 2);
    fs.writeFileSync(
      `./${this.settings.dataDir}/entries/blog/blog_1.json`,
      json
    );
  }

  extractedData() {
    return {
      id: 'blog_id',
      title: this.getTitle(),
      authors: this.getAuthors(),
      posts: this.getPosts(),
      categories: this.getCategories(),
      tags: this.getTags()
    };
  }

  getAuthors() {
    const author = new Author(this.obj, this.settings);
    return author.authorExtractor();
  }

  getPosts() {
    const post = new Post(this.obj, this.settings);
    return post.postExtractor();
  }

  getCategories() {
    const category = new Category(this.obj, this.settings);
    return category.categoriesExtractor();
  }

  getTags() {
    const tag = new Tag(this.obj, this.settings);
    return tag.tagExtractor();
  }

  getTitle() {
    return this.obj.rss.channel[0].title[0];
  }
}

module.exports = Blog;
