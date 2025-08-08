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

