/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D817E812-3326-4BBD-A69F-A11DC34D47AA"}
 */
var msg = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C732E2D3-6E51-4DB9-8C2B-E5AF21E5863D"}
 */
var dir = null;


/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"16224AA6-864E-4B06-9138-13D1B13DBD4A"}
 */
function onAction$scan(event) {
	var data = scopes.svyTIScanner.scan(dir);
	msg = '<html><style> .bts-label-text {width:100%};</style> <style>p { margin-bottom: 2px;margin-top: 2px;}</style> <span style="border-radius:10px; padding:2px; border:0px solid gray;overflow-y:scroll;display:block;max-height:calc(100vh - 90px);">'+data.html+'</span></html>'
	
	var tmpdir = Packages.java.lang.System.getProperty("java.io.tmpdir");	
	var f = plugins.file.createFile(tmpdir+'/scan_results.html')	
	plugins.file.appendToTXTFile(f,msg.replace('max-height:calc(100vh - 90px);','').replace('overflow-y:scroll;',''));			
	f.createNewFile();	
	application.showURL(createRemoteFile(f),'_blank');
	
	//csv data
	var f2 = plugins.file.createFile(tmpdir+'/scan_results.csv')
	plugins.file.appendToTXTFile(f2,data.csv);		
	f2.createNewFile();
	application.showURL(createRemoteFile(f2),'_blank');
	
}


/**
 * @param file
 * @return {String}
 * @properties={typeid:24,uuid:"BCCDCC5B-B0E5-4615-9720-FADDE868297D"}
 */
function createRemoteFile(file) {
	var path = "/";
	if (application.getOSName() == 'Linux') {
		/** @type {String} */
		var fileName = file.getPath().split('/');
	} else {
		fileName = file.getPath().split('\\');
	}
	fileName = fileName[fileName.length - 1];
	var remoteFile = plugins.file.convertToRemoteJSFile(path + encodeURIComponent(fileName));
	remoteFile.setBytes(file.getBytes(), true);
	return plugins.file.getUrlForRemoteFile(path + encodeURIComponent(fileName));
}
