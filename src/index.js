import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorP = document.querySelector('.error')

showLoader()

fetchBreeds()
  .then(breeds => {
    onMarkupSelectBreeds(breeds)
    hideLoader()
  }).catch(()=> {
    showError()
    hideLoader()
  })
  

  select.addEventListener('change', () => {
    const breedId = select.value;
    showLoader()
    catInfo.innerHTML = ''
    fetchCatByBreed(breedId).then(cat => {
      createMarkupCat(cat)
    })
    .catch(()=> {
      showError()
    })
    .finally(() => {
      hideLoader()
    });
   })
  

  function onMarkupSelectBreeds(breeds) {
    const markup = breeds.map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    });
    select.insertAdjacentHTML('beforeend', markup.join(''));
    const slimSelect = new SlimSelect({select: select})
  }
  
  function createMarkupCat(cat) {
    const catMarkup = `<img class='cat-img' src='${cat.url}' alt='${cat.breeds[0].name}' width: 200px;
    height: 200px;/>
    <div class='text-box'>
    <h2 class='title-cat'>${cat.breeds[0].name}</h2>
    <p class='text-cat'>${cat.breeds[0].description}</p>
    <p class='text-cat'><span class='temp-cat'>Temperament:</span> ${cat.breeds[0].temperament}</p>
    </div>`;

    catInfo.innerHTML = catMarkup;
  }

  function showError() {
    Notiflix.Notify.init({clickToClose: true})
    Notiflix.Notify.failure(errorP.textContent);
   
  }

  function showLoader() {
    loader.classList.remove('unvisible')
  }

  function hideLoader() {
    loader.classList.add('unvisible')
  }