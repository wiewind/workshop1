/**
 * Created by benying.zou on 19.03.2018.
 */

Ext.define ('WWS.view.school.Cell', {
    extend: 'Ext.Panel',
    xtype: 'schoolcell',

    requires: [
        // 'WWS.view.school.plan.TableCellController',
        'WWS.view.school.CellViewModel'
    ],
    // controller: 'schoolcell',
    viewModel: {
        type: 'schoolcell'
    },

    config: {
        bind: {
            height: '{cellHeight}',
            style: {
                backgroundColor: '{columnBgColor}'
            },
            bodyStyle: {
                margin: '2px',
                backgroundColor: '{bgColor}'
            },
            html: '{displayCellContent}'
        }
    }
});