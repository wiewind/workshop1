<p>
    <?php
    if (!$salutation) {
        $salutation = 'Sehr geehrte Damen und Herren';
    } else {
        $salutation = 'Liebe(r) ' . $salutation;
    }
    echo $salutation . ','
    ?>
</p>
<p>Ihr(e) Freund(in) <?= $user['name'] ?> hat Ihnen folgende Dateien weitergeleitet:</p>
<ul>
    <?php
    foreach ($files as $f) {?>
        <li style="padding-bottom: 20px">
            <a href="<?= $f['link'] ?>"><?= $f['name'] ?></a> -- <?= $f['size'] ?><br />
            <a href="<?= $f['link'] ?>" style="font-size: x-small; color: #666666"><?= $f['link'] ?></a>
        </li>
        <?php
    }
    ?>
</ul>
<?php if ($timelimit > 0) {
    if ($timelimit == 365) {
        $timelimit = '1 Jahr';
    } else {
        $timelimit .= ' Tage';
    }?>
    <p>Sie dürfen die Dateien innerhalb <?= $timelimit ?> anschauen.</p>
<?php } ?>
<br />
<br />
<p>Mit freundlichen Grüßen!</p>
<p>wiewind.com<br /><?= date('d.m.Y') ?></p>
