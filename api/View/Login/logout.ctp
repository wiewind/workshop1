<div  class="login-info"><?= sprintf(__('Bye %s, you have successfully logged out!'), $user['name']) ?></div>
<div class="login-row" id="returnDiv"></div>
<script type="text/javascript" charset="UTF-8">
    /* <![CDATA[ */
    Wiewind.countJump(15, '<?= APP_PATH ?>/login', 'returnDiv', '<?= __("The page will automatically jump to the login page after %d seconds...") ?>');
    /* ]]> */
</script>