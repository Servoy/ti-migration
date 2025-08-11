/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"75464061-3088-4EEC-B1D5-BA4B0A2659EF",variableType:4}
 */
var activeModules = null;


/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"62AE11EB-CAC8-4F43-BB1C-42F895E736F6"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		elements.sidenav_2.setSelectedMenuItem('forms')
	}
} 

/**
 * Click event. dataTarget parameter is used to identify inner html elements (by their data-target attribute).
 *
 * @param {JSEvent} event
 * @param {String} dataTarget
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"072F946B-BD9C-4E70-904C-1314F17855F1"}
 */
function onActionScan(event, dataTarget) {
	try {
		plugins.svyBlockUI.show('Scan default workspace: ' + scopes.svyTIScanner.getWorkspacePath())
		scopes.svyTIScanner.scan();
	} catch (e) {
		plugins.dialogs.showErrorDialog('Oops something went wring','Check your logs');
		application.output(e, LOGGINGLEVEL.ERROR)
	} finally {
		plugins.svyBlockUI.stop()
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
 * @properties={typeid:24,uuid:"01E34DB1-18E2-446A-AAEB-CB8C962032C0"}
 */
function onDataChangeActiveModules(oldValue, newValue, event) {
	var form = forms[elements.sidenav_2.containedForm]
	if (form && form.refreshData) {
		form.refreshData();
	}
	return true
}
