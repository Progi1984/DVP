<?php

	$arrResult = array();
	$arrResult['result'] = false;
	if(isset($_POST['type'])){
		// Si le fichier contenant les taches n'existe pas, on le cr�e.
		if(!file_exists('db.txt')){
			file_put_contents('db.txt', '');
		}

		// On charge le fichier & d�code la chaine JSON contenant les t�ches.
		$sDbTasks = file_get_contents('db.txt');
		$arrTasks = json_decode($sDbTasks);

		// Si l'action est un ajout...
		if($_POST['type'] == 'add'){
			// ... on ajoute l'�l�ment aux tableaux des taches.
			$arrTasks[] = $_POST['item'];
			$arrResult['result'] = true;
		}

		// Si l'action est une suppression...
		elseif($_POST['type'] == 'del'){
			// et qu'il existe dans le tableau, on le supprime
			if(isset($arrTasks[$_POST['pos']])){
				array_splice($arrTasks, $_POST['pos'], 1);
				$arrResult['result'] = true;
			} else {
				$arrResult['result'] = false;
			}
		}

		// On encode le tableau des taches dans une chaine JSON et on sauvegarde.
		$sDbTasks = json_encode($arrTasks);
		file_put_contents('db.txt', $sDbTasks);
	}
	
	echo json_encode($arrResult);
?>