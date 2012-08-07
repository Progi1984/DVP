<?php
	/**
	 * File : ajax.php
	 *
	 */
	
	$arrResult = array();

	if(isset($_POST['type'])){
		// FR : Si le fichier contenant les taches n'existe pas, on le crée.
		// EN : If the file containing tasks doesn't exist, we create it.
		if(!file_exists('db.txt')){
			file_put_contents('db.txt', '');
		}

		// FR : On charge le fichier & décode la chaine JSON contenant les tâches.
		// EN : We load the file and decode the JSON string containing tasks.
		$sDbTasks = file_get_contents('db.txt');
		$arrTasks = json_decode($sDbTasks);

		// FR : Si l'action est un ajout...
		// EN : If the action is an addition...
		if($_POST['type'] == 'add'){
			$arrTasks[] = $_POST['item'];
			$arrResult['result'] = true;
		}

		// FR : Si l'action est une suppression...
		// EN : If the action is a deletion...
		elseif($_POST['type'] == 'del'){
			if(isset($arrTasks[$_POST['pos']])){
				unset($arrTasks[$_POST['pos']]);
				$arrResult['result'] = true;
			} else {
				$arrResult['result'] = false;
			}
		}

		// FR : On encode le tableau dans une chaine JSON et on sauvegarde.
		// EN : We encode the array in a JSON string and we save it.
		$sDbTasks = json_encode($arrTasks);
		file_put_contents('db.txt', $sDbTasks);
		
	}
	json_encode($arrResult);
?>