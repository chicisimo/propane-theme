Campfire.Transcript.messageTemplates =
  text_message: new Template("""
    <tr class="message text_message" id="message_\#{id}">
      <td class="person">
        <span class="author" data-avatar="\#{avatar}" data-email="\#{email_address}" data-name="\#{name}">\#{name}</span>
      </td>
      <td class="body">
        <div class="body">\#{body}</div>
        <span class="star ">
          <a href="#" onclick="chat.starmanager.toggle(this); return false;" title="Starred lines appear as highlights in the transcript."></a>
        </span>
      </td>
    </tr>
  """)
  paste_message: new Template("""
    <tr class="message paste_message" id="message_\#{id}">
      <td class="person">
        <span class="author" data-avatar="\#{avatar}" data-email="\#{email_address}" data-name="\#{name}">\#{name}</span>
      </td>
      <td class="body">
        <a href="/room/\#{room_id}/paste/\#{id}" target="_blank">View paste</a>
        <br>
        <div class="body">
          <pre>
            <code>\#{body}</code>
          </pre>
        </div>
        <span class="star ">
          <a href="#" onclick="chat.starmanager.toggle(this); return false;" title="Starred lines appear as highlights in the transcript."></a>
        </span>
      </td>
    </tr>
  """)
  tweet_message: new Template("""
    <tr class="message tweet_message" id="message_\#{id}">
      <td class="person">
        <span class="author" data-avatar="\#{avatar}" data-email="\#{email_address}" data-name="\#{name}">\#{name}</span>
      </td>
      <td class="body">
        <div class="body">
          <span class="clearfix tweet">
            <span class="tweet_avatar">
              <a href="http://twitter.com/\#{tweet.author_username}/status/\#{tweet.id}" target="_blank">
                <img alt="Profile_normal" height="48" src="\#{tweet.author_avatar_url}" width="48">
              </a>
            </span>
            \#{tweet.message}
            <span class="tweet_author">— <a href="http://twitter.com/\#{tweet.author_username}/status/\#{tweet.id}" class="tweet_url" target="_blank">@\#{tweet.author_username}</a> via Twitter</span> 
          </span>
        </div>
        <span class="star ">
          <a href="\#" onclick="chat.starmanager.toggle(this); return false;" title="Starred lines appear as highlights in the transcript."></a>
        </span>
      </td
    </tr>
  """)
  enter_message: new Template("""
    <tr class="message enter_message" id="message_\#{id}">
      <td class="person">
        <span class="author" data-avatar="\#{avatar}" data-email="\#{email_address}" data-name="\#{name}">\#{name}</span>
      </td>
      <td class="body">
        <div>has entered the room</div>
      </td>
    </tr>
  """)
  kick_message: new Template("""
    <tr class="message kick_message" id="message_\#{id}">
      <td class="person">
        <span class="author" data-avatar="\#{avatar}" data-email="\#{email_address}" data-name="\#{name}">\#{name}</span>
      </td>
      <td class="body">
        <div>has left the room</div>
      </td>
    </tr>
  """)
  upload_message: new Template("""
    <tr class="message upload_message" id="message_\#{id}">
      <td class="person">
        <span class="author" data-avatar="\#{avatar}" data-email="\#{email_address}" data-name="\#{name}">\#{name}</span>
      </td>
      <td class="body">
        <div class="body">
          <img alt="Icon_png_small" class="file_icon" height="18" src="/images/icons/icon_PNG_small.gif?1331159708" width="24">
          <a href="\#{full_url}" target="_blank" title="\#{body}">\#{body}</a>
        </div>
      </td>
    </tr>
  """)
  upload_message_image: new Template("""
    <tr class="message upload_message" id="message_\#{id}">
      <td class="person">
        <span class="author" data-avatar="\#{avatar}" data-email="\#{email_address}" data-name="\#{name}">\#{name}</span>
      </td>
      <td class="body">
        <div class="body">
          <img alt="Icon_png_small" class="file_icon" height="18" src="/images/icons/icon_PNG_small.gif?1331159708" width="24">
          <a href="\#{full_url}" target="_blank" title="\#{body}">\#{body}</a>
          <br>
          <a href="\#{full_url}" class="image" target="_blank">
            <img alt="\#{body}" onerror="$dispatch('inlineImageLoadFailed', this)" onload="$dispatch('inlineImageLoaded', this)" src="\#{thumb_url}">
          </a>
        </div>
      </td>
    </tr>
  """)
  timestamp_message: new Template("""
    <tr class="message timestamp_message" id="message_\#{id}">
      <td class="date">
        <span class="author" style='display:none'></span>
      </td>
      <td class="time">
        <div class='body'>\#{time}</div>
      </td>
    </tr>
  """)
