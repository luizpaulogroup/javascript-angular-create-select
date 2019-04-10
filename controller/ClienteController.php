<?php

require_once("../../config/Model_Exception.php");

class Cliente{

    protected $lastInsertId = null;
    protected $lastErro = null;

    public function lastInsertId()
    {
        return $this->lastInsertId;
    }
    public function lastErro()
    {
        return $this->lastErro;
    }

    public static function _getFindAll()
    {
        $sql = Db::conexao()->query("select * from tbcliente")->fetchAll(PDO::FETCH_ASSOC);
        return $sql;
    }

    function _postSaveCliente($data)
    {
        try {
            
            $this->lastErro = null;

            $sql = "insert into tbcliente (";
            foreach($data as $key => $value){
                $sql .= ("$key,");
            }
            $sql = substr($sql, 0, -1);
            $sql .= ") values (";
            foreach($data as $key => $value){
                $sql .= (":$key,");
            }
            $sql = substr($sql, 0, -1);
            $sql .= ")";

            $stmt = Db::conexao()->prepare($sql);
            foreach($data as $key => $value){
                $stmt->bindValue(":$key", $value);
            }
            $resultado = $stmt->execute();
            
            if(!$resultado){
                $this->lastErro = Model_Exception::ERROR;
                return false;
            }
            $this->lastInsertId = Db::conexao()->lastInsertId();
            return true;
        } catch (\Exception $e) {
            die($e->getMessage());
        }
    }
}