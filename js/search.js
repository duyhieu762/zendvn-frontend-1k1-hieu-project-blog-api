const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keyword = urlParams.get('keyword');
let currentPage = parseInt(urlParams.get('page'));
if (isNaN(currentPage)) currentPage = 1;

const elCategory = document.getElementById('category');
const elTitleSearch = document.getElementById('title-search');
const elPagination = document.getElementById('pagination');
const elRecentPost = document.getElementById('recentPost');

renderCategorySearch(keyword);


elPagination.addEventListener('click', function (e) {
    let el = e.target;
    if (el.classList.contains('page-item')) {
        currentPage = parseInt(el.innerText);
        renderCategorySearch(keyword, currentPage);
        addOrUpdateUrlParameter('page', currentPage);
    }
    if (el.classList.contains('page-item-prev')) {
        currentPage--;
        renderCategorySearch(keyword, currentPage);
        addOrUpdateUrlParameter('page', currentPage);
    }
    if (el.classList.contains('page-item-next')) {
        currentPage++;
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
    API.call().get(`articles/search?q=${keyword}&limit=6&page=${currentPage}`).then(res => {
        const data = res.data.data;
        elTitleSearch.innerText = `Tìm được ${res.data.meta.total} bài viết với từ khóa "${keyword}"`
        let html = '';
        const totalPage = res.data.meta.last_page;
        data.forEach(item => {

            html +=/* html */`
            <div class="col-xl-6 mb-4">
                <div class="echo-hero-baner h-100">
                    <div class="echo-inner-img-ct-1  img-transition-scale">
                        <a href="detail.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}"></a>
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
                        <h4 class="echo-hero-title text-capitalize font-weight-bold text-center"><a href="detail.html?id=${item.id}" class="title-hover">${item.title}</a></h4>
                        <hr>
                        <p class="echo-hero-discription text-center">${item.description}</p>
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

    let html =  /* html */ `<li class="page-item ${disabledPrev}">
                                <a class="page-link page-item-prev" href="#">Previous</a>
                            </li>`;
    for (let index = 1; index <= total; index++) {
        const active = index === currentPage ? 'active disabled' : ''
        html +=/* html */`
        <li class="page-item ${active}"><a class="page-link page-item" href="#">${index}</a></li>`
    }

    const disabledNext = currentPage === total ? 'disabled' : '';
    html += /* html */`<li class="page-item ${disabledNext}">
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