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
const elCommentForm = document.getElementById('commentForm');
const elCommentContent = document.getElementById('comment-content');
const elCommentNoitce = document.getElementById('commentNoitce');
const elListComment = document.getElementById('listComment');
const elTotalComment = document.getElementById('totalComment');
const elCommentMessageReply = document.getElementById('commentMessageReply');
const elReplyEmail = document.getElementById('replyEmail');
const elCancleReply = document.getElementById('cancleReply');
let email = '';
const COMMENTS = JSON.parse(localStorage.getItem('COMMENT')) || [];
let commentByArticle = COMMENTS.filter(item => item.articleId === id)

let parentCommentId = null;
let level = 1;

const apiKey = '76182700-7AF1-43BD-9CB8-D2B85C EC99E7';
const apiGetCoin = axios.create({
    baseURL: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano&vs_currencies=usd,eur,jpy`
});
apiGetCoin.get().then(res => {
    const data = res.data;

    let html = '';
    Object.keys(data).forEach(function (key) {
        html +=/* html */`
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
API.callWithToken().get('auth/me').then(resMe => {
    elCommentForm.classList.remove('d-none');
    elCommentNoitce.classList.add('d-none');
    email = resMe.data.data.email;
}).catch(err => {
    elCommentForm.classList.add('d-none');
    elCommentNoitce.classList.remove('d-none');
}).finally(function () {
    renderListComment(commentByArticle);
});

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
        if (RECENT_POSTS.length === 4) RECENT_POSTS.shift();

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

elCommentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const content = elCommentContent.value.trim();

    if (content) {
        const newContent = {
            id: self.crypto.randomUUID(),
            email,
            content: level === 1 ? content : `<span class="text-danger">@${elReplyEmail.innerText}</span>: ${content}`,
            dateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            articleId: id,
        }
        if (parentCommentId) {
            const parentIdx = COMMENTS.findIndex(item => item.id === parentCommentId);
            COMMENTS[parentIdx].childItems.push(newContent);
        } else {
            newContent.childItems = [];
            COMMENTS.unshift(newContent);
        }
        localStorage.setItem('COMMENT', JSON.stringify(COMMENTS));
        const commentByArticle = COMMENTS.filter(item => item.articleId === id)
        renderListComment(commentByArticle);
        parentCommentId = null;
        elCommentMessageReply.classList.add('d-none');
    } else {
        alert('Vui lòng nhập nội dung bình luận!')
    }
    elCommentContent.value = '';
})
function renderListComment(list) {
    let html = '';
    list.forEach(item => {
        let htmlChild = '';

        if (item.childItems.length > 0) {

            htmlChild +=/* html */`<div class="comment-reply mt-5" id="comment-reply">`;
            htmlChild +=/* html */`<p id="totalComment" class="m-0 ms-5 mt-2">${item.childItems.length} bình luận trả lời</p>`;
            item.childItems.forEach(itemChild => {
                const btnReply = email ? `<div class="reply btn-reply-comment"><a href="#commentWaraper" class="btn-reply-comment" data-level="2" data-id="${item.id}" data-reply-email="${itemChild.email}"><i class="fa-regular fa-share"></i> Trả lời</a></div>` : '';
                htmlChild +=/* html */`
            <div class="position-relative mb-4 ms-5 p-2">
                <div class="content">
                    <div class="image-area d-flex">
                        <img src="assets/images/home-1/trending-left/commentator-1.png"
                            alt="author">
                        <div class="mx-2">
                            <h5 class="title">${itemChild.email}</h5>
                            <a href="#" class="pe-none">${dayjs(itemChild.dateTime).fromNow()}</a>
                        </div>
                    </div>
                    <p class="desc">${itemChild.content}</p>
                </div>
                ${btnReply}
                <hr>
            </div>`;
            })
            htmlChild +=/* html */`</div>`;
        }
        const btnReply = email ? `<div class="reply btn-reply-comment"><a href="#commentWaraper"  class="btn-reply-comment" data-level="1" data-id="${item.id}" data-reply-email="${item.email}"><i class="fa-regular fa-share"></i> Trả lời</a></div>` : ''
        html += /* html */`
        <li class="wrapper d-flex flex-column mb-2">
            <div class="content">
            <div class="image-area d-flex">
                <img src="assets/images/home-1/trending-left/commentator-1.png"
                alt="author">
                <div class="mx-2">
                    <h5 class="title">${item.email}</h5>
                    <a href="#" class="pe-none">${dayjs(item.dateTime).fromNow()}</a>
                </div>
            </div>
                <p class="desc">${item.content}</p>
            </div>
            ${btnReply}
          
            ${htmlChild}
        </li>`
    });
    elListComment.innerHTML = html;
    elTotalComment.innerHTML = list.length + ' bình luận';
}
elCancleReply.addEventListener('click', function (e) {
    e.preventDefault();
    parentCommentId = null;
    elCommentMessageReply.classList.add('d-none');

})
elListComment.addEventListener('click', function (e) {
    const el = e.target;

    if (el.classList.contains('btn-reply-comment')) {
        parentCommentId = el.dataset.id;
        elCommentMessageReply.classList.remove('d-none');
        elReplyEmail.innerText = el.dataset.replyEmail;
        level = parseInt(el.dataset.level);
        console.log(level);
    }
})
