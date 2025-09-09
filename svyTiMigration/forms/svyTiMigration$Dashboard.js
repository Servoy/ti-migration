/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"830AAA61-8F07-4B14-AE88-7FD96D9FE001",variableType:4}
 */
var filterReport = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DC7D3D70-0FBD-4C87-8D33-0206128ECB85",variableType:4}
 */
var countLvl1 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"CC22B430-7652-4D38-AEDA-99F25F7B387F",variableType:4}
 */
var countMigratedLvl1 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"21E5CABF-0FA7-4F71-9CF6-0FB8DD84CFB2",variableType:4}
 */
var countLvl2 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"4938E5C3-C9EF-4160-9780-46F74FBCB1CA",variableType:4}
 */
var countMigratedLvl2 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0F017C9A-0259-41C8-97BA-913DEC9EA898",variableType:4}
 */
var countLvl3 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B48FF1A1-1580-4285-A619-C5D5ACB69D7E",variableType:4}
 */
var countMigratedLvl3 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"D4509678-15E0-4475-8259-2A7D974F6CF1",variableType:4}
 */
var countLvl4 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"564CC954-1ABC-45F5-81D0-04470BB4BBDD",variableType:4}
 */
var countMigratedLvl4 = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0B9FC68F-ADE9-4AFD-881B-463BECF9232B"}
 */
var openTooltip = 'Open in Developer';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B2965CBA-4AA0-4374-9FCA-427D83AF7504"}
 */
function onLoad(event) {
//	scopes.svyTiHelper.buildFormStatsMemTable();
	
	var fs = datasources.mem.migrationFormStats.getFoundSet();
	fs.loadAllRecords();
	
	if (!databaseManager.hasRecords(fs)) {
		application.output('No form stats found, created from scratch.');
		
		scopes.svyTiHelper.buildFormStatsFile();
		scopes.svyTiHelper.buildFormStatsMemTable();
	}
	
	fs.dispose()
}
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"593136E9-96CB-4658-8371-F38B415A1BBA"}
 */
function onShow(firstShow, event) {
	// Delay until the form and foundset are loaded 
	application.executeLater(showFormsCount, 500);
	
	updateCounts();
}

/**
 * @properties={typeid:24,uuid:"14E2A02A-33DC-4238-AF8A-7009FC790C58"}
 */
function showFormsCount() {
	var qForms = datasources.mem.migrationFormStats.createSelect();
	qForms.result.add(qForms.columns.form_name.count);
	qForms.where.add(qForms.columns.conversion_date.not.isNull);
	
	var convertedCount = qForms.getDataSet(1).getValue(1, 1) || 0;
	var formsCount = databaseManager.getFoundSetCount(elements.formsGrid.myFoundset.foundset);
	
	// TODO yes i know we can do it better.. lets be quick :) 
	//forms.svyTiMigration$FormDashbobard.countGrids = formsCount;
	forms.svyTiMigration$FormDashbobard.countGridsMigrated = convertedCount;
	
	var qOnRender = datasources.mem.migrationFormOnRender.createSelect();
	qOnRender.result.add(qOnRender.columns.form_name.count);
	
	var onRenderCount = qOnRender.getDataSet(1).getValue(1, 1) || 0;
	forms.svyTiMigration$FormDashbobard.countOnRender = onRenderCount;
	
	forms.svyTiMigration$FormDashbobard.updateProgress();
	
	//elements.conversion_label.text = 'Forms Conversion: ' + convertedCount + ' / ' + formsCount + ' (' + Math.floor(convertedCount / formsCount * 100) + '%)';
}

/**
 * @properties={typeid:24,uuid:"A7C052C3-15D1-48C1-A90F-4899962EAF09"}
 */
function updateCounts() {

	countLvl1 = countComplexity(1, filterReport);
	countMigratedLvl1 = countMigratedComplexity(1, filterReport);
	
	countLvl2 = countComplexity(2, filterReport);
	countMigratedLvl2 = countMigratedComplexity(2, filterReport);
	
	countLvl3 = countComplexity(3, filterReport);
	countMigratedLvl3 = countMigratedComplexity(3, filterReport);
	
	countLvl4 = countComplexity(4, filterReport);
	countMigratedLvl4 = countMigratedComplexity(4, filterReport);

}

/**
 * @param {Number} lvl
 * @return {Number}
 * @properties={typeid:24,uuid:"E2AC1BFC-D686-446A-8072-E3525FB522A2"}
 */
function countMigratedComplexity(lvl)
{
	var countedMigrated = 0;
	
	var q = datasources.mem.migrationFormStats.createSelect();
	q.result.add(q.columns.form_name.count);
	q.where.add(q.columns.conversion_date.not.isNull);
	q.where.add(q.columns.complexity_lvl.eq(lvl));
	
	countedMigrated = q.getDataSet(1).getValue(1, 1) || 0;

	//application.output('countedMigrated '+ countedMigrated);
	return countedMigrated;
}

/**
 * @param {Number} lvl
 * @param {Number} [filterGridReport]
 * @return {Number}
 * @properties={typeid:24,uuid:"B2B15097-58FB-4ADC-AA17-EA06B9ACB461"}
 */
function countComplexity(lvl, filterGridReport)
{
	var counted = 0;
	
	var q = datasources.mem.migrationFormStats.createSelect();
	q.result.add(q.columns.form_name.count);
	q.where.add(q.columns.conversion_date.isNull);
	q.where.add(q.columns.complexity_lvl.eq(lvl));
	
	switch (filterGridReport) {
		case 1:
			q.where.add(q.columns.is_report.eq(0));
			break;
		case 2:
			q.where.add(q.columns.is_report.eq(1));
			break;
		default:
			break;
	}
	
	counted = q.getDataSet(1).getValue(1, 1) || 0;
	//application.output('counted '+ counted);
	
	return counted;
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
 * @properties={typeid:24,uuid:"59DE2C1B-AC3F-45DC-8154-BD02AB65B9F6"}
 */
function onCellClick(foundsetindex, columnindex, record, event) {
	if (!record) {
		record = elements.formsGrid.myFoundset.foundset.getRecord(foundsetindex);
		if (!record) {
			return;
		}
	}
	
	var column = elements.formsGrid.getColumn(columnindex);
	if (column.id == 'btnConvert' && !record.isConverted) {
		convertGridForm(record);
	} else if (column.id == 'onRenderCount') {
		forms.svyTiMigrationFormOnRender.show(record);
	} else if (column.id == 'btnOpen') {
		servoyDeveloper.openForm(solutionModel.getForm(record.form_name));
		
		var win = application.createWindow('oldForm', JSWindow.MODAL_DIALOG);
		win.setSize(640, 480);
		win.title = ' '
		win.show(forms[record.form_name]);
	}
}

/**
 * @param {JSRecord<mem:migrationFormStats>} record
 *
 * @properties={typeid:24,uuid:"71C66C6A-61A1-4175-91EB-9DC47C1CCD7C"}
 */
function convertGridForm(record) {
	if (!record) {
		return;
	}
	
	try {
		plugins.svyBlockUI.show('Converting form...');
		
		var success = scopes.svyTiMigration.convertTableFormToGrid(record.form_name, true, true);
		if (success) {
			scopes.svyTiHelper.addFormConversionStat(record.form_name);
			showFormsCount();
			updateCounts();
		}
	} catch (e) {
		application.output('Error converting form: ' + record.form_name + ' - error: ' + e.message + ' - stack: ' + e.stack, LOGGINGLEVEL.ERROR);
	}
	finally {
		plugins.svyBlockUI.stop();
	}
	
	if (!success) {
		plugins.dialogs.showErrorDialog('Error', 'Could not convert form: ' + record.form_name + '.<br>Please check the log for errors.');
	}
}
/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope) - present since 2021.06 release
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"5352EA77-1CCF-47FE-8FAF-61416DD0ED35"}
 */
function onDataChangeFilterReport(oldValue, newValue, event) {
	updateCounts();
	return true
}
