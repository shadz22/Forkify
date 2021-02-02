import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View{

  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    console.log(numPages);
  // 1) Page 1 and there are other pages
    if (this._data.page === 1 && numPages > 1 )
    return 'Page 1 and others';

  // 2) Page 1 and No other pages

  // 3) on Last page

  // 4) other pages 
  }
}

export default new PaginationView();