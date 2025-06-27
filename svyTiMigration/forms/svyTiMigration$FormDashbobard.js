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
	
	countBeans = scopes.countElementsToConvert.getFormsBeans().beansNumber;
	countGrids = scopes.svyTiMigration.getAllTableForms().length;
	countLists = scopes.countElementsToConvert.getAllListsForms().length;

	updateProgress();
}

/**
 * @properties={typeid:24,uuid:"23B4CF4A-9FD5-469B-93BD-259D79DDB698"}
 */
function updateProgress() {
	
	countTotal = countBeans + countGrids + countLists + countOnRender;
	countTotalMigrated = countGridsMigrated + countBeansMigrated + countListsMigrated + countOnRenderMigrated;
	
	progressGrids = Math.round((countGridsMigrated/countGrids) * 100);
	progressBeans = Math.round((countBeansMigrated/countBeans) * 100);
	progressLists = Math.round((countListsMigrated/countLists) * 100);
	progressOnRender = Math.round((countOnRenderMigrated/countOnRender) * 100);
	progressTotal = Math.round((countTotalMigrated/countTotal) * 100);

	application.output("countTotal "+ countTotal);
	application.output("countTotalMigrated "+ countTotalMigrated);
}


