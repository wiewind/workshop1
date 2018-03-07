/**
 * Created by benying.zou on 12.02.2018.
 */
Ext.define ('WWS.view.worknotes.show.Detail', {
    extend: 'Ext.panel.Panel',
    xtype: 'worknotesshowdetail',

    requires: [
        'WWS.view.worknotes.show.DetailController',
        'WWS.view.worknotes.show.DetailViewModel'
    ],
    controller: 'worknotesshowdetail',
    viewModel: {
        type: 'worknotesshowdetail'
    },

    config: {
        layout: 'border',
        padding: 5,
        bodyPadding: 10,
        border: 1,
        tbar: [
            {
                text: Glb.btnSetting.editText,
                tooltip: Glb.btnSetting.editText,
                iconCls: Glb.btnSetting.editIconCls,
                handler: 'onClickEdit'
            },
            {
                text: Glb.btnSetting.deleteText,
                tooltip: Glb.btnSetting.deleteText,
                iconCls: Glb.btnSetting.deleteIconCls,
                handler: 'onClickDelete'
            },
            {
                text: Glb.btnSetting.printText,
                tooltip: Glb.btnSetting.printText,
                iconCls: Glb.btnSetting.printIconCls,
                handler: 'onClickPrint'
            }
        ]
    },

    initComponent: function () {
        this.items = [
            {
                xtype: 'container',
                region: 'north',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'component',
                        cls : 'worknote_title_panel',
                        bind: {
                            html: '{title}'
                        }
                    },
                    {
                        xtype: 'container',
                        width: '100%',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'component',
                                cls : 'noticeText',
                                flex: 1,
                                bind: {
                                    html: T.__('Project') + ': {getProjectName}'
                                }
                            },
                            {
                                xtype: 'component',
                                cls : 'noticeText',
                                bind: {
                                    html: '{displayDate}'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                region: 'south',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'component',
                        cls : 'noticeText',
                        flex: 1,
                        bind: {
                            html: T.__("Created") + ': {displayCreated}'
                        }
                    },
                    {
                        xtype: 'component',
                        cls : 'noticeText',
                        bind: {
                            html: T.__("Modified") + ': {displayModified}'
                        }
                    }
                ]
            },
            {
                reference: 'iframeCtn',
                region: 'center',
                layout: 'fit',
                padding: '10 0'
            }
        ];
        this.callParent();
    }
});