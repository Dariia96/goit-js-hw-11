
import { servicePicture } from './service/servicePicture';
import axios from 'axios';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const button = document.querySelector('button');

const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard')
let page = 1;

let options = {
    root: null,
    rootMargin: "400px",
    threshold: 0,
};

let observer = new IntersectionObserver(handlerPagination, options);

function handlerPagination(entries, observer) {
    console.log(entries);
    
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
             
            page += 1;
            
                servicePicture(page)
                .then(pictures => {
                        gallery.insertAdjacentHTML('beforeend', createMarkup(pictures));

                        
                        let lightbox = new SimpleLightbox('.gallery__link', { captionsData: "alt", captionDelay: "250" }).refresh();
                        
                   
                        /*let lightbox = new SimpleLightbox('.gallery__link', { captionsData: "alt", captionDelay: "250" });*/
                       let totalPage = Math.ceil(pictures.data.totalHits / 40);
                     console.log(totalPage)
                        if (totalPage <= page) {
                            observer.unobserve(guard);
                            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                    }
                        /*else if (!input.value) {
                            let page = 1;
                        
                        } */
                        
                })
           
        }
        /*form.reset();*/
})
   
}

form.addEventListener('submit', handlerSearchForm)


function handlerSearchForm(event) {
   
         event.preventDefault();
       
        servicePicture(page)
            .then((pictures) => {
                if (pictures.data.totalHits === 0) {
                    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
                }
                
                console.log(pictures)
                gallery.innerHTML = createMarkup(pictures)
                let lightbox = new SimpleLightbox('.gallery__link', { captionsData: "alt", captionDelay: "250" }).refresh();
                 let totalPage = Math.ceil(pictures.data.totalHits / 40);
                if (totalPage > page) {
                    observer.observe(guard);
                    Notiflix.Notify.info(`Hooray! We found ${pictures.data.totalHits} images.`)
                }
            }
            //gallery.insertAdjacentHTML('beforeend', galleryImages);}
        ) 
    
            .catch(error => console.log(error));
    
            

}



function createMarkup(arr) {

    return arr.data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                `<li class="photo-card">
                <a class="gallery__link" href="${largeImageURL}">
                    <img
                    class=".gallery__image"
                    src="${webformatURL}"
                        alt="${tags}"
                        loading="lazy"
                        width = 200 />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
  </a>
</li>`
    ).join('');
           
}



