from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

tarefas = []
proximo_id = 1


@app.route("/")
def inicio():
    return render_template("index.html")


@app.route("/tarefas", methods=["GET"])
def listar_tarefas():
    return jsonify(tarefas)


@app.route("/tarefas", methods=["POST"])
def adicionar_tarefa():
    global proximo_id

    dados = request.get_json()

    nome = dados.get("nome", "").strip()

    if not nome:
        return jsonify({"erro": "Digite uma tarefa"}), 400

    tarefa = {
        "id": proximo_id,
        "nome": nome,
        "concluida": False
    }

    tarefas.append(tarefa)
    proximo_id += 1

    return jsonify(tarefa), 201


@app.route("/tarefas/<int:id>", methods=["PUT"])
def concluir_tarefa(id):
    for tarefa in tarefas:
        if tarefa["id"] == id:
            tarefa["concluida"] = not tarefa["concluida"]
            return jsonify(tarefa)

    return jsonify({"erro": "Tarefa não encontrada"}), 404


@app.route("/tarefas/<int:id>", methods=["DELETE"])
def excluir_tarefa(id):
    for tarefa in tarefas:
        if tarefa["id"] == id:
            tarefas.remove(tarefa)
            return jsonify({"mensagem": "Tarefa excluída"})

    return jsonify({"erro": "Tarefa não encontrada"}), 404


if __name__ == "__main__":
    app.run(debug=True)