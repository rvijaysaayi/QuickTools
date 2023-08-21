 function createParentMenus(parent_id,title,tool,minusMin,kind) { 

    chrome.contextMenus.create({
      "title" :title,
      "id":parent_id,
      "type" : "normal",
      "contexts" : ["selection"],
      "onclick" : openURL(tool,minusMin,kind)
      });   
};

function createSubMenusLO(idval, parent_id,titleval,kindof){
  
  chrome.contextMenus.create({
    id:idval,
    title: titleval,
    parentId: parent_id,
    contexts:["selection"],
    onclick: wawsopen(kindof)
        
  });
}

function createSubMenus(idval, parent_id,titleval,tool,minusMin,kind){
  
  chrome.contextMenus.create({
    id:idval,
    title: titleval,
    parentId: parent_id,
    contexts:["selection"],
    onclick: openURL(tool,minusMin,kind)
        
  });
}


 function openURL(version, time,envtype){
    return function(info, tab) {
        var today = new Date();
        today = today.toISOString();
        var ago = new Date(today);
        var ago = ago.setMinutes(ago.getMinutes()-time);
        ago = new Date(ago);
         
        ago = ago.toISOString();
        if(version == "applens"){
                 var newURL = "https://"+version+".trafficmanager.net/"+envtype+"/"+info.selectionText.trim()+"?startTime="+ago+"&endTime="+today;
        }
       else{
         var newURL = "https://"+version+".azurewebsites.net/"+envtype+"/"+info.selectionText.trim()+"?startTime="+ago+"&endTime="+today;
       }
        chrome.tabs.create({ url: newURL });
     
      };
 };

function getClickHandler() {
    return function(info, tab) {
      console.log(info.selectionText);
    };
  };
  
function wawsopen(kindof){
  return function(info,tab){
      var newURL = "https://wawsobserver.azurewebsites.windows.net/"+kindof+"/"+info.selectionText.trim();
      chrome.tabs.create({ url: newURL });
  }
}

function parentwawscontextmenus(id,title){
  chrome.contextMenus.create({
    "title" : "WAWS Observer",
    "id":"parent-waws",
    "type" : "normal",
    "contexts" : ["selection"],
    "onclick" : getClickHandler()
    });
}

function createContextmenus(){
      createParentMenus("parent-waws","WAWS Observer");
        createSubMenusLO("waws-webapp","parent-waws","WebApp","sites");
        createSubMenusLO("waws-subscription","parent-waws","Subscription","Subscriptions");
        createSubMenusLO("waws-ase","parent-waws","ASE","MiniEnvironments");
        createSubMenusLO("waws-certificates","parent-waws","App Service Certificates","Certificates");
        createSubMenusLO("waws-certorders","parent-waws","Certificate Orders","CertificateOrders");
        createSubMenusLO("waws-domains","parent-waws","App Service Domains","Domains");
        createSubMenusLO("waws-deletedsites","parent-waws","Deleted Sites","DeletedSites");
        createSubMenusLO("waws-stamps","parent-waws","Stamps","Stamps");
        createSubMenusLO("waws-isasd","parent-waws","Domains bound to App Service","sites");

      createParentMenus("parent-applensv3","Applenv V3");
        createSubMenus("webapp","parent-applensv3","WebApp");
          createSubMenus("webapp-15min","webapp","Last 15 min","applens",15,"sites");
          createSubMenus("webapp-30min","webapp","Last 30 min","applens",30,"sites");
          createSubMenus("webapp-60min","webapp","Last 1 hr","applens",60,"sites");
          createSubMenus("webapp-180min","webapp","Last 3 hrs","applens",180,"sites");
          createSubMenus("webapp-360min","webapp","Last 6 hrs","applens",360,"sites");
          createSubMenus("webapp-1440min","webapp","Last 1 day","applens",1440,"sites");
        
        createSubMenus("ase","parent-applensv3","ASE");
          createSubMenus("ase-15min","ase","Last 15 min","applens",15,"hostingEnvironments");
          createSubMenus("ase-30min","ase","Last 30 min","applens",30,"hostingEnvironments");
          createSubMenus("ase-60min","ase","Last 1 hr","applens",60,"hostingEnvironments");
          createSubMenus("ase-180min","ase","Last 3 hrs","applens",180,"hostingEnvironments");
          createSubMenus("ase-360min","ase","Last 6 hrs","applens",360,"hostingEnvironments");
          createSubMenus("ase-1440min","ase","Last 1 day","applens",1440,"hostingEnvironments");
      
     /* createParentMenus("parent-applensv2","Applenv V2");
        createSubMenus("Webapp","parent-applensv2","Webapp");
          createSubMenus("Webapp-15min","Webapp","Last 15 min","applensv2",15,"sites");
          createSubMenus("Webapp-30min","Webapp","Last 30 min","applensv2",30,"sites");
          createSubMenus("Webapp-60min","Webapp","Last 1 hr","applensv2",60,"sites");
          createSubMenus("Webapp-180min","Webapp","Last 3 hrs","applensv2",180,"sites");
          createSubMenus("Webapp-360min","Webapp","Last 6 hrs","applensv2",360,"sites");
          createSubMenus("Webapp-1440min","Webapp","Last 1 day","applensv2",1440,"sites")
        
        createSubMenus("ASE","parent-applensv2","ASE");
          createSubMenus("ASE-15min","ASE","Last 15 min","applensv2",15,"hostingEnvironments");
          createSubMenus("ASE-30min","ASE","Last 30 min","applensv2",30,"hostingEnvironments");
          createSubMenus("ASE-60min","ASE","Last 1 hr","applensv2",60,"hostingEnvironments");
          createSubMenus("ASE-180min","ASE","Last 3 hrs","applensv2",180,"hostingEnvironments");
          createSubMenus("ASE-360min","ASE","Last 6 hrs","applensv2",360,"hostingEnvironments");
          createSubMenus("ASE-1440min","ASE","Last 1 day","applensv2",1440,"hostingEnvironments");
          
          */
    
  }
  
  chrome.runtime.onStartup.addListener(function(){
    createContextmenus();

  })
  
  chrome.runtime.onInstalled.addListener(function() {
     createContextmenus();
        
  });
