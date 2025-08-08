customProperties:"formComponent:false,\
useCssPosition:true",
encapsulation:108,
items:[
{
cssPosition:"5,10,-1,-1,50,50",
json:{
cssPosition:{
bottom:"-1",
height:"50",
left:"-1",
right:"10",
top:"5",
width:"50"
},
imageStyleClass:"fa-brands fa-searchengin fa-xl",
styleClass:"btn btn-warning btn-round",
toolTipText:"Scan Workspace"
},
name:"button_3",
styleClass:"btn btn-warning btn-round",
typeName:"bootstrapcomponents-button",
typeid:47,
uuid:"038B7260-1C68-4A47-896C-859B732A2939"
},
{
height:480,
partType:5,
typeid:19,
uuid:"3F5412DC-6BEE-42BA-90DE-E417B6531B91"
},
{
cssPosition:"60,0,0,0,0,0",
json:{
containedForm:"99C40B9D-F32A-4C9D-8F33-7EE789778700",
cssPosition:{
bottom:"0",
height:"0",
left:"0",
right:"0",
top:"60",
width:"0"
},
menu:[
{
formName:"96920C1A-2876-4F08-B1ED-D6F1C2D647A6",
iconStyleClass:"fa-solid fa-earth-america",
id:"general",
svyUUID:"B74FFB47-70BF-4A10-B5DE-5A6C83A29417",
text:"General"
},
{
formName:"99C40B9D-F32A-4C9D-8F33-7EE789778700",
iconStyleClass:"fa-brands fa-html5",
id:"forms",
svyUUID:"7B93FBB3-D8D1-498D-ACAB-A0462AE29C52",
text:"Forms Elements"
},
{
formName:"55314C91-5E11-4A5C-943F-8196D4414F64",
iconStyleClass:"fa-brands fa-css3",
id:"style",
svyUUID:"22A52E2F-C6D5-420F-8355-1CBBC2CBAD2F",
text:"Styles"
},
{
id:"divider1",
isDivider:true,
svyUUID:"E435E15E-7205-4E11-ABE8-66B1FE80443B"
},
{
id:"divider2",
isDivider:true,
svyUUID:"E3CFDBD7-BDAF-46FD-B4C6-22046232B42A"
},
{
formName:"D21DB784-F80F-4CA6-B0EF-5363ECE926AF",
iconStyleClass:"fa-brands fa-html5",
id:"uiscan",
svyUUID:"3E203E5D-3CB6-4B6C-BD38-1AD730881973",
text:"UI Scan"
},
{
formName:"A120D542-B168-4857-B17C-F51D960128D1",
iconStyleClass:"fa-solid fa-print",
id:"printscan",
svyUUID:"6A3324D2-6251-4C70-B692-B8AE019DE801",
text:"Prints"
},
{
formName:"822AF46E-A0E1-4328-AE39-4CBF83B6440E",
iconStyleClass:"fa-regular fa-file-code",
id:"scriptscan",
svyUUID:"F2E385DA-1DB0-451D-B135-F620A5422FD3",
text:"Script"
},
{
isDivider:true,
svyUUID:"243C63F2-30CE-4251-9A7F-9AFB783415BD"
},
{
formName:"CBB2C09B-FF47-4777-922D-3140EACAFC32",
iconStyleClass:"fa-solid fa-puzzle-piece",
id:"modules",
svyUUID:"5CBFA61B-F4DF-4BBD-92A9-1FC3D3ED9161",
text:"Modules"
}
],
sidenavWidth:200,
togglePosition:"hide-toggle"
},
name:"sidenav_2",
typeName:"servoyextra-sidenav",
typeid:47,
uuid:"863448D6-5A04-4EEB-B6CC-338D002CE40C"
},
{
cssPosition:"0,0,-1,0,80,60",
json:{
cssPosition:{
bottom:"-1",
height:"60",
left:"0",
right:"0",
top:"0",
width:"80"
},
styleClass:"default-align padding-left-15 border-bottom h3",
text:"Migration Dashboard"
},
name:"label_1",
styleClass:"default-align padding-left-15 border-bottom h3",
typeName:"bootstrapcomponents-label",
typeid:47,
uuid:"BCCC88EA-175F-44B8-B870-5E3E53C57B18"
},
{
cssPosition:"13,68,-1,-1,146,35",
json:{
cssPosition:{
bottom:"-1",
height:"35",
left:"-1",
right:"68",
top:"13",
width:"146"
},
dataProviderID:"scopes.svyTIScanData.flagFilterModules",
handleWidth:"60",
label:"Modules",
labelWidth:"80",
offText:"All",
onDataChangeMethodID:"01E34DB1-18E2-446A-AAEB-CB8C962032C0",
onText:"Active"
},
name:"switchActiveModules",
typeName:"bootstrapextracomponents-switch",
typeid:47,
uuid:"DC131EFF-FC1D-4622-9BDF-ACC9A9250225"
}
],
name:"svyTiMigrationNav",
navigatorID:"-1",
onShowMethodID:"62AE11EB-CAC8-4F43-BB1C-42F895E736F6",
showInMenu:true,
typeid:3,
uuid:"A9C6736A-C690-4A44-81E0-E6E84222B85C"