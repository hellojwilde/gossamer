**Gossamer** is an experimental fork of Mozilla's [browser.html research project](https://github.com/mozilla/browser.html). We're exploring cutting-edge functional and reactive programming practices to enable workflows for rapidly shipping browser front-end UX.

It incorporates React Hot Loader and Webpack as well as integration with Github and  Mozillians.org to demonstrate:
*Live, restartless distribution of front-end code separately from the back-end, enabling users to start hacking with just a binary, and side-stepping the need to set up a working copy of mozilla-central.
*Infrastructure that provides empowering and less subjective pathways to shipping new features to a broader audience, such as A/B testing. 
*How the above can be sweetened with collaborative tooling that enables cross-team collaboration and volunteer participation to scale.


The demo is made of of three parts:
* [gossamer](https://github.com/hellojwilde/gossamer) - Our fork of browser.html.
* [gossamer-server](https://github.com/hellojwilde/gossamer-server) - The build and distribution server.
* [gossamer-larch-patches](https://github.com/hellojwilde/gossamer-larch-patches) - Tweaks to Mozilla’s larch project branch containing the graphene runtime. We fixed a bug and made a configuration tweak.

Once we hit our [Demo 0.5 Milestone](https://github.com/hellojwilde/gossamer/milestones/Demo%200.5), you'll be able to download a build of Gossamer and demo trying out experimental branches. We'll update this readme (this very line even!) with the howto closer to the milestone.

The server is currently deployed at gossamer-server.herokuapp.com.

This project is a work in progress, and there's lots more cool stuff we'd love to implement! We hope people get as excited as we are about architectures that enable new developmental workflows!

If you'd like to get involved:
* Read about the origins of this project via these blog posts by [Jonathan Wilde](http://jwilde.me/mozilla/2015/07/02/gossamer.html) and [Lyre Calliope](http://captaincalliope.net/2015/07/03/participation-infrastructure-gossamer/). Also read our [periodic progress updates](http://mozillatracks.captaincalliope.net/tagged/gossamer).
* join us at irc.mozilla.org channel #gossamer
* See if there's any work ready or in progress you'd like to contribute to by checking out our issues via https://waffle.io/hellojwilde/gossamer [![Stories in Ready](https://badge.waffle.io/hellojwilde/gossamer.png?label=ready&title=Ready)](https://waffle.io/hellojwilde/gossamer)
* Tweet us at [@hellojwilde](http://twitter.com/hellojwilde) and [@captaincalliope](http://twitter.com/captaincalliope)!
