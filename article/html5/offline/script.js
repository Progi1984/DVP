 var bOnlineStatus;
 
 $(document).ready(function(){
	bOnlineStatus = navigator.onLine;
	$('#frmTodo').submit(function(){
		if(bOnlineStatus){
			var sVal = $('#txtItem').val();
			var sVal = $.trim(sVal);
			if(sVal != ''){
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
		} else {
			alert('Reseau : Offline');
		}
		return false;
	});
	$(document).on('click', '.delTask', function(){
		if(bOnlineStatus){
			var jqoParent = $(this).parent();
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
		} else {
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