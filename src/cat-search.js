const url = 'https://api.thecatapi.com/v1/breeds';
const catInfoUrl = 'https://api.thecatapi.com/v1/images/search?breed_ids=';
const options = {
  headers: {
    'x-api-key':
      'live_rXvzCi1moeTLygU8rBTnVD6ehRR0Epach7KXn7cu0H6esWQ265Sjy8F8yms7E9n8',
  },
};

function fetchBreeds() {
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      throw new Error(error);
    });
}

function fetchCatByBreed(breedId) {
  return fetch(catInfoUrl + breedId, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      throw new Error(error);
    });
}

export { fetchBreeds, fetchCatByBreed };