

function fillClient(client_id) {

    var client = data.client[client_id];


    $('#client .name span').html(client.name);
    $('#client .address_street').html(client.address_street);
    $('#client .address_zip').html(client.address_zip);
    $('#client .address_town').html(client.address_town);
    $('#client .legal_id .sort_of_space').eq(0).html(client.legal_id.slice(0, 4));
    $('#client .legal_id .sort_of_space').eq(1).html(client.legal_id.slice(4, 8));

}


$(document).ready(function() {
    console.log("ready!");

    moment.locale('cs');


    var issue_date_difference = 0;
    var maturity_date_difference = 14;

    $('#variable_symbol_checkbox_add').prop('checked', false);

    $('.year').html(moment().format("YYYY"));


    function print_dates() {

        issue_date = moment().add(issue_date_difference, 'days');
        maturity_date = moment().add((issue_date_difference + maturity_date_difference), 'days');

        $('#new_date_issued').val((issue_date).format("l"));
        $('#new_date_to_send').val((maturity_date).format("l"));

    }

    print_dates();

    

$("#new_date_to_send").change(function(){  //asi na picu, ale treba staci
    maturity_date = this.value;
    console.log (maturity_date);
    //$('.aaa').html((maturity_date).format("l"));
  })

$("#new_invoice_number").keyup(function(){
    if ((this.value) != "") {
        $('#unchecked_invoice').html("Ok");
    }
    else {$('#unchecked_invoice').html("?");}
  })
       

$( "#new_client_name" ).focus(function() {
  $('#client_rest_of_info').removeClass( 'hidden');
  $('#client_rest_of_info').addClass( 'in');
  
});

$( "#new_my_name" ).focus(function() {
  $('#my_rest_of_info').removeClass( 'hidden');
  $('#my_rest_of_info').addClass( 'in');
  
});

    var issue_date_list = "";

    for (i = -3; i < 4; i++) {

        var issue_date_diff = moment().add(i, 'days');

        issue_date_list += "<p data-issue_date_diff='" + issue_date_diff + "' data-issue_date_id='" + i + "'>" +
            issue_date_diff.format("dddd, l") + "</p>";
    }

    $('.time').html(issue_date_list);


    $('.time p').on("click", function() {

        issue_date_difference = $(this).data("issue_date_id");

        $('.time p').each(function() { // todle pocitam, ze pude lip...
            $(this).removeClass('checked');
        });

        $(this).toggleClass('checked');

        print_dates();

		console.log(issue_date_difference, maturity_date_difference);
		
    });

    var list_of_clients = "";

    for (i = 0; i < data.client.length; i++) {

        list_of_clients = list_of_clients + "<div class='client_wrap'>" + "<div class='name' data-client_id='" + i + "'>" + data.client[i].name + "</div>" +
            "<div class='legal_id' data-client_id='" + i + "'>" + data.client[i].legal_id + "</div>" + "</div>";

    }

    $('.list_of_clients').html(list_of_clients); // je to prave az za tim cyklem, protoze to vypisuje data, ktery se v cyklu nacetly	

    $('.list_of_clients div').on("click", function() {

        fillClient($(this).data("client_id"));

    });




    $('.variable_symbol_add').click(function() {
        
            var a = "Variabilní symbol" + ("\u00A0") + ("\u00A0") + $('.just_invoice_number').html()

            $('.variable_symbol_value').html(a)

			$('.variable_symbol').toggleClass( 'hollow');
			$('.variable_symbol_value').toggleClass( 'hollow');
			$('.variable_symbol_remove').toggleClass( 'hollow');
			$('.variable_symbol_add').toggleClass( 'hollow');

    });

    $('.variable_symbol_remove').on("click", function() {		
        	
            $('.variable_symbol').toggleClass( 'hollow');
            $('.variable_symbol_value').toggleClass( 'hollow');
            $('.variable_symbol_remove').toggleClass( 'hollow');
			$('.variable_symbol_add').toggleClass( 'hollow');

        
        
    });
    

							
							
    var list_of_maturity_date_difference = "";

    for (m = 0; m < data.maturity.length; m++) {

	list_of_maturity_date_difference += '<option value="' + data.maturity[m].value + '">' + data.maturity[m].text + '</option>';

    }

    $('.maturity_date_difference').html(list_of_maturity_date_difference);

    $('.maturity_date_difference').change(function () {
     
     var valueSelected  = $(this).val();
     var textSelected   = $(this).text();
          

	 maturity_date_difference = 1 * valueSelected;
	
        print_dates();

    
    
    
   });

});

