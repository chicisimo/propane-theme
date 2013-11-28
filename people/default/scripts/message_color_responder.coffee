messageColorResponder = (message) ->
  return unless message.actsLikeTextMessage()
  authorName = message.author()
  colorizeMessage(message) if authorName == message.chat.username

colorizeMessage = (message) ->
  message.element.classList.add('you')

module.exports = messageColorResponder
