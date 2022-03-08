const API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let num = 1
const tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=`
const tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=`
const tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=`


const divAppend = document.querySelector('.append')
const buttons = document.querySelectorAll('.btns')
const buttonNext = document.querySelector('.next')
const buttonPrev = document.querySelector('.prev')
const pageNum = document.querySelector('.title')
const buttonSearch = document.querySelector('.btn')
const container = document.querySelector('.container')

const search = document.querySelector('#search')
const min = document.querySelector('#min')
const max = document.querySelector('#max')
const score = document.querySelector('#score')
const fl = document.querySelector('.fl')



async function topFilms(num) {
    pageNum.textContent = num
    divAppend.innerHTML = ''
    let response = await fetch(tokenTop + num)
    response = await response.json()

    buttonSearch.onclick = (e) => {
        e.preventDefault()
        if (!search.value && !min.value && !max.value && !score.value) return
        topFilms()
    }

    for (let el of response.results) {
        let filmName = el.title.toLowerCase();
        let filmYear = el.release_date.split('').splice(0, 4).join('')
        let filmScore = +el.vote_average
        console.log(typeof filmScore);
        search.value = search.value.toLowerCase()
        if (search.value != '' && !(filmName.includes(search.value))) continue;
        if (min.value != '' && min.value > filmYear) continue;
        if (max.value != '' && max.value < filmYear) continue;
        if (score.value != '' && score.value != filmScore)  continue;
        showTopPhotos(el)
    }
}
topFilms(num)

async function popularFilms(num) {
    pageNum.textContent = num
    divAppend.innerHTML = ''
    let response = await fetch(tokenPopular + num)
    response = await response.json()
    buttonSearch.onclick = (e) => {
        e.preventDefault()
        if (!search.value && !min.value && !max.value && !score.value) return
        popularFilms()
    }
    for (let el of response.results) {
        let filmName = el.title.toLowerCase();
        let filmYear = el.release_date.split('').splice(0, 4).join('')
        let filmScore = +el.vote_average
        console.log(typeof filmScore);
        search.value = search.value.toLowerCase()
        if (search.value != '' && !(filmName.includes(search.value))) continue;
        if (min.value != '' && min.value > filmYear) continue;
        if (max.value != '' && max.value < filmYear) continue;
        if (score.value != '' && score.value != filmScore)  continue;
        showPopularPhotos(el)
    }

    
}
async function upcomingFilms(num) {
    pageNum.textContent = num
    divAppend.innerHTML = ''
    let response = await fetch(tokenUpComing + num)
    response = await response.json()
    buttonSearch.onclick = (e) => {
        e.preventDefault()
        if (!search.value && !min.value && !max.value && !score.value) return
        upcomingFilms()
    }

    for (let el of response.results) {
        let filmName = el.title.toLowerCase();
        let filmYear = el.release_date.split('').splice(0, 4).join('')
        let filmScore = +el.vote_average
        console.log(typeof filmScore);
        search.value = search.value.toLowerCase()
        if (search.value != '' && !(filmName.includes(search.value))) continue;
        if (min.value != '' && min.value > filmYear) continue;
        if (max.value != '' && max.value < filmYear) continue;
        if (score.value != '' && score.value != filmScore)  continue;
        showUpcomingPhotos(el)
    }
}


function showTopPhotos(el) {
    let div = document.createElement('div')
    div.className = 'movie'

    div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt=${el.title}>
        <div clappendass="movie-info">
            <h3>${el.title}</h3>
            <span class="orange"> ${el.vote_average} </span>
        </div>
        <span class="date">${el.release_date}</span>
    `
    divAppend.append(div)
    buttonNext.onclick = (event) => {
        event.preventDefault()
        num += 1
        topFilms(num)
    }
    buttonPrev.onclick = (event) => {
        event.preventDefault();
        if (num == 1) {
            original_title
            return
        } else num -= 1
        topFilms(num)
    }

}

function showPopularPhotos(el) {
    let div = document.createElement('div')
    div.className = 'movie'

    div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt=${el.title}>
        <div clappendass="movie-info">
            <h3>${el.title}</h3>
            <span class="orange"> ${el.vote_average} </span>
        </div>
        <span class="date">${el.release_date}</span>
    `
    divAppend.append(div)
    buttonNext.onclick = (event) => {
        event.preventDefault()
        num += 1
        popularFilms(num)
    }
    buttonPrev.onclick = (event) => {
        event.preventDefault();
        if (num == 1) {
            return
        } else num -= 1
        popularFilms(num)
    }
}

function showUpcomingPhotos(el) {
    let div = document.createElement('div')
    div.className = 'movie'
    div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt=${el.title}>
        <div clappendass="movie-info">
            <h3>${el.title}</h3>
            <span class="orange"> ${el.vote_average} </span>
        </div>
        <span class="date">${el.release_date}</span>
    `
    divAppend.append(div)
    buttonNext.onclick = (event) => {
        event.preventDefault()
        num += 1
        upcomingFilms(num)
    }
    buttonPrev.onclick = (event) => {
        event.preventDefault();
        if (num == 1) {
            return
        } else num -= 1
        upcomingFilms(num)
    }

}


buttons[0].onclick = (event) => {
    event.preventDefault();
    search.value = ''
    min.value = ''
    max.value = ''
    score.value = ''
    topFilms(num = 1)
}
buttons[1].onclick = (event) => {
    event.preventDefault();
    search.value = ''
    min.value = ''
    max.value = ''
    score.value = ''
    popularFilms(num = 1)
}
buttons[2].onclick = (event) => {
    event.preventDefault();
    search.value = ''
    min.value = ''
    max.value = ''
    score.value = ''
    upcomingFilms(num = 1)
}