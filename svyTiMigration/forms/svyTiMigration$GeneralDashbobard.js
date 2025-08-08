/**
 * @properties={typeid:35,uuid:"2D494212-905D-4064-B529-2B76BC6D0E2A",variableType:-4}
 */
var CATEGORY = {
	TABLE: 'table',
	LIST: 'list',
	BEAN: 'bean',
	ONRENDER: 'onrender'
};

/**
 * @protected 
 * @properties={typeid:35,uuid:"BB35ECCD-900D-4FF4-A770-BBA58A26D483",variableType:-4}
 */
var selectedView = CATEGORY.TABLE;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"38AA680A-2D46-4804-9F76-1D6DFF84D5E3",variableType:4}
 */
var countForms =0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1752C8FF-85BA-4D59-B5C3-CA050A580951",variableType:4}
 */
var countAbstractForms = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6A33AB70-D547-4E52-B9A3-B31283A3CD34",variableType:4}
 */
var countGrids = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"04590AA1-075B-4570-90B4-5B761CDE5197",variableType:4}
 */
var countGridsMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F5A50C70-E05B-4253-9B90-97508CF15A15",variableType:4}
 */
var countGridsExtended = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"EAD2613C-B8F4-41F6-9C13-92CAF421A769",variableType:4}
 */
var countLists = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"77FEC7FB-C6ED-48B6-A27B-DD31BDC490CD",variableType:4}
 */
var countListsMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"5704D326-9C2A-48F4-80F8-F26FEBAD1E02",variableType:4}
 */
var countListsExtended = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"40DC5AAF-78BA-4271-AA0A-3FD98215CD58",variableType:4}
 */
var countBeans = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2217BA69-D2C0-465D-A3B4-5F8A8B641D52",variableType:4}
 */
var countBeansMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"97105D0F-9F22-4DB5-A570-0E265675EE44",variableType:4}
 */
var countOnRender = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"46C66032-2290-45E0-BB75-E515F00A8DB8",variableType:4}
 */
var countOnRenderMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7AF57653-6A65-48DF-83CB-5C80D35AF849",variableType:4}
 */
var progressGrids = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"D5436B6F-3BED-4E4E-8A3E-CCCB51A0155A",variableType:4}
 */
var progressBeans = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"00EF335E-879D-4D85-A61F-34492A3A73E1",variableType:4}
 */
var progressLists = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"9D93DE90-21A0-4E03-846D-5C00539A1928",variableType:4}
 */
var progressOnRender = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0286F54B-FC52-4CEF-A106-DDB28630F27C",variableType:4}
 */
var progressTotal = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"74BAD556-D440-468E-A224-1F791D508068",variableType:4}
 */
var countTotalMigrated = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A3E5C93C-0795-4400-A83E-A79544A01916",variableType:4}
 */
var countTotal = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"8FD07019-40DA-4E59-91D8-90D0FEF806A4",variableType:4}
 */
var countRtfFields = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"AE794046-A030-418B-809F-11EED1EA2A3A",variableType:4}
 */
var countRtfProviders = 0;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"4DA302B2-7CD7-4700-9F6C-F142E748C8D9"}
 */
function onShow(firstShow, event) {

	countForms = scopes.svyTiAnalyzer.getAllFormsWithUI()
	countAbstractForms = scopes.svyTiAnalyzer.getAllAbstractForms()
	countBeans = scopes.svyTiAnalyzer.getAllBeans().length;
	countGrids = scopes.svyTiAnalyzer.getAllTableForms().length;
	countLists = scopes.svyTiAnalyzer.getAllListsForms().length;
	countGridsExtended = scopes.svyTiAnalyzer.getAllTableInheritedForms().length;
	countListsExtended = scopes.svyTiAnalyzer.getAllListInheritedForms().length;

	countRtfFields = scopes.svyTiAnalyzer.getAllRTFArea().length
	countRtfProviders = scopes.svyTiAnalyzer.getRTFDataProviders().length

	updateProgress();
}

/**
 * @properties={typeid:24,uuid:"5B330C40-1A4C-47C6-A404-6924BF2A0B0C"}
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
 * @properties={typeid:24,uuid:"EC2FAB01-ED7E-4EC5-889E-66FECAA5E686"}
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
 * @properties={typeid:24,uuid:"2021A421-0013-4343-BDCA-C7B4B0808CB7"}
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
 * @properties={typeid:24,uuid:"1C94289A-ACA1-4755-AEF5-76EA0AFC279A"}
 */
function onActionShowBeans(event, dataTarget) {
	selectView(CATEGORY.BEAN);
}

/**
 * @param cat
 *
 * @properties={typeid:24,uuid:"0AA0F9CC-72C8-4E6F-A46B-2F5C2E480736"}
 */
function selectView(cat) {
	
	return;
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
 * @properties={typeid:24,uuid:"47A21039-6DBB-47E0-BFD4-74AC29608F86"}
 */
function onLoad(event) {
	selectView(CATEGORY.TABLE)
}
