 var bOnlineStatus;
 
 $(document).ready(function(){
	bOnlineStatus = navigator.onLine;
	
	// Evenement lors de la submission du formulaire
	$('#frmTodo').submit(function(){
		// Si on est en ligne
		if(bOnlineStatus){
			// On récupére le text nettoyé des espaces avant et après
			var sVal = $('#txtItem').val();
			var sVal = $.trim(sVal);
			if(sVal != ''){
				// On envoie une requête AJAX de type POST pour ajouter la tache
				$.ajax({
					url: 'ajax.php',
					dataType: 'json',
					type: 'POST',
					data:{
						type:'add',
						item:sVal
					},
					success: function(data) {
						if(data.result == true){
							var sItem = '<li><span>'+sVal+'</span><img src="delete.png" alt="Supprimer" class="delTask"/></li>';
							$('ul').append(sItem);
							$('#txtItem').val('');
						}
					}
				});
				
			}
		} 
		// Si on n'est pas en ligne
		else {
			alert('Reseau : Offline');
		}
		return false;
	});
	$(document).on('click', '.delTask', function(){
		// Si on est en ligne
		if(bOnlineStatus){
			var jqoParent = $(this).parent();
			// On envoie une requête AJAX de type POST pour supprimer la tache
			$.ajax({
				url: 'ajax.php',
				dataType: 'json',
				type: 'POST',
				data:{
					type:'del',
					pos:$('li').index(jqoParent)
				},
				success: function(data) {
					if(data.result == true){
						jqoParent.remove();
					}
				}
			});
		} 
		// Si on n'est pas en ligne
		else {
			alert('Reseau : Offline');
		}
	});
 });
 
window.addEventListener('online', function() {
	bOnlineStatus = false;
}, true);
 
window.addEventListener('offline', function() {
	bOnlineStatus = false;
	alert('Vous etes maintenant hors-ligne. Vos taches ne seront pas enregistres');
}, true);