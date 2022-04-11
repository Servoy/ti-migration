/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"CFBD96DB-C807-421E-84C4-094D3F4C79D8"}
 */
var formName;

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"63A332D1-9B77-4C8E-B0B6-965F0B79E738"}
 */
function onActionConvert(event) {
	if (!formName) {
		plugins.dialogs.showInfoDialog('Missing Form', 'Please select the form to convert');
		elements.formName.requestFocus();
		return;
	}

	var jsForm = solutionModel.getForm(formName);
	if (!jsForm) {
		plugins.dialogs.showErrorDialog('Missing Form', 'Form "' + formName + '" not found');
		elements.formName.requestFocus();
		return;
	}

	var includeListView = false;
	if (jsForm.view == JSForm.LIST_VIEW || jsForm.view == JSForm.LOCKED_LIST_VIEW) {
		var answer = plugins.dialogs.showWarningDialog('List Form', 'Form "' + formName + '" is a List View, do you want to convert it?', 'Yes', 'No');
		if (answer != 'Yes') {
			return;
		}

		includeListView = true;
	}
	
	var success = scopes.svyTiMigration.convertTableFormToGrid(formName, includeListView, true);
	if (success) {
		showForm(formName);
		solutionModel.revertForm(formName);
		application.executeLater(showForm, 1000, [formName]);
	} else {
		elements.tabNew.visible = false;
		elements.tabOld.visible = false;
		plugins.dialogs.showErrorDialog('Error', 'Form not converted, please check the console for more info');
	}

	formName = null;
}

/**
 * @param {String} frmName
 *
 * @properties={typeid:24,uuid:"D55932E8-EB03-415C-8BDB-912059F65D99"}
 */
function showForm(frmName) {
	elements.tabNew.removeAllTabs();
	elements.tabOld.removeAllTabs();
	
	elements.tabNew.visible = true;
	elements.tabNew.addTab(frmName, 'New Form');
	elements.tabOld.visible = true;
	elements.tabOld.addTab(frmName + '_OLD', 'Old Form');
}
