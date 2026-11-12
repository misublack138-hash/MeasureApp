async function login(){

    const usuario =
        document.getElementById(
            "usuario"
        ).value;

    const senha =
        document.getElementById(
            "senha"
        ).value;

    try{

        const resposta =
        await fetch(

            "https://measureapp-api.onrender.com/login",

            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    usuario,
                    senha

                })

            }

        );

        if(
            !resposta.ok
        ){

            document.getElementById(
                "status"
            ).innerHTML =
            "Usuário ou senha inválidos.";

            return;
        }

        const dados =
        await resposta.json();

        localStorage.setItem(
            "usuario",
            usuario
        );

        carregarHome();

    }catch(error){

        console.error(
            error
        );

        document.getElementById(
            "status"
        ).innerHTML =
        "Erro ao conectar ao servidor.";

    }

    localStorage.setItem(
        "usuario",
        usuario
    );

    carregarHome();
}

function mostrarCadastro(){

    document.body.innerHTML = `

        <div class="login-card">

            <h1>
                📏 Criar Conta
            </h1>

            <input
                id="novoUsuario"
                placeholder="Usuário">

            <input
                id="novaSenha"
                type="password"
                placeholder="Senha">

            <button
                onclick="criarConta()">

                Criar Conta

            </button>

            <button
                onclick="voltarLogin()">

                Voltar

            </button>

            <div id="status">
            </div>

        </div>

    `;
}

function voltarLogin(){

    location.reload();
}

async function criarConta(){

    const usuario =
        document.getElementById(
            "novoUsuario"
        ).value;

    const senha =
        document.getElementById(
            "novaSenha"
        ).value;

    if(
        usuario === "" ||
        senha === ""
    ){

        document.getElementById(
            "status"
        ).innerHTML =
        "Preencha todos os campos.";

        return;
    }

    try{

        const resposta =
        await fetch(

            "https://measureapp-api.onrender.com/cadastro",

            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    usuario,
                    senha

                })

            }

        );

        const dados =
        await resposta.json();

        if(
            dados.sucesso
        ){

            alert(
                "Conta criada com sucesso!"
            );

            voltarLogin();

        }else{

            alert(
                "Erro ao criar conta."
            );

        }

    }catch(error){

        console.error(error);

        alert(
            "Erro ao conectar ao servidor."
        );

    }


    usuarios.push({

        usuario,
        senha

    });

    localStorage.setItem(

        "usuarios",

        JSON.stringify(
            usuarios
        )

    );

    alert(
        "Conta criada com sucesso!"
    );

    location.reload();
}

function carregarHome(){

    const usuario =
        localStorage.getItem(
            "usuario"
        );

    document.body.innerHTML = `

        <div class="sidebar">

            <div class="logo">
                📏 MeasureApp
            </div>

            <div class="perfil">

                <div class="avatar">
                    👤
                </div>

                <div class="perfil-nome">
                    ${usuario}
                </div>

                <div class="perfil-status">
                    🟢 Online
                </div>

            </div>

            <button
                onclick="abrirAba('medidas')">

                📏 Medidas

            </button>

            <button
                onclick="abrirAba('ranking')">

                🏆 Ranking

            </button>

            <button
                onclick="abrirAba('contestacoes')">

                📬 Contestações

            </button>

            <button
                onclick="abrirAba('notificacoes')">

                🔔 Notificações

            </button>

            <button
                onclick="logout()">

                🚪 Sair

            </button>

        </div>

        <div class="main">

            <div class="topbar">

                Bem-vindo,
                ${usuario}

            </div>

            <div id="pagina">
            </div>

        </div>

    `;

    abrirAba(
        "medidas"
    );
}

function abrirAba(aba){

    if(
        aba === "medidas"
    ){

        carregarTelaMedidas();

    }

    else if(
        aba === "ranking"
    ){

        carregarRanking();

    }

    else if(
        aba === "contestacoes"
    ){

        carregarContestacoes();

    }

    else if(
        aba === "notificacoes"
    ){

        carregarNotificacoes();

    }
}
function carregarTelaMedidas(){

    const pagina =
        document.getElementById(
            "pagina"
        );

    pagina.innerHTML = `

        <div class="card">

            <h2>
                📏 Nova Medida
            </h2>

            <input
                type="number"
                id="medida"
                placeholder="Digite sua medida">

            <button
                onclick="salvarMedida()">

                Salvar Medida

            </button>

            <div id="historico">
            </div>

        </div>

    `;

    carregarMedidas();
}

async function salvarMedida(){

    const medida =
        document.getElementById(
            "medida"
        ).value;

    if(medida === "")
        return;

    try{

        const resposta =
        await fetch(

            "https://measureapp-api.onrender.com/medidas",

            {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    usuario:
                    localStorage.getItem(
                        "usuario"
                    ),

                    valor:
                    medida,

                    data:
                    new Date().toLocaleString(
                        "pt-BR"
                    )

                })

            }

        );

        const dados =
        await resposta.json();

        if(dados.sucesso){

            alert(
                "Medida salva!"
            );

            document.getElementById(
                "medida"
            ).value = "";

        }

    }catch(error){

        console.error(
            error
        );

        alert(
            "Erro ao salvar medida."
        );

    }

}

async function carregarMedidas(){

    const historico =
        document.getElementById(
            "historico"
        );

    if(!historico)
        return;

    const usuario =
        localStorage.getItem(
            "usuario"
        );

    try{

        const resposta =
        await fetch(

            "https://measureapp-api.onrender.com/medidas"

        );

        const medidas =
        await resposta.json();

        const minhasMedidas =
        medidas.filter(
            item =>
            item.usuario === usuario
        );

        let ultima = "-";
        let maior = "-";

        if(
            minhasMedidas.length > 0
        ){

            ultima =
            minhasMedidas[
                minhasMedidas.length - 1
            ].valor + " cm";

            maior =
            Math.max(
                ...minhasMedidas.map(
                    item =>
                    Number(item.valor)
                )
            ) + " cm";
        }

        let html = `

            <div class="dashboard-cards">

                <div class="dashboard-card">

                    <div class="dashboard-titulo">
                        Total
                    </div>

                    <div class="dashboard-valor">
                        ${minhasMedidas.length}
                    </div>

                </div>

                <div class="dashboard-card">

                    <div class="dashboard-titulo">
                        Última
                    </div>

                    <div class="dashboard-valor">
                        ${ultima}
                    </div>

                </div>

                <div class="dashboard-card">

                    <div class="dashboard-titulo">
                        Maior
                    </div>

                    <div class="dashboard-valor">
                        ${maior}
                    </div>

                </div>

            </div>

            <h3>
                Histórico de Medidas
            </h3>

        `;

        [...minhasMedidas]
        .reverse()
        .forEach(item => {

            html += `

                <div class="medida-card">

                    <div
                        class="medida-numero">

                        ${item.valor} cm

                    </div>

                    <div
                        class="medida-data">

                        📅 ${item.data}

                    </div>

                </div>

            `;

        });

        historico.innerHTML =
            html;

    }catch(error){

        console.error(
            error
        );

        historico.innerHTML =
        "Erro ao carregar medidas.";

    }


    let html = `

        <div class="dashboard-cards">

            <div class="dashboard-card">

                <div class="dashboard-titulo">
                    Total
                </div>

                <div class="dashboard-valor">
                    ${minhasMedidas.length}
                </div>

            </div>

            <div class="dashboard-card">

                <div class="dashboard-titulo">
                    Última
                </div>

                <div class="dashboard-valor">
                    ${ultima}
                </div>

            </div>

            <div class="dashboard-card">

                <div class="dashboard-titulo">
                    Maior
                </div>

                <div class="dashboard-valor">
                    ${maior}
                </div>

            </div>

        </div>

        <h3>
            Histórico de Medidas
        </h3>

    `;

    [...minhasMedidas]
    .reverse()
    .forEach(item => {

        html += `

            <div class="medida-card">

                <div
                    class="medida-numero">

                    ${item.valor} cm

                </div>

                <div
                    class="medida-data">

                    📅 ${item.data}

                </div>

            </div>

        `;

    });

    historico.innerHTML =
        html;
}

async function carregarRanking(){

    const pagina =
        document.getElementById(
            "pagina"
        );

    const usuarioLogado =
        localStorage.getItem(
            "usuario"
        );

    try{

        const resposta =
            await fetch(
                "https://measureapp-api.onrender.com/medidas"
            );

        const medidas =
            await resposta.json();

        const ranking = {};

        medidas.forEach(item => {

            const usuario =
                item.usuario;

            const valor =
                Number(item.valor);

            if(
                !ranking[usuario] ||
                valor > ranking[usuario]
            ){

                ranking[usuario] =
                    valor;

            }

        });

        const listaRanking =
            Object.entries(ranking)
            .sort(
                (a,b) => b[1] - a[1]
            );

        let posicao = "-";

        listaRanking.forEach(
            (item,index)=>{

                if(
                    item[0] === usuarioLogado
                ){

                    posicao =
                        index + 1;

                }

            }
        );

        let html = `
            <div class="card">

                <h2>
                    🏆 Ranking Geral
                </h2>
        `;

        if(
            listaRanking.length === 0
        ){

            html += `
                <p>
                    Nenhuma medida cadastrada.
                </p>
            `;

        } else {

            listaRanking.forEach(
                (item,index)=>{

                    let medalha = "🏅";

                    if(index === 0)
                        medalha = "🥇";

                    if(index === 1)
                        medalha = "🥈";

                    if(index === 2)
                        medalha = "🥉";

                    html += `
                        <div class="medida-card">

                            <strong>
                                ${medalha}
                                ${item[0]}
                            </strong>

                            <div class="medida-numero">
                                ${item[1]} cm
                            </div>

                        </div>
                    `;

                }
            );

        }

        html += `
            <div
                class="dashboard-card"
                style="margin-top:20px;">

                <div
                    class="dashboard-titulo">

                    Minha Posição

                </div>

                <div
                    class="dashboard-valor">

                    ${posicao}º

                </div>

            </div>

            </div>
        `;

        pagina.innerHTML =
            html;

    }catch(error){

        console.error(
            error
        );

        pagina.innerHTML = `
            <div class="card">

                <h2>
                    🏆 Ranking
                </h2>

                <p>
                    Erro ao carregar ranking.
                </p>

            </div>
        `;

    }

}

function carregarContestacoes(){

    const pagina =
        document.getElementById(
            "pagina"
        );

    const usuarioLogado =
        localStorage.getItem(
            "usuario"
        );

    const contestacoes =
        JSON.parse(
            localStorage.getItem(
                "contestacoes"
            ) || "[]"
        );

    let html = `

        <div class="card">

            <h2>
                📬 Contestações
            </h2>

            <input
                id="usuarioContestado"
                placeholder="Usuário contestado">

            <textarea
                id="motivoContestacao"
                rows="4"
                placeholder="Motivo da contestação">
            </textarea>

            <button
                onclick="enviarContestacao()">

                Enviar Contestação

            </button>

    `;

    html += `
        </div>
    `;

    pagina.innerHTML = html;
}

function enviarContestacao(){

    const usuarioContestado =
        document.getElementById(
            "usuarioContestado"
        ).value;

    const motivo =
        document.getElementById(
            "motivoContestacao"
        ).value;

    if(
        usuarioContestado === "" ||
        motivo === ""
    ){
        return;
    }

    const contestacoes =
        JSON.parse(
            localStorage.getItem(
                "contestacoes"
            ) || "[]"
        );

    const novoId =
        Date.now();

    contestacoes.push({

        id:
        novoId,

        autor:
        localStorage.getItem(
            "usuario"
        ),

        contestado:
        usuarioContestado,

        motivo:
        motivo,

        status:
        "Pendente",

        resposta:
        "",

        data:
        new Date().toLocaleString(
            "pt-BR"
        )

    });

    localStorage.setItem(

        "contestacoes",

        JSON.stringify(
            contestacoes
        )

    );

    const notificacoes =
        JSON.parse(
            localStorage.getItem(
                "notificacoes"
            ) || "[]"
        );

    notificacoes.push({

        destinatario:
        usuarioContestado,

        mensagem:
        `${localStorage.getItem("usuario")} contestou uma medida sua.`,

        data:
        new Date().toLocaleString(
            "pt-BR"
        )

    });

    localStorage.setItem(

        "notificacoes",

        JSON.stringify(
            notificacoes
        )

    );

    carregarContestacoes();

    alert(
        "Contestação enviada!"
    );
}

function responderContestacao(id){

    const resposta =
        document.getElementById(
            "resp" + id
        ).value;

    if(
        resposta === ""
    ){
        return;
    }

    const contestacoes =
        JSON.parse(
            localStorage.getItem(
                "contestacoes"
            ) || "[]"
        );

    const item =
        contestacoes.find(
            c => c.id === id
        );

    if(!item) return;

    item.resposta =
        resposta;

    item.status =
        "Respondida";

    localStorage.setItem(

        "contestacoes",

        JSON.stringify(
            contestacoes
        )

    );

    const notificacoes =
        JSON.parse(
            localStorage.getItem(
                "notificacoes"
            ) || "[]"
        );

    notificacoes.push({

        destinatario:
        item.autor,

        mensagem:
        `${localStorage.getItem("usuario")} respondeu sua contestação.`,

        data:
        new Date().toLocaleString(
            "pt-BR"
        )

    });

    localStorage.setItem(

        "notificacoes",

        JSON.stringify(
            notificacoes
        )

    );

    carregarContestacoes();
}

function carregarNotificacoes(){

    const pagina =
        document.getElementById(
            "pagina"
        );

    const usuario =
        localStorage.getItem(
            "usuario"
        );

    const notificacoes =
        JSON.parse(
            localStorage.getItem(
                "notificacoes"
            ) || "[]"
        );

    const minhas =
        notificacoes.filter(
            item =>
            item.destinatario === usuario
        );

    let html = `

        <div class="card">

            <h2>
                🔔 Notificações
            </h2>

    `;

    if(
        minhas.length === 0
    ){

        html += `

            <p>
                Nenhuma notificação.
            </p>

        `;
    }

    [...minhas]
    .reverse()
    .forEach(item => {

        html += `

            <div class="medida-card">

                <strong>
                    ${item.mensagem}
                </strong>

                <br><br>

                <small>
                    📅 ${item.data}
                </small>

            </div>

        `;

    });

    html += `
        </div>
    `;

    pagina.innerHTML = html;
}

function logout(){

    localStorage.removeItem(
        "usuario"
    );

    location.reload();
}