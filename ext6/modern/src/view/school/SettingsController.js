/**
 * Created by benying.zou on 20.03.2018.
 */
Ext.define('WWS.view.school.SettingsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.schoolsettings',

    onSemesterSelect: function (field, rec) {
        var view = this.getView(),
            period = view.down('component[itemId="period"]');
        period.setHtml(rec.get('period'));
    },

    onClickSubmit: function () {
        var schoolpanel = Ext.ComponentQuery.query('schoolpanel')[0],
            plansCtr = schoolpanel.down('[itemId="plansCtr"]'),
            schoolplans = plansCtr.down('schoolplans'),
            childrenlist = schoolpanel.down('schoolchildrenlist'),
            view = this.getView(),
            classSF = view.down('selectfield[name="class"]'),
            semesterSF = view.down('selectfield[name="semester"]');

        schoolpanel.getViewModel().setData({
            class: classSF.getSelection().getData(),
            semester: semesterSF.getSelection().getData()
        });
        schoolplans.getController().drawPanel();
        schoolpanel.setActiveItem(plansCtr);

        childrenlist.getStore().reload();
    },

    onClickReset: function () {
        var view = this.getView(),
            classSF = view.down('selectfield[name="class"]'),
            semesterSF = view.down('selectfield[name="semester"]');
        Glb.Ajax({
            url: Cake.api.path + '/school/json/getDefaultData',
            success: function(response){
                var res = Ext.decode(response.responseText);

                classSF.setValue(res.data.SchoolClass.id);
                semesterSF.setValue(res.data.SchoolSemester.id);
            }
        });
    }
});