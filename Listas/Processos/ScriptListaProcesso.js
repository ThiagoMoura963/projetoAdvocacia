
		var processoList=new Array();
		var processoId=new Array();
		var pesquisado = new Array();
		var pesquisarPor='cliente';
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  		userId=user.uid;
		genProcessList();

  } 
});
function genProcessList(){
	var listaProcesso = document.getElementById("listaProcessos");
	firebase.database().ref(userId+'/processos').on('value', function (snapshot) {


		listaProcesso.innerHTML='';
		var index=0;
		

		snapshot.forEach(function (item) {

 			var itemVal = item.val();
        	processoId.push(item.key);
        	processoList.push((itemVal.processo).toLowerCase());
			var dvRow = document.createElement('div');
			dvRow.setAttribute("class","row_list");

			var dv1 = document.createElement('button');
			dv1.appendChild(document.createTextNode(itemVal.processo)); 
			var dv2 = document.createElement('div');
		
				document.getElementById("titlePesquisa").innerText="AUTOR";
				pesquisado.push(itemVal.autor.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.autor)); 
			dv1.setAttribute("class","btn_base btn_processo");
			dv1.setAttribute("onclick","LoadModal("+index+")");
			index++;
			dv1.setAttribute("data-toggle","modal");
			dv1.setAttribute("data-target","#clienteModal");

			dv2.setAttribute("class","col_list cpf_base");
			listaProcesso.appendChild(dvRow);		
			dvRow.appendChild(dv1);	
			dvRow.appendChild(dv2);
		});
		loadListPesquisa();
	});
}

function attProcessList(){
		pesquisado = new Array();
	var listaProcesso = document.getElementById("listaProcessos");
	firebase.database().ref(userId+'/processos').on('value', function (snapshot) {


		listaProcesso.innerHTML='';
		var index=0;
		

		snapshot.forEach(function (item) {

 			var itemVal = item.val();
        	processoId.push(item.key);
        	processoList.push((itemVal.processo).toLowerCase());
			var dvRow = document.createElement('div');
			dvRow.setAttribute("class","row_list");

			var dv1 = document.createElement('button');
			dv1.appendChild(document.createTextNode(itemVal.processo)); 
			var dv2 = document.createElement('div');
		switch(pesquisarPor){
			case 'cliente':
				document.getElementById("titlePesquisa").innerText="CLIENTE";
				var clienteId = itemVal.cliente.substr(-20);
				pesquisado.push(itemVal.cliente.replace(" "+clienteId,"").toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.cliente.replace(" "+clienteId,""))); 
			break;
			case 'autor':
				document.getElementById("titlePesquisa").innerText="AUTOR";
				pesquisado.push(itemVal.autor.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.autor)); 
			break;
			case 'observacao':
				document.getElementById("titlePesquisa").innerText="OBSERVAÇÃO";
				pesquisado.push(itemVal.observacao.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.observacao)); 
			break;
			case 'observacao':
				document.getElementById("titlePesquisa").innerText="OBSERVAÇÃO";
				pesquisado.push(itemVal.observacao.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.observacao)); 
			break;
			case 'ocorrencia_assunto':
				document.getElementById("titlePesquisa").innerText="OCORRENCIA/ASSUNTO";
				pesquisado.push(itemVal.ocorrencia_assunto.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.ocorrencia_assunto)); 
			break;
			case 'responsavel':
				document.getElementById("titlePesquisa").innerText="RESPONSÁVEL";
				pesquisado.push(itemVal.responsavel.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.responsavel)); 
			break;
			case 'reu':
				document.getElementById("titlePesquisa").innerText="RÉU";
				pesquisado.push(itemVal.reu.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.reu)); 
			break;
			case 'vara':
				document.getElementById("titlePesquisa").innerText="VARA";
				pesquisado.push(itemVal.vara.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.vara)); 
			break;
			case 'processo':
				document.getElementById("titlePesquisa").innerText="PROCESSO";
				pesquisado.push(itemVal.processo.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.processo)); 
			break;
		}
			

			dv1.setAttribute("class","btn_base btn_processo");
			dv1.setAttribute("onclick","LoadModal("+index+")");
			index++;
			dv1.setAttribute("data-toggle","modal");
			dv1.setAttribute("data-target","#clienteModal");

			dv2.setAttribute("class","col_list cpf_base");
			listaProcesso.appendChild(dvRow);		
			dvRow.appendChild(dv1);	
			dvRow.appendChild(dv2);
		});
	});
}
var t, r;
document.getElementById("textoPesquisa").onkeyup=function(e)
{
	t = this.value.toLowerCase();
	Pesquisa(t);
}

document.getElementById("iDlistaPesquisa").onchange=function(e)
{
	pesquisarPor = this.value.toLowerCase();
	attProcessList();
}

function Pesquisa(t){
	r = new RegExp(t,"g");
	
	for(i in pesquisado){
		if(pesquisado[i].match(r))
			document.getElementById("listaProcessos").children[i].removeAttribute("style");
		else
			document.getElementById("listaProcessos").children[i].style.display="none";
	}
}

function loadListPesquisa(){
		var pesquisaL=document.getElementById("iDlistaPesquisa");
		pesquisaL.innerHTML="";
	firebase.database().ref(userId+'/processos/'+processoId[0]).on('value',gotData,errData);
	console.log(processoId[0]);
	function gotData(data){
			var keyArray = Object.keys(data.val());
			
			keyArray.forEach(function(val,i){
				var op = document.createElement('option');
				op.appendChild(document.createTextNode(keyArray[i])); 
				pesquisaL.appendChild(op);			
			
			});

		}
		function errData(err){
			console.log(err);
		}
}
function LoadModal(k){
		var modal = document.getElementById("mod_body");

		var title = document.getElementById("mod_processo_title");
		title.innerHTML='';
		modal.innerHTML='';
		
			botoes1(k);
		firebase.database().ref(userId+'/processos/'+processoId[k]).on('value',gotData,errData);

		function gotData(data){
			var keyArray = Object.keys(data.val());
			var valueArray =Object.values(data.val());

			keyArray.forEach(function(val,i){
				var d = document.createElement('div');
				d.setAttribute('style','display:flex');
				if(val=='cliente'){

				d.innerHTML = "<b>"+val.toUpperCase()+"</b>:&nbsp&nbsp<select id='inpId"+i+"' style='display:none; height:30px;'></select><div style='' id='txtId"+i+"'> "+valueArray[i]+"</div></br></br>"; 
				}
				else{

				d.innerHTML = "<b>"+val.toUpperCase()+"</b>:&nbsp&nbsp<input id='inpId"+i+"' style='display:none; height:30px;' value='"+valueArray[i]+"'><div style='' id='txtId"+i+"'> "+valueArray[i]+"</div></br></br>"; 
				}

				if(val=='processo'){
					title.innerHTML=valueArray[i];
				}

				modal.appendChild(d);	
			});


		}
		function errData(err){
			console.log(err);
		}


}

function atualizarDados(k){
	var p0autor=document.getElementById("inpId0").value;
	var p1cliente=document.getElementById("inpId1").value;
	var ClienteId = p1cliente.substr(-20);
	var ClienteNome = p1cliente.replace(" "+ClienteId,"");
	var p2observacao = document.getElementById("inpId2").value;
	var p3ocorrAssun= document.getElementById("inpId3").value;
	var p4processo = document.getElementById("inpId4").value;
	var p5responsavel = document.getElementById("inpId5").value;
	var p6reu = document.getElementById("inpId6").value;
	var p7vara = document.getElementById("inpId7").value;
	var idAntigo;
	firebase.database().ref(userId+'/processos/'+processoId[k]).on('value',gotData,errData);
		function gotData(data){
			var keyArray = Object.keys(data.val());
			var valueArray =Object.values(data.val());

			keyArray.forEach(function(val,i){
				if(val=='cliente'){
					 idAntigo = valueArray[i].substr(-20);
				}
			});
		}
		function errData(err){
			console.log(err);
		}


	console.log("Antigo Cliente: "+idAntigo);
	console.log("Novo Cliente: "+ClienteId);

	if(idAntigo!=ClienteId){
		//Deleta o processo do banco do antigo cliente
		firebase.database().ref(userId+'/clientes/'+idAntigo+'/processos/'+processoId[k]).remove();
	}
		//Coloca o processo no banco do novo cliente
		firebase.database().ref(userId+'/clientes/'+ClienteId+'/processos').child(processoId[k]).update({
	  	nome:p4processo
	  });

		
	  firebase.database().ref(userId+'/processos/' + processoId[k]).set({
	   autor:p0autor,
	    cliente:p1cliente,
	    observacao:p2observacao,
	    ocorrencia_assunto: p3ocorrAssun,
	    processo: p4processo,
	    responsavel: p5responsavel,
	    reu: p6reu,
	    vara: p7vara
	  });
}

function cancelarAtualiz(k){


	firebase.database().ref(userId+'/processos/'+processoId[k]).on('value',gotData,errData);

			botoes1(k);
			function gotData(data){
				var keyArray = Object.keys(data.val());
				keyArray.forEach(function(val,i){
					document.getElementById('txtId'+i).style.display="";
					document.getElementById('inpId'+i).style.display="none";
				});
			}

			function errData(err){
				console.log(err);
			}
} 

	function editarDados(k){

			botoes2(k);
			firebase.database().ref(userId+'/processos/'+processoId[k]).on('value',gotData,errData);

			function gotData(data){
				var keyArray = Object.keys(data.val());
				keyArray.forEach(function(val,i){
					document.getElementById('txtId'+i).style.display="none";
					document.getElementById('inpId'+i).style.display="";
				});
				document.getElementById('inpId1').innerHTML="";
				firebase.database().ref(userId+'/clientes').on('value', function (snapshot) {
					snapshot.forEach(function (item) {
						var op = document.createElement('option');
						op.innerText=item.val().nome+" "+item.key; 
						document.getElementById('inpId1').appendChild(op);		

						});
					});
			}
			function errData(err){
				console.log(err);
			}

	}

function deletarDados(k){

	console.log("Vai deletar os dados do "+processoList[k]+".");
	var p1cliente=document.getElementById("inpId1").value;
	var ClienteId = p1cliente.substr(-20);

   	if (confirm("Tem certeza que deseja excluir os dados deste processo?".toUpperCase())) {
	firebase.database().ref(userId+'/processos/'+processoId[k]).remove();
	firebase.database().ref(userId+'/clientes/'+ClienteId+'/processos/'+processoId[k]).remove();
	
	window.location.reload();
   }
}
	
	function botoes1(k){

		document.getElementById("btn1").innerText="Deletar";
		document.getElementById("btn2").innerText='Editar';
		document.getElementById("btn1").setAttribute("onclick", "deletarDados("+ k +")");
		document.getElementById("btn2").setAttribute("onclick", "editarDados("+k+")");
	}
	function botoes2(k){

		document.getElementById("btn1").innerText="Atualizar";
		document.getElementById("btn2").innerText='Cancelar';
		document.getElementById("btn1").setAttribute("onclick", "atualizarDados("+ k +")");
		document.getElementById("btn2").setAttribute("onclick", "cancelarAtualiz("+k+")");

	}
		function deslogUser(){

		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}).catch(function(error) {
		  // An error happened.
		});
	}