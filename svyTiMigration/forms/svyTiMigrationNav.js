
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"62AE11EB-CAC8-4F43-BB1C-42F895E736F6"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		elements.sidenav_2.setSelectedMenuItem('forms')
	}
} 
