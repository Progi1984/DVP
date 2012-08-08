 $(document).ready(function(){
	$('#frmTodo').submit(function(){
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
		return false;
	});
	$(document).on('click', '.delTask', function(){
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
	});
 });