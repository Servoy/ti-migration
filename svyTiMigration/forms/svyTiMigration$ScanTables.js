/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"46306550-18AF-4676-8DD9-37946CDF7C58",variableType:4}
 */
var countLvl1 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"53E6E777-627D-4458-9BCA-1B5A243BC840",variableType:4}
 */
var countMigratedLvl1 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F55C1BED-E840-4FDB-84ED-02FB1E5AC4E3",variableType:4}
 */
var countLvl2 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B7549D9C-5E6C-452B-9E3D-F3BD9007B1E5",variableType:4}
 */
var countMigratedLvl2 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"4D9164A1-B7F8-4750-80E5-C027DAEAABB5",variableType:4}
 */
var countLvl3 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"39E41463-5A22-42E0-BE5E-4A7CBEAE9D54",variableType:4}
 */
var countMigratedLvl3 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"4E2770CC-088E-4D85-8223-BF4D59713D42",variableType:4}
 */
var countLvl4 = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DE967C24-8E04-40B2-9D33-5FC85324DCA2",variableType:4}
 */
var countMigratedLvl4 = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"86664DE9-F1E3-423F-BDE6-8D6D87A84131"}
 */
var openTooltip = 'Open in Developer';

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"316855A3-1F06-4606-BDB1-C97C9F78CD31"}
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
 * @properties={typeid:24,uuid:"4A32C291-1ADA-4FC3-BBB8-F3FA87C56390"}
 */
function onShow(firstShow, event) {
	// Delay until the form and foundset are loaded
	// application.executeLater(showFormsCount, 500);

	// TODO
	// updateCounts();
}

/**
 * @properties={typeid:24,uuid:"054FEADB-92A8-44B6-9F18-9093944D22B4"}
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
 * @properties={typeid:24,uuid:"DAA1CC28-4A93-42E7-B1BE-6D6855E18116"}
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
 * @properties={typeid:24,uuid:"34B80618-0779-40EE-A618-7B2CFBC16A8E"}
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
 * @properties={typeid:24,uuid:"A75E33F1-52C1-4B0A-A6C5-54D5232D2769"}
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
 * @properties={typeid:24,uuid:"2C2CB7CA-23C8-4174-BB71-95DB1D90EE3E"}
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
 * @properties={typeid:24,uuid:"010160FD-D6CE-4C8F-8795-E24EBF5241A5"}
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
