/*
 * Copyright 2015 - 2017 Anton Tananaev (anton@traccar.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Traccar.view.dialog.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    requires: [
        'Traccar.view.dialog.Register'
    ],

    init: function () {
        this.lookupReference('registerButton').setDisabled(
            !Traccar.app.getServer().get('registration'));
        this.lookupReference('languageField').setValue(Locale.language);
    },

    login: function () {
        var form = this.lookupReference('form');
        if (form.isValid()) {
            Ext.get('spinner').setVisible(true);
            this.getView().setVisible(false);
            Ext.Ajax.request({
                scope: this,
                method: 'POST',
                url: 'api/session',
                params: form.getValues(),
                callback: function (options, success, response) {
                    var user, password;
                    Ext.get('spinner').setVisible(false);
                    if (success) {
                        if (this.lookupReference('rememberField').getValue()) {
                            user = Ext.util.Base64.encode(this.lookupReference('userField').getValue());
                            password = Ext.util.Base64.encode(this.lookupReference('passwordField').getValue());
                            Ext.util.Cookies.set('user', user, Ext.Date.add(new Date(), Ext.Date.YEAR, 1));
                            Ext.util.Cookies.set('password', password, Ext.Date.add(new Date(), Ext.Date.YEAR, 1));
                        }
                        var data = Ext.decode(response.responseText);
                        Traccar.app.setUser(data);
                        this.saveUserId(data.id);
                        this.saveToken(data.token);
                        this.fireViewEvent('login');
                    } else {
                        this.getView().setVisible(true);
                        if (response.status === 401) {
                            Traccar.app.showError(Strings.loginFailed);
                        } else {
                            Traccar.app.showError(response.responseText);
                        }
                    }
                }
            });
        }
    },

    saveToken: function (token) {
        localStorage.setItem('user-token', token);
    },

    saveUserId: function (id) {
        localStorage.setItem('user-id', id);
    },

    clearToken: function () {
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-id');
    },

    logout: function () {
        Ext.util.Cookies.clear('user');
        Ext.util.Cookies.clear('password');
        Ext.Ajax.request({
            scope: this,
            method: 'DELETE',
            url: 'api/session',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('user-token'),
            },
            callback: function () {
                this.clearToken();
                window.location.reload();
            }
        });
    },

    onSelectLanguage: function (selected) {
        var paramName, paramValue, url, prefix, suffix;
        paramName = 'locale';
        paramValue = selected.getValue();
        url = window.location.href;
        if (url.indexOf(paramName + '=') >= 0) {
            prefix = url.substring(0, url.indexOf(paramName));
            suffix = url.substring(url.indexOf(paramName));
            suffix = suffix.substring(suffix.indexOf('=') + 1);
            suffix = suffix.indexOf('&') >= 0 ? suffix.substring(suffix.indexOf('&')) : '';
            url = prefix + paramName + '=' + paramValue + suffix;
        } else if (url.indexOf('?') < 0) {
            url += '?' + paramName + '=' + paramValue;
        } else {
            url += '&' + paramName + '=' + paramValue;
        }
        window.location.href = url;
    },

    onAfterRender: function (field) {
        field.focus();
    },

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.login();
        }
    },

    onLoginClick: function () {
        Ext.getElementById('submitButton').click();
        this.login();
    },

    onRegisterClick: function () {
        Ext.create('Traccar.view.dialog.Register').show();
    }
});
