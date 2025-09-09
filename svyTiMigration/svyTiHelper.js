/**
 * @type {String}
 * @private
 *
 * @properties={typeid:35,uuid:"9E683949-B565-49A1-BF4C-E3AA5816574A"}
 */
var TEMPLATE_BUTTON_CONVERT = "/**\n\
 *\n\
 * @param {JSEvent} event\n\
 *\n\
 * @private\n\
 */\n\
function svyActionConvertGrid(event) {\n\
	try {\n\
		if (forms.svyTiMigrationSplashScreen.convertForm(controller.getName())) {\n\
			plugins.dialogs.showInfoDialog('Conversion Succesfull', 'Relaunch the application to see the new Grid');\n\
		} else {\n\
			plugins.dialogs.showErrorDialog('Error', 'Ooops something went wrong');\n\
		}\n\
	} catch (e) {\n\
		application.output(e, LOGGINGLEVEL.ERROR);\n\
		plugins.dialogs.showErrorDialog('Error', e);\n\
	}\n\
}";

/**
 * @enum
 * @properties={typeid:35,uuid:"655F99A0-00FE-4626-A106-E9C31610FDF6",variableType:-4}
 */
var FORM_COMPLEXITY_LEVELS = {
	EASY: 1,
	MEDIUM: 2,
	HARD: 3,
	LEGENDARY: 4
};

/**
 * @type {Object<{formType: Number, componentsCount: Number, conversionDate: Number, renderInfo: Object<{code: String, info: String}>}>}
 *
 * @properties={typeid:35,uuid:"CF71E540-201B-45C2-88BB-CF997260DC2F",variableType:-4}
 */
var formStatObj = { };

/**
 *
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A1509FCE-1DAC-4B43-9F25-B56434041CC7"}
 */
function svyActionConvertGrid(event) {
	try {
		forms.svyTiMigrationSplashScreen.convertForm(event.getFormName());
	} catch (e) {
		application.output(e, LOGGINGLEVEL.ERROR);
	}

	;
}

/**
 * @properties={typeid:24,uuid:"0477FFB5-1EB7-4EFA-8648-5C905D3E78AE"}
 */
function addHintToGridForms() {
	var tableForms = scopes.svyTiMigration.getAllTableForms();

	for (var i = 0; i < tableForms.length; i++) {
		addConvertButton(tableForms[i]);
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param formName
 *
 * @properties={typeid:24,uuid:"883CC6C6-4419-4480-AC35-12693062D317"}
 */
function addConvertButton(formName) {
	var jsform = solutionModel.getForm(formName);

	var titleHeaderPart = jsform.getTitleHeaderPart();
	var headerPart = jsform.getHeaderPart();
	var headerHeight = titleHeaderPart ? titleHeaderPart.height : 0;
	if (headerPart) {
		headerHeight += headerPart.height;
	}

	var bodyPart = jsform.getBodyPart();
	var bodyOffset = bodyPart.getPartYOffset();
	var bodyHeight = bodyPart.height - bodyOffset;
	var footerPart = jsform.getFooterPart();
	var footerOffSet = footerPart ? footerPart.getPartYOffset() : bodyPart.height;
	var footerHeight = footerPart ? footerPart.height : 0;

	var buttonOffset = 0;
	var buttonHeight = 50;
	if (headerHeight) {
		buttonHeight = Math.min(buttonHeight, headerHeight)
	} else if (footerHeight && footerHeight) {
		buttonOffset = footerOffSet;
		buttonHeight = Math.min(buttonHeight, footerHeight)
	} else {
		buttonOffset = bodyOffset;
		buttonHeight = Math.min(buttonHeight, bodyHeight)
	}

	var button = jsform.newWebComponent('svyBtnGridConverter', 'bootstrapcomponents-button', 15, buttonOffset, 50, buttonHeight);
	button.setJSONProperty('styleClass', 'btn btn-warning btn-round');
	//button.setJSONProperty('text','NG');
	button.setJSONProperty('toolTipText', 'Convert the form to NGGrid');
	button.setJSONProperty('imageStyleClass', 'fab fa-html5 fa-xl')
	button.formIndex = 9999;

	var jsMethod = solutionModel.getGlobalMethod('svyTiHelper', 'svyActionConvertGrid');
	button.setHandler("onAction", jsMethod);

}

/**
 * @properties={typeid:24,uuid:"AE925FF6-46B9-4181-837E-BAF5E2F751B7"}
 */
function buildFormStatsFile() {
	var tableForms = scopes.svyTiMigration.getAllTableForms();
	var now = Date.now();

	formStatObj = { };

	tableForms.forEach(function(formName) {
		var form = solutionModel.getForm(formName);
		var componentsCount = scopes.countElementsToConvert.countElementsTblForm(form.name);
		if (!componentsCount) {
			return;
		}

		// All these forms have not been converted yet, so no conversion date
		formStatObj[formName] = getFormStatObj(form);
	});

	solutionModel.getForms().forEach(/** @param {JSForm} form */ function(form) {
		if (/_OLD$/.test(form.name) && solutionModel.getForm(form.name.replace(/_OLD$/, ''))) {
			var formName = form.name.replace(/_OLD$/, '');

			// As we cannot know when the conversion was done, we use the current date
			formStatObj[formName] = getFormStatObj(form, now);
		}
	});

	saveFormStatsToFile();
}

/**
 * @properties={typeid:24,uuid:"E2B173FA-9E6C-4529-929C-29A36074E6C9"}
 */
function buildFormStatsMemTable() {
	var dsForms = databaseManager.createEmptyDataSet(0, ['form_name', 'form_type', 'body_components_count', 'conversion_date', 'complexity_lvl', 'is_inherited', 'is_report']);
	var dsOnRender = databaseManager.createEmptyDataSet(0, ['form_name', 'function_name', 'function_code', 'function_ai_analysis']);
	var statsFile = plugins.file.convertToJSFile(plugins.file.getDefaultUploadLocation() + '/formStats.json');
	var fileContent = statsFile.exists() ? plugins.file.readTXTFile(statsFile) : '';
	var extendedForms = scopes.svyTiAnalyzer.getAllTableInheritedForms().concat(scopes.svyTiAnalyzer.getAllListInheritedForms())

	
	var reports = scopes.svyTIScanData.getPrintDataSet();
	
	var reportForms =[];
	for (var r = 1; r <= reports.getMaxRowIndex(); r++) {
		var row = reports.getRowAsArray(r);
		if (row[2] == 'form.js') {
			reportForms.push(row[1])
		}
	}
	
	formStatObj = { };
	if (fileContent) {
		try {
			formStatObj = JSON.parse(fileContent);

			for (var formName in formStatObj) {
				var conversionDate = formStatObj[formName].conversionDate ? new Date(formStatObj[formName].conversionDate) : null;
				var isInherited = extendedForms.includes(formName)
				var complexity = getFormMigrationComplexity(formStatObj[formName].componentsCount, isInherited, formStatObj[formName].formType, formName);
				var isReport = reportForms.includes(formName)
				
				dsForms.addRow([formName, formStatObj[formName].formType, formStatObj[formName].componentsCount, conversionDate, complexity, isInherited, isReport]);

				if (formStatObj[formName].renderInfo) {
					for (var functionName in formStatObj[formName].renderInfo) {
						var renderInfo = formStatObj[formName].renderInfo[functionName];
						dsOnRender.addRow([formName, functionName, renderInfo.code, renderInfo.info]);
					}
				}
			}
		} catch (e) {
			application.output('Error parsing formStats.json: ' + e.message + ' - stack: ' + e.stack, LOGGINGLEVEL.ERROR);
		}
	}

	dsForms.createDataSource('migrationFormStats');
	dsOnRender.createDataSource('migrationFormOnRender');
	
}

/**
 * @properties={typeid:24,uuid:"9B003766-063A-4BBE-BCFA-AE93FE82A314"}
 */
function saveFormStatsToFile() {
	if (!formStatObj) {
		formStatObj = { };
	}

	var statsFile = plugins.file.convertToJSFile(plugins.file.getDefaultUploadLocation() + '/formStats.json');
	plugins.file.writeTXTFile(statsFile, JSON.stringify(formStatObj));

	application.output('Stats file: ' + statsFile.getAbsolutePath());
}

/**
 * This should be called after a form was successfully converted
 *
 * @param {String} formName
 * @param {Date} [conversionDate]
 *
 * @properties={typeid:24,uuid:"E538D5FA-E2BD-43D1-97B4-2C9DA387C58D"}
 */
function addFormConversionStat(formName, conversionDate) {
	var form = formName ? solutionModel.getForm(formName) : null;
	if (!form) {
		return;
	}

	if (!formStatObj || !Object.keys(formStatObj).length) {
		buildFormStatsFile();
	}

	if (!conversionDate) {
		conversionDate = new Date();
	}

	var timestamp = conversionDate ? conversionDate.getTime() : Date.now();

	if (formStatObj[formName]) {
		formStatObj[formName].conversionDate = timestamp;
	} else {
		formStatObj[formName] = getFormStatObj(solutionModel.getForm(form.name + '_OLD'), conversionDate.getTime());
	}

	saveFormStatsToFile();
	buildFormStatsMemTable();
}

/**
 * @param {String} formName
 * @param {String} functionName
 * @param {String} info
 *
 * @properties={typeid:24,uuid:"AD4E1E33-4A0F-4101-8365-6C22901B988B"}
 */
function updateRenderInfo(formName, functionName, info) {
	if (!formStatObj || !Object.keys(formStatObj).length) {
		buildFormStatsFile();
	}

	if (!formStatObj[formName] || !formStatObj[formName].renderInfo || !formStatObj[formName].renderInfo[functionName]) {
		return
	}

	formStatObj[formName].renderInfo[functionName].info = info;

	saveFormStatsToFile();
	buildFormStatsMemTable();
}

/**
 * @return Object<Array<String>, Array<Number>>
 * @properties={typeid:24,uuid:"4DE15C33-0A44-4AF3-92ED-59ADD501CA57"}
 */
function getAllStyles() {

	var all_styles = { };

	/** @type Array<String> */
	all_styles.styles = [];

	/** @type Array<Number> */
	all_styles.stylesNo = []

	var jsforms = solutionModel.getForms();
	for (var i = 0; i < jsforms.length; i++) {
		var style = jsforms[i].styleName;

		if (style && !all_styles.styles.includes(style)) {
			all_styles.styles.push(style);
			all_styles.stylesNo.push(1);
		} else {
			var x = all_styles.styles.indexOf(style);
			all_styles.stylesNo[x] = all_styles.stylesNo[x] + 1;
		}
	}

	//application.output('all_styles.styles '+ all_styles.styles+ ' all_styles.stylesNo '+ all_styles.stylesNo);

	return all_styles;
}

/**
 * @param {JSForm} form
 * @param {Number} [conversionDate]
 * @return {{formType: Number, componentsCount: Number, conversionDate: Number, renderInfo: Object<{code: String, info: String}>}}
 *
 * @properties={typeid:24,uuid:"E8BD6E96-5B76-40A3-B0D9-C0DA54343C72"}
 */
function getFormStatObj(form, conversionDate) {
	return {
		formType: form.view,
		componentsCount: scopes.countElementsToConvert.countElementsTblForm(form.name),
		conversionDate: conversionDate || null,
		renderInfo: getFormOnRenderInfo(form)
	}
}

/**
 * @param {Number} componentsCount
 * @param {Boolean} isInherited
 * @param {Number} formType
 * @param {String} name
 * @return {Number}
 *
 * @properties={typeid:24,uuid:"5035A88C-C678-4767-834B-399B66244A66"}
 */
function getFormMigrationComplexity(componentsCount, isInherited, formType, name) {

	if (formType != 3) {
		componentsCount = Math.floor(componentsCount * 1.5)
	}

	if (isInherited) {
		componentsCount = componentsCount * 2;
	}

	// I want to skip reports.
	if (name.startsWith('rpt') || name.includes('Report') || name.startsWith('report')) {
		return 0;
	}

	if (componentsCount > 25) {
		return FORM_COMPLEXITY_LEVELS.LEGENDARY;
	}
	if (componentsCount > 15) {
		return FORM_COMPLEXITY_LEVELS.HARD;
	}
	if (componentsCount > 7) {
		return FORM_COMPLEXITY_LEVELS.MEDIUM;
	}
	if (componentsCount < 1) {
		return 0;
	}

	return FORM_COMPLEXITY_LEVELS.EASY;
}

/**
 * @param {JSForm} form
 * @return {Object<String>}
 *
 * @properties={typeid:24,uuid:"EE4241D3-0585-40E8-9D6E-832F3C64965F"}
 */
function getFormOnRenderInfo(form) {
	if (!form) {
		return null;
	}

	var renderInfo = { };

	if (form.onRender) {
		renderInfo[form.onRender.getName()] = { code: form.onRender.code, info: null };
	}

	form.getComponents().forEach(function(component) {
		if (component.onRender) {
			renderInfo[component.onRender.getName()] = { code: component.onRender.code, info: null };
		}
	});

	return Object.keys(renderInfo).length ? renderInfo : null;
}

/**
 * @properties={typeid:24,uuid:"2252A02E-80AC-48F0-A7C5-5A3BA3817244"}
 */
function testOnRender() {
	scopes.svyTiMigration.getAllTableForms().forEach(function(formName) {
		var renderInfo = getFormOnRenderInfo(solutionModel.getForm(formName));
		application.output('Form: ' + formName + ' - render functions: ' + Object.keys(renderInfo));
	});
}
