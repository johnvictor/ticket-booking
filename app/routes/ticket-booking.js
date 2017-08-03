import Ember from 'ember';

export default Ember.Route.extend({

	//model hook
	model() {
		return Ember.Object.create({
			seats: this.initSeats(),
			selectedTicketsCount: 0,
			totalAmount: 0
		});
	},

	//setupcontroller hook - to initiaze model values
	setupController(controller, model) {
		this._super(controller, model);

		this.updateTotalSeatsCount();
		this.updateAvailableTicketCount();
		this.updateBookedSeatsCount();
	},

	//actions passed from component
	actions: {
		updateAvailableTicketCountAction() {
			this.updateAvailableTicketCount();
		},

		updateBookedSeatsCountAction() {
			this.updateBookedSeatsCount();
		}
	},

	//setup seat values
	initSeats() {
		let seats = [];
		let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		let colomns = [];

		for(let i = 0; i < 8; i++) {

			colomns = [];
			for(let j = 1; j <=12; j++) {
				colomns.push(Ember.Object.create({
					no: j,
					isSelected: false,
					isBooked: false
				}));
			}

			seats.push({
				row: rows[i],
				columns: colomns
			});
		}

		return seats;
	},

	updateTotalSeatsCount() {
		let model = this.currentModel;
		let totalSeatsCount = 0;

		model.seats.forEach(function(seat) {
			totalSeatsCount += seat.columns.length
		});
		
		Ember.set(model, 'totalSeatsCount', totalSeatsCount);
	},

	updateBookedSeatsCount() {
		let model = this.currentModel;
		let bookedSeatsCount = 0;

		model.seats.forEach(function(seat) {
			seat.columns.forEach(function(col) {
				if(col.isBooked) {
					bookedSeatsCount++;
				}
			});
		});
		
		Ember.set(model, 'bookedSeatsCount', bookedSeatsCount);
	},

	updateAvailableTicketCount() {
		let model = this.currentModel;
		let availableTicketsCount = 0;

		model.seats.forEach(function(seat) {
			seat.columns.forEach(function(col) {
				if(!col.isSelected) {
					availableTicketsCount++;
				}
			});
		});
		
		Ember.set(model, 'availableTicketsCount', availableTicketsCount);

		this.calculateBill();
	},

	calculateBill() {
		let model = this.currentModel;
		let selectedTicketsCount = model.get('totalSeatsCount') - model.get('availableTicketsCount');
		Ember.set(model, 'selectedTicketsCount', selectedTicketsCount);
		Ember.set(model, 'totalAmount', selectedTicketsCount * 100);
	}
});