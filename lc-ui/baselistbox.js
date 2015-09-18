/// <reference path="../quoteProject/jquery.js" />
function BaseListBox(dom, option) {
    if (!dom)//不包含参数时直接返回
        return;
    this.Setting = $.extend({}, this.DefaultSetting(), option);
    this.Root = dom;
    this.Ul = null;
}

/**
 * 用于创建系统的默认设置
 */
BaseListBox.prototype.DefaultSetting = function () {
    return {
        Prefix: "lc_",
        RootType: "ul",//控件根节点类型
        ListItemType: "li",//控件item类型
        RootClass: "",//根节点类
        ListItemClass: "",//item类
        AfterInit: null,
        AfterInitItem: null,
        SortFunction: null,
        Data: [],
        Format: function () { }
    }
}
BaseListBox.prototype.Init = function () {
    var self = this;
    this.Ul = $(document.createElement(this.Setting.RootType));
    this.Ul.addClass(this.Setting.RootClass);
    $(this.Root).append(this.Ul);
    for (var i = 0; i < this.Setting.Data.length; i++) {
        this.InitItem(this.Setting.Data[i]);
    }
    if (typeof this.Setting.AfterInit == "function") {
        this.Setting.AfterInit.call(this);
    }
}
BaseListBox.prototype.InitItem = function (data) {
    var self = this;
    var li = $(document.createElement(this.Setting.ListItemType));
    li.addClass(this.Setting.ListItemClass);
    data.ListBoxItem = li;
    var format = this.Setting.Format.call(this, data);
    if (format)
        $(li).append($(format));
    this.Ul.append(li);
    if (typeof this.Setting.AfterInitItem == "function") {
        this.Setting.AfterInitItem.call(this, data);
    }
    return data;
}
BaseListBox.prototype.AddItem = function (data) {
    var self = this;
    if (this.Setting.Data.indexOf(data) != -1)
        return data;
    this.Setting.Data.push(data);
    $(this.Ul).append($(this.InitItem(data).ListBoxItem));
    return data;
}
BaseListBox.prototype.RemoveItem = function (value) {
    this.Setting.Data.splice(this.Setting.Data.indexOf(value), 1);
    if (value.ListBoxItem)
        $(value.ListBoxItem).remove();
    delete value.ListBoxItem;
}
BaseListBox.prototype.Sort = function (func) {
    this.Setting.SortFunction = func || this.Setting.SortFunction;
    this.Setting.Data.sort(func);
    for (var i = 0; i < this.Setting.Data.length; i++) {
        this.Setting.Data[i].ListBoxItem.detach();
        this.Ul.prepend(this.Setting.Data[i].ListBoxItem);
    }
}
BaseListBox.prototype.Destroy = function () {
    this.Ul.empty();
    this.Ul.remove();
    for (var i = 0; i < this.Setting.Data.length; i++) {
        delete this.Setting.Data[i].ListBoxItem
    }
}
BaseListBox.prototype.Show = function () {
    this.Ul.show();
}
BaseListBox.prototype.Hide = function () {
    this.Ul.hide();
}
BaseListBox.prototype.ShowAllItem = function () {
    this.Ul.children().show();
}
BaseListBox.prototype.HideAllItem = function () {
    this.Ul.children().hide();
}