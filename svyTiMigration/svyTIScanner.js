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

						var ct = fobj[ (f[j].getName()).split('.frm')[0]].frm.toLowerCase().split(dictionary_frm_events[k].toLowerCase()).length - 1;
						if (ct > 0) {
							if (ctn == 'view:1' || ctn == 'view:4') ctn = 'List View';
							if (ctn == 'view:3') ctn = 'Table View';

							if (!fobj[ (f[j].getName()).split('.frm')[0]].frm_flags) fobj[f[j].getName().split('.frm')[0]].frm_flags = { }
							fobj[ (f[j].getName()).split('.frm')[0]].frm_flags[ctn] = ct;
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
 * @param dir
 * @return
 * @properties={typeid:24,uuid:"BAF0DDDD-C00B-469B-8B93-0FE8A933C57C"}
 */
function scan(dir) {
	var retMsg = '';
	var csv_data = 'Solution;Source;Flag;# times found\n';
	servoySolutions = [];
	servoySolutionsObj = { };
	ignore = ['.git', '.gitignore', '.settings', 'svyUtils', 'svyUtils$Excel', 'svyUtils$customDialogs', 'svyUtils$smartClient', 'svyUtils$tableGrid', 'servoyCommonsExample', 'svy_mod_dialogs'];
	dictionary = [];

	//Deprecated Functionalities
	dictionary = dictionary.concat(['Application.executeProgram', 'Application.beep', 'Application.setStatusText', 'Application.getClipboardString', 'Application.setClipboardContent', 'i18n.setTimeZone', 'application.setToolbarVisible', 'Plugins.window.getMenuBar', 'APPLICATION_TYPES.WEB_CLIENT', 'APPLICATION_TYPES.SMART_CLIENT', 'application.overrideStyle']);

	//Print and Reports
	dictionary = dictionary.concat(['Controller.print', 'Controller.showPrintPreview', 'StartMetaPrintJob', 'EndMetaPrintJob', 'GetPDFPrinter', 'GetPrinters', 'IsLastPrintPreviewPrinted', 'Controller.setPageFormat', 'Controller.setPreferredPrinter', 'DefaultPageFormat', 'Printable']);

	//Java Functions
	dictionary = dictionary.concat(['Packages.java.io.FileOutputStream', 'Packages.java.io.FileInputStream', 'Packages.java.io.File', 'Packages.java.awt.Frame.getFrames', 'Packages.java.awt.Desktop', 'java.awt.Component', 'java.awt.event.KeyListener', 'java.awt.event.MouseListener', 'java.awt.GraphicsEnvironment', 'java.lang.Runtime.getRuntime', 'java.lang.System.gc']);

	//Plugins and working with files
	dictionary = dictionary.concat(['Plugins.busy', 'Plugins.file', 'Plugins.drmaison', 'Plugins.IntegracionEscaner', 'It2be_barcode', 'It2be_calendar', 'Plugins.jasperPluginRMI', 'KeyListeners', 'Popupmenu', 'Popupmenu_ext', 'SerialPort', 'Servoyguy_pdf_pro', 'UserManager', 'Plugins.file.showDirectorySelectDialog', 'Plugins.file.showFileOpenDialog', 'Plugins.file.showFileSaveDialog', 'Plugins.file.write', 'Plugins.file.createFolder']);

	//OnRender Events
	dictionary_frm_events = ['onRender', 'onDrop', 'onDrag', 'onDragOver', 'onCommand']
	dictionary = dictionary.concat(dictionary_frm_events);

	//solution Model
	dictionary = dictionary.concat(['solutionModel']);

	//Beans
	dictionary_beans = ['JProgressBar', 'IT2BeCalendar', 'DatasetGrid', 'InMemDataGrid', 'DnDTreeView', 'TreeView', 'DBTreeView', 'DBTreeTableView', 'JXBrowser', 'JTextField', 'JTextArea'];
	dictionary_frm_events = dictionary_frm_events.concat(dictionary_beans)

	//add views
	dictionary_frm_events = dictionary_frm_events.concat(['view:1', 'view:3', 'view:4']) //table view, list view, list view (locked)

	//Inline html
	dictionary = dictionary.concat(['<html>', '<style>']);
	//	dictionary = [];

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

	//remove forms that don't have any flags
	retMsg += '<p style="font-weight:bold;">SCAN RESULTS : <p><hr>'
	for (i in servoySolutionsObj) {
		//		retMsg += '<hr>'
		retMsg += '<p style="font-weight:bold;">'
		retMsg += 'Solution : ' + servoySolutionsObj[i].name + ''
		var num_forms_check = 0;

		for (f in servoySolutionsObj[i].scopes) {
			if (servoySolutionsObj[i].scopes[f].js_flags) {
				num_forms_check++;
			} else {
				delete servoySolutionsObj[i].scopes[f].js_flags;
			}
		}

		for (var f in servoySolutionsObj[i].forms) {
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
			//			retMsg += '<hr>';

			var flag_ct = 0;
			var list_or_table_ct = 0;
			for (f in servoySolutionsObj[i].scopes) {
				if (servoySolutionsObj[i].scopes[f].js_flags) {
					var ff_obj = { }
					if (!ff_obj[f]) ff_obj[f] = [];
					for (var g in servoySolutionsObj[i].scopes[f].js_flags) {
						if (g == '<style>' || g == '<html>') {
							ff_obj[f].push('HTML inline tag used <b>' + servoySolutionsObj[i].scopes[f].js_flags[g] + '</b> time(s). ');
							csv_data += servoySolutionsObj[i].name + ";" + f + '.js;HTML inline tag used;' + servoySolutionsObj[i].scopes[f].js_flags[g] + ';\n';
						} else {
							ff_obj[f].push(g + ' used <b>' + servoySolutionsObj[i].scopes[f].js_flags[g] + '</b> time(s). ');
							csv_data += servoySolutionsObj[i].name + ";" + f + '.js;' + g + ';' + servoySolutionsObj[i].scopes[f].js_flags[g] + ';\n';
						}
						flag_ct += servoySolutionsObj[i].scopes[f].js_flags[g];
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
					for (g in servoySolutionsObj[i].forms[f].js_flags) {
						if (!ff_obj[f]) ff_obj[f] = [];
						if (g == '<style>' || g == '<html>') {
							ff_obj[f].push('HTML inline tag used <b>' + servoySolutionsObj[i].forms[f].js_flags[g] + '</b> time(s). ');
							csv_data += servoySolutionsObj[i].name + ";" + f + '.js;HTML inline tag used;' + servoySolutionsObj[i].forms[f].js_flags[g] + ';\n';
						} else {
							ff_obj[f].push(g + ' used <b>' + servoySolutionsObj[i].forms[f].js_flags[g] + '</b> time(s). ')
							csv_data += servoySolutionsObj[i].name + ";" + f + '.js;' + g + ';' + servoySolutionsObj[i].forms[f].js_flags[g] + ';\n';
						}

						flag_ct += servoySolutionsObj[i].forms[f].js_flags[g];
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
					for (g in servoySolutionsObj[i].forms[f].frm_flags) {
						if (!ff_obj[f]) ff_obj[f] = [];
						if (g == 'Table View' || g == 'List View') {
							ff_obj[f].push(g + ' found. ');			
							csv_data += servoySolutionsObj[i].name + ";" + f + '.frm;' + g + ';1;\n';
							list_or_table_ct++;
						} else {							
							if (ff_obj[f].indexOf(g) == -1) {
								ff_obj[f].push(g + ' used <b>' + servoySolutionsObj[i].forms[f].frm_flags[g] + '</b> time(s). ');
								csv_data += servoySolutionsObj[i].name + ";" + f + '.frm;' + g + ';' + servoySolutionsObj[i].forms[f].frm_flags[g] + ';\n';
							}
							flag_ct += servoySolutionsObj[i].forms[f].frm_flags[g];
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

		} else {
			//			retMsg += '<hr>'
			retMsg += '<p style="font-weight:bold;color:green;">No flags found!</p>'
		}

		retMsg += '<br><hr>'
		retMsg += '\n'
		retMsg += '\n'

	}	
	return {html:retMsg, csv:csv_data};
}
