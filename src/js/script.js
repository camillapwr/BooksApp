{ 
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      form: '.filters',
    },
    bookImage: '.book__image'
  };
  const className = {
    favorite: 'favorite',
    hidden: 'hidden'
  };
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };
 
  class BooksList{
    constructor(){
      const thisBooks = this;

      thisBooks.initData();
      thisBooks.getElements();
      thisBooks.render();
      thisBooks.initActions();
      thisBooks.determineRatingBgc();

    }
    initData(){
      const thisBooks = this;
      thisBooks.data = dataSource.books;
    }
    getElements(){
      const thisBooks = this;

      thisBooks.booksImage = document.querySelectorAll(select.bookImage);
      thisBooks.form = document.querySelector(select.containerOf.form);
      thisBooks.booksContainer = document.querySelector(select.containerOf.booksList);
      thisBooks.favoriteBooks = [];
      thisBooks.filters = [];

    }
  
    render(){
      const thisBooks = this;
      for(let book of thisBooks.data){

        book.ratingBgc = thisBooks.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        const generatedHTML = templates.booksTemplate(book);
        const element = utils.createDOMFromHTML(generatedHTML);

        thisBooks.booksContainer.appendChild(element);

      }
    }
  
    initActions (){
    
      const thisBooks = this;

      this.booksContainer.addEventListener('dblclick', function(event){
        event.preventDefault();

        if(!event.target.offsetParent.classList.contains(className.favorite)){
          event.target.offsetParent.classList.add(className.favorite);
          const id = event.target.offsetParent.getAttribute('data-id');

          thisBooks.favoriteBooks.push(id);

        } else if(event.target.offsetParent.classList.contains(className.favorite)){
          event.target.offsetParent.classList.remove(className.favorite);
          const id = event.target.offsetParent.getAttribute('data-id');
          thisBooks.favoriteBooks.pop(id);
        }
        console.log(thisBooks.favoriteBooks);
      });
    
      thisBooks.form.addEventListener('change', function(event){
        event.preventDefault();

        if(event.target.tagName === 'INPUT' && event.target.type ==='checkbox' && event.target.name ==='filter'){
          console.log(event.target.value);

          if(event.target.checked){
            thisBooks.filters.push(event.target.value);
          }else {
            thisBooks.filters.pop(event.target.value);
          }
        }
        console.log(event.target.value);
        console.log(thisBooks.filters);

        thisBooks.filterBooks();
      });
    }

    filterBooks(){

      const thisBooks = this;

      for(let book of thisBooks.data){
        let shouldBeHidden = false;
        for(const filter of thisBooks.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        const bookImage = document.querySelector('.book__image[data-id= "' + book.id + '"]');
      
        if(shouldBeHidden){
          bookImage.classList.add(className.hidden);
        }else{
          bookImage.classList.remove(className.hidden);
        }
      }
    }
  
    determineRatingBgc(rating) {
      let background = '';

      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }else if (rating > 6 && rating<= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }else if(rating > 8 && rating<= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return background;
    }
  }
  const app = {
    init: function(){
      new BooksList();
    }
  };
  app.init();
}
