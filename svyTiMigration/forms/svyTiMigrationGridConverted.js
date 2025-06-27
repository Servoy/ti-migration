/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"91558DD7-CA86-4093-8CD2-8AB1EFF8D6C6"}
 */
var formName = '';

/**
 * @param name
 *
 * @properties={typeid:24,uuid:"2C79A386-C736-4A77-84C4-906EA0E66027"}
 */
function showConvertedForm(name) {
	formName = name;
	showForm(formName)
}

/**
 * @param {String} frmName
 *
 * @properties={typeid:24,uuid:"D03C990F-C2BE-40BB-8FD9-D554DD3AF665"}
 */
function showForm(frmName) {
	
	history.removeForm(formName);
	solutionModel.revertForm(formName)
	
	elements.tabNew.removeAllTabs();
	elements.tabOld.removeAllTabs();
	
	elements.tabNew.visible = true;
	elements.tabNew.addTab(frmName, 'New Form');
	elements.tabOld.visible = true;
	elements.tabOld.addTab(frmName + '_OLD', 'Old Form');
	
	forms[formName].foundset.loadAllRecords()
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"07E0859F-86C3-4D7C-8DAB-B2387FBF4F2D"}
 */
function onActionWebClient(event) {
	var url = application.getServerURL() + 'servoy-webclient/ss/s/' + application.getSolutionName() + '?m=showGrid&a=' + formName;
	application.showURL(url, '_blank')
}

/**
 * @param event
 *
 * @properties={typeid:24,uuid:"D911FCEC-EB92-47ED-B227-B137F45F39F7"}
 */
function onActionNGClient(event) {
	var url = application.getServerURL() + 'solution/' + application.getSolutionName() + '?nodebug=true';
	application.showURL(url, '_blank')
}