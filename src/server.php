<?php
$_POST = json_decode(file_get_contents('php://input'), true); //Добавляем эту строку, если надо отправить данные в формате json
echo var_dump($_POST);