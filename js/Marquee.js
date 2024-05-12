class Marquee {
    constructor(element) {
        this.element = element;
        this.load();
    }
    async load() {
        try {
            const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?limit=100&exchange=NASDAQ`);
            const companies = await response.json();
            const marqueeContentArray = companies.map(company =>
                `<span class="mx-2">${company.symbol}:${this.displayPrice(company.price)}</span>`
            );
            this.element.innerHTML = `<div class="marquee-content">${marqueeContentArray.join('')}</div>`;
        } catch (e) {
            console.error(`Error:`, e);
        }
    }
    displayPrice(price) {
        return `<span style="color: ${price > 0 ? 'lightgreen' :  'red'};">$${price ? price : 0}</span>`;
    }

}
document.addEventListener('DOMContentLoaded', () => {
    const marqueeElement = document.getElementById('marquee');
    new Marquee(marqueeElement);
});