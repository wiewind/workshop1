<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class FilemanagementFolder extends AppModel {

    var $belongsTo = array(
        'FolderUserCreated' => array(
            'className' => 'User',
            'foreignKey' => 'created_by',
            'fields' => array(
                'FolderUserCreated.name',
                'FolderUserCreated.username',
            ),
            'type' => 'LEFT'
        ),
        'FolderUserModified' => array(
            'className' => 'User',
            'foreignKey' => 'modified_by',
            'fields' => array(
                'FolderUserModified.name',
                'FolderUserModified.username',
            ),
            'type' => 'LEFT'
        )
    );


}