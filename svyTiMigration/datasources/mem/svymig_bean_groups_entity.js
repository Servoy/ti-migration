
/**
 * Foundset load trigger, make sure a for inmem JSDataSet.createDataSource(inMemName) is called or that a ViewFoundSet is registered (datasources.view.xxx.getViewFoundset(select).
 *
 * @param {String} memOrViewName The in memory or view foundset table name that is touched.
 *
 * @private
 *
 * @properties={typeid:24,uuid:"4A5A0EDF-8ABD-4C79-B0A6-283BA79291FA"}
 */
function onFoundSetLoad(memOrViewName) {
	var q = datasources.mem.svymig_beans.createSelect()
	q.result.add(q.columns.classname, 'classname');
	q.result.add(q.columns.classname.count, 'count');
	q.groupBy.add(q.columns.classname);
	
	var ds = q.getDataSet(-1);
	ds.createDataSource(memOrViewName);
}
