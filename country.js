const countryName = new URLSearchParams(location.search).get('name')
const flagsImg = document.querySelector(".country-details img")
const countryTitle = document.querySelector('.country-title')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        console.log(country)
        flagsImg.src = country.flags.svg
        countryTitle.innerText = country.name.common

        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        } else {
            nativeName.innerText = country.name.common
        }

        population.innerText = country.population.toLocaleString('en-EU')

        region.innerText = country.region

        if (country.subRegion) {
            subRegion.innerText = country.subregion
        }

        if (country.capital) {
            capital.innerText = country.capital
        }

        topLevelDomain.innerText = country.tld.join(',  ')
        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(', ')
        }

        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ')
        }
    })