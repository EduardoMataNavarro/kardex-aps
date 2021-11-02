const fieldsForm = document.querySelector('#fields-form');
const tableBody = document.querySelector('#table-body');
const tableHeaders = document.querySelectorAll('.sortable');

var tableList = [];

function clearTable() {
    var child = tableBody.firstElementChild;

    while (child) {
        child.remove();
        child = tableBody.firstElementChild;
    }
}
function rebuildTable() {
    if (tableList.length > 0) {
        clearTable();

        tableList.forEach(el => {
            var tableRow = document.createElement('tr');
            tableRow.classList.add('text-center');
            tableRow.classList.add('align-middle');
            tableRow.setAttribute('sort-field', el.name);
            tableRow.innerHTML = el.value;

            tableBody.appendChild(tableRow);
        })
    }
}

function serializeForm() {
    var formdata = new FormData(fieldsForm);

    var payload = {};
    for (const [name, value] of formdata) {
        payload[name] = value;
    }

    return payload;
}

fieldsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    axios.post('https://httpbin.org/post', serializeForm())
    .then( res => {
        console.log(res.data);
    })
    .catch( err => {
        console.log(err);
    })
});

tableHeaders.forEach(el => {
    el.addEventListener('click', (e) => {
        console.log(e.target.attributes['sort-field'].value);
        rebuildTable();
    });
})

