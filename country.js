const countryName = new URLSearchParams(location.search).get('name')
const flagsImg = document.querySelector(".country-details img")
const countryTitle = document.querySelector('.country-title')



fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        console.log(country)
        flagsImg.src = country.flags.svg
        countryTitle.innerText = country.name.common

        if (country.name.nativeName) {
            console.log(object.values(country.name.nativeName)[0].common)
        }
    })