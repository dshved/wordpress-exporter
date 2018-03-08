const fs = require('fs');
const mkdirp = require('mkdirp');

class Category {
  constructor(obj, settings) {
    this.obj = obj;
    this.settings = settings;
  }

  categoriesExtractor() {
    console.log('Extracting categories...');
    const dir = `./${this.settings.dataDir}/entries/category`;
    mkdirp(dir, err => {
      if (err) console.error(err);
      else this.extractCategories();
    });
  }

  extractCategories() {
    const categories = this.getCategories();
    const categoryArray = [];
    categories.forEach(item => {
      const category = this.extractedData(item);
      const { id } = category;
      const json = JSON.stringify(category, null, 2);
      fs.writeFileSync(
        `./${this.settings.dataDir}/entries/category/${id}.json`,
        json
      );
      categoryArray.push({
        id,
        type: 'Entry'
      });
    });
    return categoryArray;
  }

  extractedData(category) {
    return {
      id: this.getId(category),
      nicename: this.getNiceName(category),
      name: this.getName(category)
    };
  }

  getCategories() {
    return this.obj.rss.channel[0]['wp:category'];
  }

  getId(category) {
    return `category_${category['wp:term_id'][0]}`;
  }

  getNiceName(category) {
    return category['wp:category_nicename'][0];
  }

  getName(category) {
    return category['wp:cat_name'][0];
  }
}

module.exports = Category;
