async function carregarTarefas() {
    const resposta = await fetch("/tarefas");
    const tarefas = await resposta.json();

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    document.getElementById("contador").textContent =
        `Total de tarefas: ${tarefas.length}`;

    if (tarefas.length === 0) {
        const mensagem = document.createElement("li");
        mensagem.textContent = "Nenhuma tarefa cadastrada.";
        lista.appendChild(mensagem);
    }

    tarefas.forEach(tarefa => {
        const item = document.createElement("li");

        const informacoes = document.createElement("div");

        const nome = document.createElement("span");
        nome.textContent = tarefa.nome;

        if (tarefa.concluida) {
            nome.classList.add("concluida");
        }

        const data = document.createElement("small");
        data.textContent = `Criada em: ${tarefa.data_criacao}`;

        informacoes.appendChild(nome);
        informacoes.appendChild(document.createElement("br"));
        informacoes.appendChild(data);

        const concluir = document.createElement("button");
        concluir.textContent = "Concluir";
        concluir.onclick = () => concluirTarefa(tarefa.id);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.onclick = () => excluirTarefa(tarefa.id);

        item.appendChild(informacoes);
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