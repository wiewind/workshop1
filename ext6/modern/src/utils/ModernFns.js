/**
 * Created by benying.zou on 22.02.2018.
 */
Ext.define('WWS.utils.ModernFns', {
    singleton: true,
    alternateClassName: ['MGlb'],

    common: {
        identicalShow: function (option, ownerId) {
            ownerId = ownerId || 'maincontainer';
            var ownerCt = Ext.getCmp(ownerId),
                p = null;
            if ('id' in option){
                p = Ext.getCmp(option.id);
            }else if ('itemId' in option){
                p = ownerCt.down('#' + option.itemId);
            }else if ('xtype' in option) {
                p = ownerCt.down(option.xtype);
            }
            if (!p) {
                p = Ext.create(option);
                ownerCt.add(p);
            }

            var ai = ownerCt.getActiveItem();
            if (ai != p) {
                ownerCt.setActiveItem(p);
            }

            if ('todo' in option) {
                option.todo(p, ownerCt);
            }
        },

        goback: function () {
            window.history.back();
        },

        forgotPassword: function () {
            ABox.prompt(
                T.__('Username') + ":\n" + T.__('Please enter your username'),
                function (button, value) {
                    if (button === 'ok') {
                        Glb.Ajax({
                            url: Cake.api.path + '/login/json/makeResetPasswordMail',
                            params: {
                                username: value
                            },
                            success: function (response, options) {
                                var resp = Ext.decode(response.responseText);
                                ABox.success(
                                    Wiewind.String.sprintf(T.__('Hello %s, an email was sent to your email address!'), resp.data.name, {
                                        placeholder: T.__('Please enter your username')
                                    })
                                );
                            }
                        });
                    }
                }
            );
        }
    }
});