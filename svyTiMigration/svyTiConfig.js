/**
 * @properties={typeid:24,uuid:"AE1EE3D9-80E3-47BD-AE0C-4FAC128D86C7"}
 */
function showTiMigrationConfig() {
	var win = application.createWindow('svyTiConfig',JSWindow.MODAL_DIALOG);
	win.setSize(1400,804)
	win.title = ' '
	win.show(forms.svyTiMigrationNav)
}

/**
 * @properties={typeid:24,uuid:"C071E899-4061-4316-8EAD-EBF81909DAEE"}
 */
function addConfigShortcut() {
	plugins.window.createShortcut('ALT T', showTiMigrationConfig)
}