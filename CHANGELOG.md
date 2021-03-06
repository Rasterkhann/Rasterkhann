## [0.8.13](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.12...v0.8.13) (2020-09-14)


### Bug Fixes

* **workers:** fix allocating more workers than could be possible ([cb8a07e](https://github.com/Rasterkhann/Rasterkhann/commit/cb8a07eb0542089f3c714228ed8c222588d9f47c)), closes [#150](https://github.com/Rasterkhann/Rasterkhann/issues/150)



## [0.8.12](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.11...v0.8.12) (2020-09-03)


### Bug Fixes

* **map:** prevent heroes from randomly showing up without a path and/or in weird areas ([fc293b3](https://github.com/Rasterkhann/Rasterkhann/commit/fc293b3091cf0e7296e1f9e9daaad56a87394eb2))


### Features

* **hero:** crystals now give a bonus % to stat generation, heroes now have harsher xp gain but their stats are boosted by the # of retired of that job ([ed9828f](https://github.com/Rasterkhann/Rasterkhann/commit/ed9828fb598bc69f2a38eeb2f5836595eccab6fe)), closes [#146](https://github.com/Rasterkhann/Rasterkhann/issues/146)
* **ui:** entire cave mountain area is clickable ([a2bd521](https://github.com/Rasterkhann/Rasterkhann/commit/a2bd521bfee29f6d5893637eaf08f64f13aee0d5)), closes [#144](https://github.com/Rasterkhann/Rasterkhann/issues/144)



## [0.8.11](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.10...v0.8.11) (2020-09-02)


### Bug Fixes

* **guildhall:** do not show retirement progress for unrecruited heroes ([e6d56fc](https://github.com/Rasterkhann/Rasterkhann/commit/e6d56fca8904dced0f2021603f57987669b4cc72))


### Features

* **archives:** add new hall of fame for heroes that have achieved records ([a8f4377](https://github.com/Rasterkhann/Rasterkhann/commit/a8f43777633eb0dbff53ec0476704f601585cd50)), closes [#145](https://github.com/Rasterkhann/Rasterkhann/issues/145)



## [0.8.10](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.9...v0.8.10) (2020-09-01)


### Bug Fixes

* **workshop:** auto recruit heroes should factor in hero cap ([82c3b45](https://github.com/Rasterkhann/Rasterkhann/commit/82c3b45f33961206d13b4805192012199fd28de9))


### Features

* **workshop:** add feature automation option ([995c7de](https://github.com/Rasterkhann/Rasterkhann/commit/995c7de813ec28900acb1267e2a56dcff315dcbd)), closes [#123](https://github.com/Rasterkhann/Rasterkhann/issues/123)
* **workshop:** allow for rejecting of tough+ adventures ([44c57e5](https://github.com/Rasterkhann/Rasterkhann/commit/44c57e595eef3d4bea9efed95526b20e9ae72dfa)), closes [#143](https://github.com/Rasterkhann/Rasterkhann/issues/143)
* **workshop:** allow workshop to auto retire and recruit heroes ([90892c0](https://github.com/Rasterkhann/Rasterkhann/commit/90892c0b77e3d0d6c65fa1f3573f29fdb2126201)), closes [#141](https://github.com/Rasterkhann/Rasterkhann/issues/141)



## [0.8.9](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.8...v0.8.9) (2020-08-27)


### Features

* **guildhall:** better identification for queued heroes, put them at top ([a65fa20](https://github.com/Rasterkhann/Rasterkhann/commit/a65fa2010272eacf5fafe88babbf49ee6746a46e)), closes [#142](https://github.com/Rasterkhann/Rasterkhann/issues/142)



## [0.8.8](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.7...v0.8.8) (2020-08-26)


### Bug Fixes

* **guildhall:** add missing retirement help text and remove requirement for it to show ([4fa2022](https://github.com/Rasterkhann/Rasterkhann/commit/4fa2022545410f2c04954b252735f002883465d1))


### Features

* **cave:** disable tough, challenging, extreme ([2bc2544](https://github.com/Rasterkhann/Rasterkhann/commit/2bc254456d69b78606f68052317c66f51068f66b))
* **guildhall:** add help text for when all heroes are queued recruit ([ac0385c](https://github.com/Rasterkhann/Rasterkhann/commit/ac0385c14ee95893863ba44b311dd0471a088706)), closes [#114](https://github.com/Rasterkhann/Rasterkhann/issues/114)
* **guildhall:** add new upgrades to tighten hero stat range ([7bc69fa](https://github.com/Rasterkhann/Rasterkhann/commit/7bc69fa4e7efc5aca6f41fabc53299d4ff96b251)), closes [#124](https://github.com/Rasterkhann/Rasterkhann/issues/124)
* **guildhall:** add prev/next arrows to peruse heroes more easily ([451b430](https://github.com/Rasterkhann/Rasterkhann/commit/451b4307da0a92471d7c00215500095906b1cda4)), closes [#122](https://github.com/Rasterkhann/Rasterkhann/issues/122)
* **guildhall:** rerolled heroes are sorted by rating ([d710cd5](https://github.com/Rasterkhann/Rasterkhann/commit/d710cd56065ca5fef7a37711dfdec3d0b1193ad7)), closes [#129](https://github.com/Rasterkhann/Rasterkhann/issues/129)
* **library:** add new trait that can lower required retirements ([8a0e180](https://github.com/Rasterkhann/Rasterkhann/commit/8a0e1800b93031dd41095457750f9de939b19d66)), closes [#131](https://github.com/Rasterkhann/Rasterkhann/issues/131)



## [0.8.7](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.6...v0.8.7) (2020-08-25)


### Bug Fixes

* **archives:** town stats should always re-coerce to number in case it adds string+num ([5f8baf2](https://github.com/Rasterkhann/Rasterkhann/commit/5f8baf2756799053d26f1b3b138ff08829e6e443)), closes [#127](https://github.com/Rasterkhann/Rasterkhann/issues/127)
* **legendary:** legendary adventures should not require mono-crystal costs ([dfb1ac1](https://github.com/Rasterkhann/Rasterkhann/commit/dfb1ac17104a4ec5d866e7a5416d71e00f428de0)), closes [#140](https://github.com/Rasterkhann/Rasterkhann/issues/140)


### Features

* **adventure:** pre-adventure shopping shows you the amount of gold earned ([3a93509](https://github.com/Rasterkhann/Rasterkhann/commit/3a935094c4696b006bac4e28a6f251f1e7413e24)), closes [#134](https://github.com/Rasterkhann/Rasterkhann/issues/134)
* **archives:** show tooltip for legendary adventures to show permanent rewards ([930c34a](https://github.com/Rasterkhann/Rasterkhann/commit/930c34ac3f2ff8dfa8d07c3c28cff81b822f222f)), closes [#132](https://github.com/Rasterkhann/Rasterkhann/issues/132)
* **guildhall:** add hero retirement progress bar ([eb2abe8](https://github.com/Rasterkhann/Rasterkhann/commit/eb2abe8b5f3c032d4680ca59c758cb7ba80a1a7d)), closes [#125](https://github.com/Rasterkhann/Rasterkhann/issues/125)
* **guildhall:** show when hero adventure ends ([fe29bbe](https://github.com/Rasterkhann/Rasterkhann/commit/fe29bbecac87e1cc28bbcb6602977c0897af609b)), closes [#121](https://github.com/Rasterkhann/Rasterkhann/issues/121)
* **retire:** retires scale based on how many have happened, instead of being a static 100 ([3b994b2](https://github.com/Rasterkhann/Rasterkhann/commit/3b994b257818d91f4abddbac8e708933992f9183)), closes [#126](https://github.com/Rasterkhann/Rasterkhann/issues/126)
* **skillbook:** add tooltips for each skill ([7758b14](https://github.com/Rasterkhann/Rasterkhann/commit/7758b1485a6651ff3a5e7a23e07371217c05bd5b)), closes [#139](https://github.com/Rasterkhann/Rasterkhann/issues/139)



## [0.8.6](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.5...v0.8.6) (2020-08-24)


### Bug Fixes

* **bazaar:** fix armor cost scaling ([95cd006](https://github.com/Rasterkhann/Rasterkhann/commit/95cd00658ccf0810a1f8a66b3938a8c22a47241b)), closes [#133](https://github.com/Rasterkhann/Rasterkhann/issues/133)
* **buildings:** lower level req for guildhall for armory and alchemist ([105b057](https://github.com/Rasterkhann/Rasterkhann/commit/105b057f32ab000cbbe602e078d1d68452f2dceb)), closes [#137](https://github.com/Rasterkhann/Rasterkhann/issues/137)
* **guildhall:** lower cost for cheaper training v ([9460973](https://github.com/Rasterkhann/Rasterkhann/commit/94609732f32f82f7766c2b60d54ea550039a4f83)), closes [#130](https://github.com/Rasterkhann/Rasterkhann/issues/130)
* **retire:** heroes should not be able to queue for retirement and legendary quests simultaneously ([5af8d74](https://github.com/Rasterkhann/Rasterkhann/commit/5af8d746c5685a2530ed886d1c56631539061da9)), closes [#138](https://github.com/Rasterkhann/Rasterkhann/issues/138)


### Features

* **features:** rebalance all upgrade costs to be consistent and overall lower ([3e3fb44](https://github.com/Rasterkhann/Rasterkhann/commit/3e3fb44089f5b5c7ed33f999f5b32a695ecadfa4)), closes [#135](https://github.com/Rasterkhann/Rasterkhann/issues/135)
* **ui:** all descriptions for features are improved a bit ([1fdf763](https://github.com/Rasterkhann/Rasterkhann/commit/1fdf763baa72ea313be1cbbd914ccf05a0603f86))
* **watchtower:** add new 'about offline progress' option to menu ([8c4f566](https://github.com/Rasterkhann/Rasterkhann/commit/8c4f566c5f8abb2ca5db949151e127adceb491b9)), closes [#136](https://github.com/Rasterkhann/Rasterkhann/issues/136)



## [0.8.5](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.4...v0.8.5) (2020-08-20)


### Bug Fixes

* **ui:** general stats (not specific ones) would show [object Object] instead of the number ([a05bfba](https://github.com/Rasterkhann/Rasterkhann/commit/a05bfba8e81efca3b4ae0e27fbc7a011db1a896f))
* **ui:** hide careful trait ([cc404b5](https://github.com/Rasterkhann/Rasterkhann/commit/cc404b5c062d3577fb28ad8ff9143d8cbfce88c8)), closes [#128](https://github.com/Rasterkhann/Rasterkhann/issues/128)



## [0.8.4](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.3...v0.8.4) (2020-08-18)


### Bug Fixes

* **legendary:** make legendary monster appear at final step for real ([bf7d763](https://github.com/Rasterkhann/Rasterkhann/commit/bf7d7632394aecd9449f2fea630912c1cf0cc212))
* **ui:** remove +5 stars on guild hall ([d17b608](https://github.com/Rasterkhann/Rasterkhann/commit/d17b60852222abec6c91350e3e1aa0a56ccb4c4b))


### Features

* **ui:** don't overwhelm the player about #retires if they havent done one yet ([2b40562](https://github.com/Rasterkhann/Rasterkhann/commit/2b40562bf18dfb1bcec0e4b19274a2e0c3c634a9)), closes [#119](https://github.com/Rasterkhann/Rasterkhann/issues/119)
* **ui:** show how many of a town stat you have in the requirements ([6513ec6](https://github.com/Rasterkhann/Rasterkhann/commit/6513ec68aa4abbe169db6ab6a7f23f6d28bbf0ca)), closes [#120](https://github.com/Rasterkhann/Rasterkhann/issues/120)



## [0.8.3](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.2...v0.8.3) (2020-08-17)


### Bug Fixes

* **guildhall:** a hero with no available 'any' traits but dual trait available could lock up the hero roll process ([58ce506](https://github.com/Rasterkhann/Rasterkhann/commit/58ce506291fd8b520086a95886e6a9665bd24484))
* **guildhall:** incorrect dismiss text referenced retirement ([4815e7c](https://github.com/Rasterkhann/Rasterkhann/commit/4815e7c21d4a5a0b741954a02f59773b5bb74ef7)), closes [#111](https://github.com/Rasterkhann/Rasterkhann/issues/111)
* **guildhall:** queuing recruits could add too many to the list on accident ([85bc52f](https://github.com/Rasterkhann/Rasterkhann/commit/85bc52f62a9a574b720d1a77c3784065a39d0cfb)), closes [#110](https://github.com/Rasterkhann/Rasterkhann/issues/110)
* **legendary:** bonus rewards for tough, challenging, extreme adventure completion as well ([badad6e](https://github.com/Rasterkhann/Rasterkhann/commit/badad6e12604b00e761c73deae75a1874213db9c))
* **legendary:** last encounter should be the only one to get a boss name ([b5f93b7](https://github.com/Rasterkhann/Rasterkhann/commit/b5f93b79b1724188cd9d4d856c35c87bde7985c1))
* **legendary:** spawn fewer monsters than a normal encounter ([3507da7](https://github.com/Rasterkhann/Rasterkhann/commit/3507da7b484e7b52b49a106e14f50aa8248419eb))
* **ui:** fix town stat text to not be main.sub and be more clear ([4755296](https://github.com/Rasterkhann/Rasterkhann/commit/4755296e222f3116323a70c8ebe67534efa77272)), closes [#118](https://github.com/Rasterkhann/Rasterkhann/issues/118)
* **ui:** hidden features should be excluded from 'upcoming feature' block ([a4e7e40](https://github.com/Rasterkhann/Rasterkhann/commit/a4e7e401f1822d042d4e5ff868ccd57c061af5ad)), closes [#117](https://github.com/Rasterkhann/Rasterkhann/issues/117)
* **ui:** remove feature list from town hall as it will never have upgrades ([af37b5a](https://github.com/Rasterkhann/Rasterkhann/commit/af37b5a21989cc5bb31c354e8c093da050f521b4)), closes [#113](https://github.com/Rasterkhann/Rasterkhann/issues/113)
* **ui:** rush cost should always be displayed even if you don't have enough money to do so ([bffe9b7](https://github.com/Rasterkhann/Rasterkhann/commit/bffe9b776af4ed8b31941f0b84e17af06b6cdbfd)), closes [#112](https://github.com/Rasterkhann/Rasterkhann/issues/112)


### Features

* **guildhall:** have coloration on stars to make it easier to distinguish good heroes ([44eaa88](https://github.com/Rasterkhann/Rasterkhann/commit/44eaa88ba7a6f6f42a8a3c93f9b5b33b13bc8929)), closes [#116](https://github.com/Rasterkhann/Rasterkhann/issues/116)



## [0.8.2](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.1...v0.8.2) (2020-08-14)


### Bug Fixes

* **ui:** 'all upgrades' popup should only happen when all features are, in fact, built - not just a few ([9de31f2](https://github.com/Rasterkhann/Rasterkhann/commit/9de31f201c0b35f029880a83d5e2ce830da1d9ff))


### Features

* **guildhall:** can queue heroes for recruitment ([b8fa805](https://github.com/Rasterkhann/Rasterkhann/commit/b8fa8055e02d4af84d69be19888bed898bfaa198)), closes [#107](https://github.com/Rasterkhann/Rasterkhann/issues/107)
* **ui:** allow for queuing heroes for legendary adventures ([c2811f9](https://github.com/Rasterkhann/Rasterkhann/commit/c2811f9c1879647d221796300d6eb356cc82ea21)), closes [#106](https://github.com/Rasterkhann/Rasterkhann/issues/106)
* **ui:** show next upgrade ([7368e09](https://github.com/Rasterkhann/Rasterkhann/commit/7368e09511a7b54488dcb39de7acca068843b034)), closes [#102](https://github.com/Rasterkhann/Rasterkhann/issues/102)
* **workshop:** auto scrap now will check if any heroes can use the item based on their class ([cf92330](https://github.com/Rasterkhann/Rasterkhann/commit/cf923307ed0b5eb60da1b1f6594143c1dc987656)), closes [#105](https://github.com/Rasterkhann/Rasterkhann/issues/105)



## [0.8.1](https://github.com/Rasterkhann/Rasterkhann/compare/v0.8.0...v0.8.1) (2020-08-14)


### Bug Fixes

* **adventure:** legendary modifier 20 -> 15 ([3e01053](https://github.com/Rasterkhann/Rasterkhann/commit/3e01053e7a242d2fed86419db3bf08726da2e574))
* **retire:** auto allocated workers should not set the number to 1, but to existing+1 ([5e4e827](https://github.com/Rasterkhann/Rasterkhann/commit/5e4e82725f5c95dab728d7e60a2c3218e701e536)), closes [#104](https://github.com/Rasterkhann/Rasterkhann/issues/104)
* **ui:** actually set stage2ui on retire ([c34d4b8](https://github.com/Rasterkhann/Rasterkhann/commit/c34d4b84b476294b9958918dd0a4b1447067a8f0)), closes [#108](https://github.com/Rasterkhann/Rasterkhann/issues/108)
* **ui:** reload after importing a savefile so it always runs migrations correctly ([c35864c](https://github.com/Rasterkhann/Rasterkhann/commit/c35864cf535da9a3bc1ece527a30d5c4eaed999f))


### Features

* **skills:** internal skill creator now supports multipliers for all stats, not just sp and sta ([24c0f59](https://github.com/Rasterkhann/Rasterkhann/commit/24c0f596a5764245780b58cea8866b20e983d81a)), closes [#103](https://github.com/Rasterkhann/Rasterkhann/issues/103)



# [0.8.0](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.13...v0.8.0) (2020-08-13)


### Features

* **cave:** add legendary adventures ([45a3108](https://github.com/Rasterkhann/Rasterkhann/commit/45a3108a94800d35510846c6abeea31f49440087)), closes [#96](https://github.com/Rasterkhann/Rasterkhann/issues/96)



## [0.7.13](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.12...v0.7.13) (2020-08-12)


### Features

* **ui:** archives stats window is 3 column where possible ([a8d631a](https://github.com/Rasterkhann/Rasterkhann/commit/a8d631a291722cfb9d5f7b74dda2e849b9fdcecf))
* **ui:** bazaar is a 3-column window ([9715a8c](https://github.com/Rasterkhann/Rasterkhann/commit/9715a8cb507cb19dba84c6f0e2339756391f1bae)), closes [#101](https://github.com/Rasterkhann/Rasterkhann/issues/101)



## [0.7.12](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.11...v0.7.12) (2020-08-10)


### Bug Fixes

* **ui:** fix purple border on bottom of left column in 2 column layout ([c3902a6](https://github.com/Rasterkhann/Rasterkhann/commit/c3902a6942b8e047b7f35160b6c0650c5a7ef39d)), closes [#97](https://github.com/Rasterkhann/Rasterkhann/issues/97)


### Features

* **item:** as durability goes down, item value goes down to make it easier to replace as time goes on ([f624bb8](https://github.com/Rasterkhann/Rasterkhann/commit/f624bb842697c3aed7374fe6905e11fee8273dd5)), closes [#98](https://github.com/Rasterkhann/Rasterkhann/issues/98)
* **ui:** add new option to disable confirmation dialogs, thanks @Ringold ([62b82ef](https://github.com/Rasterkhann/Rasterkhann/commit/62b82ef9a4510e48dda911135b75d47ca47d1877)), closes [#100](https://github.com/Rasterkhann/Rasterkhann/issues/100)
* **ui:** add tooltips to stats across the UI ([0dcb2be](https://github.com/Rasterkhann/Rasterkhann/commit/0dcb2be0aa083cd89291e51eea6b86fbee8f3a4a)), closes [#90](https://github.com/Rasterkhann/Rasterkhann/issues/90)



## [0.7.11](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.10...v0.7.11) (2020-08-08)


### Bug Fixes

* **skills:** multipliers from skills should be modified by +-1 instead of being raw to make them actually work correctly ([b446e6d](https://github.com/Rasterkhann/Rasterkhann/commit/b446e6dbc52db323144a50f3ce9036d7f617209a))



## [0.7.10](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.9...v0.7.10) (2020-08-07)


### Bug Fixes

* **version:** fix version in changelog generation ([4fc8669](https://github.com/Rasterkhann/Rasterkhann/commit/4fc86694265bd189e2a2e0ba068e8befae051101))



## [0.7.9](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.8...v0.7.9) (2020-08-07)


### Bug Fixes

* **bazaar:** adjust price scaling to cost a bit more, but not as much as before ([0215e03](https://github.com/Rasterkhann/Rasterkhann/commit/0215e03cc6de0815b22c95fb60c0af25ebf32e13))



## [0.7.8](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.7...v0.7.8) (2020-08-07)


### Features

* **ui:** move reroll buttons to modal headers on larger screens ([13e449f](https://github.com/Rasterkhann/Rasterkhann/commit/13e449f64315d625ae5cead48ec4f8bb3b5ad967))



## [0.7.7](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.6...v0.7.7) (2020-08-07)


### Features

* **ui:** some modals are split in half to make digesting information much easier ([e614cfb](https://github.com/Rasterkhann/Rasterkhann/commit/e614cfb2ce5ae08bfc751439285581152da28931))



## [0.7.6](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.5...v0.7.6) (2020-08-07)


### Features

* **bazaar:** lower prices mean more buying! ([aa2d53a](https://github.com/Rasterkhann/Rasterkhann/commit/aa2d53a6fedb1a3e2498e440abc39a3ad3855d79))



## [0.7.5](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.4...v0.7.5) (2020-08-07)


### Bug Fixes

* **items:** lower overall item values so more can be bought ([2fd8760](https://github.com/Rasterkhann/Rasterkhann/commit/2fd8760568feaf2b8a77e32b23430dd25cde0f1f)), closes [#95](https://github.com/Rasterkhann/Rasterkhann/issues/95)


### Features

* **retire:** add 'allocate newly retired here' to the allocation menu ([54ed0e3](https://github.com/Rasterkhann/Rasterkhann/commit/54ed0e3f9fc93e814175797387c48d0ae7420dc7)), closes [#92](https://github.com/Rasterkhann/Rasterkhann/issues/92)
* **ui:** hero retirement CTA is more clear ([b1e6ad2](https://github.com/Rasterkhann/Rasterkhann/commit/b1e6ad280af339dbed75258da7f8ba90d36ed95d)), closes [#93](https://github.com/Rasterkhann/Rasterkhann/issues/93)



## [0.7.4](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.3...v0.7.4) (2020-08-06)


### Features

* **skills:** basic hero skill implementation - they can be bought, destroyed, learned, and forgotten. more to come. ([7afbf73](https://github.com/Rasterkhann/Rasterkhann/commit/7afbf7382327f7cca564dd54993c32ed15813805)), closes [#85](https://github.com/Rasterkhann/Rasterkhann/issues/85)



## [0.7.3](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.2...v0.7.3) (2020-08-04)



## [0.7.2](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.1...v0.7.2) (2020-08-04)


### Features

* **ui:** rush button should be a different color ([64a148b](https://github.com/Rasterkhann/Rasterkhann/commit/64a148b32f097a9375128bd6f4fe78b42f3951e5))



## [0.7.1](https://github.com/Rasterkhann/Rasterkhann/compare/v0.7.0...v0.7.1) (2020-08-04)


### Bug Fixes

* **herogen:** hero generation should disallow getting duplicate traits entirely ([437766d](https://github.com/Rasterkhann/Rasterkhann/commit/437766da7b1991cec95e3aface0eb26dd856b7f1)), closes [#82](https://github.com/Rasterkhann/Rasterkhann/issues/82)
* **herogen:** heroes should no longer be able to spawn with opposite traits (ie, ATK+ and ATK-) ([26c6892](https://github.com/Rasterkhann/Rasterkhann/commit/26c689209e3dcf084110ec1eec4f9e8702513449)), closes [#83](https://github.com/Rasterkhann/Rasterkhann/issues/83)
* **repair:** remove repair mechanic; heroes cycle items more commonly; lower durability on average for items ([aecaa4f](https://github.com/Rasterkhann/Rasterkhann/commit/aecaa4fda971b2b68835f2eb491cb07aa2c53680)), closes [#84](https://github.com/Rasterkhann/Rasterkhann/issues/84)
* **retire:** hero retirement should be on 100 won encounters, not total ([018f7e6](https://github.com/Rasterkhann/Rasterkhann/commit/018f7e6f4353b1fddc120b59dd9348f13d1dc9f8)), closes [#86](https://github.com/Rasterkhann/Rasterkhann/issues/86)


### Features

* **retire:** new upgrades that require retirements ([af37ca0](https://github.com/Rasterkhann/Rasterkhann/commit/af37ca0e0fafec97668a3efb8fd1be7c059bcfad)), closes [#80](https://github.com/Rasterkhann/Rasterkhann/issues/80)
* **ui:** add more hero ready for retirement indicators ([7485acd](https://github.com/Rasterkhann/Rasterkhann/commit/7485acd4186d8f4f88ce1186f4c9d63c2e37ab74)), closes [#81](https://github.com/Rasterkhann/Rasterkhann/issues/81)
* **ui:** hide level on buildings that do not level up ([02008b0](https://github.com/Rasterkhann/Rasterkhann/commit/02008b045012ddcdfd00802f0435fba4de8dd6b1)), closes [#88](https://github.com/Rasterkhann/Rasterkhann/issues/88)
* **ui:** show a message when a building has no more features to build ([55453e6](https://github.com/Rasterkhann/Rasterkhann/commit/55453e69d4ce5763ee7a3b62a77e6e76b4364462)), closes [#89](https://github.com/Rasterkhann/Rasterkhann/issues/89)



# [0.7.0](https://github.com/Rasterkhann/Rasterkhann/compare/v0.6.3...v0.7.0) (2020-08-03)


### Bug Fixes

* **hero:** hero gen could erroneously stack stats way too high when doing levelups ([43996d4](https://github.com/Rasterkhann/Rasterkhann/commit/43996d4565c415dbf7bc8b0a4c429fa13d7ddf40)), closes [#78](https://github.com/Rasterkhann/Rasterkhann/issues/78)
* **library:** careful trait has wrong desc ([5dd2bdf](https://github.com/Rasterkhann/Rasterkhann/commit/5dd2bdface6bf0d5c0039429770420e6947b5c7d))
* **library:** upgrade tree for library is a bit better, dual trait is the first unlock and it's required ([228676a](https://github.com/Rasterkhann/Rasterkhann/commit/228676a2ecb9c89f762d38099fd51401f43d3448))
* **retire:** bump retire from 50 to 100 ([edf74aa](https://github.com/Rasterkhann/Rasterkhann/commit/edf74aa3df5d7287df2b5424c9a4e86d8adacd7d))
* **retire:** heroes are required to do 50 encounters (up from 25) to retire ([028cc13](https://github.com/Rasterkhann/Rasterkhann/commit/028cc136ee6abc4aa25275991a5548892d710a6a))
* **ui:** map is more clean and readable ([3b03fd1](https://github.com/Rasterkhann/Rasterkhann/commit/3b03fd1afff7eeb4940b681695efa25e59c826f8))
* **ui:** tooltips for heroes would sometimes show bad info ([ee0ce66](https://github.com/Rasterkhann/Rasterkhann/commit/ee0ce66e1424e0a16b3c3b2881a8620ee9ea7340))


### Features

* **archives:** add new town stats window ([1201eb3](https://github.com/Rasterkhann/Rasterkhann/commit/1201eb3ac580b860efb2ba4b75295480077f24fa)), closes [#76](https://github.com/Rasterkhann/Rasterkhann/issues/76)
* **hero:** can queue hero for retirement or dismissal while they're adventuring ([ff84954](https://github.com/Rasterkhann/Rasterkhann/commit/ff8495444c8b6b0c1691f91663134b6e576a5927)), closes [#79](https://github.com/Rasterkhann/Rasterkhann/issues/79)
* **hero:** heroes can retire now, but they can't be allocated to anything yet ([bdffa85](https://github.com/Rasterkhann/Rasterkhann/commit/bdffa85647439cdfaf13e01358fd75e11fed4d86)), closes [#76](https://github.com/Rasterkhann/Rasterkhann/issues/76)
* **hero:** queue retire/dismiss can be canceled ([16dccb4](https://github.com/Rasterkhann/Rasterkhann/commit/16dccb4e7a6f8f25ecd654c5536884f687edae31))
* **retire:** heroes can now retire, crystals can be spent on stat buffs for future heroes, town stats are tracked, and retired heroes can be allocated to buildings for additional bonuses ([b7d6c4a](https://github.com/Rasterkhann/Rasterkhann/commit/b7d6c4a64c49ab9f844f510a16b65f6608d42d33)), closes [#76](https://github.com/Rasterkhann/Rasterkhann/issues/76)



## [0.6.3](https://github.com/Rasterkhann/Rasterkhann/compare/v0.6.2...v0.6.3) (2020-07-28)


### Bug Fixes

* **ui:** update notification should show up correctly now ([599adee](https://github.com/Rasterkhann/Rasterkhann/commit/599adee649b6485b394efd6eb26cabe511e157e6))



## [0.6.2](https://github.com/Rasterkhann/Rasterkhann/compare/v0.6.1...v0.6.2) (2020-07-28)


### Bug Fixes

* **hero:** xp scaling is fixed to go up more as levels go up ([3f9f833](https://github.com/Rasterkhann/Rasterkhann/commit/3f9f833dee91291c3ddf6e9a3377c5053022cfd4)), closes [#70](https://github.com/Rasterkhann/Rasterkhann/issues/70)


### Features

* **hero:** heroes will now roll their levelup traits on spawn - they will not get normal levelup bonuses so only +/- traits will have a major effect. % effects will apply to the sum of those bonuses ([356a304](https://github.com/Rasterkhann/Rasterkhann/commit/356a3045a325633b263ef453939ecf502d7c63e0)), closes [#71](https://github.com/Rasterkhann/Rasterkhann/issues/71)
* **hero:** post-adventure, while repairing, hero gear has a chance of taking permanent durability damage and losing value to encourage gear cycling ([c7d476f](https://github.com/Rasterkhann/Rasterkhann/commit/c7d476f2e344ae6ea4453737f5ec6690d312d4eb)), closes [#72](https://github.com/Rasterkhann/Rasterkhann/issues/72)
* **library:** add durability-related traits ([bcbfb37](https://github.com/Rasterkhann/Rasterkhann/commit/bcbfb373f13f5167277d9cbebf7a46104cf39f49)), closes [#69](https://github.com/Rasterkhann/Rasterkhann/issues/69)



## [0.6.1](https://github.com/Rasterkhann/Rasterkhann/compare/v0.6.0...v0.6.1) (2020-07-28)


### Bug Fixes

* **refactor:** change a lot of internal statement ordering - should not break anything but who knows ([b46983b](https://github.com/Rasterkhann/Rasterkhann/commit/b46983bba6da7dcc16dc3de125883b40bcb80dfb)), closes [#74](https://github.com/Rasterkhann/Rasterkhann/issues/74)



# [0.6.0](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.31...v0.6.0) (2020-07-27)


### Bug Fixes

* **bazaar:** help text should mention that you need an alchemist and/or an armory ([71e76a6](https://github.com/Rasterkhann/Rasterkhann/commit/71e76a683cf97ab488620905d889915c2074c683)), closes [#73](https://github.com/Rasterkhann/Rasterkhann/issues/73)
* **bazaar:** pass-over threshold for autoscrap lowered to 100 ([e70562b](https://github.com/Rasterkhann/Rasterkhann/commit/e70562b955145d50b1c673312d4d359d093b6a72))
* **dismiss:** dismissing a hero now will stop their odd job ([4457868](https://github.com/Rasterkhann/Rasterkhann/commit/4457868611fd4bd4aaebdf13339b92950c8f9cfb))
* **ui:** scrap item description was incorrect ([797a095](https://github.com/Rasterkhann/Rasterkhann/commit/797a095d9a8d5e1e603c6aa00f248f16c6fdfec8))


### Features

* **map:** heroes walk around the map ([c70808e](https://github.com/Rasterkhann/Rasterkhann/commit/c70808e2002365774c3e55b26a090f526dee633e)), closes [#59](https://github.com/Rasterkhann/Rasterkhann/issues/59)
* **ui:** watch for updates in the web version ([2e40c7e](https://github.com/Rasterkhann/Rasterkhann/commit/2e40c7ebe8d158cdc2983e818c58ffedf1d6dfac)), closes [#68](https://github.com/Rasterkhann/Rasterkhann/issues/68)
* **workshop:** scrap after 25 passed over instead of 250 ([8221efe](https://github.com/Rasterkhann/Rasterkhann/commit/8221efeef5b2401d60f51da70b4401f734a69b5f))



## [0.5.31](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.30...v0.5.31) (2020-07-23)


### Features

* **gear:** add durability to equipment ([48ade68](https://github.com/Rasterkhann/Rasterkhann/commit/48ade68214613068ec599ea8558d2957b77c2af0)), closes [#38](https://github.com/Rasterkhann/Rasterkhann/issues/38)
* **ui:** add /r/rasterkhann link ([a7130f7](https://github.com/Rasterkhann/Rasterkhann/commit/a7130f78db443080d72ec5b085935cca6049e8d8))



## [0.5.30](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.29...v0.5.30) (2020-07-23)


### Bug Fixes

* **armor:** armor was not being bought correctly as it had no subtype ([dc7a574](https://github.com/Rasterkhann/Rasterkhann/commit/dc7a574a7422fe4c3864f7a635d4e8aae53fb6fe))
* **ui:** only show cost in bazaar, never in inventory ([7efdad6](https://github.com/Rasterkhann/Rasterkhann/commit/7efdad6cc0a251aa4936d3f9f5a7a631736ddf40))


### Features

* **library:** library levels increase chance of ignoring bad traits for heroes ([da0a987](https://github.com/Rasterkhann/Rasterkhann/commit/da0a987b4aaba3373b704f31cc7d39245836ed7f)), closes [#66](https://github.com/Rasterkhann/Rasterkhann/issues/66)
* **ui:** add tooltip component to help out with some more complicated aspects ([bbf78c7](https://github.com/Rasterkhann/Rasterkhann/commit/bbf78c75ae4db012cdf6dd62c2faf5b3476363f3)), closes [#65](https://github.com/Rasterkhann/Rasterkhann/issues/65)
* **workshop:** auto scrap bad items option ([7b087cd](https://github.com/Rasterkhann/Rasterkhann/commit/7b087cd172ac7318b9c2cd92b7b0f7d7135a616e)), closes [#67](https://github.com/Rasterkhann/Rasterkhann/issues/67)



## [0.5.29](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.28...v0.5.29) (2020-07-21)


### Bug Fixes

* **savefile:** store cost of items so items aren't always bought every adventure ([58fb316](https://github.com/Rasterkhann/Rasterkhann/commit/58fb3163c2f331f5933370846e2b785e62fc11e0))
* **ui:** remove blurriness, again ([ea250d0](https://github.com/Rasterkhann/Rasterkhann/commit/ea250d04e6565c1b43c8683dfe13312ea1ec77f6))
* **ui:** track by item uuid so the list doesn't jank refresh ([ccd0e12](https://github.com/Rasterkhann/Rasterkhann/commit/ccd0e12ab8fdf561b7aa924ed9c4dad97d39f02e))


### Features

* **hero:** heroes now have armor class restrictions + traits to boost range ([99b7235](https://github.com/Rasterkhann/Rasterkhann/commit/99b723517dfc9a57073961f0129158aee2e38976)), closes [#64](https://github.com/Rasterkhann/Rasterkhann/issues/64)
* **ui:** show timers in bazaar modal as well ([d395c28](https://github.com/Rasterkhann/Rasterkhann/commit/d395c28c2f05b644f38661cb72a51c639fd5fbde))



## [0.5.28](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.27...v0.5.28) (2020-07-21)


### Bug Fixes

* **ui:** don't scroll up when rerolling ([197a064](https://github.com/Rasterkhann/Rasterkhann/commit/197a0644d1804d45ec4ba44c997a5e0a7c5d1105))
* **ui:** don't show a notification for 0 gold earned ([e9e1cb2](https://github.com/Rasterkhann/Rasterkhann/commit/e9e1cb2a9dd460f81160a5a29c3bacd3a5b9bf81))


### Features

* **combat:** all heroes will learn new skills based on their level ([9125e3d](https://github.com/Rasterkhann/Rasterkhann/commit/9125e3d135d105633e4faf185f6eabad97dcb82d)), closes [#63](https://github.com/Rasterkhann/Rasterkhann/issues/63)
* **map:** make it a pixi.application so animations are easier ([84c3965](https://github.com/Rasterkhann/Rasterkhann/commit/84c39654efe5b3b9b5f56151d2913e80b8143c45))
* **oddjobs:** track more odd jobs stats, add notifications ([4584bdb](https://github.com/Rasterkhann/Rasterkhann/commit/4584bdbe185e9ffb23bd634b38e405eb30e174d5))
* **ui:** show hero blurb on profile page ([8ff9ef0](https://github.com/Rasterkhann/Rasterkhann/commit/8ff9ef0b7980f1b6f9894f36763a1c2fd3664d76))



## [0.5.27](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.26...v0.5.27) (2020-07-20)


### Bug Fixes

* **savefile:** if adventure progress cannot push forward, don't throw the entire savefile loading off ([26c47ae](https://github.com/Rasterkhann/Rasterkhann/commit/26c47ae71ebfe1c5db6ddf87764ba78b36f36346))
* **ui:** hero sprite flickering cease ([2bee40c](https://github.com/Rasterkhann/Rasterkhann/commit/2bee40ce8a03ac92994668d8d18ecf3750ecb972)), closes [#7](https://github.com/Rasterkhann/Rasterkhann/issues/7)


### Features

* **core:** shim bigint, so the game should work on unsupported environments like safari ([07ed213](https://github.com/Rasterkhann/Rasterkhann/commit/07ed213e71bb8406d25a5ce0f14c3860d2e68438)), closes [#62](https://github.com/Rasterkhann/Rasterkhann/issues/62)
* **hero:** heroes will now commit to doing odd jobs around town when not adventuring ([ffa837c](https://github.com/Rasterkhann/Rasterkhann/commit/ffa837c968039002aa7382733467f9f0548d1e06)), closes [#57](https://github.com/Rasterkhann/Rasterkhann/issues/57)
* **trait:** traits that give weapon proficiency will no longer double up on a class that already has it ([ce51200](https://github.com/Rasterkhann/Rasterkhann/commit/ce512001936cd9fe2265ea94b670e4cba270cfbd))
* **ui:** allow right click to work anywhere even if the building is currently selected ([851f374](https://github.com/Rasterkhann/Rasterkhann/commit/851f37447545768f0e6df61c310df7f91c012e1e))



## [0.5.26](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.25...v0.5.26) (2020-07-18)


### Features

* **adventures:** boost adventure rewards at the end ([25c6871](https://github.com/Rasterkhann/Rasterkhann/commit/25c6871860b3e57bbe5e76b4d2b2d6184075f686)), closes [#58](https://github.com/Rasterkhann/Rasterkhann/issues/58)
* **combat:** combat logs now have real skill names ([b918c96](https://github.com/Rasterkhann/Rasterkhann/commit/b918c9635e89ac51ec790b470f7afa49d5ac3492)), closes [#61](https://github.com/Rasterkhann/Rasterkhann/issues/61)
* **hero:** track hero stats for eventual retirement ([fc4e0ed](https://github.com/Rasterkhann/Rasterkhann/commit/fc4e0edab6023cf839f1c572c12cbfc78ea36564)), closes [#56](https://github.com/Rasterkhann/Rasterkhann/issues/56)
* **ui:** alerts now have a border color so they're more visible from the rest of the ui ([48eb26f](https://github.com/Rasterkhann/Rasterkhann/commit/48eb26f72169a80f33ddbe7824d020627bf02324)), closes [#60](https://github.com/Rasterkhann/Rasterkhann/issues/60)



## [0.5.25](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.24...v0.5.25) (2020-07-17)


### Bug Fixes

* **loader:** verify combatLogs exists [how did this pass migration?] ([aebb938](https://github.com/Rasterkhann/Rasterkhann/commit/aebb9381289c5c1c30b44da18ae1906512ad094e))


### Features

* **guildhall:** show traits on prospective heroes to avoid a click ([02e050a](https://github.com/Rasterkhann/Rasterkhann/commit/02e050ac8aa8c96b90b82b727dfff768007258b1))
* **rush:** rush cost goes down as time remaining goes down ([ae092a5](https://github.com/Rasterkhann/Rasterkhann/commit/ae092a59701b87b22e6dc76f7d501d525d1d1df3))



## [0.5.24](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.23...v0.5.24) (2020-07-16)


### Features

* **logs:** add win gold/xp to logs ([8f9858d](https://github.com/Rasterkhann/Rasterkhann/commit/8f9858ddcf0e4c1d00281e7e29e998558c370005)), closes [#54](https://github.com/Rasterkhann/Rasterkhann/issues/54)



## [0.5.23](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.22...v0.5.23) (2020-07-16)


### Features

* **logs:** show checkmark if adventure succeeded ([29ebc9b](https://github.com/Rasterkhann/Rasterkhann/commit/29ebc9b2c78ed45d50522dd162c7a3364a46741a))



## [0.5.22](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.21...v0.5.22) (2020-07-16)


### Features

* **adventures:** adventures are now generated at a random hero level ([a58b6c8](https://github.com/Rasterkhann/Rasterkhann/commit/a58b6c81b4fe1dc3d8067b11617800b76e956eb1)), closes [#50](https://github.com/Rasterkhann/Rasterkhann/issues/50)
* **adventures:** more potential monsters per combat, tweaked difficulty ([6605da8](https://github.com/Rasterkhann/Rasterkhann/commit/6605da86b94406d1212c24b91d09a327ebe790b3)), closes [#51](https://github.com/Rasterkhann/Rasterkhann/issues/51)
* **cave:** add combat log viewer ([a13e489](https://github.com/Rasterkhann/Rasterkhann/commit/a13e489c69081f2355fc1c771de18f6118dbf704)), closes [#45](https://github.com/Rasterkhann/Rasterkhann/issues/45)
* **core:** number formatter made global ([5a21724](https://github.com/Rasterkhann/Rasterkhann/commit/5a21724975f4d32aac455a3b47a1b549b97450e4)), closes [#52](https://github.com/Rasterkhann/Rasterkhann/issues/52)
* **earngold:** thief earngold ability gives a bit more ([a0806bd](https://github.com/Rasterkhann/Rasterkhann/commit/a0806bd01405fe77be6278b494eff5cdfa9d58ba))
* **monsters:** slightly change how monster gold is given ([e483b0b](https://github.com/Rasterkhann/Rasterkhann/commit/e483b0b28d5baabef6bbec3d10c3f60a16c3fa66))



## [0.5.21](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.20...v0.5.21) (2020-07-16)


### Bug Fixes

* **item:** only show passed over indicator in bazaar ([71c1032](https://github.com/Rasterkhann/Rasterkhann/commit/71c1032bec9f68e3c063be34ad01000bd18a4769))


### Features

* **hero:** show what weapons are usable by heroes ([8823dd3](https://github.com/Rasterkhann/Rasterkhann/commit/8823dd3f23257514e7bdc8423ce96bdd8358fc15))
* **trait:** add weapon proficiency traits ([05b6a05](https://github.com/Rasterkhann/Rasterkhann/commit/05b6a05ea03a9cbb2a97d59c9f737879471c14a1)), closes [#49](https://github.com/Rasterkhann/Rasterkhann/issues/49)



## [0.5.20](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.19...v0.5.20) (2020-07-16)


### Features

* **core:** add logging service ([385c847](https://github.com/Rasterkhann/Rasterkhann/commit/385c8473ddf9787ab0d3512ec36448548a3f2bb4)), closes [#2](https://github.com/Rasterkhann/Rasterkhann/issues/2)
* **item:** add times passed over indicator for items ([d6d125c](https://github.com/Rasterkhann/Rasterkhann/commit/d6d125c1fb88e50ea418f42080abc6e4ab1d0f3e))



## [0.5.19](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.8...v0.5.19) (2020-07-16)


### Bug Fixes

* **guildhall:** in some cases, you would not be able to buy your next hero but the window would show 3/4 ([7ae71f6](https://github.com/Rasterkhann/Rasterkhann/commit/7ae71f6815d29f92cd772f8686e7ab3392fa66ba)), closes [#41](https://github.com/Rasterkhann/Rasterkhann/issues/41)
* **ui:** modal no longer can obscure gold. it is moved left ([81123ac](https://github.com/Rasterkhann/Rasterkhann/commit/81123ac189ee89af47f086bce3b014d32fbf110c)), closes [#40](https://github.com/Rasterkhann/Rasterkhann/issues/40)


### Features

* **core:** in downloadable version, back up savefile if it exists but failed to load ([5401c62](https://github.com/Rasterkhann/Rasterkhann/commit/5401c62bae5e6785ecaab6ff0895d5df0a63b092)), closes [#42](https://github.com/Rasterkhann/Rasterkhann/issues/42)
* **ui:** show rush cost when it's available ([1a07707](https://github.com/Rasterkhann/Rasterkhann/commit/1a07707e8574d40d9b2d86eea176c3811e65b794)), closes [#47](https://github.com/Rasterkhann/Rasterkhann/issues/47)



## [0.5.8](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.7...v0.5.8) (2020-07-15)


### Features

* **meta:** there are now automated electron releases for the game ([5f5a416](https://github.com/Rasterkhann/Rasterkhann/commit/5f5a4165c1200c543aee27f09441bf54e1def495)), closes [#1](https://github.com/Rasterkhann/Rasterkhann/issues/1)



## [0.5.7](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.6...v0.5.7) (2020-07-15)


### Bug Fixes

* **rush:** rush should not be spammable to lose more gold for no benefit ([d4d0dac](https://github.com/Rasterkhann/Rasterkhann/commit/d4d0dac1c84d52d1cf5a1ce161f7860fb1c9f548))


### Features

* **cave:** heroes can team up ([f14aeb7](https://github.com/Rasterkhann/Rasterkhann/commit/f14aeb73200edf65e9bd11660f18ba10d71a5164)), closes [#12](https://github.com/Rasterkhann/Rasterkhann/issues/12)
* **core:** add google analytics ([a751c2c](https://github.com/Rasterkhann/Rasterkhann/commit/a751c2c1bab55ca7de69884b64668266d8ca6434)), closes [#39](https://github.com/Rasterkhann/Rasterkhann/issues/39)
* **map:** show red dot for buildings with upgrades ([2e3a9a3](https://github.com/Rasterkhann/Rasterkhann/commit/2e3a9a304a8fd92ff7e32aa249f18e42689d01a1)), closes [#26](https://github.com/Rasterkhann/Rasterkhann/issues/26)



## [0.5.6](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.5...v0.5.6) (2020-07-15)


### Bug Fixes

* **ui:** disable reroll buttons if you don't have enough gold ([0714c54](https://github.com/Rasterkhann/Rasterkhann/commit/0714c544da1a112cd25a78b438e9323040f8a691))
* **ui:** modals would not always have a fresh, updated copy of the town instance and now they do. fixes a bug where heroes could be trained with not enough money ([2fb62a2](https://github.com/Rasterkhann/Rasterkhann/commit/2fb62a2038887ec89c7033c3bed2b059b2dfccdf))


### Features

* **ui:** modals are now taller and a bit wider ([6407345](https://github.com/Rasterkhann/Rasterkhann/commit/64073451205369a4bd6cafa6d3e72fae7a476627))
* **ui:** right click on certain buildings will quick-open them to their view ([faa222b](https://github.com/Rasterkhann/Rasterkhann/commit/faa222b3a10ce0b6f6aa410c7a5aa7dc192449d7))



## [0.5.5](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.4...v0.5.5) (2020-07-14)


### Features

* **building:** add a rush button to finish stuff faster ([d483853](https://github.com/Rasterkhann/Rasterkhann/commit/d483853b969dcf5cc290c2a34acf2fbb67ba5dbe)), closes [#28](https://github.com/Rasterkhann/Rasterkhann/issues/28)
* **cave:** adventures will now progress a maximum of 6 hours while offline ([c59e098](https://github.com/Rasterkhann/Rasterkhann/commit/c59e098507ab57c296fbe2d9b0da401b8b9dc15f)), closes [#30](https://github.com/Rasterkhann/Rasterkhann/issues/30)



## [0.5.4](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.3...v0.5.4) (2020-07-14)


### Bug Fixes

* **equipment:** really fix heroes losing stats on item equip this time ([9da6e44](https://github.com/Rasterkhann/Rasterkhann/commit/9da6e44ee268a152acf3d75a87f30dd5c9325fba))


### Features

* **archive:** archive is 25 long and now shows hero item purchases ([3ee2fc3](https://github.com/Rasterkhann/Rasterkhann/commit/3ee2fc3a032efc5a8b2aa2d6bd17a2de7ae9fb66))
* **guildhall:** hero rating factors in traits now ([49e61c0](https://github.com/Rasterkhann/Rasterkhann/commit/49e61c0b8d28a9dfd2863e891dd0658c17512d76))



## [0.5.3](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.2...v0.5.3) (2020-07-14)


### Bug Fixes

* **armory:** should not boost all stats by level, just non-zero ones ([33cb2f4](https://github.com/Rasterkhann/Rasterkhann/commit/33cb2f4fffa3a2cba5c3eabf3ca664fe6dd18b1b))
* **bazaar:** heroes should buy weapon and armor upgrades if needed ([cda0a1b](https://github.com/Rasterkhann/Rasterkhann/commit/cda0a1bd18bc771069e27f8a573be284e52f4059))
* **bazaar:** heroes should not unequip nonexistent items ([fbb5b76](https://github.com/Rasterkhann/Rasterkhann/commit/fbb5b7673c35e2ae16e1532ce3509aba4ec3df33))
* **ui:** disallow holding dialogs for train/dismiss ([9ff1619](https://github.com/Rasterkhann/Rasterkhann/commit/9ff1619fd7f4d731eee89865e431db8b8192c0e8))
* **ui:** remove absurdly long decimals from cave screen ([745c3de](https://github.com/Rasterkhann/Rasterkhann/commit/745c3de12f4b9b8d7e68695431a60ea420f5e21f))


### Features

* **adventure:** add some lower-timer encounter ticks and remove the highest one ([53424b6](https://github.com/Rasterkhann/Rasterkhann/commit/53424b638877bd4e82c1021c26f464cf14454e49))
* **adventure:** adventures are failed immediately if any encounter fails ([a9d55df](https://github.com/Rasterkhann/Rasterkhann/commit/a9d55df2bdc5324254eaebe2a45a618c614d8432)), closes [#36](https://github.com/Rasterkhann/Rasterkhann/issues/36)
* **ui:** show the currently active building with an arrow on the map ([96adfe0](https://github.com/Rasterkhann/Rasterkhann/commit/96adfe0dd3fa17d75445b764c0fee98c0f803d8e)), closes [#24](https://github.com/Rasterkhann/Rasterkhann/issues/24)



## [0.5.2](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.1...v0.5.2) (2020-07-14)


### Bug Fixes

* **automation:** buildings should not be able to be built from automation if the requirements aren't met ([3aa8ae8](https://github.com/Rasterkhann/Rasterkhann/commit/3aa8ae88e33f06d82084e47e7982f676301d2953)), closes [#34](https://github.com/Rasterkhann/Rasterkhann/issues/34)
* **building:** armory and alchemist should require the bazaar to be built, not the other way around ([0b3a7fe](https://github.com/Rasterkhann/Rasterkhann/commit/0b3a7fe8ee0784a8b53d0d184c6c660dbc023a7f))
* **ui:** able to open buildings before they're constructed ([e713c2d](https://github.com/Rasterkhann/Rasterkhann/commit/e713c2d282e79bcb300c21a4eb6a6aae719d56dd)), closes [#29](https://github.com/Rasterkhann/Rasterkhann/issues/29)


### Features

* **armory:** weapons+armor get a bonus based on armory level ([9a9b09f](https://github.com/Rasterkhann/Rasterkhann/commit/9a9b09f61585fbc0c7092640d799a28511c752d0)), closes [#32](https://github.com/Rasterkhann/Rasterkhann/issues/32)
* **bazaar:** bazaar gives +1% cost per level ([a9f8618](https://github.com/Rasterkhann/Rasterkhann/commit/a9f861889bed1ead595e533ccb4a2bdae20aa676)), closes [#35](https://github.com/Rasterkhann/Rasterkhann/issues/35)
* **building:** improve text of all buildings to include what their upgrades do ([f76bf77](https://github.com/Rasterkhann/Rasterkhann/commit/f76bf7763da7940c6405c03ac27f83007c14a9b6))
* **cave:** show adventure total time end instead of next tick ([7ddcd3b](https://github.com/Rasterkhann/Rasterkhann/commit/7ddcd3bd5e4dcdc71eceebfbb9a43e2aa2144800)), closes [#31](https://github.com/Rasterkhann/Rasterkhann/issues/31)
* **ui:** show help text in modals ([18545a5](https://github.com/Rasterkhann/Rasterkhann/commit/18545a5a0e06cf6d252354523e508d740c62fc26)), closes [#33](https://github.com/Rasterkhann/Rasterkhann/issues/33)
* **workshop:** workshop costs lowered to 5k each ([2e7e202](https://github.com/Rasterkhann/Rasterkhann/commit/2e7e2024cf606b9676aa560793224bf33f6e4aac))



## [0.5.1](https://github.com/Rasterkhann/Rasterkhann/compare/v0.5.0...v0.5.1) (2020-07-13)


### Bug Fixes

* **armor:** armor should not generate with "none" in the name ([da3916e](https://github.com/Rasterkhann/Rasterkhann/commit/da3916e62ab9e9ed774a11f69e441bbea7021bf2))
* **armory:** make some weapon creations require different classes ([7c5f19e](https://github.com/Rasterkhann/Rasterkhann/commit/7c5f19e9a878fc6155622aa5aaca9e1a6d2b435d))
* **guildhall:** for some reason, heroes would not generate with the correct values ([265397b](https://github.com/Rasterkhann/Rasterkhann/commit/265397b72041da136f0bb1ab800fa999cb40422f))
* **hero:** training costs needed to go down since hero cost went up ([8edc7ac](https://github.com/Rasterkhann/Rasterkhann/commit/8edc7ac8f4bcda3ddcd1d0801fec71f670c05634))
* **time:** upgrade times are lower in general but progressively get longer, esp for early game powerups ([f0084a4](https://github.com/Rasterkhann/Rasterkhann/commit/f0084a4d3b296c8327cb5accd61b236e4a5b0f84)), closes [#23](https://github.com/Rasterkhann/Rasterkhann/issues/23)


### Features

* **alchemist:** alchemist picks a random potion tier ([8d70b94](https://github.com/Rasterkhann/Rasterkhann/commit/8d70b94f8e4324ed96a0d477160978d94555e423)), closes [#22](https://github.com/Rasterkhann/Rasterkhann/issues/22)
* **bazaar:** add features to increase item costs for heroes ([68885d0](https://github.com/Rasterkhann/Rasterkhann/commit/68885d020ebba64f71bd7e74f246a553cafaeba7)), closes [#21](https://github.com/Rasterkhann/Rasterkhann/issues/21)
* **trait:** multi-gear traits ([c347f87](https://github.com/Rasterkhann/Rasterkhann/commit/c347f87e1630f122237b8e1a0199c10e0dce4d6f)), closes [#20](https://github.com/Rasterkhann/Rasterkhann/issues/20)
* **ui:** contrast a bit for list headers ([17da218](https://github.com/Rasterkhann/Rasterkhann/commit/17da2187f21d0c686f3237052dead09799b5419e)), closes [#25](https://github.com/Rasterkhann/Rasterkhann/issues/25)



# [0.5.0](https://github.com/Rasterkhann/Rasterkhann/compare/v0.4.0...v0.5.0) (2020-07-13)


### Bug Fixes

* **alchemist:** let potions slide back a little bit per tier ([f100900](https://github.com/Rasterkhann/Rasterkhann/commit/f10090083b1fabb9761aefeb573b983990ab03d9))
* **console:** turn off verbose logging in production ([f653739](https://github.com/Rasterkhann/Rasterkhann/commit/f65373959d645bc4ee22e31a62f64a150aa0647e))
* **hero:** hero skills take more sta ([7cbd289](https://github.com/Rasterkhann/Rasterkhann/commit/7cbd2893d951b1edeeebf1580e58804fd5c3ca55))
* **hero:** hero xp scaling is a bit harsher ([d9df869](https://github.com/Rasterkhann/Rasterkhann/commit/d9df869efd3b45eae8bf7b0473000527a09c390a)), closes [#17](https://github.com/Rasterkhann/Rasterkhann/issues/17)
* **hero:** heroes should always be generated with a cost > 0 ([9b30242](https://github.com/Rasterkhann/Rasterkhann/commit/9b30242162c67fe6ca714d7e1dd7ee5f2b9b7c07))
* **item:** sp+sta potions have a valid sprite now ([e0f23ca](https://github.com/Rasterkhann/Rasterkhann/commit/e0f23ca5e6c59a830e6d022b150e88f20a18542a))
* **ui:** map max width is 900px ([d6bbbf9](https://github.com/Rasterkhann/Rasterkhann/commit/d6bbbf9e4bdca97e6a9b7c38583cf7ac1af87313)), closes [#16](https://github.com/Rasterkhann/Rasterkhann/issues/16)


### Features

* **armory:** armor is now created at intervals, much like weapons ([754f31a](https://github.com/Rasterkhann/Rasterkhann/commit/754f31a60e807d93f857f5f1591f77ad9c17d6e5))
* **bazaar:** bazaar popup updates in real time ([9d32731](https://github.com/Rasterkhann/Rasterkhann/commit/9d32731245fdd4181d33bff66094f9407bedfd16)), closes [#19](https://github.com/Rasterkhann/Rasterkhann/issues/19)
* **bazaar:** can scrap items that are undesirable ([e0cc75f](https://github.com/Rasterkhann/Rasterkhann/commit/e0cc75f4fb2b6475d494abbdd63c179bd18ae813)), closes [#15](https://github.com/Rasterkhann/Rasterkhann/issues/15)
* **bazaar:** show totals at top of headers ([c1e0b74](https://github.com/Rasterkhann/Rasterkhann/commit/c1e0b74999b3c42134eb65a1f5ce09a877f005c5))
* **bazaar,armory:** add weapon creation ([8526cc9](https://github.com/Rasterkhann/Rasterkhann/commit/8526cc96ba5d4d9e341a1022cf72943dafb0515f))
* **cave:** show #adventures at the top of the popup ([0f25681](https://github.com/Rasterkhann/Rasterkhann/commit/0f25681f490bbf2458ce88bd6432eb1c58943915))
* **guildhall:** popup shows #recruits ([534e708](https://github.com/Rasterkhann/Rasterkhann/commit/534e70826fb0caca64d65eae8791367d7b1ba187)), closes [#18](https://github.com/Rasterkhann/Rasterkhann/issues/18)
* **weapons:** heroes will buy and equip weapons before going on an adventure ([e096b57](https://github.com/Rasterkhann/Rasterkhann/commit/e096b57595a6813f65f64d5a4026161b98114b6e))



# [0.4.0](https://github.com/Rasterkhann/Rasterkhann/compare/v0.3.2...v0.4.0) (2020-07-11)


### Features

* **bazaar:** heroes will shop at the bazaar before embarking on an adventure ([b8edf9c](https://github.com/Rasterkhann/Rasterkhann/commit/b8edf9ca7227d8c7d5c2ed2fee25bdfa8e1331b8))



## [0.3.2](https://github.com/Rasterkhann/Rasterkhann/compare/v0.3.1...v0.3.2) (2020-07-10)


### Bug Fixes

* **dx:** run version script before starting ([57d1436](https://github.com/Rasterkhann/Rasterkhann/commit/57d1436c5900c6221e912395df80cc2125ab5341))
* **items:** items are no longer generated at level 0 buildings ([f255e45](https://github.com/Rasterkhann/Rasterkhann/commit/f255e455d8adabba99eedca75f75645a9a522c5a))
* **ui:** boost size of all header-related items again ([3afda5f](https://github.com/Rasterkhann/Rasterkhann/commit/3afda5f0a83518c51d9ca16361f36e55ff8c5962))
* **ui:** make some stuff bigger again ([ce0acb5](https://github.com/Rasterkhann/Rasterkhann/commit/ce0acb5434c146c435acb0106161d8592ae70d3f))


### Features

* **alchemist:** quick info for alchemist highlights ([eca846f](https://github.com/Rasterkhann/Rasterkhann/commit/eca846f8d937c99b438f3a8b2ae4cb02d7c7ef62))
* **armory:** quick info for armory highlights ([15e94eb](https://github.com/Rasterkhann/Rasterkhann/commit/15e94ebe357e176f688f3b01a5b8756ee1c26019))
* **cave:** cave info box ([ac47db3](https://github.com/Rasterkhann/Rasterkhann/commit/ac47db32515359ed568f85bebd17f41648d29ecc))
* **guildhall:** show info panel for guild hall ([4e8f2f2](https://github.com/Rasterkhann/Rasterkhann/commit/4e8f2f268ceccffb5a15d99f85fbfb619991f644))
* **inn:** info panel ([c7944ea](https://github.com/Rasterkhann/Rasterkhann/commit/c7944ea18921c0bf563d335d34d2c424351902ae))
* **library:** info panel ([6a44998](https://github.com/Rasterkhann/Rasterkhann/commit/6a44998232b29b3493a50c68da759e2ffe4d347d))



## [0.3.1](https://github.com/Rasterkhann/Rasterkhann/compare/v0.3.0...v0.3.1) (2020-07-10)


### Features

* **watchtower:** more descriptive savefile names ([8f9bdb1](https://github.com/Rasterkhann/Rasterkhann/commit/8f9bdb1822f9cbd4c70c38bfa0a180047fc6d5d1))



# [0.3.0](https://github.com/Rasterkhann/Rasterkhann/compare/v0.2.4...v0.3.0) (2020-07-10)


### Bug Fixes

* **combat:** pre-combat could sometimes throw an error ([8319e1c](https://github.com/Rasterkhann/Rasterkhann/commit/8319e1cceadfe9195f3f6f0270fd34786d8a231b))
* **savefile:** migrate to item data correctly ([010c7e4](https://github.com/Rasterkhann/Rasterkhann/commit/010c7e40e53fc5e3647070c02f0ce0fc0badac71))


### Features

* **alchemist:** alchemst now generates potions, has upgrades for all of the related features ([f3c3c9c](https://github.com/Rasterkhann/Rasterkhann/commit/f3c3c9c0b4ff4ddcb2066c89555d474dddd949a9))



## [0.2.4](https://github.com/Rasterkhann/Rasterkhann/compare/v0.2.3...v0.2.4) (2020-07-10)


### Features

* **dx:** add contribution guide ([322a0de](https://github.com/Rasterkhann/Rasterkhann/commit/322a0dea09ac1e95c9fdf5bed4c7be0cf01f1252))



## [0.2.3](https://github.com/Rasterkhann/Rasterkhann/compare/v0.2.2...v0.2.3) (2020-07-10)


### Bug Fixes

* **adventure:** always cancel adventures if the id isn't a valid adventure on refresh ([b77fccc](https://github.com/Rasterkhann/Rasterkhann/commit/b77fccce8d07179d66440deffb50b6be4c3e8f08))
* **hero:** hero level up cost is randomized and larger ([9cc61db](https://github.com/Rasterkhann/Rasterkhann/commit/9cc61dbd31f89c039a4526644c11847c006e929c))
* **town:** doesTownHaveFeature would fail in niche cases where a building didn't quite exist ([7a86577](https://github.com/Rasterkhann/Rasterkhann/commit/7a865770672e747383f80140b0580dfad1801f56))
* **ui:** automatically swap views if you recruit a hero ([59d818b](https://github.com/Rasterkhann/Rasterkhann/commit/59d818b43f94345ed3488dcf867dcef112be6fd6))
* **ui:** exp verbiage changes to make more sense ([d37a552](https://github.com/Rasterkhann/Rasterkhann/commit/d37a552da151997152abb78841ac7ba7d0eaeef6))


### Features

* **dx:** add savefile compress/decompress tools to debug them more easily ([75b2cba](https://github.com/Rasterkhann/Rasterkhann/commit/75b2cbaab2cbdf0ec381bba9e62c107fd91f66a4))
* **ui:** show when building/features start construction ([828d362](https://github.com/Rasterkhann/Rasterkhann/commit/828d3628df4a76ed87ab5d9a28b7ea3bd152e53f))



## [0.2.2](https://github.com/Rasterkhann/Rasterkhann/compare/v0.2.1...v0.2.2) (2020-07-09)


### Bug Fixes

* **guildmodal:** wrap text for hero traits ([abc5af0](https://github.com/Rasterkhann/Rasterkhann/commit/abc5af0111f9f6180b264cd75d9538d0c934ac58))
* **workshop:** workshop should save values correctly and not cause weird errors ([32b4b7e](https://github.com/Rasterkhann/Rasterkhann/commit/32b4b7e46cfd2ed597974a9044e564d4dedf8b80))


### Features

* **guildmodal:** move prospective heroes to viewing hero modal view ([43f329b](https://github.com/Rasterkhann/Rasterkhann/commit/43f329b53a4253e522a531485a0506260918f411)), closes [#13](https://github.com/Rasterkhann/Rasterkhann/issues/13)
* **inn:** inn generates money when heroes are resting and have money to spend ([c95deeb](https://github.com/Rasterkhann/Rasterkhann/commit/c95deeb32ac7016d9c3b2b5dcdf5f9f68dd941e7))



## [0.2.1](https://github.com/Rasterkhann/Rasterkhann/compare/v0.2.0...v0.2.1) (2020-07-09)


### Bug Fixes

* **adventure:** hopefully address adventures running simultaneously + sometimes using the same hero ([abff536](https://github.com/Rasterkhann/Rasterkhann/commit/abff5365f12ced830f2d91f1b737010abe071ca0))
* **automation:** make it so automation can only run every 10s guaranteed ([70b6061](https://github.com/Rasterkhann/Rasterkhann/commit/70b6061083dcfaffab6d30590f3f0fa8d907f33d))
* **guildhall:** remove gold scaling for heroes; they can cost too much ([b9a71e2](https://github.com/Rasterkhann/Rasterkhann/commit/b9a71e258166a0c0345fac03bd50201cf3a844af))
* **guildhall:** some heroes would not be recruitable ([e88ef83](https://github.com/Rasterkhann/Rasterkhann/commit/e88ef83143b9b7515c2365ffeabfce45cacc3761))
* **herogen:** heroes should always have their stats set to max on spawn ([9e408e3](https://github.com/Rasterkhann/Rasterkhann/commit/9e408e38e2f1f0de8e649262576c3911b139424d))
* **house:** house costs were entirely too low, they eclipsed everything else in auto levels ([3eb2024](https://github.com/Rasterkhann/Rasterkhann/commit/3eb20249f6bee2c8dd6f43f53ad18f9b29663fda))
* **library:** library costs were very low comparatively ([db69a0d](https://github.com/Rasterkhann/Rasterkhann/commit/db69a0d02f0d9ca67ad37fb237a40b7e7c24ff89))
* **workshop:** don't spam updates which can freeze the game ([6cc4a0b](https://github.com/Rasterkhann/Rasterkhann/commit/6cc4a0b1b5da6c3ec17bf0788de3a55f6352982d))


### Features

* **map:** can click the map text to open buildings ([8ff7654](https://github.com/Rasterkhann/Rasterkhann/commit/8ff7654ae9aae6ba231587db8acd9d5a1c472536)), closes [#11](https://github.com/Rasterkhann/Rasterkhann/issues/11)


### Reverts

* Revert "test commit" ([c7f1a42](https://github.com/Rasterkhann/Rasterkhann/commit/c7f1a42c31d57a821f16ac33abfb3ce48763f65d))



# [0.2.0](https://github.com/Rasterkhann/Rasterkhann/compare/v0.1.0...v0.2.0) (2020-07-09)


### Features

* **cave:** add monster gold/experience buff perks ([44761cd](https://github.com/Rasterkhann/Rasterkhann/commit/44761cd496eed067b89f191166d38ac959657ae5))
* **cave:** more adventures, more encounters, more simultaneous adventures ([c572337](https://github.com/Rasterkhann/Rasterkhann/commit/c57233790ab642d86455a0dec9df6ac10678dc90))
* **guildhall:** add cheaper training upgrades ([9298222](https://github.com/Rasterkhann/Rasterkhann/commit/92982221e7fefedb687afe1bb8f2612d408cd0a1))
* **guildhall:** more heroes for recruit / storage ([b274c4e](https://github.com/Rasterkhann/Rasterkhann/commit/b274c4e810f142d004d49ac03569c09350a59d28))
* **inn:** more restful features to boost hero regen ([d7a6eaa](https://github.com/Rasterkhann/Rasterkhann/commit/d7a6eaac8da6b7a3f6bd692e7e998122f239dcc1))
* **workshop:** auto game options ([85808bc](https://github.com/Rasterkhann/Rasterkhann/commit/85808bc8a301eebe200af879f263892a523b8a9f))



# [0.1.0](https://github.com/Rasterkhann/Rasterkhann/compare/v0.0.4...v0.1.0) (2020-07-08)


### Bug Fixes

* **combat:** make it so monsters can take damage ([1705b28](https://github.com/Rasterkhann/Rasterkhann/commit/1705b2894ec8ad17ad79423398a0ac7bd81b6efb))
* **hero:** heroes should not be able to get fractional gold and exp ([72802fc](https://github.com/Rasterkhann/Rasterkhann/commit/72802fc16abd21ec18d501fbad4980aff9ea6f39))
* **ui:** clean up blurry canvas text ([e5519e5](https://github.com/Rasterkhann/Rasterkhann/commit/e5519e501713832d23bd2a3f010107475b2b2452)), closes [#9](https://github.com/Rasterkhann/Rasterkhann/issues/9)


### Features

* **heroes:** all heroes have distinct trigger abilities ([e24fedb](https://github.com/Rasterkhann/Rasterkhann/commit/e24fedb6576e8cb8f7b569a739f61ca9ba438503))
* **heroes:** new hero classes can be upgraded into ([eeb42fe](https://github.com/Rasterkhann/Rasterkhann/commit/eeb42fe858bc29041d4a4eaeb4b57bce5020cefc))
* **library:** add basic set of good traits for heroes to spawn with ([2d83743](https://github.com/Rasterkhann/Rasterkhann/commit/2d83743b563a3348befb4a2453afc64f819e5d4a))
* **library:** add new building to research traits ([f7a4a21](https://github.com/Rasterkhann/Rasterkhann/commit/f7a4a21a03031f2b45261f35ebce9cc1f42c0584))



## [0.0.4](https://github.com/Rasterkhann/Rasterkhann/compare/v0.0.3...v0.0.4) (2020-07-08)


### Bug Fixes

* **adventure:** generate a proper duration for adventures ([68cda24](https://github.com/Rasterkhann/Rasterkhann/commit/68cda240f45bd1ef08ab65397ac2e7631c7f8a78))
* **index.html:** rasterkhann is on its own domain ([13c843f](https://github.com/Rasterkhann/Rasterkhann/commit/13c843fe0efe9541501a1fb8b0af84f458d724a7))
* **ui:** don't show both build and upgrade buttons ([8cdd0b2](https://github.com/Rasterkhann/Rasterkhann/commit/8cdd0b2b04346945e84236e5912279003836bdc9))


### Features

* **archives:** add new building to view notification history ([012f6a9](https://github.com/Rasterkhann/Rasterkhann/commit/012f6a9448fdf06b014d4cc5c049b981e7e650c1)), closes [#10](https://github.com/Rasterkhann/Rasterkhann/issues/10)
* **notification:** new notification feature for important events ([6925e51](https://github.com/Rasterkhann/Rasterkhann/commit/6925e516e46413e0344f80aac4181fa8ae72fed7)), closes [#10](https://github.com/Rasterkhann/Rasterkhann/issues/10)



## [0.0.3](https://github.com/Rasterkhann/Rasterkhann/compare/v0.0.2...v0.0.3) (2020-07-08)


### Features

* **watchtower:** link to the changelog from the watchtower ([36d96ab](https://github.com/Rasterkhann/Rasterkhann/commit/36d96ab3e7faaf2426e6142e76753391ea7b4fc0))



## [0.0.2](https://github.com/Rasterkhann/Rasterkhann/compare/v0.0.1...v0.0.2) (2020-07-08)


### Bug Fixes

* **savefile:** always quit an adventure, even if you die ([1e829f8](https://github.com/Rasterkhann/Rasterkhann/commit/1e829f8719c97c948836ce34730d76097d94dce9))
* **ui:** improve text size because it is really hard to read ([ee9d507](https://github.com/Rasterkhann/Rasterkhann/commit/ee9d5072c04bc5fde44332ca63952097f961cc36))
* **ui:** town name not displaying in some cases ([f108881](https://github.com/Rasterkhann/Rasterkhann/commit/f1088810e8819cfd525a5b7756cb2171f1681727))


### Features

* **adventure:** encounterTicks can be a number that isn't 600 ([d2cd488](https://github.com/Rasterkhann/Rasterkhann/commit/d2cd488f27d8e8826ba7c1e35e482a9f2e512049))



## 0.0.1 (2020-07-07)



