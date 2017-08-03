import Ember from 'ember';

export default Ember.Component.extend({

	actions: {
		selectSeat(column) {
			column.toggleProperty('isSelected');
			this.sendAction('calculateAvailSeat');
		},

		book() {
			let seats = this.get('seats');
			seats.forEach(function(seat) {
				seat.columns.forEach(function(col) {
					if(col.isSelected) {
						Ember.set(col, 'isBooked', true);
					}
				});
			});

			this.sendAction('calculateBookedSeat');
		},

		reset() {
			let seats = this.get('seats');
			seats.forEach(function(seat) {
				seat.columns.forEach(function(col) {
					if(col.isSelected) {
						Ember.set(col, 'isBooked', false);
						Ember.set(col, 'isSelected', false);
					}
				});
			});

			this.sendAction('calculateAvailSeat');
			this.sendAction('calculateBookedSeat');
		}
	}
});
