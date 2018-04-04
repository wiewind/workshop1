<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$config['system']['brand'] = 'dev';
$config['system']['name'] = 'Wiewind Workshop';
$config['system']['appName'] = 'WWS';
$config['system']['author'] = 'Wiewind Studio';
$config['system']['defaultLanguage']['id'] = 1;
$config['system']['defaultLanguage']['cake_code'] = 'zho';
$config['system']['domain'] = 'wiewind.com';
$config['system']['path'] = 'apps/workshop';

// ----------- SETTING ---------------------------------------
$config['system']['api']['dirname']         = 'api';
$config['system']['app']['dirname']         = 'ext6';
$config['system']['resources']['dirname']   = 'resources';
$config['system']['cdata']['dirname']       = '/__data__';
$config['system']['tmp']['dirname']            = '/__data__/__tmp__';

$config['system']['image']['dirname'] = 'img';
$config['system']['image']['logoFile'] = 'logo_22_16.png';
$config['system']['js']['dirname'] = 'js';

$config['system']['jquery']['file'] = 'jquery-3.1.1.min.js';

$config['system']['classic']['maxPageSize']  = 30;
$config['system']['modern']['maxPageSize']   = 10;

$config['system']['filemanagement']['dirname'] = 'fmroot';
$config['system']['filemanagement']['chip'] = 'wiewind.com';
$config['system']['filemanagement']['expire'] = 30;
$config['system']['filemanagement']['maxFileSize'] = 5200000;
$config['system']['filemanagement']['notAllowdTypes'] = ['exe', 'bat', 'sys', 'cmd'];
$config['system']['filemanagement']['allowView'] = [
    'pdf',
    'bmp', 'jpg', 'jpeg', 'gif', 'png',
    'xls', 'doc', 'xlsx', 'docx', 'ppt', 'pptx',
    'txt', 'js', 'php', 'html', 'htm', 'asp', 'xml'
];


$config['system']['jobattachment']['dirname'] = 'jobattachment';

$config['system']['school']['dirname'] = 'school_photos';


$config['system']['backup']['path'] = '/_backups';
$config['system']['backup']['max'] = 30;
$config['system']['backup']['count_pro_insert'] = 100;
$config['system']['backup']['folder_time_format'] = 'Y-m-d_H.i.s';
$config['system']['backup']['code'] = 'fdsw3)sx,L$w7+0E';
$config['system']['backup']['projects'] = [
    'sql' => false,
    'studio' => [
        'path' => '',
        'exception' => ['_backups', '_datei', 'apps']
    ],
    'workshop' => [
        'path' => 'apps/workshop/'
    ],
    'workshop1' => [
        'path' => 'apps/workshop1/'
    ],
    'shop' => [
        'path' => 'apps/shop/'
    ],
    'ischool' => [
        'path' => 'apps/ischool/'
    ],
    'new_project' => [
        'path' => 'apps/new_project/'
    ],
    'apps' => [
        'path' => 'apps/',
        'exception' => ['workshop', 'workshop1', 'shop', 'ischool', 'ischool_1', 'new_project']
    ],
    '_datei' => [
        'path' => '_datei/'
    ]
];


$config['system']['prefix']['folder'] = 'dNode_';
$config['system']['prefix']['file'] = 'fNode_';
$config['system']['prefix']['group'] = 'gNode_';
$config['system']['prefix']['key'] = 'kNode_';
$config['system']['prefix']['tree'] = 'tree_';
$config['system']['prefix']['grid'] = 'grid_';
$config['system']['prefix']['search'] = 'search_';
$config['system']['prefix']['other'] = 'other_';

// -------------- EMAIL ---------------------------
$config['system']['email']['admin'] = 'info@wiewind.com';
$config['system']['email']['backup'] = 'backup@wiewind.com';


$config['auth']['key'] = 'wiewind.com2u';







include_once 'config_private.php';
include_once 'config_combi.php';