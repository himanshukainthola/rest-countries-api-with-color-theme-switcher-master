const countriesContainer = document.querySelector('.countries-containter')
const filterByRegion = document.querySelector('#filter-by-region');
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-switcher');


let allCountriesData

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
        allCountriesData = data
    })

filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((res) => res.json())
        .then(renderCountries)

})


function renderCountries(data) {
    countriesContainer.innerHTML = " "
    data.forEach((country) => {

        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `/country.html?name=${country.name.common}`

        countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.flags.alt}">
                <div class="card-text">
                    <h3 class="card-tittle">${country.name.common}</h3>
                    <p><b>Population</b>: ${country.population.toLocaleString('en-EU')}</p>
                    <p><b>Region</b>: ${country.region}</p>
                    <p><b>Capital</b>: ${country.capital}</p>
                </div>
            `
        countriesContainer.append(countryCard)


    })
}

function changeColor() {
    const bodyElem = document.body
    let dataTheme = bodyElem.getAttribute('theme')
    let newTheme = (dataTheme === 'light') ? 'dark' : 'light'

    bodyElem.setAttribute('theme', newTheme)

    localStorage.setItem('theme', newTheme)
}

searchInput.addEventListener('input', (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
})

themeChanger.addEventListener('click', changeColor)

let local = localStorage.getItem('theme')
if (local === 'dark') {
    document.body.setAttribute('theme', 'dark')
}