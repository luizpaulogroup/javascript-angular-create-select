<?php

require_once("../../config/Db.php");
require_once("../ClienteController.php");

$data = array();
$requestData = json_decode(file_get_contents("php://input"));

foreach($requestData->data as $key => $value){
    $data[$key] = $value;
}

$save = new Cliente();
$retorno = $save->_postSaveCliente($data);

$retornoJson = array('avisos' => null);

if (!$retorno) {
    $retornoJson["avisos"] = $save->lastErro();
} else {
    $retornoJson['avisos'] = 0;
    $retornoJson['lastInsert']['id_cliente'] = $save->lastInsertId();
}
// header('Content-Type: application/javascript');
echo json_encode($retornoJson);
