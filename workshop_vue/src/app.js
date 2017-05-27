var app = new Vue({ // object s parametrem
	el: '#app',
	data: {
		message: 'Ahoj',
		seen: true,
		todos: [
			{text: 'Learn Javascript'},
			{text: 'Learn Vue'},
			{text: 'Build invoice'}
		],
		newTodo: '',
		vat: false,
		newClientLegalId: '',
		newClientName: '',
		clients:[ 
		
			{
			"name" : 			"Název firmy, s.r.o.",
			"address_street" : 	"Ulice a č.p.",
			"address_town" :	"Obec",
			"address_zip" : 	"PSČ",
			"legal_id" : 		"00000000"
			},
			
			{
			"name" : 			"Švejda Goldmann, s.r.o.",
			"address_street" : 	"Kanadská 1633/3",
			"address_town" :	"Praha 6 - Dejvice",
			"address_zip" : 	"160 00",
			"legal_id" : 		"04888189"
			},
			
			{
			"name" :			"Technologická agentura ČR",
			"address_street" :	"Evropská 1692/37",
			"address_town" :	"Praha 6 - Dejvice",
			"address_zip" : 	"160 00",
			"legal_id" : 		"72050365"
			},
			
			{
			"name" : 			"Principal engineering s.r.o.",
			"address_street" :	"Hanusova 16",
			"address_town" :	"Praha 4",
			"address_zip" : 	"140 00",
			"legal_id" : 		"26775794"
			},

			{
			"name" : 			"Principal engineering s.r.o.",
			"address_street" :	"Hanusova 16",
			"address_town" :	"Praha 4",
			"address_zip" : 	"140 00",
			"legal_id" : 		""
			}
		],
		invoiceClient: {},

		
			
		
	},
	methods: {
		toggleMessage : function () {
			console.log('klikli sme');
			this.seen = !this.seen //vykricnik nastavi obracenou hodnotu, takze toggle
		},
		addTodo : function () {
			if (this.newTodo) { // je to samy jako if this.newTodo != "" , takze jenom kdyz je text v poli, prida se
				this.todos.push({ text: this.newTodo}) // do rtoho seznamu to jebne push, coz je javascript
				this.newTodo = "" //vymaze mi obsah input fieldu
			}
		},
		selectClient : function (client) {
			this.invoiceClient = client;
			if (this.invoiceClient !=0) { 
				$('.uncheckedInvoice').html(OK);
			}
			
		},
		addNewClient : function () {
			this.clients.push({ legal_id: this.newClientLegalId , name:this.newClientName })
			
		},
		toggleChecked : function () {

		}
	}
}) 





