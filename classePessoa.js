class Pessoa {
    constructor(nome, dataNasc, cidadeNat, estadoNat, rua, numero, cep, cidadeRes, estadoRes, telefone, email) {
        this.nome = nome;
        this.dataNasc = dataNasc;
        this.cidadeNat = cidadeNat;
        this.estadoNat = estadoNat;
        this.rua = rua;
        this.numero = numero;
        this.cep = cep;
        this.cidadeRes = cidadeRes;
        this.estadoRes = estadoRes;
        this.telefone = telefone;
        this.email = email;
    }

    create() {
        fetch('http://localhost:3000/pessoas', {
            method: "POST",
            body: JSON.stringify(this),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    update() {
        fetch(`http://localhost:3000/pessoas/${this.id}`, {
            method: "PUT",
            body: JSON.stringify(this),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    consultaPessoas(criaTabela) {
        fetch('http://localhost:3000/pessoas')
            .then(x => x.text())
            .then(data => criaTabela(data))
    }

    consultaPessoasID(idPessoa, preencheForm) {
        fetch(`http://localhost:3000/pessoas/${idPessoa}`)
            .then(x => x.text())
            .then(data => preencheForm(data))
    }

    delete(idPessoa) {
        fetch(`http://localhost:3000/pessoas/${idPessoa}`, {
            method: "DELETE"
        })
    }
}