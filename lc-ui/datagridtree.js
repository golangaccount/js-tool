/// <reference path="listbox.js" />
/// <reference path="../quoteProject/jquery.js" />
/// <reference path="basetree.js" />

function DataGridTree(dom, option) {
    this.Root = dom;
    this.Setting = $.extend({}, this.DefaultSetting(), option);
}
$.extend(DataGridTree.prototype, BaseTree.prototype);

DataGridTree.prototype.DefaultSetting = function () {
    var self = this;
    var setting= BaseTree.prototype.DefaultSetting();
    setting.Columns = [];
    setting.Format=function(value){
        var div = $("<div></div>").addClass("row");
        for (var i = 0; i < self.Setting.Columns.length; i++) {
            div.append(self.Setting.Columns[i].Render(value, self.Setting.Columns[i], value[self.Setting.Columns[i].Name]));
        }
        return div;
    }
    return setting;
}

DataGridTree.prototype.Init = function () {
    this.Head = this.InitHead();
    this.Tree = new BaseTree(this.Root, this.Setting);
    this.Tree.Init();
}
DataGridTree.prototype.InitHead = function () {
    var self=this;
    var div = $("<div></div>");
    div.addClass("row");
    for (var i = 0; i < self.Setting.Columns.length; i++) {
        div.append($("<div><span>" + self.Setting.Columns[i].Title + "</span></div>").addClass(self.Setting.Columns[i]["Class"]));
    }
    $(this.Root).append(div);
    return div;
}