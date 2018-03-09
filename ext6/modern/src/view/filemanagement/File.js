/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define ('WWS.view.filemanagement.File', {
    extend: 'Ext.Container',
    xtype: 'filemanagementfile',

    requires: [
        'WWS.view.filemanagement.FileController',
        'WWS.view.filemanagement.FileViewModel'
    ],
    controller: 'filemanagementfile',
    viewModel: {
        type: 'filemanagementfile'
    },

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: T.__('File Previewer'),
                showAnimation: {
                    type: 'slide',
                    direction: 'down'
                },
                hideAnimation: {
                    type: 'slideOut',
                    direction: 'up'
                },
                hidden: true,
                items: [
                    {
                        iconCls: 'x-fa fa-chevron-left',
                        handler: MGlb.common.goback
                    }
                ]
            },
            {
                xtype: 'component',
                itemId: 'detailHeader',
                cls: 'fm_path',
                showAnimation: {
                    type: 'slide',
                    direction: 'down'
                },
                hideAnimation: {
                    type: 'slideOut',
                    direction: 'up'
                },
                hidden: true,
                padding: '5 10',
                bind: {
                    html:   '<div><img src="{icon}" /> <b>{name}</b></div>' +
                            '<div class="noticeText" style="overflow: hidden">{showPath} | {showSize}</div>'
                }
            },
            {
                xtype: 'component',
                itemId: 'arrowCt',
                // cls: 'fm_path',
                style: 'text-align: center;',
                height: 16,
                margin: 0,
                padding: 0,
                showAnimation: {
                    type: 'slide',
                    direction: 'down'
                },
                hideAnimation: {
                    type: 'slideOut',
                    direction: 'up'
                },
                html: '<img src="' + Cake.image.path + '/arrow_down.png" onclick="FMF.showDetailTitle(\'filemanagementfile\')" />'
            },
            {
                xtype: 'container',
                itemId: 'fileCt',
                cls: 'iframeCtn',
                layout: 'fit',
                flex: 1
            },
            {
                xtype: 'component',
                itemId: 'detailFooter',
                cls: 'fm_path',
                padding: '5 10',
                showAnimation: {
                    type: 'slide',
                    direction: 'up'
                },
                hideAnimation: {
                    type: 'slideOut',
                    direction: 'down'
                },
                hidden: true,
                bind: {
                    html: '<div class="noticeText rightFloat">' + T.__('modified') + ': {displayModified}' + '</div>'
                }
            }
        ]
    },

    listeners: {
        activate: Glb.History.add
    }
});