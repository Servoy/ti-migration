/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C975622F-940F-431B-AAB3-05FAC7F2C9AA"}
 */
var msg = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"55484F2C-0856-489B-9CF7-F29040E1D871"}
 */
var dir = scopes.svyTIScanner.getWorkspacePath();

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"576DEA2B-E32C-4E11-877F-20203D88DF78"}
 */
function onAction$scan(event) {
	var data = scopes.svyTIScanner.scan(dir); 
//	return;
	msg = '<html><style> .bts-label-text {width:100%};</style> <style>p { margin-bottom: 2px;margin-top: 2px;}</style> <span style="border-radius:10px; padding:2px; border:0px solid gray;overflow-y:scroll;display:block;max-height:calc(100vh - 90px);">' + data.html + '</span></html>'	
	var tmpdir = Packages.java.lang.System.getProperty("java.io.tmpdir");
	var f = plugins.file.createFile(tmpdir + '/scan_results.html')
	plugins.file.writeTXTFile(f, msg.replace('max-height:calc(100vh - 90px);', '').replace('overflow-y:scroll;', ''));
	f.createNewFile();
	application.showURL(createRemoteFile(f), '_blank');

	//csv data
	var f2 = plugins.file.createFile(tmpdir + '/scan_results.csv')
	plugins.file.writeTXTFile(f2, data.csv);
	f2.createNewFile();
	application.showURL(createRemoteFile(f2), '_blank');
}

/**
 * @param file
 * @return {String}
 * @properties={typeid:24,uuid:"B38B35EC-FCF8-439B-8FC2-BE53E1AE4250"}
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
