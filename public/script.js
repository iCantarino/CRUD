 //POST - CREATE
 function enviarDados() {

    const nome = document.getElementById('nomeCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const idade = document.getElementById('idadeCadastro').value;
    const cpf = document.getElementById('cpfCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    
    fetch('usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: nome, email: email, idade: idade, cpf: cpf, senha: senha})
    })
    .then(response => response.json())
}

function loginDados() {
    const cpf = document.getElementById('cpfLogin').value;
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    fetch(`usuarios`)
    .then(response => response.json())
    .then(usuarios  => {
        const autenticacao = usuarios.find(
            usuario => usuario.cpf === cpf && usuario.email === email && usuario.senha === senha);
        if(autenticacao) {
            alert("Teste bem-sucedido")
            usuarioLogou()
        } else {
            alert("Falha")
        }
    })
}

//GET - READ
function buscarDados() {
    const id = document.getElementById('id').value;
    fetch(`usuarios/${id}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(id == "") {
            for(var i = 0; i < data.length; i++) {
                document.getElementById('nomeExibir').innerHTML += data[i].nome + '<br/>'
                document.getElementById('idadeExibir').innerHTML += data[i].idade + '<br/>'
            }
        } else {
            document.getElementById('nomeExibir').innerHTML = data.nome
            document.getElementById('idadeExibir').innerHTML = data.idade
        }
    })
}

//PUT - UPDATE
function atualizarDados() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    
    fetch(`usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: nome, idade: idade})
    })
    .then(response => response.json())
}

//DELETE - DELETE
function deletarDados() {
    const id = document.getElementById('id').value;
    fetch(`usuarios/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  

const usuarioLogou = () => {
    const usercpf = document.getElementById('cpfLogin').value
    const useremail = document.getElementById('emailLogin').value
    const userpassword = document.getElementById('senhaLogin').value

    fetch(`usuarios?cpf=${usercpf}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const user = data[0]
        const username = user.nome;
        const age = user.idade;
        const id = user.id;
        console.log(username)

        const userData = {
            "username": username,
            "userage": age,
            "useremail": useremail,
            "usercpf": usercpf,
            "userpassword": userpassword,
            "userid": id
        }

        const usuarioLogado = JSON.stringify(userData)

        setCookie("userData", usuarioLogado, 1)

        window.location.href = "perfil.html"
    })
    .catch(error => {
        console.error('Erro ao obter dados do servidor:', error);
    });
}
  
function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checaPerfil() {

    var logado = false;
    var logadoAdmin = false;

    const dadosUsuario = getCookie("userData")
    if (dadosUsuario !== "") {
        var userLogadoDados = JSON.parse(dadosUsuario)
        console.log(document.cookie)

        if(userLogadoDados.usercpf == "admin") {
            logadoAdmin = true
            logado = true
            console.log("Logou como Administrador")
        } 
        else if (userLogadoDados.usercpf !== "admin") {
            logado = true
            console.log("Logou como usuário comum")
        }
    } else {
        window.location.href = 'index.html'
    }

    document.getElementById('usuario').textContent = userLogadoDados.username

    
    if (logado || logadoAdmin) {
        document.getElementById('loginNav').innerHTML = `<i class="ri-user-fill"></i>`
        document.getElementById('loginNav').removeAttribute("href")
        document.getElementById('loginNav').addEventListener('click', function() {
            window.location.href = 'perfil.html';
        });
                    
        document.getElementById('cadastroNav').innerHTML = `<i class="ri-notification-3-line"></i>`
        document.getElementById('cadastroNav').removeAttribute("href")
    }
}

function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  
function logoutUser() {
    deleteCookie("userData");

    window.location.href = "index.html";
}
  
function checaIndex() {

    var logado = false;
    var logadoAdmin = false;

    const dadosUsuario = getCookie("userData")
    if (dadosUsuario !== "") {
        var userLogadoDados = JSON.parse(dadosUsuario)
        console.log(document.cookie)

        if(userLogadoDados.usercpf == "admin") {
            logadoAdmin = true
            console.log("Logou como Administrador")
        } 
        else if (userLogadoDados.usercpf !== "admin") {
            logado = true
            console.log("Logou como usuário comum")
        }
    } else {
        console.log("Tente logar")
    }

    if (logado || logadoAdmin) {
        document.getElementById('loginNav').innerHTML = `<i class="ri-user-fill"></i>`
        document.getElementById('loginNav').removeAttribute("href")
        document.getElementById('loginNav').addEventListener('click', function() {
            window.location.href = 'perfil.html';
        });
                    
        document.getElementById('cadastroNav').innerHTML = `<i class="ri-notification-3-line"></i>`
        document.getElementById('cadastroNav').removeAttribute("href")
    }
}

function checaAtestado() {
    var logado = false;
    var logadoAdmin = false;

    const dadosUsuario = getCookie("userData")
    if (dadosUsuario !== "") {
        var userLogadoDados = JSON.parse(dadosUsuario)
        console.log(document.cookie)

        if(userLogadoDados.usercpf == "admin") {
            logadoAdmin = true
            console.log("Logou como Administrador")
        } 
        else if (userLogadoDados.usercpf !== "admin") {
            logado = true
            console.log("Logou como usuário comum")
        }
    } else {
        console.log("erro")
    }

    if (logado || logadoAdmin) {
        document.getElementById('loginNav').innerHTML = `<i class="ri-user-fill"></i>`
        document.getElementById('loginNav').removeAttribute("href")
        document.getElementById('loginNav').addEventListener('click', function() {
            window.location.href = 'perfil.html';
        });
                    
        document.getElementById('cadastroNav').innerHTML = `<i class="ri-notification-3-line"></i>`
        document.getElementById('cadastroNav').removeAttribute("href")
    }

    const ageString = userLogadoDados.userage
    const inteiroAge = parseInt(ageString)
    const idade = inteiroAge
    const dataNascimento = new Date()
    dataNascimento.setFullYear(dataNascimento.getFullYear() - idade)
    const dataNascimentoFormatada = `${dataNascimento.getFullYear()}-${('0' + (dataNascimento.getMonth() + 1)).slice(-2)}-${('0' + dataNascimento.getDate()).slice(-2)}`
    console.log(dataNascimentoFormatada)


    document.getElementById('nomeAtestado').value = userLogadoDados.username;
    document.getElementById('cpfAtestado').value = userLogadoDados.usercpf;
    document.getElementById('dataAtestado').value = dataNascimentoFormatada

}

function enviarPedido() {
    
    nomeCompleto = document.getElementById('nomeAtestado').value
    dataNascimento = document.getElementById('dataAtestado').value
    cpf = document.getElementById('cpfAtestado').value
    motivoSoli = document.getElementById('motivoAtestado').value
    dataInicioSin = document.getElementById('sinInicioAtestado').value
    dataConsulta = document.getElementById('dataConsulta').innerHTML
    dataRetorno = document.getElementById('retornoAtestado').value   
    informacoesAdicionais = document.getElementById('infoAdc').value

    if (nomeCompleto === '' || dataNascimento === '' || cpf === '' || motivoSoli === '' || dataInicioSin === '' || dataRetorno === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return; 
    }

    var data = {
        nomeCompleto: nomeCompleto,
        dataNascimento: dataNascimento,
        cpf: cpf,
        motivoSoli: motivoSoli,
        dataInicioSin: dataInicioSin,
        dataConsulta: dataConsulta,
        dataRetorno: dataRetorno,    
        informacoesAdicionais: informacoesAdicionais,
        statusPedido: 'Em análise'
    }

    fetch('pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())  
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });

}

function checaPedido() {
    var logado = false;
    var logadoAdmin = false;

    const dadosUsuario = getCookie("userData")
    if (dadosUsuario !== "") {
        var userLogadoDados = JSON.parse(dadosUsuario)
        console.log(document.cookie)

        if(userLogadoDados.usercpf == "admin") {
            logadoAdmin = true
            console.log("Logou como Administrador")
        } 
        else if (userLogadoDados.usercpf !== "admin") {
            logado = true
            console.log("Logou como usuário comum")
        }
    } else {
        console.log("erro")
    }

    if (logado) {
        document.getElementById('loginNav').innerHTML = `<i class="ri-user-fill"></i>`
        document.getElementById('loginNav').removeAttribute("href")
        document.getElementById('loginNav').addEventListener('click', function() {
            window.location.href = 'perfil.html';
        });
                    
        document.getElementById('cadastroNav').innerHTML = `<i class="ri-notification-3-line"></i>`
        document.getElementById('cadastroNav').removeAttribute("href")
    
        getPedido()
    }
    
    if (logadoAdmin) {
        document.getElementById('loginNav').innerHTML = `<i class="ri-user-fill"></i>`
        document.getElementById('loginNav').removeAttribute("href")
        document.getElementById('loginNav').addEventListener('click', function() {
            window.location.href = 'perfil.html';
        });
        
        document.getElementById(    'cadastroNav').innerHTML = `<i class="ri-notification-3-line"></i>`
        document.getElementById('cadastroNav').removeAttribute("href")
        
        getPedidos(logadoAdmin)
    }

}

function getPedidos(logadoAdmin) {
    fetch(`pedidos`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(pedido => {
            const card = criarCardPedido(pedido, logadoAdmin)
            document.getElementById('listaPedidos').appendChild(card)
        })
    })
}

function getPedido() {

    const dadosUsuario = getCookie("userData")
    if (dadosUsuario !== "") {
        var userLogadoDados = JSON.parse(dadosUsuario)
        console.log(document.cookie)
    } else {
        console.log('erro')
    }

    const usercpf = userLogadoDados.usercpf

    fetch(`pedidos?cpf=${usercpf}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(pedido => {
            const card = criarCardPedido(pedido)
            document.getElementById('listaPedidos').appendChild(card)
        })
    })

}

function criarCardPedido(pedido, logadoAdmin) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '20rem';
  
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);
  
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = `Pedido de Atestado <span id="idPedido">${pedido.id}</span>`;
    cardBody.appendChild(cardTitle);
  
    const nomePaciente = document.createElement('p');
    nomePaciente.classList.add('card-text');
    nomePaciente.innerHTML = `Nome: <span id="paciente">${pedido.nomeCompleto}</span>`;
    cardBody.appendChild(nomePaciente);
  
    const dataNascimento = document.createElement('p');
    dataNascimento.classList.add('card-text');
    dataNascimento.innerHTML = `Data de Nascimento: <span id="dataNasc">${pedido.dataNascimento}</span>`;
    cardBody.appendChild(dataNascimento);
  
    const cpf = document.createElement('p');
    cpf.classList.add('card-text');
    cpf.innerHTML = `CPF: <span id="cpfPedido">${pedido.cpf}</span>`;
    cardBody.appendChild(cpf);
  
    const motivoSoli = document.createElement('p');
    motivoSoli.classList.add('card-text');
    motivoSoli.innerHTML = `Motivo: <span id="motivoPedido">${pedido.motivoSoli}</span>`;
    cardBody.appendChild(motivoSoli);
  
    const dataInicioSin = document.createElement('p');
    dataInicioSin.classList.add('card-text');
    dataInicioSin.innerHTML = `Início dos Sintomas: <span id="inicioSintomas">${pedido.dataInicioSin}</span>`;
    cardBody.appendChild(dataInicioSin);
  
    const dataConsulta = document.createElement('p');
    dataConsulta.classList.add('card-text');
    dataConsulta.innerHTML = `Data da Consulta: <span id="dataConsulta">${pedido.dataConsulta}</span>`;
    cardBody.appendChild(dataConsulta);
  
    const dataRetorno = document.createElement('p')
    dataRetorno.classList.add('card-text')
    dataRetorno.innerHTML = `Data de Retorno: <span id="retornoPedido">${pedido.dataRetorno}</span>`
    cardBody.appendChild(dataRetorno)

    const cardLink1 = document.createElement('a')
    cardLink1.classList.add('card-link')
    cardLink1.innerHTML = 'Remover'
    cardBody.appendChild(cardLink1)

    const cardLink2 = document.createElement('a')
    cardLink2.classList.add('card-link')
    cardLink2.innerHTML = `Status: <span id="statusdoPedido">${pedido.statusPedido}</span>`
    cardBody.appendChild(cardLink2)

    cardLink1.addEventListener('click', () => {
        fetch(`pedidos/${pedido.id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              card.remove();
              console.log(`Pedido ${pedido.id} removido com sucesso.`);
            } else {
              console.log(`Erro ao remover pedido ${pedido.id}.`);
            }
          })
      });

    if (logadoAdmin) {
      const dataRetornoBtn = document.createElement('button');
      dataRetornoBtn.classList.add('btn', 'btn-primary', 'mt-2');
      dataRetornoBtn.innerHTML = 'Definir Data de Retorno';
      cardBody.appendChild(dataRetornoBtn);
  
      dataRetornoBtn.addEventListener('click', () => {
        const newDate = prompt('Insira a data de retorno no formato DD/MM/AAAA:');
        if (newDate) {
          fetch(`pedidos/${pedido.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              dataRetorno: newDate,
            }),
          })
            .then(response => response.json())
            .then(data => {
              dataConsulta.innerHTML = `Data da Consulta: <span id="dataConsulta">${data.dataConsulta}</span>`;
              console.log(`Data da consulta do pedido ${pedido.id} atualizada para ${data.dataConsulta}.`);
            })
            .catch(error => console.error(error));
        }
      });
  
      const statusPedidoBtn = document.createElement('button');
      statusPedidoBtn.classList.add('btn', 'btn-primary', 'mt-2', 'mx-2');
      statusPedidoBtn.innerHTML = 'Editar Status';
      cardBody.appendChild(statusPedidoBtn);
  
      statusPedidoBtn.addEventListener('click', () => {
        const newStatus = prompt('Insira o novo status do pedido:');
        if (newStatus) {
        fetch(`pedidos/${pedido.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            statusPedido: newStatus,
            }),
        })
            .then(response => response.json())
            .then(data => {
            cardLink2.innerHTML = `Status: <span id="statusPedido">${data.statusPedido}</span>`;
            console.log(`Status do pedido ${pedido.id} atualizado para ${data.statusPedido}.`);
            })
            .catch(error => console.error(error));
            }
        });
        }

    return card;
}

function checaConta() {

    var logado = false;
    var logadoAdmin = false;

    const dadosUsuario = getCookie("userData")
    if (dadosUsuario !== "") {
        var userLogadoDados = JSON.parse(dadosUsuario)
        console.log(document.cookie)

        if(userLogadoDados.usercpf == "admin") {
            logadoAdmin = true
            console.log("Logou como Administrador")
        } 
        else if (userLogadoDados.usercpf !== "admin") {
            logado = true
            console.log("Logou como usuário comum")
        }
    } else {
        console.log("erro")
    }

    if (logado || logadoAdmin) {
        document.getElementById('loginNav').innerHTML = `<i class="ri-user-fill"></i>`
        document.getElementById('loginNav').removeAttribute("href")
        document.getElementById('loginNav').addEventListener('click', function() {
            window.location.href = 'perfil.html';
        });
                    
        document.getElementById('cadastroNav').innerHTML = `<i class="ri-notification-3-line"></i>`
        document.getElementById('cadastroNav').removeAttribute("href")
    }

    const nomeUser = document.getElementById('nomeuser')
    const idadeUser = document.getElementById('idadeuser')
    const emailUser = document.getElementById('emailuser')
    const cpfUser = document.getElementById('cpfuser')
    const senhaUser = document.getElementById('senhauser')
    
    const idUsuario = userLogadoDados.userid
    
    fetch(`usuarios?id=${idUsuario}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      const userData = Array.isArray(data) ? data[0] : data;
    
      nomeUser.innerText = userData.nome
      idadeUser.innerText = userData.idade
      emailUser.innerText = userData.email
      cpfUser.innerText = userData.cpf
      senhaUser.innerText = '********' 
    })
    .catch(error => {
      console.error(error);
    });
    
}

function atualizaConta() {

  const dadosUsuario = getCookie("userData")
  var userLogadoDados = JSON.parse(dadosUsuario)

  const nome = document.getElementById('nomeEditar').value
  const idade = document.getElementById('idadeEditar').value
  const email = document.getElementById('emailEditar').value
  const senha = document.getElementById('senhaEditar').value

  const idUsuario = userLogadoDados.userid

  const dadosAtualizados = {}

  if (nome !== "") {
    dadosAtualizados.nome = nome
  }
  if (idade !== "") {
    dadosAtualizados.idade = idade
  }
  if (email !== "") {
    dadosAtualizados.email = email
  }
  if (senha !== "") {
    dadosAtualizados.senha = senha
  }


    fetch(`usuarios/${idUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtualizados)
      })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        alert('Dados atualizados com sucesso!')
    })
    .catch(error => {
        console.error(error)
        alert('Erro ao atualizar os dados!')
    })
}

function deletarConta() {

    const dadosUsuario = getCookie("userData")
    var userLogadoDados = JSON.parse(dadosUsuario)  

    const idUsuario = userLogadoDados.userid

    fetch(`usuarios/${idUsuario}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log(`Conta do usuário ${idUsuario} removida com sucesso.`);
      } else {
        console.log(`Erro ao remover conta do usuário ${idUsuario}.`);
      }
    })
    
    logoutUser()

}
