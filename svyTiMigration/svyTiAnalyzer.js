/**
 * @return {Number}
 * @properties={typeid:24,uuid:"6C0ACB01-F16C-4D0D-8E96-618F46C8CB4C"}
 */
function getAllFormsWithUI() {
	var count = 0;

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		if (f.getComponents(true).length) {
			count++
		}
	});

	return count;
}

/**
 * @return {Number}
 * @properties={typeid:24,uuid:"EE5B8E9D-374B-43B8-9483-5E0DD6C09E9C"}
 */
function getAllAbstractForms() {
	var count = 0;

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		if (f.getComponents(true).length == 0) {
			count++
		}
	});

	return count;
}

/**
 * @public
 * @return {Array<String>}
 *
 * @properties={typeid:24,uuid:"3EEB83A9-64DB-453E-A06F-91260A6F7C2A"}
 */
function getAllListsForms() {
	var listsForms = [];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		if (!/_OLD$/.test(f.name) && (f.view == JSForm.LIST_VIEW || f.view == JSForm.LOCKED_LIST_VIEW)) {
			listsForms.push(f.name);
		}
	});

	listsForms.sort();

	return listsForms;
}

/**
 * @param {Boolean} [includeInhereted]
 * @public
 * @return {Array<String>}
 * @properties={typeid:24,uuid:"F889421E-B9BC-4E11-80F0-7A0D7702E806"}
 */
function getAllTableForms(includeInhereted) {
	var tableForms = [];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		if (!/_OLD$/.test(f.name) && (f.view == JSForm.LOCKED_TABLE_VIEW)) {

			if (includeInhereted === false) {
				if (f.extendsForm) {
					/** @type {JSForm} */
					var sf = f.extendsForm;
					if (sf.view == JSForm.LOCKED_TABLE_VIEW) {

						// check if has a body
						if (sf.getBodyPart() && sf.getBodyPart().height) {
							if (sf.getComponents(false).length) {
								return;
							}
						}
					}
				}
			}
			tableForms.push(f.name);
		}
	});

	tableForms.sort();
	return tableForms;
}

/**
 * @return {Array}
 * @properties={typeid:24,uuid:"943A3201-F8E1-4022-9F48-BED694738CCC"}
 */
function getAllTableInheritedForms() {
	var tableForms = [];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		if (!/_OLD$/.test(f.name) && (f.view == JSForm.LOCKED_TABLE_VIEW)) {

			if (f.extendsForm) {
				/** @type {JSForm} */
				var sf = f.extendsForm;
				if (sf.view == JSForm.LOCKED_TABLE_VIEW) {

					// check if has a body
					if (sf.getBodyPart() && sf.getBodyPart().height) {
						if (sf.getComponents(false).length) {
							tableForms.push(f.name);
						}
					}
				}
			}
		}
	});

	tableForms.sort();
	return tableForms;
}

/**
 * @return {Array}
 * @properties={typeid:24,uuid:"33DB7356-8B94-4645-B5E2-478A8CE24731"}
 */
function getAllListInheritedForms() {
	var tableForms = [];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		if (!/_OLD$/.test(f.name) && (f.view == JSForm.LIST_VIEW || f.view == JSForm.LOCKED_LIST_VIEW)) {

			if (f.extendsForm) {
				/** @type {JSForm} */
				var sf = f.extendsForm;
				if (sf.view == JSForm.LIST_VIEW || sf.view == JSForm.LOCKED_LIST_VIEW) {

					// check if has a body
					if (sf.getBodyPart() && sf.getBodyPart().height) {
						if (sf.getComponents(false).length) {
							tableForms.push(f.name);
						}
					}
				}
			}
		}
	});

	tableForms.sort();
	return tableForms;
}

/**
 * @public
 * @return {Array<String>}
 * @properties={typeid:24,uuid:"995962E0-70B0-4C6E-BA7C-F92774F074EC"}
 */
function getAllRepeatForms() {
	var tableForms = [];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		if (!/_OLD$/.test(f.name) && (f.view == JSForm.LOCKED_TABLE_VIEW || f.view == JSForm.LIST_VIEW || f.view == JSForm.LOCKED_LIST_VIEW)) {
			tableForms.push(f.name);
		}
	});

	tableForms.sort();

	return tableForms;
}

/**
 * @public
 * @return {Array<{name:String, formName:String, className:String}>}
 *
 * @properties={typeid:24,uuid:"1D65BAB5-CB35-4B78-A69E-D26BE9EB699B"}
 */
function getAllBeans() {

	/** @type {Array<{name:String, formName:String, className:String}>} */
	var all_beans = [];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		var formBeans = f.getBeans();

		//application.output('formBeans '+ formBeans);
		if (formBeans && formBeans[0] !== null) {
			//all_beans.beansNumber = all_beans.beansNumber + formBeans.length;

			/** @type {JSBean} */
			var jsbean;
			for (var i = 0; i < formBeans.length; i++) {
				jsbean = formBeans[i];
				var bean = {
					name: jsbean.name,
					className: jsbean.className,
					formName: jsbean.getFormName()
				}
				all_beans.push(bean);
			}
		}

	});

	return all_beans;
}

/**
 * @public
 * @return {Array<{name:String, formName:String, dataprovider:String}>}
 *
 * @properties={typeid:24,uuid:"53B66C19-6C62-4D96-9DBC-D7C27D633D65"}
 */
function getAllRTFArea() {

	/** @type {Array<{name:String, formName:String, dataprovider:String}>} */
	var all_beans = [];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		var fieldRTFs = f.getFields(false);

		//application.output('formBeans '+ formBeans);
		if (fieldRTFs && fieldRTFs[0] !== null) {
			//all_beans.beansNumber = all_beans.beansNumber + formBeans.length;
			for (var i = 0; i < fieldRTFs.length; i++) {
				var fieldRTF = fieldRTFs[i];
				if (fieldRTF.displayType == JSField.RTF_AREA) {
					var rtf = {
						name: fieldRTF.name,
						dataprovider: fieldRTF.dataProviderID,
						formName: fieldRTF.getFormName()
					}
					all_beans.push(rtf);
				}
			}
		}

	});

	return all_beans;
}

/**
 * @return {Array<{dataprovider:String, dataSource:String}>}
 * @properties={typeid:24,uuid:"ADCE1B41-3106-49C3-8E23-E74A6B0F13FD"}
 */
function getRTFDataProviders() {

	var result = [];

	var matches = [];

	var rtfFields = getAllRTFArea();
	for (var i = 0; i < rtfFields.length; i++) {
		var rtfField = rtfFields[i];
		var dp = rtfField.dataprovider;
		if (!dp) continue;

		var dataSource;
		var dpPath = dp.split('.');
		var colName = dp;

		if (dpPath[0] == 'scopes' && dpPath[0] == 'globals') {
			dataSource = 'GLOBAL';
		} else if (dpPath.length > 1) {
			colName = dpPath.pop();
			var relationName = dpPath.pop();

			if (solutionModel.getRelation(relationName)) {
				dataSource = solutionModel.getRelation(relationName).foreignDataSource;
			} else {
				dataSource = forms[rtfField.formName]
			}
		} else {
			dataSource = forms[rtfField.formName]
		}

		if (!dataSource) {
			dataSource = 'FORM_VARIABLE'
		}

		var match = dataSource + '.' + colName

		if (!matches.includes(match)) {
			matches.push(match)
			result.push({
				dataprovider: colName,
				dataSource: dataSource
			})
		}

	}
	return result;
}
