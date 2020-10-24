const modalFilter = document.querySelector('.modal-conteiner-filter')
const modalPerfil = document.querySelector('.modal-conteiner-perfil')
const btnFilter = document.querySelector('.btn-filter')
const btnPerfil = document.querySelector('#btn-perfil')
const rangePessoa = document.querySelector('#range-pessoa')
const rangeDistancia = document.querySelector('#range-distancia')
const valueRangePessoa = document.querySelector('#value-range-pessoas')
const valueRangeDistancia = document.querySelector('#value-range-distancia')

function openModalFilter() {
    modalFilter.classList.add('mostrar')

    modalFilter.addEventListener("click", (e) => {
        if (e.target.id == "button-fechar" || e.target.className == modalFilter.className) {
            modalFilter.classList.remove('mostrar')
        }
    })
}

function openModalPerfil() {
    modalPerfil.classList.add('mostrar');

    modalPerfil.addEventListener("click", (e) => {
        modalPerfil.classList.remove('mostrar')
    })
}

btnPerfil.addEventListener("click", openModalPerfil)
btnFilter.addEventListener("click", openModalFilter)

window.addEventListener("load", () => {
    valueRangePessoa.textContent = rangePessoa.value;
})
window.addEventListener("load", () => {
    valueRangeDistancia.textContent = rangeDistancia.value + 'km';
})

rangePessoa.addEventListener('change', (e) => {
    valueRangePessoa.textContent = e.target.value;
})
rangeDistancia.addEventListener('change', (e) => {
    valueRangeDistancia.textContent = e.target.value + 'km';
})