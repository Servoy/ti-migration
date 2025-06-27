/**
 * TODO generated, please specify type and doc for the params
 * @param sourceStyleName
 *
 * @properties={typeid:24,uuid:"2C451881-58D1-4300-A854-8CA1846D183B"}
 */
function transformAndSaveCss(sourceStyleName) {
	// Fetch original CSS text
	var cssText = solutionModel.getStyle(sourceStyleName).text;

	var outputMediaName = sourceStyleName + '.less';

	// nothing to do if exists
	if (solutionModel.getMedia(outputMediaName)) return false;

	// Selector replacement map
	var selectorMap = {
		'body': '.svy-body',
		'button': '.svy-button',
		'calendar': '.svy-calendar',
		'check': '.svy-check',
		'checkgroup': '.svy-checkgroup',
		'combobox': '.svy-combobox',
		'even': '.ui-grid-row:nth-child(even) .ui-grid-cell',
		'field': '.svy-field',
		'footer': '.svy-footer',
		'form': '.svy-form',
		'header': '.svy-header',
		'label': '.svy-label',
		'listbox': '.svy-listbox',
		'odd': '.ui-grid-row:nth-child(odd) .ui-grid-cell',
		'password': '.svy-password',
		'portal': '.svy-portal',
		'radio': '.svy-radio',
		'radiogroup': '.svy-radiogroup',
		'slider': '.svy-slider',
		'spinner': '.svy-spinner',
		'splitpane': '.svy-splitpane',
		'tablesspanel': '.svy-tablesspanel',
		'tabpanel': '.svy-tabpanel',
		'textarea': '.svy-textarea',
		'textfield': '.svy-textfield',
		'typeahead': '.svy-typeahead',
		'selected': '.ui-grid-row-selected div.ui-grid-cell',
		'grid_header': '.ui-grid-header-cell',
		'grid_viewport': '.ui-grid-header-viewport',
		'title_header': '.svy-titleheader',
		'htmlarea': '.svy-htmlarea',
		'htmlview': '.svy-htmlview',
		'imagemedia': '.svy-mediafield'
	};

	// Replace selectors with scoped ones
	for (var oldSel in selectorMap) {
		var newSel = selectorMap[oldSel];
		var regex = new RegExp('(^|[\\s,>+~\\{\\}])' + oldSel + '(?=\\b|[\\s.:#\\[\\],>+~\\{\\}])', 'g');
		cssText = cssText.replace(regex, function(match, prefix) {
				return prefix + newSel;
			});
	}

	// Convert margin to padding
	cssText = cssText.replace(/\bmargin\s*:/g, 'padding:');

	// Convert font-size in pt (e.g. 20pt → 15pt)
	cssText = cssText.replace(/font-size:\s*(\d+(\.\d+)?)(pt)/g, function(_, value) {
			return 'font-size: ' + Math.floor(parseFloat(value) * 0.75) + 'pt';
		});

	// Convert font-size in px (e.g. 20px → 26px)
	cssText = cssText.replace(/font-size:\s*(\d+(\.\d+)?)(px)/g, function(_, value) {
			return 'font-size: ' + Math.floor(parseFloat(value) * 4 / 3) + 'px';
		});

	// Convert font shorthand with pt or px sizes
	cssText = cssText.replace(/font:\s*([^;]+);/g, function(full, fontVal) {
			var updated = fontVal.replace(/(\d+(\.\d+)?)(pt|px)/g, function(_match, num, _decimal, unit) {
					var v = parseFloat(num);
					return unit === 'pt' ? Math.floor(v * 0.75) + 'pt' : Math.floor(v * 4 / 3) + 'px';
				});
			return 'font: ' + updated + ';';
		});

	// Remove existing media if exists (optional - uncomment if desired)
	// var existing = solutionModel.getMedia(outputMediaName);
	// if (existing) solutionModel.removeMedia(existing);

	// Save transformed CSS as new media
	var media = solutionModel.newMedia(outputMediaName, cssText);
	servoyDeveloper.save(media);

	application.output('CSS transformed and saved to media: ' + outputMediaName);

	var importString = "@import '" + outputMediaName + "';"
		//   prependImportToLessFile('apeb_shop_anagrafica.less', importString);

	return true;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param inputFileName
 * @param importString
 *
 * @properties={typeid:24,uuid:"EC564D5C-5396-45C1-8FC1-4F52E9E98A76"}
 */
function prependImportToLessFile(inputFileName, importString) {
	var media = solutionModel.getMedia(inputFileName);
	if (!media) {
		application.output('LESS file not found: ' + inputFileName);
		return;
	}

	var content = media.getAsString();

	// Avoid duplicate
	if (content.includes(importString)) {
		application.output('Import already present in: ' + inputFileName);
		return;
	}

	// Prepend the import string
	var updatedContent = importString + '\n' + content;

	// Create a new file name for the override
	var overrideFileName = inputFileName.replace('.less', '_custom.less');

	// Remove existing media with that name if any
	//    var existingOverride = solutionModel.getMedia(overrideFileName);
	//    if (existingOverride) {
	//        solutionModel.removeMedia(existingOverride);
	//    }

	// Create the override media file
	var newMedia = solutionModel.newMedia(overrideFileName, updatedContent);

	// Override the original style with the new one
	application.overrideStyle(inputFileName, overrideFileName);
	application.output('Successfully overrode -------------' + inputFileName + '\n with =======================================  ' + overrideFileName);
}

/**
 * @properties={typeid:24,uuid:"291D5A10-5E47-434D-B46A-1F3080B0F4F4"}
 */
function overrideStyle() {
	var fs = datasources.mem.TiMigrationStyles.getFoundSet();
	fs.loadAllRecords();

	var styleString = ''
	var isApebWebMigrated = false;
	for (var i = 1; i <= fs.getSize(); i++) {
		var record = fs.getRecord(i);
		if (record.migrated) {
			styleString += "@import '" + record.name + ".less';\n"
			if (record.name == 'apeb_web') {
				isApebWebMigrated = true;
			}
		}
	}

	if (isApebWebMigrated) {
		styleString += "@import 'apeb_ng2.less';\n";
	} else {
		styleString += "@import 'apeb_common.less';"
		styleString += "@import 'custom_servoy_theme_properties_ng2.less';"
	}
	//var newMedia = solutionModel.newMedia('', updatedContent);

	if (!solutionModel.getMedia('custom.less')) {
		var media = solutionModel.newMedia('custom.less', utils.stringToBytes(styleString));
	} else {
		var media = solutionModel.getMedia('custom.less')
		media.setAsString(styleString)
	}
	//media.setAsString(styleString);

	application.overrideStyle('apeb_shop_anagrafica.less', 'custom.less');

}

