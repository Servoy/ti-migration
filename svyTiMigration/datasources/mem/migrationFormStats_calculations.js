/**
 * @properties={type:4,typeid:36,uuid:"62A65A09-37D7-4A85-9F0B-0758E71E079C"}
 */
function onRenderCount()
{
	return utils.hasRecords(migrationformstats_to_migrationformonrender) ? migrationformstats_to_migrationformonrender.getSize() : 0;
}

/**
 * @properties={type:12,typeid:36,uuid:"EDC7FF16-D126-49F1-9938-A3946DD17084"}
 */
function complexityStyleClass() {
	switch (complexity_lvl) {
	case 1:
		return 'btn-label-success'
		break;
	case 2:
		return 'btn-label-info'
		break;
	case 3:
		return 'btn-label-warning'
		break;
	case 4:
		return 'btn-label-danger'
		break;
	default:
		return 'btn-label-default'
		break;
	}
}

/**
 * @properties={type:12,typeid:36,uuid:"A0E5A893-839A-4EF3-A8C1-72A1348E29DB"}
 */
function complexityText() {
	switch (complexity_lvl) {
	case 1:
		return 'Easy'
		break;
	case 2:
		return 'Medium'
		break;
	case 3:
		return 'Hard'
		break;
	case 4:
		return 'Legendary'
		break;
	default:
		return 'Unknown'
		break;
	}
}

/**
 * @properties={type:4,typeid:36,uuid:"A017B30D-7545-4EA2-88CC-7AB204961DEC"}
 */
function isConverted() {
	return conversion_date ? true : false;
}

/**
 * @properties={type:12,typeid:36,uuid:"9DBA161A-8C43-433A-A957-E59B6486BF60"}
 */
function convertFormStyleClass() {
	return isConverted ? '' : 'fa-solid fa-microchip fa-lg clickable';
}

/**
 * @properties={type:12,typeid:36,uuid:"64F881DC-DE06-48B4-89C9-10514E92BE33"}
 */
function convertFormTootip() {
	return conversion_date ? '' : 'Click to convert Form to NG Grid';
}
