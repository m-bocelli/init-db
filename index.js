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

getAllChars().then(() =>
    chars.map((char) =>
        axios.put(
            `https://rm-card-default-rtdb.firebaseio.com/library/${char.id}.json`,
            {
                id: char.id,
                name: char.name,
                status: char.status,
                type:
                    char.type.length > 0
                        ? `${char.species}: ${char.type}`
                        : char.species,
                gender: char.gender,
                origin: char.origin.name,
                image: char.image,
                rarity: `${char.episode.length}`,
            }
        )
    )
);
