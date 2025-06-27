/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"415727C0-C6DB-4763-AA31-2057CC40A0D1"}
 */
function onShow(firstShow, event) {
	foundset.loadAllRecords()
}

/**
 * Called when the mouse is clicked on a row/cell (foundset and column indexes are given).
 * the foundsetindex is always -1 when there are grouped rows
 *
 * @param {Number} foundsetindex
 * @param {Number} [columnindex]
 * @param {JSRecord} [record]
 * @param {JSEvent} [event]
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"668AEDAE-E9CB-4538-A34B-C104BE99520A"}
 */
function onCellClick(foundsetindex, columnindex, record, event) {

	var col = elements.datagrid_7.getColumn(columnindex)
	if (col.id == 'css3') {
		convertStyle(record)
	}
}

/**
 * Fired when the button is clicked.
 *
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"A7AF3958-96B7-438E-AA2B-50090620ABB5"}
 */
function onActionConvertAllStyles(event) {
	for (var i = 1; i <= foundset.getSize(); i++) {
		var record = foundset.getRecord(i);
		convertStyle(record)
	}
	
	scopes.svyStyleConverter.overrideStyle();

}

/**
 * @param record
 *
 * @properties={typeid:24,uuid:"5234E7A7-338B-45FE-8185-D34A3B16233D"}
 */
function convertStyle(record) {
	if (!record.migrated) {
		if (scopes.svyStyleConverter.transformAndSaveCss(record.name)) {
			record.migrated = true;
			databaseManager.saveData();
			scopes.svyStyleConverter.overrideStyle();

		}
	}
}
