
/**
 * @param {String} formName
 * @return {Number}
 *
 * @properties={typeid:24,uuid:"B5F1B492-4103-4DF8-BEAE-1F45D9AFE61E"}
 */
function countElementsTblForm(formName)
{
	// receives as param formName a name of a _tbl form - done in scopes.svyTiMigration.getAllTableForms() - loop over its result
	
	var jsForm = solutionModel.getForm(formName);
	if (!jsForm) {
		return 0;
	}
	
	var bodyPart = jsForm.getBodyPart();
	var bodyOffset = bodyPart.getPartYOffset();
	var footerPart = jsForm.getFooterPart();
	var footerOffSet = footerPart ? footerPart.getPartYOffset() : bodyPart.height;
	
	
	// checks the body part of the form of components (elements) that are columns, filters out elements that are a label (have a value for the property "labelFor") 
	var components = jsForm.getComponents().filter(/** @param {JSComponent} component */
	function(component) {
		return (component.y >= bodyOffset && component.y < footerOffSet && (!component.labelFor || component.labelFor.length=="undefined"));
	});
	
	application.output('components.length '+ components.length);
	
	return components.length;
}


/**
 * @return {Number}
 *
 * @properties={typeid:24,uuid:"5BD7D801-9035-4641-8196-6D3900F4D4F5"}
 */
function getFormsRTFarea() {
	//counts how many fields have displayType = RTF_AREA in the solution
	
	var RTFareaElements=[];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		var formFields = f.getFields();
		
		if (formFields && formFields[0]!==null)
		{	
		/** @type {JSField} */
		var jsfield;
		
		for (var i=0 ; i<formFields.length; i++)
		{
			jsfield = formFields[i];
			if (jsfield!= null && jsfield.displayType && jsfield.displayType == JSField.RTF_AREA)
			{
				RTFareaElements.push(jsfield.name)
			}
		}
		}
	});
	
	application.output('number of RTF_AREA displayType fields '+ RTFareaElements.length);
	return RTFareaElements.length;
}

/**
 * @return Object<Number, Array<String>, Array<Number>>
 *
 * @properties={typeid:24,uuid:"7AFF368C-06CA-467C-9724-5D274D989F7F"}
 */
function getFormsBeans() {
	//counts how many forms have beans in the solution
	
	var all_beans = {};
	all_beans.beansNumber = 0;
	
	/** @type Array<String> */
	all_beans.beansClasses = [];
	
	/** @type Array<String> */
	all_beans.beansPerClass = [];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		var formBeans = f.getBeans();
		
		//application.output('formBeans '+ formBeans);
		if (formBeans && formBeans[0]!== null)
		{
			all_beans.beansNumber = all_beans.beansNumber + formBeans.length;
			
			/** @type {JSBean} */
			var jsbean;
			for (var i=0 ; i<formBeans.length; i++)
			{
				jsbean = formBeans[i];
				if (!all_beans.beansClasses.includes(jsbean.className)){
					all_beans.beansClasses.push(jsbean.className);
					all_beans.beansPerClass.push(1);
				}else {
					var x = all_beans.beansClasses.indexOf(jsbean.className);
					all_beans.beansPerClass[x] = all_beans.beansPerClass[x]+1;
				}
			}
		}
		
	});
	
	application.output('all_beans.beansNumber '+ all_beans.beansNumber+ ' all_beans.beansClasses '+ all_beans.beansClasses + ' all_beans.beansPerClass '+ all_beans.beansPerClass);
	return all_beans;
}


/**
 * @return {Array<String>}
 *
 * @properties={typeid:24,uuid:"E3D74838-0319-418F-8252-C9E03C937E0A"}
 */
function getAllListsForms() {
	var ListsForms = [];

	solutionModel.getForms().forEach(/** @param {JSForm} f */
	function(f) {
		if (!/_OLD$/.test(f.name) && (f.view == JSForm.LIST_VIEW || f.view == JSForm.LOCKED_LIST_VIEW)) {
			ListsForms.push(f.name);
		}
	});

	ListsForms.sort();

	application.output('ListsForms '+ ListsForms); 
	return ListsForms;
}


/**
 * @param {{beansNumber: Number, beansClasses: Array<String>, beansPerClass: Array<Number>}} all_beans
 * @return {Array<{className: String, beansNumber: Number}>}
 *
 * @properties={typeid:24,uuid:"C7CE99DB-9F3A-4BC7-8222-A5A15E290135"}
 */

function getBeansClassesAndNo(all_beans) {
	// receives as param the result of getFormsBeans() function, using only all_beans.beansClasses and all_beans.beansPerClass
	//counts how many forms have beans in the solution and groups them by class name
	
	
	/** @type Array<{className: String, beansNumber: Number}> */
	var result_beans_classes = [];
	
	//var all_beans=[];
	/**@type {Array<String>}*/
	var beans_classes =  all_beans.beansClasses;
	var beans_no =  all_beans.beansPerClass;
	
	var classNames = "";
	var beansNo = 0;
	
	for (var i=0 ;i < beans_classes.length; i++)
	{
		classNames = beans_classes[i];
		beansNo = beans_no[i]
		result_beans_classes.push({className:classNames,beansNumber: beansNo});
		
		application.output('classNames '+ classNames + ' beansNo '+ beansNo);
	}

	application.output('result_beans_classes '+ result_beans_classes);

	return result_beans_classes;
}

