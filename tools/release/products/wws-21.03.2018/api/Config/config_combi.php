<?php
/**
 * Created by PhpStorm.
 * User: benying.zou
 * Date: 15.02.2018
 * Time: 15:26
 */

$config['system']['https'] = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']==='on';
$config['system']['url'] = ($config['system']['https'] ? 'https' : 'http') . '://' . $config['system']['domain'];
$config['system']['projUrl'] = $config['system']['url'] . '/' . $config['system']['path'];


$config['system']['api']['path']            = '/' . $config['system']['path'] . '/' . $config['system']['api']['dirname'];
$config['system']['app']['path']            = '/' . $config['system']['path'] . '/' . $config['system']['app']['dirname'];
$config['system']['resources']['path']      = '/' . $config['system']['path'] . '/' . $config['system']['resources']['dirname'];
$config['system']['cdata']['path']          = '/' . $config['system']['path'] . '/' . $config['system']['cdata']['dirname'];
$config['system']['tmp']['path']            = '/' . $config['system']['path'] . '/' . $config['system']['tmp']['dirname'];

$config['system']['image']['path']          = $config['system']['resources']['path'] . '/' . $config['system']['image']['dirname'];
$config['system']['image']['logo']          = $config['system']['image']['path'] . '/' . $config['system']['image']['logoFile'];
$config['system']['js']['path']             = $config['system']['resources']['path'] . '/' . $config['system']['js']['dirname'];

$config['system']['ckeditor']['path']       = '/' . $config['system']['path'] . '/' . '../lib/ckeditor';
$config['system']['ckeditor']['file']       = $config['system']['ckeditor']['path'] . '/ckeditor.js';
$config['system']['ckfinder']['file']       = $config['system']['ckeditor']['path'] . '/ckfinder/ckfinder.js';

$config['system']['filemanagement']['root'] = $config['system']['cdata']['path'] . '/' . $config['system']['filemanagement']['dirname'];
$config['system']['jobattachment']['root']  = $config['system']['cdata']['path'] . '/' . $config['system']['jobattachment']['dirname'];
$config['system']['school']['root']         = $config['system']['cdata']['path'] . '/' . $config['system']['school']['dirname'];