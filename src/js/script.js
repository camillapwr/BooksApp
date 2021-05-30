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
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };
 
  const booksContainer = document.querySelector(select.containerOf.booksList);//przeniosłam tu bo stosuje w obu funcjach
  
  function render(){

    for(let book of dataSource.books){

      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      const generatedHTML = templates.booksTemplate(book);
      const element = utils.createDOMFromHTML(generatedHTML);

      booksContainer.appendChild(element);

    }
  }
  render();

  const favoriteBooks = [];

  const filters = [];
  console.log(favoriteBooks);

  function initActions (){
    
    //const booksImage = booksContainer.querySelectorAll(select.bookImage);
    //for(let image of booksImage){

    booksContainer.addEventListener('dblclick', function(event){
      event.preventDefault();
      if(!event.target.offsetParent.classList.contains('favorite')){
        event.target.offsetParent.classList.add('favorite');
        const id = event.target.offsetParent.getAttribute('data-id');

        favoriteBooks.push(id);

      } else if(event.target.offsetParent.classList.contains('favorite')){
        event.target.offsetParent.classList.remove('favorite');
        const id = event.target.offsetParent.getAttribute('data-id');
        favoriteBooks.pop(id);
      }
      console.log(favoriteBooks);
    });
    const form = document.querySelector(select.containerOf.form);
    form.addEventListener('change', function(event){
      event.preventDefault();

      if(event.target.tagName === 'INPUT' && event.target.type ==='checkbox' && event.target.name ==='filter'){
        console.log(event.target.value);

        if(event.target.checked){
          filters.push(event.target.value);
        }else {
          filters.pop(event.target.value);
        }
      }
      console.log(event.target.value);
      console.log(filters);

      filterBooks();
    });
  }
  initActions();
  function filterBooks(){
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      for(const filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const bookImage = document.querySelector('.book__image[data-id= "' + book.id + '"]');
      
      if(shouldBeHidden){
        bookImage.classList.add('hidden');
      }else{
        bookImage.classList.remove('hidden');
      }
    }
  }
  
  function determineRatingBgc(rating) {
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
  
}///ostatni 
