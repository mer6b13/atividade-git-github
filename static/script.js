async function carregarTarefas() {
    const resposta = await fetch("/tarefas");
    const tarefas = await resposta.json();

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        const item = document.createElement("li");

        const nome = document.createElement("span");
        nome.textContent = tarefa.nome;

        if (tarefa.concluida) {
            nome.classList.add("concluida");
        }

        const concluir = document.createElement("button");
        concluir.textContent = "Concluir";
        concluir.onclick = () => concluirTarefa(tarefa.id);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.onclick = () => excluirTarefa(tarefa.id);

        item.appendChild(nome);
        item.appendChild(concluir);
        item.appendChild(excluir);

        lista.appendChild(item);
    });
}


async function adicionarTarefa() {
    const campo = document.getElementById("nomeTarefa");

    const resposta = await fetch("/tarefas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: campo.value
        })
    });

    if (resposta.ok) {
        campo.value = "";
        carregarTarefas();
    } else {
        alert("Digite uma tarefa válida!");
    }
}


async function concluirTarefa(id) {
    await fetch(`/tarefas/${id}`, {
        method: "PUT"
    });

    carregarTarefas();
}


async function excluirTarefa(id) {
    await fetch(`/tarefas/${id}`, {
        method: "DELETE"
    });

    carregarTarefas();
}


carregarTarefas();