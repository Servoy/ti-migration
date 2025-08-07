/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B25B9E72-C760-4AB4-808C-808E0338DF34"}
 */
var msg = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EC54664E-8D7D-4E2E-BFA7-091C22D51C0D"}
 */
var dir = scopes.svyTIScanner.getWorkspacePath();


/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"842D4A19-2685-452B-9723-E63D6530E8A0"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		elements.powergrid_1.renderData(scopes.svyTIScanData.getSolutionDataSet())
	}
}

/**
 * @properties={typeid:24,uuid:"053B61FE-7D3E-4B08-881D-C402AED17A41"}
 */
function saveActiveModules() {
	var modules = [];
	
	var ds = elements.powergrid_1.exportToDataset();
	for (var i = 1; i <= ds.getMaxRowIndex(); i++) {
		var row = ds.getRowAsArray(i);
		if (row[1] == 1) {
			modules.push(row[0])
		}
	}
	
	scopes.svyTIScanData.saveActiveModules(modules.join('\n'))
}