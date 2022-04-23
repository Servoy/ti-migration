/**
 * @type {String}
 * @private
 *
 * @properties={typeid:35,uuid:"545E5C28-7441-481E-B192-542C03196D94"}
 */
var TEMPLATE_ON_CELL_CLICK = '/**\n\
 * Called when the mouse is clicked on a row/cell (foundset and column indexes are given).\n\
 * the foundsetindex is always -1 when there are grouped rows\n\
 *\n\
 * @param {Number} foundsetindex\n\
 * @param {Number} columnindex\n\
 * @param {JSRecord} record\n\
 * @param {JSEvent} event\n\
 *\n\
 * @private\n\
 */\n\
function onCellClick(foundsetindex, columnindex, record, event) {\n\
	if(columnindex < 0) {\n\
		application.output("Cell click not handled in group mode", LOGGINGLEVEL.WARNING);\
		return;\n\
	}\n\
	\n\
	/** @type {CustomType<aggrid-groupingtable.column>} */\n\
	var col = elements[event.getElementName()].getColumn(columnindex);\n\
	\n\
[BODY]\n\
}';

/**
 * @type {String}
 * @private
 *
 * @properties={typeid:35,uuid:"D52D7650-306E-4746-8492-256802EA674A"}
 */
var TEMPLATE_ON_CELL_RIGHT_CLICK = '/**\n\
 * Called when the mouse is right clicked on a row/cell (foundset and column indexes are given).\n\
 * the foundsetindex is always -1 when there are grouped rows\n\
 *\n\
 * @param {Number} foundsetindex\n\
 * @param {Number} columnindex\n\
 * @param {JSRecord} record\n\
 * @param {JSEvent} event\n\
 *\n\
 * @private\n\
 */\n\
function onCellRightClick(foundsetindex, columnindex, record, event) {\n\
	if(columnindex < 0) {\n\
		application.output("Cell right click not handled in group mode", LOGGINGLEVEL.WARNING);\
		return;\n\
	}\n\
	\n\
	/** @type {CustomType<aggrid-groupingtable.column>} */\n\
	var col = elements[event.getElementName()].getColumn(columnindex);\n\
	\n\
[BODY]\n\
}';

/**
 * @type {String}
 * @private
 *
 * @properties={typeid:35,uuid:"BEAA028A-496A-48C8-A4EF-F7A9296455EC"}
 */
var TEMPLATE_ON_CELL_DOUBLE_CLICK = '/**\n\
 * Called when the mouse is double clicked on a row/cell (foundset and column indexes are given).\n\
 * the foundsetindex is always -1 when there are grouped rows\n\
 *\n\
 * @param {Number} foundsetindex\n\
 * @param {Number} columnindex\n\
 * @param {JSRecord} record\n\
 * @param {JSEvent} event\n\
 *\n\
 * @private\n\
 */\n\
function onCellDoubleClick(foundsetindex, columnindex, record, event) {\n\
	if(columnindex < 0) {\n\
		application.output("Cell right click not handled in group mode", LOGGINGLEVEL.WARNING);\
		return;\n\
	}\n\
	\n\
	/** @type {CustomType<aggrid-groupingtable.column>} */\n\
	var col = elements[event.getElementName()].getColumn(columnindex);\n\
	\n\
[BODY]\n\
}';

/**
 * @type {String}
 * @private
 *
 * @properties={typeid:35,uuid:"BF4E559B-5D44-4FDE-9948-840DDBB02A72"}
 */
var TEMPLATE_ON_COLUMN_DATA_CHANGE = '/**\n\
 * Called when the columns data is changed.\
 *\n\
 * @param {Number} foundsetindex\n\
 * @param {Number} columnindex\n\
 * @param oldValue\n\
 * @param newValue\n\
 * @param {JSEvent} event\n\
 *\n\
 * @private\n\
 */\n\
function onColumnDataChange(foundsetindex, columnindex, oldValue, newValue, event) {\n\
	if(columnindex < 0) {\n\
		return;\n\
	}\n\
	\n\
	/** @type {JSRecord} */\n\
	var record = elements[event.getElementName()].myFoundset.foundset.getRecord(foundsetindex);\n\
	\n\
	/** @type {CustomType<aggrid-groupingtable.column>} */\n\
	var col = elements[event.getElementName()].getColumn(columnindex);\n\
	\n\
[BODY]\n\
}';

/**
 * @param {String} formName
 * @param {Boolean} [includeListView]
 * @param {Boolean} [skipOpen]
 * @param {function(String, JSWebComponent)} [gridCallback] This callback can be used to modify the resulting grid
 * @param {function(String, JSField|JSLabel|JSButton, CustomType<aggrid-groupingtable.column>)} [columnCallback] This callback can be used to modify the resulting grid column of each component
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"D174958C-9D02-4FE4-829C-B8B18CA56743"}
 */
function convertTableFormToGrid(formName, includeListView, skipOpen, gridCallback, columnCallback) {
	var jsOldForm = solutionModel.getForm(formName + '_OLD');
	var jsForm = solutionModel.getForm(formName);

	if (jsOldForm && jsForm) {
		application.output('Form already converted to NG Grid, please remove the converted form and try again - form: ' + formName, LOGGINGLEVEL.ERROR);
		return false;
	} else if (jsOldForm) {
		// Clone the old form to be re-converted
		jsForm = solutionModel.cloneForm(formName, jsOldForm);
		application.output('Re-converting form to NG Grid from OLD copy - form: ' + formName, LOGGINGLEVEL.INFO);
	} else {
		// Clone the form to have a backup copy
		jsOldForm = solutionModel.cloneForm(formName + '_OLD', jsForm);
		servoyDeveloper.save(jsOldForm, true);
	}

	if (!jsForm || jsForm.view != JSForm.LOCKED_TABLE_VIEW) {
		if ( (jsForm.view == JSForm.LIST_VIEW || jsForm.view == JSForm.LOCKED_LIST_VIEW) && !includeListView) {
			application.output('Invalid form type - form: ' + formName, LOGGINGLEVEL.ERROR);
			return false;
		}
	}

	if (!history.removeForm(formName)) {
		application.output('Could not remove from history before converting - form: ' + formName, LOGGINGLEVEL.ERROR);
		return false;
	}

	application.output('Converting form "' + formName + '" to NG Grid', LOGGINGLEVEL.INFO);

	var bodyPart = jsForm.getBodyPart();
	var bodyOffset = bodyPart.getPartYOffset();
	var bodyHeight = bodyPart.height - bodyOffset;
	var footerPart = jsForm.getFooterPart();
	var footerOffSet = footerPart ? footerPart.getPartYOffset() : bodyPart.height;
	var footerHeight = footerPart ? footerPart.height : 0;

	var components = jsForm.getComponents().filter(/** @param {JSComponent} component */
	function(component) {
		return (component.y >= bodyOffset && component.y < footerOffSet);
	});

	var footerComponents = [];

	if (footerPart) {
		footerComponents = jsForm.getComponents().filter(/** @param {JSComponent} component */
		function(component) {
			return (component.y >= (bodyOffset + bodyHeight));
		});
	}

	if (!components.length) {
		application.output('--- No components were found in the body', LOGGINGLEVEL.INFO);
		return false;
	}

	components.sort(sortComponents);
	application.output('--- Components found in the body: ' + components.map(function(c) {
		return c.name;
	}));

	if (footerComponents.length) {
		footerComponents.sort(sortComponents);
		application.output('--- Components found in the footer: ' + footerComponents.map(function(c) {
			return c.name;
		}));
	}

	// Change form type and remove default navigator
	jsForm.view = JSForm.RECORD_VIEW;
	jsForm.navigator = SM_DEFAULTS.NONE;

	// Make the body part higher to accommodate the new grid if too small
	if (bodyHeight < 100) {
		bodyPart.height = bodyOffset + 100;
	}

	// Make smaller body, not need to be that high
	if (bodyPart.height > 250) {
		bodyPart.height = 250;
	}

	// Add room for footer
	if (footerPart) {
		footerPart.height = bodyPart.height + footerHeight;
	}

	var grid = jsForm.newWebComponent('grid', 'aggrid-groupingtable', 0, bodyOffset, jsForm.width, bodyPart.height - bodyOffset);
	grid.anchors = SM_ANCHOR.ALL;

	var onCellClickBody = [];
	var onCellDoubleClickBody = [];
	var onCellRightClickBody = [];
	var onColumnDataChangeBody = [];
	var columns = [];
	var maxComponentHeight;
	var jsMethod;

	// Store all the labels that point to a component to use it as a header text when creating the column
	/** @type {Object<JSLabel>} */
	var labelForElements = { };
	jsForm.getLabels().forEach(/** @param {JSLabel} label */
	function(label) {
		if (label.labelFor) {
			labelForElements[label.labelFor] = label;
		}
		//check if the label have a matching field
		else if (label.name) {
			var split = label.name.split('label_')[1];
			if (split) {
				labelForElements[split] = label;
			}

			split = label.name.split('_label')[1];
			if (split) {
				labelForElements[split] = label;
			}
		}
	});

	// Check for buttons because labels with an onAction event handler will be treated as buttons
	jsForm.getButtons().forEach(/** @param {JSLabel} label */
	function(label) {
		//check if the button have a matching field
		if (label.name) {
			var split = label.name.split('label_')[1];
			if (split) {
				labelForElements[split] = label;
			}

			split = label.name.split('_label')[1];
			if (split) {
				labelForElements[split] = label;
			}
		}
	});

	components.forEach(/** @param {JSField|JSLabel|JSButton} component */
	function(component) {
		if (component instanceof JSLabel && component.labelFor && labelForElements[component.labelFor]) {
			// This is a header label for another component, skip it, it will be deleted when used by the component
			return;
		}
		
		var headerLabel = labelForElements[component.name];
		if (!headerLabel) headerLabel = labelForElements[component.dataProviderID];
		var column = convertComponentToGridColumn(jsForm, component, headerLabel, columnCallback);

		// Set a dummy name, if don't have, just to be able to delete them
		setComponentDummyName(component);
		setComponentDummyName(headerLabel);

		if (!column) {
			removeComponent(jsForm, component);
			removeComponent(jsForm, headerLabel);
			return;
		}

		if (!column.headerTitle && (component instanceof JSLabel || component instanceof JSButton)) {
			// The column doesn't have a header, try to use the label/button text if it's not a field tag
			// Convert any HTML text to plain
			/** @type {JSLabel|JSButton} */
			var label = component;
			column.headerTitle = (label.text && !/^%%[a-zA-Z\._ \-\(\)]+%%$/.test(label.text)) ? utils.stringReplace(label.text.replace(/<\/?.*?>/g, ''), '&nbsp;', '') : '';
		}

		if (!column.headerTitle) {
			// Ultimately use the column id as the title if it was not possible to guess it
			column.headerTitle = column.id
		}

		if (component.onAction) {
			onCellClickBody.push(utils.stringFormat('\tif (col.id == "%s") {\n\t\t%s(event);\n\t}', [column.id, getMethodFullyQualifiedName(component.onAction)]));
			column.styleClass = utils.stringTrim(column.styleClass + ' clickable');
		}
		if (component.onDoubleClick) {
			onCellDoubleClickBody.push(utils.stringFormat('\tif (col.id == "%s") {\n\t\t%s(event);\n\t}', [column.id, getMethodFullyQualifiedName(component.onDoubleClick)]));
			column.styleClass = utils.stringTrim(column.styleClass + ' clickable');
		}
		if (component.onRightClick) {
			onCellRightClickBody.push(utils.stringFormat('\tif (col.id == "%s") {\n\t\t%s(event);\n\t}', [column.id, getMethodFullyQualifiedName(component.onRightClick)]));
		}
		if (component.onDataChange) {
			onColumnDataChangeBody.push(utils.stringFormat('\tif (col.id == "%s") {\n\t\t%s(oldValue, newValue, event);\n\t}', [column.id, getMethodFullyQualifiedName(component.onDataChange)]));
		}

		removeComponent(jsForm, component);
		removeComponent(jsForm, headerLabel);

		columns.push(column);

		if (!maxComponentHeight || maxComponentHeight < component.height) {
			maxComponentHeight = component.height;
		}
	});

	if (footerComponents.length) {
		// Move footer components to be after the body
		var startFooterHeight = bodyPart.height;
		footerComponents.forEach(/** @param {JSField|JSLabel|JSButton} component */
		function(component) {
			component.y = startFooterHeight;
		});
	}

	grid.setJSONProperty("rowHeight", maxComponentHeight);
	grid.setJSONProperty("columns", columns);

	if (onCellClickBody.length) {
		jsMethod = jsForm.newMethod(utils.stringReplace(TEMPLATE_ON_CELL_CLICK, '[BODY]', onCellClickBody.join('\n')));
		grid.setHandler("onCellClick", jsMethod);
	}
	if (onCellDoubleClickBody.length) {
		jsMethod = jsForm.newMethod(utils.stringReplace(TEMPLATE_ON_CELL_DOUBLE_CLICK, '[BODY]', onCellDoubleClickBody.join('\n')));
		grid.setHandler("onCellDoubleClick", jsMethod);
	}
	if (onCellRightClickBody.length) {
		jsMethod = jsForm.newMethod(utils.stringReplace(TEMPLATE_ON_CELL_RIGHT_CLICK, '[BODY]', onCellRightClickBody.join('\n')));
		grid.setHandler("onCellRightClick", jsMethod);
	}
	if (onColumnDataChangeBody.length) {
		jsMethod = jsForm.newMethod(utils.stringReplace(TEMPLATE_ON_COLUMN_DATA_CHANGE, '[BODY]', onColumnDataChangeBody.join('\n')));
		grid.setHandler("onColumnDataChange", jsMethod);
	}

	var customProps = getCustomGridProperties();
	for (var p in customProps) {
		grid.setJSONProperty(p, customProps[p]);
	}

	var customStyleClass = getCustomGridStyleClass(grid);
	if (customStyleClass) {
		grid.setJSONProperty('styleClass', grid.getJSONProperty('styleClass') + ' ' + customStyleClass);
	}
	
	if (gridCallback instanceof Function) {
		gridCallback(formName, grid);
	}

	servoyDeveloper.save(true);

	application.output('Finished converting form to NG Grid');
	application.sleep(1000);

	if (!skipOpen) {
		servoyDeveloper.openForm(jsForm);
	}

	return true;
}

/**
 * @param {JSForm} form
 * @param {JSField|JSLabel|JSButton} component
 * @param {JSLabel} [jsHeader]
 * @param {function(String, JSField|JSLabel|JSButton, CustomType<aggrid-groupingtable.column>)} [callback] Function used to customize the column after the component is converted
 * @return {CustomType<aggrid-groupingtable.column>}
 * @private
 *
 * @properties={typeid:24,uuid:"9F4B7BB0-B8C2-4CB5-838B-1EF46699DB03"}
 */
function convertComponentToGridColumn(form, component, jsHeader, callback) {
	var componentProps = utils.stringFormat('component: %s (x: %.0f, y: %.0f, width: %.0f, height: %.0f)',
		[component.name || '-no name-', component.x, component.y, component.width, component.height]);

	if (! (component instanceof JSButton) && ! (component instanceof JSLabel) && ! (component instanceof JSField)) {
		componentProps += ' - ' + component;
		application.output(utils.stringFormat('--- Skipped unsupported component %s', [componentProps]), LOGGINGLEVEL.INFO);
		return null;
	}

	if (excludeComponent(component)) {
		// The component won't be included in the grid
		return null;
	}
	
	try {
		/** @type {CustomType<aggrid-groupingtable.column>} */
		var column = {
			rowGroupIndex: -1,
			enableRowGroup: true,
			enableSort: true,
			visible: component.visible,
			editType: null,
			autoResize: true
		};
	
		column.id = component.name || component.dataProviderID || 'c' + Date.now();
		column.dataprovider = component.dataProviderID;
		column.styleClass = component.styleClass;
		column.valuelist = component.valuelist ? component.valuelist.getUUID().toString() : null;
		column.format = component.format;
	
		if (jsHeader) {
			column.headerTitle = jsHeader.text;
			column.headerStyleClass = jsHeader.styleClass;
		} else if (component.titleText) {
			column.headerTitle = component.titleText;
		}
	
		if (component.horizontalAlignment == SM_ALIGNMENT.RIGHT) {
			column.styleClass = (column.styleClass || '') + ' text-right';
			column.headerStyleClass = (column.headerStyleClass || '') + ' text-right';
		} else if (component.horizontalAlignment == SM_ALIGNMENT.CENTER) {
			column.styleClass = (column.styleClass || '') + ' text-center';
			column.headerStyleClass = (column.headerStyleClass || '') + ' text-center';
		}
	
		var autoWidth = (component.anchors == SM_ANCHOR.ALL || component.anchors == (SM_ANCHOR.NORTH | SM_ANCHOR.EAST | SM_ANCHOR.WEST) || component.anchors == (SM_ANCHOR.EAST | SM_ANCHOR.WEST | SM_ANCHOR.SOUTH));
		if (!autoWidth) {
			column.width = component.width;
			column.minWidth = component.width;
		}
	
		if (component instanceof JSField && component.editable) {
			switch (component.displayType) {
			case JSField.TEXT_FIELD:
			case JSField.TEXT_AREA:
				column.editType = "TEXTFIELD";
				break;
	
			case JSField.TYPE_AHEAD:
				column.editType = "TYPEAHEAD";
				break;
	
			case JSField.COMBOBOX:
				column.editType = "COMBOBOX";
				break;
	
			case JSField.CALENDAR:
				column.editType = "DATEPICKER";
				break;
	
			case JSField.IMAGE_MEDIA:
				// Needs to be handled manually
				application.output(utils.stringFormat('--- Skipped editable Image Media component %s. Please implement a custom edit form', [componentProps]), LOGGINGLEVEL.INFO);
				break;
	
			case JSField.CHECKS:
				column.editType = "CHECKBOX";
				break;
	
			case JSField.RADIOS:
				// TODO Radio buttons are not supported yet by NG Grids
				application.output(utils.stringFormat('--- Skipped editable Radio Button component %s. It is not yet supported by NG Grids', [componentProps]), LOGGINGLEVEL.INFO);
				break;
			default:
				break;
			}
		} else if (component instanceof JSLabel && !column.dataprovider) {
			/** @type {JSLabel} */
			var label = component;
	
			// Use label tag text as dataprovider if showing a single column/calculation/aggregation
			if (/^%%[a-zA-Z\._]+%%$/.test(label.text)) {
				column.dataprovider = utils.stringReplace(label.text, '%%', '');
			}
		}
	
		var customStyleClass = getCustomColumnStyleClass(component);
		if (customStyleClass) {
			column.styleClass += ' ' + customStyleClass;
		}
	
		if (component.imageMedia) {
			application.output(utils.stringFormat('--- Make sure to handle image media "%s" for component: %s. See scopes.svyTiMigration.getCustomStyleClass',
					[component.imageMedia.getName(), componentProps]), LOGGINGLEVEL.INFO);
		}
	
		if (component.toolTipText) {
			// Assume plain text only, if there are field tags they must be handled manually using a calculation
			if (column.id) {
				// If the tooltip has a single dataprovider tag, no calculations, then it can be used as a tooltip dataprovider for the column
				if (/^%%[a-zA-Z0-9\._]+%%$/.test(component.toolTipText)) {
					column.tooltip = utils.stringReplace(component.toolTipText, '%%', '');
				}
				// Otherwise, for plain text or multi dataprovider tags a form variable will be created
				else {
					// Make sure the variable name is valid, replace any dot (.) with double underscore (__)
					var jsVar = form.newVariable(utils.stringReplace(column.id, '.', '__') + '_tooltip', JSVariable.TEXT, "'" + component.toolTipText + "'");
					column.tooltip = jsVar.name;
				}
			} else {
				application.output(utils.stringFormat('--- Tooltip plain text not supported in grid columns, please create a form variable or calculation to show: "%s" for component: %s',
						[component.toolTipText, componentProps]), LOGGINGLEVEL.INFO);
			}
		}
		
		if (callback instanceof Function) {
			callback(form.name, component, column);
		}
	
		// Leading spaces can cause issues when rendering the grid
		column.styleClass = utils.stringTrim(column.styleClass);
		column.headerStyleClass = utils.stringTrim(column.headerStyleClass);
		
		return column;
	} catch (e) {
		application.output(utils.stringFormat('Error converting component to column: %s - Ex: %s %s', [componentProps, e.message, e.stack]), LOGGINGLEVEL.ERROR);
	}
	
	return null;
}

/**
 * @param {JSForm} jsForm
 * @param {JSComponent} component
 * @private
 *
 * @properties={typeid:24,uuid:"C144B33E-8C00-42F4-ABB5-626AE4F8B9A1"}
 */
function removeComponent(jsForm, component) {
	if (!component) {
		return;
	}

	if (component.name) {
		jsForm.removeComponent(component.name);
	} else {
		application.output(utils.stringFormat('Cannot remove component without name - form: %s - component props: (x: %.0f, y: %.0f, width: %.0f, height: %.0f)', [jsForm.name, component.x, component.y, component.width, component.height]));
	}
}

/**
 * Add any custom logic in this method to indicate if a component should be excluded from conversion
 *
 * @param {JSComponent} component
 * @return {Boolean}
 * @private
 *
 *  @example
 *  <pre>
 *  if (component.name == 'separator') {
 *      return true;
 *  }
 *  </pre>
 *
 * @properties={typeid:24,uuid:"EC6C0D7F-E949-4F25-A924-47F2A560262E"}
 */
function excludeComponent(component) {
	return false;
}

/**
 * @param {JSComponent} c1
 * @param {JSComponent} c2
 * @return {Number}
 * @private
 *
 * @properties={typeid:24,uuid:"49B565EF-9F19-4DD8-9543-F4B9B8952CC8"}
 */
function sortComponents(c1, c2) {
	return (c1.y == c2.y) ? (c1.x - c2.x) : (c1.y - c2.y);
}

/**
 * Add any custom logic in this method to return a custom style class to be added to the column that will replace the component
 *
 * @param {JSComponent} component
 * @return {String}
 * @private
 *
 *  @example
 *  <pre>
 *  if (component.name == 'btnEdit' ||
 *      (component.imageMedia && component.imageMedia.getName() == 'pencil.png')) {
 *          return 'grid-edit-icon';
 *  }
 *  </pre>
 *
 * @properties={typeid:24,uuid:"B4B11BBE-B91C-4C45-BF68-F30793F8FF75"}
 */
function getCustomColumnStyleClass(component) {
	return '';
}

/**
 * Add any custom logic in this method to return a custom style class to be added to the grid
 *
 * @param {JSWebComponent} grid
 * @return {String}
 * @private
 *
 * @properties={typeid:24,uuid:"493CB7D3-BA98-4E1D-9514-CEF420DABA3A"}
 */
function getCustomGridStyleClass(grid) {
	return '';
}

/**
 * Use this method to customize the resulting grid after the form is converted, returns a JSON object with the properties to be set
 *
 * @return {Object}
 * @private
 *
 *  @example
 *  <pre>
 *  return {
 *      showColumnsMenuTab : false,
 *      toolPanelConfig : {
 *          suppressColumnExpandAll: true,
 *          suppressColumnFilter: true,
 *          suppressColumnSelectAll: true,
 *          suppressRowGroups: true,
 *          suppressSideButtons: true
 *      }
 *   }
 *  </pre>
 *
 * @properties={typeid:24,uuid:"3C1CF1B5-7D99-48F2-8B24-CCE4B239B596"}
 */
function getCustomGridProperties() {
	return null;
}

/**
 * @param {JSMethod} method
 * @return {String}
 * @private
 *
 * @properties={typeid:24,uuid:"C66E46B9-30D1-45F4-98C3-820F842BB5E1"}
 */
function getMethodFullyQualifiedName(method) {
	if (!method) {
		return '';
	}

	var scope = method.getScopeName();
	return (scope ? 'scopes.' + scope + '.' : '') + method.getName();
}

/**
 * @return {Array<String>}
 * @private
 *
 * @properties={typeid:24,uuid:"67496C2E-2389-4809-8639-28B8B842C6B7"}
 */
function getAllTableForms() {
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
 * The global method of the valuelist is called to fill in or adjust the values of the valuelist.
 * The method returns a dataset with one or two columns, first column is the display value, second column is real value(if present). The valuelist will be filled in with the dataset data.
 * If second column is not present real value and display value will be the same.
 * The method has to handle three different scenarios:
 * 1. 'displayValue' parameter is not null, this parameter should be used to filter the list of values(in a typeahead fashion)
 * 2. 'realValue' parameter is specified, that means value was not found in current list, so must be specified manually.
 *  In this case method should return only one row in the dataset, with the missing value, that will be added to the valuelist
 * 3. 'realValue' and 'displayValue' are both null , in this case the complete list of values should be returned.
 * Scenario 1 and 3 will completely replace any older results in the valuelist while scenario 2 will append results.
 *
 * @param {String} displayValue The filter string that a user types in a typeahead. Used to filter the valuelist.
 * @param realValue A real value missing from valuelist that needs to be displayed. Method should provide the display value for it.
 * @param {JSRecord} record The current record for the valuelist. (This is the FindRecord in find mode, which is like JSRecord has all the columns/dataproviders, but doesn't have its methods)
 * @param {String} valueListName The valuelist name that triggers the method.
 * @param {Boolean} findMode True if foundset of this record is in find mode
 * @param {Boolean} rawDisplayValue The raw displayValue without being converted to lower case
 *
 * @return {JSDataSet} A dataset with 1 or 2 columns display[,real]. The values will fill in or append the valuelist.
 *
 * @properties={typeid:24,uuid:"6152CF51-346B-4290-BA67-352F4F4A2CDA"}
 */
function getDataSetForTableFormsValueList(displayValue, realValue, record, valueListName, findMode, rawDisplayValue) {
	/** @type  {JSDataSet} */
	var result = databaseManager.createEmptyDataSet(0, 0);
	var tableForms = getAllTableForms();

	if (displayValue != null) {
		tableForms = tableForms.filter(/** @param {String} f */
		function(f) {
			return f.toLowerCase().includes(displayValue);
		});
	} else if (realValue != null) {
		tableForms = [realValue];
	}

	if (tableForms.length) {
		// Truncate the results to 500 records, max supported
		result = databaseManager.convertToDataSet(tableForms.slice(0, 500));
	}

	return result;
}

/**
 * @param {JSComponent} component
 * @private
 *
 * @properties={typeid:24,uuid:"52D7B2CF-2AD6-4041-BA33-80F5AB72A359"}
 */
function setComponentDummyName(component) {
	if (component && !component.name) {
		component.name = 'c' + utils.stringReplace(application.getUUID().toString(), '-', '');
	}
}
