/**
 * @properties={typeid:35,uuid:"A14891DF-BE47-4DF3-BAF8-30CC25E9FD82",variableType:-4}
 */
var PRINT_COMPLEXITY_LEVELS = {
	EASY: 1,
	MEDIUM: 2,
	HARD: 3,
	LEGENDARY: 4
};

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
	q.result.add(q.columns.featuretype, 'featuretype')
	q.result.add(q.columns.feature_count, 'feature_count')

	var ds = q.getDataSet(-1)
	ds.setColumnName(1, 'solution')
	ds.setColumnName(2, 'scope')
	ds.setColumnName(3, 'scopetype')
	ds.setColumnName(4, 'feature')
	ds.setColumnName(5, 'complexity')
	ds.setColumnName(6, 'featuretype')
	ds.setColumnName(7, 'feature_count')

	return ds
}

/**
 * @return {JSDataSet}
 * @properties={typeid:24,uuid:"AE2859F7-C7AB-457B-AD89-73E1398E3FF5"}
 */
function getPrintDataSet() {
	var q = createSelect();

	/** @type {QBJoin<mem:svymig_scan>} */
	var join = q.joins.add(datasources.mem.svymig_scan.getDataSource(), QBJoin.INNER_JOIN);
	join.on.add(join.columns.scope.eq(q.columns.scope))
	join.on.add(join.columns.scopetype.eq(q.columns.scopetype))
	join.on.add(join.columns.solution.eq(q.columns.solution))
	//join.on.add(join.columns.feature.eq(value))

	var or = q.or
	or.add(q.and.add(join.columns.feature.eq('.controller.showPrintPreview')).add(q.columns.feature.eq('Controller.showPrintPreview')))
	or.add(q.and.add(join.columns.feature.eq('.controller.print')).add(q.columns.feature.eq('Controller.print')))
	q.where.add(or)

	// filter by print features only
	//q.where.add(q.columns.feature.isin(['Controller.print', 'Controller.showPrintPreview']))

	q.result.add(q.columns.solution, 'solution')
	q.result.add(q.columns.scope, 'scope')
	q.result.add(q.columns.scopetype, 'scopetype')
	q.result.add(q.columns.feature_count.sum, 'feature_count')
	q.result.add(q.columns.feature_count.sum, 'feature_count')
	q.groupBy.add(q.columns.solution)
	q.groupBy.add(q.columns.scope)
	q.groupBy.add(q.columns.scopetype)

	// Get Dataset with Cross-Print scripting
	var xds = q.getDataSet(-1)
	var crossPrintScopes = xds.getColumnAsArray(2);

	// Get Dataset without Cross-Print scripting
	q = createSelect();
	q.where.add(q.columns.feature.isin(['Controller.print', 'Controller.showPrintPreview']));
	q.where.add(q.columns.scope.not.isin(crossPrintScopes));

	q.result.add(q.columns.solution, 'solution')
	q.result.add(q.columns.scope, 'scope')
	q.result.add(q.columns.scopetype, 'scopetype')
	q.result.add(q.columns.feature_count.sum, 'feature_count')
	q.result.add(q.columns.feature_count.sum, 'feature_count')
	q.groupBy.add(q.columns.solution)
	q.groupBy.add(q.columns.scope)
	q.groupBy.add(q.columns.scopetype)

	var ds = q.getDataSet(-1);

	// concatenate the DS
	for (index = 1; index <= xds.getMaxRowIndex(); index++) {
		xds.setValue(index, 3, 'x-' + xds.getValue(index, 3))
		ds.addRow(xds.getRowAsArray(index))
	}

	ds.setColumnName(1, 'solution')
	ds.setColumnName(2, 'scope')
	ds.setColumnName(3, 'scopetype')
	ds.setColumnName(4, 'feature_count')

	ds.addColumn('element_count', 5, JSColumn.INTEGER);
	ds.addColumn('allelement_count', 6, JSColumn.INTEGER);
	ds.addColumn('extended', 7, JSColumn.INTEGER);
	ds.addColumn('complexity_lvl', 8, JSColumn.INTEGER);

	var subForms = scopes.svyTiAnalyzer.getChildForms('rpt_base');
	//	for (var index = 1; index <= ds.getMaxRowIndex(); index++) {
	//		var childs = scopes.svyTiAnalyzer.getChildForms(ds.getValue(index, 2));
	//		for (var j = 0; j < childs.length; j++) {
	//			if (!subForms.includes(childs[j])) {
	//				subForms.push(childs[j])
	//			}
	//		}
	//	}

	for (var i = 0; i < subForms.length; i++) {
		ds.addRow(['EXTENDED', subForms[i], 'form.js', 1])
	}

	for (var index = 1; index <= ds.getMaxRowIndex(); index++) {
		/** @type {String} */
		var formName = ds.getValue(index, 2);
		if (ds.getValue(index, 3) == 'form.js' && formName) {
			ds.setValue(index, 5, scopes.svyTiAnalyzer.getElementsCount(formName, false));
			ds.setValue(index, 6, scopes.svyTiAnalyzer.getElementsCount(formName, true));
			ds.setValue(index, 7, scopes.svyTiAnalyzer.isFormExtended(formName));
			ds.setValue(index, 8, getPrintComplexity(ds.getValue(index, 5), ds.getValue(index, 6)));
		}

	}

	return ds
}

/**
 * @param scope
 * @param feature
 * @param solution
 *
 * @properties={typeid:24,uuid:"C2FE9065-BC97-468D-BAAF-A440DEBA700D"}
 */
function isFormPrint(scope, feature, solution) {

	var intraFormFeature;
	switch (feature) {
	case 'Controller.print':
		intraFormFeature = '.controller.print'
		break;
	case 'Controller.showPrintPreview':
		intraFormFeature = '.controller.showPrintPreview'
		break;
	default:
		return false
		break;
	}

	var q = createSelect();

	q.result.add(q.columns.scope);

	q.columns.scope.eq(scope)
	q.columns.solution.eq(solution)
	q.columns.feature.eq(intraFormFeature)

	var ds = q.getDataSet(1)
	return ds.getMaxRowIndex() < 1;
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

/**
 *
 * @param elementSCount
 * @param allElementsCount
 *
 * @return {Number}
 *
 * @properties={typeid:24,uuid:"9EFA5FBA-FDBB-4728-BA83-ACD9763507A6"}
 */
function getPrintComplexity(elementSCount, allElementsCount) {

	//	if (elementSCount) {
	//		elementSCount = elementSCount * 3;
	//	}
	if (elementSCount > 30) {
		return PRINT_COMPLEXITY_LEVELS.LEGENDARY;
	}
	if (elementSCount > 20) {
		return PRINT_COMPLEXITY_LEVELS.HARD;
	}
	if (elementSCount > 10) {
		return PRINT_COMPLEXITY_LEVELS.MEDIUM;
	}

	return PRINT_COMPLEXITY_LEVELS.EASY;
}
