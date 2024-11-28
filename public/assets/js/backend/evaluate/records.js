define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'evaluate/records/index' + location.search,
                    add_url: 'evaluate/records/add',
                    edit_url: 'evaluate/records/edit',
                    del_url: 'evaluate/records/del',
                    multi_url: 'evaluate/records/multi',
                    import_url: 'evaluate/records/import',
                    table: 'evaluate_records',
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
                        {field: 'user_id', title: __('User_id')},
                        {field: 'results', title: __('Results')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'details.id', title: __('Details.id')},
                        // {field: 'details.createtime', title: __('Details.createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        // {field: 'details.updatetime', title: __('Details.updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        // {field: 'details.starttime', title: __('Details.starttime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        // {field: 'details.endtime', title: __('Details.endtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        // {field: 'log.id', title: __('Log.id')},
                        // {field: 'log.admin_id', title: __('Log.admin_id')},
                        // {field: 'log.username', title: __('Log.username'), operate: 'LIKE'},
                        // {field: 'log.url', title: __('Log.url'), operate: 'LIKE', formatter: Table.api.formatter.url},
                        // {field: 'log.title', title: __('Log.title'), operate: 'LIKE'},
                        // {field: 'log.content', title: __('Log.content')},
                        // {field: 'log.ip', title: __('Log.ip'), operate: 'LIKE'},
                        // {field: 'log.useragent', title: __('Log.useragent'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        // {field: 'log.createtime', title: __('Log.createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
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
