var bOnlineStatus = navigator.onLine;
	
jQuery(function($){
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
					var jqoItem = jqoTaskLi.clone();
					jqoItem.find('.lblTask').html(value);
					$('ul').append(jqoItem);
				});
			}
		}
	});
	
	// Evenement lors de la submission du formulaire
	$('#frmTodo').submit(function(){
		// On récupére le text nettoyé des espaces avant et après
		var sVal = $('#txtItem').val();
		var sVal = $.trim(sVal);
			
		// Si on est en ligne
		if(bOnlineStatus){
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
							var jqoItem = jqoTaskLi.clone();
							jqoItem.find('.lblTask').html(sVal);
							$('ul').append(jqoItem);
							$('#txtItem').val('');
						}
					}
				});
			}
		} 
		// Si on n'est pas en ligne
		else {
			if(localStorage.getItem('numActions') == null){
				localStorage.setItem('numActions', 0);
			}
			var numActions = localStorage.getItem('numActions');
			numActions = parseInt(numActions);
			// On enregistre en local
			localStorage.setItem('action'+numActions, 'add');
			localStorage.setItem('item'+numActions, sVal);
			localStorage.setItem('numActions', numActions + 1);
			// On exécute l'action comme si on était en ligne
			var jqoItem = jqoTaskLi.clone();
				jqoItem.find('.lblTask').html(sVal);
				$('ul').append(jqoItem);
				$('#txtItem').val('');
		}
		return false;
	});
	$('#ulTodo').on('click', '.delTask', function(){
		var jqoParent = $(this).parent();
		// Si on est en ligne
		if(bOnlineStatus == true){
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
			if(localStorage.getItem('numActions') == null){
				localStorage.setItem('numActions', 0);
			}
			var numActions = localStorage.getItem('numActions');
			numActions = parseInt(numActions);
			// On enregistre en local
			localStorage.setItem('action'+numActions, 'del');
			localStorage.setItem('pos'+numActions, $('li').index(jqoParent));
			localStorage.setItem('numActions', numActions + 1);
			// On exécute l'action comme si on était en ligne
			jqoParent.remove();
		}
	});
 });
 
window.addEventListener('online', function() {
	bOnlineStatus = true;
	
	if(localStorage.getItem('numActions') == null){
		localStorage.setItem('numActions', 0);
	}
	var numActions = localStorage.getItem('numActions');
	numActions = parseInt(numActions);
	if(numActions > 0){
		// On parse toutes les actions
		for (iInc = 0; iInc < numActions; iInc++) {
			var sAction = localStorage.getItem('action'+iInc);
			// On dirige en fonction des actions
			if(sAction == 'add'){
				// On envoie la requête AJAX d'ajout
				$.ajax({
					url: 'ajax.php',
					dataType: 'json',
					type: 'POST',
					data:{
						type:'add',
						item:localStorage.getItem('item'+iInc)
					},
					success: function(data) {
						if(data.result == false){
							alert('Error')
						}
					}
				});
			}
			else if(sAction == 'del'){
				// On envoie la requête AJAX de suppression
			    $.ajax({
					url: 'ajax.php',
					dataType: 'json',
					type: 'POST',
					data:{
						type:'del',
						pos:localStorage.getItem('pos'+iInc)
					},
					success: function(data) {
						if(data.result == false){
							alert('Error')
						}
					}
				});
			}
		}
		// On nettoie toutes les actions
		localStorage.clear();
	}
}, true);
 
window.addEventListener('offline', function() {
	bOnlineStatus = false;
	localStorage.setItem('numActions', 0);
}, true);