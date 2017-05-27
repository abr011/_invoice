(function() {

    const config = {
        apiKey: "AIzaSyDrqihmPtjDnEgm2j0rGhR1-QbiIWCmldo",
        authDomain: "invoice-71a47.firebaseapp.com",
        databaseURL: "https://invoice-71a47.firebaseio.com",
        projectId: "invoice-71a47",
        storageBucket: "invoice-71a47.appspot.com",
        messagingSenderId: "845423691647"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    var firebaseRef = firebase.database().ref();


    if (view == "about_me") {

        var about_me_id = "";
        var my_name = "";
        var my_legal_id = "";
        var my_account_number_prefix = "";
        var my_account_number = "";
        var my_bank_code = "";
        var my_address_street = "";
        var my_address_town = "";
        var my_address_zip = "";

        document.getElementById("new_my_name").onblur = function() {
            //firebaseRef.child("my_name").set($('#new_my_name').val());
            my_name = $('#new_my_name').val();
            console.log(my_name);
        };

        document.getElementById("new_my_legal_id").onblur = function() {
            //firebaseRef.child("my_legal_id").set($('#new_my_legal_id').val());
            my_legal_id = $('#new_my_legal_id').val();
            console.log(my_legal_id);
        };

        document.getElementById("new_my_account_number_prefix").onblur = function() {
            //firebaseRef.child("my_account_number_prefix").set($('#new_my_account_number_prefix').val());
            my_account_number_prefix = $('#new_my_account_number_prefix').val();
        };

        document.getElementById("new_my_account_number").onblur = function() {
            //firebaseRef.child("my_account_number").set($('#new_my_account_number').val());
            my_account_number = $('#new_my_account_number').val();
        };

        document.getElementById("new_my_bank_code").onblur = function() {
            //firebaseRef.child("my_bank_code").set($('#new_my_bank_code').val());
            my_bank_code = $('#new_my_bank_code').val();
        };

        document.getElementById("new_my_address_street").onblur = function() {
            //firebaseRef.child("my_address_street").set($('#new_my_address_street').val());
            my_address_street = $('#new_my_address_street').val();
        };

        document.getElementById("new_my_address_town").onblur = function() {
            //firebaseRef.child("my_address_town").set($('#new_my_address_town').val());
            my_address_town = $('#new_my_address_town').val();
        };

        document.getElementById("new_my_address_zip").onblur = function() {
            //firebaseRef.child("my_address_zip").set($('#new_my_address_zip').val());
            my_address_zip = $('#new_my_address_zip').val();
        };


        $('#confirm_about_me').on("click", function() {

            var about_me_Ref = firebase.database().ref('about_me');
            var new_about_me_Ref = about_me_Ref.push();
            new_about_me_Ref.set({
                'about_me_id': my_name,
                'my_legal_id': my_legal_id,
                'my_account_number_prefix': my_account_number_prefix,
                'my_account_number': my_account_number,
                'my_bank_code': my_bank_code,
                'my_address_street': my_address_street,
                'my_address_town': my_address_town,
                'my_address_zip': my_address_zip,
            });

        });




    };

    if (view == "about_client") {

        var client_name_id = "";
        var client_name = "";
        var client_legal_id = "";
        var client_tax_id = "";
        var client_address_street = "";
        var client_address_town = "";
        var client_address_zip = "";


        document.getElementById("new_client_name").onblur = function() {
            client_name = $('#new_client_name').val();
        };

        document.getElementById("new_client_legal_id").onblur = function() {
            client_legal_id = $('#new_client_legal_id').val();
        };

        document.getElementById("new_client_tax_id").onblur = function() {
            client_tax_id = $('#new_client_tax_id').val();
        };

        document.getElementById("new_client_address_street").onblur = function() {
            client_address_street = $('#new_client_address_street').val();
        };

        document.getElementById("new_client_address_town").onblur = function() {
            client_address_town = $('#new_client_address_town').val();
        };

        document.getElementById("new_client_address_zip").onblur = function() {
            client_address_zip = $('#new_client_address_zip').val();
        };

        $('#confirm_about_client').on("click", function() {

            var about_client_Ref = firebase.database().ref('about_client');
            var new_about_client_Ref = about_client_Ref.push();
            new_about_client_Ref.set({

                'client_name_id': client_name,
                'client_legal_id': client_legal_id,
                'client_tax_id': client_tax_id,
                'client_address_street': client_address_street,
                'client_address_town': client_address_town,
                'client_address_zip': client_address_zip,

            });



        });



    };


    if (view == "invoice") {

        
        date_issued = $('#new_date_issued').val();
        date_to_send = $('#new_date_to_send').val();
        amount = "";
        client_name = $('#new_client').val();
        client_key = $('#new_client_key').val();
        for_what = "";
        

// tohle je pro prvni prubeh, kdyz jeste neni zadna faktura

        var clientRef = firebase.database().ref("about_client"); 
        clientRef.limitToLast(1).on('child_added', function(snapshot) {

            var key = snapshot.key;
            var client = snapshot.child("client_name_id").val();
            var rest_of_client = snapshot.child("client_address_street").val() + ", " +
                snapshot.child("client_address_town").val() + ", IČ " + snapshot.child("client_legal_id").val();

            $('#new_client').text(client);
            $('.client .additional_info').text(rest_of_client);
            $('#new_client_key').val(key);


// tohle plni data z posledni faktury

        var invoiceRef = firebase.database().ref("invoice"); 
        invoiceRef.limitToLast(1).on('child_added', function(snapshot) {

            var key = snapshot.key;
            var client = snapshot.child("client_key").val();

            invoice_number = (1 * (snapshot.child("invoice_number").val()) + 1);
            invoice_number_year = snapshot.child("invoice_number_year").val();
            thanks = snapshot.child("thanks").val();

            document.getElementById("new_invoice_number").value = invoice_number; //doplnit ty debilni podminky


            document.getElementById("new_invoice_number_year").value = snapshot.child("invoice_number_year").val();

            last_invoice_number = "Poslední faktura měla číslo " + snapshot.child("invoice_number").val() + 
                snapshot.child("invoice_number_year").val() 

            $('#invoice_number .additional_info').text(last_invoice_number);

            document.getElementById("new_thanks").value = snapshot.child("thanks").val();


            var last_client = firebase.database().ref("about_client");
            var ref = last_client.child(client);
//
            

                        ref.once("value")
                            .then(function(snapshot) {

                                var key = snapshot.key;
                                var client = "<strong>" + snapshot.child("client_name_id").val() + "</strong>";
                                var rest_of_client = snapshot.child("client_address_street").val() + ", " +
                                    snapshot.child("client_address_town").val() + ", IČ " + snapshot.child("client_legal_id").val();


                                $('#new_client').html(client);
                                $('.client .additional_info').text(rest_of_client);
                                $('#new_client_key').val(key);
});
                              

// tohle plni seznam klientu pro dropdown

            var a = firebase.database().ref("about_client");
            var query = a.orderByKey();

            

            query.once("value")
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        // key will be "ada" the first time and "alan" the second time
                        var key = childSnapshot.key;
                        // childData will be the actual contents of the child
                        var childData = childSnapshot.val();

                        $('.client_list').append(
                            '<div class="a" data-client_id="' + key + '">' +
                            '<p>' + childData.client_name_id + '</p>' +
                            '<p>' + childData.client_address_street + ", " +
                            childData.client_address_town + ", IČ " + childData.client_legal_id + '</p>' +
                            '</div>'
                        );
                    });

// todle vybira klienta z dropdownu

                    $('.select_another_client').on("click", function() {

                    $('.select_client_list').toggleClass('hidden');

                    });

                    $('.client_list div').on("click", function() {

                        var key = ($(this).data("client_id"));
                        var ref = a.child(key);

                        ref.once("value")
                            .then(function(snapshot) {
                                var key = snapshot.key;
                                var client = snapshot.child("client_name_id").val();
                                var rest_of_client = snapshot.child("client_address_street").val() + ", " +
                                    snapshot.child("client_address_town").val() + ", IČ " + snapshot.child("client_legal_id").val();


                                $('#new_client').val(client);
                                $('.client .additional_info').text(rest_of_client);
                                $('#new_client_key').val(key);

                                $('.select_client_list').toggleClass('hidden');
                            });


                    
                });
        });


// todle vyplnuje me jako dodavatele, i kdyz to bere posledniho 

        var query = firebase.database().ref("about_me").orderByKey();

        query.once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val();


                    $('#about_me').append(
                        '<div data-about_me_id="' + key + '">' +
                        '<p>' + '<strong>' + childData.about_me_id + '</strong>' + '</p>' +
                        '<p>' + childData.my_address_street + '</p>' +
                        '<p>' + childData.my_address_town + ", " + childData.my_address_zip + '</p>' +
                        '<p class="break">' + "IČ " + childData.my_legal_id + '</p>' +
                        '<p>' + "č.ú. " + childData.my_account_number_prefix + " " + childData.my_account_number +
                        " / " + childData.my_bank_code + '</p>' +

                        '</div>'
                    );
                });
            });

// todle je vo datumech a jejich predvyplneni

        // aby to fungovalo
            $.datepicker.setDefaults( $.datepicker.regional[ "cs" ] );
            moment.locale('cs');

        // predvyplneni datumu

            document.getElementById("new_date_issued").value = moment().format('l');
            document.getElementById("new_date_to_send").value = moment().add(14, 'days').format('l');
            

        // naplneni DB z dat, ktery jsou predvyplneny 


        
        
        console.log(invoice_number, date_issued, date_to_send, client_name, client_key)

        
        document.getElementById("new_invoice_number").onblur = function() {
            invoice_number = $('#new_invoice_number').val();

            $('#invoice_number .status').removeClass('unchecked');
            $('#invoice_number .status').addClass('checked');

        };

        document.getElementById("new_invoice_number_year").onblur = function() {
            invoice_number_year = $('#new_invoice_number_year').val();

            $('#invoice_number .status').removeClass('unchecked');
            $('#invoice_number .status').addClass('checked');

        };

// issue date
        
        $("#new_date_issued").datepicker({
            onSelect: function() { 
                var dateObject = $(this).datepicker('getDate'); 
                document.getElementById("new_date_issued").value = moment(dateObject).format('l');
                date_issued = $('#new_date_issued').val();

                $('#date_issued .status').removeClass('unchecked');
                $('#date_issued .status').addClass('checked');

                }
            });

            document.getElementById("new_date_issued").onblur = function() {
                date_issued = $('#new_date_issued').val();

                $('#date_issued .status').removeClass('unchecked');
                $('#date_issued .status').addClass('checked');

                };

// date to send

        $("#new_date_to_send").datepicker({
            onSelect: function() { 
                var dateObject = $(this).datepicker('getDate'); 
                document.getElementById("new_date_to_send").value = moment(dateObject).format('l');
                date_to_send = $('#new_date_to_send').val();

                $('#date_to_send .status').removeClass('unchecked');
                $('#date_to_send .status').addClass('checked');
                

                }
            });

            document.getElementById("new_date_to_send").onblur = function() {
                date_to_send = $('#new_date_to_send').val();
                
                $('#date_to_send .status').removeClass('unchecked');
                $('#date_to_send .status').addClass('checked');

                };

//

        document.getElementById("new_amount").onblur = function() {
            amount = $('#new_amount').val();

            $('#amount .status').removeClass('unchecked');
            $('#amount .status').addClass('checked');
        };

        document.getElementById("new_client").onblur = function() {
            client_name = $('#new_client').val();
            client_key = $('#new_client_key').val();
        };

       
        document.getElementById("new_for_what").onblur = function() {
            for_what = $('#new_for_what').val();

            $('#for_what .status').removeClass('unchecked');
            $('#for_what .status').addClass('checked');
        };

        document.getElementById("new_thanks").onblur = function() {
            thanks = $('#new_thanks').val();

            $('#thanks .status').removeClass('unchecked');
            $('#thanks .status').addClass('checked');
        };

        $('#confirm_invoice').on("click", function() {

            client_name = $('#new_client').val();
            client_key = $('#new_client_key').val();

            var about_invoice_Ref = firebase.database().ref('invoice');
            var new_about_invoice_Ref = about_invoice_Ref.push();
            new_about_invoice_Ref.set({

                'invoice_number': invoice_number,
                'invoice_number_year': invoice_number_year,
                'date_issued': date_issued,
                'date_to_send': date_to_send,
                'amount': amount,
                'client_name': client_name,
                'client_key': client_key,
                'for_what': for_what,
                'thanks': thanks,

            });

        });
 }); 
        });

    };



    if (view == "preview") {

        var invoiceRef = firebase.database().ref("invoice"); // tohle je pro prvni prubeh, kdyz jeste neni zadna faktura

        invoiceRef.limitToLast(1).on('child_added', function(snapshot) {

            
            var invoice_number = "Faktura č. " + snapshot.val().invoice_number;
            var for_what = snapshot.val().for_what;
            var amount = snapshot.val().amount + " Kč";
            var date_to_send = snapshot.val().date_to_send;
            var date_issued = snapshot.val().date_issued;
            var thanks = snapshot.val().thanks;

            var akey = snapshot.val().client_key;

            var clientref = firebase.database().ref("about_client").child(akey);

            clientref.once('value')
                .then(function(snapshot) {

                var client_name = snapshot.val().client_name_id;
                var client_address_street = snapshot.val().client_address_street;
                var client_town = snapshot.val().client_address_town + "  " +
                snapshot.val().client_address_zip;

                var client_legal_id = "IČ " + snapshot.val().client_legal_id;
                
            
            var myRef = firebase.database().ref("about_me");

            myRef.limitToLast(1).on('child_added', function(snapshot) {

            var my_name = snapshot.val().about_me_id;
            var my_address_street = snapshot.val().my_address_street
            var my_town = snapshot.val().my_address_town + "  " +
                snapshot.val().my_address_zip;

            var my_legal_id = "IČ " + snapshot.val().my_legal_id;
            
            
            var my_account = snapshot.val().my_account_number_prefix + snapshot.val().my_account_number + " / " +
                snapshot.val().my_bank_code;
                // ... kdyz je prefix prazdnej, nezobrazovat pomlcku



            $('#invoice_number').html(invoice_number);


            $('#me .name').html(my_name);
            $('#me .address_street').html(my_address_street);
            $('#me .address_town').html(my_town);
            $('#me .legal_id span').html(my_legal_id);

            $('#client .name').html(client_name);
            $('#client .address_street').html(client_address_street);
            $('#client .address_town').html(client_town);
            $('#client .legal_id span').html(client_legal_id);

            $('#for_what .for_what').html(for_what);
            $('#amount .total_amount').html(amount);

            $('#date .date_to_send').html(date_to_send);
            $('#date .date_issued').html(date_issued);

            $('#account_number .my_account_number').html(my_account);

            $('#thanks .thanks').html(thanks);

       }); 

              }); 

             });



    };




}());