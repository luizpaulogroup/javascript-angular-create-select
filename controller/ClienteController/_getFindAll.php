<?php

require_once("../../config/Db.php");
require_once("../ClienteController.php");

$clientes = Cliente::_getFindAll();

echo json_encode($clientes);