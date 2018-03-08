const fs = require('fs');
const mkdirp = require('mkdirp');

class PostAttachment {
  constructor(post, settings) {
    this.post = post;
    this.settings = settings;
  }

  attachmentExtractor() {
    const dir = `./${this.settings.dataDir}/assets/attachment_post/`;
    mkdirp(dir, err => {
      if (err) console.error(err);
      const id = this.getAttachmentId();
      const url = this.getAttachmentUrl();
      const description = this.getAttachmentDescription();
      if (url) {
        const json = JSON.stringify({ id, url, description }, null, 2);
        fs.writeFileSync(
          `./${this.settings.dataDir}/assets/attachment_post/${id}.json`,
          json
        );
      }
    });
  }

  getAttachmentUrl() {
    const url = this.post['wp:attachment_url']
      ? this.post['wp:attachment_url'][0]
      : null;
    return url;
  }

  getAttachmentId() {
    const postId = `post_${this.post['wp:post_id'][0]}`;
    return `attachment_${postId}`;
  }

  getAttachmentDescription() {
    return '';
  }
}

module.exports = PostAttachment;
