/**
 * @properties={typeid:35,uuid:"FE2FD22E-82FE-4B43-82B2-7EDFF5E0CED6",variableType:-4}
 */
var CATEGORY = {
	TABLE: 'table',
	LIST: 'list',
	BEAN: 'bean',
	ONRENDER: 'onrender'
};

/**
 * @protected 
 * @properties={typeid:35,uuid:"CB9138FA-58DA-4983-A274-9C69B61D8DC5",variableType:-4}
 */
var selectedView = CATEGORY.TABLE;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"D79E6BE8-C9D7-40A4-A753-358FF767AB08",variableType:4}
 */
var countGrids = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"BA873FA1-29AA-467C-91C4-6A8AFF0BC9A0",variableType:4}
 */
var countGridsMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E1EAEC93-F2BF-4C58-B610-97A99CE1EC49",variableType:4}
 */
var countLists = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C5B2C696-64FD-4376-9B35-EC9742D84919",variableType:4}
 */
var countListsMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"91080DFC-5790-456D-80C1-343C2E5BB8AE",variableType:4}
 */
var countBeans = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2F523AF8-8EEC-43C8-9D79-E2183204B2BD",variableType:4}
 */
var countBeansMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"39D532A4-E7AE-4663-9134-4DF5F5B9163A",variableType:4}
 */
var countOnRender = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B3470226-C30C-42D8-BF31-15A94F7DFFF8",variableType:4}
 */
var countOnRenderMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"440A0DF0-0904-4F5D-A10F-D8F32D720E6F",variableType:4}
 */
var progressGrids = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"41B37777-488B-49AD-B56F-EA1916A3A654",variableType:4}
 */
var progressBeans = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"83A0DE87-32E6-4E71-BF57-A90E6664ADCD",variableType:4}
 */
var progressLists = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"706FA509-F575-4F04-A242-7873A1B03B27",variableType:4}
 */
var progressOnRender = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"9DDD94FB-57E6-460A-8B42-7C7D0FB79476",variableType:4}
 */
var progressTotal = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C51967B5-E005-49B5-B419-5583E1F6E46B",variableType:4}
 */
var countTotalMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E0876A6D-5099-4F44-8C46-298460F7C317",variableType:4}
 */
var countTotal = 0;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"98495C73-6088-43D4-A8D0-34120757AF0A"}
 */
function onShow(firstShow, event) {

	countBeans = scopes.svyTIScanData.getAllBeans();
	countGrids = scopes.svyTIScanData.getAllTableForms();
	countLists = scopes.svyTIScanData.getAllListsForms();

	updateProgress();
}

/**
 * @properties={typeid:24,uuid:"D44633CF-9C27-4185-A2DB-7662AFA221AC"}
 */
function updateProgress() {

	countTotal = countBeans + countGrids + countLists + countOnRender;
	countTotalMigrated = countGridsMigrated + countBeansMigrated + countListsMigrated + countOnRenderMigrated;

	progressGrids = Math.round( (countGridsMigrated / countGrids) * 100);
	progressBeans = Math.round( (countBeansMigrated / countBeans) * 100);
	progressLists = Math.round( (countListsMigrated / countLists) * 100);
	progressOnRender = Math.round( (countOnRenderMigrated / countOnRender) * 100);
	progressTotal = Math.round( (countTotalMigrated / countTotal) * 100);

	application.output("countTotal " + countTotal);
	application.output("countTotalMigrated " + countTotalMigrated);
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"A7EF394F-3750-4CDB-86D9-9B2FD8B29EFA"}
 */
function onActionShowGrids(event, dataTarget) {
	selectView(CATEGORY.TABLE);
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"AAF2F9F9-6380-43ED-9E46-51FF932DB54C"}
 */
function onActionShowLists(event, dataTarget) {
	selectView(CATEGORY.LIST);
}

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"4F1679C3-420A-4590-BBF4-34B219D5CF0F"}
 */
function onActionShowBeans(event, dataTarget) {
	selectView(CATEGORY.BEAN);
}

/**
 * @param cat
 *
 * @properties={typeid:24,uuid:"6C0F3D93-1EEE-4934-902E-0C2F009DEA13"}
 */
function selectView(cat) {
	
	var className = 'svymig-card-selected'
	
	// clear selection
	elements.fcBeans.removeStyleClass(className);
	elements.fcTables.removeStyleClass(className);
	elements.fcLists.removeStyleClass(className);
	elements.fcOnRender.removeStyleClass(className);
	elements.fcTotal.removeStyleClass(className);
	
	application.updateUI();
	
	switch (cat) {
	case CATEGORY.LIST:
		// TODO to be done
	case CATEGORY.TABLE:
		elements.tab.containedForm = forms.svyTiMigration$ScanTables;
		elements.fcTables.addStyleClass(className);

		break;
	case CATEGORY.BEAN:
		elements.tab.containedForm = forms.svyTiMigration$Beans;
		elements.fcBeans.addStyleClass(className);

		break;
	case CATEGORY.ONRENDER:
		// TODO
	default:
		cat = CATEGORY.TABLE;
		elements.tab.containedForm = forms.svyTiMigration$Dashboard;
		elements.fcTables.addStyleClass(className);
		break;
	}

	selectedView = cat;
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"2FABE661-0AFE-4155-8673-F955E499C470"}
 */
function onLoad(event) {
	selectView(CATEGORY.TABLE)
}
