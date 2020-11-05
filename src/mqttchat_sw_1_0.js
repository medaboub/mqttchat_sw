/* 
 * Copyright (C) 2020 Gaddour, Gaddour Mohamed
 * 
 * This is a paid script developed by Gaddour Mohamed. It is strictly forbidden to publish it for free or to sell it to a third party without the prior consent of the author.
 * Any misuse of product or income related to its exploitation is strictly prohibited.
 */
  
'use strict';
/**
 * 
 * @type type
 */
var _fr ={
   1 : "Vous a envoyé un autocollant.",
   2 : "Vous a envoyé un enregistrement audio.",
   3 : "Appel Visio manqué.",
   4 : "Vous a envoyé une photo.",
   5 : "Vous a envoyé une image capturée."
};
/**
 * 
 * @type type
 */
var _ar ={
   1 : "أرسل إليك ملصقا",
   2 : "أرسل إليك رسالة صوتية",
   3 : "فاتتك مكالمة هاتفية",
   4 : "أرسل إليك صورة مسجلة",
   5 : "أرسل إليك صورة فورية"
};
/**
 * 
 * @type type
 */
var _en ={
   1 : "Sent a sticker.",
   2 : "Sent Audio record.",
   3 : "You Missed visio call.",
   4 : "Sent a disk photo.",
   5 : "Sent captured picture."
};

var languages={ 'en':_en, 'fr' : _fr, 'ar':_ar};

var lg = navigator.language;
if(['fr','en','ar'].indexOf(lg) === -1){
 lg='en';   
}

var lang=languages[lg];

var server_url="https://cluster1.telifoun.com/rest/mqttchat-cloud";

var notificationTitle = 'mqttchat';

var notificationOptions = {
    body: 'mqttchat push message.',
   /* icon: server_url+'/images/logo-192x192.png',
    badge: server_url+'/images/badge-72x72.png',*/
    tag: 'mqttchat-notification' ,
    data:'',    
    dir:  (lg==='ar')? 'rtl':'ltr'
  };
  
  
self.addEventListener('push', function(event) {
    

  if (event.data) {
      
    var dataJSON = event.data.json();
    //console.log(dataJSON);
    notificationOptions.icon=build_avatar(dataJSON.from.user.avatar,
                                          dataJSON.from.user.gender);
    notificationTitle = dataJSON.from.user.username;
    notificationOptions.body = build_message(dataJSON.from.message);
    notificationOptions.data="https://" + dataJSON.domain;
  }

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(notificationTitle, notificationOptions)
    ])
  );
});

/**
 * 
 * @param {type} avatar_link
 * @param {type} gender
 * @returns {String}
 */
function build_avatar(avatar_link,gender){
    
 var men_avatar = server_url+ "/images/mqttchat-avatar-men.png";
 var women_avatar= server_url+ "/images/mqttchat-avatar-women.png";   
 
 if(avatar_link.length === 0 || !avatar_link.trim()){
     if(gender===0){
        return men_avatar;  
     }else{
         return women_avatar;
     }
 }else{
  return avatar_link;    
 }
}


/**
 * 
 * @param {type} message
 * @returns {build_message.msg_render|String}
 */
function build_message(message){
    
   var msg_render="";
   notificationOptions.image="";
   
   switch(parseInt(message.type)){
       case 0 : //message
       msg_render=smileys_render(message.message);    
       break; 
       case 1 : //sticker
        msg_render=lang[1];
       break;
       case  2: //image disk
        msg_render=lang[4];
        notificationOptions.image=message.message;      
       break;
       case  4: //image cam
        msg_render=lang[5];
        notificationOptions.image=message.message;
       break;   
       case 3: //record
        msg_render=lang[2];
       break;
       case 5: //visio message
        msg_render=lang[3];
       break;
   } 
   return msg_render;
};




/**
 * 
 */
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  console.log(event.notification);
  var clickResponsePromise = Promise.resolve();
  clickResponsePromise = clients.openWindow(event.notification.data);
  event.waitUntil(
    Promise.all([
      clickResponsePromise
    ])
  );
});



var emojis ={":1f600:":"\u{1f600}",":1f62c:":"\u{1f62c}",":1f601:":"\u{1f601}",":1f602:":"\u{1f602}",":1f603:":"\u{1f603}",":1f604:":"\u{1f604}",":1f605:":"\u{1f605}",":1f606:":"\u{1f606}",":1f607:":"\u{1f607}",":1f609:":"\u{1f609}",":1f60a:":"\u{1f60a}",":1f642:":"\u{1f642}",":1f643:":"\u{1f643}",":263a:":"\u{263a}",":1f60b:":"\u{1f60b}",":1f60c:":"\u{1f60c}",":1f60d:":"\u{1f60d}",":1f618:":"\u{1f618}",":1f617:":"\u{1f617}",":1f619:":"\u{1f619}",":1f61a:":"\u{1f61a}",":1f61c:":"\u{1f61c}",":1f61d:":"\u{1f61d}",":1f61b:":"\u{1f61b}",":1f911:":"\u{1f911}",":1f913:":"\u{1f913}",":1f60e:":"\u{1f60e}",":1f917:":"\u{1f917}",":1f60f:":"\u{1f60f}",":1f636:":"\u{1f636}",":1f610:":"\u{1f610}",":1f611:":"\u{1f611}",":1f612:":"\u{1f612}",":1f644:":"\u{1f644}",":1f914:":"\u{1f914}",":1f633:":"\u{1f633}",":1f61e:":"\u{1f61e}",":1f61f:":"\u{1f61f}",":1f620:":"\u{1f620}",":1f621:":"\u{1f621}",":1f614:":"\u{1f614}",":1f615:":"\u{1f615}",":1f641:":"\u{1f641}",":2639:":"\u{2639}",":1f623:":"\u{1f623}",":1f616:":"\u{1f616}",":1f62b:":"\u{1f62b}",":1f629:":"\u{1f629}",":1f624:":"\u{1f624}",":1f62e:":"\u{1f62e}",":1f631:":"\u{1f631}",":1f628:":"\u{1f628}",":1f630:":"\u{1f630}",":1f62f:":"\u{1f62f}",":1f626:":"\u{1f626}",":1f627:":"\u{1f627}",":1f622:":"\u{1f622}",":1f625:":"\u{1f625}",":1f62a:":"\u{1f62a}",":1f613:":"\u{1f613}",":1f62d:":"\u{1f62d}",":1f635:":"\u{1f635}",":1f632:":"\u{1f632}",":1f910:":"\u{1f910}",":1f637:":"\u{1f637}",":1f912:":"\u{1f912}",":1f915:":"\u{1f915}",":1f634:":"\u{1f634}",":1f4a4:":"\u{1f4a4}",":1f4a9:":"\u{1f4a9}",":1f608:":"\u{1f608}",":1f47f:":"\u{1f47f}",":1f479:":"\u{1f479}",":1f47a:":"\u{1f47a}",":1f480:":"\u{1f480}",":1f47b:":"\u{1f47b}",":1f47d:":"\u{1f47d}",":1f916:":"\u{1f916}",":1f63a:":"\u{1f63a}",":1f638:":"\u{1f638}",":1f639:":"\u{1f639}",":1f63b:":"\u{1f63b}",":1f63c:":"\u{1f63c}",":1f63d:":"\u{1f63d}",":1f640:":"\u{1f640}",":1f63f:":"\u{1f63f}",":1f63e:":"\u{1f63e}",":1f64c:":"\u{1f64c}",":1f44f:":"\u{1f44f}",":1f44b:":"\u{1f44b}",":1f44d:":"\u{1f44d}",":1f44e:":"\u{1f44e}",":1f44a:":"\u{1f44a}",":270a:":"\u{270a}",":270c:":"\u{270c}",":1f44c:":"\u{1f44c}",":1f450:":"\u{1f450}",":270b:":"\u{270b}",":1f4aa:":"\u{1f4aa}",":1f64f:":"\u{1f64f}",":261d:":"\u{261d}",":1f446:":"\u{1f446}",":1f447:":"\u{1f447}",":1f448:":"\u{1f448}",":1f449:":"\u{1f449}",":1f595:":"\u{1f595}",":1f590:":"\u{1f590}",":1f918:":"\u{1f918}",":270d:":"\u{270d}",":1f485:":"\u{1f485}",":1f444:":"\u{1f444}",":1f445:":"\u{1f445}",":1f442:":"\u{1f442}",":1f443:":"\u{1f443}",":1f441:":"\u{1f441}",":1f440:":"\u{1f440}",":1f464:":"\u{1f464}",":1f465:":"\u{1f465}",":1f5e3:":"\u{1f5e3}",":1f476:":"\u{1f476}",":1f466:":"\u{1f466}",":1f467:":"\u{1f467}",":1f468:":"\u{1f468}",":1f469:":"\u{1f469}",":1f471:":"\u{1f471}",":1f474:":"\u{1f474}",":1f475:":"\u{1f475}",":1f472:":"\u{1f472}",":1f473:":"\u{1f473}",":1f46e:":"\u{1f46e}",":1f477:":"\u{1f477}",":1f482:":"\u{1f482}",":1f575:":"\u{1f575}",":1f385:":"\u{1f385}",":1f47c:":"\u{1f47c}",":1f478:":"\u{1f478}",":1f470:":"\u{1f470}",":1f6b6:":"\u{1f6b6}",":1f3c3:":"\u{1f3c3}",":1f483:":"\u{1f483}",":1f46f:":"\u{1f46f}",":1f525:":"\u{1f525}",":2728:":"\u{2728}",":1f31f:":"\u{1f31f}",":1f4ab:":"\u{1f4ab}",":1f4a2:":"\u{1f4a2}",":1f46b:":"\u{1f46b}",":1f46c:":"\u{1f46c}",":1f46d:":"\u{1f46d}",":1f647:":"\u{1f647}",":1f481:":"\u{1f481}",":1f645:":"\u{1f645}",":1f646:":"\u{1f646}",":1f64b:":"\u{1f64b}",":1f64e:":"\u{1f64e}",":1f64d:":"\u{1f64d}",":1f487:":"\u{1f487}",":1f486:":"\u{1f486}",":1f491:":"\u{1f491}",":1f48f:":"\u{1f48f}",":1f46a:":"\u{1f46a}",":1f45a:":"\u{1f45a}",":1f455:":"\u{1f455}",":1f456:":"\u{1f456}",":1f454:":"\u{1f454}",":1f457:":"\u{1f457}",":1f459:":"\u{1f459}",":1f458:":"\u{1f458}",":1f484:":"\u{1f484}",":1f48b:":"\u{1f48b}",":1f463:":"\u{1f463}",":1f460:":"\u{1f460}",":1f461:":"\u{1f461}",":1f462:":"\u{1f462}",":1f45e:":"\u{1f45e}",":1f45f:":"\u{1f45f}",":1f452:":"\u{1f452}",":1f3a9:":"\u{1f3a9}",":1f393:":"\u{1f393}",":1f451:":"\u{1f451}",":26d1:":"\u{26d1}",":1f45d:":"\u{1f45d}",":1f45b:":"\u{1f45b}",":1f45c:":"\u{1f45c}",":1f4bc:":"\u{1f4bc}",":1f453:":"\u{1f453}",":1f576:":"\u{1f576}",":1f48d:":"\u{1f48d}",":1f302:":"\u{1f302}",":1f697:":"\u{1f697}",":1f695:":"\u{1f695}",":1f699:":"\u{1f699}",":1f68c:":"\u{1f68c}",":1f68e:":"\u{1f68e}",":1f3ce:":"\u{1f3ce}",":1f693:":"\u{1f693}",":1f691:":"\u{1f691}",":1f692:":"\u{1f692}",":1f690:":"\u{1f690}",":1f69a:":"\u{1f69a}",":1f69b:":"\u{1f69b}",":1f69c:":"\u{1f69c}",":1f3cd:":"\u{1f3cd}",":1f6b2:":"\u{1f6b2}",":1f6a8:":"\u{1f6a8}",":1f694:":"\u{1f694}",":1f68d:":"\u{1f68d}",":1f698:":"\u{1f698}",":1f696:":"\u{1f696}",":1f6a1:":"\u{1f6a1}",":1f6a0:":"\u{1f6a0}",":1f69f:":"\u{1f69f}",":1f68b:":"\u{1f68b}",":1f683:":"\u{1f683}",":1f69d:":"\u{1f69d}",":1f684:":"\u{1f684}",":1f685:":"\u{1f685}",":1f688:":"\u{1f688}",":1f69e:":"\u{1f69e}",":1f682:":"\u{1f682}",":1f686:":"\u{1f686}",":1f687:":"\u{1f687}",":1f68a:":"\u{1f68a}",":1f689:":"\u{1f689}",":1f681:":"\u{1f681}",":1f6e9:":"\u{1f6e9}",":2708:":"\u{2708}",":1f6eb:":"\u{1f6eb}",":1f6ec:":"\u{1f6ec}",":26f5:":"\u{26f5}",":1f6e5:":"\u{1f6e5}",":1f6a4:":"\u{1f6a4}",":26f4:":"\u{26f4}",":1f6f3:":"\u{1f6f3}",":1f680:":"\u{1f680}",":1f6f0:":"\u{1f6f0}",":1f4ba:":"\u{1f4ba}",":2693:":"\u{2693}",":1f6a7:":"\u{1f6a7}",":26fd:":"\u{26fd}",":1f68f:":"\u{1f68f}",":1f6a6:":"\u{1f6a6}",":1f6a5:":"\u{1f6a5}",":1f3c1:":"\u{1f3c1}",":1f6a2:":"\u{1f6a2}",":1f3a2:":"\u{1f3a2}",":1f3a0:":"\u{1f3a0}",":1f3d7:":"\u{1f3d7}",":1f301:":"\u{1f301}",":1f5fc:":"\u{1f5fc}",":1f3ed:":"\u{1f3ed}",":26f2:":"\u{26f2}",":26f0:":"\u{26f0}",":1f3d4:":"\u{1f3d4}",":1f5fb:":"\u{1f5fb}",":1f30b:":"\u{1f30b}",":1f5fe:":"\u{1f5fe}",":1f3d5:":"\u{1f3d5}",":26fa:":"\u{26fa}",":1f3de:":"\u{1f3de}",":1f6e3:":"\u{1f6e3}",":1f6e4:":"\u{1f6e4}",":1f305:":"\u{1f305}",":1f304:":"\u{1f304}",":1f3dc:":"\u{1f3dc}",":1f3d6:":"\u{1f3d6}",":1f3dd:":"\u{1f3dd}",":1f307:":"\u{1f307}",":1f306:":"\u{1f306}",":1f3d9:":"\u{1f3d9}",":1f320:":"\u{1f320}",":1f309:":"\u{1f309}",":1f30c:":"\u{1f30c}",":1f386:":"\u{1f386}",":1f387:":"\u{1f387}",":1f3d8:":"\u{1f3d8}",":1f3f0:":"\u{1f3f0}",":1f3ef:":"\u{1f3ef}",":1f3df:":"\u{1f3df}",":1f5fd:":"\u{1f5fd}",":1f3e0:":"\u{1f3e0}",":1f3e1:":"\u{1f3e1}",":1f3da:":"\u{1f3da}",":1f3e2:":"\u{1f3e2}",":1f3ec:":"\u{1f3ec}",":1f3e3:":"\u{1f3e3}",":1f3e4:":"\u{1f3e4}",":1f3e5:":"\u{1f3e5}",":1f3e6:":"\u{1f3e6}",":1f3e8:":"\u{1f3e8}",":1f3ea:":"\u{1f3ea}",":1f3eb:":"\u{1f3eb}",":1f3e9:":"\u{1f3e9}",":1f492:":"\u{1f492}",":1f3db:":"\u{1f3db}",":26ea:":"\u{26ea}",":1f54c:":"\u{1f54c}",":1f54b:":"\u{1f54b}",":1f436:":"\u{1f436}",":1f431:":"\u{1f431}",":1f42d:":"\u{1f42d}",":1f439:":"\u{1f439}",":1f430:":"\u{1f430}",":1f43b:":"\u{1f43b}",":1f43c:":"\u{1f43c}",":1f428:":"\u{1f428}",":1f42f:":"\u{1f42f}",":1f981:":"\u{1f981}",":1f42e:":"\u{1f42e}",":1f437:":"\u{1f437}",":1f43d:":"\u{1f43d}",":1f438:":"\u{1f438}",":1f419:":"\u{1f419}",":1f435:":"\u{1f435}",":1f648:":"\u{1f648}",":1f649:":"\u{1f649}",":1f64a:":"\u{1f64a}",":1f412:":"\u{1f412}",":1f414:":"\u{1f414}",":1f427:":"\u{1f427}",":1f426:":"\u{1f426}",":1f424:":"\u{1f424}",":1f423:":"\u{1f423}",":1f425:":"\u{1f425}",":1f43a:":"\u{1f43a}",":1f417:":"\u{1f417}",":1f434:":"\u{1f434}",":1f984:":"\u{1f984}",":1f41d:":"\u{1f41d}",":1f41b:":"\u{1f41b}",":1f40c:":"\u{1f40c}",":1f41e:":"\u{1f41e}",":1f41c:":"\u{1f41c}",":1f577:":"\u{1f577}",":1f982:":"\u{1f982}",":1f980:":"\u{1f980}",":1f40d:":"\u{1f40d}",":1f422:":"\u{1f422}",":1f420:":"\u{1f420}",":1f41f:":"\u{1f41f}",":1f421:":"\u{1f421}",":1f42c:":"\u{1f42c}",":1f433:":"\u{1f433}",":1f40b:":"\u{1f40b}",":1f40a:":"\u{1f40a}",":1f406:":"\u{1f406}",":1f405:":"\u{1f405}",":1f403:":"\u{1f403}",":1f402:":"\u{1f402}",":1f404:":"\u{1f404}",":1f42a:":"\u{1f42a}",":1f42b:":"\u{1f42b}",":1f418:":"\u{1f418}",":1f410:":"\u{1f410}",":1f40f:":"\u{1f40f}",":1f411:":"\u{1f411}",":1f40e:":"\u{1f40e}",":1f416:":"\u{1f416}",":1f400:":"\u{1f400}",":1f401:":"\u{1f401}",":1f413:":"\u{1f413}",":1f983:":"\u{1f983}",":1f54a:":"\u{1f54a}",":1f415:":"\u{1f415}",":1f429:":"\u{1f429}",":1f408:":"\u{1f408}",":1f407:":"\u{1f407}",":1f43f:":"\u{1f43f}",":1f43e:":"\u{1f43e}",":1f409:":"\u{1f409}",":1f432:":"\u{1f432}",":1f335:":"\u{1f335}",":1f332:":"\u{1f332}",":1f333:":"\u{1f333}",":1f334:":"\u{1f334}",":1f33f:":"\u{1f33f}",":1f340:":"\u{1f340}",":1f38d:":"\u{1f38d}",":1f38b:":"\u{1f38b}",":1f343:":"\u{1f343}",":1f342:":"\u{1f342}",":1f341:":"\u{1f341}",":1f33e:":"\u{1f33e}",":1f33a:":"\u{1f33a}",":1f33b:":"\u{1f33b}",":1f339:":"\u{1f339}",":1f337:":"\u{1f337}",":1f33c:":"\u{1f33c}",":1f338:":"\u{1f338}",":1f490:":"\u{1f490}",":1f344:":"\u{1f344}",":1f330:":"\u{1f330}",":1f383:":"\u{1f383}",":1f41a:":"\u{1f41a}",":1f578:":"\u{1f578}",":1f30d:":"\u{1f30d}",":1f30e:":"\u{1f30e}",":1f30f:":"\u{1f30f}",":1f315:":"\u{1f315}",":1f316:":"\u{1f316}",":1f317:":"\u{1f317}",":1f318:":"\u{1f318}",":1f311:":"\u{1f311}",":1f312:":"\u{1f312}",":1f313:":"\u{1f313}",":1f314:":"\u{1f314}",":1f31a:":"\u{1f31a}",":1f31d:":"\u{1f31d}",":1f31b:":"\u{1f31b}",":1f31c:":"\u{1f31c}",":1f31e:":"\u{1f31e}",":1f319:":"\u{1f319}",":2b50:":"\u{2b50}",":2604:":"\u{2604}",":2600:":"\u{2600}",":1f324:":"\u{1f324}",":26c5:":"\u{26c5}",":1f325:":"\u{1f325}",":1f326:":"\u{1f326}",":2601:":"\u{2601}",":1f327:":"\u{1f327}",":26c8:":"\u{26c8}",":1f329:":"\u{1f329}",":26a1:":"\u{26a1}",":1f4a5:":"\u{1f4a5}",":2744:":"\u{2744}",":1f328:":"\u{1f328}",":2603:":"\u{2603}",":26c4:":"\u{26c4}",":1f32c:":"\u{1f32c}",":1f4a8:":"\u{1f4a8}",":1f32a:":"\u{1f32a}",":1f32b:":"\u{1f32b}",":2602:":"\u{2602}",":2614:":"\u{2614}",":1f4a6:":"\u{1f4a6}",":1f4a7:":"\u{1f4a7}",":1f30a:":"\u{1f30a}",":26bd:":"\u{26bd}",":1f3c0:":"\u{1f3c0}",":1f3c8:":"\u{1f3c8}",":26be:":"\u{26be}",":1f3be:":"\u{1f3be}",":1f3d0:":"\u{1f3d0}",":1f3c9:":"\u{1f3c9}",":1f3b1:":"\u{1f3b1}",":26f3:":"\u{26f3}",":1f3cc:":"\u{1f3cc}",":1f3d3:":"\u{1f3d3}",":1f3f8:":"\u{1f3f8}",":1f3d2:":"\u{1f3d2}",":1f3d1:":"\u{1f3d1}",":1f3cf:":"\u{1f3cf}",":1f3bf:":"\u{1f3bf}",":26f7:":"\u{26f7}",":1f3c2:":"\u{1f3c2}",":26f8:":"\u{26f8}",":1f3f9:":"\u{1f3f9}",":1f3a3:":"\u{1f3a3}",":1f6a3:":"\u{1f6a3}",":1f3ca:":"\u{1f3ca}",":1f3c4:":"\u{1f3c4}",":1f6c0:":"\u{1f6c0}",":26f9:":"\u{26f9}",":1f3cb:":"\u{1f3cb}",":1f6b4:":"\u{1f6b4}",":1f6b5:":"\u{1f6b5}",":1f3c7:":"\u{1f3c7}",":1f574:":"\u{1f574}",":1f3c6:":"\u{1f3c6}",":1f3bd:":"\u{1f3bd}",":1f3c5:":"\u{1f3c5}",":1f396:":"\u{1f396}",":1f397:":"\u{1f397}",":1f3f5:":"\u{1f3f5}",":1f39f:":"\u{1f39f}",":1f3ad:":"\u{1f3ad}",":1f3a8:":"\u{1f3a8}",":1f3aa:":"\u{1f3aa}",":1f3a4:":"\u{1f3a4}",":1f3a7:":"\u{1f3a7}",":1f3bc:":"\u{1f3bc}",":1f3b9:":"\u{1f3b9}",":1f3b7:":"\u{1f3b7}",":1f3ba:":"\u{1f3ba}",":1f3bb:":"\u{1f3bb}",":1f3b8:":"\u{1f3b8}",":1f3ac:":"\u{1f3ac}",":1f3ae:":"\u{1f3ae}",":1f47e:":"\u{1f47e}",":1f3af:":"\u{1f3af}",":1f3b2:":"\u{1f3b2}",":1f3b0:":"\u{1f3b0}",":1f3b3:":"\u{1f3b3}",":1f34f:":"\u{1f34f}",":1f34e:":"\u{1f34e}",":1f350:":"\u{1f350}",":1f34a:":"\u{1f34a}",":1f34b:":"\u{1f34b}",":1f34c:":"\u{1f34c}",":1f349:":"\u{1f349}",":1f347:":"\u{1f347}",":1f353:":"\u{1f353}",":1f348:":"\u{1f348}",":1f352:":"\u{1f352}",":1f351:":"\u{1f351}",":1f34d:":"\u{1f34d}",":1f345:":"\u{1f345}",":1f346:":"\u{1f346}",":1f336:":"\u{1f336}",":1f33d:":"\u{1f33d}",":1f360:":"\u{1f360}",":1f36f:":"\u{1f36f}",":1f35e:":"\u{1f35e}",":1f9c0:":"\u{1f9c0}",":1f357:":"\u{1f357}",":1f356:":"\u{1f356}",":1f364:":"\u{1f364}",":1f373:":"\u{1f373}",":1f354:":"\u{1f354}",":1f35f:":"\u{1f35f}",":1f32d:":"\u{1f32d}",":1f355:":"\u{1f355}",":1f35d:":"\u{1f35d}",":1f32e:":"\u{1f32e}",":1f32f:":"\u{1f32f}",":1f35c:":"\u{1f35c}",":1f372:":"\u{1f372}",":1f365:":"\u{1f365}",":1f363:":"\u{1f363}",":1f371:":"\u{1f371}",":1f35b:":"\u{1f35b}",":1f359:":"\u{1f359}",":1f35a:":"\u{1f35a}",":1f358:":"\u{1f358}",":1f362:":"\u{1f362}",":1f361:":"\u{1f361}",":1f367:":"\u{1f367}",":1f368:":"\u{1f368}",":1f366:":"\u{1f366}",":1f370:":"\u{1f370}",":1f382:":"\u{1f382}",":1f36e:":"\u{1f36e}",":1f36c:":"\u{1f36c}",":1f36d:":"\u{1f36d}",":1f36b:":"\u{1f36b}",":1f37f:":"\u{1f37f}",":1f369:":"\u{1f369}",":1f36a:":"\u{1f36a}",":1f37a:":"\u{1f37a}",":1f37b:":"\u{1f37b}",":1f377:":"\u{1f377}",":1f378:":"\u{1f378}",":1f379:":"\u{1f379}",":1f37e:":"\u{1f37e}",":1f376:":"\u{1f376}",":1f375:":"\u{1f375}",":2615:":"\u{2615}",":1f37c:":"\u{1f37c}",":1f374:":"\u{1f374}",":1f37d:":"\u{1f37d}",":1f3a5:":"\u{1f3a5}",":1f4fd:":"\u{1f4fd}",":1f39e:":"\u{1f39e}",":1f4de:":"\u{1f4de}",":260e:":"\u{260e}",":1f4df:":"\u{1f4df}",":1f4e0:":"\u{1f4e0}",":1f4fa:":"\u{1f4fa}",":1f4fb:":"\u{1f4fb}",":1f399:":"\u{1f399}",":1f39a:":"\u{1f39a}",":1f39b:":"\u{1f39b}",":23f1:":"\u{23f1}",":23f2:":"\u{23f2}",":23f0:":"\u{23f0}",":1f570:":"\u{1f570}",":23f3:":"\u{23f3}",":231b:":"\u{231b}",":1f4e1:":"\u{1f4e1}",":1f50b:":"\u{1f50b}",":1f50c:":"\u{1f50c}",":1f4a1:":"\u{1f4a1}",":1f526:":"\u{1f526}",":1f56f:":"\u{1f56f}",":1f5d1:":"\u{1f5d1}",":1f6e2:":"\u{1f6e2}",":1f4b8:":"\u{1f4b8}",":1f4b5:":"\u{1f4b5}",":1f4b4:":"\u{1f4b4}",":1f4b7:":"\u{1f4b7}",":1f4b6:":"\u{1f4b6}",":1f4b0:":"\u{1f4b0}",":1f4b3:":"\u{1f4b3}",":1f48e:":"\u{1f48e}",":2696:":"\u{2696}",":1f527:":"\u{1f527}",":1f528:":"\u{1f528}",":2692:":"\u{2692}",":1f6e0:":"\u{1f6e0}",":26cf:":"\u{26cf}",":1f529:":"\u{1f529}",":2699:":"\u{2699}",":26d3:":"\u{26d3}",":1f52b:":"\u{1f52b}",":1f4a3:":"\u{1f4a3}",":1f52a:":"\u{1f52a}",":1f5e1:":"\u{1f5e1}",":2694:":"\u{2694}",":1f6e1:":"\u{1f6e1}",":1f6ac:":"\u{1f6ac}",":2620:":"\u{2620}",":26b0:":"\u{26b0}",":26b1:":"\u{26b1}",":1f3fa:":"\u{1f3fa}",":1f52e:":"\u{1f52e}",":1f4ff:":"\u{1f4ff}",":1f488:":"\u{1f488}",":2697:":"\u{2697}",":1f52c:":"\u{1f52c}",":1f52d:":"\u{1f52d}",":1f573:":"\u{1f573}",":1f48a:":"\u{1f48a}",":1f489:":"\u{1f489}",":1f321:":"\u{1f321}",":1f3f7:":"\u{1f3f7}",":1f516:":"\u{1f516}",":1f6bd:":"\u{1f6bd}",":1f6bf:":"\u{1f6bf}",":1f6c1:":"\u{1f6c1}",":1f511:":"\u{1f511}",":1f5dd:":"\u{1f5dd}",":1f6cb:":"\u{1f6cb}",":1f6cc:":"\u{1f6cc}",":1f6cf:":"\u{1f6cf}",":1f6aa:":"\u{1f6aa}",":1f6ce:":"\u{1f6ce}",":1f5bc:":"\u{1f5bc}",":1f5fa:":"\u{1f5fa}",":26f1:":"\u{26f1}",":1f5ff:":"\u{1f5ff}",":1f6cd:":"\u{1f6cd}",":1f388:":"\u{1f388}",":1f38f:":"\u{1f38f}",":1f380:":"\u{1f380}",":1f381:":"\u{1f381}",":1f38a:":"\u{1f38a}",":1f389:":"\u{1f389}",":1f390:":"\u{1f390}",":1f38c:":"\u{1f38c}",":1f3ee:":"\u{1f3ee}",":2709:":"\u{2709}",":1f4e9:":"\u{1f4e9}",":1f4e8:":"\u{1f4e8}",":1f4e7:":"\u{1f4e7}",":1f48c:":"\u{1f48c}",":1f4ee:":"\u{1f4ee}",":1f4ea:":"\u{1f4ea}",":1f4eb:":"\u{1f4eb}",":1f4ec:":"\u{1f4ec}",":1f4ed:":"\u{1f4ed}",":1f4e6:":"\u{1f4e6}",":1f4ef:":"\u{1f4ef}",":1f4e5:":"\u{1f4e5}",":1f4e4:":"\u{1f4e4}",":1f4dc:":"\u{1f4dc}",":1f4c3:":"\u{1f4c3}",":1f4d1:":"\u{1f4d1}",":1f4ca:":"\u{1f4ca}",":1f4c8:":"\u{1f4c8}",":1f4c9:":"\u{1f4c9}",":1f4c4:":"\u{1f4c4}",":1f4c5:":"\u{1f4c5}",":1f4c6:":"\u{1f4c6}",":1f5d3:":"\u{1f5d3}",":1f4c7:":"\u{1f4c7}",":1f5c3:":"\u{1f5c3}",":1f5f3:":"\u{1f5f3}",":1f5c4:":"\u{1f5c4}",":1f4cb:":"\u{1f4cb}",":1f5d2:":"\u{1f5d2}",":1f4c1:":"\u{1f4c1}",":1f4c2:":"\u{1f4c2}",":1f5c2:":"\u{1f5c2}",":1f5de:":"\u{1f5de}",":1f4f0:":"\u{1f4f0}",":1f4d3:":"\u{1f4d3}",":1f4d5:":"\u{1f4d5}",":1f4d7:":"\u{1f4d7}",":1f4d8:":"\u{1f4d8}",":1f4d9:":"\u{1f4d9}",":1f4d4:":"\u{1f4d4}",":1f4d2:":"\u{1f4d2}",":1f4da:":"\u{1f4da}",":1f4d6:":"\u{1f4d6}",":1f517:":"\u{1f517}",":1f4ce:":"\u{1f4ce}",":1f587:":"\u{1f587}",":2702:":"\u{2702}",":1f4d0:":"\u{1f4d0}",":1f4cf:":"\u{1f4cf}",":1f4cc:":"\u{1f4cc}",":1f4cd:":"\u{1f4cd}",":1f3f3:":"\u{1f3f3}",":1f3f4:":"\u{1f3f4}",":1f510:":"\u{1f510}",":1f512:":"\u{1f512}",":1f513:":"\u{1f513}",":2764:":"\u{2764}",":1f49b:":"\u{1f49b}",":1f49a:":"\u{1f49a}",":1f499:":"\u{1f499}",":1f49c:":"\u{1f49c}",":1f494:":"\u{1f494}",":2763:":"\u{2763}",":1f495:":"\u{1f495}",":1f49e:":"\u{1f49e}",":1f493:":"\u{1f493}",":1f497:":"\u{1f497}",":1f496:":"\u{1f496}",":1f498:":"\u{1f498}",":1f49d:":"\u{1f49d}",":1f49f:":"\u{1f49f}",":262e:":"\u{262e}",":271d:":"\u{271d}",":262a:":"\u{262a}",":1f549:":"\u{1f549}",":2638:":"\u{2638}",":1f54e:":"\u{1f54e}",":262f:":"\u{262f}",":1f233:":"\u{1f233}",":1f239:":"\u{1f239}",":1f250:":"\u{1f250}",":3299:":"\u{3299}",":3297:":"\u{3297}",":1f234:":"\u{1f234}",":1f232:":"\u{1f232}",":1f191:":"\u{1f191}",":1f198:":"\u{1f198}",":26d4:":"\u{26d4}",":1f4db:":"\u{1f4db}",":1f6ab:":"\u{1f6ab}",":274c:":"\u{274c}",":2b55:":"\u{2b55}",":1f51e:":"\u{1f51e}",":1f4f5:":"\u{1f4f5}",":1f6af:":"\u{1f6af}",":1f6b1:":"\u{1f6b1}",":1f6b3:":"\u{1f6b3}",":1f6b7:":"\u{1f6b7}",":203c:":"\u{203c}",":2049:":"\u{2049}",":2757:":"\u{2757}",":2753:":"\u{2753}",":2755:":"\u{2755}",":2754:":"\u{2754}",":1f4af:":"\u{1f4af}",":1f6b8:":"\u{1f6b8}",":1f506:":"\u{1f506}",":1f505:":"\u{1f505}",":1f531:":"\u{1f531}",":1f530:":"\u{1f530}",":267b:":"\u{267b}",":2733:":"\u{2733}",":2747:":"\u{2747}",":274e:":"\u{274e}",":2705:":"\u{2705}",":1f4b9:":"\u{1f4b9}",":1f300:":"\u{1f300}",":1f6be:":"\u{1f6be}",":1f6b0:":"\u{1f6b0}",":1f17f:":"\u{1f17f}",":267f:":"\u{267f}",":1f6ad:":"\u{1f6ad}",":1f202:":"\u{1f202}",":24c2:":"\u{24c2}",":1f6c2:":"\u{1f6c2}",":1f6c4:":"\u{1f6c4}",":1f6c5:":"\u{1f6c5}",":1f6c3:":"\u{1f6c3}",":1f6b9:":"\u{1f6b9}",":1f6ba:":"\u{1f6ba}",":1f6bc:":"\u{1f6bc}",":1f6bb:":"\u{1f6bb}",":1f6ae:":"\u{1f6ae}",":1f51f:":"\u{1f51f}",":1f522:":"\u{1f522}",":1f523:":"\u{1f523}",":2b06:":"\u{2b06}",":2b07:":"\u{2b07}",":2b05:":"\u{2b05}",":27a1:":"\u{27a1}",":1f520:":"\u{1f520}",":1f521:":"\u{1f521}",":1f524:":"\u{1f524}",":2197:":"\u{2197}",":2196:":"\u{2196}",":2198:":"\u{2198}",":2199:":"\u{2199}",":2194:":"\u{2194}",":2195:":"\u{2195}",":1f504:":"\u{1f504}",":25c0:":"\u{25c0}",":25b6:":"\u{25b6}",":1f53c:":"\u{1f53c}",":1f53d:":"\u{1f53d}",":21a9:":"\u{21a9}",":21aa:":"\u{21aa}",":2139:":"\u{2139}",":23ea:":"\u{23ea}",":23ed:":"\u{23ed}",":23ef:":"\u{23ef}",":23ee:":"\u{23ee}",":23f8:":"\u{23f8}",":23f9:":"\u{23f9}",":23fa:":"\u{23fa}",":23eb:":"\u{23eb}",":23ec:":"\u{23ec}",":2935:":"\u{2935}",":2934:":"\u{2934}",":1f197:":"\u{1f197}",":1f500:":"\u{1f500}",":1f501:":"\u{1f501}",":1f502:":"\u{1f502}",":1f195:":"\u{1f195}",":1f199:":"\u{1f199}",":1f192:":"\u{1f192}",":1f193:":"\u{1f193}",":1f196:":"\u{1f196}",":1f4f6:":"\u{1f4f6}",":1f3a6:":"\u{1f3a6}",":1f201:":"\u{1f201}",":1f4b2:":"\u{1f4b2}",":1f4b1:":"\u{1f4b1}",":00a9:":"\u{00a9}",":00ae:":"\u{00ae}",":2122:":"\u{2122}",":1f51d:":"\u{1f51d}",":1f51a:":"\u{1f51a}",":1f519:":"\u{1f519}",":1f51b:":"\u{1f51b}",":1f51c:":"\u{1f51c}",":1f503:":"\u{1f503}",":2716:":"\u{2716}",":2795:":"\u{2795}",":2796:":"\u{2796}",":2797:":"\u{2797}",":2714:":"\u{2714}",":2611:":"\u{2611}",":1f518:":"\u{1f518}",":27b0:":"\u{27b0}",":1f4ae:":"\u{1f4ae}",":25fc:":"\u{25fc}",":25fb:":"\u{25fb}",":25fe:":"\u{25fe}",":25fd:":"\u{25fd}",":25aa:":"\u{25aa}",":25ab:":"\u{25ab}"}; 
/**
 * 
 */
function smileys_render(message){         
 var html=message;
 for (var key in emojis) {         
  if (emojis.hasOwnProperty(key)) {
    html = html.replace(new RegExp(escapeRegex(key), 'g'), emojis[key]);
  }
 }
 return html;
};
/**
 * 
 */
function escapeRegex(str) {
return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
};

