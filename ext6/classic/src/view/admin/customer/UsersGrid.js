/**
 * Created by benying.zou on 22.03.2018.
 */
/**
 * Created by benying.zou on 06.12.2016.
 */
Ext.define ('WWS.view.admin.customer.UsersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'admincustomerusersgrid',

    requires: [
        'WWS.view.admin.customer.UsersGridController',
        'WWS.view.admin.customer.UsersGridViewModel'
    ],
    controller: 'admincustomerusersgrid',
    viewModel: {
        type: 'admincustomerusersgrid'
    },


    config: {
        scrollable: true,
        border: 1,
        bind: {
            store: '{usersStore}',
            title: '{getTitle}'
        },
        iconCls: 'x-fa fa-user'
    },

    columns: [
        {
            text: T.__("Status"),
            dataIndex: 'active',
            width: 50,
            renderer: function (v, meta, rec) {
                var icon = (v) ? 'fa-check' : 'fa-ban',
                    text = (v) ? T.__("active") : T.__("blocked"),
                    color= (v) ? 'green' : 'red';
                meta.tdAttr = 'data-qtip="' + text + '"';
                return '<div class="x-fa ' + icon + '" style="color:' + color + ';"></div>';
            }
        },
        {
            text: T.__("Name of User"),
            flex: 1,
            dataIndex: 'name'
        },
        {
            text: T.__("Username"),
            flex: 1,
            dataIndex: 'username'
        },
        {
            text: T.__("WeChat Name"),
            flex: 1,
            dataIndex: 'wechatname'
        },
        {
            text: T.__("Telephone"),
            flex: 1,
            dataIndex: 'telephone'
        },
        {
            text: T.__("Fax"),
            flex: 1,
            dataIndex: 'fax'
        },
        {
            text: T.__("Email"),
            flex: 1,
            dataIndex: 'email'
        },
        {
            text: T.__("Modules"),
            flex: 1,
            dataIndex: 'module_names',
            renderer: function(v){
                if (v) {
                    var res = '',
                        modules = v.split(';');
                    modules.forEach(function (modulename) {
                        res = res + '<img src="' + Cake.image.path + '/board/' + modulename + '16.png" title="' + SSD.config.modules[modulename].text + '" /> ';
                    });
                    return res;
                }
                return '';
            }
        },
        {
            text: T.__("Modified"),
            width: 120,
            dataIndex: 'modified',
            renderer: function (v) {
                return Glb.Date.displayDateFromTimestamp(v);
            }
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: '{0} - {1} of {2}',
        emptyMsg: T.__("Empty")
    },

    tbar: [
        {
            text: T.__("New User"),
            iconCls: Glb.btnSetting.newIconCls,
            tooltip: T.__("New User"),
            handler: 'onClickNew'
        },
        {
            text: T.__("Edit User"),
            iconCls: Glb.btnSetting.editIconCls,
            tooltip: T.__("Edit User"),
            itemId: 'editBtn',
            disabled: true,
            handler: 'onClickEdit'
        },
        {
            text: T.__("Delete User"),
            iconCls: Glb.btnSetting.deleteIconCls2,
            tooltip: T.__("Delete User"),
            itemId: 'deleteBtn',
            disabled: true,
            handler: 'onClickDelete'
        },
        {
            text: T.__("Activate"),
            iconCls: 'x-fa fa-check green',
            tooltip: T.__("activate this user"),
            itemId: 'activeBtn',
            disabled: true,
            handler: 'onClickActive'
        },
        {
            text: T.__("Block"),
            iconCls: 'x-fa fa-ban red',
            tooltip: T.__("block this user"),
            itemId: 'blockBtn',
            disabled: true,
            handler: 'onClickBlock'
        },
        {
            text: T.__("Change Username"),
            iconCls: 'x-fa fa-pencil-square-o',
            tooltip: T.__("Change Username"),
            itemId: 'changeUsernameBtn',
            disabled: true,
            handler: 'onClickChangeUsername'
        },
        '->',
        T.__("View"),
        {
            xtype: 'combobox',
            queryMode: 'local',
            valueField: 'value',
            displayField: 'name',
            value: 'all',
            width: 100,
            bind: {
                store: '{activeSelectStore}'
            },
            listeners: {
                change: 'onClickChange'
            }
        }
    ],

    listeners: {
        select: 'onItemSelect',
        itemdblclick: 'onItemDblClick'
    }
});