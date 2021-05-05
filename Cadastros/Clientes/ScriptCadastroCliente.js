	function insertClient (user){
		if(document.getElementById("idNome").value!=""){
		var newClient ={
			nome: document.getElementById("idNome").value,
			profissao:document.getElementById("idProfissão").value,
			endereco:document.getElementById("idEndereco").value,
			cidade:document.getElementById("idCidade").value,
			cpf:document.getElementById("idCPF").value,
			residencia:document.getElementById("idRes").value,
			rg:document.getElementById("idRG").value,
			comercial:document.getElementById("idComercial").value,
			pis:document.getElementById("idPIS").value,
			celular:document.getElementById("idCelular").value,
			nascimento:document.getElementById("idNasc").value,
			fax:document.getElementById("idFax").value,
			nm_pai:document.getElementById("idNmPai").value,
			nm_mae:document.getElementById("idNmMae").value,
			observacao:document.getElementById("idObservacao").value
		};
		 alert("Novo cliente cadastrado.");
		return firebase.database().ref().child(user.uid+'/clientes').push(newClient);
		
		}
		else{
			alert("Digite pelo menos um nome.");
		}
	}

	/*
function selectExistingClient(){
	var listaCliente = document.getElementById("listaClientes");
	firebase.database().ref('clientes').on('value', function (snapshot) {

		listaCliente.innerHTML='';

			var op = document.createElement('option');
			op.appendChild(document.createTextNode("Selecionar...")); 
			listaCliente.appendChild(op);			

		snapshot.forEach(function (item) {
			op = document.createElement('option');
			op.appendChild(document.createTextNode(item.val().nome)); 
			listaCliente.appendChild(op);			
		});
	});
}*/