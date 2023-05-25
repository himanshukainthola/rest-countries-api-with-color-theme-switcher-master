const themeChanger = document.querySelector('.theme-switcher')
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
const borderCountries = document.querySelector('.border-countries')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
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

        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {

                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.innerText = borderCountry.name.common
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        borderCountries.append(borderCountryTag)
                    })
            });
        }
    })


function changeColor() {
    const bodyElem = document.body
    let dataTheme = bodyElem.getAttribute('theme')
    let newTheme = (dataTheme === 'light') ? 'dark' : 'light'

    bodyElem.setAttribute('theme', newTheme)

    localStorage.setItem('theme', newTheme)
}


themeChanger.addEventListener('click', changeColor)

let local = localStorage.getItem('theme')
if (local === 'dark') {
    document.body.setAttribute('theme', 'dark')
}