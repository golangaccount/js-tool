/// <reference path="listbox.js" />
function Menu(dom,option) {
    this.Root = dom;
    this.Setting = $.extend({}, this.DefaultSetting(), option);
}

Menu.prototype.DefaultSetting = function () {
    return {
        Data: [],
        Format: function () { },
    }
}

Menu.prototype.Init = function () {
    var self = this;
    self.ListBox = this.InitNode(this.Root, this.Setting.Data);
}
Menu.prototype.InitNode = function (dom, arr) {
    var self = this;
    var listbox = new ListBox(dom, {
        Data: arr,
        Format: this.Setting.Format,
        AfterInitItem: function (value) {
            value.ListBox = self.InitNode(value.ListBoxItem, value.Children);
        }
    })
    listbox.Init();
    return listbox;
}
