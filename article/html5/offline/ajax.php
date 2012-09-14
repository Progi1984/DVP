<?php

	$arrAction = array('add', 'del', 'list');
	$arrResult = array('result' => false);

	if(isset($_POST['type']) && in_array($_POST['type'], $arrAction)){
		// Si le fichier contenant les taches n'existe pas, on le crée.
		if(!file_exists('db.txt')){
			file_put_contents('db.txt', '');
		}

		// On charge le fichier & décode la chaine JSON contenant les tâches.
		$sDbTasks = file_get_contents('db.txt');
		$arrTasks = json_decode($sDbTasks);

		// Si l'action est un ajout...
		if($_POST['type'] == 'add'){
			// ... on ajoute l'élément aux tableaux des taches.
			$arrTasks[] = htmlentities($_POST['item'], ENT_QUOTES);
			$arrResult['result'] = true;
		}

		// Si l'action est une suppression...
		elseif($_POST['type'] == 'del'){
			// et qu'il existe dans le tableau, on le supprime
			if(is_numeric($_POST['pos'])){
				if(isset($arrTasks[$_POST['pos']])){
					array_splice($arrTasks, $_POST['pos'], 1);
					$arrResult['result'] = true;
				} else {
					$arrResult['result'] = false;
				}
			} else {
				$arrResult['result'] = false;
			}
		}
		
		// Si l'action est un listing...
		elseif($_POST['type'] == 'list'){
			$arrResult['result'] = true;
			$arrResult['data'] = $arrTasks;
		}

		// On encode le tableau des taches dans une chaine JSON et on sauvegarde.
		$sDbTasks = json_encode($arrTasks);
		file_put_contents('db.txt', $sDbTasks);
	}
	
	echo json_encode($arrResult);
?>