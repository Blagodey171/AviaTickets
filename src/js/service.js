import config from './config.js';

class Request {
    constructor (config) {
        this.url = config.url;
    }

    async countries() {
        try {
            const response = await fetch(`${this.url}/countries`);
            
            // console.log(response.status);

            if (Math.floor(response.status / 100) != 2) {
                return console.error(`Статус запроса ${response.status}`);
            }
             
            return await response.json()
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async cities () {
        try {
            const response = await fetch(`${this.url}/cities`);
            
            // console.log(response.status);

            if (Math.floor(response.status / 100) != 2) {
                return console.error(`Статус запроса ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    
}

const api = new Request(config);

export default api;