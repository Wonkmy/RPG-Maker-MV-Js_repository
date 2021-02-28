/**
 * 一个任务列表窗口
 */

 var mySceneMenu=Scene_MenuBase.prototype.create;

 Scene_Menu.prototype.create = function() {
    mySceneMenu.call(this);
    this.createCommandWindow();
    this.createGoldWindow();
    this.createStatusWindow();
    this.createMissionWindow();
};

Scene_Menu.prototype.createMissionWindow=function(){
    this._missionWindow = new Window_Mission(0, 0);
    this._missionWindow.y = Graphics.boxHeight/2+15;
    this.addWindow(this._missionWindow);
};

/**
 * 绘制一个任务窗口
 */
function Window_Mission() {
    this.initialize.apply(this, arguments);
}

Window_Mission.prototype = Object.create(Window_Base.prototype);
Window_Mission.prototype.constructor = Window_Mission;

Window_Mission.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_Mission.prototype.windowWidth = function() {
    return 240;
};

Window_Mission.prototype.windowHeight = function() {
    return 220;
};

Window_Mission.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    this.drawCurrencyValue('任务名称', x, 0, width,'center');
};
Window_Mission.prototype.drawCurrencyValue = function(value, x, y, width,pos='right') {
    this.resetTextColor();
    this.drawText(value, x, y, width, pos);
    this.changeTextColor(this.systemColor());
};

/**
 * 任务窗口上的指令
 */
function Window_MissionCommand() {
    this.initialize.apply(this, arguments);
}

Window_MissionCommand.prototype = Object.create(Window_Command.prototype);
Window_MissionCommand.prototype.constructor = Window_MissionCommand;

Window_MissionCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.selectLast();
};

Window_MissionCommand._lastCommandSymbol = null;

Window_MissionCommand.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

Window_MissionCommand.prototype.windowWidth = function() {
    return 240;
};

Window_MissionCommand.prototype.numVisibleRows = function() {
    return this.maxItems();
};


Window_MissionCommand.prototype.selectLast = function() {
    this.selectSymbol(Window_MissionCommand._lastCommandSymbol);
};

Window_MissionCommand.prototype.areMissionCommandsEnabled = function() {
    return $gameParty.exists();
};

Window_MissionCommand.prototype.addMissionCommands = function() {
    var enabled = this.areMissionCommandsEnabled();
    if (this.needsCommand('item')) {
        this.addCommand(TextManager.item, 'item', enabled);
    }
    if (this.needsCommand('skill')) {
        this.addCommand(TextManager.skill, 'skill', enabled);
    }
    if (this.needsCommand('equip')) {
        this.addCommand(TextManager.equip, 'equip', enabled);
    }
    if (this.needsCommand('status')) {
        this.addCommand(TextManager.status, 'status', enabled);
    }
};