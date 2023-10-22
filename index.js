const { default: axios } = require('axios');

let url = 'https://rickandmortyapi.com/api/character/?page=1';

let chars = [];

const getAllChars = async () => {
    while (url) {
        await axios
            .get(url)
            .then((res) => {
                res.data.results.map((char) => chars.push(char));
                url = res.data.info.next ? (url = res.data.info.next) : null;
            })
            .catch((err) => {
                console.error('Failed to fetch', err);
            });
    }
};

getAllChars().then(() => console.log(chars));
