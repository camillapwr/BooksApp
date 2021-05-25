{ 
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
  };
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  function render(){
      for(let book of dataSource.books){
          const generatedHTML = templates.booksTemplate(book);
          const element = utils.createDOMFromHTML(generatedHTML);
          const booksContainer = document.querySelector(select.containerOf.booksList);
          booksContainer.appendChild(element);

      }
    }
render();

  }///ostatni 















}