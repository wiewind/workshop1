<?php


if (strpos($_SERVER['HTTP_HOST'], 'local') === false && (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS']!=='on')) {
    header('Location: https://'.$_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
}

require_once '../api/Config/config_default.php';

?><!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">

    <script type="text/javascript">
        var Cake = Cake || <?= json_encode($config['system']) ?>;
    </script>

    <meta name="author" content="<?= $config['system']['author'] ?>"/>
    <meta name="description" content="<?= $config['system']['name'] ?>"/>
    <meta name="keywords" content="<?= $config['system']['name'] ?>"/>
    <meta name="publisher" content="<?= $config['system']['author'] ?>"/>
    <meta name="copyright" content="<?= $config['system']['author'] ?>"/>
    <meta http-equiv="expires" content="0"/>
    <link rel="shortcut icon" href="<?= $config['system']['image']['logo'] ?>" >

    <script type="text/javascript" src="../../lib/jquery/<?= $config['system']['jquery']['file'] ?>"></script>
    <script type="text/javascript" src="../../lib/ckeditor/ckeditor.js"></script>
    <script type="text/javascript" src="../../lib/ckeditor/ckfinder/ckfinder.js"></script>

    <title><?= $config['system']['name'] ?></title>

    <script type="text/javascript">
        var Ext = Ext || {}; // Ext namespace won't be defined yet...

        // This function is called by the Microloader after it has performed basic
        // device detection. The results are provided in the "tags" object. You can
        // use these tags here or even add custom tags. These can be used by platform
        // filters in your manifest or by platformConfig expressions in your app.
        //


        Ext.beforeLoad = function (tags) {
            var s = location.search,  // the query string (ex "?foo=1&bar")
                profile;

            // For testing look for "?classic" or "?modern" in the URL to override
            // device detection default.
            //
            if (s.match(/\bclassic\b/)) {
                profile = 'classic';
            }
            else if (s.match(/\bmodern\b/)) {
                profile = 'modern';
            }
            else {
                profile = tags.desktop ? 'classic' : 'modern';
                //profile = tags.phone ? 'modern' : 'classic';
            }

            Ext.manifest = profile; // this name must match a build profile name

            // This function is called once the manifest is available but before
            // any data is pulled from it.
            //
            //return function (manifest) {
                // peek at / modify the manifest object
            //};
        };
    </script>

    <!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" data-app="556b8b65-0432-42dd-9f5c-0e1636856100" type="text/javascript" src="bootstrap.js"></script>

    <style type="text/css">
        #welcome_box {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            text-align: center;
            font-size: 0;
            background-color: #dfe9f6;
        }
        #welcome_box .welcome_pic{
            border: 0;
            text-align: right;
            font-size: 12px !important;
            color: #9090aa !important;
            /*font-family: "cursive" !important;*/
            position: absolute;
            margin-top: -35px;
            margin-left: -150px;
            top: 50%;
            left: 50%;
        }
    </style>
</head>
<body>
<div id="welcome_box">
    <div class="welcome_pic">
        <img style="margin-left: 10px;" src="<?= $config['system']['image']['path'] ?>/logo_mit_schriftung.png" width="300" />
        <br />
        <img src="<?= $config['system']['image']['path'] ?>/loading.gif" />
        <?= $config['system']['author'] ?>
    </div>
</div>
</body>
</html>
