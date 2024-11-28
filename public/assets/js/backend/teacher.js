define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'teacher/index' + location.search,
                    add_url: 'teacher/add',
                    edit_url: 'teacher/edit',
                    del_url: 'teacher/del',
                    multi_url: 'teacher/multi',
                    import_url: 'teacher/import',
                    table: 'teacher',
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
                        {field: 'admin_id', title: __('Admin_id')},
                        {field: 'age', title: __('Age')},
                        {field: 'name', title: __('Name'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'gender', title: __('Gender'), searchList: {"0":__('Gender 0'),"1":__('Gender 1')}, formatter: Table.api.formatter.normal},
                        {field: 'levellist', title: __('Levellist'), searchList: {"助教":__('助教'),"讲师":__('讲师'),"副教授":__('副教授'),"教授":__('教授')}, formatter: Table.api.formatter.normal},
                        {field: 'major_ids', title: __('Major_ids'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'status', title: __('Status'), searchList: {"normal":__('Status normal'),"hidden":__('Status hidden')}, formatter: Table.api.formatter.status},
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
            // 被联动的输入框（c-major_ids）获取数据（c-college_id）
            $("#c-major_ids").data("params", function() {
                // 要提交什么数据给后台查询（data-url）
                return {custom: $("#c-college_id").val() };
            });
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
