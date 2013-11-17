var calcMD5 = require('./md5');
var showAuthor, getName, getImage, getAvatar, getMessageWrapperElement;
var Chicisimo = {
  responders: []
};

var USER_ACTIONS = ['enter','leave','kick','conference_created','lock','unlock','topic_change','allow_guests','disallow_guests'];

swizzle(Campfire.Message, {
  authorElement: function($super) {
    if (USER_ACTIONS.include(this.kind)) {
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

var avatarResponder = function(message) {
  var author, body;

  author = message.authorElement();
  body = getMessageWrapperElement(message);

  if (author.visible())
    showAuthor(message, body);

  author.hide();
};

getMessageWrapperElement = function(message) {
  var body = message.bodyCell;
  return USER_ACTIONS.include(message.kind) ?
    body.select('div:first')[0] : body;
};

showAuthor = function (message, body) {
  var name, image;

  name = getAuthorName(message);
  if (message.actsLikeTextMessage()) {
    image = getImage(message);
    message.authorElement().insert({after: image});
  }

  body.insert({top: name});
};

getAuthorName = function (message) {
  var author, separator;

  author = message.authorElement();
  separator = USER_ACTIONS.include(message.kind) ? '&nbsp;' : '<br>';

  if (message.kind === 'timestamp')
    return '';

  return '<strong class="authorName">' + author.textContent + '</strong>' + separator;
};

getImage = function(message) {
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

getAvatar = function (author) {
  var email, hash, avatar;

  email = author.getAttribute('data-email');

  if (!email)
    return '';

  hash = calcMD5(email.trim().toLowerCase());
  avatar = 'https://secure.gravatar.com/avatar/' + hash;

  return avatar;
};

Chicisimo.responders.push(avatarResponder);
Campfire.Responders.push("Chicisimo");
window.chat.installPropaneResponder("Chicisimo", "chicisimo");

Campfire.Transcript.messageTemplates = {
  text_message: new Template("<tr class=\"message text_message\" id=\"message_#{id}\"><td class=\"person\"><span class=\"author\" data-avatar=\"#{avatar}\" data-email=\"#{email_address}\" data-name=\"#{name}\">#{name}</span></td>\n  <td class=\"body\">\n    <div class=\"body\">#{body}</div>\n    \n  <span class=\"star \">\n    <a href=\"#\" onclick=\"chat.starmanager.toggle(this); return false;\" title=\"Starred lines appear as highlights in the transcript.\"></a>\n  </span>\n\n\n  </td>\n</tr>\n"),
  paste_message: new Template("<tr class=\"message paste_message\" id=\"message_#{id}\"><td class=\"person\"><span class=\"author\" data-avatar=\"#{avatar}\" data-email=\"#{email_address}\" data-name=\"#{name}\">#{name}</span></td>\n  <td class=\"body\">\n <a href=\"/room/#{room_id}/paste/#{id}\" target=\"_blank\">View paste</a> \n<br>   <div class=\"body\"><pre><code>#{body}</code></pre></div>\n    \n  <span class=\"star \">\n    <a href=\"#\" onclick=\"chat.starmanager.toggle(this); return false;\" title=\"Starred lines appear as highlights in the transcript.\"></a>\n  </span>\n\n\n  </td>\n</tr>\n"),
  tweet_message: new Template("<tr class=\"message tweet_message\" id=\"message_#{id}\"><td class=\"person\"><span class=\"author\" data-avatar=\"#{avatar}\" data-email=\"#{email_address}\" data-name=\"#{name}\">#{name}</span></td>\n  <td class=\"body\">\n <div class=\"body\"><span class=\"clearfix tweet\"><span class=\"tweet_avatar\"><a href=\"http://twitter.com/#{tweet.author_username}/status/#{tweet.id}\" target=\"_blank\"><img alt=\"Profile_normal\" height=\"48\" src=\"#{tweet.author_avatar_url}\" width=\"48\"></a></span> \n #{tweet.message} \n <span class=\"tweet_author\">— <a href=\"http://twitter.com/#{tweet.author_username}/status/#{tweet.id}\" class=\"tweet_url\" target=\"_blank\">@#{tweet.author_username}</a> via Twitter</span> </span></div>\n    \n  <span class=\"star \">\n    <a href=\"#\" onclick=\"chat.starmanager.toggle(this); return false;\" title=\"Starred lines appear as highlights in the transcript.\"></a>\n  </span>\n\n\n  </td>\n</tr>\n"),
  enter_message: new Template("<tr class=\"message enter_message\" id=\"message_#{id}\"><td class=\"person\"><span class=\"author\" data-avatar=\"#{avatar}\" data-email=\"#{email_address}\" data-name=\"#{name}\">#{name}</span></td>\n  <td class=\"body\">\n    <div>has entered the room</div>\n    \n\n\n  </td>\n</tr>\n"),
  kick_message: new Template("<tr class=\"message kick_message\" id=\"message_#{id}\"><td class=\"person\"><span class=\"author\" data-avatar=\"#{avatar}\" data-email=\"#{email_address}\" data-name=\"#{name}\">#{name}</span></td>\n  <td class=\"body\">\n    <div>has left the room</div>\n    \n\n\n  </td>\n</tr>\n"),
  upload_message: new Template("<tr class=\"message upload_message\" id=\"message_#{id}\"><td class=\"person\"><span class=\"author\" data-avatar=\"#{avatar}\" data-email=\"#{email_address}\" data-name=\"#{name}\">#{name}</span></td>\n  <td class=\"body\">\n    <div class=\"body\"><img alt=\"Icon_png_small\" class=\"file_icon\" height=\"18\" src=\"/images/icons/icon_PNG_small.gif?1331159708\" width=\"24\">\n<a href=\"#{full_url}\" target=\"_blank\" title=\"#{body}\">#{body}</a>\n</div>\n    \n\n\n  </td>\n</tr>\n"),
  upload_message_image: new Template("<tr class=\"message upload_message\" id=\"message_#{id}\"><td class=\"person\"><span class=\"author\" data-avatar=\"#{avatar}\" data-email=\"#{email_address}\" data-name=\"#{name}\">#{name}</span></td>\n  <td class=\"body\">\n    <div class=\"body\"><img alt=\"Icon_png_small\" class=\"file_icon\" height=\"18\" src=\"/images/icons/icon_PNG_small.gif?1331159708\" width=\"24\">\n<a href=\"#{full_url}\" target=\"_blank\" title=\"#{body}\">#{body}</a>\n<br>\n<a href=\"#{full_url}\" class=\"image\" target=\"_blank\"><img alt=\"#{body}\" onerror=\"$dispatch('inlineImageLoadFailed', this)\" onload=\"$dispatch('inlineImageLoaded', this)\" src=\"#{thumb_url}\"></a></div>\n    \n\n\n  </td>\n</tr>\n"),
  timestamp_message: new Template("<tr class=\"message timestamp_message\" id=\"message_#{id}\"><td class=\"date\"><span class=\"author\" style='display:none'></span></td>\n  <td class=\"time\">\n    <div class='body'>#{time}</div>\n    \n\n\n  </td>\n</tr>\n"),
};
