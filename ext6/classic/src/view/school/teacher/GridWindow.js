/**
 * Created by benying.zou on 09.03.2018.
 */
Ext.define ('WWS.view.school.teacher.GridWindow', {
    extend: 'Ext.window.Window',
    xtype: 'schoolteachergridwindow',

    requires: [
        'WWS.view.school.teacher.GridWindowController',
        'WWS.view.school.teacher.GridWindowViewModel'
    ],
    controller: 'schoolteachergridwindow',
    viewModel: {
        type: 'schoolteachergridwindow'
    },

    config: {
        title: T.__("List of teachers"),
        iconCls: 'x-fa fa-user-secret',
        autoShow: true,
        layout: 'fit',
        width: 800,
        height: 500,
        modal: true
    },

    items: [
        {
            xtype: 'grid',
            border: 0,
            forceFit: true,
            scrollable: true,
            multiSelect: false,
            bind: {
                store: '{teacherStore}'
            },
            emptyText: T.__("Empty"),
            columns: [
                {
                    text: T.__("Photo"),
                    width: 100,
                    resizable: false,
                    dataIndex: 'photo',
                    renderer: function(v, meta, rec) {
                        return '<img src="' + Cake.api.path + '/school/showPhoto/teacher/'+rec.get('id')+'/40?_v=' + btoa(Date.now()) + '" alt="photo" />';
                    }
                },
                {
                    text: T.__("Name of Person"),
                    flex: 1,
                    dataIndex: 'lastname',
                    renderer: function(v, meta, rec){
                        var desp = rec.get('description');
                        if (desp) {
                            meta.tdAttr = 'data-qtip="' + desp.replace(/"/g, '&quot;') + '"';
                        }
                        return Glb.displayPersonName(v, rec.get('firstname'), rec.get('sex'), Glb.LastnameAtFirst);
                    }
                },
                {
                    text: T.__("Telephone"),
                    flex: 1,
                    dataIndex: 'telephone'
                },
                {
                    text: T.__("Email"),
                    flex: 1,
                    dataIndex: 'email'
                },
                {
                    text: T.__("Count Courses"),
                    dataIndex: 'count_courses'
                }
            ],

            tbar: [
                {
                    text: T.__("OK"),
                    tooltip: T.__("OK"),
                    iconCls: 'x-fa fa-check',
                    itemId: 'okBtn',
                    disabled: true,
                    bind: {
                        hidden: '{!selectable}'
                    },
                    handler: 'onClickSelect'
                },
                {
                    text: Glb.btnSetting.newText,
                    tooltip: Glb.btnSetting.newText,
                    iconCls: Glb.btnSetting.newIconCls,
                    handler: 'onClickNew'
                },
                {
                    text: Glb.btnSetting.editText,
                    tooltip: Glb.btnSetting.editText,
                    iconCls: Glb.btnSetting.editIconCls,
                    itemId: 'editBtn',
                    disabled: true,
                    handler: 'onClickEdit'
                },
                {
                    text: Glb.btnSetting.deleteText,
                    tooltip: Glb.btnSetting.deleteText,
                    iconCls: Glb.btnSetting.deleteIconCls2,
                    itemId: 'deleteBtn',
                    disabled: true,
                    handler: 'onClickDelete'
                },
                '->',
                {
                    xtype: 'searchfield',
                    emptyText: Glb.btnSetting.searchText,
                    width: 300,
                    listeners: {
                        specialkey: 'enterSearch'
                    },
                    onClickCancel: 'onClickCancel',
                    onClickSearch: 'onClickSearch'
                }
            ],

            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                displayMsg: '{0} - {1} of {2}',
                emptyMsg: T.__("Empty")
            },

            listeners: {
                select: 'onItemSelect',
                itemdblclick: 'onItemDblClick'
            }
        }
    ],

    listeners: {
        select: 'onItemSelect',
        itemdblclick: 'onItemDblClick'
    }
});