 $(document).ready(function(){
	$('#frmTodo').submit(function(){
		var sVal = $('#txtItem').val();
		var sVal = $.trim(sVal);
		if(sVal != ''){
			var sItem = '<li><span>'+sVal+'</span><img src="delete.png" alt="Supprimer" class="delTask"/></li>';
			$('ul').append(sItem);
			$('#txtItem').val('');
		}
		return false;
	});
	$(document).on('click', '.delTask', function(){
		$(this).parent().remove();
	});
 });