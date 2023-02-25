<?php
require_once (realpath(dirname(__FILE__).'/../../../../..').'/boot.php');

global $naWebOS;
$db = $naWebOS->dbs->findConnection('couchdb');
$cdb = $db->cdb;

$adb = $naWebOS->dbsAdmin->findConnection('couchdb');
$acdb = $adb->cdb;

$dataSetName = $db->dataSetName('data_by_users'); // i know, couchdb calls a 'table' a 'database'. and that sux.

$cdb->setDatabase ($dataSetName, false);


$findCommand = [
    'selector' => [
        'dataID' => $_GET['dataID']
    ],
    'use_index' => 'index_dataID',
    'fields' => [ '_id' ]
];

try {
    $call = $cdb->find ($findCommand);
} catch (Exception $e) {
    $msg = $fncn.' FAILED while trying to find in \''.$dataSetName.'\' : '.$e->getMessage();
    trigger_error ($msg, E_USER_NOTICE);
    echo $msg;
    return false;
}

if (
    is_object($call)
    && is_object($call->body)
    && is_array($call->body->docs)
) {
    if (count($call->body->docs)===0) {
        $r = '';
    } elseif (count($call->body->docs)===1) {
        //echo '<pre>';
        //var_dump ($call->body->docs); //die();
        $call2 = $cdb->get ($call->body->docs[0]->_id);
        //var_dump ($call2->body); //die();
        /*
        $r = null;
        if (property_exists($call2->body, 'viewSettings')) {
            foreach ($call2->body->viewSettings as $fp => $vs) {
                if (property_exists($vs,'SEO_value')) $r = $vs->SEO_value;
            }
            //$vs = $call2->body->viewSettings;
            //if (property_exists($vs,'SEO_value')) $r = $vs->SEO_value;
        }*/
        if (property_exists($call2->body,'SEO_value')) $r = $call2->body->SEO_value;
        if (is_null($r)) $r = $call2->body->dataID;

    } elseif (count($call->body->docs)>1) {
        $msg = $fncn.' : multiple views for viewID='.$_GET['viewID'].' were found. using only the first.';
        trigger_error($msg, E_USER_WARNING);
        echo $msg;
        error_log($msg);

        $call = $cdb->get ($call->body->docs[0]['_id']);
        $r = $call->body->docs[0];
    }
}

echo $r;
?>
