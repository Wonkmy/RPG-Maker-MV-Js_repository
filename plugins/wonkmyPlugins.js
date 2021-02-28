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
 * 定义任务场景类
 */
function Scene_Mission() {
    this.initialize.apply(this, arguments);
}

Scene_Mission.prototype = Object.create(Scene_Base.prototype);
Scene_Mission.prototype.constructor = Scene_Mission;

Scene_Mission.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Mission.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createCommandWindow();
};
Scene_Mission.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_MissionCommand(0, 0);
    this._commandWindow.setHandler('item',this.commandItem.bind(this));
    
    this.addWindow(this._commandWindow);
};

/**
 * 定义任务窗口上的指令窗口
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
Window_MissionCommand.prototype.numVisibleRows = function() {
    return this.maxItems();
};
Window_MissionCommand.prototype.windowWidth = function() {
    return 240;
};
Window_MissionCommand.prototype.makeCommandList = function() {
    this.addMainCommands();
};
Window_MissionCommand.prototype.addMainCommands = function() {
    var enabled = this.areMainCommandsEnabled();
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
    this.drawCurrencyValue('任务列表', x, 0, width,'center');
    for (let i = 1; i < $dataMission.length; i++) {
        this.drawCurrencyValue('任务:'+i+$dataMission[i].missionName, x, i*30, width,'center');    
    }
    
};
Window_Mission.prototype.drawCurrencyValue = function(value, x, y, width,pos='right') {
    this.resetTextColor();
    this.drawText(value, x, y, width, pos);
    this.changeTextColor(this.systemColor());
};