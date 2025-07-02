/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E9E7DC1F-959A-4DE3-BE1A-848A6587AA56",variableType:4}
 */
var countLvl1 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A0E9412C-62AA-431E-9FAB-DC3F967C5727",variableType:4}
 */
var countMigratedLvl1 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A68CE7F2-4488-4A3D-AB94-6AA9539F5242",variableType:4}
 */
var countLvl2 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"3AF60C46-2585-4C99-8C2E-B436604BB63D",variableType:4}
 */
var countMigratedLvl2 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"798B0A75-5179-4827-B0C4-DE5B05C29263",variableType:4}
 */
var countLvl3 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DBD036DF-22FF-417F-9A66-D3DFEBB71C4D",variableType:4}
 */
var countMigratedLvl3 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E4C49F8A-9F56-4F27-925C-347A89AF489C",variableType:4}
 */
var countLvl4 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"03796B46-F88F-4CCC-9803-71BC22EDE266",variableType:4}
 */
var countMigratedLvl4 = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"CDBC7C0B-E85E-4091-81D1-CDBB28A989D2"}
 */
var openTooltip = 'Open in Developer';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"902FB1E1-1741-472A-A5B6-A144D039DA2E"}
 */
function onLoad(event) {
	
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"02F74DC6-39DE-4FD0-86E4-C5DE7B692BEB"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		elements.listClassNames.foundset.foundset.sort('count desc')
	}
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
 * @properties={typeid:24,uuid:"DD4F355B-A4B7-4E33-A62B-5F0B7ACFD091"}
 */
function onCellClick(foundsetindex, columnindex, record, event) {
	if (!record) {
		record = elements.formsGrid.myFoundset.foundset.getRecord(foundsetindex);
		if (!record) {
			return;
		}
	}
	
	var column = elements.formsGrid.getColumn(columnindex);
	if (column.id == 'btnOpen') {
		servoyDeveloper.openForm(solutionModel.getForm(record.form_name));
		
		var win = application.createWindow('oldForm', JSWindow.MODAL_DIALOG);
		win.setSize(640, 480);
		win.title = ' '
		win.show(forms[record.form_name]);
	}
}

