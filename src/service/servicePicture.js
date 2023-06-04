import axios from 'axios';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const button = document.querySelector('button');

async function servicePicture(page = 1) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '36867426-6bfbd52b6dcfdc96ad83106d5';

    // return fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=uk`).then(resp => console.log(resp))
    let pictureName = input.value.trim();

    const params = new URLSearchParams({
        key: API_KEY,
        q: pictureName,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page: page,
        per_page: 40
    })
    // console.log(params.toString());
    const pictures = await axios.get(`${BASE_URL}?${params}`);

    //if (!response.ok) {
       //  throw new Error(response.statusText);
    // };   
    //const pictures = await response.json();
    return pictures;
}
export { servicePicture };