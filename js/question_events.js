let
QUESTION_OBJ = {
	question_1 : {},
	question_2 : {},
	question_3 : {}
},
objectMoveInterval,
evObjPosX = 100,
// Random number generator 
RANDOM_NUM = (min, max) => {
	return Math.floor( Math.random() * (max - min + 1) + min );
},
// Click event for object events
OBJ_CLICK = (e) => {
	let
	el  	= e.target,
	sfx 	= document.querySelector('.sfx'),
	sfx_src = document.getElementById('sfx_src');

	el.style.backgroundImage = 'url("./assets/img/questions__poof.png")';
	sfx_src.src = './assets/aud/questions__poof.mp3';
	sfx.load();
	sfx.play();

	QUESTION_OBJ.question_3.poof = true;

	setTimeout(function() {
		el.remove();
	}, 500);
};

const
// Switch and main fns for events between questions
QUESTION_EVENTS = (answer, tier) => {
	switch (answer) {
		// Tier 1
		case 'action': // flicker
			QUESTION_OBJ.question_1 = {
				"label"           : "question_1",
				"action"		  : "flicker",
				"animationClass"  : "action_flicker",
				"textBox"		  : true,
				textGen (rand) {
					let
					array = ['BANG!', 'BAM!', 'BIFF!', 'EEE-YOW!', 'FLRBBBBB!', 'GLURPP!', 'KAPOW!', 'KLUNK!', 'OOOOFF!', 'OUCH!', 'SWOOSH!', 
					'THWACK!', 'URKKK!', 'WHAMM!', 'ZLONK!'];

					return array[rand];
				},
				"sfx"			  : "./assets/aud/questions__action.mp3"
			};
			break;

		case 'rom': // sprite
			QUESTION_OBJ.question_1 = {
				"label"           : "question_1",
				"action"		  : "sprite",
				"zIndex"		  : "10",
				"sprite_src"	  : "url('./assets/img/questions__rom.png')",
				"anim_src"		  : "url('./assets/img/questions__rom-anim.png')",
				"anim1_right"	  : "20vw",
				"anim1_bottom"	  : "10vh",
				"anim2_right"	  : "30vw",
				"anim2_bottom"	  : "40vh",
				"anim3_right"	  : "20vw",
				"anim3_bottom"	  : "70vh",
				"sfx"			  : "./assets/aud/questions__rom.mp3"
			};
			break;

		// Tier 2
		case 'loud': // sprite
			QUESTION_OBJ.question_2 = {
				"label"           : "question_2",
				"action"		  : "sprite",
				"zIndex"		  : "10",
				"sprite_src"	  : "url('./assets/img/questions__music.png')",
				"anim_src"		  : "url('./assets/img/questions__music-anim.png')",
				"anim1_right"	  : "20vw",
				"anim1_bottom"	  : "10vh",
				"anim2_right"	  : "30vw",
				"anim2_bottom"	  : "40vh",
				"anim3_right"	  : "20vw",
				"anim3_bottom"	  : "70vh",
				"sfx"			  : "./assets/aud/questions__loud.mp3"
			};
			break;

		case 'chill': // sprite
			QUESTION_OBJ.question_2 = {
				"label"           : "question_2",
				"action"		  : "sprite",
				"zIndex"		  : "10",
				"sprite_src"	  : "url('./assets/img/questions__music.png')",
				"anim_src"		  : "url('./assets/img/questions__music-anim.png')",
				"anim1_right"	  : "20vw",
				"anim1_bottom"	  : "10vh",
				"anim2_right"	  : "30vw",
				"anim2_bottom"	  : "40vh",
				"anim3_right"	  : "20vw",
				"anim3_bottom"	  : "70vh",
				"sfx"			  : "./assets/aud/questions__chill.mp3"
			};
			break;

		case 'cats': // flicker
			QUESTION_OBJ.question_2 = {
				"label"           : "question_2",
				"action"		  : "flicker",
				"animationClass"  : "cats_flicker",
				"textBox"		  : false,
				"sfx"			  : "./assets/aud/questions__cats.mp3"
			};
			break;

		case 'dogs': // flicker
			QUESTION_OBJ.question_2 = {
				"label"           : "question_2",
				"action"		  : "flicker",
				"animationClass"  : "dogs_flicker",
				"textBox"		  : false,
				"sfx"			  : "./assets/aud/questions__dogs.mp3"
			};
			break;

		// Tier 3
		case 'backpacking': // object
			QUESTION_OBJ.question_3 = {
				"label"           : "question_3",
				"action"		  : "object",
				"left"			  : "",
				"top"			  : "",
				"backgroundImage" : "url('./assets/img/questions__backpack.png')",
				axisGen (randX, randY) {
					QUESTION_OBJ.question_3.left = `${randX}vw`;
					QUESTION_OBJ.question_3.top  = `${randY}vh`;
				},
				"poof" 			  : false,
				"obj_name"		  : "BACKPACK"
			};
			break;

		case 'cabin': // object
			QUESTION_OBJ.question_3 = {
				"label"           : "question_3",
				"action"		  : "object",
				"left"			  : "",
				"top"			  : "",
				"backgroundImage" : "url('./assets/img/questions__cabin.png')",
				axisGen (randX, randY) {
					QUESTION_OBJ.question_3.left = `${randX}vw`;
					QUESTION_OBJ.question_3.top  = `${randY}vh`;
				},
				"poof" 			  : false,
				"obj_name"		  : "CABIN"
			};
			break;

		case 'concert': // object
			QUESTION_OBJ.question_3 = {
				"label"           : "question_3",
				"action"		  : "object",
				"left"			  : "",
				"top"			  : "",
				"backgroundImage" : "url('./assets/img/questions__concert.png')",
				axisGen (randX, randY) {
					QUESTION_OBJ.question_3.left = `${randX}vw`;
					QUESTION_OBJ.question_3.top  = `${randY}vh`;
				},
				"poof" 			  : false,
				"obj_name"		  : "GUITAR"
			};
			break;

		case 'escape': // flicker
			QUESTION_OBJ.question_3 = {
				"label"           : "question_3",
				"action"		  : "flicker",
				"animationClass"  : "escape_flicker",
				"textBox"		  : true,
				textGen (rand) {
					let
					array = ['HELP!', 'I FOUND IT!', 'WHERE IS THE KEY?', 'UGHHH!', 'TIME IS UP!', 'NEED MORE TIME!', 'NEED A HINT!', 'WE DID IT!', 'WHAT IS THIS?', 
					'AHHHH!', 'DOES THIS MOVE?', 'CAN I MOVE THIS?', 'WHAT IS THIS?', 'I NEED A KEY!', 'YIKES!'];

					return array[rand];
				},
				"sfx"			  : "./assets/aud/questions__escape.mp3"
			};
			break;

		case 'takeout': // object
			QUESTION_OBJ.question_3 = {
				"label"           : "question_3",
				"action"		  : "object",
				"left"			  : "",
				"top"			  : "",
				"backgroundImage" : "url('./assets/img/questions__takeout.png')",
				axisGen (randX, randY) {
					QUESTION_OBJ.question_3.left = `${randX}vw`;
					QUESTION_OBJ.question_3.top  = `${randY}vh`;
				},
				"poof" 			  : false,
				"obj_name"		  : "TAKEOUT"
			};
			break;

		case 'restaurant': // object
			QUESTION_OBJ.question_3 = {
				"label"           : "question_3",
				"action"		  : "object",
				"left"			  : "",
				"top"			  : "",
				"backgroundImage" : "url('./assets/img/questions__dinein.png')",
				axisGen (randX, randY) {
					QUESTION_OBJ.question_3.left = `${randX}vw`;
					QUESTION_OBJ.question_3.top  = `${randY}vh`;
				},
				"poof" 			  : false,
				"obj_name"		  : "MEAL"
			};
			break;

		case 'halloween': // sprite
			QUESTION_OBJ.question_3 = {
				"label"           : "question_3",
				"action"		  : "sprite",
				"zIndex"		  : "10",
				"sprite_src"	  : "url('./assets/img/questions__halloween.png')",
				"anim_src"		  : "url('./assets/img/questions__halloween-anim.png')",
				"anim1_right"	  : "20vw",
				"anim1_bottom"	  : "10vh",
				"anim2_right"	  : "30vw",
				"anim2_bottom"	  : "40vh",
				"anim3_right"	  : "20vw",
				"anim3_bottom"	  : "70vh",
				"sfx"			  : "./assets/aud/questions__halloween.mp3",
			};
			break;

		case 'newyears': // sprite
			QUESTION_OBJ.question_3 = {
				"label"           : "question_3",
				"action"		  : "sprite",
				"zIndex"		  : "10",
				"sprite_src"	  : "url('./assets/img/questions__newyears.png')",
				"anim_src"		  : "url('./assets/img/questions__newyears-anim.png')",
				"anim1_right"	  : "20vw",
				"anim1_bottom"	  : "10vh",
				"anim2_right"	  : "30vw",
				"anim2_bottom"	  : "40vh",
				"anim3_right"	  : "20vw",
				"anim3_bottom"	  : "70vh",
				"sfx"			  : "./assets/aud/questions__newyears.mp3"
			};
			break;

		// Tier 4
		default:
			console.dir('Question 4 or error occured in QUESTION_EVENTS');
			break;
	}

	QUESTION_EVENT_ACTION(QUESTION_OBJ[tier]); // Fire the event fns to create els and actions
},
// Create new event object
QUESTION_EVENT_ACTION = (object) => {
	let 
	newEl = document.createElement('div'),
	intro = document.querySelector('[data-name="intro"]');

	if (object.action == 'object') {
		/*
		** Create new element, have it race across the page at random speed and Y axis
		*/
		let
		instructions = document.createElement('div');

		newEl.setAttribute('id', 'event_object__' + object.label);
		newEl.classList.add('event_obj');
		newEl.style.backgroundImage = object.backgroundImage;

		newEl.addEventListener('click', OBJ_CLICK); // Event listener to destroy element with POOF

		object.axisGen.bind(this, RANDOM_NUM(10,80), RANDOM_NUM(10,80))();
		newEl.style.left = object.left;
		newEl.style.top  = object.top;

		instructions.classList.add('event_obj-box');
		instructions.innerHTML = `CLICK ME!`;

		newEl.appendChild(instructions);

		intro.appendChild(newEl); // Write to page
		// Need event listeners

		setTimeout(function() {
			if (object.poof == false) {
				object.axisGen.bind(this, RANDOM_NUM(10,80), RANDOM_NUM(10,80))();
				newEl.style.left = object.left;
				newEl.style.top  = object.top;
			}
		}, 750);

			setTimeout(function() {
				if (object.poof == false) {
					object.axisGen.bind(this, RANDOM_NUM(10,80), RANDOM_NUM(10,80))();
					newEl.style.left = object.left;
					newEl.style.top  = object.top;
				}
			}, 1500);

				setTimeout(function() {
					if (object.poof == false) {
						object.axisGen.bind(this, RANDOM_NUM(10,80), RANDOM_NUM(10,80))();
						newEl.style.left = object.left;
						newEl.style.top  = object.top;
					}
				}, 2250);

					setTimeout(function() {
						if (object.poof == false) {
							object.axisGen.bind(this, RANDOM_NUM(10,80), RANDOM_NUM(10,80))();
							newEl.style.left = object.left;
							newEl.style.top  = object.top;
						}
					}, 3000);

		setTimeout(function() {
			if (newEl) {
				newEl.remove();
			}
		}, 4000);

	} else if (object.action == 'flicker') {
		/*
		** Create overlay, flicker color on screen
		*/
		newEl.classList.add('event_overlay'); // default
		newEl.classList.add(object.animationClass); // keyframe

		document.getElementById('sfx_src').src = object.sfx;
		document.querySelector('.sfx').load();
		document.querySelector('.sfx').play();

		if (object.textBox == true) {
			let
			actionBox = document.createElement('div');

			actionBox.classList.add('event_flicker-box');
			actionBox.innerHTML = object.textGen.bind(this, RANDOM_NUM(0,14))();

			newEl.appendChild(actionBox); // Append word box to flicker element
			intro.appendChild(newEl); // Append bg to intro page

			setTimeout(function() {
				actionBox.innerHTML = object.textGen.bind(this, RANDOM_NUM(0,14))();
			}, 1000);

				setTimeout(function() {
					actionBox.innerHTML = object.textGen.bind(this, RANDOM_NUM(0,14))();
				}, 2000);

					setTimeout(function() {
						actionBox.innerHTML = object.textGen.bind(this, RANDOM_NUM(0,14))();
					}, 3000);
		} else {
			intro.appendChild(newEl); // Append bg to intro page
		}

		setTimeout(function() {
			document.querySelector('.event_overlay').remove();
		}, 4000);
	} else if (object.action == 'sprite') {
		/*
		** Create overlay, write sprite to page, write unique animation, 3-5 seconds
		*/
		newEl.classList.add('event_overlay'); // default
		newEl.style.zIndex = object.zIndex; // Over all

		document.getElementById('sfx_src').src = object.sfx;
		document.querySelector('.sfx').load();
		document.querySelector('.sfx').play();

		let
		spriteDiv = document.createElement('div'),
		anim1Div  = document.createElement('div'),
		anim2Div  = document.createElement('div'),
		anim3Div  = document.createElement('div'),
		elArr     = [];

		spriteDiv.classList.add('event_sprite');
		anim1Div.classList.add('event_sprite-anim');
		anim2Div.classList.add('event_sprite-anim');
		anim3Div.classList.add('event_sprite-anim');

		spriteDiv.style.backgroundImage = object.sprite_src;
		anim1Div.style.backgroundImage  = object.anim_src;
		anim1Div.style.right            = object.anim1_right;
		anim1Div.style.bottom           = object.anim1_bottom;
		anim2Div.style.backgroundImage  = object.anim_src;
		anim2Div.style.right 			= object.anim2_right;
		anim2Div.style.bottom 			= object.anim2_bottom;
		anim3Div.style.backgroundImage  = object.anim_src;
		anim3Div.style.right 			= object.anim3_right;
		anim3Div.style.bottom 			= object.anim3_bottom;

		elArr.push(spriteDiv);
		elArr.push(anim1Div);
		elArr.push(anim2Div);
		elArr.push(anim3Div);

		for (let i = 0; i < 4; i++) {
			newEl.appendChild(elArr[i]);
		}

		intro.appendChild(newEl); // Append bg to intro page

		setTimeout(function () {
			document.querySelectorAll('.event_sprite-anim')[0].classList.add('blinking');
		}, 50);

			setTimeout(function () {
				document.querySelectorAll('.event_sprite-anim')[1].classList.add('blinking');
			}, 300);

				setTimeout(function () {
					document.querySelectorAll('.event_sprite-anim')[2].classList.add('blinking');
				}, 550);

		setTimeout(function () {
			document.querySelector('.event_overlay').remove();
		}, 4000);
	} else {
		console.log('QUESTION_EVENT_ACTION default evoked');
		return;
	}
};
