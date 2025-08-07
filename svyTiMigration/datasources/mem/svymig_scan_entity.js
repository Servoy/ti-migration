
/**
 * Foundset load trigger, make sure a for inmem JSDataSet.createDataSource(inMemName) is called or that a ViewFoundSet is registered (datasources.view.xxx.getViewFoundset(select).
 *
 * @param {String} memOrViewName The in memory or view foundset table name that is touched.
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D609C639-158B-4510-8630-965E91B00C4A"}
 */
function onFoundSetLoad(memOrViewName) {
	scopes.svyTIScanner.scan(scopes.svyTIScanner.getWorkspacePath()); 
}
