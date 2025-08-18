/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6D984A8C-203B-4C42-AD69-A92C1B39D18F",variableType:4}
 */
var countLvl1 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"5B033C28-D1B0-430F-8D6B-D3EAF100AA29",variableType:4}
 */
var countMigratedLvl1 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7B65C42E-E16D-41BC-B0FD-DAD04AB34AC3",variableType:4}
 */
var countLvl2 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"52D9EDF0-2F7F-4412-8935-FEA5A40B32BC",variableType:4}
 */
var countMigratedLvl2 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"CC47FBA5-7DFE-4DDC-A59B-0CC9AC6FA31B",variableType:4}
 */
var countLvl3 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"FF2AF535-8A2C-4D73-AD5A-91DFAE3DB5CA",variableType:4}
 */
var countMigratedLvl3 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6A8095E6-A605-462B-999A-64365DECEB77",variableType:4}
 */
var countLvl4 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"4E89231F-C7C8-4066-B3DC-8306B3082AEE",variableType:4}
 */
var countMigratedLvl4 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"9EC26E65-5D18-43C0-BB6F-FCC848D750CD",variableType:4}
 */
var countLvlUnknown = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B67E9B39-43F7-4B90-A990-42990BF26114",variableType:4}
 */
var totalPrintsMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C8A6C661-9A1D-4973-83BF-A399FE167D11",variableType:4}
 */
var totalPrints = 0

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9B1B3C05-B0EA-4B87-B5E9-9A83756DC336"}
 */
var openTooltip = 'Open in Developer';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8A0792D8-8B71-4C35-BB7B-F0EDC72C484E"}
 */
function onLoad(event) {
	foundset.addFoundSetFilterParam('scopetype', '=', 'form.frm', 'scopetype')

}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4E7138C3-270C-4080-AC5C-F96204F07E5B"}
 */
function onShow(firstShow, event) {
	refreshData()
}

/**
 * Called when the mouse is clicked on a row/cell (foundset and column indexes are given).
 * the foundsetindex is always -1 when there are grouped rows
 *
 * @param {Number} foundsetindex
 * @param {Number} [columnindex]
 * @param {JSRecord<mem:migrationFormStats>} [record]
 * @param {JSEvent} [event]
 *
 * @properties={typeid:24,uuid:"FC40FF4B-473B-4071-8B35-7BAE35A5E3CE"}
 */
function onCellClick(foundsetindex, columnindex, record, event) { }

/**
 * @properties={typeid:24,uuid:"7E14473A-83A7-402E-9F3C-C041E30C190C"}
 */
function refreshData() {
	var ds = scopes.svyTIScanData.getPrintDataSet();
	elements.powergrid_1.renderData(scopes.svyTIScanData.getPrintDataSet())

	countLvl1 = 0
	countLvl2 = 0
	countLvl3 = 0
	countLvl4 = 0;
	countLvlUnknown = 0;

	for (var i = 1; i <= ds.getMaxRowIndex(); i++) {
		var lvl = ds.getValue(i, 8)
		switch (lvl) {
		case 4:
			countLvl4++;
			break;
		case 3:
			countLvl3++;
			break;
		case 2:
			countLvl2++;
			break;
		case 1:
			countLvl1++;
			break;
		default:
			countLvlUnknown++;
			break;
		}
	}
	
	totalPrints = countLvl1 + countLvl2 + countLvl3 + countLvl4 + countLvlUnknown;

}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"4ABEDEA5-DA29-4450-BD2C-3F5A4A2A0D60"}
 */
function onActionExport(event) {
	elements.powergrid_1.exportData()

}
