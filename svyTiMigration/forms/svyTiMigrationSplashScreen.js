/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"70AC837E-C512-408F-8599-AFB741124399"}
 */
var gridFormName

/**
 * @param formName
 *
 * @properties={typeid:24,uuid:"9A406AD7-7FBA-4151-ABCC-753BE1793AA9"}
 */
function convertForm(formName) {
	gridFormName = formName
	controller.show();
	application.executeLater(convert, 100);
}

/**
 * @properties={typeid:24,uuid:"C8EEBA17-1569-467F-A36A-5223B20DAA3B"}
 */
function convert() {
	try {
		var success = scopes.svyTiMigration.convertTableFormToGrid(gridFormName, true);
		if (success) {

			application.executeLater(showConvertedForm, 2000);

		} else {
			plugins.dialogs.showErrorDialog('Error','Oops something went wrong');
			application.exit();
		}
	} catch (e) {
		plugins.dialogs.showErrorDialog('Error', e);
		application.exit();
	}
}

/**
 * @properties={typeid:24,uuid:"1D250348-8684-4033-8524-8B1D1C1BB676"}
 */
function showConvertedForm() {
	forms.svyTiMigrationGridConverted.showConvertedForm(gridFormName);
	application.showForm(forms.svyTiMigrationMainNav);
	
	var url = application.getServerURL() + 'servoy-webclient/ss/s/' + application.getSolutionName() + '?m=showGrid&a=' + gridFormName;
	application.showURL(url, '_blank')
}