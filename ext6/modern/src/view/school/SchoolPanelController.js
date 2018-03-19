/**
 * Created by benying.zou on 19.03.2018.
 */
Ext.define('WWS.view.school.SchoolPanelController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.schoolpanel',

    init: function () {
        var view = this.getView(),
            vm = this.getViewModel();
        Glb.Ajax({
            url: Cake.api.path + '/school/json/getDefaultData',
            success: function(response){
                var res = Ext.decode(response.responseText);
                if (Ext.isEmpty(res.data.SchoolClass)) {
                    ABox.warning(
                        T.__("Your have not class, please add a new class into system.")
                    );
                    return;
                }
                if (Ext.isEmpty(res.data.SchoolSemester)) {
                    ABox.warning(
                        T.__("Your have not semester, please add a new semester into system.")
                    );
                    return;
                }
                vm.setData({
                    class: res.data.SchoolClass,
                    semester: res.data.SchoolSemester
                });
                view.add([
                    {
                        xtype: 'schoolplans',
                        viewModel: {
                            parent: vm
                        }
                    // },
                    // {
                    //     xtype: 'schoolchildren',
                    //     viewModel: {
                    //         parent: vm
                    //     }
                    }
                ]);
            }
        });
    }
});