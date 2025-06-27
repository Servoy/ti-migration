
/**
 * Foundset load trigger, make sure a for inmem JSDataSet.createDataSource(inMemName) is called or that a ViewFoundSet is registered (datasources.view.xxx.getViewFoundset(select).
 *
 * @param {String} memOrViewName The in memory or view foundset table name that is touched.
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2BDBE97E-D32A-4FA5-AC83-B6721227CE92"}
 */
function onFoundSetLoad(memOrViewName) {
	// TODO Auto-generated method stub\
	
	var ds = databaseManager.createEmptyDataSet(0,['name', 'datemigration', 'migrated', 'formscount'])
	
	
	/**@type {Object<Array<String>, Array<Number>>} */
	var all_styles = scopes.svyTiHelper.getAllStyles();
	var styles = all_styles.styles;
	
	for (var i = 0; i < styles.length; i++) {
		
		var stylename = styles[i];
		
		var theDate = null;
		var isMigrated = 0;
		if (solutionModel.getMedia(stylename + '.less')) {
			isMigrated = 1;
			theDate = new Date()
		}
		var forms_count = all_styles.stylesNo[i];
		ds.addRow([stylename, null, isMigrated, forms_count]);
		
	}
	
	ds.createDataSource(memOrViewName)
}
