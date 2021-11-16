const lookpForm = document.querySelector('#lookup-form');

lookpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    var data = serializeForm(this);

    console.log(data);

    axios.post('https://httpbin.org/post', data)
    .then(res => {
        console.log('response');
        console.log(res);
        const { movimientos, trabajadores } = res.data;

        if (movimientos && trabajadores) {
            const resultsTable = document.querySelector('#results-table');
            clearContainer(resultsTable);
            rearangeTable(movimientos, resultsTable, 'horizontal');
    
            const workersContainer = document.querySelector('#worker-info-container');
            clearContainer(workersContainer);
            
            trabajadores.forEach(trabajador => {
                const container = document.createElement('div');
                
                container.classList.add('col-md-6');
                container.classList.add('d-inline-block');
    
                const table = document.createElement('table');
                rearangeTable(trabajador, table, 'vertical');
    
                container.appendChild(table);
    
                trabajadoresContainer.appendChild(container);
            });
        }
    })
    .catch(err => {
        createToast(err.message ?? 'Ha ocurrido un error', 'error');
    });
});
