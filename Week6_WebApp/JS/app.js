//The URIs of the REST endpoint
logicappkd = "https://prod-03.northcentralus.logic.azure.com:443/workflows/d05b2838bea64c1fb2567d5c4db1075a/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=JRVK7owZWopj-kGcJlvZetl4nlNdFBD3w2h0OC-VK7c";
RAI = "https://prod-26.northcentralus.logic.azure.com:443/workflows/e973b39551ea4f4181bfb9c8a61d36e4/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=mpS3-kcj0Oaym-c4FW6LwBssA2rWtWR5sakd_C6QNl4";

BLOB_ACCOUNT = "blobstoragekittenblog";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
  submitData = new FormData();

  //Get form variables and append them to the form data object 
  submitData.append('FileName',$('#FileName').val());
  submitData.append('UserID',$('#UserID').val());
  submitData.append('userName',$('#userName').val());
  submitData.append('File',$('#UpFile')[0].files[0]);


  //POST the data to the endpoint, note the need to set the content type header
  $.ajax({
    url: RAI,
    data: submitData,
    cache: false, 
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function(data) {
      
    }
  })
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){

  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  $.getJSON(RAI, function( data ) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorportaing the key values of the record in the data
    $.each (data, function ( key, val ) {

      items.push("<hr />");
      items.push("<img src='" + BLOB_ACCOUNT + val["filePath"] + "' width='400'/><br/>");
      items.push("File:" + val["fileName"] + "<br/>");
      items.push("Uploaded by:" + val["userName"] + "(user id: " + val["userID"] + ")<br/>");
      items.push("<hr />");
    });

    //Clear the assetlist div
    $('#ImageList').empty();

    //Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      "class":"my-new-list",
      html: items.join("")
    }).appendTo("#ImageList");
  });

}

