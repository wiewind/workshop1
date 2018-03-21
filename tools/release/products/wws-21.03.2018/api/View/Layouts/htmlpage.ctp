<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="X-UA-Compatible" content="chrome=1"/>
    <meta name="google" content="notranslate" />
    <?php
        echo $this->Html->charset();
        echo $this->Html->meta('icon', Configure::read('system.image.logo'));
        echo $this->fetch('meta');
    ?>
	<title>
		<?php echo GlbF::getWebName(); ?>
	</title>
</head>
<body>
    <?php
       echo $this->Html->css(array(
           'styles2',
           'styles_print',
           Configure::read('system.url').Configure::read('system.ckeditor.path').'/plugins/codesnippet/lib/highlight/styles/default.css'
        ));
        echo $this->Html->script(array(
            Configure::read('system.url').Configure::read('system.ckeditor.path').'/plugins/codesnippet/lib/highlight/highlight.pack.js'
        ));

        echo $this->Html->scriptBlock("hljs.initHighlightingOnLoad();");

        echo $this->fetch('content');
    ?>
</body>
</html>