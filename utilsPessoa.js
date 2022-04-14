let nome = document.querySelector('#nome')
let dataNasc = document.querySelector('#dataNasc')
let naturalCid = document.querySelector('#naturalCid')
let naturalEst = document.querySelector('#naturalEst')
let rua = document.querySelector('#rua')
let numero = document.querySelector('#numero')
let cep = document.querySelector('#cep')
let cidadeRes = document.querySelector('#cidadeRes')
let estadoRes = document.querySelector('#estadoRes')
let telefone = document.querySelector('#telefone')
let email = document.querySelector('#email')

let corpoTabela = document.querySelector('#corpoTab')

// salva primeiro cadastro
function salvar() {
    let params = new URLSearchParams(window.location.search)
    let idPessoa = params.get('id')
    let pessoa = new Pessoa(nome.value, dataNasc.value, naturalCid.value,
        naturalEst.value, rua.value, numero.value, cep.value,
        cidadeRes.value, estadoRes.value, telefone.value, email.value)
    if (idPessoa) {
        pessoa.id = idPessoa
        pessoa.update()
    } else {
        pessoa.create()
    }

}
// carrega dados do banco e cria/preenche tabela dinamicamente
function carregarDados() {
    let obj = new Pessoa()
    obj.consultaPessoas(criaTabela)
}

function criaTabela(dadosRecebidos) {
    let listaPessoas = JSON.parse(dadosRecebidos)
    var trs = ""
    for (let indice in listaPessoas) {
        trs += `<tr> 
                <td>${listaPessoas[indice].id} </td>
                <td>${listaPessoas[indice].nome} </td>
                <td>${listaPessoas[indice].dataNasc} </td>
                <td>${listaPessoas[indice].cidadeRes} </td>
                <td><button type="button" onclick="window.location.href = 'cadastro.html?id=${listaPessoas[indice].id}'" class="btn btn-outline-warning">Editar</button></td>
                <td><button type="button" onclick="excluir(${listaPessoas[indice].id})" class="btn btn-outline-danger">Excluir</button>
                </tr>`
       
    }
    corpoTabela.innerHTML = trs
}
//preenche form com dados do banco e pega ID
function preencheForm(dadosRecebidos) {
    let list = JSON.parse(dadosRecebidos)
    nome.value = list.nome
    dataNasc.value = list.dataNasc
    naturalCid.value = list.cidadeNat
    naturalEst.value = list.estadoNat
    rua.value = list.rua
    numero.value = list.numero
    cep.value = list.cep
    cidadeRes.value = list.cidadeRes
    estadoRes.value = list.estadoRes
    telefone.value = list.telefone
    email.value = list.email
}

function capturaParametro() {
    let params = new URLSearchParams(window.location.search)
    let idPessoa = params.get('id')
    if (idPessoa) {
        let obj = new Pessoa()
        obj.consultaPessoasID(idPessoa, preencheForm)
    }
}
// exclusao pelo ID
function excluir(id) {
    let obj = new Pessoa()
    obj.delete(id)
}
