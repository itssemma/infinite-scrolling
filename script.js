const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false; 
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'oi-uVbLhzK7hGksSpsulOtvCcX6J2fwIv4mUghLZYL4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// check if all images were loaded
function imageLoaded() {
    // console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready);
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    
    
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash 
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description,
        });
        // // Event Lister, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



// get photos from unsplash API
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray= await response.json();
      displayPhotos();
    } catch (error) {
    // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    // console.log('scrolled');
    if (window.scrollY >= document.body.offsetHeight - 1000 && ready){
        // console.log('window.innerHeight:', window.innerHeight);
        // console.log('window.scrollY:', window.scrollY);
        // console.log('window.innerHeight + scrollY:', window.scrollY + window.innerHeight);
        // console.log('document.body.offsetHeight - 1000:', document.body.offsetHeight - 1000);
        ready = false;
        getPhotos();
        console.log('load more');
    }
})

// on load 
getPhotos();