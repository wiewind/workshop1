/**
 * Created by benying.zou on 12.02.2018.
 */
Ext.define ('WWS.view.addressbook.DetailController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.addressbookdetail',

    setData: function (person_id) {
        var me = this,
            view = this.getView(),
            vm = this.getViewModel();
        person_id = person_id || false;
        if (!person_id) {
            person_id = vm.get('id');
        }
        if (person_id > 0) {
            Glb.Ajax({
                url: Cake.api.path + '/addressbook/json/getPerson',
                params: {
                    person_id: person_id,
                    withRecords: true
                },
                success: function (response, options) {
                    var data = Ext.decode(response.responseText).data;
                    vm.setData(data);
                    me.buildHtml(data);
                },
                failure: function () {
                    ABox.error(T.__('The person does not exist.'));
                    view.close();
                }
            });
        }
    },

    buildHtml: function (data) {
        var view = this.getView(),
            cmp = view.down('component[itemId="displayBox"]'),
            text = '',
            telephone = '',
            email = '',
            address = '';

        if (!Wiewind.isEmpty(data['telephone'])) {
            for (var i=0; i<data['telephone'].length; i++) {
                var rec = data['telephone'][i]['AddressbookTelephone'];
                telephone += '<div class="wws-li2"><div class="wws-li2-lb">';
                if (rec['title']) {
                    telephone += rec['title'] + ': ';
                }
                telephone += '</div><a class="wws-li2-v" href="tel:' + rec['number'] + '">' + rec['number'] + '</a></div>';
            }
        }
        if (!Wiewind.isEmpty(data['email'])) {
            for (var i=0; i<data['email'].length; i++) {
                var rec = data['email'][i]['AddressbookEmail'];
                email += '<div class="wws-li2"><div class="wws-li2-lb">';
                if (rec['title']) {
                    email += rec['title'] + ': ';
                }
                email += '</div><a class="wws-li2-v" href="mailto:' + rec['number'] + '">' + rec['email'] + '</a></div>';
            }
        }
        if (!Wiewind.isEmpty(data['address'])) {
            for (var i=0; i<data['address'].length; i++) {
                var rec = data['address'][i]['AddressbookAddress'];
                address += '<div class="wws-li2"><div class="wws-li2-lb">';
                if (rec['title']) {
                    address += rec['title'] + ': ';
                }
                address += '</div><div class="wws-li2-v">' + Wiewind.String.nl2br(rec['address']) + '</div></div>';
            }
        }

        text =
            '<div class="wws-li">' +
                '<div class="wws-li-lb">' + T.__('Name of Person') + ':</div>' +
                '<div class="wws-li-v">' + this.showPersonName(data) + '</div>' +
            '</div>' +
            '<div class="wws-li">' +
                '<div class="wws-li-lb">' + T.__('Other Name') + ':</div>' +
                '<div class="wws-li-v">' + this.showPersonName2(data) + '</div>' +
            '</div>' +
            '<div class="wws-li">' +
                '<div class="wws-li-lb">' + T.__('Company') + ':</div>' +
                '<div class="wws-li-v">' + this.showCompany(data) + '</div>' +
            '</div>' +
            '<div class="wws-li">' +
                '<div class="wws-li-lb">' + T.__('Telephone') + ':</div>' +
                '<div class="wws-li-v">' + telephone + '</div>' +
            '</div>' +
            '<div class="wws-li">' +
                '<div class="wws-li-lb">' + T.__('Email') + ':</div>' +
                '<div class="wws-li-v">' + email + '</div>' +
            '</div>' +
            '<div class="wws-li">' +
                '<div class="wws-li-lb">' + T.__('Address') + ':</div>' +
                '<div class="wws-li-v">' + address + '</div>' +
            '</div>' +
            '<div class="wws-li">' +
                '<div class="wws-li-lb">' + T.__('Birthday') + ':</div>' +
                '<div class="wws-li-v">' + this.showBirthday(data) + '</div>' +
            '</div>' +
            '<div class="wws-li">' +
                '<div class="wws-li-lb">' + T.__('Notice') + ':</div>' +
                '<div class="wws-li-v">' + this.showNotice(data) + '</div>' +
            '</div>';

        cmp.setHtml(text);
    },

    showPersonName: function (data) {
        return (data['id'] > 0 && data['name']) ? data['name'] : T.__('Unknown')
    },
    showPersonName2: function (data) {
        return (data['id'] > 0 && data['name2']) ? data['name2'] : T.__('Unknown')
    },
    showBirthday: function (data) {
        return (data['id'] > 0 && data['birthday'] > 0) ? Glb.Date.displayDateFromString(data['birthday']) : T.__('Unknown')
    },
    showCompany: function (data) {
        return (data['id'] > 0 && data['company']) ? data['company'] : T.__('Unknown')
    },
    showNotice: function (data) {
        return (data['id'] > 0 && data['notice']) ? Wiewind.String.nl2br(data['notice']) : T.__('Empty')
    }
});