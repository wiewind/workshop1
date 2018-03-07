<div class="login-form" id="resetPasswordForm">
    <div class="login-row" align="left">
        <?= __('You are using the system assigned password, please change to your private password.') ?><br /><br />
        <b><?= __('Please enter your new password:') ?></b>
        <input type="hidden" name="userid" id="userid" value="<?= $user['id'] ?>"  />
    </div>
    <div class="login-row">
        <span class="login-label"><?= __("new password") ?></span>
        <span class="login-input"><input type="password" name="password1" id="password1" value="" /></span>
    </div>
    <div class="login-row">
        <span class="login-label"><?= __("repeated") ?></span>
        <span class="login-input"><input type="password" name="password2" id="password2" value="" /></span>
    </div>
    <div class="login-row">
        <span class="login-msg" id="msg"><?= isset($errMsg) ? $errMsg : '' ?></span>
        <input type="button" value="<?= __('Submit') ?>" onclick="resetPassword();" />
    </div>
</div>
<script type="text/javascript" charset="UTF-8">
    /* <![CDATA[ */
    var resetPassword = function () {
        var password1 = $('#password1').val(),
            password2 = $('#password2').val(),
            user_id = $('#userid').val(),
            msgfield = $('#msg');
        msgfield.html('<?= __("Please wait...") ?>');
        if (!Wiewind.checkPassword(password1)) {
            msgfield.html('<?= __("min. length of password: 6") ?>');
            return;
        }
        if (password1 !== password2) {
            msgfield.html('<?= __("Password and repeated password are not identical!") ?>');
            return;
        }

        $.ajax({
            url: "<?= APP_PATH ?>/login/doResetPassword",
            method: 'POST',
            data: {
                user_id: user_id,
                password: password1
            },
            dataType: 'json',
            success: function(result){
                if (result.success) {
                    self.location = result.directurl;
                } else {
                    msgfield.html(result.message);
                }
            }
        });
    };

    $('#password1').keydown(function (event) {
        Wiewind.enterEvent(event, resetPassword)
    });

    $('#password2').keydown(function (event) {
        Wiewind.enterEvent(event, resetPassword)
    });
    /* ]]> */
</script>