// 1. Seleciona os elementos da página
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const calcularBtn = document.getElementById('calcular');
const novoCalculoBtn = document.getElementById('novo-calculo');

const telaEntrada = document.getElementById('tela-entrada');
const telaResultado = document.getElementById('tela-resultado');

const resultadoDiv = document.getElementById('resultado');

// 2. Define as informações de cada categoria de IMC em um objeto
const categoriasIMC = {
    'abaixo-do-peso': {
        titulo: 'Abaixo do peso',
        descricao: 'Geralmente indica uma deficiência nutricional. Pode estar associado a problemas de saúde como anemia, fraqueza e baixa imunidade.',
        pros: 'Geralmente está associado a menor risco de doenças cardiovasculares.',
        contras: 'Aumento do risco de osteoporose, anemia e problemas de fertilidade.',
        recomendacoes: 'Consulte um profissional de saúde para investigar a causa e um nutricionista para um plano de ganho de peso saudável.'
    },
    'peso-normal': {
        titulo: 'Peso normal',
        descricao: 'Parabéns! Seu peso está na faixa ideal. Manter esse peso reduz significativamente os riscos de doenças.',
        pros: 'Menor risco de doenças crônicas como diabetes tipo 2, hipertensão e alguns tipos de câncer.',
        contras: 'Manter o peso ideal exige um balanço entre alimentação e exercícios físicos.',
        recomendacoes: 'Mantenha uma dieta equilibrada e uma rotina regular de exercícios físicos para preservar a saúde e o bem-estar.'
    },
    'sobrepeso': {
        titulo: 'Sobrepeso',
        descricao: 'Indica excesso de peso. É um sinal de alerta para o risco de desenvolver problemas de saúde no futuro.',
        pros: 'Nenhum benefício direto, mas é uma condição que pode ser revertida com dieta e exercícios.',
        contras: 'Aumento do risco de doenças cardiovasculares, diabetes e problemas nas articulações.',
        recomendacoes: 'Comece a fazer pequenas mudanças na sua rotina, como caminhadas diárias e a inclusão de mais vegetais na dieta.'
    },
    'obesidade-grau-i': {
        titulo: 'Obesidade grau I',
        descricao: 'Este nível de obesidade já representa um risco considerável para a saúde. É importante buscar orientação médica para um plano de ação.',
        pros: 'Nenhum benefício direto.',
        contras: 'Aumento significativo do risco de doenças cardíacas, apneia do sono e problemas hepáticos.',
        recomendacoes: 'É altamente recomendado procurar um médico e um nutricionista para um plano de perda de peso seguro e eficaz.'
    },
    'obesidade-grau-ii': {
        titulo: 'Obesidade grau II',
        descricao: 'Risco de saúde grave. O acompanhamento médico e nutricional é fundamental e urgente.',
        pros: 'Nenhum benefício direto.',
        contras: 'Risco muito elevado de complicações metabólicas e problemas de mobilidade.',
        recomendacoes: 'O tratamento pode envolver mudanças na dieta, aumento da atividade física e, em alguns casos, acompanhamento clínico mais intensivo.'
    },
    'obesidade-grau-iii': {
        titulo: 'Obesidade grau III (mórbida)',
        descricao: 'O nível mais alto de obesidade, com risco de vida. A intervenção médica é essencial.',
        pros: 'Nenhum benefício direto.',
        contras: 'Aumento extremo do risco de doenças crônicas graves, incapacidade e morte prematura.',
        recomendacoes: 'Essa condição requer uma abordagem multidisciplinar e pode necessitar de cirurgia bariátrica ou outras intervenções médicas.'
    }
};

// Função para resetar a calculadora
const resetarCalculadora = () => {
    resultadoDiv.innerHTML = '';
    resultadoDiv.className = '';
    telaEntrada.style.display = 'block';
    telaResultado.style.display = 'none';
    pesoInput.value = '';
    alturaInput.value = '';
};

// Funções para envio de dados
const enviarDadosParaServidor = (imc, resposta) => {
    // URL que você copiou do Google Forms, mas com a parte final corrigida para 'formResponse'
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSdfEL2gVDecKvTwqSVm_oom4s4J0weDEuxGTlNeqvMkTtQ6Fw/formResponse';

    // AQUI você mapeia os nomes dos campos do seu formulário Google Forms
    // para os dados que você quer enviar.
    const data = new FormData();
    data.append('entry.866150270', imc);
    data.append('entry.183991129', resposta);

    fetch(url, {
            method: 'POST',
            body: data,
            mode: 'no-cors'
        })
        .then(() => {
            console.log("Dados enviados com sucesso para o Google Forms!");
        })
        .catch(error => {
            console.error("Erro ao enviar dados:", error);
        });
}

// 3. Adiciona um "ouvinte" de evento ao botão "Calcular"
calcularBtn.addEventListener('click', () => {

    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        resultadoDiv.innerHTML = "Por favor, insira valores válidos.";
        return;
    }

    const imc = peso / (altura * altura);

    let categoriaChave = "";
    if (imc < 18.5) {
        categoriaChave = 'abaixo-do-peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
        categoriaChave = 'peso-normal';
    } else if (imc >= 25 && imc <= 29.9) {
        categoriaChave = 'sobrepeso';
    } else if (imc >= 30 && imc <= 34.9) {
        categoriaChave = 'obesidade-grau-i';
    } else if (imc >= 35 && imc <= 39.9) {
        categoriaChave = 'obesidade-grau-ii';
    } else {
        categoriaChave = 'obesidade-grau-iii';
    }

    const info = categoriasIMC[categoriaChave];

    resultadoDiv.className = '';
    resultadoDiv.classList.add(categoriaChave);

    let htmlResultado = `
        <h3>Seu IMC é: ${imc.toFixed(2)}</h3>
        <p><strong>Categoria:</strong> ${info.titulo}</p>
        <p>${info.descricao}</p>
        <hr>
        <p><strong>Prós:</strong> ${info.pros}</p>
        <p><strong>Contras:</strong> ${info.contras}</p>
        <p><strong>Recomendações:</strong> ${info.recomendacoes}</p>
    `;

    if (categoriaChave !== 'peso-normal') {
        const pesoMaxNormal = (24.9 * altura * altura).toFixed(1);
        htmlResultado += `<hr><p>Para atingir o peso normal, sua faixa ideal deve ser <strong>${pesoMaxNormal} kg.</p>`;
    }

    // AQUI ESTÁ A NOVA PERGUNTA
    htmlResultado += `
        <hr>
        <p>Você sabia da importância dessas informações?</p>
        <div class="opcoes-pergunta">
            <button id="btn-sim">Sim</button>
            <button id="btn-nao">Não</button>
        </div>
    `;

    resultadoDiv.innerHTML = htmlResultado;

    telaEntrada.style.display = 'none';
    telaResultado.style.display = 'block';

    // AQUI ESTÁ A LÓGICA PARA AS RESPOSTAS
    document.getElementById('btn-sim').addEventListener('click', () => {
        enviarDadosParaServidor(imc.toFixed(2), 'Sim');
        alert('Obrigado pela sua resposta! Dados enviados.');
        resetarCalculadora();
    });

    document.getElementById('btn-nao').addEventListener('click', () => {
        enviarDadosParaServidor(imc.toFixed(2), 'Não');
        alert('Tudo bem, esperamos ter ajudado de alguma forma. Dados enviados.');
        resetarCalculadora();
    });
});

// 4. Adiciona o evento de clique ao novo botão "Fazer novo cálculo"
novoCalculoBtn.addEventListener('click', resetarCalculadora);