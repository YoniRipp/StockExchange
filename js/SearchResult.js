const defaultImg = '/images/notFound.jpg';
class SearchResults {
    constructor(container) {
        this.container = container;
        this.spinner = document.getElementById("spinner");
        this.init();
    }
    init() {
        this.container.innerHTML = `<ul class="list-group list-group-flush d-inline-flex container-effect" id="results"></ul>`;
        this.resultsContainer = this.container.querySelector('#results');
        this.defaultImg = '/images/notFound.jpg';
    }
    renderResults(companies) {
        this.resultsContainer.innerHTML = '';
        companies.forEach(company => {
            this.getProfile(company.symbol)
                .then(company => {
                    this.resultsContainer.innerHTML += this.renderResult(company);
                })
                .catch(e => {
                    console.error('Error:', e);
                })
        });
    }
    renderResult(company) {
        let color = company.profile.changes >= 0 ? 'lightgreen' : 'red';
        let sign = company.profile.changes >= 0 ? '+' : '';
        return `<li class="list-group-item d-flex">
                        <div class="d-flex align-items-center">
                            <img class="symbol mx-2" src="${company.profile.image}" onerror="this.src='${defaultImg}';"></img>
                            <a class="symbol mx-2" href="company.html?symbol=${company.symbol}">${company.profile.companyName}</a>
                            <span class="changes mx-3 my-2">(${company.symbol})<span style="color: ${color};"> (${sign}${company.profile.changes.toFixed(2)}%)</span></span>
                        </div>
                </li>`;
    }

    getProfile(symbol) {
        const URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
        return fetch(URL)
            .then(res => res.json())
            .catch(e => {
                console.error('Error:', e);
            })
    }
}