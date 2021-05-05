		var clienteList=new Array();
		var clienteId=new Array();
		var userId;				
		var pesquisado = new Array();
		var pesquisarPor='cpf';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  		userId=user.uid;
		genProcessList();

  } 
});

function genProcessList(){
	var listacliente = document.getElementById("listaclientes");
	firebase.database().ref(userId+'/clientes').on('value', function (snapshot) {


		listacliente.innerHTML='';

		
		var index=0;
		snapshot.forEach(function (item) {
 			var itemVal = item.val();
 			clienteList.push((itemVal.nome).toLowerCase());
        	clienteId.push(item.key);
			var dvRow = document.createElement('div');
			dvRow.setAttribute("class","row_list");

			var dv1 = document.createElement('button');
			dv1.appendChild(document.createTextNode(itemVal.nome)); 
			var dv2 = document.createElement('div');
			dv2.appendChild(document.createTextNode(itemVal.cpf)); 

			dv1.setAttribute("class","col_list");	
			dv1.setAttribute("class","btn_base btn_cliente");
			dv1.setAttribute("onclick","LoadModal("+index+")");
			index++;
			dv1.setAttribute("data-toggle","modal");
			dv1.setAttribute("data-target","#clienteModal");
			dv2.setAttribute("class","col_list cpf_base");	

			listacliente.appendChild(dvRow);		
			dvRow.appendChild(dv1);	
			dvRow.appendChild(dv2);
		});
		loadListPesquisa();
	});
}
function attProcessList(){
		pesquisado = new Array();
	var listacliente = document.getElementById("listaclientes");
	firebase.database().ref(userId+'/clientes').on('value', function (snapshot) {


		listacliente.innerHTML='';

		
		var index=0;
		snapshot.forEach(function (item) {
 			var itemVal = item.val();
 			clienteList.push((itemVal.nome).toLowerCase());
        	clienteId.push(item.key);
			var dvRow = document.createElement('div');
			dvRow.setAttribute("class","row_list");

			var dv1 = document.createElement('button');
			dv1.appendChild(document.createTextNode(itemVal.nome)); 
				var dv2 = document.createElement('div')
		switch(pesquisarPor){
			case 'cpf':
				document.getElementById("titlePesquisa").innerText="CPF";
				pesquisado.push(itemVal.cpf.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.cpf)); 
			break;
			case 'celular':
				document.getElementById("titlePesquisa").innerText="CELULAR";
				pesquisado.push(itemVal.celular.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.celular)); 
			break;
			case 'cidade':
				document.getElementById("titlePesquisa").innerText="CIDADE";
				pesquisado.push(itemVal.cidade.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.cidade)); 
			break;
			case 'comercial':
				document.getElementById("titlePesquisa").innerText="COMERCIAL";
				pesquisado.push(itemVal.comercial.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.comercial)); 
			break;
			case 'endereco':
				document.getElementById("titlePesquisa").innerText="ENDEREÇO";
				pesquisado.push(itemVal.endereco.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.endereco)); 
			break;
			case 'fax':
				document.getElementById("titlePesquisa").innerText="FAX";
				pesquisado.push(itemVal.fax.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.fax)); 
			break;
			case 'nascimento':
				document.getElementById("titlePesquisa").innerText="DATA DE NASCIMENTO";
				pesquisado.push(itemVal.fax.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.fax)); 
			break;
			case 'nm_mae':
				document.getElementById("titlePesquisa").innerText="NOME DA MÃE";
				pesquisado.push(itemVal.nm_mae.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.nm_mae)); 
			break;
			case 'nm_pai':
				document.getElementById("titlePesquisa").innerText="NOME DO PAI";
				pesquisado.push(itemVal.nm_pai.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.nm_pai)); 
			break;
			case 'nome':
				document.getElementById("titlePesquisa").innerText="NOME";
				pesquisado.push(itemVal.nome.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.nome)); 
			break;
			case 'observacao':
				document.getElementById("titlePesquisa").innerText="OBSERVAÇÃO";
				pesquisado.push(itemVal.observacao.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.observacao)); 
			break;
			case 'pis':
				document.getElementById("titlePesquisa").innerText="PIS";
				pesquisado.push(itemVal.pis.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.pis)); 
			break;
			case 'profissao':
				document.getElementById("titlePesquisa").innerText="PROFISSÃO";
				pesquisado.push(itemVal.profissao.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.profissao)); 
			break;
			case 'residencia':
				document.getElementById("titlePesquisa").innerText="RESIDÊNCIA";
				pesquisado.push(itemVal.residencia.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.residencia)); 
			break;
			case 'rg':
				document.getElementById("titlePesquisa").innerText="RG";
				pesquisado.push(itemVal.rg.toLowerCase());
				dv2.appendChild(document.createTextNode(itemVal.rg)); 
			break;
		}
		
			dv1.setAttribute("class","col_list");	
			dv1.setAttribute("class","btn_base btn_cliente");
			dv1.setAttribute("onclick","LoadModal("+index+")");
			index++;
			dv1.setAttribute("data-toggle","modal");
			dv1.setAttribute("data-target","#clienteModal");
			dv2.setAttribute("class","col_list cpf_base");	

			listacliente.appendChild(dvRow);		
			dvRow.appendChild(dv1);	
			dvRow.appendChild(dv2);
		});

	});
}
var t, r;
document.getElementById("textoPesquisa").onkeyup=function(e){
	t = this.value.toLowerCase();
	Pesquisa(t);
}
document.getElementById("iDlistaPesquisa").onchange=function(e)
{
	pesquisarPor = this.value.toLowerCase();
	attProcessList();
}
function loadListPesquisa(){
		var pesquisaL=document.getElementById("iDlistaPesquisa");
		pesquisaL.innerHTML="";
	firebase.database().ref(userId+'/clientes/'+clienteId[0]).on('value',gotData,errData);
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

function Pesquisa(t){
	r = new RegExp(t,"g");
	
	for(i in pesquisado){
		if(pesquisado[i].match(r))
			document.getElementById("listaclientes").children[i].removeAttribute("style");
		else
			document.getElementById("listaclientes").children[i].style.display="none";
	}
}

function LoadModal(k){
		var modal = document.getElementById("mod_body");
		var title = document.getElementById("mod_cliente_nome");
		title.innerHTML='';
		modal.innerHTML='';
		document.getElementById('btnProc').style="display:none;";
		botoes1(k);
		firebase.database().ref(userId+'/clientes/'+clienteId[k]).on('value',gotData,errData);
		function gotData(data){
			var cont=0;
			var keyArray = Object.keys(data.val());
			var valueArray =Object.values(data.val());
			keyArray[7]="Nome da mãe";
			keyArray[8]="Nome do pai";
			keyArray.forEach(function(val,i){
				var d = document.createElement('div');
				d.setAttribute('style','display:flex');
				if(val!='processos'){
				d.innerHTML = "<b>"+val.toUpperCase()+"</b>: &nbsp&nbsp<input id='inpId"+cont+"' value='"+valueArray[i]+"' style='display:none; height:30px;'></select><div style='' id='txtId"+cont+"'> "+valueArray[i]+"</div></br></br> "; 
				
				cont++;
				}
				else{
					document.getElementById('btnProc').style="";
				}
				if(val=='nome'){
					title.innerHTML=valueArray[i];
				}
				modal.appendChild(d);	
			});


		}
		function errData(err){
			console.log(err);
		}
}

function deletarDados(k){
   if (confirm("Tem certeza que deseja excluir os dados deste cliente?".toUpperCase())) {
	firebase.database().ref(userId+'/clientes/'+clienteId[k]+'/processos').on('value',gotData,errData);
	  		function gotData(data){
				var keyArray = Object.keys(data.val());
				keyArray.forEach(function(val,i){
					firebase.database().ref(userId+'/processos/'+val).remove();
				});
			}
			function errData(err){
				console.log(err);
			}
	firebase.database().ref(userId+'/clientes/'+clienteId[k]).remove();
   }
window.location.reload();
}

function atualizarDados(k){
 		
	var p0=document.getElementById("inpId0").value;
	var p1 = document.getElementById("inpId1").value;
	var p2 = document.getElementById("inpId2").value;
	var p3 = document.getElementById("inpId3").value;
	var p4 = document.getElementById("inpId4").value;
	var p5 = document.getElementById("inpId5").value;
	var p6 =document.getElementById("inpId6").value;
	var p7 = document.getElementById("inpId7").value;
	var p8 = document.getElementById("inpId8").value;
	var p9 = document.getElementById("inpId9").value;
	var p10 = document.getElementById("inpId10").value;
	var p11 = document.getElementById("inpId11").value;
	var p12 = document.getElementById("inpId12").value;
	var p13 = document.getElementById("inpId13").value;
	var p14 = document.getElementById("inpId14").value;


		firebase.database().ref(userId+'/clientes/' + clienteId[k]).update({
			celular:p0,
			cidade:p1,
			comercial:p2,
			cpf:p3,
			endereco:p4,
			fax:p5,
			nascimento:p6,
			nm_mae:p7,
			nm_pai:p8,
			nome:p9,
			observacao:p10,
			pis:p11,
			profissao:p12,
			residencia:p13,
			rg:p14
	  	});
	  	firebase.database().ref(userId+'/clientes/'+clienteId[k]+'/processos').on('value',gotData,errData);
	  		function gotData(data){
				var keyArray = Object.keys(data.val());
				keyArray.forEach(function(val,i){
					firebase.database().ref(userId+'/processos/'+val).update({
						cliente:p9+" "+clienteId[k]
					});
				});
			}
			function errData(err){
				console.log(err);
			}
}

	function cancelarAtualiz(k){
		botoes1(k);
			
			for(var cont=0; cont<15; cont++){
					document.getElementById('txtId'+cont).style.display="";
					document.getElementById('inpId'+cont).style.display="none";
			}
	}
	function editarDados(k){
		botoes2(k);

			for(var cont=0; cont<15; cont++){
					document.getElementById('txtId'+cont).style.display="none";
					document.getElementById('inpId'+cont).style.display="";
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