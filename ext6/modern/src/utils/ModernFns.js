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
        }
    }
});