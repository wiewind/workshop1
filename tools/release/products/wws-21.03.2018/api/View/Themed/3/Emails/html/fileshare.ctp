<p>
    <?php
    if (!$salutation) {
        $salutation = 'Dear ladies and gentlemen';
    } else {
        $salutation = 'Dear ' . $salutation;
    }
    echo $salutation . ','
    ?>
</p>
<p>your friend <?= $user['name'] ?> has shared the following files for you:</p>
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
        $timelimit = '1 year';
    } else {
        $timelimit .= ' days';
    }?>
    <p>You can view them in <?= $timelimit ?>.</p>
<?php } ?>
<br />
<br />
<p>Best regards!</p>
<p>wiewind.com<br /><?= date('M-d-Y') ?></p>
