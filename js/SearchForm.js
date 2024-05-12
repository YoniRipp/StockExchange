class SearchForm {
    constructor(container) {
        this.container = container;
        this.init();
    }
    displaySpinner() {
        this.spinner.style.display = `block`;
    }
    removeSpinner() {
        this.spinner.style.display = `none`;
    }
    init() {
        this.container.innerHTML = `
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search for a company stock symbol" id="input">
                <button class="btn btn-outline-secondary" type="button" id="searchButton">Search</button>
            </div>
            <div class="d-flex justify-content-center my-4">
                <div class="spinner-border mx-3" role="status" style="display: none;" id="spinner">
                    <span class="visually-hidden"></span>
                </div>
            </div>
        `;
        this.searchButton = this.container.querySelector('#searchButton');
        this.spinner = this.container.querySelector('#spinner');
        this.input = this.container.querySelector('#input');
        this.searchButton.addEventListener('click', () => {
            this.search()
                .then(this.onSearchCallback);
        });
    }

    search() {
        this.displaySpinner();
        const URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.input.value}&limit=10&exchange=NASDAQ`;
        return fetch(URL)
            .then(res => res.json())
            .catch(e => {
                console.error('Error:', e);
            })
            .finally(() => {
                this.removeSpinner();
            });
    }
    onSearch(callback){
        this.onSearchCallback = callback;
    }
}
