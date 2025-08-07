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
	// Delay until the form and foundset are loaded
	// application.executeLater(showFormsCount, 500);

	// TODO
	// updateCounts();
}

/**
 * @properties={typeid:24,uuid:"2475EFF4-E7EF-4818-8719-EFC936A14ECE"}
 */
function showFormsCount() {
	var qForms = datasources.mem.migrationFormStats.createSelect();
	qForms.result.add(qForms.columns.form_name.count);
	qForms.where.add(qForms.columns.conversion_date.not.isNull);

	var convertedCount = qForms.getDataSet(1).getValue(1, 1) || 0;
	var formsCount = databaseManager.getFoundSetCount(elements.formsGrid.myFoundset.foundset);

	// TODO yes i know we can do it better.. lets be quick :)
	forms.svyTiMigration$FormDashbobard.countGrids = formsCount;
	forms.svyTiMigration$FormDashbobard.countGridsMigrated = convertedCount;

	var qOnRender = datasources.mem.migrationFormOnRender.createSelect();
	qOnRender.result.add(qOnRender.columns.form_name.count);

	var onRenderCount = qOnRender.getDataSet(1).getValue(1, 1) || 0;
	forms.svyTiMigration$FormDashbobard.countOnRender = onRenderCount;

	forms.svyTiMigration$FormDashbobard.updateProgress();

	//elements.conversion_label.text = 'Forms Conversion: ' + convertedCount + ' / ' + formsCount + ' (' + Math.floor(convertedCount / formsCount * 100) + '%)';
}

/**
 * @properties={typeid:24,uuid:"103BFFE1-FA49-4DBA-99EC-85950D9CD543"}
 */
function updateCounts() {

	countLvl1 = countComplexity(1);
	countMigratedLvl1 = countMigratedComplexity(1);

	countLvl2 = countComplexity(2);
	countMigratedLvl2 = countMigratedComplexity(2);

	countLvl3 = countComplexity(3);
	countMigratedLvl3 = countMigratedComplexity(3);

	countLvl4 = countComplexity(4);
	countMigratedLvl4 = countMigratedComplexity(4);

}

/**
 * @param {Number} lvl
 * @return {Number}
 * @properties={typeid:24,uuid:"FC2EB7F8-542C-4E90-A0CC-7777887A2927"}
 */
function countMigratedComplexity(lvl) {
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
 * @return {Number}
 * @properties={typeid:24,uuid:"A5EAA070-2C1D-4555-A935-CE51AB592FB8"}
 */
function countComplexity(lvl) {
	var counted = 0;

	var q = datasources.mem.migrationFormStats.createSelect();
	q.result.add(q.columns.form_name.count);
	q.where.add(q.columns.conversion_date.isNull);
	q.where.add(q.columns.complexity_lvl.eq(lvl));

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
 * @properties={typeid:24,uuid:"FC40FF4B-473B-4071-8B35-7BAE35A5E3CE"}
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
 * @properties={typeid:24,uuid:"76395CD3-C681-4144-B78A-CF5C31044F58"}
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
	} finally {
		plugins.svyBlockUI.stop();
	}

	if (!success) {
		plugins.dialogs.showErrorDialog('Error', 'Could not convert form: ' + record.form_name + '.<br>Please check the log for errors.');
	}
}
