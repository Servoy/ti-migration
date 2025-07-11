customProperties:"formComponent:false,\
useCssPosition:true",
encapsulation:108,
items:[
{
cssPosition:"50,-1,-1,20,150,90",
json:{
containedForm:{
border:{

},
count:{
dataProviderID:"countLvl1"
},
countMigrated:{
dataProviderID:"countMigratedLvl1"
},
countMigratedc:{

},
label_24:{

},
svy_form:"F297994F-A022-405C-8203-3B45808CF0B9",
title:{

},
titlec:{

}
},
cssPosition:{
bottom:"-1",
height:"90",
left:"20",
right:"-1",
top:"50",
width:"150"
}
},
name:"lvl1",
typeName:"servoycore-formcomponent",
typeid:47,
uuid:"297CD522-EE4F-480F-BA45-A8287DF3E1A8"
},
{
height:300,
partType:5,
typeid:19,
uuid:"972866DC-A432-4AEC-8BA0-16BC82D09438"
},
{
cssPosition:"50,-1,-1,193,150,90",
json:{
containedForm:{
border:{

},
count:{
dataProviderID:"countLvl2"
},
countMigrated:{
dataProviderID:"countMigratedLvl2"
},
countMigratedc:{

},
label_24:{
styleClass:"default-align bg-info bg-half"
},
svy_form:"F297994F-A022-405C-8203-3B45808CF0B9",
title:{
text:"Medium"
},
titlec:{

}
},
cssPosition:{
bottom:"-1",
height:"90",
left:"193",
right:"-1",
top:"50",
width:"150"
}
},
name:"lvl2",
typeName:"servoycore-formcomponent",
typeid:47,
uuid:"9C386D45-65D0-4CA6-A1DA-F43CBE773793"
},
{
cssPosition:"13,-1,-1,20,354,30",
json:{
cssPosition:{
bottom:"-1",
height:"30",
left:"20",
right:"-1",
top:"13",
width:"354"
},
styleClass:"default-align h4 font-weight-bold",
text:"Grid Migration Status"
},
name:"label_31",
styleClass:"default-align h4 font-weight-bold",
typeName:"bootstrapcomponents-label",
typeid:47,
uuid:"AF272244-3FBF-4DA2-A7CD-9BE0DE6519CE"
},
{
cssPosition:"50,-1,-1,534,150,90",
json:{
containedForm:{
border:{

},
count:{
dataProviderID:"countLvl4"
},
countMigrated:{
dataProviderID:"countMigratedLvl4"
},
countMigratedc:{

},
label_24:{
styleClass:"default-align bg-danger bg-half"
},
svy_form:"F297994F-A022-405C-8203-3B45808CF0B9",
title:{
text:"Legendary"
},
titlec:{

}
},
cssPosition:{
bottom:"-1",
height:"90",
left:"534",
right:"-1",
top:"50",
width:"150"
}
},
name:"lvl4",
typeName:"servoycore-formcomponent",
typeid:47,
uuid:"B4304E75-92BE-4755-8E15-FEF880C22680"
},
{
cssPosition:"50,-1,-1,365,150,90",
json:{
containedForm:{
border:{

},
count:{
dataProviderID:"countLvl3"
},
countMigrated:{
dataProviderID:"countMigratedLvl3"
},
countMigratedc:{

},
label_24:{
styleClass:"default-align bg-warning bg-half"
},
svy_form:"F297994F-A022-405C-8203-3B45808CF0B9",
title:{
text:"Hard"
},
titlec:{

}
},
cssPosition:{
bottom:"-1",
height:"90",
left:"365",
right:"-1",
top:"50",
width:"150"
}
},
name:"lvl3",
typeName:"servoycore-formcomponent",
typeid:47,
uuid:"BE307833-7B5F-4CC8-BA81-DF7595653A86"
},
{
cssPosition:"160,20,20,20,0,0",
json:{
columns:[
{
dataprovider:"form_name",
dndSource:true,
headerTitle:"Form Name",
id:"form_name",
styleClassDataprovider:null,
svyUUID:"413E5A39-AE1A-4AA2-8ECB-4BFE7DA8F756",
tooltip:"form_name"
},
{
autoResize:false,
dataprovider:"form_type",
headerTitle:"Type",
id:"form_type",
styleClassDataprovider:null,
svyUUID:"7258777E-3140-405A-9795-13473E8F36DD",
valuelist:"0DA2D7D9-D78B-46FF-8512-C208A26388B5",
width:150
},
{
autoResize:false,
dataprovider:"body_components_count",
format:"#",
headerTitle:"# Components",
id:"body_components_count",
styleClass:"align-center",
styleClassDataprovider:null,
svyUUID:"B38C500D-5D0A-4599-BE55-FC44CFBC5644",
width:140
},
{
autoResize:false,
dataprovider:"conversion_date",
format:"MM/dd/yy HH:mm",
headerTitle:"Converted On",
id:"conversion_date",
styleClassDataprovider:null,
svyUUID:"2F5DA7DE-A5E0-46C6-8C9A-2C9229042957",
width:170
},
{
autoResize:false,
id:"btnConvert",
styleClass:"align-center",
styleClassDataprovider:"convertFormStyleClass",
svyUUID:"EF50C3C2-9A7D-43BF-B1EF-3FE171CD3C6D",
tooltip:"convertFormTootip",
width:60
},
{
autoResize:false,
dataprovider:"complexityText",
headerTitle:"Complexity",
id:"conversion_date_c",
styleClass:"align-center",
styleClassDataprovider:"complexityStyleClass",
svyUUID:"9C0B2F03-5363-4A81-A6B0-F54FA38D7136",
width:170
},
{
autoResize:false,
dataprovider:"onRenderCount",
headerTitle:"# On Render",
id:"onRenderCount",
styleClass:"align-center clickable",
svyUUID:"74FEC26E-C0D8-42A5-9239-BAA3EA736170",
width:130
},
{
autoResize:false,
id:"btnOpen",
styleClass:"align-center fa-solid fa-up-right-from-square clickable",
svyUUID:"F108A3D4-00FC-4C43-AFCE-4CB0FD5460F6",
tooltip:"openTooltip",
width:60
}
],
cssPosition:{
bottom:"20",
height:"0",
left:"20",
right:"20",
top:"160",
width:"0"
},
myFoundset:{
foundsetSelector:"mem:migrationFormStats",
loadAllRecords:true
},
onCellClick:"59DE2C1B-AC3F-45DC-8154-BD02AB65B9F6",
toolPanelConfig:{
suppressColumnExpandAll:true,
suppressColumnFilter:true,
suppressColumnSelectAll:true,
suppressRowGroups:true,
suppressSideButtons:true,
svyUUID:"667DCDAD-CA54-4BCA-B9FE-A6357D533694"
}
},
name:"formsGrid",
typeName:"aggrid-groupingtable",
typeid:47,
uuid:"F5083BD2-2E40-4372-B4D1-D7322FED2084"
}
],
name:"svyTiMigration$Dashboard",
navigatorID:"-1",
onLoadMethodID:"B2965CBA-4AA0-4374-9FCA-427D83AF7504",
onShowMethodID:"593136E9-96CB-4658-8371-F38B415A1BBA",
showInMenu:true,
size:"800,480",
typeid:3,
uuid:"3CACBCAF-AA44-403A-8B67-0517C515FB60"