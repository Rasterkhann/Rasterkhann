## [0.2.3](https://github.com/seiyria/Rasterkhann/compare/v0.2.2...v0.2.3) (2020-07-10)


### Bug Fixes

* **adventure:** always cancel adventures if the id isn't a valid adventure on refresh ([b77fccc](https://github.com/seiyria/Rasterkhann/commit/b77fccce8d07179d66440deffb50b6be4c3e8f08))
* **hero:** hero level up cost is randomized and larger ([9cc61db](https://github.com/seiyria/Rasterkhann/commit/9cc61dbd31f89c039a4526644c11847c006e929c))
* **town:** doesTownHaveFeature would fail in niche cases where a building didn't quite exist ([7a86577](https://github.com/seiyria/Rasterkhann/commit/7a865770672e747383f80140b0580dfad1801f56))
* **ui:** automatically swap views if you recruit a hero ([59d818b](https://github.com/seiyria/Rasterkhann/commit/59d818b43f94345ed3488dcf867dcef112be6fd6))
* **ui:** exp verbiage changes to make more sense ([d37a552](https://github.com/seiyria/Rasterkhann/commit/d37a552da151997152abb78841ac7ba7d0eaeef6))


### Features

* **dx:** add savefile compress/decompress tools to debug them more easily ([75b2cba](https://github.com/seiyria/Rasterkhann/commit/75b2cbaab2cbdf0ec381bba9e62c107fd91f66a4))
* **ui:** show when building/features start construction ([828d362](https://github.com/seiyria/Rasterkhann/commit/828d3628df4a76ed87ab5d9a28b7ea3bd152e53f))



## [0.2.2](https://github.com/seiyria/Rasterkhann/compare/v0.2.1...v0.2.2) (2020-07-09)


### Bug Fixes

* **guildmodal:** wrap text for hero traits ([abc5af0](https://github.com/seiyria/Rasterkhann/commit/abc5af0111f9f6180b264cd75d9538d0c934ac58))
* **workshop:** workshop should save values correctly and not cause weird errors ([32b4b7e](https://github.com/seiyria/Rasterkhann/commit/32b4b7e46cfd2ed597974a9044e564d4dedf8b80))


### Features

* **guildmodal:** move prospective heroes to viewing hero modal view ([43f329b](https://github.com/seiyria/Rasterkhann/commit/43f329b53a4253e522a531485a0506260918f411)), closes [#13](https://github.com/seiyria/Rasterkhann/issues/13)
* **inn:** inn generates money when heroes are resting and have money to spend ([c95deeb](https://github.com/seiyria/Rasterkhann/commit/c95deeb32ac7016d9c3b2b5dcdf5f9f68dd941e7))



## [0.2.1](https://github.com/seiyria/Rasterkhann/compare/v0.2.0...v0.2.1) (2020-07-09)


### Bug Fixes

* **adventure:** hopefully address adventures running simultaneously + sometimes using the same hero ([abff536](https://github.com/seiyria/Rasterkhann/commit/abff5365f12ced830f2d91f1b737010abe071ca0))
* **automation:** make it so automation can only run every 10s guaranteed ([70b6061](https://github.com/seiyria/Rasterkhann/commit/70b6061083dcfaffab6d30590f3f0fa8d907f33d))
* **guildhall:** remove gold scaling for heroes; they can cost too much ([b9a71e2](https://github.com/seiyria/Rasterkhann/commit/b9a71e258166a0c0345fac03bd50201cf3a844af))
* **guildhall:** some heroes would not be recruitable ([e88ef83](https://github.com/seiyria/Rasterkhann/commit/e88ef83143b9b7515c2365ffeabfce45cacc3761))
* **herogen:** heroes should always have their stats set to max on spawn ([9e408e3](https://github.com/seiyria/Rasterkhann/commit/9e408e38e2f1f0de8e649262576c3911b139424d))
* **house:** house costs were entirely too low, they eclipsed everything else in auto levels ([3eb2024](https://github.com/seiyria/Rasterkhann/commit/3eb20249f6bee2c8dd6f43f53ad18f9b29663fda))
* **library:** library costs were very low comparatively ([db69a0d](https://github.com/seiyria/Rasterkhann/commit/db69a0d02f0d9ca67ad37fb237a40b7e7c24ff89))
* **workshop:** don't spam updates which can freeze the game ([6cc4a0b](https://github.com/seiyria/Rasterkhann/commit/6cc4a0b1b5da6c3ec17bf0788de3a55f6352982d))


### Features

* **map:** can click the map text to open buildings ([8ff7654](https://github.com/seiyria/Rasterkhann/commit/8ff7654ae9aae6ba231587db8acd9d5a1c472536)), closes [#11](https://github.com/seiyria/Rasterkhann/issues/11)


### Reverts

* Revert "test commit" ([c7f1a42](https://github.com/seiyria/Rasterkhann/commit/c7f1a42c31d57a821f16ac33abfb3ce48763f65d))



# [0.2.0](https://github.com/seiyria/Rasterkhann/compare/v0.1.0...v0.2.0) (2020-07-09)


### Features

* **cave:** add monster gold/experience buff perks ([44761cd](https://github.com/seiyria/Rasterkhann/commit/44761cd496eed067b89f191166d38ac959657ae5))
* **cave:** more adventures, more encounters, more simultaneous adventures ([c572337](https://github.com/seiyria/Rasterkhann/commit/c57233790ab642d86455a0dec9df6ac10678dc90))
* **guildhall:** add cheaper training upgrades ([9298222](https://github.com/seiyria/Rasterkhann/commit/92982221e7fefedb687afe1bb8f2612d408cd0a1))
* **guildhall:** more heroes for recruit / storage ([b274c4e](https://github.com/seiyria/Rasterkhann/commit/b274c4e810f142d004d49ac03569c09350a59d28))
* **inn:** more restful features to boost hero regen ([d7a6eaa](https://github.com/seiyria/Rasterkhann/commit/d7a6eaac8da6b7a3f6bd692e7e998122f239dcc1))
* **workshop:** auto game options ([85808bc](https://github.com/seiyria/Rasterkhann/commit/85808bc8a301eebe200af879f263892a523b8a9f))



# [0.1.0](https://github.com/seiyria/Rasterkhann/compare/v0.0.4...v0.1.0) (2020-07-08)


### Bug Fixes

* **combat:** make it so monsters can take damage ([1705b28](https://github.com/seiyria/Rasterkhann/commit/1705b2894ec8ad17ad79423398a0ac7bd81b6efb))
* **hero:** heroes should not be able to get fractional gold and exp ([72802fc](https://github.com/seiyria/Rasterkhann/commit/72802fc16abd21ec18d501fbad4980aff9ea6f39))
* **ui:** clean up blurry canvas text ([e5519e5](https://github.com/seiyria/Rasterkhann/commit/e5519e501713832d23bd2a3f010107475b2b2452)), closes [#9](https://github.com/seiyria/Rasterkhann/issues/9)


### Features

* **heroes:** all heroes have distinct trigger abilities ([e24fedb](https://github.com/seiyria/Rasterkhann/commit/e24fedb6576e8cb8f7b569a739f61ca9ba438503))
* **heroes:** new hero classes can be upgraded into ([eeb42fe](https://github.com/seiyria/Rasterkhann/commit/eeb42fe858bc29041d4a4eaeb4b57bce5020cefc))
* **library:** add basic set of good traits for heroes to spawn with ([2d83743](https://github.com/seiyria/Rasterkhann/commit/2d83743b563a3348befb4a2453afc64f819e5d4a))
* **library:** add new building to research traits ([f7a4a21](https://github.com/seiyria/Rasterkhann/commit/f7a4a21a03031f2b45261f35ebce9cc1f42c0584))



## [0.0.4](https://github.com/seiyria/Rasterkhann/compare/v0.0.3...v0.0.4) (2020-07-08)


### Bug Fixes

* **adventure:** generate a proper duration for adventures ([68cda24](https://github.com/seiyria/Rasterkhann/commit/68cda240f45bd1ef08ab65397ac2e7631c7f8a78))
* **index.html:** rasterkhann is on its own domain ([13c843f](https://github.com/seiyria/Rasterkhann/commit/13c843fe0efe9541501a1fb8b0af84f458d724a7))
* **ui:** don't show both build and upgrade buttons ([8cdd0b2](https://github.com/seiyria/Rasterkhann/commit/8cdd0b2b04346945e84236e5912279003836bdc9))


### Features

* **archives:** add new building to view notification history ([012f6a9](https://github.com/seiyria/Rasterkhann/commit/012f6a9448fdf06b014d4cc5c049b981e7e650c1)), closes [#10](https://github.com/seiyria/Rasterkhann/issues/10)
* **notification:** new notification feature for important events ([6925e51](https://github.com/seiyria/Rasterkhann/commit/6925e516e46413e0344f80aac4181fa8ae72fed7)), closes [#10](https://github.com/seiyria/Rasterkhann/issues/10)



## [0.0.3](https://github.com/seiyria/Rasterkhann/compare/v0.0.2...v0.0.3) (2020-07-08)


### Features

* **watchtower:** link to the changelog from the watchtower ([36d96ab](https://github.com/seiyria/Rasterkhann/commit/36d96ab3e7faaf2426e6142e76753391ea7b4fc0))



## [0.0.2](https://github.com/seiyria/Rasterkhann/compare/v0.0.1...v0.0.2) (2020-07-08)


### Bug Fixes

* **savefile:** always quit an adventure, even if you die ([1e829f8](https://github.com/seiyria/Rasterkhann/commit/1e829f8719c97c948836ce34730d76097d94dce9))
* **ui:** improve text size because it is really hard to read ([ee9d507](https://github.com/seiyria/Rasterkhann/commit/ee9d5072c04bc5fde44332ca63952097f961cc36))
* **ui:** town name not displaying in some cases ([f108881](https://github.com/seiyria/Rasterkhann/commit/f1088810e8819cfd525a5b7756cb2171f1681727))


### Features

* **adventure:** encounterTicks can be a number that isn't 600 ([d2cd488](https://github.com/seiyria/Rasterkhann/commit/d2cd488f27d8e8826ba7c1e35e482a9f2e512049))



## 0.0.1 (2020-07-07)



