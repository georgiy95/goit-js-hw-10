const API =
  'live_XtFPFsMhoHYrHWi82dyH8oBaWjurPQ4tCWO7REmrDCh4se7FxfwXkvcXfL4yy9Kp';

export function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.log(`Code error: ${error.message}`)
    });
}

export function fetchCatByBreed(breedId) {
    const params = new URLSearchParams({
        api_key: API,
        
    })
    return fetch(`https://api.thecatapi.com/v1/images/search?${params}&breed_ids=${breedId}`).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => data[0])
      .catch((error) => {
        console.log(`Code error: ${error.message}`)
      });
}