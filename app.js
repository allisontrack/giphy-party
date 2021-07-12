// Giphy Party

// search giphy with user generated search term.
// return limit of 1 gif and append to document.
// a delete button will clear all gifs.
// a delete button on each gif will delete that gif.

// search and append a gifs

const gifForm = document.querySelector('#gif-search');
const addGifBtn = document.querySelector('.add-gif');
addGifBtn.addEventListener('click', function (event) {
    event.preventDefault();
    addAGif();
    gifForm.reset();
})


async function addAGif() {
    const searchTerm = getSearchTerm();
    console.log('this is searchTerm', searchTerm);
    const gifSrc = await searchGiphy(searchTerm);
    console.log('this is gifSrc', gifSrc);
    const gifImg = createGifImg(gifSrc);
    appendGif(gifImg);
    // alternate syntax:
    // appendGif(createGifDiv(searchGiphy(getSearchTerm())));
}


// get search term

function getSearchTerm() {
    const searchTerm = document.querySelector('#search-for-gifs').value;
    return searchTerm;
}


// search giphy api

async function searchGiphy(searchTerm) {
    const response = await axios.get('https://api.giphy.com/v1/gifs/random', {params: {
        "api_key": "s7yhMzZgq0DUULMdGJXvycYNRo6jPIfP",
        "tag": searchTerm,
        "rating": "g"
    } } );
    console.log(response.data);
    const gifSrc = response.data.data.image_url;
    console.log('this is gifSrc', gifSrc);
    return gifSrc;
}


// create gif div

function createGifImg(gifSrc) {
    const gifImg = document.createElement('img');
    gifImg.classList.add('side-margins');
    gifImg.src = gifSrc;
    return gifImg;
    //add content to gif div
}


// append gif to gif-gallery

function appendGif(gifImg) {
    const gifMain = document.querySelector('#gif-gallery');
    gifMain.append(gifImg);
}


// delete all gif with delete button

function deleteGifs() {
    const deleteBtn = document.querySelector('.delete-gif');
    const divs = document.querySelector('#gif-gallery');
    deleteBtn.addEventListener('click', function(event) {
        event.preventDefault();
        for (let div of divs) {
            div.remove();
        }
    })
}
