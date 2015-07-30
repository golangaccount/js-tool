/// <reference path="../quoteProject/jquery.js" />
function ListBox(dom, option) {
    if (!dom)//不包含参数时直接返回
        return;
    this.Setting = $.extend({}, this.DefaultSetting(), option);
    this.Root = dom;
    this.Ul = null;
}

/**
 * 用于创建系统的默认设置
 */
ListBox.prototype.DefaultSetting = function () {
    return {
        Data: [],//数据
        Format: function () { },//item格式化
        AfterInitItem: null,//item格式化后执行的事件
        AfterInit: null//listbox init后执行的事件
    }
}
ListBox.prototype.Init = function () {
    var self = this;
    this.Ul = $("<ul></ul>");
    $(this.Root).append(this.Ul);
    for (var i = 0; i < this.Setting.Data.length; i++) {
        this.InitItem(this.Setting.Data[i]);
    }
    if (typeof this.Setting.AfterInit == "function") {
        this.Setting.AfterInit.call(this);
    }
}
ListBox.prototype.InitItem = function (data) {
    var self = this;
    var li = $("<li></li>");
    data.ListBoxItem = li;
    $(li).append($(this.Setting.Format(data)));
    this.Ul.append(li);
    if (typeof this.Setting.AfterInitItem == "function") {
        this.Setting.AfterInitItem.call(this, data);
    }
    return data;
}
ListBox.prototype.AddItem = function (data) {
    var self = this;
    if (this.Setting.Data.indexOf(data) != -1)
        return;

    this.Setting.Data.push(data);
    $(this.Ul).append($(this.InitItem(data).ListBoxItem));
    return data;
}
ListBox.prototype.RemoveItem = function (value) {
    this.Setting.Data.splice(this.Setting.Data.indexOf(value), 1);
    $(value.ListBoxItem).remove();
    delete value.ListBoxItem;
}
ListBox.prototype.Sort = function (func) {
    this.Setting.Data.sort(func);
    for (var i = 0; i < this.Setting.Data.length; i++) {
        this.Setting.Data[i].ListBoxItem.detach();
        this.Ul.prepend(this.Setting.Data[i].ListBoxItem);
    }
}
ListBox.prototype.Destroy = function () {
    this.Ul.empty();
    this.Ul.remove();
    for (var i = 0; i < this.Setting.Data.length; i++) {
        delete this.Setting.Data[i].ListBoxItem
    }
}