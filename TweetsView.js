var TweetsView = Backbone.View.extend({
	el: $("#tweets-view"),
	initialize: function() {
		console.log("first: ");
		console.log(this);
		this.model.on('add', this.render, this);
		this.model.on('remove', this.render, this);
	},
	render: function() {
		var self = this;
		console.log("Render of TweetSView called\n");
		self.$el.html('');
		_.each(self.model.toArray(), function(tweet) {
			var tweetView = new TweetView({model: tweet});
			self.$el.append(tweetView.render().$el);
//			console.log(tweetView.render().$el);
		});
	}
});