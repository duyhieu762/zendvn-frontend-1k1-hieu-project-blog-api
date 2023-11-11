const elBannerLeft = document.getElementById('banner-left');
const elBannerRight = document.getElementById('banner-right');
const elCategoryFeatured = document.getElementById('category-featured');
const elPopularNow = document.getElementById('popularNow');


API.call().get('articles/popular?limit=5').then(res => {
    const data = res.data.data;

    let htmlleft = '';
    let htmlright = '';
    data.forEach((item, index) => {
       
        if (index < 1) {
            htmlleft = renderArticlePopularLeft(item);
        } else {
            htmlright += renderArticlePopularRight(item)
        }
    })
    elBannerLeft.innerHTML = htmlleft;
    elBannerRight.innerHTML = htmlright;
})
API.call().get('categories_news/articles?limit_cate=3&limit=4').then(res => {
    const data = res.data.data;
    let html = '';
    data.forEach((item, index) => {
        if (index % 2 === 0) {
            let articlesHtmlLeft = '';
            let articlesHtmlRight = '';
            item.articles.forEach((article, index) => {
                if (index < 1) {
                    articlesHtmlRight +=/*html */`
                    <div class="echo-hero-baner">
                        <div class="echo-hero-banner-main-img img-transition-scale">
                            <a href="detail.html?id=${article.id}">
                                <img class="banner-image-one img-hover w-100" src="${article.thumb}" alt="${article.title}">
                            </a>
                        </div>
                        <div class="content">
                            <h1 class="echo-hero-title font-weight-bold">
                                <a href="detail.html?id=${article.id}" class="title-hover">${article.title}</a>
                            </h1>
                        </div>
                    </div>`
                } else {
                    articlesHtmlLeft +=/* html */`
                    <div class="echo-hero-baner small">
                        <div class="content flex-basis-100">
                            <h1 class="echo-hero-title font-weight-bold">
                                <a href="detail.html?id=${article.id}" class="title-hover">${article.title}</a>
                            </h1>
                            <p class="echo-story-text">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                                        <path d="M8 1H10C10.1326 1 10.2598 1.05268 10.3536 1.14645C10.4473 1.24021 10.5 1.36739 10.5 1.5V9.5C10.5 9.63261 10.4473 9.75979 10.3536 9.85355C10.2598 9.94732 10.1326 10 10 10H1C0.867392 10 0.740215 9.94732 0.646447 9.85355C0.552678 9.75979 0.5 9.63261 0.5 9.5V1.5C0.5 1.36739 0.552678 1.24021 0.646447 1.14645C0.740215 1.05268 0.867392 1 1 1H3V0H4V1H7V0H8V1ZM7 2H4V3H3V2H1.5V4H9.5V2H8V3H7V2ZM9.5 5H1.5V9H9.5V5Z" fill="#9F68F5"/>
                                    </svg>
                                    ${dayjs(article.publish_date).fromNow()}
                                </span>
                            </p>
                        </div>
                    </div>`
                }
            })
            html +=/*html*/`
            <div class="top-area">
                <div class="hm5-feature-title">
                    <div class="hm-5-title-btn">
                        <div class="hm-5-main-title">
                            <img src="assets/images/home-1/trending-left/title-shape.svg" alt="">
                            <h2>${item.name}</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4 col-lg-12 col-md-6">
                        <div class="right-side-banner">${articlesHtmlLeft}</div>
                    </div>
                    <div class="col-xl-8 col-lg-12 col-md-6">${articlesHtmlRight}</div>
                </div>
            </div>`
        } else {
            let articlesHtml = '';

            item.articles.forEach(article => {
                articlesHtml += /*html */`
                <div class="col-xl-6">
                    <div class="echo-hero-baner">
                        <div class="echo-hero-banner-main-img img-transition-scale" id="acticle-img">
                            <a href="detail.html?id=${article.id}">
                                <img class="banner-image-one img-hover w-100" src="${article.thumb}" alt="${article.title}">
                            </a>
                        </div>
                        <div class="content">
                            <h1 class="echo-hero-title font-weight-bold">
                                <a href="detail.html?id=${article.id}" class="title-hover">${article.title}</a>
                            </h1>
                            <div class="echo-hero-area-titlepost-post-like-comment-share">
                                <div class="echo-hero-area-like-read-comment-share">
                                    <a href="detail.html?id=${article.id}"><i class="fa-light fa-eye"></i> 3.5k Views</a>
                                </div>
                                <div class="echo-hero-area-like-read-comment-share">
                                    <a href="detail.html?id=${article.id}"><i class="fa-light fa-comment-dots"></i> 05 Comment</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            });
            html += /* html */ `
            <div class="bottom-area">
                <div class="hm5-feature-title">
                    <div class="hm-5-title-btn">
                        <div class="hm-5-main-title">
                            <img src="assets/images/home-1/trending-left/title-shape2.svg" alt="">
                            <h2>${item.name}</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    ${articlesHtml}
                </div>
            </div>`
        }
    })
    elCategoryFeatured.innerHTML = html;
})
API.call().get('articles/popular?limit=4').then(res => {
    const data = res.data.data;
    let html = '';
   

    data.forEach(item => {
        html +=/* html */`
        <div class="echo-hero-baner small">
            <div class="content flex-basis-100">
                <p class="author">${item.category.name}</p>
                <h1 class="echo-hero-title font-weight-bold">
                    <a href="detail.html?id=${item.id}" class="title-hover">${item.title}</a>
                </h1>
                <p class="echo-story-text">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                            <path d="M8 1H10C10.1326 1 10.2598 1.05268 10.3536 1.14645C10.4473 1.24021 10.5 1.36739 10.5 1.5V9.5C10.5 9.63261 10.4473 9.75979 10.3536 9.85355C10.2598 9.94732 10.1326 10 10 10H1C0.867392 10 0.740215 9.94732 0.646447 9.85355C0.552678 9.75979 0.5 9.63261 0.5 9.5V1.5C0.5 1.36739 0.552678 1.24021 0.646447 1.14645C0.740215 1.05268 0.867392 1 1 1H3V0H4V1H7V0H8V1ZM7 2H4V3H3V2H1.5V4H9.5V2H8V3H7V2ZM9.5 5H1.5V9H9.5V5Z" fill="#9F68F5"/>
                        </svg>
                        ${dayjs(item.publish_date).fromNow()}
                    </span>
                </p>
            </div>
        </div>`
    })
    elPopularNow.innerHTML = html;
})

function renderArticlePopularLeft(item) {
    return /*html */`
    <div class="echo-hero-baner">
        <div class="echo-hero-banner-main-img img-transition-scale">
            <a href="detail.html?id=${item.id}">
                <img class="banner-image-one img-hover w-100" src="${item.thumb}" alt="${item.title}">
            </a>
        </div>
        <div class="content">
            <p class="author">${item.category.name}</p>
            <h1 class="echo-hero-title font-weight-bold">
                <a href="detail.html?id=${item.id}" class="title-hover">${item.title}</a>
            </h1>
            
        </div>
    </div>`
}
function renderArticlePopularRight(item) {
    return /*html */`
    <div class="echo-hero-baner small">
        <div class="content flex-basis-100">
            <p class="author">${item.category.name}</p>
            <h1 class="echo-hero-title font-weight-bold">
                <a href="detail.html?id=${item.id}" class="title-hover">${item.title}</a>
            </h1>
            <p class="echo-story-text">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                        <path d="M8 1H10C10.1326 1 10.2598 1.05268 10.3536 1.14645C10.4473 1.24021 10.5 1.36739 10.5 1.5V9.5C10.5 9.63261 10.4473 9.75979 10.3536 9.85355C10.2598 9.94732 10.1326 10 10 10H1C0.867392 10 0.740215 9.94732 0.646447 9.85355C0.552678 9.75979 0.5 9.63261 0.5 9.5V1.5C0.5 1.36739 0.552678 1.24021 0.646447 1.14645C0.740215 1.05268 0.867392 1 1 1H3V0H4V1H7V0H8V1ZM7 2H4V3H3V2H1.5V4H9.5V2H8V3H7V2ZM9.5 5H1.5V9H9.5V5Z" fill="#9F68F5"/>
                    </svg>
                    ${dayjs(item.publish_date).fromNow()}
                </span>
            </p>
        </div>
    </div>`
}
function renderArticlesHtmlRight(acticle) {
    return /*html */`
    <div class="echo-hero-baner">
        <div class="echo-hero-banner-main-img img-transition-scale">
            <a href="detail.html?id=${article.id}">
                <img class="banner-image-one img-hover w-100" src="${article.thumb}" alt="${article.title}">
            </a>
        </div>
        <div class="content">
            <h1 class="echo-hero-title font-weight-bold">
                <a href="detail.html?id=${article.id}" class="title-hover">${article.title}</a>
            </h1>
        </div>
    </div>`
}