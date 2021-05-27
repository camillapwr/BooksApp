{ 
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    bookImage: '.book__image'
  };
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };
 
  const booksContainer = document.querySelector(select.containerOf.booksList);//przeniosłam tu bo stosuje w obu funcjach
  
  function render(){
    for(let book of dataSource.books){
      const generatedHTML = templates.booksTemplate(book);
      const element = utils.createDOMFromHTML(generatedHTML);

      booksContainer.appendChild(element);

    }
  }
  render();

  const favoriteBooks = [];
  console.log(favoriteBooks);

  function initActions (){
    
    const booksImage = booksContainer.querySelectorAll(select.bookImage);
    for(let image of booksImage){
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        image.classList.add('favorite');
        const id = image.getAttribute('data-id');

        favoriteBooks.push(id);
        console.log(favoriteBooks);
        
      });
    }
  }
  initActions();

}///ostatni 
