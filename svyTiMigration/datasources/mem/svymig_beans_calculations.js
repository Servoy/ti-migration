/**
 * @properties={type:12,typeid:36,uuid:"C2D958AF-313E-4FF3-B3AB-13D8F0517EFA"}
 */
function short_classname()
{
	if (classname) {
		return classname.split('.').pop();
	}
	return '';
}
