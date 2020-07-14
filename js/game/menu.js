function Start(){

	$ = {};
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	//////////////////////////////

	N("<b>СИМУЛЯТОР КАМИНГ АУТА 2014</b>");
	N("Полу-игра о полу-правде.");
	N("Эй, игрок. Добро пожаловать в эту игру, наверно.");
	N("Что бы ты хотел сейчас сделать?");

	Choose({
		"Давайте поиграем в это!": Play,
		"Кто ты? (Авторы)": function(){
			Credits("Кто ты?");
		},
		"Хм, расскажи мне больше. (Об Этой Игре)": function(){
			About("Хм, расскажи мне больше.");
		}
	});

}

function SipCoffee(message){
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	PlaySound("sfx","coffee_sip");
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");
}

function Play(message){
	
	SipCoffee(message);

	// Asked neither
	if(!$.asked_about && !$.asked_credits){
		N("Сразу погружаешься в игру! Отлично!");
		N("Даже не возишься с тем чтобы прочитать диалоги Об Авторе или Об Этой Игре или--");
		p("Шшш--!");
		N("Хорошо, хорошо.");
	}
	// Asked both
	if($.asked_about && $.asked_credits){
		p(". . .");
		p("Почему ты тут сделал выбор с одним вариантом?");
		N("БЕЗ ПОНЯТИЯ");
	// Asked either
	}else if($.asked_about || $.asked_credits){
		N("Да, давайте!");
	}

	N("Давайте перенесёмся из 2014 на четыре года назад, в 2010...");
	p("Это было ЧЕТЫРЕ года назад?!");
	N("...в тот вечер что изменил мою жизнь навсегда.");

	N("Скажи мне, дорогой игрок, как ты думаешь чем это закончится?");

	Choose({
		"Цветами, радугой и гей-единорогами?": function(message){
			$.main_menu_convo_1 = 1;

			p(message);
			N("Да. Именно так игра и закончится.");
			p("Серьёзно?");
			N("Нет.");
			Play_2();
		},
		"Возможно тем что ты залипаешь в соцсетях в Старбаксе.": function(message){
			$.main_menu_convo_1 = 2;

			p(message);
			N("Эй, я пишу код на этом ноутбуке. Превращаю мою историю взросления в игру в которую ты играешь сейчас.");
			p("Не, ты похоже прокрастинируешь.");
			N("Кто бы говорил.");
			p("Справедливое замечание.");
			N("Тем не менее...");
			Play_2();
		},
		"ВСЁ ЗАКОНЧИТСЯ В КРОВИ": function(message){
			$.main_menu_convo_1 = 3;

			p(message);
			N("Эм, по сравнению с этим, я полагаю моя история не настолько трагична.");
			N("Это своего рода сотая переинтерпретация через призму моего текущего опыта.");
			p("крооооовь.");
			N("И так...");
			Play_2();
		}
	});

}

function Play_2(){

	if(!$.asked_about){
		N("Если ты не пропускал диалоги Об Этой Игре, то ты уже знаешь что это моя очень личная история.");
		p("Шшш!");
	}

	N("Эта игра включает диалоги что мой бывший парень, я, и мои родители говорили на самом деле.");
	N("А также всё что мы могли, должны были, и никогда бы не говорили.");
	N("It doesn't matter which is which.");
	N("Not anymore.");

	Choose({
		"How can I win a game with no right answers?": function(message){
			$.main_menu_convo_2 = 2;

			p(message);
			N("Exactly.");
			p(". . .");
			Play_3();
		},
		"You're a bit of a downer, aren't you?": function(message){
			$.main_menu_convo_2 = 1;

			p(message);
			N("LIFE is a bit of a downer.");
			p("So that's a yes.");
			Play_3();
		},
		"Эта 'правдивая' игра из  is full of lies?": function(message){
			$.main_menu_convo_2 = 3;

			p(message);
			N("Even if the dialogue was 100% accurate, it'd still be 100% lies.");
			p(". . .");
			Play_3();
		}
	});

}

function Play_3(){

	N("You'll be playing as me, circa 2010.");
	if(!$.asked_credits){
		N("Because you skipped the Credits, my (not-yet-legal) name is Nicky Case. Just so you know.");
		p("Shush.");
	}

	var whatISay;
	switch($.main_menu_convo_1){
		case 1: whatISay = "This game doesn't end with gay unicorns. "; break;
		case 2: whatISay = "This game is a coming-out, a coming-of-age, a coming-to-terms. "; break;
		case 3: whatISay = "This game ends not in blood, but in tears. "; break;
	}
	switch($.main_menu_convo_2){
		case 1: whatISay += "Sorry for being a bit of a downer."; break;
		case 2: whatISay += "And there are no right answers."; break;
		case 3: whatISay += "And it's full of lies."; break;
	}
	N(whatISay);

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Hey, I just said that!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	Wait(500);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");
	
	Wait(1000);
	Show("nicky","coffee_nicky_still_2");
	Wait(500);
	
	N("When you play...");
	N("Choose your words wisely.");
	N("Every character will remember everything you say. Or don't say.");
	p("Yeah. You even brought up my choices in this MAIN MENU.");
	N("Exactly.");

	N(". . .");
	N("Some things are hard not to remember.");
	
	Clear();
	Start_Jack_1();

}

function Credits(message){

	$.asked_credits = true;
	
	if($.asked_about){
		SipCoffee(message);
	}else{
		SipCoffee("Кто ты?");
	}
	
	N("Ах, как грубо с моей стороны! Позвольте представиться.");
	N("Привет, я Ники Кейс.");
	N("Это не моё имя с рождения, это моё РЕАЛЬНОЕ имя.");

	p("Ну ты и чудак.");
	if($.asked_about){
		p("And like you just told me, this is your personal story?");
	}else{
		p("И ты сделал эту игру?");
	}

	N("Yep, I am the sole writer / programmer / artist of Coming Out Simulator 2014.");

	if($.asked_about){
		p("All of this yourself?");
		p("I said it before and I'll say it again...");
		p("Of course. You narcissist.");
		N("Well it's not ALL me.");
		N("The sounds & audio are from various public domain sources.");
	}else{
		N("The sounds & audio, though, are from various public domain sources.");
	}

	N("But although it's mostly just me behind this game...");
	N("...there's a lot of people behind this game's story.");

	if($.asked_about){
		Choose({
			"Speaking of which, let's play that! Now!": Play
		});
	}else{
		Choose({
			"Speaking of that, can we play it now?": Play,
			"Why'd you make this? (About This Game)": function(){
				About("Why'd you make this?");
			}
		});
	}

}

function About(message){

	$.asked_about = true;

	SipCoffee(message);

	if($.asked_credits){
		N("I wanted to tell my story.");
	}else{
		N("This game...");
		N("...more like a conversation simulator, really...");
		N("...is a very personal story.");
	}
	
	p("Of course. You narcissist.");
	N("Ha, of course.");

	if($.asked_credits){
		p("Actually no, a narcissist would use their real name.");
		N("I told you, it IS my real na--");
		p("Aight, aight. Weirdo.");
	}

	N("I made this game for the #Nar8 Game Jam. Gave me an excuse. And a deadline!");
	p("You procrastinated until the last day to enter, didn't you.");
	N("Yes.");
	N("Also! This game is uncopyrighted. Dedicated to the public domain.");
	N("I'm as open with my source code as I am with my sexuality.");

	p("Ugh, that's a terrible pun.");
	N("Howzabout a 'Fork Me' programming pun?");
	p("noooooo.");

	if($.asked_credits){
		Choose({
			"Let's just play this game already.": Play
		});
	}else{
		Choose({
			"Bad puns aside, can we play now?": Play,
			"So who ARE you? (Credits)": function(){
				Credits("So who ARE you?");
			}
		});
	}

}
