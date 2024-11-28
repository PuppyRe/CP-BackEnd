define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'answers/index' + location.search,
                    add_url: 'answers/add',
                    edit_url: 'answers/edit',
                    del_url: 'answers/del',
                    multi_url: 'answers/multi',
                    import_url: 'answers/import',
                    table: 'answers',
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
                        {field: 'question_id', title: __('Question_id')},
                        {field: 'isteacher', title: __('Isteacher')},
                        {field: 'solver_id', title: __('Solver_id')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'reason', title: __('Reason'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'status', title: __('Status'), searchList: {"audit":__('Status audit'),"normal":__('Status normal'),"hidden":__('Status hidden')}, formatter: Table.api.formatter.status},
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
                        {field: 'question.id', title: __('Question.id')},
                        {field: 'question.title', title: __('Question.title'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'question.major_id', title: __('Question.major_id')},
                        {field: 'question.ispublic', title: __('Question.ispublic')},
                        {field: 'question.user_id', title: __('Question.user_id')},
                        {field: 'question.createtime', title: __('Question.createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'question.updatetime', title: __('Question.updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'question.reason', title: __('Question.reason'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'question.status', title: __('Question.status'), formatter: Table.api.formatter.status},
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
