calcMD5 = require('./md5')

avatarResponder = (message) ->
  author = message.authorElement()
  body = getMessageWrapperElement(message)

  if author.visible()
    showAuthor(message, body)

  author.remove()

getMessageWrapperElement = (message) ->
  body = message.bodyCell

  if Campfire.USER_ACTIONS.include(message.kind)
    body.select('div:first')[0]
  else body

showAuthor = (message, body) ->
  if message.actsLikeTextMessage()
    image = getImage(message)
    message.authorElement().insert({after: image})

  name = getAuthorName(message)
  body.insert({top: name})

getAuthorName = (message) ->
  author = message.authorElement()
  separator = if Campfire.USER_ACTIONS.include(message.kind) then '&nbsp' else '<br>'

  return '' if message.kind == 'timestamp'

  "<strong class=\"authorName\">#{author.textContent}</strong>#{separator}"

getImage = (message) ->
  avatar = getAvatar(message.authorElement())

  return unless avatar

  image = document.createElement('img')
  image.alt    = message.author()
  image.title  = message.author()
  image.width  = 32
  image.height = 32
  image.align  = 'absmiddle'
  image.src    = avatar

  image.outerHTML

getAvatar = (author) ->
  email = author.getAttribute('data-email')

  return '' unless email

  hash = calcMD5(email.trim().toLowerCase())
  "https://secure.gravatar.com/avatar/#{hash}"

module.exports = avatarResponder
