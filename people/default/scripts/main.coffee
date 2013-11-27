avatarResponder = require('./avatar_responder')
Campfire.Transcript.messageTemplates = require('./message_templates')

window.Chicisimo =
  Responders: []

Campfire.USER_ACTIONS = ['enter','leave','kick','conference_created','lock','unlock','topic_change','allow_guests','disallow_guests']

swizzle(Campfire.Message, {
  authorElement: ($super) ->
    return $super().select('span.author')[0] if Campfire.USER_ACTIONS.include(this.kind)
    $super()
})

Campfire.Chicisimo = Class.create({
  initialize: (chat) ->
    chat.transcript.messages.forEach(this.executeResponders)

    chat.layoutmanager.layout()

    chat.windowmanager.scrollToBottom()
  ,onMessagesInserted: (messages) ->
    scrolledToBottom = chat.windowmanager.isScrolledToBottom()

    messages.forEach(this.executeResponders)

    chat.windowmanager.scrollToBottom() if scrolledToBottom
  ,executeResponders: (message) ->
    Chicisimo.Responders.forEach((responder) -> responder(message) )
})

Chicisimo.Responders.push(avatarResponder)
Campfire.Responders.push("Chicisimo")
window.chat.installPropaneResponder("Chicisimo", "chicisimo")

