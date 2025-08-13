/**
 * @return {Number}
 * @properties={typeid:24,uuid:"A645791A-100A-45E8-9C35-A8825F490416"}
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
 * @return {Array<String>}
 * @properties={typeid:24,uuid:"13754A10-6834-4614-92CC-1BAFFB0D11EF"}
 */
function getAllStyles() {
	var styles = [];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		if (f.styleName) {
			if (!styles.includes(f.styleName)) {
				styles.push(f.styleName)
			}
		}
	});

	return styles;
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
				dataSource = forms[rtfField.formName].foundset.getDataSource()
			}
		} else {
			dataSource = forms[rtfField.formName].foundset.getDataSource()
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

/**
 * @public 
 * @param formName
 * @param {Boolean} [includeInherited]
 * 
 * @return {Number}
 *
 * @properties={typeid:24,uuid:"4ABD1EEE-2F74-46CD-A1D1-AB7FA2D9F41B"}
 */
function getElementsCount(formName, includeInherited) {
	var f = solutionModel.getForm(formName);
	if (!f) return 0
	var countInherited = includeInherited === false ? false : true;
	return f.getComponents(countInherited).length
}

/**
 * @public 
 * @param {String} formName
 * 
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"36C0DF07-3BFE-481D-9B34-2AF299E37A51"}
 */
function isFormExtended(formName) {
	var f = solutionModel.getForm(formName);
	if (!f) return null;
	if (f.extendsForm) {
		/** @type {JSForm} */
		var sf = f.extendsForm;

		// if there are elements in base form
		if (sf.getComponents(true).length) {
			return true
		} else {
			return false;
		}
	}
	return false;
}

/**
 * @public 
 * @param formName
 * @return {Array<String>}
 *
 * @properties={typeid:24,uuid:"337524E4-37DC-4D38-94A8-4DAB460B6AE5"}
 */
function getChildForms(formName) {
	var result = [];
	
	var f = solutionModel.getForm(formName)
	if (!f) return []
	var childs = getJSFormInstances(f);
	for (var i = 0; i < childs.length; i++) {
		result.push(childs[i].name)
	}
	return result
}

/**
 * @private 
 * @param superForm
 * @return {Array<JSForm>}
 * 
 * @properties={typeid:24,uuid:"6FF71F3F-7350-40F9-A1A3-3854C3724BD9"}
 */
function getJSFormInstances(superForm) {
	superForm = getJSFormForReference(superForm);
	
	/** @type {Array<JSForm>} */
	var retval = [];
	var smForms = solutionModel.getForms(); //Getting this once and holding a reference to it is faster
	var smForm, instances;
	for (var i = 0; i < smForms.length; i++) {
		smForm = smForms[i];
		instances = [];
		if (retval.indexOf(smForm) != -1) {
			continue;
		}
		
		while (smForm.extendsForm != null) {
			instances.push(smForm);
			
			if (smForm.extendsForm == superForm || retval.indexOf(smForm.extendsForm) != -1) {
				retval = retval.concat(instances);
				break;
			}
			smForm = smForm.extendsForm;
		}
	}
	
	return retval;
}

/**
 * Gets the JSForm for any type of form 'reference' (formName String, RuntimeForm or JSform (the latter for convenience)), regardless how the form was created
 * Solves the scenario of not being able to get the JSForm representation of forms created using {@link #application#createNewForminstance(...)}
 * This method should be deprecated and removed after https://support.servoy.com/browse/SVY-3642 gets implemented
 * 
 * @private 
 * 
 * @param {JSForm|RuntimeForm|String} form 
 *
 * @return {JSForm}
 * 
 * @properties={typeid:24,uuid:"9D964729-5E71-497D-B068-70D8600CB64C"}
 */
function getJSFormForReference(form) {
	if (form instanceof JSForm) {
		/** @type {JSForm} */
		var jsForm = form;
		return jsForm;
	}
	
	/** @type {String} */
	var formName;
	if (form instanceof RuntimeForm) {
		formName = form.controller.getName();
	} else if (form instanceof String) {
		formName = form;
	}
	var retval = solutionModel.getForm(formName);
	if (retval !== null) { //really null, not undefined
		return retval;
	}

	if (!(formName in forms)) { //It's not a loaded form, so the value of 'form' must be wrong
		throw 'The value provided for the "form" parameter is not a valid Form identifier: ' + form;
	}
	//It must be a form created with application.createNewFormInstance
	var list = new Packages.java.util.ArrayList();
	list.add(Packages.com.servoy.j2db.FormController);
	formName = list.get(0)['getMethod']('getForm').invoke(forms[form]).getName();
	return solutionModel.getForm(formName);
}