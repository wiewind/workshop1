<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="X-UA-Compatible" content="chrome=1"/>
    <meta name="google" content="notranslate" />
    <?php
        echo $this->Html->charset();
        echo $this->Html->meta('icon', 'filetypes/icon/'.$suffix);
        echo $this->fetch('meta');

        echo $this->Html->css(array(
            Configure::read('system.url').Configure::read('system.ckeditor.path').'/plugins/codesnippet/lib/highlight/styles/default.css'
        ));
        echo $this->Html->script(array(
            Configure::read('system.url').Configure::read('system.ckeditor.path').'/plugins/codesnippet/lib/highlight/highlight.pack.js'
        ));
        echo $this->Html->scriptBlock("hljs.initHighlightingOnLoad();");
    ?>

    <title>
        <?php
                $pageTitle = GlbF::getWebName();
                $pageTitle .= ' - '.__('Previewer').':  '.basename($filename);
                echo $pageTitle;
        ?>
    </title>
    <style type="text/css">
        body {
            padding: 0;
            margin: 0;
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0;">
        <?= $this->fetch('content') ?>
    </div>
</body>
</html>