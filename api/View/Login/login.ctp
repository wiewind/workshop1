<div class="login-form" name="loginForm"">
    <div class="login-row">
        <span class="login-label"><?= __("Username") ?></span>
        <span class="login-input"><input type="text" name="username" id="username" value="" /></span>
    </div>
    <div class="login-row">
        <span class="login-label"><?= __("Password") ?></span>
        <span class="login-input"><input type="password" name="password" id="password" value="" /></span>
    </div>
    <div class="login-row">
        <span class="login-msg" id="msg"><?= $loginMsg ?></span><input type="submit" id="submitBtn" value="<?= __('Login') ?>" onclick="dologin();" />
    </div>
    <div>
        <a href="<?= APP_PATH ?>/login/forgetpassword" target="_self"><?= __('Forgot Your Password?') ?></a>
    </div>
</div>
<script type="text/javascript" charset="UTF-8">
    /* <![CDATA[ */
    function dologin () {
        var username = $('#username').val(),
            password = $('#password').val(),
            msgfield = $('#msg');
        msgfield.html('<?= __("Please wait...") ?>');
        if (username.length === 0) {
            msgfield.html('<?= __("Please enter your username.") ?>');
            return;
        }
        if (password.length === 0) {
            msgfield.html('<?= __("Please enter your password.") ?>');
            return;
        }

        $.ajax({
            url: "<?= APP_PATH ?>/login/dologin",
            method: 'POST',
            data: {
                username: username,
                password: password
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
    }

    $('#username').keydown(function (event) {
        Wiewind.Action.enterEvent(event, dologin)
    });
    $('#password').keydown(function (event) {
        Wiewind.Action.enterEvent(event, dologin)
    });
    /* ]]> */
</script>