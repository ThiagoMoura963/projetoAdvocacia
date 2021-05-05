 	
	var user = firebase.auth().currentUser;

	user.isEmailVerified();

	function deslogUser(){

		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		}).catch(function(error) {
		  // An error happened.
		});
	}