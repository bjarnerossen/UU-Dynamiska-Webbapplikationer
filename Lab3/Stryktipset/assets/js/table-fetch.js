export const tableFetch = () => {
    return fetch('https://stryk.herokuapp.com/strycket2022')
    .then(response => response.json())
    .catch(error => console.error(error));
    };