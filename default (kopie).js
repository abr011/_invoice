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
	
	$('#date .date_issued').data( "difference_from_now", 0 );
	
	var payday_date_invoice_moment = "";
	
	var initial_selected_payday_difference = $( "select" ).val();

    $('#date .date_issued').html(moment().format("l")); 
	
    $('#date .date_to_send').html(moment().add(initial_selected_payday_difference, 'days').format("l"));
    
    
    var payday = "";
    
console.log(initial_selected_payday_difference);

    for (i = -3; i < 4; i++) {
    	var payday_date = moment().add(i, 'days'); 				
    	payday += "<p data-payday_id='" + i + "' data-payday_date='" + payday_date + "'>" + payday_date.format("dddd, l") + "</p>";   
    }

    $('.time').html(payday);
    
    $( "select" ).change(function () {
    
    selected_payday_difference = $(this).val();
    
    var a = $('#date .date_issued').data( "difference_from_now" );
    var b = a 
	
	console.log(a);
	$('.payday_difference option[value=selected_payday_difference]').attr('selected','selected');
	
	
    
   		// a potrebuju nastavit option na selected="selected" select class="payday_difference"
  }); // tady potrebuju prepocitat datum platby a myslel jsem, ze nejak pres id (payday_date_id)
  //$( "div" ).data( "test", { first: 16, last: "pizza!" } ); $( "span:first" ).text( $( "div" ).data( "test" ).first );
		
	$('.time p').on("click", function() { 			
	
		var difference_from_now = $(this).data("payday_id");
		
		var payday_date_invoice_moment = 1 * $(this).data("payday_date");
		
		var payday_date_invoice = moment(payday_date_invoice_moment).format("l");  
		
		var date_to_send = moment(payday_date_invoice_moment).add(selected_payday_difference, 'days').format("l");
		
		$('#date .date_issued').data( "difference_from_now", difference_from_now );
		$('#date .date_issued').html(payday_date_invoice);  
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


});