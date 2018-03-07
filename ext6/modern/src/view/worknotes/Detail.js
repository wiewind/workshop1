/**
 * Created by benying.zou on 26.02.2018.
 */
Ext.define('WWS.view.worknotes.Detail', {
    extend: 'Ext.Panel',
    xtype: 'worknotesdetail',

    requires: [
        'WWS.view.worknotes.DetailController',
        'WWS.view.worknotes.DetailViewModel'
    ],
    controller: 'worknotesdetail',
    viewModel: {
        type: 'worknotesdetail'
    },

    config: {
        layout: 'vbox',
        showAnimation: 'pop',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: T.__('loading...'),
                showAnimation: 'fade',
                hideAnimation: 'fadeOut',
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
                padding: '5 10 0 10',
                showAnimation: 'fade',
                hideAnimation: 'fadeOut',
                hidden: true,
                bind: {
                    html: '<div><b>{title}</b></div><div class="noticeText">'+
                        T.__('Project')+': {getProjectName} | {displayDate}</div>'
                }
            },
            {
                xtype: 'component',
                itemId: 'arrowCt',
                cls: 'fm_path',
                style: 'text-align: center;',
                height: 16,
                margin: 0,
                padding: 0,
                showAnimation: 'fade',
                hideAnimation: 'fadeOut',
                html: '<img src="' + Cake.image.path + '/arrow_down.png" onclick="FMF.showDetailTitle(\'worknotesdetail\')" />'
            },
            {
                xtype: 'container',
                itemId: 'iframeCtn',
                cls: 'iframeCtn',
                layout: 'fit',
                flex: 1
            },
            {
                xtype: 'component',
                itemId: 'detailFooter',
                cls: 'fm_path',
                padding: '5 10',
                showAnimation: 'fade',
                hideAnimation: 'fadeOut',
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