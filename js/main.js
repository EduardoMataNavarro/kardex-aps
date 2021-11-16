function clearContainer(container) {
    while (container.firstChild) {
        container.remove(container.lastChild);
    }
}
function serializeForm(form) {
    var formdata = new FormData(form);

    var payload = {};
    for (let [key, value] of formdata) {
        payload[key] = value;
    }
    return payload;
}

function rearangeTable(data, table, direction) {

    if (direction === 'horizontal') {
        data.forEach( el => {
            var row = document.createElement('tr');
            for (let [key, val] of el ) {
                var col = document.createElement('td');
                col.textContent = val;
                row.appendChild(col);
            }
            table.appendChild(row);
        });
    }
    if (direction === 'vertical') {
        data.forEach( el => {
            for (const [key, val] of data) {
                var row = document.createElement('tr');
                var frstCol = document.createElement('td');
                var scndCol = document.createElement('td');

                frstCol.textContent = key;
                scndCol.textContent = val;

                row.appendChild(frstCol);
                row.appendChild(scndCol);

                table.appendChild(row);
            }
        });
    }
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
}