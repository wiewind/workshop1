<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class FilemanagementFile extends AppModel {

    var $belongsTo = array(
        'FilemanagementFolder' => array(
            'className' => 'FilemanagementFolder',
            'foreignKey' => 'folder_id',
            'type' => 'INNER'
        ),
        'FileUserCreated' => array(
            'className' => 'User',
            'foreignKey' => 'created_by',
            'fields' => array(
                'FileUserCreated.name',
                'FileUserCreated.username',
            ),
            'type' => 'LEFT'
        ),
        'FileUserModified' => array(
            'className' => 'User',
            'foreignKey' => 'modified_by',
            'fields' => array(
                'FileUserModified.name',
                'FileUserModified.username',
            ),
            'type' => 'LEFT'
        )
    );

    function getNewSavedName () {
        $y = date('Y');
        $m = date('m');
        $d = date('d');

        $dir = Configure::read('filemanagement.root').'/'.$y.'/'.$m.'/'.$d;
        GlbF::mkDir($dir);

        do {
            $filename = $dir.'/'.GlbF::getRandString();
        } while (is_file($filename));

        return $filename;
    }

}