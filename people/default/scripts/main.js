var avatarResponder = require('./avatar_responder');
require('./message_templates');
var Chicisimo = {
  responders: []
};

Campfire.USER_ACTIONS = ['enter','leave','kick','conference_created','lock','unlock','topic_change','allow_guests','disallow_guests'];

swizzle(Campfire.Message, {
  authorElement: function($super) {
    if (Campfire.USER_ACTIONS.include(this.kind)) {
      return $super().select('span.author')[0];
    } else {
      return $super();
    }
  }
});

Campfire.Chicisimo = Class.create({
  initialize: function(chat) {
    chat.transcript.messages.forEach(this.executeResponders);

    chat.layoutmanager.layout();

    chat.windowmanager.scrollToBottom();
  },
  onMessagesInserted: function(messages) {
    var scrolledToBottom = chat.windowmanager.isScrolledToBottom();

    messages.forEach(this.executeResponders);

    if (scrolledToBottom) chat.windowmanager.scrollToBottom();
  },
  executeResponders: function(message) {
    Chicisimo.responders.forEach(function(responder) { responder(message); });
  }
});

Chicisimo.responders.push(avatarResponder);
Campfire.Responders.push("Chicisimo");
window.chat.installPropaneResponder("Chicisimo", "chicisimo");

