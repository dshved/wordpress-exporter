const fs = require('fs');

class PostCategoryDomain {
  constructor(obj, post, settings) {
    this.obj = obj;
    this.post = post;
    this.settings = settings;
  }

  extractTags() {
    console.log('Extracting post tags...');
    const tags = this.getPostDomains('tag');
    const tagArray = [];
    if (tags) {
      tags.forEach((tag, index) => {
        const normalizedTag = this.normalizedData(tag, this.obj.rss.channel[0]['wp:tag']);
        if (normalizedTag.id) {
          tagArray.push(normalized_tag);
        }
      })
      return tagArray;
    }
    // getPostDomains('category[domain=post_tag]').each_with_object([]) do |tag, tags|
    //   normalized_tag = normalized_data(tag, '//wp:tag')
    //   tags << normalized_tag unless normalized_tag.empty?
    // end
  }

  extractCategories() {
    console.log('Extracting post categories...');
    const categories = this.getPostDomains('category');
    const categoryArray = [];
    if (categories) {
      categories.forEach((category, index) => {
        const normalizedCategories = this.normalizedData(category, this.obj.rss.channel[0]['wp:category']);
        if (normalizedCategories.id) {
          categoryArray.push(normalizedCategories);
        }
      })
      return categoryArray;
    }
  }


  getPostDomains(domain) {
    return this.post[domain];
  }

  getBlogDomains(domain) {
    return domain;
  }


  getId(domain, prefix) {
    return `${prefix}${domain['wp:term_id'][0]}`;
  }

  getName(domain, namePath) {
    return 'name'
  }


  getDomainId(domain, domainPath) {
    const prefixId = this.getPrefixId(domainPath);
    const namePath = this.getDomainPathName(domainPath);
    const blogDomains = this.getBlogDomains(domainPath);
    const id = blogDomains.find((element) => {
      return element['wp:category_nicename'][0] === domain['$']['nicename'];
    });
    if (id) {
      return this.getId(id, prefixId);
    }
    return;
  }

  normalizedData(domain, path) {
    return { id: this.getDomainId(domain, path), type: 'Entry' };
  }


  getPrefixId(domainPath) {
    return 'category_';
    // return 'wp:category' == domainPath ? 'category_' : 'tag_'
  }

  getDomainPathName(domainPath) {
    // console.log(domainPath);
    return 'wp:tag_name';
    // return 'wp:category' == domainPath ? 'wp:cat_name' : 'wp:tag_name';
  }

}

module.exports = PostCategoryDomain;