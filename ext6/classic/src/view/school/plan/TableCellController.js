/**
 * Created by benying.zou on 16.03.2018.
 */
Ext.define('WWS.view.school.plan.TableCellController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.schoolplantablecell',

    onClick: function () {
        var vm = this.getViewModel();
        if (vm.get('id') > 0) {
            vm.setData({
                bgColorChangable: !vm.get('bgColorChangable')
            });
        }
    },

    onDblClick: function () {
        var vm = this.getViewModel(),
            plan_id = vm.get('id');
        if (plan_id > 0) {
            SCF.openEditPlanWindow(plan_id);
        }
    },

    onMouseOver: function () {
        var vm = this.getViewModel();
        if (vm.get('id') > 0) {
            this.getView().setBodyStyle({
                'background-color': vm.get('selBgColor')
            });
        }
    },

    onMouseOut: function () {
        var vm = this.getViewModel();
        if (!vm.get('bgColorChangable')) return;

        if (vm.get('id') > 0) {
            var now = new Date(),
                time = now.getHours() + ':'+now.getMinutes(),
                weekday = now.getDay(),
                color = vm.get('cellBgColor');

            if (Number(vm.get('weekday')) === Number(weekday)) {
                var cur = new Date("2000-01-01 " + time).getTime(),
                    start = new Date("2000-01-01 " + this.data.coursetime.start).getTime(),
                    end = new Date("2000-01-01 " + this.data.coursetime.end).getTime();

                if (start <= cur && cur <= end) {
                    color = vm.get('curBgColor');
                }
            }
            this.getView().setBodyStyle({
                'background-color': color
            });
        }
    },

    onContextmenu: function (e, me) {
        e.preventDefault();
        e.stopEvent();
        var me = this,
            vm = this.getViewModel(),
            plan_id = vm.get('id'),
            menus = [];

        if (plan_id > 0) {
            menus = [
                {
                    text: Glb.btnSetting.editText,
                    tooltip: Glb.btnSetting.editText,
                    iconCls: Glb.btnSetting.editIconCls,
                    handler: function () {
                        me.onClickEdit()
                    }
                },
                {
                    text: Glb.btnSetting.deleteText,
                    tooltip: Glb.btnSetting.deleteText,
                    iconCls: Glb.btnSetting.deleteIconCls2,
                    handler: function () {
                        me.onClickDelete();
                    }
                },
                '-',
                {
                    text: Glb.btnSetting.refreshText,
                    tooltip: Glb.btnSetting.refreshText,
                    iconCls: Glb.btnSetting.refreshIconCls,
                    handler: function () {
                        me.onClickRefresh();
                    }
                }
            ];
        } else {
            menus = [
                {
                    text: Glb.btnSetting.newText,
                    tooltip: Glb.btnSetting.newText,
                    iconCls: Glb.btnSetting.newIconCls,
                    handler: function () {
                        SCF.openEditPlanWindow({
                            id: 0,
                            start: vm.get('start'),
                            end: vm.get('end'),
                            weekday: vm.get('weekday')
                        })
                    }
                }
            ]
        }

        var nodemenu = Ext.create('Ext.menu.Menu', {
            floating: true,
            items: menus
        });
        nodemenu.showAt(e.getXY());
    },

    onClickEdit: function () {
        var view = this.getView(),
            vm = this.getViewModel();
        vm.setData({
            bgColorChangable: false
        });
        SCF.openEditPlanWindow(vm.get('SchoolPlan.id'));
    },

    onClickDelete: function () {
        var vm = this.getViewModel();
        ABox.confirm(
            T.__('Are you sure you want to delete the plan?'),
            function () {
                Glb.Ajax({
                    url: Cake.api.path + '/school/json/deletePlan',
                    params: {
                        id: vm.get('id')
                    },
                    success: function(response){
                        ABox.success(T.__("Plan is deleted!"));
                        SCF.tableRefresh();
                    }
                });
            }
        );
    },

    onClickRefresh: function () {
        var vm = this.getViewModel();
        Glb.Ajax({
            url: Cake.api.path + '/school/json/loadPlan',
            params: {
                plan_id: vm.get('id')
            },
            success: function (response, options) {
                var resp = Ext.decode(response.responseText);
                vm.setData(resp.data);
            }
        });
    }
});