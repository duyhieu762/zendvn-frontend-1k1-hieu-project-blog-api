API.callWithToken().get('auth/me').then(resMe => {

}).catch(err => {
    window.location.href = 'index.html'
})

const elActicle = document.getElementById('acticle');
API.callWithToken().get('articles/my-articles').then(res => {
    const acticles = res.data.data;
    let html = '';
    acticles.forEach(item => {
        const checked = item.status === '1' ? 'checked' : ''

        html +=/* html */`
        <tr>
            <td>${item.id}</td>
            <td>
            <img src="${item.thumb}" alt="" width="150px">
            </td>
            <td>
            ${item.title}
            </td>
            <td>
            ${renderSlbCategory(item.category.id, item.id)}
            </td>
            <td>
            <input type="checkbox" class="form-check-input chkStatus" ${checked} data-id="${item.id}">
            </td>
            <td>
            <div class="d-flex flex-column">
            <a href="detail.html?id=${item.id}" class="btn btn-info mb-2">View</a>
            <a href="admin-update-article.html?id=${item.id}" class="btn btn-warning mb-2">Edit</a>
            <button class="btn btn-danger delete-article" data-id="${item.id}">Delete</button>
            </div>
            
            
            </td>
        </tr>`
    });
    elActicle.innerHTML = html;
})

elActicle.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('delete-article')) {
        const acticleId = el.dataset.id;

        el.parentElement.parentElement.remove();

        API.callWithToken().delete(`articles/${acticleId}`).then(res => {
            showToastMessage('Xóa bài viết thành công');
            el.parentElement.parentElement.remove();
        })
    }
})

elActicle.addEventListener('change', function (e) {
    const el = e.target;
    if (el.classList.contains('category')) {
        const categoryId = el.value;
        const acticleId = el.dataset.id;

        API.callWithToken().patch(`articles/${acticleId}`, { category_id: categoryId }).then(res => {
            showToastMessage('Thay đổi danh mục bài viết thành công')
        })
    }
    if (el.classList.contains('chkStatus')) {

        const status = el.checked ? 1 : 0;
        const acticleId = el.dataset.id;
        API.callWithToken().patch(`articles/${acticleId}`, { status }).then(res => {
            showToastMessage('Thay đổi trạng thái thành công')
        })
    }
})

function renderSlbCategory(id, acticleId) {

    const categores = [
        { id: 1, name: 'Thế Giới' },
        { id: 2, name: 'Thời sự' },
        { id: 3, name: 'Kinh doanh' },
        { id: 5, name: 'Giải trí' },
        { id: 6, name: 'Thể thao' },
        { id: 7, name: 'Pháp luật' },
        { id: 8, name: 'Giáo dục' },
        { id: 9, name: 'Sức khỏe' },
        { id: 10, name: 'Đời sống' },
        { id: 11, name: 'Du Lịch' },
        { id: 12, name: 'Khoa học' },
        { id: 13, name: 'Số hóa' },
        { id: 14, name: 'Xe' },
    ];

    let html = '';
    categores.forEach(item => {
        const selected = item.id === id ? 'selected' : ''
        html += `<option value="${item.id}" ${selected}>${item.name}</option>`
    })
    return `
    <select class="form-select category" data-id="${acticleId}">
        ${html}
    </select>`
}