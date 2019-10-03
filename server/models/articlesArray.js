const articlesArray = {
  storageArray: [
    {
      id: 1,
      title: 'My first Article',
      article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
      createdOn: 'Tue Oct 01 2019 19:59:28 GMT+0200 (Central Africa Time)',
      authorId: 'dd7f21c1-b92c-4703-a6d9-3ec03eef4da9',
      comments: [],
    },
    {
      id: 2,
      title: 'My first Article',
      article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
      createdOn: 'Tue Oct 01 2019 13:59:28 GMT+0200 (Central Africa Time)',
      authorId: '538bdd77-38af-4928-9bb0-d02461c7da34',
      comments: [],
    },
    {
      id: 3,
      title: 'My first Article',
      article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
      createdOn: 'Tue Oct 01 2019 14:59:28 GMT+0200 (Central Africa Time)',
      authorId: '538bdd77-38af-4928-9bb0-d02461c7da34',
      comments: [],
    },
    {
      id: 4,
      title: 'My first Article',
      article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
      createdOn: 'Tue Oct 01 2019 15:59:28 GMT+0200 (Central Africa Time)',
      authorId: '538bdd77-38af-4928-9bb0-d02461c7da34',
      comments: [],
    },
    {
      id: 5,
      title: 'My first Article',
      article: 'This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting, Thank you for reading hope to see you next time.',
      createdOn: 'Tue Oct 01 2019 16:59:28 GMT+0200 (Central Africa Time)',
      authorId: '538bdd77-38af-4928-9bb0-d02461c7da34',
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

  getLatest() {
    const latestArticles = this.storageArray.sort((a, b) => (
      new Date(a.createdOn) - new Date(b.createdOn)
    ));
    return latestArticles;
  },

  getNewId() {
    return this.storageArray.length + 1;
  },
};

export default articlesArray;
