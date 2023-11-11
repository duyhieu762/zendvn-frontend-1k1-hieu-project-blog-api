const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));

const elCategory = document.getElementById('category');
const elCategoryName = document.getElementById('categoryName');
const elBtnLoadMore = document.getElementById('btn-load-more');
const elNameCity = document.getElementById('nameCity');
const elWeatherTemperature = document.getElementById('weatherTemperature');
const elWeather = document.getElementById('weather');
const elWeatherWind = document.getElementById('weatherWind');
const elWeatherHumidity = document.getElementById('weatherHumidity');
const elWeatherTime = document.getElementById('weatherTime');
const elBaiVietLienQuan = document.getElementById('baivietlienquan');


const apiWeather = axios.create({ baseURL: `https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=585334d1ecfd2c5cd145449d5cb398fe` });
apiWeather.get().then(res => {
    const data = res.data;
    const d = new Date();
    elNameCity.innerText = 'Hà Nội';
    elWeatherTemperature.innerText = (parseInt(data.main.temp) - 273) + '°C';
    elWeather.innerText = data.weather[0].description;
    elWeatherWind.innerText = data.wind.speed + " km/h";
    elWeatherHumidity.innerText = data.main.humidity + " %";

})

let currentPage = 1;
renderCategory(currentPage)
elBtnLoadMore.addEventListener('click', function (e) {
    e.preventDefault();
    currentPage++;
    renderCategory(currentPage);
})

function renderCategory(page = 1) {
    API.call().get(`categories_news/${id}/articles?limit=6&page=${page}`).then(res => {
        const data = res.data.data;
        let html = '';
        data.forEach(item => {
            let categoryName = item.category.name;
            document.title = categoryName;
            html +=/* html */`
            <div class="col-xl-6 mb-4 ">
                <div class="echo-hero-baner h-100">
                    <div class="echo-inner-img-ct-1  img-transition-scale">
                        <a href="detail.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}"></a>
                        <div class="echo-ct-style-3-shep">
                        </div>
                    </div>
                    <div class="echo-banner-texting">
                        <div class="echo-hero-area-titlepost-post-like-comment-share text-center justify-content-center">
                            <div class="echo-hero-area-like-read-comment-share">
                                <a href="detail.html?id=${item.id}"><i class="fa-light fa-clock"></i>${dayjs(item.publish_date).fromNow()}</a>
                            </div>
                            <div class="echo-hero-area-like-read-comment-share">
                                <a href="detail.html?id=${item.id}"><i class="fa-light fa-eye"></i> 3.5k Views</a>
                            </div>
                        </div>
                        <h4 class="echo-hero-title text-capitalize font-weight-bold text-center"><a href="detail.html?id=${item.id}" class="title-hover">${item.title}</a></h4>
                        <hr>
                        <p class="echo-hero-discription text-center ">${item.description}</p>
                    </div>
                </div>
            </div>`
            elCategoryName.innerText = categoryName;
        });
        elCategory.innerHTML += html;
    }).catch(function (error) {
        window.location.href = 'index.html'
    })
}

API.call().get('articles/popular?limit=4').then(res => {
    const data = res.data.data;
    let html = '';
    data.forEach(item => {
        html +=/* html */`
        <div class="echo-top-story border-bottom align-items-stretch">
            <div class="echo-story-picture img-transition-scale">
                <a href="detail.html?id=${item.id}"><img
                        src="${item.thumb}" alt="${item.title}"
                        class="img-hover"></a>
            </div>
            <div class="echo-story-text">
                <h6><a href="detail.html?id=${item.id}" class="title-hover">${item.title}</a></h6>
                <a href="#" class="pe-none"><i class="fa-light fa-clock"></i>${dayjs(item.publish_date).fromNow()}</a>
            </div>
        </div>`
    });
    elBaiVietLienQuan.innerHTML = html;
}).catch(function (error) {
    window.location.href = 'index.html'
})