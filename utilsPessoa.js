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

//regras do form
let regras = [
    { name: "nome" },
    { name: "dataNasc" },
    { name: "naturalCid" },
    { name: "naturalEst" },
    { name: "rua" },
    { name: "numero" },
    { name: "cep" },
    { name: "cidadeRes" },
    { name: "estadoRes" },
    { name: "telefone" },
    { name: "email" }
]

// salva primeiro cadastro
function salvar() {
    let params = new URLSearchParams(window.location.search)
    let idPessoa = params.get('id')

    let pessoa = new Pessoa(nome.value, dataNasc.value, naturalCid.value,
        naturalEst.value, rua.value, numero.value, cep.value,
        cidadeRes.value, estadoRes.value, telefone.value, email.value)
    if (!validaForm()) {
        return
    }
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
                <th scope="row" class="more" onclick="toggle(this)">+</th>
                <td>${listaPessoas[indice].id} </td>
                <td>${listaPessoas[indice].nome} </td>
                <td>${listaPessoas[indice].dataNasc} </td>
                <td>${listaPessoas[indice].cidadeRes} </td>
                <td><span class="material-icons-outlined" onclick="window.location.href = 'cadastro.html?id=${listaPessoas[indice].id}'">edit</span></td>
                <td><span class="material-icons-outlined" onclick="excluir(${listaPessoas[indice].id})">delete</span></td>
                </tr>
                <tr style="display: none;">
                    <td colspan="4">
                        <div class="row">
                        <div class="col">
                            <div><b>Nome:</b> ${listaPessoas[indice].nome}</div>
                            <div><b>Nascimento:</b> ${listaPessoas[indice].dataNasc}</div>
                            <div><b>Naturalidade:</b> ${listaPessoas[indice].cidadeNat}</div>
                            <div><b>Estado:</b> ${listaPessoas[indice].estadoNat}</div>
                        </div>
                        <div class="col">
                            <div><b>Rua:</b> ${listaPessoas[indice].rua}</div>
                            <div><b>Número:</b> ${listaPessoas[indice].numero}</div>
                            <div><b>CEP:</b> ${listaPessoas[indice].cep}</div>
                            <div><b>Cidade:</b> ${listaPessoas[indice].cidadeRes} </div>
                        </div>
                        <div class="col">
                            <div><b>Estado:</b> ${listaPessoas[indice].estadoRes}</div>
                            <div><b>Telefone:</b> ${listaPessoas[indice].telefone}</div>
                            <div><b>Email:</b> ${listaPessoas[indice].email}</div>
                            <div><b>ID:</b> ${listaPessoas[indice].id}</div>
                        </div>
                        </div>
                    </td>
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

//função validação com base nas regras
function validaForm() {
    for (let regra of regras) {
        let input = document.querySelector(`#${regra.name}`)

        if (input.value === '') {
            input.focus()
            alert('Campo obrigatório')
            return false
        }
    }
    return true
}

//faz a expansão do + na tabela
function toggle(th) {
    let line = th.parentNode.nextElementSibling.style;
    if (line.display === "none") {
        th.innerText = "-";
        line.display = "table-row";
    } else {
        th.innerText = "+";
        line.display = "none";
    }
    console.log();
}