<?php
date_default_timezone_set('Europe/Moscow');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
if(!file_exists('../data')){
  mkdir('../data');
}

$uid = rand(100000, 999999);

file_put_contents(
  '../data/'.$uid.'.json',
  json_encode(array(
    'id'=>$uid,
    'date'=>date('c'),
    'ip'=>$_SERVER['REMOTE_ADDR'],
    'data'=> json_decode(file_get_contents("php://input"), true))));

echo json_encode(array('error'=>false, 'uid'=>$uid));
