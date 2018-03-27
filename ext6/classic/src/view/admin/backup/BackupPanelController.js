/**
 * Created by benying.zou on 22.03.2018.
 */
Ext.define ('WWS.view.admin.backup.BackupPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.adminbackuppanel',

    init: function () {
        this.loadBackups();
    },
    
    loadBackups: function () {
        var view = this.getView(),
            vm = this.getViewModel(); 
        
        Glb.Ajax({
            url: Cake.api.path + '/admin/json/getBackups/',
            waitMsg: T.__('loading...'),
            success: function (response, options) {
                var resp = Ext.decode(response.responseText);
                view.removeAll();
                if (resp.data.length > 0) {
                    var backups = [];
                    Ext.Array.forEach(resp.data, function (d) {
                        var dt = d['filename'].replace(/\./g, ':').replace('_', ' ');
                        dt = Glb.Date.displayDateFromString(dt, ' H:i:s');
                        var content = d['content'].split(','),
                            ct = '',
                            size_sum = 0;

                        Ext.Array.forEach(content, function (c) {
                            c = c.split(':');
                            var filename = (c[0]) ? c[0].trim() : '',
                                filesize = (c[1]) ? Number(c[1].trim()) : 0;
                            size_sum += filesize;
                            ct += '<tr><td>' + filename + '</td><td align="right">' + Ext.util.Format.fileSize(filesize) + '</td></tr>'
                        });

                        backups.push(
                            {
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        boxLabel: '<b>' + dt + '</b>',
                                        name: 'backname',
                                        inputValue: d['filename']
                                    },
                                    {
                                        xtype: 'component',
                                        margin: '5px 5px 5px 20px',
                                        html: '<table width="100%">' + ct + '<tr><td colspan="2"><hr /></td></tr><tr><td>' + T.__("Sum") + ':</td>'+
                                        '<td align="right"><b>' + Ext.util.Format.fileSize(size_sum) + '</b></td></tr></table>'
                                    }
                                ]
                            }

                        );
                    });
                    view.add(
                        {
                            xtype: 'component',
                            padding: 10,
                            region: 'north',
                            html: '<b>' + T.__("Previous Backups") + ':</b>'
                        },
                        {
                            xtype: 'checkboxgroup',
                            region: 'center',
                            layout: {
                                type: 'table',
                                columns: 2,
                                tableAttrs: {
                                    style: {
                                        width: '100%'
                                    }
                                },
                                tdAttrs: {
                                    style: {
                                        width: '50%'
                                    }
                                }
                            },
                            autoScroll: true,
                            defaults: {
                                xtype: 'container',
                                cls: 'x-backup-box',
                                padding: 10,
                                width: 400,
                                border: 1
                            },
                            items: backups
                        }
                    );
                } else {
                    view.add(
                        {
                            xtype: 'component',
                            region: 'center',
                            html: '<div style="margin-top:100px;text-align:center;font-size: 20px; font-weight: bold; color: gray;">' + T.__("No Backups") + '</div>'
                        }
                    );
                }
            }
        });
    },
    
    onClickStart: function () {
        var me = this;
        ABox.confirm(
            T.__("Are you sure you want to start to backup?"),
            function () {
                Glb.Ajax({
                    url: Cake.api.path + '/admin/json/backup/',
                    timeout: 600000,
                    params: {
                        project: 'all'
                    },
                    waitMsg: T.__('Please wait...'),
                    success: function (response, options) {
                        ABox.success(T.__("Backup success."));
                        me.loadBackups();
                    }
                });
            }
        );
    },

    onClickDelete: function () {
        var me = this,
            view = this.getView(),
            selected = view.getValues().backname;
        if (!selected) {
            ABox.warning(T.__("Please select a backup!"));
            return;
        }

        if (Array.isArray(selected)) {
            selected = selected.join(',');
        }
        Ext.Msg.confirm(
            T.__("Delete"),
            T.__("Are you sure you want to detete the backup?"),
            function () {
                Glb.Ajax({
                    url: Cake.api.path + '/admin/json/deleteBackup/',
                    params: {
                        backups: selected
                    },
                    waitMsg: T.__('Please wait...'),
                    success: function (response, options) {
                        ABox.success(T.__("Backup deleted."));
                        me.loadBackups();
                    }
                });
            }
        );
    },

    onClickRefresh: function () {
        this.loadBackups();
    }

});
