define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'advertises/index' + location.search,
                    add_url: 'advertises/add',
                    edit_url: 'advertises/edit',
                    del_url: 'advertises/del',
                    multi_url: 'advertises/multi',
                    import_url: 'advertises/import',
                    table: 'advertises',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'adimage', title: __('Adimage'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'url', title: __('Url'), operate: 'LIKE', formatter: Table.api.formatter.url},
                        // {field: 'weigh', title: __('Weigh'), operate: false, visible: false},
                        {field: 'status', title: __('Status'), searchList: {"normal":__('Status normal'),"hidden":__('Status hidden')}, formatter: Table.api.formatter.status},
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
