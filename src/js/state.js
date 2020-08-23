import api from './service.js';

class Locations {
    constructor (api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
    }

    async getDataLocations () {
        let response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
        ])
        
        let [countries, cities] = response;
        this.countries = this.upgradeCountryResponse(countries);
        this.cities = this.upgradeCityResponse(cities);
        return response;
    }

    upgradeCountryResponse (countries) {
        // {country code: {country}}
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {})

    }
    upgradeCityResponse (cities) {
        // {'city, country' : {city}}

        return cities.reduce((acc, city) => {
            const country = this.getCountryByCode(city.country_code);
            const city_name = city.name || city.name_translations.en;
            const key = `${city_name}, ${country}`;
            acc[key] = city;
            return acc;
        }, {})
    }
    getCountryByCode (code) {
        return this.countries[code].name;
    }

    getCitiesByCountryCode (code) {
        
        return this.cities.filter(city => city.country_code === code);
        
    }
}

const locations = new Locations(api);

// async function dataPoints (countriesFun, citiesFun) {
//     const countries = await countriesFun;
//     const cities = await citiesFun;

//     const locations = new Locations(countries, cities);

//     return locations;
// }


// async function getCountries () {
//     const countries = await api.countries();
//     console.log(countries);
    
//     return countries;
// } 

// async function getCities () {
//     const cities = await api.cities();
//     console.log(cities);
    
//     return cities;
// } 



export default locations;
