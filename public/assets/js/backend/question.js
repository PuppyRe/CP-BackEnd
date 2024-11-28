define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'question/index' + location.search,
                    add_url: 'question/add',
                    edit_url: 'question/edit',
                    del_url: 'question/del',
                    multi_url: 'question/multi',
                    import_url: 'question/import',
                    table: 'question',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                fixedColumns: true,
                fixedRightNumber: 1,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'title', title: __('Title'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'major_id', title: __('Major_id')},
                        {field: 'ispublic', title: __('Ispublic')},
                        {field: 'user_id', title: __('User_id')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'reason', title: __('Reason'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'status', title: __('Status'), searchList: {"audit":__('Status audit'),"normal":__('Status normal'),"solve":__('Status solve'),"hidden":__('Status hidden')}, formatter: Table.api.formatter.status},
                        {field: 'admin.id', title: __('Admin.id')},
                        {field: 'admin.username', title: __('Admin.username'), operate: 'LIKE'},
                        {field: 'admin.nickname', title: __('Admin.nickname'), operate: 'LIKE'},
                        {field: 'admin.password', title: __('Admin.password'), operate: 'LIKE'},
                        {field: 'admin.salt', title: __('Admin.salt'), operate: 'LIKE'},
                        {field: 'admin.avatar', title: __('Admin.avatar'), operate: 'LIKE', events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'admin.email', title: __('Admin.email'), operate: 'LIKE'},
                        {field: 'admin.mobile', title: __('Admin.mobile'), operate: 'LIKE'},
                        {field: 'admin.loginfailure', title: __('Admin.loginfailure')},
                        {field: 'admin.logintime', title: __('Admin.logintime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'admin.loginip', title: __('Admin.loginip'), operate: 'LIKE'},
                        {field: 'admin.createtime', title: __('Admin.createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'admin.updatetime', title: __('Admin.updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'admin.token', title: __('Admin.token'), operate: 'LIKE'},
                        {field: 'admin.status', title: __('Admin.status'), operate: 'LIKE', formatter: Table.api.formatter.status},
                        {field: 'majors.id', title: __('Majors.id')},
                        {field: 'majors.college_id', title: __('Majors.college_id')},
                        {field: 'majors.name', title: __('Majors.name'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'majors.createtime', title: __('Majors.createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'majors.deletetime', title: __('Majors.deletetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
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
