import { fetchBreeds, fetchCatByBreed } from './cat-search';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const refs = {
  breedSelect: document.querySelector('select.breed-select'),
  loader: document.querySelector('p.loader'),
  error: document.querySelector('p.error'),
  catInfo: document.querySelector('div.cat-info'),
};

refs.breedSelect.classList.add('hidden');
refs.error.classList.add('hidden');

fetchBreeds()
  .then(response => {
    renderBreedSelector(response);
    refs.loader.classList.add('hidden');
  })
  .catch(() => {
    Notiflix.Notify.failure(refs.error.innerHTML);
    refs.loader.classList.add('hidden');
  });

function renderBreedSelector(breedList) {
  let breedOptions = breedList.map(({ id, name }) => {
    return `
            <option value="${id}">${name}</option>
            `;
  });
  refs.breedSelect.innerHTML = breedOptions.join('');
  refs.breedSelect.classList.remove('hidden');
  new SlimSelect({
    select: '.breed-select',
  });
}

function renderCatInfo(cats) {
  let catInfo = cats.map(({ breeds, url }) => {
    return `
        <div class="cat-info">
        <img src="${url}" alt="${breeds[0].name}" width="400"/>
        <div class="cat-info-text">
        <h1 class="cat-title">${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p><span class="temperament">Temperament:</span>
        ${breeds[0].temperament}</p>
        </div>
        </div>
          `;
  });
  refs.catInfo.innerHTML = catInfo.join('');
  refs.catInfo.classList.remove('hidden');
}

refs.breedSelect.addEventListener('change', event => {
  refs.error.classList.add('hidden');
  refs.catInfo.classList.add('hidden');
  refs.loader.classList.remove('hidden');
  fetchCatByBreed(event.target.value)
    .then(response => {
      renderCatInfo(response);
    })
    .catch(() => {
      Notiflix.Notify.failure(refs.error.innerHTML);
      refs.loader.classList.add('hidden');
      refs.catInfo.classList.add('hidden');
    });
  refs.loader.classList.add('hidden');
});