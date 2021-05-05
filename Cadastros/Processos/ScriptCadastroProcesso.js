
function insertProcesso(user) {
	if(document.getElementById("idNmProcesso").value!=""){
	var ClienteId = document.getElementById("listaClientes").value.substr(-20);
	var ClienteNome = document.getElementById("listaClientes").value.replace(" "+ClienteId,"");

	var newProcesso ={
			responsavel:document.getElementById("idResponsavel").value,
			processo:document.getElementById("idNmProcesso").value,
			vara:document.getElementById("idVara").value,
			cliente:document.getElementById("listaClientes").value,
			observacao:document.getElementById("idObservacaoProc").value,
			autor:document.getElementById("idAutor").value,
			reu:document.getElementById("idReu").value,
			ocorrencia_assunto:document.getElementById("idOcorrAssun").value,

		};

	  var procnovo = firebase.database().ref().child(user.uid+'/processos').push(newProcesso);
	  alert("Novo processo cadastrado.");
	  return firebase.database().ref(user.uid+'/clientes/'+ClienteId+'/processos').child(procnovo.key).set({
	  	nome:newProcesso.processo
	  });
	}
	else{
		alert("Digite o processo.");
	}
}

function importClientList(user){
	var listaCliente = document.getElementById("listaClientes");
	firebase.database().ref(user.uid+'/clientes').on('value', function (snapshot) {

		listaCliente.innerHTML='';		

		snapshot.forEach(function (item) {
			var op = document.createElement('option');

			op.appendChild(document.createTextNode(item.val().nome+" "+item.key)); 
			listaCliente.appendChild(op);			
		});
	});
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	console.log(user);
	importClientList(user);
  } 
});

