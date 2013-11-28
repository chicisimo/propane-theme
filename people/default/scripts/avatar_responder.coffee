calcMD5 = require('./md5')

avatarResponder = (message) ->
  author = message.authorElement()
  showAuthor(message) unless previousMessageBy(author)
  removeCampfireDefaultAuthorElement(author)

previousMessageBy = (author) ->
  !author.visible()

showAuthor = (message) ->
  showAuthorAvatar(message) if message.actsLikeTextMessage()
  showAuthorName(message)

showAuthorAvatar = (message) ->
  image = getImage(message)
  message.authorElement().insert({after: image})

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

showAuthorName = (message) ->
  messageElement(message).insert({top: getAuthorName(message)})

getAuthorName = (message) ->
  author = message.authorElement()
  separator = if Campfire.USER_ACTIONS.include(message.kind) then '&nbsp' else '<br>'

  return '' if message.kind == 'timestamp'

  "<strong class=\"authorName\">#{author.textContent}</strong>#{separator}"

messageElement = (message) ->
  body = message.bodyCell
  if Campfire.USER_ACTIONS.include(message.kind)
    body.select('div:first')[0]
  else
    body

removeCampfireDefaultAuthorElement = (author) ->
  author.remove()

module.exports = avatarResponder
