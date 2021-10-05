import axios from 'axios'

export function getImages() { return axios.get('https://jsonplaceholder.typicode.com/photos') }