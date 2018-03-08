const fs = require('fs');
const Blog = require('./blog');

class Export {
  constructor(obj, settings) {
    this.obj = obj;
    this.settings = settings || { dataDir: 'data' };
  }

  exportBlog() {
    const blog = new Blog(this.obj, this.settings);
    blog.blogExtractor();
  }
}

module.exports = Export;
