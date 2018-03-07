/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define ('WWS.view.school.SchoolPanel', {
    extend: 'Ext.tab.Panel',

    config: {
        title: T.__("School Timetable"),
        icon: Cake.image.path + '/board/school16.png',
        layout: 'border',
        closable: true
    },

    tbar: [
        {
            xtype: 'triggerfield',
            name: 'class_name',
            fieldLabel: T.__("Class"),
            labelWidth: 70,
            emptyText : T.__("Unknown"),
            editable: false,
            onTriggerClick: 'onClickClass'
        },
        {
            xtype: 'combobox',
            name: 'semester_id',
            fieldLabel: T.__("Semester"),
            labelWidth: 70,
            store: Ext.create('APP.AppJsonStore', {
                model: 'APP.school.SemesterModel',
                autoLoad: true,
                proxy: {
                    url: 'school/getSemesters'
                }
            }),
            displayField: 'name',
            valueField: 'id',
            queryMode: 'local',
            editable: false,
            triggerAction: 'all',
            emptyText: T.__("Please select a semester"),
            margin: '0 0 0 50',
            listeners: {
                change: 'onSelectSemester'
            }
        },
        {
            xtype: 'label',
            name: 'semester_date',
            margin: '0 0 0 20'
        }
    ],

    initComponent: function () {
        var me = this;

        SchoolConfig.class = [];

        me.callParent();

        // APP.AjaxRequest({
        //     method: 'POST',
        //     url: 'school/getDefaultData',
        //     success: function(response){
        //         var res = Ext.decode(response.responseText);
        //         if (Ext.isEmpty(res.data.SchoolClass)) {
        //             Ext.Msg.show({
        //                 title: '<?= __("Info") ?>',
        //                 msg: '<?= __("Your have not class, please add a new class into system.") ?>',
        //                 buttons: Ext.Msg.OK,
        //                 icon: Ext.Msg.WARNING,
        //                 fn: function () {
        //                     SchoolFn.openClassWindow(0, function (data) {
        //                         SchoolFn.setDefaultClass(data.id, function () {
        //                             me.updateConfig(data, res.data.SchoolSemester);
        //                         });
        //                     });
        //                 }
        //             });
        //             return;
        //         }
        //         me.updateConfig(res.data.SchoolClass, res.data.SchoolSemester, true);
        //     }
        // });
    }
});