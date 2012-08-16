jQuery(function($){
	var bOnlineStatus = navigator.onLine;
	var jqoTaskLi = $('<li><span class="lblTask"></span><img src="delete.png" alt="Supprimer" class="delTask"/></li>');
	
	// Lister les taches à l'initialisation de la page
	$.ajax({
		url: 'ajax.php',
		dataType: 'json',
		type: 'POST',
		data:{
			type:'list'
		},
		success: function(data) {
			if(data.result == true){
				$.each(data.data, function(key, value) { 
					var jqoItem = jqoTaskLi.clone().find('.lblTask').append(value);
					$('ul').append(jqoItem);
				});
			}
		}
	});
	
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
							var jqoItem = jqoTaskLi.clone().find('.lblTask').append(sVal);
							$('ul').append(jqoItem);
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
	$('#ulTodo').on('click', '.delTask', function(){
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