var Tweet = Backbone.Model.extend({
	defaults: function() {
		return {
			author: '',
			status: ''
		}
	}
});