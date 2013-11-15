Propane Theme
=============

Our chic theme

## Setup

First, clone the repo:

```bash
git clone https://github.com/chicisimo/propane-theme.git <target directory>
cd <target directory>
```

There are 2 ways to deploy the theme to propane.

The first one deploys a default version we all agree more or less:

```bash
$ script/bootstrap
```

But also, you can add your own style customizations to
the default theme and make it more personal

```bash
$ script/new_person <your nickname>
$ script/bootstrap <your nickname>
```

The first command creates a folder into `people` with your nickname
and creates all the style files that are in the default folder,
ready to be extended (using scss). Once you have added your customizations,
run the second command to deploy them to Propane(you'll have to reload the room).

You will need to run the bootstrap command after each customization to deploy it.

For example, if I wanted to change the background color to a darker one, this
would be the flow:

```bash
$ script/new_person juanxo # Only necessary the first time to create my personal folder
$ vim people/juanxo/styles/cf_chat.scss
```

```scss
@import "../../default/styles/cf_chat"; // This is there by default to import the default styles

$main-dark: #333;

.night-mode {
  background-color: $main-dark !important;
  color: #fff !important;

  .Left .col, #Container {
    background: $main-dark !important;
  }

  table.chat {
    tr, td.person, tr.kick_message td, tr.enter_message td {
      background: $main-dark !important;
    }

    td.body, td.person, tr.kick_message td, tr.enter_message td {
      border-color: $main-dark !important;
      border-left-color: lighten($main-dark, 5%) !important;
    }
  }
}
```

```bash
$ script/bootstrap juanxo
```

Enjoy! :heart:
