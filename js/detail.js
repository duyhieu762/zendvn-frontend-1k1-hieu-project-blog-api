const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));

const elCategoryName = document.getElementById('categoryName');
const elCategoryImg = document.getElementById('categoryImg');
const elCategoryTitle = document.getElementById('categoryTitle');
const elCategoryDate = document.getElementById('categoryDate');
const elCategoryContent = document.getElementById('categoryContent');
const elBaiVieLienQuan = document.getElementById('baivielienquan');
const elPriceCoin = document.getElementById('priceCoin');

const apiKey = '76182700-7AF1-43BD-9CB8-D2B85C EC99E7';
const apiGetCoin = axios.create({
    baseURL: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano&vs_currencies=usd,eur,jpy`
});
apiGetCoin.get().then(res => {
    const data = res.data;
   
    let html = '';
    Object.keys(data).forEach(function(key) {
        html+=/* html */`
        <li class="d-flex justify-content-between align-items-center border-bottom">
            <h6 class="m-0">${key.toUpperCase()}</h6>
            <div class="d-flex flex-column">
                <p class="m-1"><span>${data[key].usd}</span>/USD</p>
                <p class="m-1"><span>${data[key].eur}</span>/EUR</p>
                <p class="m-1"><span>${data[key].jpy}</span>/JPY</p>
            </div>
        </li>`

      });
      elPriceCoin.innerHTML = html;
})


API.call().get(`articles/${id}`).then(res => {

    const data = res.data.data;
    elCategoryName.innerText = data.category.name;
    elCategoryImg.src = data.thumb;
    elCategoryTitle.innerText = data.title;
    elCategoryDate.innerText = dayjs(data.publish_date).fromNow();
    elCategoryContent.innerHTML = data.content;
    document.title = data.title;
    elCategoryName.href = `category.html?id=${data.category.id}`;
    if (!RECENT_POSTS.includes(id)) {
        if(RECENT_POSTS.length===4) RECENT_POSTS.shift();
        
        RECENT_POSTS.push(id);
        localStorage.setItem('RECENT-POSTS', JSON.stringify(RECENT_POSTS))
    }
}).catch(function (error) {
    window.location.href = 'index.html'
})

API.call().get(`articles/${id}/related?limit=4`).then(res => {
    const data = res.data.data;
    let html = '';
    data.forEach(item => {
        html +=/* html */`
        <div class="echo-top-story border-bottom">
            <div class="echo-story-text flex-basis-100">
                <h6><a href="detail.html?id=${item.id}" class="title-hover">${item.title}</a></h6>
                <a href="detail.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i>${dayjs(item.publish_date).fromNow()}</a>
            </div>
        </div>`
    });
    elBaiVieLienQuan.innerHTML = html;
}).catch(function (error) {
    window.location.href = 'index.html'
})