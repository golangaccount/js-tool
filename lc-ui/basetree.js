/// <reference path="listbox.js" />
function BaseTree(dom, option) {
    this.Root = dom;
    this.Setting = $.extend({}, this.DefaultSetting(), option);
}
BaseTree.prototype.DefaultSetting = function () {
    var setting = BaseListBox.prototype.DefaultSetting();
    setting.ChildrenName = "Children";
    return setting;
}
BaseTree.prototype.Init = function () {
    var self = this;
    self.ListBox = this.InitNode(this.Root, this.Setting.Data);
    if (typeof self.Setting.AfterInit=="function")
        self.Setting.AfterInit.call(self);
}
BaseTree.prototype.InitNode = function (dom, arr) {
    var self = this;
    var setting = $.extend({},this.Setting);
    setting.Data = arr;
    setting.AfterInitItem = function (value) {
        if (value[self.Setting.ChildrenName])
        {
            value.ListBox = self.InitNode(value.ListBoxItem, value[self.Setting.ChildrenName]);
            value.ListBox.Hide();
        }
            
        if (self.Setting.AfterInitItem)
            self.Setting.AfterInitItem.call(self, value);
    }
    var listbox = new BaseListBox(dom, setting);
    listbox.Init();
    return listbox;
}
BaseTree.prototype.HideNode = function (data) {
    data.IsExtend = false;
    data.ListBox.Hide();
}
BaseTree.prototype.ShowNode = function (data) {
    data.IsExtend = true;
    data.ListBox.Show();

}
