const spinner = document.getElementById("spinner");
const companyName = document.getElementById('companyName');
const image = document.getElementById('image');
const description = document.getElementById('description');
const price = document.getElementById('price');
const priceChange = document.getElementById('priceChange');
const cavas = document.getElementById('stockChart');
const defaultImg = '/images/notFound.jpg';

//--- Helpers ---//
function displaySpinner() {
    spinner.style.display = 'block';
}
function removeSpinner() {
    spinner.style.display = 'none';
}
//--------------//

//--- Getters ---//
async function getProfile(symbol) {
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);
    return await response.json();
}
async function getHistory(symbol) {
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`);
    return await response.json();
}
//--------------//

//--- Transitions ---//

function displayCompanyProfile(company) {
    companyName.innerHTML = `<a href="${company.website}">${company.companyName}</a>`;
    image.src = company.image;
    // Incase it has no image
    image.onerror = function() {
        this.src = defaultImg;
    };
    description.textContent = company.description;
    price.textContent = `Stock Price: $${company.price}`;
    displayPriceChange(company.changes,priceChange);
}
// Check if change is positive or negative
function displayPriceChange(changes,priceChange){
    if (changes >= 0) {
        priceChange.textContent = `(+${changes}%)`;
        priceChange.style.color = `lightgreen`; 
    } else {
        priceChange.textContent = `(${changes}%)`;
        priceChange.style.color = `red`; 
    }
}
async function loadPage() {
    displaySpinner();
    try {
        const URL = new URLSearchParams(window.location.search);
        const symbol = URL.get(`symbol`);
        const company = await getProfile(symbol);
        displayCompanyProfile(company.profile)
        await createChart(symbol);
        removeSpinner();
    } catch (e) {
        console.error(`Error:`, e);
       
    }
}
//------------------//

//---   Chart   ----//
async function createChart(symbol) {
    const chart = await getHistory(symbol);
    const data = chart.historical.map(item => item.close).reverse();
    const labels = chart.historical.map(item => item.date).reverse();
    new Chart(cavas, {
        type: `line`,
        data: {
            labels: labels,
            datasets: [{
                label: `Stock Price`,
                data: data,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
//------------------//
document.addEventListener('DOMContentLoaded', () => {
    loadPage();
});

