// news-portal API link to use
// https://github.com/ProgrammingHero1/news-portal
// 1. initilize cats = [], create function to show category from cats [] in document, category api call data,
// 2. current category id, catId = null
// 3. function for fetching category data by id
// 4. save category data in catData = []
// 5. function for showing categories in document from catData array

// const cats = []
// const fetchCats = async () => { }
// const catId = -1 // current cat
// const catData = [] // current cat data
// const fetchCatData = async (catId = -1) => { }
// const onClickCat = (catId = -1) => {
//     // set current cat id
//     // fetch cat data
//     // show cat data
// }
// const showCats = (cats = []) => {
//     // document
// }
// const showCatData = (catData = []) => {
//     // show lenght, name & cata data
//     // const infoDiv = document.createElement('div')

//     // const loopDiv = document.createElement('div')
//     catData.forEach(item, index => {

//     })
// }

// const init = () => {

// }

// News-Portal Assignment 6 start here js
let cats = [];
let catData = [];
let newsDetailsId = [];

// Load and show categroy
const loadCat = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await (fetch(url));
        const Data = await (res.json());
        cats = Data.data.news_category;
        console.log('Load news category', cats);
        adlert('error occurs');
    } catch (error) {
        const errorHandle = document.getElementById('error');
        errorHandle.innerHTML = error.message;
    }


}

// Show details news in modal

const newsModal = async (newsID) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsID}`;
    const res = await (fetch(url)); // await() is a functjion
    const Data = await (res.json());
    newsDetailsId = Data.data;
    console.log('ModalData', newsDetailsId);
    showNewsModal(newsDetailsId);
}
// shwo news detaisl in modal
const showNewsModal = (newsDetailsId) => {
    const newsTitleData = newsDetailsId[0].title;
    const newsTitle = document.getElementById('newsDatailsModal');
    newsTitle.innerText = newsTitleData;
    const newsDetailsModal = document.getElementById('news-details-text');
    const newsDatailsModalText = newsDetailsId[0].details;
    newsDetailsModal.innerText = newsDatailsModalText;
    console.log('detailsModal', newsDatailsModalText)
    // const div = document.createElement('div');
    // div.innerHTML = `
    //             <p>${newsDetailsId[0].details}</p>
    // `;
    // newsDetailsModal.appendChild(div);
}

// Load & show news details
const loadNews = async (category_id, category) => {
    spinnerDisplay(true);
    const newsLengthItem = document.getElementById('news-found');
    newsLengthItem.textContent = '';
    const newsDetails = document.getElementById('news-details-show');
    newsDetails.textContent = '';
    console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await (fetch(url));
    const Data = await (res.json());

    // 
    cats = Data.data;
    catData = cats
    console.log('Load news Details', cats, catData);

    console.log('news details', newsDetails);
    //console.log('catsTitle', cats[0].title);
    //console.log('length', cats.length);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="d-block bg-light rounded ps-2">
        <h3>${cats.length} news founds in ${category}</h3>
    </div>
    `;
    newsLengthItem.appendChild(div);
    // sort array of news details
    let sortedNewsArray = [];
    cats.sort((a, b) => {
        return a.total_view - b.total_view;
    })
    console.log('srted', cats);
    // use forEach loop to the array
    cats.forEach((element) => {
        // function modx() {
        //     newsModal(element.details)
        // }
        console.log('element ID', element._id);

        const div1 = document.createElement('div');
        div1.innerHTML = `
        <div class="card mb-2 p-3 d-flex" style="max-width: 1130px;">
            <div class="row g-0">
                <div class="col-md-2">
                    <img id="cover-image" src="${element.thumbnail_url
            }" class="img-fluid" alt="...">
                </div>
                <div class="col-md-10 cut-details">
                    <div id="" class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="cut-details card-text">${element.details}</p>
                        <div class = "d-flex justify-content-between align-items-center ">
                            <div class= "d-flex">
                                <div class = "p-2">
                                <img style ="border-radius: 50%;width:35px"; src="${element.author.img}"    class="" alt="...">
                                </div>
                                <div class= "fs-6 p-1">
                                    <div class= "fs-6 "> ${element.author.name ? element.author.name : 'Name not found'}</div>
                                    <div style="font-size:11px;" class="card-text text-muted">${element.author.published_date}</div>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="p-2">
                                    <i class="fa fa-eye"></i>
                                </div>
                                <div class="p-2">
                                    ${element.total_view ? element.total_view : 0}
                                </div>
                            </div>
                            <div>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                            
                            </div>
                            <div id="news-details-modal" onclick="newsModal('${element._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i  class="fa fa-arrow-right"></i>
                            </div>

                            </div>
                        
                    </div>
                </div>
            </div>
    </div>
        `;

        newsDetails.appendChild(div1);
    })
    spinnerDisplay(false);
    const footer = document.getElementById('footer');
    footer.classList.remove('d-none');
}
const showCat = (cats = []) => {

    const catEl = document.getElementById('categories');
    //catEl.textContent = '';
    for (let i = 0; i < cats.length; i++) {
        const div = document.createElement('div');
        // div.classList.add('p-2 m-2');
        div.innerHTML = `
        <button class="color" onclick="loadNews('${cats[i].category_id}','${cats[i].category_name}' )">${cats[i].category_name}</button>
        `;
        catEl.appendChild(div);
        //console.log('catElement', catEl);

    }
}

// spin loader function
const spinnerDisplay = (isLoading) => {
    const spinnerWorking = document.getElementById('spin-loader');
    if (isLoading) {
        spinnerWorking.classList.remove('d-none');
    }
    else {
        spinnerWorking.classList.add('d-none');
    }
}
const init = async () => {
    await loadCat().then(() => {
        showCat(cats);
    })
}
init();


