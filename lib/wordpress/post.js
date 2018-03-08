const fs = require('fs');
const mkdirp = require('mkdirp');
const PostAuthor = require('./postAuthor.js');
const PostAttachment = require('./postAttachment.js');
const PostCategoryDomain = require('./postCategoryDomain.js');

class Post {
  constructor(obj, settings) {
    this.obj = obj;
    this.settings = settings;
  }

  postExtractor() {
    console.log('Extracting posts...');
    const dir = `./${this.settings.dataDir}/entries/post`;
    mkdirp(dir, err => {
      if (err) console.error(err);
      else this.extractPosts();
    });
  }

  extractPosts() {
    const posts = this.getPosts();
    const postArray = [];
    posts.forEach(item => {
      const post = this.extractedData(item);
      const { id } = post;
      const json = JSON.stringify(post, null, 2);
      fs.writeFileSync(
        `./${this.settings.dataDir}/entries/post/${id}.json`,
        json
      );
      postArray.push({
        id,
        type: 'Entry'
      });
    });
    return postArray;
  }

  getPosts() {
    return this.obj.rss.channel[0]['item'];
  }

  extractedData(post) {
    const postEntry = this.basicPostData(post);
    return Object.assign(
      postEntry,
      this.assignContentElementsToPost(post, postEntry)
    );
  }

  getAttachment(post) {
    const attachment = new PostAttachment(post, this.settings);
    return attachment.attachmentExtractor();
  }

  getAuthor(post) {
    const author = new PostAuthor(this.obj, post, this.settings);
    return author.authorExtractor();
  }

  getTags(post) {
    const tags = new PostCategoryDomain(this.obj, post, this.settings);
    return tags.extractTags;
  }

  getCategories(post) {
    const categories = new PostCategoryDomain(this.obj, post, this.settings);
    return categories.extractCategories();
  }

  basicPostData(post) {
    return {
      id: this.getId(post),
      title: this.getTitle(post),
      wordpress_url: this.getUrl(post),
      content: this.getContent(post),
      created_at: this.getCreatedAt(post)
    };
  }

  assignContentElementsToPost(post, postEntry) {
    const attachment = this.getAttachment(post);
    const tags = this.getTags(post);
    const categories = this.getCategories(post);
    postEntry.author = this.getAuthor(post);
    if (attachment) {
      postEntry.attachment = attachment;
    }
    if (tags) {
      postEntry.tags = tags;
    }
    if (categories) {
      postEntry.categories = categories;
    }
    // postEntry.attachment = this.getAttachment ? this.getAttachment : null;
    // postEntry.tags = this.getTags ? this.getTags : null;
    // postEntry.categories = categories ? categories : null;
    return postEntry;
  }

  getId(post) {
    return `post_${post['wp:post_id'][0]}`;
  }

  getTitle(post) {
    return post['title'][0];
  }

  getUrl(post) {
    return post['link'][0];
  }

  getContent(post) {
    return post['content:encoded'][0];
  }

  getCreatedAt(post) {
    const date = post['wp:post_date']
      ? new Date(post['wp:post_date'])
      : new Date();
    return date;
  }
}

module.exports = Post;
