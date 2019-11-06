//CreateInheritOfDocuments930
	
var node = companyhome.childByNamePath("Shared");
var nameIncoming = "кориcтувачі";

var nodeIncoming = companyhome.childByNamePath("Shared/"+nameIncoming);
	if (!nodeIncoming){
		status.setCode(status.STATUS_BAD_REQUEST, "folder: "+ nameIncoming +" is not exist");
		//return;
	}	
//logger.log(nodeIncoming); 
//==========================================================================================================

var listFolders = nodeIncoming.getChildren();
for each (var f in listFolders){	
	
	//var testDocument = f.createFile("test5.txt");		
	
	var name = f.properties["cm:name"];
	
	var ownerName = "dmsadmin1";
	if (name 
	   && name.indexOf("Адміністратор", 0)!=0
	   ){
	 //var ownerName = getUserByFirstNameAndDepatrment(name).properties["cm:userName"];	
	var ownerName = f.properties["cm:title"];	
	logger.log(ownerName);
	} 
		
		
	var listContent = f.getChildren();	
	
	for each (var c in listContent){
		
		//if (c.isDocument){
		logger.log(c.getName());		
		c.setInheritsPermissions(false);
		c.setPermission("Coordinator", ownerName);
		
		logger.log(ownerName)
		//}
	}
	
}


//========================================================
//not use

function getUserByFirstNameAndDepatrment(nameFolder){	
	
	var firstNameWithoutInit = nameFolder.split(" ")[0];	
	var initial1 = nameFolder.split(" ")[1].split(".")[0];	
	var initial2 = nameFolder.split(" ")[1].split(".")[1];	
	var department = nameFolder.substr(firstNameWithoutInit.length+6, nameFolder.length-1);		
	
	var usersList = people.getPeople(null);
	for each(var node in usersList){
			user = utils.getNodeFromString(node);
	
		if (user.properties["cm:firstName"].indexOf(firstNameWithoutInit, 0)>-1		   	
			&& user.properties["cm:lastName"].indexOf(initial1, 0)==0
			&& user.properties["cm:lastName"].split(" ")[1].indexOf(initial2, 0)==0
	  		 ){			
		
			var userOrganization = user.properties["cm:organization"].replace(new RegExp("\"", 'g'), "");
			if (userOrganization.indexOf(department, 0)>-1){		
			//logger.log(user.properties["cm:firstName"]+"/"+user.properties["cm:lastName"]+"/"+user.properties["cm:organization"]);
				return user;
			}
		}
	}	
}