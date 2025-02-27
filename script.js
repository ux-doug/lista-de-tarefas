// Declaração de variáveis da Lista de Tarefas

const button = document.querySelector(".addTarefa");
const input = document.querySelector(".tarefas");
const listaFinal = document.querySelector(".lista"); // ListaD que é exiba no HTML
const filtroTarefas = document.querySelector(".filtroTarefas");
let listaDeTarefas = [];
recarregarLista();
// Declaração de Funções da Lista de Tarefas

function entradaUsuario() {
    if (input.value === "") {               // Verifica se o usuário digitou uma tarefa válida para o array
        alert("Insira uma tarefa");
    } else {
        listaDeTarefas.push({
            tarefa: input.value,            // Objeto tarefa e suas características condicionais para o Filtro de Tarefas.
            concluida: false,
            pendente: true
        });
        localStorage.setItem(`listaLS`, JSON.stringify(listaDeTarefas));
    }

    exibirTarefas();
    input.value = "";                       // Zera o campo do placeholder ao adicionar uma tarefa
}


function exibirTarefas() {
    let liHTML = "";                      //Declaração vazia para uso posterior;
    const filtro = filtroTarefas.value;

    const tarefasFiltradas = listaDeTarefas.filter((task) => {         // Condições de Filtragem(Filtro de Tarefas);
        if (filtro === "todos") return true;
        if (filtro === "concluida" && task.concluida) return true;
        if (filtro === "pendente" && task.pendente) return true;
        return false;
    });

    tarefasFiltradas.forEach((tasks, index) => {                        // Criação das <li> para exibição das tarefas adicionadas
        liHTML = liHTML + `
            <li class="lista__tarefas ${tasks.concluida ? "concluido" : ""}">
                <img class="icones" src="./arquivos/confirmar.png" onclick="concluirTarefa(${index})">
                <p>${tasks.tarefa}</p>
                <img class="icones" src="./arquivos/excluir.png" onclick="deletarTarefa(${index})">
            </li>
        `;
    });

    listaFinal.innerHTML = liHTML;
    exibirPendencias();
}

function concluirTarefa(index) {
    listaDeTarefas[index].concluida = !listaDeTarefas[index].concluida; // Inverte o booleano;
    listaDeTarefas[index].pendente = !listaDeTarefas[index].pendente;
    localStorage.setItem(`listaLS`, JSON.stringify(listaDeTarefas));
    exibirTarefas();
}

function deletarTarefa(index) {
    listaDeTarefas.splice(index, 1);
    localStorage.setItem(`listaLS`, JSON.stringify(listaDeTarefas));
    exibirTarefas();
}

function recarregarLista() {
    const localLista = localStorage.getItem(`listaLS`);
    if (localLista) {
        listaDeTarefas = JSON.parse(localLista);
    }
    exibirTarefas();
}



// Verifica quantidade Tarefas Pendentes
function exibirPendencias() {
    const pendentes = listaDeTarefas.filter(task => task.pendente).length;
    if (pendentes <= 0) {
        document.getElementById("contadorPendencias").innerHTML = ``;
    } else if (pendentes > 1) {
        document.getElementById("contadorPendencias").innerHTML = `Você tem ${pendentes} tarefas pendentes`;
    } else {
        document.getElementById("contadorPendencias").innerHTML = `Você tem ${pendentes} tarefa pendente`
    }
}



// Declaração de Eventos da Lista de Tarefas
button.addEventListener("click", entradaUsuario);
filtroTarefas.addEventListener("change", exibirTarefas);

// Declaração de Armazenamento Local
localStorage.setItem(`listaLS`, JSON.stringify(listaDeTarefas));


