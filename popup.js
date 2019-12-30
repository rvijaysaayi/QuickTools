function getinput(input) { 
  return input.value
}


window.addEventListener('keydown', function(e) {
  if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
      if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
          e.preventDefault();
          return false;
      }
  }
}, true);

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('clickIt');
    var checkTextBox = document.getElementById('textbox');
    var checkCDtextbox = document.getElementById('cdname');
      

    checkTextBox.addEventListener('keyup',function(e){
      e.preventDefault();
      data = checkTextBox.value
      if(e.keyCode == 13)
        { checkboxstatus()
          return false;
        }
    },false);
    
  
    checkCDtextbox.addEventListener('keyup',function(e){
     
      e.preventDefault();
      cdname = checkCDtextbox.value
      //alert(cdname)
      if(e.keyCode == 13)
        {  
          checkboxstatus()
          return false;
        }
    },false);


    

    checkPageButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      checkboxstatus()
      
    }, false);
  }, false);

 
function checkboxstatus() {
 chrome.tabs.getSelected(null, function(tab) {
    var data = getinput(document.getElementById('textbox')) 
    var cdnameval = getinput(document.getElementById('cdname')) 
    var CB = document.getElementById('ASC').checked
    var dwicb = document.getElementById('dwi').checked 
    
    if (cdnameval.length > 0)
    {     
      if(dwicb){
      var newURL = "https://www.digwebinterface.com/?hostnames="+cdname+"&type=&ns=resolver&useresolver=8.8.4.4&nameservers";
    }
    else{
      var newURL = "http://wawsobserver.azurewebsites.windows.net/sites/"+cdname;
    }
    
    chrome.tabs.create({ url: newURL });
    }
    else{
      
      var numberPattern = /\d+/g;
      data = data.match( numberPattern ).join([]);
      
    var mm = Number(data.charAt(3) + data.charAt(4));
    var dd = Number(data.charAt(5) + data.charAt(6)); 
    
    if (data.length>4)
    {      
      if (mm>=01 && mm<= 12 && dd>=01 && dd<=31){

        if(CB){
        var newURL = "https://azuresupportcenter.msftcloudes.com/caseoverview?srId="+data;
        chrome.tabs.create({ url: newURL });
        }
  
        var newURL = "https://servicedesk.microsoft.com/#/customer/case/"+data;
        chrome.tabs.create({ url: newURL });
      }
      else{
        var newURL = "https://icm.ad.msft.net/imp/v3/incidents/details/"+data+"/home";
        chrome.tabs.create({ url: newURL });
      }
    }

    }

  
        

  });
}
