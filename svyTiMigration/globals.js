/**
 * @param name
 * @
 *
 * @properties={typeid:24,uuid:"6EEF3F88-4BAD-47FF-AD25-F3B83AC9D9D8"}
 */
function showForm(name) {
	application.executeLater(showFormOnly, 200, [name])
}

/**
 * @properties={typeid:24,uuid:"8493A58C-6E4E-4C0C-91B3-D913F458472A"}
 */
function showFormOnly(name) {
	application.showForm(name + '_OLD');

}