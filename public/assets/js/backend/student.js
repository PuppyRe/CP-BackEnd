define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'student/index' + location.search,
                    add_url: 'student/add',
                    edit_url: 'student/edit',
                    del_url: 'student/del',
                    multi_url: 'student/multi',
                    import_url: 'student/import',
                    table: 'student',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'studentname', title: __('Studentname'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'collegelist', title: __('Collegelist'), searchList: {"北京大学":__('北京大学'),"清华大学":__('清华大学')}, formatter: Table.api.formatter.normal},
                        {field: 'majorlist', title: __('Majorlist'), searchList: {"生物":__('生物'),"物理":__('物理')}, formatter: Table.api.formatter.normal},
                        {field: 'class', title: __('Class'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'nickname', title: __('Nickname'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'mobile', title: __('Mobile'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'password', title: __('Password'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'user.id', title: __('User.id'),visible:false},
                        {field: 'user.group_id', title: __('User.group_id')},
                        {field: 'user.username', title: __('User.username'), operate: 'LIKE',visible:false},
                        {field: 'user.nickname', title: __('User.nickname'), operate: 'LIKE',visible:false},
                        {field: 'user.password', title: __('User.password'), operate: 'LIKE',visible:false},
                        {field: 'user.salt', title: __('User.salt'), operate: 'LIKE',visible:false},
                        {field: 'user.email', title: __('User.email'), operate: 'LIKE',visible:false},
                        {field: 'user.mobile', title: __('User.mobile'), operate: 'LIKE',visible:false},
                        {field: 'user.avatar', title: __('User.avatar'), operate: 'LIKE', events: Table.api.events.image, formatter: Table.api.formatter.image,visible:false},
                        {field: 'user.level', title: __('User.level'),visible:false},
                        {field: 'user.gender', title: __('User.gender'),visible:false},
                        {field: 'user.birthday', title: __('User.birthday'), operate:'RANGE', addclass:'datetimerange', autocomplete:false,visible:false},
                        {field: 'user.bio', title: __('User.bio'), operate: 'LIKE',visible:false},
                        {field: 'user.money', title: __('User.money'), operate:'BETWEEN',visible:false},
                        {field: 'user.score', title: __('User.score'),visible:false},
                        {field: 'user.successions', title: __('User.successions'),visible:false},
                        {field: 'user.maxsuccessions', title: __('User.maxsuccessions'),visible:false},
                        {field: 'user.prevtime', title: __('User.prevtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime,visible:false},
                        {field: 'user.logintime', title: __('User.logintime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime,visible:false},
                        {field: 'user.loginip', title: __('User.loginip'), operate: 'LIKE',visible:false},
                        {field: 'user.loginfailure', title: __('User.loginfailure'),visible:false},
                        {field: 'user.loginfailuretime', title: __('User.loginfailuretime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime,visible:false},
                        {field: 'user.joinip', title: __('User.joinip'), operate: 'LIKE',visible:false},
                        {field: 'user.jointime', title: __('User.jointime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime,visible:false},
                        {field: 'user.createtime', title: __('User.createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime,visible:false},
                        {field: 'user.updatetime', title: __('User.updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime,visible:false},
                        {field: 'user.token', title: __('User.token'), operate: 'LIKE',visible:false},
                        {field: 'user.status', title: __('User.status'), operate: 'LIKE', formatter: Table.api.formatter.status,visible:false},
                        {field: 'user.verification', title: __('User.verification'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content,visible:false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,visible:false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,visible:false},
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },

        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }

    };
    return Controller;
});
