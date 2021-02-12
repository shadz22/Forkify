import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newElm, i) => {
      const curElm = currentElements[i];
      // console.log(curElm, curElm.isEqualNode(newElm));

      // Updates changed TEXT
      if(!newElm.isEqualNode(curElm) && newElm.firstChild?.nodeValue.trim() !== '') {
        curElm.textContent = newElm.textContent;
      }

      // Updates changed ATTRIBUTES
      if(!newElm.isEqualNode(curElm)) {
        
        Array.from(newElm.attributes).forEach(attr => {
          curElm.setAttribute(attr.name, attr.value)
        })
      }
    })
  }

  _clear() {
    this._parentElement.innerHTML = "";  
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `
    this._clear();
    this._parentElement.insertAdjacentElement('afterbegin', markup);
  }
}