/**
 * @type {plugins.http.HttpClient}
 *
 * @properties={typeid:35,uuid:"9500448D-AA4B-4829-8B34-9F80A15D4EDD",variableType:-4}
 */
var httpClient;

/**
 * @param {JSRecord<mem:migrationFormStats>} record
 *
 * @properties={typeid:24,uuid:"E443F1F8-8B78-47C0-8669-60E26DCB79AF"}
 */
function show(record) {
	if (!record || !databaseManager.hasRecords(record.migrationformstats_to_migrationformonrender)) {
		return;
	}

	// Load a single Form Stat record
	var ds = databaseManager.createEmptyDataSet(0, 1);
	ds.addRow([record.form_name]);
	foundset.loadRecords(ds);
	
	var win = application.createWindow(controller.getName(), JSWindow.MODAL_DIALOG);
	win.setSize(1200,804)
	win.title = 'On Render'
	controller.show(win);
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"05BA3D4E-C059-4353-A0BA-8C240F3DF681"}
 */
function onActionExplainCode(event) {
	var recOnRender = migrationformstats_to_migrationformonrender.getSelectedRecord();
	
	var prompt = "I have this code in my servoy application.\n" +
		"The code is running in the on render event of a form of type table or list view \n" +
		"That form type is no longer supported the version of servoy I use \n" +
		"I converted those forms to a form containing a datagrid component\n" +
		"I need to apply a certain styling to that form so the result will be the same \n" +
		"maybe I need to add a calculated field to the underlying table definition to give me the styling for the specific cell or row\n" +
		"can you explain what the below provided code does and provide the best strategy with code examples on how to achieve this.';\n" +
		"\n" +
		recOnRender.function_code;
		 
	application.output(prompt);
	recOnRender.function_ai_analysis = askOpenAI(prompt);
	
	if (recOnRender.hasChangedData()) {
		databaseManager.saveData(recOnRender);
		
		scopes.svyTiHelper.updateRenderInfo(form_name, migrationformstats_to_migrationformonrender.function_name, recOnRender.function_ai_analysis);
	}
}

/**
 * Ask a question to the OpenAI API
 * 
 * @param {String} question - The question to ask
 * @return {String} - The response from OpenAI
 *
 * @properties={typeid:24,uuid:"C64E75D3-CB9D-4DEE-A09C-E61B5DC66256"}
 */
function askOpenAI(question) {
    // Replace with your actual API key
    var apiKey = '';

    var url = 'https://api.openai.com/v1/chat/completions';
    
    if (!httpClient) {
	    httpClient = plugins.http.createNewHttpClient();
    }
    
    var request = httpClient.createPostRequest(url);
    request.addHeader('Content-Type', 'application/json');
    request.addHeader('Authorization', 'Bearer ' + apiKey);

    var payload = {
        model: 'gpt-4',
        messages: [
            { role: 'user', content: question }
        ]
    };

    request.setBodyContent(JSON.stringify(payload));

    try {
    	plugins.svyBlockUI.show('Analyzing code...');
    	
	    var response = request.executeRequest();
	
	    if (response.getStatusCode() === plugins.http.HTTP_STATUS.SC_OK) {
	    	try {
		        var json = JSON.parse(response.getResponseBody());
		        return json.choices[0].message.content;
	    	} catch (e) {
	    		application.output('Error parsing AI response: ' + e.message + ' - stack: ' + e.stack, LOGGINGLEVEL.ERROR);
	    	}
	    }
	
	    return 'Error: ' + response.getStatusCode() + ' - ' + response.getResponseBody();
    } catch (e) {
    	application.output('Error executing request: ' + e.message + ' - stack: ' + e.stack, LOGGINGLEVEL.ERROR);
    	return 'Error executing request: ' + e.message; 
    }
    finally {
    	plugins.svyBlockUI.stop();
    }
}