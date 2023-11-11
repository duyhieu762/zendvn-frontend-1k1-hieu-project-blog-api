const API = {
    call: function () {
        return axios.create({
            baseURL: 'https://apiforlearning.zendvn.com/api/v2/',
        })
    },
    callWithToken: function (token) {
        if (!token) token = localStorage.getItem('TOKEN_ACCESS');

        return axios.create({
            baseURL: 'https://apiforlearning.zendvn.com/api/v2/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    }

}


dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale('vi')

let RECENT_POSTS = JSON.parse(localStorage.getItem('RECENT-POSTS')) || [];

let recentPostIdString = RECENT_POSTS.toString();
const recentPost = document.getElementById('recentPost');

//danh mục footer
const elFooterPopularMost = document.getElementById('most-popular');
API.call().get('categories_news').then(response => {
    const data = response.data.data;
    let html = '';
    data.forEach((item, index) => {
        if (index < 10) {
            html +=/* html */`
                <li><a href="category.html?id=${item.id}">${item.name}</a></li>`
        }
    });
    elFooterPopularMost.innerHTML = html;
})
function showFormErrorMessage(err, el) {
    const error = err.response.data.errors;
    let errString = '';

    for (const property in error) {
        errString +=/* html */`
              <li>${error[property]}</li>`
    }
    el.innerHTML = /* html */`
          <div class="alert alert-danger" role="alert">
              <ul>${errString}</ul>
         </div>`;
}

function showToastMessage(message){
    Toastify({
      text: message,
      duration: 3000,
      close: true
  }).showToast();
  }