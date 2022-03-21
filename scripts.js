// dados de entrada
let moedaSelecionada = document.getElementById("select-moedas")
let botaoConverter = document.getElementById("botao")

// dados após conversão de valores
let valorConverter = document.getElementById("label-moeda-selecionada")
let valorConvertido1 = document.getElementById("label-valor-convertido-1")
let valorConvertido2 = document.getElementById("label-valor-convertido-2")
let valorEmReal = Number()
let valorEmDolar = Number()
let valorEmEuro = Number()

async function converterMoedas() {
    let moedas = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BRL-USD,BRL-EUR,USD-EUR,EUR-USD").then(function (resposta) {
        return resposta.json()
    })

    let realTOdolar = moedas.USDBRL.ask
    let euroTOdolar = moedas.USDEUR.ask
    let realTOeuro = moedas.EURBRL.ask
    let dolarTOeuro = moedas.EURUSD.ask
    let dolarTOreal = moedas.BRLUSD.ask
    let euroTOreal = moedas.BRLEUR.ask

    if (moedaSelecionada.value === "R$ Real Brasileiro") {
        let inputValor = Number(document.getElementById("input").value)
        let valorEmDolar = inputValor / realTOdolar
        let valorEmEuro = inputValor / realTOeuro
        valorConverter.innerHTML = inputValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        valorConvertido1.innerHTML = valorEmDolar.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        valorConvertido2.innerHTML = valorEmEuro.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
    }

    if (moedaSelecionada.value === "$ Dólar Americano") {
        let inputValor = Number(document.getElementById("input").value)
        let valorEmReal = inputValor / dolarTOreal
        let valorEmEuro = inputValor / euroTOdolar
        valorConverter.innerHTML = inputValor.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        valorConvertido1.innerHTML = valorEmReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        valorConvertido2.innerHTML = valorEmEuro.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
    }

    if (moedaSelecionada.value === "€ Euro") {
        let inputValor = Number(document.getElementById("input").value)
        let valorEmReal = inputValor / euroTOreal
        let valorEmDolar = inputValor / dolarTOeuro
        valorConverter.innerHTML = inputValor.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
        valorConvertido1.innerHTML = valorEmReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        valorConvertido2.innerHTML = valorEmDolar.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
}

function trocaMoeda() {
    let labelMoedaSelecionada = document.getElementById("label-moeda-selecionada")
    let imgMoedaSelecionada = document.getElementById("img-moeda-selecionada")
    let imgMoedaConversao1 = document.getElementById("img-moeda-conversao-1")
    let imgMoedaConversao2 = document.getElementById("img-moeda-conversao-2")
    let labelValorConvertido1 = document.getElementById("label-valor-convertido-1")
    let labelValorConvertido2 = document.getElementById("label-valor-convertido-2")
    let inputValorPlaceholder = document.getElementById("input")

    if (moedaSelecionada.value === "R$ Real Brasileiro") {
        labelMoedaSelecionada.innerHTML = "R$ 0,00"
        imgMoedaSelecionada.src = "./img/brasil.png"
        imgMoedaConversao1.src = "./img/eua.png"
        labelValorConvertido1.innerHTML = "$0,00"
        imgMoedaConversao2.src = "./img/euro.png"
        labelValorConvertido2.innerHTML = "0,00 €"
        inputValorPlaceholder.placeholder = "R$ 0,00"
    }

    if (moedaSelecionada.value === "$ Dólar Americano") {
        labelMoedaSelecionada.innerHTML = "$0,00"
        imgMoedaSelecionada.src = "./img/eua.png"
        imgMoedaConversao1.src = "./img/brasil.png"
        labelValorConvertido1.innerHTML = "R$ 0,00"
        imgMoedaConversao2.src = "./img/euro.png"
        labelValorConvertido2.innerHTML = "0,00 €"
        inputValorPlaceholder.placeholder = "$0,00"
    }

    if (moedaSelecionada.value === "€ Euro") {
        labelMoedaSelecionada.innerHTML = "0,00 €"
        imgMoedaSelecionada.src = "./img/euro.png"
        imgMoedaConversao1.src = "./img/brasil.png"
        labelValorConvertido1.innerHTML = "R$ 0,00"
        imgMoedaConversao2.src = "./img/eua.png"
        labelValorConvertido2.innerHTML = "$0,00"
        inputValorPlaceholder.placeholder = "0,00 €"
    }

    let input = document.getElementById("input")
    input.focus()

    converterMoedas()
}

botao.addEventListener("click", converterMoedas)
moedaSelecionada.addEventListener("change", trocaMoeda)

document.addEventListener('keypress', function (e) {
    if (e.which == 13) {
        converterMoedas()
    }
}, false);