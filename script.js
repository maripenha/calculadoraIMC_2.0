function CapValores(event){
    event.preventDefault()

    let dadosUsuario = CapturarValores();

    let imc = Number(calcularImc(dadosUsuario.altura, dadosUsuario.peso));

    let classificacao = ClassificarImc(imc);

    let dadosUsuariosCompleto = OrganizarDados(dadosUsuario, imc, classificacao);

    CadastrarUsuario(dadosUsuariosCompleto);

    window.location.reload();
}

function CapturarValores(){
    const nome = document.getElementById('name').value;
    const altura = Number(document.getElementById('height').value);
    const peso = Number(document.getElementById('weight').value);

    const dadosUusario = {
        nome: nome,
        altura: altura,
        peso: peso
    }
    return dadosUusario;
}

function calcularImc(altura, peso){
    const imc = peso / (altura * altura)

    return imc
}

function ClassificarImc(imc){
    if (imc < 18.5) {
        return "Abaixo do peso!"
    } else if (imc < 25){
        return "peso normal!"
    } else if (imc < 30){
        return "sobrepeso"
    } else {
        return "obesidade"
    }
}

function OrganizarDados(dadosUsuario, valorImc, classificacaoImc){
    const dataHoraAtual = Intl.DateTimeFormat('pt-BR', {timeStyle:'long', dateStyle: 'short'}).format(Date.now());
    const dadosUsuarioCompleto = {
    ...dadosUsuario,
    imc: Number(valorImc.toFixed(2)),
    classificacaoImc: classificacaoImc,
    dataCadastro: dataHoraAtual

    }

    return dadosUsuarioCompleto;
}

function CadastrarUsuario(usuario) {
    let listaUsuario = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    listaUsuario.push(usuario)

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuario))
}

function carregarUsuarios() {
    let listaUsuario = []

    if(localStorage.getItem("usuariosCadastrados")){
        listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if(listaUsuario.length == 0){
        let tabela = document.getElementById('corpo-tabela');

        tabela.innerHTML = `
        <tr> 
            <td colspan="6" class="linha-mensagem"> Nenhum usuário cadastrado </td>
        </tr>
        `
    }
    else{
        montarTabela(listaUsuario)
    }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios())

function montarTabela(listaDeCadastrados){
    let tabela = document.getElementById('corpo-tabela')

    let template = " ";

    listaDeCadastrados.forEach(pessoa => {
        template +=`
        <tr>
        <td data-cell="nome" > ${pessoa.nome}</td>
        <td data-cell="altura" > ${pessoa.altura}</td>
        <td data-cell="peso" > ${pessoa.peso}</td>
        <td data-cell="imc" > ${pessoa.imc}</td>
        <td data-cell="classificacao" > ${pessoa.classificacaoImc}</td>
        <td data-cell="dataCadastro" > ${pessoa.dataCadastro}</td>
        </tr>
        `
    });
    tabela.innerHTML = template;
} 

