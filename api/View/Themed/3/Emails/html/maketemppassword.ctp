<p>Dear <?= $user['name'] ?>:</p>
<?php
if (isset($isNewUser) && $isNewUser) {
    ?>
    <P>Dear <?= $user['name'] ?>, welcome to Wiewind Workshop!</P>
    <?php
}
?>
<p>Your username is: <b><?= $user['username'] ?></b></p>
<p>Your new password is: <b><?= $password ?></p></b></p>
<p>Please click <a href="<?= Configure::read('system.projUrl') ?>" target="_blank">here</a> to login and change your private password immediately.</p>