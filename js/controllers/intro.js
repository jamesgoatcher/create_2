/* NOTES */

// Intro song, Flicker song, Tutorial song, Game song
// Preload all songs
// Window reload and sound on/off toggle

/* INTRO VARIABLES */
let titleCount = 2,  // Array title removal count variable
	flickerInterval,
	playerInterval,
	bgInterval,
	playerInPlaceInterval,
	playerInPlaceIntervalTime,
	mkuDest,
	playerPosX = -10,
	bgPosX = 0,
	questionBool = false;
	

/* INTRO FUNCTIONS */
const 
CLEAR_INTERVAL = (interval) => {
	clearInterval(interval); 
};

const
// Sets the BG to the intro page
SET_BG = () => {
	$$('.page--intro').addClass('show');
	AUDIO_CHANGE('intro'); // Call Intro song
},
// Title slides down
INTRO_TITLE_SLIDE = () => {
	$$('.title').addClass('slideDown');
	START_APPEAR();
},
// Start button appears
START_APPEAR = () => {
	$$('.title__create').addClass('bg', 5000); // Background color fades out
	$$('.intro__curtain').addClass('hide', 5000); // Intro curtain fades out

	$$('.start').removeClass('hide', 7000); // Start button fades in
	$$('.credits').removeClass('hide', 7000); // Credits fades in

	$$('.intro__curtain').addClass('none', 7000); // Set curtain to display none
},
// Begin game
START_BUTTON = () => {
	flickerInterval = setInterval(FLICKER_TITLE, 175); // If you want it to blink fast 50 times
	$$('.start').addClass('none'); // Remove the start button
	$$('.credits').addClass('none'); // Remove the credit
	AUDIO_CHANGE('flicker'); // Call Flicker song
},
// Flicker the title after start
FLICKER_TITLE = () => {
	if (titleCount % 2) {
		// $$('.title').style.opacity = 1;
		$$('.overlay').removeClass('hide');
		$$('.title__create').addClass('white');
		titleCount++;
	} else {
		// $$('.title').style.opacity = 0;
		$$('.overlay').addClass('hide');
		$$('.title__create').removeClass('white');
		titleCount++;
	}

	if (titleCount == 15) {
		CLEAR_FLICKER(); // End the animation
	}
},
	// Clear the flicker event and call the tutorial
	CLEAR_FLICKER = () => {
		clearInterval(flickerInterval);

		$$('.title').addClass('none'); // Remove the title elements
	
		TUTORIAL_SHOW();
	},
// Tutorial begins
TUTORIAL_SHOW = () => {
	AUDIO_CHANGE('tutorial'); // Call Tutorial song
	$$('.overlay').removeClass('hide'); // Show the overlay
	$$('.tutorial').removeClass('hide'); // Show the tutorial
	$$('.tutorial__start').removeClass('hide'); // Show the start feature

	document.body.onkeyup = function (e) {
		if (e.keyCode == 32 || e.keyCode == 13) {
			TUTORIAL_CLOSE();
		}
	};
},
// Close the tutorial
TUTORIAL_CLOSE = () => {
	document.body.onkeyup = null; // Unbind the space bar keyup

	$$('.overlay').addClass('none'); // Remove the overlay
	$$('.tutorial').addClass('none'); // Remove the tutorial
	$$('.tutorial__start').addClass('none'); // Remove the start feature
	PERSONALIZATION_BEGIN();
},
// Animation for sliding around the bottom
TOASTY = (rand) => {
	let 
	toastyDate  = '2019-03-13',
	currentDate = new Date();
	toastyDate = new Date(toastyDate);

	// if (toastyDate < currentDate) {
	// 	let xhttp = new XMLHttpRequest();
	// 	xhttp.onreadystatechange = function () {
	// 	  if (this.readyState == 4 && this.status == 200) {
	// 	    document.getElementById('mku').innerHTML = xhttp.responseText;
	// 	  }
	// 	};
	// 	xhttp.open("GET", mkuDest, true);
	// 	xhttp.send();
	// }
	
	if (rand == 4 && toastyDate < currentDate) {
		document.getElementById('mku').innerHTML = `<a href='http://jamesgoatcher.com/heavensonfire' id='toasty' target='_blank'><img src='https://xal.rocks/sandbox/siobhan/mku/toasty.png' /></a>`;
	}
},
// Begin the Personalization game
PERSONALIZATION_BEGIN = () => {
	AUDIO_CHANGE('personalization'); // Call Intro song
	mkuDest = 'https://xal.rocks/sandbox/siobhan/mku/toasty.php'; // mku directory
	playerInterval = setInterval(PLAYER_MOVEMENT.bind(this, 20), 160);
},
// Player movement to center INIT
PLAYER_MOVEMENT = (distance) => {
	if (playerPosX < distance) {
		$$('.player_sprite').style.transform = `translateX(${playerPosX}vw)`;
		if (Math.abs(playerPosX) % 2 == false) {
			$$('.player__left').style.opacity  = 1;
			$$('.player__right').style.opacity = 0;
		} else {
			$$('.player__left').style.opacity  = 0;
			$$('.player__right').style.opacity = 1;
		}
		playerPosX = ++playerPosX;
	} else {
		clearInterval(playerInterval);
		BG_MOVEMENT_INT('start', 100); // Begin interval
	}
},
// Call this fns to have bg move between questions
BG_MOVEMENT_INT = (option, distance, questionNum) => {
	if (option == 'start') {
		bgInterval = setInterval(BG_MOVEMENT.bind(this, distance, questionNum), 50); // Call bg move
		playerInPlaceIntervalTime = 100; // Init character move time limit
		playerInPlaceInterval = setInterval(PLAYER_MOVES_IN_PLACE.bind(this, false), 200); // Set the Player move interval
	} else if (option == 'finish') {
		clearInterval(bgInterval); // Clear bg move
		clearInterval(playerInPlaceInterval); // Clear moving in place
		PLAYER_MOVES_IN_PLACE(true); // Reset character sprite to front
		if (questionNum) {
			$$(`#${questionNum}`).removeClass('hide');
		}
	} else {
		clearInterval(bgInterval); // Clear bg move, just in case
		clearInterval(playerInPlaceInterval); // Clear moving in place
		PLAYER_MOVES_IN_PLACE(true); // Reset character sprite to front
		if (questionNum) {
			$$(`#${questionNum}`).removeClass('hide');
		}
	}
},
// Background movement
BG_MOVEMENT = (distance, questionNum) => {
	if (bgPosX < distance) {
		$$('.page--intro').style.backgroundPositionX = `-${bgPosX}vw`;
		bgPosX = ++bgPosX;
	} else {
		BG_MOVEMENT_INT('finish', null, questionNum); // Clear interval
		clearInterval(playerInPlaceInterval);
		PLAYER_MOVES_IN_PLACE(true); // Reset character sprite to front
		if (!questionNum) {
			QUESTIONS_BEGIN_TO_END('question_1');
		}
	}
},
// Player moves in place
PLAYER_MOVES_IN_PLACE = (finished) => {
	if (finished == !true) {
		$$('.player__front').style.opacity = 0;

		if (Math.abs(playerInPlaceIntervalTime) % 2 == false) {
			$$('.player__left').style.opacity  = 1;
			$$('.player__right').style.opacity = 0;
			playerInPlaceIntervalTime = --playerInPlaceIntervalTime;
		} else {
			$$('.player__left').style.opacity  = 0;
			$$('.player__right').style.opacity = 1;
			playerInPlaceIntervalTime = --playerInPlaceIntervalTime;
		}
	} else {
		$$('.player__front').style.opacity = 1;
		$$('.player__left').style.opacity  = 0;
		$$('.player__right').style.opacity = 0;
	}
},
// Begin Questions
QUESTIONS_BEGIN_TO_END = (question) => {
	switch (question) {
		case 'question_1':
			$$('#question_1').removeClass('hide');
			break;

		case 'question_2':
			$$('#question_1').addClass('hide');
			BG_MOVEMENT_INT('start', 200, 'question_2');
			break;

		case 'question_3':
			$$('#question_2').addClass('hide');
			BG_MOVEMENT_INT('start', 300, 'question_3');
			break;

		case 'question_4':
			$$('#question_3').addClass('hide');
			BG_MOVEMENT_INT('start', 400, 'question_4');
			break;

		default:
			console.dir('QUESTIONS_BEGIN_TO_END default');
			break;
	}
},
// Add event listeners to elements
EVENT_LISTENERS = () => {
	let
	restartEls     = Array.from(document.querySelectorAll('.header__restart')),
	createEls  	   = Array.from(document.querySelectorAll('.header__logo')),
	soundToggleEls = Array.from(document.querySelectorAll('.header__sound')),
	menuEls 	   = Array.from(document.querySelectorAll('.header__menu')),
	menuLineEls    = Array.from(document.querySelectorAll('[data-menuframe]')),
	restLineEls    = Array.from(document.querySelectorAll('[data-restartframe]')),
	arrowLEls 	   = Array.from(document.querySelectorAll('.header__arrow-left')),
	arrowREls 	   = Array.from(document.querySelectorAll('.header__arrow-right')),
	adlabsChars	   = Array.from(document.querySelectorAll('[data-xalkey]')),
	adlabsRoles	   = Array.from(document.querySelectorAll('[data-xalrole]'));

	// Header - Restart
	for (let el in restartEls) {
		restartEls[el].addEventListener('click', HEADER_RESTART);
	}
	// Header - Create logo
	for (let el in createEls) {
		createEls[el].addEventListener('click', function () {
			window.open('http://jamesgoatcher.com/heavensonfire', '_blank');
		});
	}
	// Header - Sound Toggle
	for (let el in soundToggleEls) {
		soundToggleEls[el].addEventListener('click', HEADER_SOUND_TOGGLE);
	}
	// Header - Menu
	for (let el in menuEls) {
		menuEls[el].addEventListener('click', HEADER_MENU);
	}
	// Header - Menu lines
	for (let el in menuLineEls) {
		menuLineEls[el].addEventListener('click', MENU_LINE_CLICKS);
	}
	// Header - Menu Restart lines
	for (let el in restLineEls) {
		restLineEls[el].addEventListener('click', HEADER_RESTART);
	}
	// Header - Arrow Left
	for (let el in arrowLEls) {
		arrowLEls[el].addEventListener('click', HEADER_ARROWS);
	}
	// Header - Arrow Right
	for (let el in arrowREls) {
		arrowREls[el].addEventListener('click', HEADER_ARROWS);
	}
	// Persona, AdLabs - Characters
	for (let el in adlabsChars) {
		adlabsChars[el].addEventListener('click', PERSONA_ADLABS_FUNCTIONALITY);
	}
	// Persona, AdLabs - Roles
	for (let el in adlabsRoles) {
		adlabsRoles[el].addEventListener('click', PERSONA_ADLABS_FUNCTIONALITY);
	}

	$$('.start').addEventListener('click', START_BUTTON);
	$$('.tutorial').addEventListener('click', TUTORIAL_CLOSE);
};

/* CALL FUNCTIONS */
document.onreadystatechange = function () {
	if (document.readyState === 'complete') {
		SET_BG(); // Set intro page bg and call audio
		PERSONA_FRAME_BG(); // Set all Persona bgs based on data-persona and data-frame
		POPULATE_PERSONA_CONTENT(); // Set all Persona scenes with their content
		INTRO_TITLE_SLIDE(); // Call title sequence
		EVENT_LISTENERS(); // Call event listeners
	}
};