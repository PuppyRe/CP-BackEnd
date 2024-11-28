define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'evaluate/results/index' + location.search,
                    add_url: 'evaluate/results/add',
                    edit_url: 'evaluate/results/edit',
                    del_url: 'evaluate/results/del',
                    multi_url: 'evaluate/results/multi',
                    import_url: 'evaluate/results/import',
                    table: 'evaluate_results',
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
                        {field: 'evaluate_id', title: __('Evaluate_id')},
                        {field: 'teacher_id', title: __('Teacher_id')},
                        {field: 'score', title: __('Score'), operate:'BETWEEN'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        // {field: 'teacher.admin_id', title: __('Teacher.admin_id')},
                        // {field: 'teacher.age', title: __('Teacher.age')},
                        // {field: 'teacher.name', title: __('Teacher.name'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        // {field: 'teacher.gender', title: __('Teacher.gender')},
                        // {field: 'teacher.levellist', title: __('Teacher.levellist')},
                        // {field: 'teacher.major_ids', title: __('Teacher.major_ids'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        // {field: 'teacher.status', title: __('Teacher.status'), operate: 'LIKE', formatter: Table.api.formatter.status},
                        // {field: 'details.id', title: __('Details.id')},
                        // {field: 'details.createtime', title: __('Details.createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        // {field: 'details.updatetime', title: __('Details.updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        // {field: 'details.starttime', title: __('Details.starttime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        // {field: 'details.endtime', title: __('Details.endtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        // {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
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
