const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keyword = urlParams.get('keyword');
let currentPage = parseInt(urlParams.get('page'));
console.log(currentPage);
if (isNaN(currentPage)) {
    currentPage = 1;
    console.log(123);
}

const elCategory = document.getElementById('category');
const elTitleSearch = document.getElementById('title-search');
const elPagination = document.getElementById('pagination');
const elRecentPost = document.getElementById('recentPost');


/*
3
currentPage         start
1,2,3               1
4,5,6               4
7,8,9               7
10,11               10


1,2,0

1 / 3 = 0.xxx -> 1
2 / 3 = 0.yyy -> 1
3 / 3 = 1 -> 1
1 * 3 = 3 -> 3 - 3 + 1 = 1

4 / 3 = 1.xx -> 2
5 / 3 = 1.yy -> 2
6 / 3 = 2 -> 2
2 * 3 = 6 -> 6 - 3 + 1 = 4

7 / 3 = 1.xx -> 3
8 / 3 = 1.yy -> 3
9 / 3 = 2 -> 3
3 * 3 = 9 -> 9 - 3 + 1 = 7


curr / pagerange = xx.yy -> zz
zz - pagerange + 1 = start
start + pagerange - 1 = end
*/

const PAGE_RANGE = 3;
let START = Math.ceil(currentPage / PAGE_RANGE) * PAGE_RANGE - PAGE_RANGE + 1;
console.log(START);
let END = START + PAGE_RANGE - 1;

renderCategorySearch(keyword, currentPage);


elPagination.addEventListener('click', function (e) {
    let el = e.target;
    if (el.classList.contains('page-item')) {
        currentPage = parseInt(el.innerText);
        renderCategorySearch(keyword, currentPage);
        addOrUpdateUrlParameter('page', currentPage);
    }
    if (el.classList.contains('page-item-prev')) {
        currentPage--;


        /*
         current    start   end
         9          7       9
         6          4       6
         3          1       3

        */
        if (currentPage % PAGE_RANGE === 0) {
            END = currentPage;
            START = END - PAGE_RANGE + 1;
            console.log(123);
        }
        console.log('curentPage', currentPage);
        console.log('Start', START);
        console.log('end', END);
        renderCategorySearch(keyword, currentPage);
        addOrUpdateUrlParameter('page', currentPage);
    }
    if (el.classList.contains('page-item-next')) {

        currentPage++;

        // 6 11 16 21, ...
        // 5
        /*
        currentPage             START           END
        6                       6               10
        11                      11              15
        16                      16              20
        */
        if (currentPage % PAGE_RANGE === 1) {
            // cap nhat lai start va end
            START = currentPage;
            END = currentPage + PAGE_RANGE - 1;
        }

        renderCategorySearch(keyword, currentPage);
        addOrUpdateUrlParameter('page', currentPage);
    }

});
function addOrUpdateUrlParameter(key, value) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set(key, value);
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    history.pushState(null, '', newUrl);
}
function renderCategorySearch(keyword, currentPage) {
    elCategory.innerHTML = `<div class="text-center fa-5x"><i class="fas fa-spinner fa-spin"></i></div>`;
    API.call().get(`articles/search?q=${keyword}&limit=6&page=${currentPage}`).then(res => {
        const data = res.data.data;
        elTitleSearch.innerText = `Tìm được ${res.data.meta.total} bài viết với từ khóa "${keyword}"`
        let html = '';
        const totalPage = res.data.meta.last_page;
        data.forEach(item => {
            const regex = new RegExp(keyword,'gi');
            const title = item.title.replace(regex,function(match){
                return `<mark>${match}</mark>`
            });
            const description = item.description.replace(regex,function(match){
                return `<mark>${match}</mark>`
            })

            html +=/* html */`
            <div class="col-xl-6 mb-4">
                <div class="echo-hero-baner h-100">
                    <div class="echo-inner-img-ct-1  img-transition-scale">
                        <a href="detail.html?id=${item.id}"><img src="${item.thumb}" alt="${title}"></a>
                        <div class="echo-ct-style-3-shep">
                        </div>
                    </div>
                    <div class="echo-banner-texting">
                        <div class="echo-hero-area-titlepost-post-like-comment-share text-center justify-content-center">
                            <div class="echo-hero-area-like-read-comment-share">
                                <a href="detail.html?id=${item.id}"><i class="fa-light fa-clock"></i> 06 minute read</a>
                            </div>
                            <div class="echo-hero-area-like-read-comment-share">
                                <a href="detail.html?id=${item.id}"><i class="fa-light fa-eye"></i> 3.5k Views</a>
                            </div>
                        </div>
                        <h4 class="echo-hero-title text-capitalize font-weight-bold text-center"><a href="detail.html?id=${item.id}" class="title-hover">${title}</a></h4>
                        <hr>
                        <p class="echo-hero-discription text-center">${description}</p>
                    </div>
                </div>
            </div>`

        });
        renderPagination(totalPage);
        elCategory.innerHTML = html;
    }).catch(function (error) {
        window.location.href = 'index.html'
    })

}

function renderPagination(total) {
    const disabledPrev = currentPage === 1 ? 'disabled' : '';

    let html =  /* html */ `
    <li class="page-item ${disabledPrev}">
        <a class="page-link page-item-prev" href="#">Previous</a>
    </li>`;
    if (END > total) END = total;
    for (let index = START; index <= END; index++) {
        const active = index === currentPage ? 'active disabled' : ''
        html +=/* html */`
        <li class="page-item ${active}"><a class="page-link page-item" href="#">${index}</a></li>`
    }

    const disabledNext = currentPage === total ? 'disabled' : '';
    html += /* html */`
    <li class="page-item ${disabledNext}">
        <a class="page-link page-item-next" href="#">Next</a>
    </li>`
    elPagination.innerHTML = html;
}

API.call().get(`articles?limit=4&ids=${recentPostIdString}`).then(res => {
    const article = res.data.data;
    let html = '';
    article.forEach(item => {
        html += /* html */`
      <div class="echo-top-story">
        <div class="echo-story-picture img-transition-scale">
            <a href="detail.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}" class="img-hover"></a>
        </div>
        <div class="echo-story-text">
            <h6><a href="detail.html?id=${item.id}" class="title-hover">${item.title}</a></h6>
            <a href="detail.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i>${dayjs(item.publish_date).fromNow()}</a>
        </div>
    </div>`
    });
    elRecentPost.innerHTML = html;
})