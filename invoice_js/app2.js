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


    
    if (view == "preview") {





        var invoiceRef = firebase.database().ref("invoice"); // tohle je pro prvni prubeh, kdyz jeste neni zadna faktura

        invoiceRef.limitToLast(1).on('child_added', function(snapshot) {

            
            var invoice_number = "Faktura č. " + snapshot.val().invoice_number + snapshot.val().invoice_number_year;
            var pure_invoice_number = snapshot.val().invoice_number;
            var for_what = snapshot.val().for_what;
            var amount = snapshot.val().amount + " Kč";
            var pure_amount = snapshot.val().amount;
            var date_to_send = snapshot.val().date_to_send;
            var date_issued = snapshot.val().date_issued;
            var thanks = snapshot.val().thanks;

            var clientref = firebase.database().ref("about_client").child(snapshot.val().client_key);

            clientref.once('value')
                .then(function(snapshot) {

                
                
                var client = snapshot.val().client_name_id + ", " + snapshot.val().client_address_street + ", " + 
                    snapshot.val().client_address_town + ",  " + snapshot.val().client_address_zip;                
                var client_legal_id = "IČ " + snapshot.val().client_legal_id + ", " + 
                    "DIČ " + snapshot.val().client_tax_id;


console.log(date_to_send);
 

            var myRef = firebase.database().ref("about_me");

            myRef.limitToLast(1).on('child_added', function(snapshot) {
            
            
            var my_account = snapshot.val().my_account_number_prefix + snapshot.val().my_account_number + " / " +
                snapshot.val().my_bank_code;
                // ... kdyz je prefix prazdnej, nezobrazovat pomlcku

            var me = snapshot.val().about_me_id + ", " + snapshot.val().my_address_street + ", " + 
            snapshot.val().my_address_town + ",  " + snapshot.val().my_address_zip;

            var my_legal_id = "IČ " + snapshot.val().my_legal_id

            

            $('#invoice_number').html(invoice_number);


            $('#me .name').html(me);
            $('#me .legal_id').html(my_legal_id);
            

            $('#client .name').html(client);
            $('#client .legal_id').html(client_legal_id);
            

            $('#for_what .for_what').html(for_what);
            $('#amount .total_amount').html(amount);

            $('#date .date_to_send').html(date_to_send);
            $('.date_issued').html(date_issued);

            $('#account_number .my_account_number').html(my_account);

            $('#thanks .thanks').html(thanks);

// QR kod

            var a = moment(date_to_send, "DD-MM-YYYY").format('YYYY-MM-DD');
            var url = '<img src="' + "https://api.paylibo.com/paylibo/generator/czech/" + "image?accountNumber=" + snapshot.val().my_account_number + "&bankCode=" + snapshot.val().my_bank_code
            + "&amount=" + pure_amount + "&currency=CZK&vs=" + pure_invoice_number + "&date=" + a +'">';
            //datum poresit formaty

            
            console.log(url);

            
            
            $('.qr').html(url);

       }); 

              }); 

             });

    };




}());