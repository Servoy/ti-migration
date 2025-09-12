/**
 * @properties={typeid:35,uuid:"A2A67B57-12AB-4307-BF69-8793230657B6",variableType:-4}
 */
var edges = [];

/**
 * @properties={typeid:35,uuid:"9679AA13-E8FF-4292-8586-AEF710CE3668",variableType:-4}
 */
var nodes = [];

/**
 * @properties={typeid:35,uuid:"FD6C89CF-E437-4857-A594-44B8EC43EF33",variableType:-4}
 */
var formNames = [];

/**
 * @properties={typeid:24,uuid:"93A4529E-10A5-414A-ABF0-532BD4B29692"}
 */
function getAllFormNames() {
	var r =[]
	var jsf = solutionModel.getForms()
	for (var index = 0; index < jsf.length; index++) {
		r.push(jsf[index].name)
	}
	return r
}


/**
 * @properties={typeid:24,uuid:"D285FB7B-3F95-4815-94B2-2AC7E5D291B3"}
 */
function getFormsCytoJSON() {
	getAllForms();
	
	//scopes.svyTIScanner.scanFormReferences(formNames)
	
	var q = datasources.mem.svymig_scan.createSelect();
	q.result.clear();
	q.result.add(q.columns.feature)
	q.result.add(q.columns.scope)
	
	var ds = q.getDataSet(-1)
	
	for (var i = 1; i <= ds.getMaxRowIndex(); i++) {
		var row = ds.getRowAsArray(i);
		edges.push({
			data: {
				target: row[0],
				source: row[1],
				color: '#00F'
			}
		})
	}
	
	return {
		nodes: nodes,
		edges: edges
	}
}

/**
 * @properties={typeid:24,uuid:"2809D564-6BF2-4953-B62D-EFD281AD3D3F"}
 */
function getScopesCytoJSON() {
	
	var scopeNames = solutionModel.getScopeNames()
	var scopeDictionary = []
	
	var scopeNodes = [];
	var linkNodes = [];
	
	for (var i = 0; i < scopeNames.length; i++) {
		scopeNodes.push( {
			data: {
				id: scopeNames[i],
				name: scopeNames[i],
				color: '#00F'
			}
		})
		scopeDictionary.push('scopes.' + scopeNames[i] + '.')
	}
	
	scopes.svyTIScanner.scanFormReferences(scopeDictionary);

	
	var q = datasources.mem.svymig_scan.createSelect();
	q.result.clear();
	q.result.add(q.columns.feature)
	q.result.add(q.columns.scope)
	
	var ds = q.getDataSet(-1);
	
	for (i = 1; i <= ds.getMaxRowIndex(); i++) {
		var row = ds.getRowAsArray(i);
		linkNodes.push({
			data: {
				target: row[0].replace('scopes.', '').replace('.', ''),
				source: row[1],
				color: '#00F'
			}
		})
	}
	
	return {
		nodes: scopeNodes,
		edges: linkNodes
	}
}

/**
 * @properties={typeid:24,uuid:"9BEAC908-C2F2-4111-A837-F7495B8D48CA"}
 */
function getAllForms() {
	var jsforms = solutionModel.getForms();
	
	nodes = [];
	
	var links = [];
	
	for (var index = 0; index < jsforms.length; index++) {
		var form = jsforms[index].name;
		
		formNames.push(form)
		
		nodes.push({data: {
			id: form,
			name: form,
			color: '#ab8208'
		}})
		
		if (jsforms[index].extendsForm) {
			
			// show extend relationship
			links.push({
				data: {
					source: jsforms[index].extendsForm.name,
					target: form,
					color: '#FF0000'
				}
			})
			
			jsforms[index]
		}
		
		links = links.concat(getFormReferences(form))
	}
	
	edges = links;
}


/**
 * @param formName
 *
 * @properties={typeid:24,uuid:"EEDA1EAB-17FD-4867-A9E6-83913E0105F3"}
 */
function getFormReferences(formName) {
	var jsform = solutionModel.getForm(formName);
	var jstabs = jsform.getTabPanels();

	var links = [];

	for (var i = 0; i < jstabs.length; i++) {
		var jstab = jstabs[i];

		var tabs = jstab.getTabs();
		for (var j = 0; j < tabs.length; j++) {
			var tab = tabs[j];

			if (tab.containsForm) {
				links.push({data: {
					target: tab.containsForm.name,
					source: formName,
					color: '#cccccc'
				}})
			}
		}
	}
	
	// need to get JS references
	
	return links;
}

