function CapturarValores(){
    const nome = document.getElementById('name').value;
    const altura = document.getElementById('height').value;
    const peso = document.getElementById('weight').value;

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
        return "Abaixo do peso"
    } else if (imc < 25){
        return "peso normal"
    } else if (imc < 30){
        return "sobrepeso"
    } else {
        return "obesidade"
    }
}

function OrganizarDados(dadosUsuario, valorImc, classificacaoImc){
    const dataHoraAtual = Intl .DateTimeFormat('pt-BR', {timeStyle:'long', dateStyle: 'short'}).format(Date.now());
    const dadosUsuarioCompleto={
    ...dadosUsuario;
    imc:valorImc.toFixed(2),
    classificacaoImc:classificacaoImc,
    dataCadastro:dataHoraAtual

    }
    return dadosUsuarioCompleto;
}