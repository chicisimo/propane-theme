var hex_chr = "0123456789abcdef";
var showAuthor, getName, getImage, getAvatar;
var Chicisimo = {
  responders: []
};

function rhex(num)
{
  str = "";
  for(j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

function str2blks_MD5(str)
{
  nblk = ((str.length + 8) >> 6) + 1;
  blks = new Array(nblk * 16);
  for(i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

function cmn(q, a, b, x, s, t)
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function calcMD5(str)
{
  x = str2blks_MD5(str);
  a =  1732584193;
  b = -271733879;
  c = -1732584194;
  d =  271733878;

  for(i = 0; i < x.length; i += 16)
  {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i+10], 17, -42063);
    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = ff(d, a, b, c, x[i+13], 12, -40341101);
    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = gg(c, d, a, b, x[i+11], 14,  643717713);
    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = gg(c, d, a, b, x[i+15], 14, -660478335);
    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i+10], 15, -1051523);
    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = ii(d, a, b, c, x[i+15], 10, -30611744);
    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

function xor(a,b)
{
  return !a != !b
}

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
  var author, body, name, image;

  author = message.authorElement();
  body = message.bodyCell;

  if (USER_ACTIONS.include(message.kind))
    body = body.select('div:first')[0];

  if (author.visible())
    showAuthor(message, body);

  author.hide();
};

showAuthor = function (message, body) {
  var name, image;

  name = getAuthorName(message);
  if (message.actsLikeTextMessage())
    image = getImage(message);

  body.insert({top: name});

  if (image)
    message.authorElement().insert({after: image});
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
