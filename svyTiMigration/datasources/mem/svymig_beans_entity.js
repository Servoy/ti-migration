
/**
 * Foundset load trigger, make sure a for inmem JSDataSet.createDataSource(inMemName) is called or that a ViewFoundSet is registered (datasources.view.xxx.getViewFoundset(select).
 *
 * @param {String} memOrViewName The in memory or view foundset table name that is touched.
 *
 * @private
 *
 * @properties={typeid:24,uuid:"158E3EF6-BC8C-4AFB-8CD3-FD3F9C0789E4"}
 */
function onFoundSetLoad(memOrViewName) {
	var allBeans = scopes.svyTiAnalyzer.getAllBeans();
	var ds = databaseManager.createEmptyDataSet(0,['classname', 'formname', 'name'])
	for (var i = 0; i < allBeans.length; i++) {
		var bean = allBeans[i];
		ds.addRow([bean.className, bean.formName, bean.name])
	}
	
	ds.createDataSource(memOrViewName);
}
