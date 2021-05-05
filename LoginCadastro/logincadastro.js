	var email_verified;
var isVerified;
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
				document.getElementById("corpo-user").style.display="block";
				document.getElementById("corpo-form").style.display="none";
				var user = firebase.auth().currentUser;
				if(user!=null){
					var user_email = user.email;
					 isVerified=user.emailVerified;
					  email_verified = (isVerified) ? "Verificado.":"Não verificado.";
					document.getElementById("user_para").innerHTML = "Usuário Atual: "+user_email+"</br> Status do email: "+email_verified;
				}
		}
		else{

				document.getElementById("corpo-user").style.display="none";
				document.getElementById("corpo-form").style.display="block";
		}

	});

	//Função para acessar o sistema
	function acessarSistema(){
				document.getElementById("erMsg4").innerText="";
				if(isVerified)
					window.location.href = "../PaginaInicial/pagina_inicial.html";
				else
					document.getElementById("erMsg4").innerText="Complete a verifação de seu email";

	}

	//Função para fazer o login do usuário
	function loginUser(){
		document.getElementById("erMsg1").innerText="";
		document.getElementById("erMsg2").innerText="";
	
		var email = document.getElementById('idEmail').value;
		var senha = document.getElementById('idSenha').value;
		
			firebase.auth().signInWithEmailAndPassword(email, senha)
			
			.then(function(){	
				//alert("Login foi.");

			})
			.catch(function(error) {
		  		// Handle Errors here.
		  	
		  		var errorCode = error.code;
		  		var errorMessage = error.message;
		  		switch(errorCode){
		  			case "auth/invalid-email":
		  				document.getElementById("erMsg1").innerText="Email inválido.";
		  			break;
		  			case "auth/user-disabled":
		  				document.getElementById("erMsg1").innerText="Usuário desabilitado.";
		  			break;
		  			case "auth/user-not-found":
		  				document.getElementById("erMsg1").innerText="Usuário não encontrado.";
		  			break;
		  			case "auth/wrong-password":
		  				document.getElementById("erMsg2").innerText="Senha inválida.";
		  			break;
		  		}

		  		if(senha == ""){
		  			document.getElementById("erMsg2").innerText="Digite a senha.";	
		  		}
		  		if(email == ""){
		  			document.getElementById("erMsg1").innerText="Digite o email.";	
		  		}
			});
		}

	//Função para deslogar um usuário
	function deslogUser(){
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}).catch(function(error) {
		  // An error happened.
		});
	}

	//Função de cadastro de novo usuário
	function createUser(){
		document.getElementById("erMsg1").innerText="";
		document.getElementById("erMsg2").innerText="";
		document.getElementById("erMsg3").innerText="";
		var email = document.getElementById('idEmail').value;
		var senha = document.getElementById('idSenha').value;
		var confsenha = document.getElementById('idConfSenha').value;

	
			firebase.auth().createUserWithEmailAndPassword(email, senha)
			.then(function(){
				//cadastro deu certo
				//alert("Cadastro foi.");
				var user = firebase.auth().currentUser;
   				user.sendEmailVerification().then(function() {
				  // Email sent.
				  alert("Enviado email de confirmação.");
				}).catch(function(error) {
				  // An error happened.
				  alert("Erro no envio do email.");
				});
				deslogUser();
			})
			.catch(function(error) {
			  //cadastro deu errado
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  
			  switch(errorCode){
			  	case "auth/email-already-in-use":
			  		document.getElementById("erMsg1").innerText="Email ja está em uso.";
			  	break;
			  	case "auth/invalid-email":
			  		document.getElementById("erMsg1").innerText="Email inválido.";
			  	break;
			  	case "auth/operation-not-allowed":
			  	document.getElementById("erMsg1").innerText="Operação não permitida.";
			  	break;
			  	case "auth/weak-password":
			  		document.getElementById("erMsg2").innerText="Senha fraca.";
			  	break;
			  }

			 if(senha != confsenha )
			//msg erro senha diferente da confirmação de senha
			document.getElementById("erMsg3").innerText="Digite a mesma senha.";

			if(email == "")
			//email nulo
			document.getElementById("erMsg1").innerText="Digite o email.";

			if(senha == "")
			//senha nula
			document.getElementById("erMsg2").innerText="Digite a senha.";
			});
	
	}

function resetPassword(){

		var email = document.getElementById('idEmail').value;
		if(email!=""){
			firebase.auth().sendPasswordResetEmail(email).then(function() {
		  	// Email sent.

			alert("Email de redefinição de senha enviado.");
			}).catch(function(error) {
			  // An error happened.
			  document.getElementById("erMsg1").innerText="Email inválido.";
			});
		}
		else
			document.getElementById("erMsg1").innerText="Digite o email.";
}