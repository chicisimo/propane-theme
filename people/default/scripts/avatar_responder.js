var calcMD5 = require('./md5');

var avatarResponder = function(message) {
  var author, body;

  author = message.authorElement();
  body = getMessageWrapperElement(message);

  if (author.visible())
    showAuthor(message, body);

  author.hide();
};

var getMessageWrapperElement = function(message) {
  var body = message.bodyCell;
  console.log(Campfire.USER_ACTIONS);
  return Campfire.USER_ACTIONS.include(message.kind) ?
    body.select('div:first')[0] : body;
};

var showAuthor = function (message, body) {
  var name, image;

  name = getAuthorName(message);
  if (message.actsLikeTextMessage()) {
    image = getImage(message);
    message.authorElement().insert({after: image});
  }

  body.insert({top: name});
};

var getAuthorName = function (message) {
  var author, separator;

  author = message.authorElement();
  separator = Campfire.USER_ACTIONS.include(message.kind) ? '&nbsp;' : '<br>';

  if (message.kind === 'timestamp')
    return '';

  return '<strong class="authorName">' + author.textContent + '</strong>' + separator;
};

var getImage = function(message) {
  var avatar, image;

  avatar = getAvatar(message.authorElement());

  if (!avatar)
    return;

  image = document.createElement('img');
  image.alt    = message.author();
  image.title  = message.author();
  image.width  = 32;
  image.height = 32;
  image.align  = 'absmiddle';
  image.src    = avatar;

  return image.outerHTML;
};

var getAvatar = function (author) {
  var email, hash, avatar;

  email = author.getAttribute('data-email');

  if (!email)
    return '';

  hash = calcMD5(email.trim().toLowerCase());
  avatar = 'https://secure.gravatar.com/avatar/' + hash;

  return avatar;
};

module.exports = avatarResponder;
