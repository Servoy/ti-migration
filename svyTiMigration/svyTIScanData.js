/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F7C7B717-6728-4A81-AEE5-09CD835E457B",variableType:4}
 */
var flagFilterModules = 0;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"BC6454FE-7276-468D-BBA3-EE21F8B45C9A"}
 */
var activeModules = null;

/**
 * @return {Number}
 * @properties={typeid:24,uuid:"7096632C-24CC-46A9-9D8A-E95815656CDA"}
 */
function getAllBeans() {
	var q = createSelect()
	q.result.add(q.columns.feature.count)
	// TODO
	q.where.add(q.columns.feature.eq('Table View'))

	var d = q.getDataSet(-1);
	return 0
	return d.getValue(1, 1)
}

/**
 * @properties={typeid:24,uuid:"D0964680-27A5-4222-B2C4-9E8F12C8C817"}
 */
function getAllTableForms() {
	var q = createSelect()
	q.result.add(q.columns.feature.count)
	q.where.add(q.columns.feature.eq('Table View'))

	var d = q.getDataSet(-1);
	return d.getValue(1, 1)
}
/**
 * @properties={typeid:24,uuid:"4205DE8B-42E4-4245-8976-FA7EE4EB9892"}
 */
function getAllListsForms() {
	var q = createSelect()
	q.result.add(q.columns.feature.count)
	// TODO
	q.where.add(q.columns.feature.eq('Table View'))

	var d = q.getDataSet(-1);
	return 0
	return d.getValue(1, 1)
}

/**
 * @return {JSDataSet}
 * @properties={typeid:24,uuid:"8F685E7C-1472-453F-B90B-57680B1C2E38"}
 */
function getScanDataSet() {
	var q = createSelect()
	q.result.clear();
	q.result.add(q.columns.solution, 'solution')
	q.result.add(q.columns.scope, 'scope')
	q.result.add(q.columns.scopetype, 'scopetype')
	q.result.add(q.columns.feature, 'feature')
	q.result.add(q.columns.complexity, 'complexity')
	var ds = q.getDataSet(-1)
	ds.setColumnName(1, 'solution')
	ds.setColumnName(2, 'scope')
	ds.setColumnName(3, 'scopetype')
	ds.setColumnName(4, 'feature')
	ds.setColumnName(5, 'complexity')

	return ds
}

/**
 * @return {JSDataSet}
 *
 * @properties={typeid:24,uuid:"92970F46-F513-41F0-B67C-0985BAC45851"}
 */
function getSolutionDataSet() {
	var q = datasources.mem.svymig_scan.createSelect()
	q.result.clear();
	q.result.add(q.columns.solution, 'solution').distinct
	q.groupBy.add(q.columns.solution)
	var ds = q.getDataSet(-1, false)
	ds.setColumnName(1, 'solution')
	ds.addColumn('enabled', 2)

	var modules = getActiveModules();
	if (modules && modules.length) {
		for (var i = 1; i <= ds.getMaxRowIndex(); i++) {
			if (modules.includes(ds.getValue(i, 1))) {
				ds.setValue(i, 2, 1)
			}
		}
	}

	return ds
}

/**
 * @param {String} txt
 *
 * @properties={typeid:24,uuid:"DF8B4CBB-295C-49FF-B2F6-E9FE700A72F9"}
 */
function saveActiveModules(txt) {

	var workspacePath = scopes.svyTIScanner.getWorkspacePath();
	var configPath = [workspacePath, 'svyTiMigration', 'medias', 'svyti_config'].join(scopes.svyTIScanner.getFileSeperator());

	var fileName = configPath + scopes.svyTIScanner.getFileSeperator() + 'svyti_modules.txt'
	plugins.file.deleteFile(fileName);

	var file = plugins.file.createFile(fileName);
	if (!file.exists()) file.createNewFile()
	plugins.file.writeTXTFile(file, txt);
	activeModules = txt;

	// change filter
}

/**
 * @return {Array<String>}
 * @protected
 * @properties={typeid:24,uuid:"A1BE957F-C442-4ACC-9FC5-885B4EECD15D"}
 */
function getActiveModules() {

	var workspacePath = scopes.svyTIScanner.getWorkspacePath();
	var configPath = [workspacePath, 'svyTiMigration', 'medias', 'svyti_config'].join(scopes.svyTIScanner.getFileSeperator());

	var fileName = configPath + scopes.svyTIScanner.getFileSeperator() + 'svyti_modules.txt'

	var file = plugins.file.createFile(fileName);
	if (file.exists()) {
		var txt = plugins.file.readTXTFile(file);
		activeModules = txt;
		return txt ? txt.split('\n') : [];
	} else {
		return [];
	}
}

/**
 * @public 
 * @return {QBSelect<mem:svymig_scan>}
 * 
 * @properties={typeid:24,uuid:"66CA899D-E977-4A89-8513-99EFB339984E"}
 */
function createSelect() {
	var q = datasources.mem.svymig_scan.createSelect()
	if (activeModules && flagFilterModules) {
		q.where.add(q.columns.solution.isin(activeModules.split('\n')))
	}
	return q;
}