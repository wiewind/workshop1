<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Filetype extends AppModel {

    var $belongsTo = array(
        'FiletypeGroup' => array(
            'className' => 'FiletypeGroup',
            'foreignKey' => 'filetype_group_id',
            'type' => 'LEFT'
        )
    );
}