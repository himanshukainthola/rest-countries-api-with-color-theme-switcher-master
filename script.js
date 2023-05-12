const countriesContainer = document.querySelector('.countries-containter')

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
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
    })



