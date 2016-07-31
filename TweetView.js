var TweetView = Backbone.View.extend({
	tagName: 'div',
	events: {
		'click .edit': 'edit',
		'click .delete': 'delete',
		'blur .status': 'close',
		'keypress .status': 'onEnterUpdate'
	},
	initialize: function() {
		this.template = _.template($("#tweet-template").html());
	},
	render: function() {
		var modelData = this.model.toJSON();
		compiledHTML = this.template({author: modelData.author, status: modelData.status});
		this.$el.html(compiledHTML);
		return this;
	},
	edit: function(ev) {
		ev.preventDefault();
		$statusElement = this.$el.find(".status");
		$editElement = this.$el.find(".edit");
		var text = $editElement.text();
		if(text === "[Edit]") {
			$editElement.text("[Done]");
			$statusElement.attr("contenteditable", true).focus();
			console.log("Editing ", $statusElement.text());
		} else {
			$editElement.text("[Edit]");
			$statusElement.attr("contenteditable", false);
		}
		this.model.set("status", $statusElement.text());	
	},
	delete: function(ev) {
		ev.preventDefault();
		app.tweets.remove(this.model);
	},
	close: function(ev) {
		var self = this;
		_.delay(function() {
			$statusElement = self.$el.find(".status");
			$editElement = self.$el.find(".edit");
			var text = $editElement.text();
			if(text === "[Done]") {
				$editElement.text("[Edit]");
				$statusElement.attr("contenteditable", false);
				self.model.set("status", $statusElement.text());
			}
		}, 100);
	},
	onEnterUpdate: function(ev) {
		if (ev.keyCode === 13) {
			ev.preventDefault();
			this.close();
		}
	}
});