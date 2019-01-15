;window.CloudflareApps=window.Eager=window.CloudflareApps||window.Eager||{};window.CloudflareApps=window.CloudflareApps||{};CloudflareApps.siteId="5774ff15d3fb4cd5757d77f56222358a";CloudflareApps.installs=CloudflareApps.installs||{};;(function(){'use strict'
CloudflareApps.internal=CloudflareApps.internal||{}
var errors=[]
CloudflareApps.internal.placementErrors=errors
var errorHashes={}
function noteError(options){var hash=options.selector+'::'+options.type+'::'+(options.installId||'')
if(errorHashes[hash]){return}
errorHashes[hash]=true
errors.push(options)}
var initializedSelectors={}
var currentInit=false
CloudflareApps.internal.markSelectors=function markSelectors(){if(!currentInit){check()
currentInit=true
setTimeout(function(){currentInit=false})}}
function check(){var installs=window.CloudflareApps.installs
for(var installId in installs){if(!installs.hasOwnProperty(installId)){continue}
var selectors=installs[installId].selectors
if(!selectors){continue}
for(var key in selectors){if(!selectors.hasOwnProperty(key)){continue}
var hash=installId+'::'+key
if(initializedSelectors[hash]){continue}
var els=document.querySelectorAll(selectors[key])
if(els&&els.length>1){noteError({type:'init:too-many',option:key,selector:selectors[key],installId:installId})
initializedSelectors[hash]=true
continue}else if(!els||!els.length){continue}
initializedSelectors[hash]=true
els[0].setAttribute('cfapps-selector',selectors[key])}}}
CloudflareApps.querySelector=function querySelector(selector){if(selector==='body'||selector==='head'){return document[selector]}
CloudflareApps.internal.markSelectors()
var els=document.querySelectorAll('[cfapps-selector="'+selector+'"]')
if(!els||!els.length){noteError({type:'select:not-found:by-attribute',selector:selector})
els=document.querySelectorAll(selector)
if(!els||!els.length){noteError({type:'select:not-found:by-query',selector:selector})
return null}else if(els.length>1){noteError({type:'select:too-many:by-query',selector:selector})}
return els[0]}
if(els.length>1){noteError({type:'select:too-many:by-attribute',selector:selector})}
return els[0]}}());(function(){'use strict'
var prevEls={}
CloudflareApps.createElement=function createElement(options,prevEl){options=options||{}
CloudflareApps.internal.markSelectors()
try{if(prevEl&&prevEl.parentNode){var replacedEl
if(prevEl.cfAppsElementId){replacedEl=prevEls[prevEl.cfAppsElementId]}
if(replacedEl){prevEl.parentNode.replaceChild(replacedEl,prevEl)
delete prevEls[prevEl.cfAppsElementId]}else{prevEl.parentNode.removeChild(prevEl)}}
var element=document.createElement('cloudflare-app')
var container
if(options.pages&&options.pages.URLPatterns&&!CloudflareApps.matchPage(options.pages.URLPatterns)){return element}
try{container=CloudflareApps.querySelector(options.selector)}catch(e){}
if(!container){return element}
if(!container.parentNode&&(options.method==='after'||options.method==='before'||options.method==='replace')){return element}
if(container===document.body){if(options.method==='after'){options.method='append'}else if(options.method==='before'){options.method='prepend'}}
switch(options.method){case'prepend':if(container.firstChild){container.insertBefore(element,container.firstChild)
break}
case'append':container.appendChild(element)
break
case'after':if(container.nextSibling){container.parentNode.insertBefore(element,container.nextSibling)}else{container.parentNode.appendChild(element)}
break
case'before':container.parentNode.insertBefore(element,container)
break
case'replace':try{var id=element.cfAppsElementId=Math.random().toString(36)
prevEls[id]=container}catch(e){}
container.parentNode.replaceChild(element,container)}
return element}catch(e){if(typeof console!=='undefined'&&typeof console.error!=='undefined'){console.error('Error creating Cloudflare Apps element',e)}}}}());(function(){'use strict'
CloudflareApps.matchPage=function matchPage(patterns){if(!patterns||!patterns.length){return true}
var loc=document.location.host+document.location.pathname
if(window.CloudflareApps&&CloudflareApps.proxy&&CloudflareApps.proxy.originalURL){var url=CloudflareApps.proxy.originalURL.parsed
loc=url.host+url.path}
for(var i=0;i<patterns.length;i++){var re=new RegExp(patterns[i],'i')
if(re.test(loc)){return true}}
return false}}());CloudflareApps.installs["XovwPCpyn2kh"]={appId:"nt4L5NPJq1za",scope:{}};;CloudflareApps.installs["XovwPCpyn2kh"].options={"blocks":[{"code":"\u003c!-- Start of HubSpot Embed Code --\u003e\n  \u003cscript type=\"text/javascript\" id=\"hs-script-loader\" async defer src=\"//js.hs-scripts.com/2716595.js\"\u003e\u003c/script\u003e\n\u003c!-- End of HubSpot Embed Code --\u003e","location":{"method":"before","pages":{"URLPatterns":["^bricks.mybrightwheel.com/pricing-inquiry/?.*$"]},"selector":"body"}},{"code":"\u003c!--[if lte IE 8]\u003e\n    \u003cscript charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2-legacy.js\"\u003e\u003c/script\u003e\n  \u003c![endif]--\u003e\n  \u003cscript charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2.js\"\u003e\u003c/script\u003e\n  \u003cscript\u003e\n  document.addEventListener('DOMContentLoaded', function(){\n    hbspt.forms.create({\n      portalId: \"2716595\",\n      formId: \"17e115ac-1862-428c-b600-97c0b68cb0a2\",\n      target: \".hbspt-form\",\n      css: '',\n      onFormReady(){\n  console.log('hubspotFormReady');\n  var event = new Event( 'hubspotFormReady' );\n  window.dispatchEvent( event )\n}\n    });\n  });\n  \u003c/script\u003e\n\u003cdiv class=\"hbspt-form\"\u003e\u003c/div\u003e","location":{"method":"append","pages":{"URLPatterns":["^bricks.mybrightwheel.com/pricing-inquiry/?.*$","^bricks.mybrightwheel.com/pricing/?.*$","^mybrightwheel.com/pricing-inquiry/?.*$","^mybrightwheel.com/pricing/?.*$"]},"selector":"#hubspot-pricing"}},{"code":"\u003c!--[if lte IE 8]\u003e\n    \u003cscript charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2-legacy.js\"\u003e\u003c/script\u003e\n  \u003c![endif]--\u003e\n  \u003cscript charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2.js\"\u003e\u003c/script\u003e\n  \u003cscript\u003e\n  document.addEventListener('DOMContentLoaded', function(){\n    hbspt.forms.create({\n      portalId: \"2716595\",\n      formId: \"ae76c521-efbb-4323-8d6f-ca0e6538f31b\",\n      target: \".hbspt-form\",\n      css: '',\n      onFormReady(){\n  console.log('hubspotFormReady');\n  var event = new Event( 'hubspotFormReady' );\n  window.dispatchEvent( event )\n}\n    });\n  });\n  \u003c/script\u003e","location":{"method":"after","pages":{"URLPatterns":["^bricks.mybrightwheel.com/demo/?.*$","^mybrightwheel.com/demo/?$"]},"selector":".hbspt-form"}},{"code":"\u003c!--[if lte IE 8]\u003e\n\u003cscript charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2-legacy.js\"\u003e\u003c/script\u003e\n\u003c![endif]--\u003e\n\u003cscript charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2.js\"\u003e\u003c/script\u003e\n\u003cscript\u003e\n  document.addEventListener('DOMContentLoaded', function(){\n  console.log('triggered');\n  hbspt.forms.create({\n  portalId: \"2716595\",\n  formId: \"06c42722-e827-4446-b982-15e462bbcdc7\",\n  target: \"#hubspot-contact\",\n  css: '',\n      onFormReady(){\n  console.log('hubspotFormReady');\n  var event = new Event( 'hubspotFormReady' );\n  window.dispatchEvent( event )\n}\n});\n});\n\u003c/script\u003e","location":{"method":"prepend","pages":{"URLPatterns":["^bricks.mybrightwheel.com/contact/?.*$","^mybrightwheel.com/contact/?$"]},"selector":"#hubspot-contact"}},{"code":"\u003cscript type=\"text/javascript\"\u003e\nvar APP_ID = \"APP_ID\";\n\nwindow.intercomSettings = {\n    app_id: 'ls225jpp'\n  };\n(function(){var w=window;var ic=w.Intercom;if(typeof ic===\"function\"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' + APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()\n\u003c/script\u003e","location":{"method":"append","pages":{"URLPatterns":["^bricks.mybrightwheel.com/?.*$"]},"selector":"body"}},{"code":"\u003c!--[if lte IE 8]\u003e\n\u003cscript charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2-legacy.js\"\u003e\u003c/script\u003e\n\u003c![endif]--\u003e\n\u003cscript charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2.js\"\u003e\u003c/script\u003e\n\u003cscript\u003e\n  document.addEventListener('DOMContentLoaded', function() { \n  hbspt.forms.create({\n\tportalId: \"2716595\",\n\tformId: \"ae76c521-efbb-4323-8d6f-ca0e6538f31b\",\n\tcss: \"\",\n        target: '#hubspot-demo',\n      onFormReady(){\n  console.log('hubspotFormReady');\n  var event = new Event( 'hubspotFormReady' );\n  window.dispatchEvent( event )\n}\n});\n});\n\u003c/script\u003e","location":{"method":"append","pages":{"URLPatterns":["^bricks.mybrightwheel.com/?$","^mybrightwheel.com/?$"]},"selector":"#hubspot-demo"}},{"code":"\u003cscript type=\"text/javascript\"\u003e\nvar APP_ID = \"APP_ID\";\n\nwindow.intercomSettings = {\n    app_id: 'mbdwkcq4'\n  };\n(function(){var w=window;var ic=w.Intercom;if(typeof ic===\"function\"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' + APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()\n\u003c/script\u003e","location":{"method":"append","pages":{"URLPatterns":["^mybrightwheel.com/?.*$"]},"selector":"body"}},{"code":"\u003c!--[if lte IE 8]\u003e\n    \u003cscript charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2-legacy.js\"\u003e\u003c/script\u003e\n  \u003c![endif]--\u003e\n  \u003cscript charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2.js\"\u003e\u003c/script\u003e\n  \u003cscript\u003e\n  document.addEventListener('DOMContentLoaded', function(){\n    hbspt.forms.create({\n      portalId: \"2716595\",\n      formId: \"17e115ac-1862-428c-b600-97c0b68cb0a2\",\n      target: \".hbspt-form\",\n      css: '',\n      onFormReady(){\n  console.log('hubspotFormReady');\n  var event = new Event( 'hubspotFormReady' );\n  window.dispatchEvent( event )\n}\n    });\n  });\n  \u003c/script\u003e\n\u003cdiv class=\"hbspt-form\"\u003e\u003c/div\u003e","location":{"method":"append","pages":{"URLPatterns":["^mybrightwheel.com/pricing-inquiry/?.*$"]},"selector":"#hubspot-pricing"}}]};;CloudflareApps.installs["XovwPCpyn2kh"].selectors={"blocks[0].location.selector":"body","blocks[1].location.selector":"#hubspot-pricing","blocks[2].location.selector":".hbspt-form","blocks[3].location.selector":"#hubspot-contact","blocks[4].location.selector":"body","blocks[5].location.selector":"#hubspot-demo","blocks[6].location.selector":"body","blocks[7].location.selector":"#hubspot-pricing"};;CloudflareApps.installs["kAKNyrCSSXIi"]={appId:"lMxPPXVOqmoE",scope:{}};;CloudflareApps.installs["kAKNyrCSSXIi"].options={"id":"UA-53744910-9","social":true};;if(CloudflareApps.matchPage(CloudflareApps.installs['XovwPCpyn2kh'].URLPatterns)){(function(){'use strict'
if(!document.addEventListener)return
var options=CloudflareApps.installs['XovwPCpyn2kh'].options
var elements={}
var prevElements={}
function updateElements(){options.blocks.forEach(function(block,index){var locationHash=[block.location.selector,block.location.method,index].join('!')
var element
if(elements[locationHash]){element=elements[locationHash]}else{if(block.location.method==='replace'){prevElements[locationHash]=document.querySelector(block.location.selector)}
element=CloudflareApps.createElement(block.location)
elements[locationHash]=element}
element.foundInBlocks=true
element.innerHTML=block.code
var scripts=Array.prototype.slice.call(element.querySelectorAll('script'))
if(scripts){scripts.forEach(function(script){var newScript=document.createElement('script')
for(var key=script.attributes.length;key--;){var attr=script.attributes[key]
if(attr.specified){newScript.setAttribute(attr.name,attr.value)}}
newScript.innerHTML=script.innerHTML
element.replaceChild(newScript,script)})}})
for(var hash in elements){if(!elements[hash].foundInBlocks){if(prevElements[hash]){elements[hash].parentNode.replaceChild(prevElements[hash],elements[hash])
delete prevElements[hash]}else{elements[hash].parentNode.removeChild(elements[hash])}
delete elements[hash]}else{delete elements[hash].foundInBlocks}}}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',updateElements)}else{updateElements()}
window.CloudflareApps.installs['XovwPCpyn2kh'].scope={setOptions:function(nextOptions){options=nextOptions
updateElements()}}}())};if(CloudflareApps.matchPage(CloudflareApps.installs['kAKNyrCSSXIi'].URLPatterns)){(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');};if(CloudflareApps.matchPage(CloudflareApps.installs['kAKNyrCSSXIi'].URLPatterns)){(function(){var options=CloudflareApps.installs['kAKNyrCSSXIi'].options
if(!options.id)return
window.ga('create',options.id,'auto')
window.ga('send','pageview')
if(options.social){(function(b){(function(a){"__CF"in b&&"DJS"in b.__CF?b.__CF.DJS.push(a):"addEventListener"in b?b.addEventListener("load",a,!1):b.attachEvent("onload",a)})(function(){"FB"in b&&"Event"in FB&&"subscribe"in FB.Event&&(FB.Event.subscribe("edge.create",function(a){_gaq.push(["_trackSocial","facebook","like",a])}),FB.Event.subscribe("edge.remove",function(a){_gaq.push(["_trackSocial","facebook","unlike",a])}),FB.Event.subscribe("message.send",function(a){_gaq.push(["_trackSocial","facebook","send",a])}));"twttr"in b&&"events"in twttr&&"bind"in twttr.events&&twttr.events.bind("tweet",function(a){if(a){var b;if(a.target&&a.target.nodeName=="IFRAME")a:{if(a=a.target.src){a=a.split("#")[0].match(/[^?=&]+=([^&]*)?/g);b=0;for(var c;c=a[b];++b)if(c.indexOf("url")===0){b=unescape(c.split("=")[1]);break a}}b=void 0}_gaq.push(["_trackSocial","twitter","tweet",b])}})})})(window);}}())}