/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"8E4DFC53-B443-4EF0-9BBC-42855BCA3FF1",variableType:-4}
 */
var ignore = []

/**
 * @properties={typeid:35,uuid:"D6C2AF7E-6317-4DB5-B684-D4ABB6D93942",variableType:-4}
 */
var servoySolutions = [];

/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"2E30AF47-5761-42B2-8145-1B73AA0CC4D0",variableType:-4}
 */
var dictionary = [];

/**
 * @properties={typeid:35,uuid:"678ACA5B-468B-47B7-9D8E-F7BF7E485BF7",variableType:-4}
 */
var dictionary_frm_events = [];

/**
 * @properties={typeid:35,uuid:"776A3D61-0A4F-49E0-AD57-AAFCCBD49E27",variableType:-4}
 */
var dictionary_beans = [];

/**
 * @properties={typeid:35,uuid:"900CFB4F-3CC8-4774-947C-CF1164610EB5",variableType:-4}
 */
var servoySolutionsObj = { };

/**
 * @properties={typeid:35,uuid:"A0AB5FF2-80EE-474F-90DF-7834E49FE0B1",variableType:-4}
 */
var dictionary_complexity = { }

/**
 * @private
 * @properties={typeid:35,uuid:"C5ED9D93-FF51-47AA-8180-85E335C5C491",variableType:-4}
 */
var cachedFeats = {};

/**
 * @public 
 * @properties={typeid:35,uuid:"74C3BAA2-8C04-43DA-B39B-C5086843F81B",variableType:-4}
 */
var FEATURE_CATEGORIES = {
	DEPRECATED_FUNC : [
	'Application.executeProgram', 
	'Application.beep', 
	'Application.setStatusText', 
	'Application.getClipboardString', 
	'Application.setClipboardContent', 
	'i18n.setTimeZone', 
	'application.setToolbarVisible', 
	'Plugins.window.getMenuBar', 
	'APPLICATION_TYPES.WEB_CLIENT', 
	'APPLICATION_TYPES.SMART_CLIENT', 
	'application.overrideStyle'],
	PRINT: [
	'Controller.print', 
	'Controller.showPrintPreview', 
	'StartMetaPrintJob', 
	'EndMetaPrintJob', 
	'GetPDFPrinter', 
	'GetPrinters', 
	'IsLastPrintPreviewPrinted', 
	'Controller.setPageFormat', 
	'Controller.setPreferredPrinter', 
	'DefaultPageFormat', 
	'Printable'],
	FILE: [
	'Plugins.file.showDirectorySelectDialog', 
	'Plugins.file.showFileOpenDialog', 
	'Plugins.file.showFileSaveDialog', 
	'Plugins.file.write',
	'Plugins.file.writeTXTFile',
	'Plugins.file.read',
	'Plugins.file.readTXTFile', 
	'Plugins.file.createFolder', 
	'Plugins.file'],
	PLUGIN: ['Plugins.busy', 
	'Plugins.drmaison', 
	'Plugins.IntegracionEscaner', 
	'It2be_barcode', 
	'It2be_calendar',
	'It2be_ftp',
	'It2be_exchangews',
	'Plugins.jasperPluginRMI', 
	'KeyListeners', 
	'Popupmenu', 
	'Popupmenu_ext', 
	'SerialPort', 
	'Servoyguy_pdf_pro', 
	'UserManager',
	'MailPro'],
	BEANS: [
	'JProgressBar', 
	'IT2BeCalendar', 
	'DatasetGrid', 
	'InMemDataGrid', 
	'DnDTreeView', 
	'TreeView', 
	'DBTreeView', 
	'DBTreeTableView', 
	'JXBrowser', 
	'JTextField', 
	'JTextArea'],
	JAVA: [
	'Packages.org.mozilla.javascript.continuations', 
	'Packages.javax.print.PrintServiceLookup', 
	'Packages.java.awt.print.PrinterJob', 
	'Packages.javax.swing.text.rtf', 
	'Packages.java.io.FileOutputStream', 
	'Packages.java.io.FileInputStream', 
	'Packages.java.io.File', 
	'Packages.java.awt.Frame.getFrames', 
	'Packages.java.awt.Desktop', 
	'java.awt.Component', 
	'java.awt.event.KeyListener', 
	'java.awt.event.MouseListener', 
	'java.awt.GraphicsEnvironment', 
	'java.lang.Runtime.getRuntime', 
	'java.lang.System.gc',
	'Packages.org.apache.wicket',
	'Packages.org.jose4j.json.internal',
	'Packages.org.jose4j.jwk',
	'Packages.sun.security.x509',
	'Packages.java.security.KeyStore',
	'Packages.java.security',
	'Packages.com.warrenstrange.googleauth',
	'Packages.com.google',
	'Packages.java.',
	'Packages.javax.'],
	SOLUTION_MODEL: [
	'solutionModel.cloneForm', 
	'solutionModel.newForm', 
	'JSForm.LOCKED_TABLE_VIEW', 
	'JSForm.LOCKED_LIST_VIEW', 
	'JSForm.LIST_VIEW', 
	'solutionModel'],
	INLINE_HTML: ['<html>', '<style>', 'javascript:'],
	FORM_EVENT: ['onRender', 'onDrop', 'onDrag', 'onDragOver', 'onCommand'],
	RTF: ['RTF Area'],
	GRID: ['Table View', 'List View']
}


/**
 * @public
 * @return {String}
 *
 *
 * @properties={typeid:24,uuid:"EA9B6BB1-E144-4912-B77A-325681F75C56"}
 */
function getWorkspacePath() {
    var workspacePath = java.lang.System.getProperty("osgi.instance.area");
    //Can't use scopes.svySystem.. that is also controlled by browser
    if (/Windows/.test(application.getOSName())) {
        return workspacePath.substr(6, workspacePath.length);
    } else {
        return workspacePath.substr(5, workspacePath.length);
    }
}

/**
 * @return {String}
 * @properties={typeid:24,uuid:"E25113B1-A42A-47B7-830A-3DC86AC2D837"}
 */
function getFileSeperator()
{
	return java.io.File.separator;
}

/**
 * @properties={typeid:24,uuid:"DB14E1A5-3233-44D6-BB30-87C631D65B2F"}
 */
function showScan() {
	application.showForm(forms.svyTIScanner)
}

/**
 * Check if the directory we are looking at is a Servoy Solution
 * @properties={typeid:24,uuid:"5A16D3B5-3109-40EB-88BE-84169BD1516E"}
 */
function checkServoyDirSolution(dir) {
	var d = plugins.file.getFolderContents(dir)
	for (var i = 0; i < d.length; i++) {
		if (d[i].getName() == 'rootmetadata.obj') {
			servoySolutions.push(dir)
			servoySolutionsObj[dir.getName()] = { name: dir.getName(), forms: { }, scopes: [], datasources: { } };
			break;
			//			application.output('found Servoy solution ' + dir)
		}
	}
}

/**
 * @return {{header:{frm_elements:Array<Object>},body:{frm_elements:Array<Object>},footer:{frm_elements:Array<Object>}}}
 * @properties={typeid:24,uuid:"1C7771BF-9746-4D01-B255-0AC4021812E8"}
 */
function getFormJSON(frm_data) {	
	//if we have a table view, try to identify how many fields are part of body
	var json_data_parts = { header: { frm_elements: [] }, footer: { frm_elements: [] }, body: { frm_elements: [] } };
	try {
//		frm_data = '[' + frm_data.substring(frm_data.indexOf('[') + 1, frm_data.lastIndexOf(']') - 1) + ']'
		frm_data = '{' + frm_data + '}';
//		application.output(frm_data)
		frm_data = frm_data.replace(/:",/g, '",').replace(/[\n\r\t]/gm, "");
		frm_data = frm_data.replace(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g, '$1"$3":');
		frm_data = frm_data.replace(/\\/g, "\\\\");
		
		/** @type {Array<Object>} */
		var frm_object = JSON.parse(frm_data);
		var fp = frm_object.items;
		
		//get title,foot,body parts of elements (important for table views)
		for (var i = 0; i < fp.length; i++) {
			if (fp[i].partType) {
				if (fp[i].partType == 1) {
					json_data_parts.header = fp[i];
					json_data_parts.header.frm_elements = [];
				}
				if (fp[i].partType == 5) {
					json_data_parts.body = fp[i];
					json_data_parts.body.frm_elements = [];
				}
				if (fp[i].partType == 8) {
					json_data_parts.footer = fp[i];
					json_data_parts.footer.frm_elements = [];
				}
			}
		}
		var hy = json_data_parts.header.height;
		var by = json_data_parts.body.height;
		var fy = json_data_parts.footer.height;
		for (i = 0; i < fp.length; i++) {
			if (!fp[i].partType) {
				//				application.output(fp[i].location)
				var ly = 0;
				if (fp[i].location) {
					ly = Number(fp[i].location.split(',')[1]);
				}
				var sh = 20;
				if (fp[i].size) {
					sh = fp[i].size.split(',')[1];
				}
				//check if element is part of header footer or body
				//check if part of header
				if ( ( (hy - ly) - sh) >= 0) {
					json_data_parts.header.frm_elements.push( (fp[i]))
					continue;
				}

				if ( ( (by - ly) - sh) >= 0) {
					json_data_parts.body.frm_elements.push( (fp[i]))
					continue;
				}

				if ( ( (fy - ly) - sh) >= 0) {
					json_data_parts.footer.frm_elements.push( (fp[i]))
					continue;
				}
			}
		}

	} catch (e) {		
		application.output(e);
		return json_data_parts;
	}
	
	return json_data_parts;
}

/**
 * Get forms from a solution
 * @properties={typeid:24,uuid:"8767282A-892E-4E63-A30D-9780890A6274"}
 */
function getStructure(dir) {
	var d = plugins.file.getFolderContents(dir)
	for (var i = 0; i < d.length; i++) {
		//get forms
		if (d[i].getName() == 'forms') {
			var f = plugins.file.getFolderContents(d[i])
			var fobj = servoySolutionsObj[dir.getName()].forms;
			for (var j = 0; j < f.length; j++) {
				if (f[j].getName().includes('.frm')) {
					if (!fobj[ (f[j].getName()).split('.frm')[0]]) {
						fobj[ (f[j].getName()).split('.frm')[0]] = { };
					}
					fobj[ (f[j].getName()).split('.frm')[0]].frm = plugins.file.readTXTFile(f[j]);
					for (var k = 0; k < dictionary_frm_events.length; k++) {
						var ctn = dictionary_frm_events[k];
						var tbl_cols = 0; //if we have a table view, count num of cols
						var ct = fobj[ (f[j].getName()).split('.frm')[0]].frm.toLowerCase().split(dictionary_frm_events[k].toLowerCase()).length - 1;
						if (ct > 0) {
							if (ctn == 'view:1' || ctn == 'view:4') ctn = 'List View';
							if (ctn == 'view:3') {
								ctn = 'Table View';
								var num_of_table_columns = getFormJSON(fobj[ (f[j].getName()).split('.frm')[0]].frm).body.frm_elements.length																
								tbl_cols = num_of_table_columns;
							}
							if (ctn == 'displayType:7') ctn = 'RTF Area'

							if (!fobj[ (f[j].getName()).split('.frm')[0]].frm_flags) fobj[f[j].getName().split('.frm')[0]].frm_flags = { }
							fobj[ (f[j].getName()).split('.frm')[0]].frm_flags[ctn] = ct;
							if (tbl_cols) {
								fobj[ (f[j].getName()).split('.frm')[0]].frm_flags['columns'] = tbl_cols;
							}
						}
					}
				}

				if (f[j].getName().includes('.js')) {
					if (!fobj[ (f[j].getName()).split('.js')[0]]) {
						fobj[ (f[j].getName()).split('.js')[0]] = { }
					}
					fobj[ (f[j].getName()).split('.js')[0]].js = plugins.file.readTXTFile(f[j]);
					var js = fobj[ (f[j].getName()).split('.js')[0]].js;
					for (k = 0; k < dictionary.length; k++) {
						ctn = dictionary[k];
						ct = js.toLowerCase().split(dictionary[k].toLowerCase()).length - 1;
						if (ct > 0) {
							if (!fobj[f[j].getName().split('.js')[0]].js_flags) fobj[f[j].getName().split('.js')[0]].js_flags = { }
							fobj[f[j].getName().split('.js')[0]].js_flags[ctn] = ct;
						}
					}
					fobj[f[j].getName().split('.js')[0]].js_lines = fobj[f[j].getName().split('.js')[0]].js.split('\n').length;
				}
			}
		}
		//get scopes
		var sobj = servoySolutionsObj[dir.getName()].scopes
		if (d[i].getName().includes('.js')) {
			if (!sobj[ (d[i].getName()).split('.js')[0]]) {
				sobj[ (d[i].getName()).split('.js')[0]] = { };
				sobj[ (d[i].getName()).split('.js')[0]].js = plugins.file.readTXTFile(d[i]);

				js = sobj[ (d[i].getName()).split('.js')[0]].js;
				for (k = 0; k < dictionary.length; k++) {
					ctn = dictionary[k];
					ct = js.toLowerCase().split(dictionary[k].toLowerCase()).length - 1;
					if (ct > 0) {
						if (!sobj[d[i].getName().split('.js')[0]].js_flags) sobj[d[i].getName().split('.js')[0]].js_flags = { }
						sobj[d[i].getName().split('.js')[0]].js_flags[ctn] = ct;
					}
				}

				sobj[d[i].getName().split('.js')[0]].js_lines = sobj[d[i].getName().split('.js')[0]].js.split('\n').length;
			}
		}

		//get datasources
		if (d[i].getName() == 'datasources') {
			f = plugins.file.getFolderContents(d[i])
			for (j = 0; j < f.length; j++) {
				var fj = plugins.file.getFolderContents(f[j])
				if (!servoySolutionsObj[dir.getName()].datasources[f[j].getName()]) {
					servoySolutionsObj[dir.getName()].datasources[f[j].getName()] = { }
				}
				var dsObj = servoySolutionsObj[dir.getName()].datasources[f[j].getName()];
				if (!dsObj.calcs) dsObj.calcs = { };
				if (!dsObj.tbl) dsObj.tbl = { };
				for (k = 0; k < fj.length; k++) {
					if (fj[k].getName().includes('_calculations.js'))
						dsObj.calcs[fj[k].getName().split('_calculations.js')[0]] = plugins.file.readTXTFile(fj[k]);
					if (fj[k].getName().includes('.tbl'))
						dsObj.tbl[fj[k].getName().split('.tbl')[0]] = plugins.file.readTXTFile(fj[k]);
				}
			}
		}
	}
}
/**
 * @param [dir] use default workspace if not specified
 * @return {{html:String, csv:String}}
 * @properties={typeid:24,uuid:"BAF0DDDD-C00B-469B-8B93-0FE8A933C57C"}
 */
function scan(dir) {
	
	if (!dir) dir = getWorkspacePath();

	var dataset = databaseManager.createEmptyDataSet(0, ['solution', 'scope', 'feature', 'complexity', 'scopetype', 'featuretype', 'feature_count']);

	var totalsObj = { num_of_tables_or_lists: 0, num_of_forms: 0, num_of_scopes: 0, total_num_flags: 0, complexity_low: 0, complexity_medium: 0, complexity_high: 0, complexity_blocker: 0 }
	var retMsg = '';
	var csv_data = 'Solution;Source;Flag;# times found;complexity;notes\n';
	servoySolutions = [];
	servoySolutionsObj = { };
	ignore = ['.git', '.gitignore', '.settings', 'svyTiMigration', 'svyUtils', 'svyUtils$Excel', 'svyUtils$customDialogs', 'svyUtils$smartClient', 'svyUtils$tableGrid', 'servoyCommonsExample', 'svy_mod_dialogs'];
	dictionary = [];

	//Deprecated Functionalities
	dictionary = dictionary.concat(FEATURE_CATEGORIES.DEPRECATED_FUNC)
	//(['Application.executeProgram', 'Application.beep', 'Application.setStatusText', 'Application.getClipboardString', 'Application.setClipboardContent', 'i18n.setTimeZone', 'application.setToolbarVisible', 'Plugins.window.getMenuBar', 'APPLICATION_TYPES.WEB_CLIENT', 'APPLICATION_TYPES.SMART_CLIENT', 'application.overrideStyle']); //blockers

	//Print and Reports
	dictionary = dictionary.concat(FEATURE_CATEGORIES.PRINT)
		//['Controller.print', 'Controller.showPrintPreview', 'StartMetaPrintJob', 'EndMetaPrintJob', 'GetPDFPrinter', 'GetPrinters', 'IsLastPrintPreviewPrinted', 'Controller.setPageFormat', 'Controller.setPreferredPrinter', 'DefaultPageFormat', 'Printable']); //blocker

	//Java Functions
	dictionary = dictionary.concat(FEATURE_CATEGORIES.JAVA)
		//['Packages.java.io.FileOutputStream', 'Packages.java.io.FileInputStream', 'Packages.java.io.File', 'Packages.java.awt.Frame.getFrames', 'Packages.java.awt.Desktop', 'java.awt.Component', 'java.awt.event.KeyListener', 'java.awt.event.MouseListener', 'java.awt.GraphicsEnvironment', 'java.lang.Runtime.getRuntime', 'java.lang.System.gc']); //high complexity

	//Plugins and working with files
	dictionary = dictionary.concat(FEATURE_CATEGORIES.PLUGIN)
	dictionary = dictionary.concat(FEATURE_CATEGORIES.FILE)
		//['Plugins.busy', 'Plugins.file', 'Plugins.drmaison', 'Plugins.IntegracionEscaner', 'It2be_barcode', 'It2be_calendar', 'Plugins.jasperPluginRMI', 'KeyListeners', 'Popupmenu', 'Popupmenu_ext', 'SerialPort', 'Servoyguy_pdf_pro', 'UserManager', 'Plugins.file.showDirectorySelectDialog', 'Plugins.file.showFileOpenDialog', 'Plugins.file.showFileSaveDialog', 'Plugins.file.write','Plugins.file.writeTXTFile','Plugins.file.read','Plugins.file.readTXTFile', 'Plugins.file.createFolder']); //high complexity

	//OnRender Events
	dictionary_frm_events = FEATURE_CATEGORIES.FORM_EVENT //low complexity
	dictionary = dictionary.concat(dictionary_frm_events);

	//solution Model
	dictionary = dictionary.concat(FEATURE_CATEGORIES.SOLUTION_MODEL); //high complexity

	//Beans
	dictionary_beans = FEATURE_CATEGORIES.BEANS//['JProgressBar', 'IT2BeCalendar', 'DatasetGrid', 'InMemDataGrid', 'DnDTreeView', 'TreeView', 'DBTreeView', 'DBTreeTableView', 'JXBrowser', 'JTextField', 'JTextArea']; //high complexity
	dictionary_frm_events = dictionary_frm_events.concat(dictionary_beans)

	//add views
	dictionary_frm_events = dictionary_frm_events.concat(['view:1', 'view:3', 'view:4', 'displayType:7']) //table view, list view, list view (locked) low complexity

	//Inline html
	dictionary = dictionary.concat(FEATURE_CATEGORIES.INLINE_HTML); //medium complexity

	function updateComplexity(v, marker_obj, tally_obj) {
		var ct = marker_obj[v]
		//		application.output('update complexity:' + v)
		var dict_complexity = {
			low: ['Table View', 'List View'],

			medium: ['HTML inline tag used', '<html>', '<style>', 'onRender', 'onDrop', 'onDrag', 'onDragOver', 'onCommand'],

			high: ['JProgressBar', 'IT2BeCalendar', 'DatasetGrid', 'InMemDataGrid', 'DnDTreeView', 'TreeView', 'DBTreeView', 'DBTreeTableView', 'JXBrowser', 'JTextField', 'JTextArea', 'Plugins.busy', 'Plugins.file', 'Plugins.drmaison', 'Plugins.IntegracionEscaner', 'It2be_barcode', 'It2be_calendar', 'Plugins.jasperPluginRMI', 'KeyListeners', 'Popupmenu', 'Popupmenu_ext', 'SerialPort', 'Servoyguy_pdf_pro', 'UserManager', 'Plugins.file.showDirectorySelectDialog', 'Plugins.file.showFileOpenDialog', 'Plugins.file.showFileSaveDialog', 'Plugins.file.write', 'Plugins.file.createFolder', 'solutionModel', 'Packages.java.io.FileOutputStream', 'Packages.java.io.FileInputStream', 'Packages.java.io.File', 'Packages.java.awt.Frame.getFrames', 'Packages.java.awt.Desktop', 'java.awt.Component', 'java.awt.event.KeyListener', 'java.awt.event.MouseListener', 'java.awt.GraphicsEnvironment', 'java.lang.Runtime.getRuntime', 'java.lang.System.gc'],

			blocker: ['Controller.print', 'Controller.showPrintPreview', 'StartMetaPrintJob', 'EndMetaPrintJob', 'GetPDFPrinter', 'GetPrinters', 'IsLastPrintPreviewPrinted', 'Controller.setPageFormat', 'Controller.setPreferredPrinter', 'DefaultPageFormat', 'Printable', 'Application.executeProgram', 'Application.beep', 'Application.setStatusText', 'Application.getClipboardString', 'Application.setClipboardContent', 'i18n.setTimeZone', 'application.setToolbarVisible', 'Plugins.window.getMenuBar', 'APPLICATION_TYPES.WEB_CLIENT', 'APPLICATION_TYPES.SMART_CLIENT', 'application.overrideStyle']

		};

		if (v == 'Table View') {

			if (marker_obj.columns >= 20) {
				tally_obj.complexity_high += ct;
				return 'high';
			}

			if (marker_obj.columns >= 10) {
				tally_obj.complexity_medium += ct;
				return 'high';
			}

			tally_obj.complexity_low += ct;
			return 'low';

		}
		if (dict_complexity.low.indexOf(v) != -1) {
			tally_obj.complexity_low += ct;
			return 'low';
		}
		if (dict_complexity.medium.indexOf(v) != -1) {
			tally_obj.complexity_medium += ct;
			return 'medium';
		}
		if (dict_complexity.high.indexOf(v) != -1) {
			tally_obj.complexity_high += ct;
			return 'high';
		}
		if (dict_complexity.blocker.indexOf(v) != -1) {
			tally_obj.complexity_blocker += ct;
			return 'blocker';
		}
		return 'unknown'
	}

	function getNotes(v) {
		//		application.output(v);
		switch (v) {
		case '<html>':
			return 'Need to review usage.';
		case 'onRender':
			return 'Must be rewritten as on Render no longer supported.'
		case 'Table View':
			return 'Need to be converted as this view no longer supported.  Complexity increases with number of fields/columns on form.'
		case 'List View':
			return 'Need to be converted as this view no longer supported.  Complexity increases with number of fields/columns on form.'
		case 'Plugins.file':
			return 'Depending on usage we may need to rewrite code.  If server side use only then should be less complex.'
		case 'Plugins.file.write':
			return 'Depending on usage we may need to rewrite code.  If server side use only then should be less complex.'
		case 'Plugins.file.showFileOpenDialog':
			return 'Good chance we may need to rewrite code or use different component'
		case 'Plugins.file.createFolder':
			return 'Depending on usage we may need to rewrite code.  If server side use only then should be less complex.  Watch out for references to directories that no longer exist etc...'
		case 'APPLICATION_TYPES.WEB_CLIENT':
			return 'No longer supported.  Must Review references and likely update code.'
		case 'APPLICATION_TYPES.SMART_CLIENT':
			return 'No longer supported.  Must Review references and likely update code.'
		case 'Plugins.window.getMenuBar':
			return 'No longer supported.  Must Review references and likely update code.'
		case 'Plugins.jasperPluginRMI':
			return 'Need to review plugin versions and also reports to make sure compatible.'
		case 'i18n.setTimeZone':
			return 'Need to review code/use as this is not applicable in newer clients.'
		case 'solutionModel':
			return 'Need to review code/use closely if it interacts with elements, likely need to update code.'
		default:
			break;
		}
		return '';
	}

	//scan first for servoy solutions
	var d = plugins.file.getFolderContents(dir)
	for (var i = 0; i < d.length; i++) {
		if (ignore.indexOf(d[i].getName()) == -1) {
			if (d[i].isDirectory()) {
				checkServoyDirSolution(d[i]);
			}
		}
	}

	//parse Servoy solutions
	for (var j = 0; j < servoySolutions.length; j++) {
		//		application.output(servoySolutions[j]);
		getStructure(servoySolutions[j]);
		//		break;
	}

	var solutionName;
	var scopeName;
	var scopeType;
	var featureName;
	var weight;

	//remove forms that don't have any flags
	retMsg += '<p style="font-weight:bold;">SCAN RESULT DETAILS : <p><hr>'
	for (i in servoySolutionsObj) {
		//		retMsg += '<hr>'

		solutionName = servoySolutionsObj[i].name;
		retMsg += '<p style="font-weight:bold;">'
		retMsg += 'Solution : ' + solutionName + ''
		var num_forms_check = 0;

		for (f in servoySolutionsObj[i].scopes) {
			totalsObj.num_of_scopes++;
			if (servoySolutionsObj[i].scopes[f].js_flags) {
				num_forms_check++;
			} else {
				delete servoySolutionsObj[i].scopes[f].js_flags;
			}
		}

		for (var f in servoySolutionsObj[i].forms) {
			totalsObj.num_of_forms++;
			if (servoySolutionsObj[i].forms[f].js_flags) {
				num_forms_check++;
			} else {
				delete servoySolutionsObj[i].forms[f].js_flags;
			}

			if (servoySolutionsObj[i].forms[f].frm_flags) {
				num_forms_check++;
			} else {
				delete servoySolutionsObj[i].forms[f].frm_flags;
			}
		}
		if (num_forms_check > 0) {

			var flag_ct = 0;
			var list_or_table_ct = 0;

			// check scopes
			for (f in servoySolutionsObj[i].scopes) {
				if (servoySolutionsObj[i].scopes[f].js_flags) {
					var ff_obj = { }
					if (!ff_obj[f]) ff_obj[f] = [];

					// set scopeName
					scopeName = f;
					scopeType = 'scopes';

					for (var g in servoySolutionsObj[i].scopes[f].js_flags) {
						var _cc = updateComplexity(g, servoySolutionsObj[i].scopes[f].js_flags, totalsObj)
						var notes = getNotes(g)
						if (g == '<style>' || g == '<html>') {
							ff_obj[f].push('HTML inline tag used <b>' + servoySolutionsObj[i].scopes[f].js_flags[g] + '</b> time(s). ');
							csv_data += servoySolutionsObj[i].name + ";" + f + '.js;HTML inline tag used;' + servoySolutionsObj[i].scopes[f].js_flags[g] + ';' + _cc + ';' + notes + '\n';
						} else {
							ff_obj[f].push(g + ' used <b>' + servoySolutionsObj[i].scopes[f].js_flags[g] + '</b> time(s). ');
							csv_data += servoySolutionsObj[i].name + ";" + f + '.js;' + g + ';' + servoySolutionsObj[i].scopes[f].js_flags[g] + ';' + _cc + ';' + notes + '\n';
						}
						flag_ct += servoySolutionsObj[i].scopes[f].js_flags[g];

						featureName = g;
						weight = _cc;
						dataset.addRow([solutionName, scopeName, featureName, weight, scopeType, getFeatureCategory(featureName), servoySolutionsObj[i].scopes[f].js_flags[g]])
					}
					for (var h in ff_obj) {
						retMsg += '<p><span style="color:teal">' + f + '.js</span> | '
						for (var l = 0; l < ff_obj[h].length; l++) {
							retMsg += ff_obj[h][l];
						}
						retMsg += '</p>'
					}
				}
			}

			for (f in servoySolutionsObj[i].forms) {
				ff_obj = { }
				if (servoySolutionsObj[i].forms[f].js_flags) {

					// set scopeName
					scopeName = f;
					scopeType = 'form.js';

					for (g in servoySolutionsObj[i].forms[f].js_flags) {
						_cc = updateComplexity(g, servoySolutionsObj[i].forms[f].js_flags, totalsObj);
						notes = getNotes(g)
						if (!ff_obj[f]) ff_obj[f] = [];
						if (g == '<style>' || g == '<html>') {
							ff_obj[f].push('HTML inline tag used <b>' + servoySolutionsObj[i].forms[f].js_flags[g] + '</b> time(s). ');
							csv_data += servoySolutionsObj[i].name + ";" + f + '.js;HTML inline tag used;' + servoySolutionsObj[i].forms[f].js_flags[g] + ';' + _cc + ';' + notes + '\n';
						} else {
							ff_obj[f].push(g + ' used <b>' + servoySolutionsObj[i].forms[f].js_flags[g] + '</b> time(s). ')
							csv_data += servoySolutionsObj[i].name + ";" + f + '.js;' + g + ';' + servoySolutionsObj[i].forms[f].js_flags[g] + ';' + _cc + ';' + notes + '\n';
						}

						flag_ct += servoySolutionsObj[i].forms[f].js_flags[g];

						featureName = g;
						weight = _cc;
						dataset.addRow([solutionName, scopeName, featureName, weight, scopeType, getFeatureCategory(featureName), servoySolutionsObj[i].forms[f].js_flags[g]])
					}
					for (h in ff_obj) {
						retMsg += '<p><span style="color:teal">' + f + '.js</span> | '
						for (l = 0; l < ff_obj[h].length; l++) {
							retMsg += ff_obj[h][l];
						}
						retMsg += '</p>'
					}
				}

				if (servoySolutionsObj[i].forms[f].frm_flags) {
					ff_obj = { }
					scopeName = f;
					scopeType = 'form.frm'
					for (g in servoySolutionsObj[i].forms[f].frm_flags) {
						if (g != 'columns') {
							notes = getNotes(g)
							_cc = updateComplexity(g, servoySolutionsObj[i].forms[f].frm_flags, totalsObj)
							if (!ff_obj[f]) ff_obj[f] = [];
							if (g == 'Table View' || g == 'List View') {
								ff_obj[f].push(g + ' found. ');
								csv_data += servoySolutionsObj[i].name + ";" + f + '.frm;' + g + ';1;' + _cc + ';' + notes + '\n';
								list_or_table_ct++;
							} else {
								if (ff_obj[f].indexOf(g) == -1) {
									ff_obj[f].push(g + ' used <b>' + servoySolutionsObj[i].forms[f].frm_flags[g] + '</b> time(s). ');
									csv_data += servoySolutionsObj[i].name + ";" + f + '.frm;' + g + ';' + servoySolutionsObj[i].forms[f].frm_flags[g] + ';' + _cc + ';' + notes + '\n';
								}
								flag_ct += servoySolutionsObj[i].forms[f].frm_flags[g];
							}

							featureName = g;
							weight = _cc;
							dataset.addRow([solutionName, scopeName, featureName, weight, scopeType, getFeatureCategory(featureName), servoySolutionsObj[i].forms[f].frm_flags[g]])
						}
					}

					for (h in ff_obj) {
						retMsg += '<p><span style="color:teal">' + f + '.frm</span> | '
						for (l = 0; l < ff_obj[h].length; l++) {
							retMsg += ff_obj[h][l];
						}
						retMsg += '</p>'
					}

				}
			}

			retMsg += '<p style="font-weight:bold;color:red;">Number of Forms or Script with flags found : ' + num_forms_check + '</p>';
			if (list_or_table_ct > 0) {
				retMsg += '<p style="font-weight:bold;color:red;">Total Number of List or Table Views found : ' + list_or_table_ct + '</p>'
			}
			retMsg += '<p style="font-weight:bold;color:red;">Total Number of flags found : ' + flag_ct + '</p>'

			totalsObj.total_num_flags += flag_ct;
			totalsObj.total_num_flags += list_or_table_ct;
			totalsObj.num_of_tables_or_lists += list_or_table_ct;
		} else {
			retMsg += '<p style="font-weight:bold;color:green;">No flags found!</p>'
		}

		retMsg += '<br><hr>'
		retMsg += '\n'
		retMsg += '\n'

	}

	//get summary
	var ret_front = '';
	ret_front += '<p style="font-weight:bold;">SCAN RESULT SUMMARY : <p><hr>';
	ret_front += '<p style="font-weight:bold;color:teal;">Total number of low complexity items: ' + totalsObj.complexity_low + '</p>'
	ret_front += '<p style="font-weight:bold;color:#835501;">Total number of medium complexity items: ' + totalsObj.complexity_medium + '</p>'
	ret_front += '<p style="font-weight:bold;color:#ff7600;">Total number of high complexity items: ' + totalsObj.complexity_high + '</p>'
	ret_front += '<p style="font-weight:bold;color:red;">Total number of blocking complexity items: ' + totalsObj.complexity_blocker + '</p>'
	ret_front += '<p style="font-weight:bold;color:gray;">Total number of items flagged: ' + totalsObj.total_num_flags + '</p>'
	ret_front += '<p style="font-weight:bold;color:gray;">Total number of forms to be converted: ' + totalsObj.num_of_forms + '</p>'
	ret_front += '<p style="font-weight:bold;color:gray;">Total number of table/list views to be converted: ' + totalsObj.num_of_tables_or_lists + '</p>'
	ret_front += '<p style="font-weight:bold;color:gray;">Total number of scopes to be converted: ' + totalsObj.num_of_scopes + '</p>'
	ret_front += '<hr>'
	retMsg = ret_front + retMsg;

	dataset.createDataSource('svymig_scan');

	return { html: retMsg, csv: csv_data };
}

/**
 * @private
 * @param {String} feature
 * 
 * @return {String}
 *
 * @properties={typeid:24,uuid:"A2D19A3C-4A87-4789-A00F-044B04A7A7D9"}
 */
function getFeatureCategory(feature) {
	
	if (cachedFeats[feature]) {
		return cachedFeats[feature]
	}
	
	for ( var key in FEATURE_CATEGORIES ) {
		if (FEATURE_CATEGORIES[key].includes(feature)) {
			cachedFeats[feature] = key;
			return key;
		}
	}
	return null;
}
