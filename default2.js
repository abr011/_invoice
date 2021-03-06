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

function fillInvoiceMaturity(maturity_id) {

    var maturity = data.maturity[maturity_id];

    var value = maturity.value;
    var description = maturity.text;
    
    $('.maturity_date_difference option').html(description);
    $('.maturity_date_difference option').val(value);
    
}	





$(document).ready(function() {
    console.log("ready!");

    moment.locale('cs');
	
	
    
    
    var payday = "";
    
    for (i = -3; i < 4; i++) {
    	var payday_date = moment().add(i, 'days'); 				
    	payday += "<p data-payday_id='" + i + "' data-payday_date='" + payday_date + "'>" + payday_date.format("dddd, l") + "</p>";   
    }

    $('.time').html(payday);
    
    $('.time p').on("click", function() { 			
    
    
    	var selected_maturity = 14; ///// bacha!!!!
		
		var for_func_moment = 1 * $(this).data("payday_date");
		
		var issue_date = moment(for_func_moment).format("l");  
		
		var date_to_send = moment(for_func_moment).add(selected_maturity, 'days').format("l");
		
		
		$('#date .date_issued').html(issue_date);  
		$('#date .date_to_send').html(date_to_send);
		
		
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
    
    
  
    var list_of_maturity_date_difference = "";

    for (m = 0; m < data.maturity.length; m++) {

        list_of_maturity_date_difference = list_of_maturity_date_difference + "<option data-value='" + data.maturity[m].value + "'data-maturity_id='" 
        + m + "'>" + data.maturity[m].text + "</option>";
            
    }	
	
							
							
							
    $('.maturity_date_difference').html(list_of_maturity_date_difference); // je to prave az za tim cyklem, protoze to vypisuje data, ktery se v cyklu nacetly	

    $('.maturity_date_difference option').on("click", function() { 

    var a = ($(this).data("value")); 
console.log(a);


    });


});