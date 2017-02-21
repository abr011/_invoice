
function fillClient(client_id) {

    var client = data.client[client_id];



    var name = client.name;
    var street = client.address_street;
    var town = client.address_zip + ("\u00A0") + ("\u00A0") + client.address_town;
    var legal_id = client.legal_id;


    $('#client .name').html(name);
    $('#client .address_street').html(street);
    $('#client .address_town').html(town);
    $('#client .legal_id .sort_of_space').eq(0).html("IČ " + legal_id.slice(0, 4));
    $('#client .legal_id .sort_of_space').eq(1).html(legal_id.slice(4, 8));

}


$(document).ready(function() {
    console.log("ready!");

moment.locale('cs');



var issue_date = moment();

var maturity_date_difference = 4;



function print_dates() {

	$('#date .date_issued').html(issue_date.format("l"));
	
	$('#date .date_to_send').html(issue_date.add(maturity_date_difference, 'days').format("l"));
	
	 

}
	print_dates();
    
    
    var issue_date_list = "";
    
    for (i = -3; i < 4; i++) {
    	
    	var issue_date_diff = moment().add(i, 'days'); 				
    	
    	issue_date_list += "<p data-issue_date_diff='" + issue_date_diff + "'>" + issue_date_diff.format("dddd, l") + "</p>";   
    }

    $('.time').html(issue_date_list);

    $('.time p').on("click", function() { 			
    
		
		issue_date = moment( 1 * $(this).data("issue_date_diff"));
		
		print_dates();
		
	
});

    var list_of_maturity_date_difference = "";

    for (m = 0; m < data.maturity.length; m++) {

        list_of_maturity_date_difference = list_of_maturity_date_difference + "<option data-value='" + data.maturity[m].value + "'>" 
        + data.maturity[m].text + "</option>";
          
    }	
	
	$('.maturity_date_difference').html(list_of_maturity_date_difference); // je to prave az za tim cyklem, protoze to vypisuje data, ktery se v cyklu nacetly	
   
    $('.maturity_date_difference option').on("click", function() { 
    
    var a = ($(this).data("value"));
    console.log(a);
    
    maturity_date_difference = 2;
    
    print_dates();
    
    
});

var list_of_clients = "";

    for (i = 0; i < data.client.length; i++) {

        list_of_clients = list_of_clients + "<div class='name' data-client_id='" + i + "'>" + data.client[i].name + "</div>" +
            "<div class='legal_id' data-client_id='" + i + "'>" + data.client[i].legal_id + "</div>";
        
	}

    $('.list_of_clients').html(list_of_clients); // je to prave az za tim cyklem, protoze to vypisuje data, ktery se v cyklu nacetly	

    $('.list_of_clients div').on("click", function() { 

    fillClient($(this).data("client_id")); 

    });

});