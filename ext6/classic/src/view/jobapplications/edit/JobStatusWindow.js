/**
 * Created by benying.zou on 03.04.2018.
 */
Ext.define('WWS.view.jobapplications.edit.JobStatusWindow', {
    extend: 'WWS.ux.MusterFormWindow',
    xtype: 'jobapplicationseditjobstatuswindow',

    requires: [
        'WWS.view.jobapplications.edit.JobStatusWindowController',
        'WWS.view.jobapplications.edit.JobStatusWindowViewModel'
    ],
    controller: 'jobapplicationseditjobstatuswindow',
    viewModel: {
        type: 'jobapplicationseditjobstatuswindow'
    },

    input: {
        url: Cake.api.path + '/jobapplications/json/saveJobStatus'
    },

    config: {
        title: T.__("Attachment"),
        width: 500
    },

    configForm: function () {
        return {
            scrollable: true,
            defaults: {
                labelWidth: 80
            }
        };
    },

    buildFormItems: function () {
        return [
            {
                xtype: 'hiddenfield',
                name: 'job_id',
                bind: {
                    value: '{job_id}'
                }
            },
            {
                xtype: 'combobox',
                fieldLabel: T.__("Status"),
                name: 'status_id',
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                editable: false,
                triggerAction: 'all',
                emptyText: T.__("Please select a status"),
                allowBlank: false,
                width: '100%',
                bind: {
                    store: '{allStatusStore}',
                    value: '{statustype_id}'
                }
            },
            {
                xtype: 'textfield',
                name: 'notice',
                fieldLabel: T.__("Notice"),
                width: '100%',
                bind: {
                    value: '{notice}'
                }
            }
        ];
    },

    callbackFn: function () {}
});