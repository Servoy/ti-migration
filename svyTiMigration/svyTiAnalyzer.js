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
 * @public 
 * @return {Array<String>}
 * @properties={typeid:24,uuid:"F889421E-B9BC-4E11-80F0-7A0D7702E806"}
 */
function getAllTableForms() {
	var tableForms = [];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		if (!/_OLD$/.test(f.name) && (f.view == JSForm.LOCKED_TABLE_VIEW)) {
			tableForms.push(f.name);
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
 * @return Array<{name:String, formName:String, className:String}>
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


