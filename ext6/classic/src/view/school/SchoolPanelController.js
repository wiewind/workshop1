/**
 * Created by benying.zou on 07.03.2018.
 */
Ext.define('WWS.view.school.SchoolPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.schoolpanel',
    
    init: function () {
        var vm = this.getViewModel();
        Glb.Ajax({
            url: Cake.api.path + '/school/json/getDefaultData',
            success: function(response){
                var res = Ext.decode(response.responseText);
                if (Ext.isEmpty(res.data.SchoolClass)) {
                    ABox.warning(
                        T.__("Your have not class, please add a new class into system."),
                        function () {
                            // SchoolFn.openClassWindow(0, function (data) {
                            //     SchoolFn.setDefaultClass(data.id, function () {
                            //         me.updateConfig(data, res.data.SchoolSemester);
                            //     });
                            // });
                        }
                    );
                    return;
                }
                vm.setData({
                    class: res.data.SchoolClass,
                    semester: res.data.SchoolSemester
                });
            }
        });
    },

    onClickClass: function () {
        console.log('onClickClass');
    },

    onSelectSemester: function (combo, record) {
        RR = record;
        VM = this.getViewModel();
        this.getViewModel().setData({
            semester: record.getData()
        });
    }
});
