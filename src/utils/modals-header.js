const modalFilter = document.querySelector('.modal-conteiner-filter')
const modalPerfil = document.querySelector('.modal-conteiner-perfil')
const btnFilter = document.querySelector('.btn-filter')
const btnPerfil = document.querySelector('#btn-perfil')
const rangePessoa = document.querySelector('#range-pessoa')
const rangeDistancia = document.querySelector('#range-distancia')
const valueRangePessoa = document.querySelector('#value-range-pessoas')
const valueRangeDistancia = document.querySelector('#value-range-distancia')
const btnArrowBack = document.querySelector("#btn-arrow-header")

function openModalFilter() {
    modalFilter.classList.add('mostrar')

    modalFilter.addEventListener("click", (e) => {
        if (e.target.id == "button-fechar" || e.target.className == modalFilter.className) {
            modalFilter.classList.remove('mostrar')
            if (valueRangePessoa.attributes[2] !== undefined) {
                localStorage.setItem("myreserve-filter-people", valueRangePessoa.attributes[2].value)
            }
            if (valueRangeDistancia.attributes[2] !== undefined) {
                localStorage.setItem("myreserve-filter-distance", valueRangeDistancia.attributes[2].value)
            }
        }
    })
}

function openModalPerfil() {
    modalPerfil.classList.add('mostrar');

    modalPerfil.addEventListener("click", (e) => {
        modalPerfil.classList.remove('mostrar')
    })
}

if (btnPerfil != null) {
    btnPerfil.addEventListener("click", openModalPerfil)
}
if (btnFilter != null) {
    btnFilter.addEventListener("click", openModalFilter)
}

if (btnArrowBack != null) {
    btnArrowBack.addEventListener("click", () => {
        localStorage.setItem("myreserve-filter-people", valueRangePessoa.attributes[2].value)
        localStorage.setItem("myreserve-filter-distance", valueRangeDistancia.attributes[2].value)
    })
}

window.addEventListener("load", () => {
    if (localStorage.getItem("myreserve-filter-people") != null) {
        valueRangePessoa.textContent = localStorage.getItem("myreserve-filter-people");
        rangePessoa.setAttribute("value", localStorage.getItem("myreserve-filter-people"))
    } else {
        valueRangePessoa.textContent = rangePessoa.value;
        localStorage.setItem("myreserve-filter-people", rangePessoa.value)
    }
})
window.addEventListener("load", () => {
    if (localStorage.getItem("myreserve-filter-distance") != null) {
        valueRangeDistancia.textContent = localStorage.getItem("myreserve-filter-distance") + 'km';
        rangeDistancia.setAttribute("value", localStorage.getItem("myreserve-filter-distance"))
    } else {
        valueRangeDistancia.textContent = rangeDistancia.value + 'km';
        localStorage.setItem("myreserve-filter-distance", rangeDistancia.value)
    }
})
rangePessoa.addEventListener('change', (e) => {
    valueRangePessoa.textContent = e.target.value;
    valueRangePessoa.setAttribute("data-value", e.target.value)
})
rangeDistancia.addEventListener('change', (e) => {
    valueRangeDistancia.textContent = e.target.value + 'km';
    valueRangeDistancia.setAttribute("data-value", e.target.value)
})