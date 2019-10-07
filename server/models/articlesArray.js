const articlesArray = {
  storageArray: [
    {
      id: 1,
      title: 'My first Article',
      article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
      createdOn: 'Tue Oct 01 2019 19:59:28 GMT+0200 (Central Africa Time)',
      authorId: '3',
      categories: ['nature', 'technology', 'art'],
      comments: [],
    },
    {
      id: 2,
      title: 'My first Article',
      article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
      createdOn: 'Tue Oct 01 2019 13:59:28 GMT+0200 (Central Africa Time)',
      authorId: '2',
      categories: ['art'],
      comments: [],
    },
    {
      id: 3,
      title: 'My first Article',
      article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
      createdOn: 'Tue Oct 01 2019 14:59:28 GMT+0200 (Central Africa Time)',
      authorId: '2',
      categories: ['art'],
      comments: [],
    },
    {
      id: 4,
      title: 'My first Article',
      article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
      createdOn: 'Tue Oct 01 2019 15:59:28 GMT+0200 (Central Africa Time)',
      authorId: '2',
      categories: ['nature'],
      comments: [],
    },
    {
      id: 5,
      title: 'My first Article',
      article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
      createdOn: 'Tue Oct 01 2019 16:59:28 GMT+0200 (Central Africa Time)',
      authorId: '2',
      categories: ['nature'],
      comments: [],
    },
  ],

  addArticle(article) {
    this.storageArray.push(article);
  },

  getArticles(key, value) {
    const articles = this.storageArray.filter(article => article[key] === value);
    return articles.length ? articles : null;
  },

  findByCategory(category) {
    const articles = this.storageArray.filter(article => article.categories.includes(category));
    return articles.length ? this.sortLatest(articles) : null;
  },

  getArticleById(id) {
    const matchArticle = this.storageArray.find(article => article.id === id);
    return matchArticle;
  },

  checkAuthor(article, author) {
    return (author.id === article.authorId);
  },

  removeArticle(article) {
    const articleId = this.storageArray.indexOf(article);
    return this.storageArray.splice(articleId, 1);
  },

  sortLatest(array) {
    const latestArticles = array.sort((latest, old) => (
      new Date(old.createdOn) - new Date(latest.createdOn)
    ));

    return latestArticles;
  },

  getLatest() {
    return this.sortLatest(this.storageArray);
  },

  getNewId() {
    return this.storageArray.length + 1;
  },
};

export default articlesArray;
