export const PORT = 5555;

// export const mongoDbUrl = 'mongodb+srv://quandaworld:9BDgo85OYXzGIh5u@booklibrary.fokwhok.mongodb.net/books-collection?retryWrites=true&w=majority&appName=BookLibrary';
export const mongoDbUrl = (() => {
  const providedUrl = 'mongodb+srv://quandaworld:9BDgo85OYXzGIh5u@booklibrary.fokwhok.mongodb.net/books-collection';
  const defaultUrl = 'mongodb://localhost:27017/';
  
  return providedUrl || defaultUrl;
})();
