const lookpForm = document.querySelector('#lookup-form');

lookpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    var data = serializeForm(this);

    console.log(data);
    axios.post('https://httpbin.org/post', data)
    .then(res => {

        createToast('Posted', 'success');
    })
    .catch(err => {
        createToast(err.message ?? 'Ha ocurrido un error', 'error');
    });
});

function serializeForm(form) {
    var formdata = new FormData(form);

    var payload = {};
    for (let [key, value] of formdata) {
        payload[key] = value;
    }
    return payload;
}

function createToast(message, type) {
    let types = [];
    types['success'] = 'bg-success';
    types['error'] = 'bg-danger';
    types['info'] = 'bg-primary';

    var toast = document.createElement('div');
    toast.classList.add('toast');
    toast.classList.add('l-4');
    toast.classList.add('align-items-center');
    toast.classList.add('top-0');
    toast.classList.add('start-0');
    toast.classList.add('text-white');
    toast.classList.add(types[type]);
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    var toastWrapper = document.createElement('div');
    toastWrapper.classList.add('d-flex');

    var toastBody = document.createElement('div');
    toastBody.classList.add('toast-body');
    toastBody.innerHTML = message ?? 'No message';

    var closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.classList.add('text-white');
    closeButton.classList.add('btn-close');
    closeButton.classList.add('me-2');
    closeButton.classList.add('m-auto');
    closeButton.setAttribute('data-bs-dismiss', 'toast');
    closeButton.setAttribute('aria-label', 'Close');

    toastWrapper.appendChild(toastBody);
    toastWrapper.appendChild(closeButton);
    toast.appendChild(toastWrapper);

    document.body.appendChild(toast);


    return new bootstrap.Toast(toast, {
        animation: true,
        autohide: true,
        delay: 10000
    }).show();
    // return `<div class="toast hide align-items-center ${types[type]} top-0 left-0" role="alert" aria-live="assertive" aria-atomic="true">
    //             <div class="d-flex">
    //                 <div class="toast-body">
    //                     ${message}
    //                 </div>
    //                 <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    //             </div>
    //         </div>`;
}