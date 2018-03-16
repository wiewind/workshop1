/**
 * Created by benying.zou on 16.03.2018.
 */
Ext.define ('WWS.view.school.plan.TableCell', {
    extend: 'Ext.panel.Panel',
    xtype: 'schoolplantablecell',

    requires: [
        'WWS.view.school.plan.TableCellController',
        'WWS.view.school.plan.TableCellViewModel'
    ],
    controller: 'schoolplantablecell',
    viewModel: {
        type: 'schoolplantablecell'
    },

    config: {
        bind: {
            height: '{cellHeight}',
            style: {
                border: '{showBorder}'
            },
            bodyStyle: {
                backgroundColor: '{bgColor}'
            },
            html: '{displayCellContent}'
        },
        header: false,
        bodyPadding: 10,
        layout: 'fit',
        defaults: {
            width: '100%'
        }
    },

    initComponent: function () {
        var vm = this.getViewModel(),
            id = vm.get('id');
        if (id > 0) {
            Ext.apply(this, {
                itemId: 'planCell_' + id
            });
        }
        this.callParent();
    },

    listeners: {
        click: {
            element: 'el',
            fn: 'onClick'
        },
        dblclick: {
            element: 'el',
            fn: 'onDblClick'
        },
        mouseover: {
            element: 'el',
            fn: 'onMouseOver'
        },
        mouseout: {
            element: 'el',
            fn: 'onMouseOut'
        },

        contextmenu: {
            element: 'el',
            fn: 'onContextmenu'
        }
    }
});