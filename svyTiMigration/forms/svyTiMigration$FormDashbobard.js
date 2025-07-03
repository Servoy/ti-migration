/**
 * @properties={typeid:35,uuid:"2EF4A760-43BF-4C05-8B3F-2DA6C81B7676",variableType:-4}
 */
var CATEGORY = {
	TABLE: 'table',
	LIST: 'list',
	BEAN: 'bean',
	ONRENDER: 'onrender'
}

/**
 * @protected 
 * @properties={typeid:35,uuid:"FB54C6AB-21A0-4B60-8123-0011AB97BED4",variableType:-4}
 */
var selectedView = CATEGORY.TABLE;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"708EA5C0-C54C-468D-AA21-69C0CED83F8C",variableType:4}
 */
var countGrids = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"85EE327E-293E-4919-A14D-BE97CFAACA9F",variableType:4}
 */
var countGridsMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1FC6B91A-CBF1-4002-A2B9-86E8E36072B8",variableType:4}
 */
var countLists = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"17ED4F9D-2AFB-430A-9C99-5722D382172B",variableType:4}
 */
var countListsMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"74530BE8-2A0A-4C48-BCF6-1B7770F46A3A",variableType:4}
 */
var countBeans = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"D14A8475-F77F-4E2F-8641-C73CF568CC4A",variableType:4}
 */
var countBeansMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B6310BCE-F261-4377-B867-737DEB28C94C",variableType:4}
 */
var countOnRender = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"5BC7C88A-3C85-495E-853B-CA4639AEE046",variableType:4}
 */
var countOnRenderMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1AD24AD2-13EA-488A-B783-302101167575",variableType:4}
 */
var progressGrids = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"8C7AB8AB-DC7B-4503-89C9-30545E68E9DF",variableType:4}
 */
var progressBeans = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"069EC844-F62B-473E-B3D2-80E2C474F9B3",variableType:4}
 */
var progressLists = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"23FDF781-483D-4D2D-8EA9-E1A4D0DBCB6F",variableType:4}
 */
var progressOnRender = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DA314EDC-6D4E-4B94-BC2F-1DDFD1DB53C0",variableType:4}
 */
var progressTotal = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"96B6DC57-B73A-4640-B9A2-B47F9801C9AB",variableType:4}
 */
var countTotalMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F08EEBBF-D483-49CD-B932-C94B8F6CE1F4",variableType:4}
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
 * @properties={typeid:24,uuid:"9089C6EC-D348-49AF-A624-728DBF2B20EB"}
 */
function onShow(firstShow, event) {

	countBeans = scopes.svyTiAnalyzer.getAllBeans().length;
	countGrids = scopes.svyTiAnalyzer.getAllTableForms().length;
	countLists = scopes.svyTiAnalyzer.getAllListsForms().length;

	updateProgress();
}

/**
 * @properties={typeid:24,uuid:"23B4CF4A-9FD5-469B-93BD-259D79DDB698"}
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
 * @properties={typeid:24,uuid:"EE4A1F5A-59A4-44AC-BFD0-8C0138B60F0A"}
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
 * @properties={typeid:24,uuid:"C751670C-B8AF-4363-A64D-96B3E1F188CD"}
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
 * @properties={typeid:24,uuid:"D9F70FBC-4790-4557-87B3-1ACE9E59076E"}
 */
function onActionShowBeans(event, dataTarget) {
	selectView(CATEGORY.BEAN);
}

/**
 * @param cat
 *
 * @properties={typeid:24,uuid:"5F004059-E290-45FA-A259-B754EA19CD54"}
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
		elements.tab.containedForm = forms.svyTiMigration$Dashboard;
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
 * @properties={typeid:24,uuid:"DF76FD44-CF87-4796-91E5-86332F04B1AB"}
 */
function onLoad(event) {
	selectView(CATEGORY.TABLE)
}
