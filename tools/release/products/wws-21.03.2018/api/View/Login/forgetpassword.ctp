<div class="login-form" id="info-content" name="resetPasswordForm">
    <div class="login-row" align="left">
        <b><?= __('Please give me your username:') ?> </b>
    </div>
    <div class="login-row">
        <span class="login-input"><input type="text" name="username" id="username" value="" /></span>
        <input type="submit" value="<?= __('Submit') ?>" onclick="makeNewPassword();" />
    </div>
    <div class="login-row">
        <span class="login-msg" id="msg"><?= isset($errMsg) ? $errMsg : '' ?></span>
    </div>
</div>
<script type="text/javascript" charset="UTF-8">
    /* <![CDATA[ */
    function makeNewPassword () {
        var username = $('#username').val(),
            msgfield = $('#msg');
        msgfield.html('<?= __("Please wait...") ?>');
        if (username.length === 0) {
            msgfield.html('<?= __("Please enter your username") ?>');
            return;
        }

        $.ajax({
            url: "<?= APP_PATH ?>/login/makeResetPasswordMail",
            method: 'POST',
            data: {
                username: username
            },
            dataType: 'json',
            success: function(result){
                if (result.success) {
                    var info = Wiewind.buildInfo('<?= __("An email was sent to your email address!") ?>');
                    var c = $("#info-content");
                    if (c) {
                        c.html(info);
                    }
                } else {
                    msgfield.html(result.message);
                }
            }
        });
    }

    $('#username').keydown(function (event) {
        Wiewind.enterEvent(event, makeNewPassword)
    });
    /* ]]> */
</script>