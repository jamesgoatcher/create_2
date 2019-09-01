let 
playerObj = {
	question_1 : {}, // q_1
	question_2 : {}, // q_2
	question_3 : {}, // q_3
	question_4 : {}, // q_4
	persona    : {}  // persona, final result
};

let 
questionsObj = {
	// Tier 1
	q_1 : {
		tier   : 'question_1', // Question 1 - 4, used with playerObj and DOM elements
		q      : '<div>Action &amp; Adventure</div><div>or Rom-Coms?</div>', // Question - innerHTML
		q_ds   : 'movie', // Question - dataset
		a_1    : '<div>Action &amp;</div><div>Adventure</div>', // Answer 1 - innerHTML
		a_1_ds : 'action', // Answer 1 - dataset
		a_2    : 'Rom-Coms', // Answer 2 - innerHTML
		a_2_ds : 'rom' // Answer 2 - dataset
	},
	// Tier 2
	q_2_a : {
		tier   : 'question_2',
		q      : 'Loud or chill music?',
		q_ds   : 'music',
		a_1    : 'Loud',
		a_1_ds : 'loud',
		a_2    : 'Chill',
		a_2_ds : 'chill'
	},

	q_2_b : {
		tier   : 'question_2',
		q      : 'Cats or dogs?',
		q_ds   : 'pets',
		a_1    : 'Cats',
		a_1_ds : 'cats',
		a_2    : 'Dogs',
		a_2_ds : 'dogs'
	},
	// Tier 3
	q_3_a : {
		tier   : 'question_3',
		q      : 'Pick a vacation',
		q_ds   : 'vacation',
		a_1    : 'Backpacking Europe',
		a_1_ds : 'backpacking',
		a_2    : 'Cabin with friends',
		a_2_ds : 'cabin'
	},

	q_3_b : {
		tier   : 'question_3',
		q      : 'What does your Friday night look like?',
		q_ds   : 'friday',
		a_1    : 'Concert',
		a_1_ds : 'concert',
		a_2    : 'Escape room',
		a_2_ds : 'escape'
	},

	q_3_c : {
		tier   : 'question_3',
		q      : 'What are you doing for dinner?',
		q_ds   : 'dinner',
		a_1    : 'Take out',
		a_1_ds : 'takeout',
		a_2    : 'Going to a restaurant',
		a_2_ds : 'restaurant'
	},

	q_3_d : {
		tier   : 'question_3',
		q      : 'Which holiday do you prefer?',
		q_ds   : 'holiday',
		a_1    : 'Halloween',
		a_1_ds : 'halloween',
		a_2    : 'New Years Eve',
		a_2_ds : 'newyears'
	},
	// Tier 4
	q_4_a : {
		tier   : 'question_4',
		q      : 'Highlight of the trip?',
		q_ds   : 'backpacking_why',
		a_1    : 'Amsterdam',
		a_1_ds : 'amsterdam',
		a_2    : 'Climbing the Swiss Alps',
		a_2_ds : 'alps'
	},

	q_4_b : {
		tier   : 'question_4',
		q      : 'Why a cabin with friends?',
		q_ds   : 'cabin_why',
		a_1    : 'Nature inspires me',
		a_1_ds : 'nature',
		a_2    : 'Good friends, good times',
		a_2_ds : 'friends'
	},

	q_4_c : {
		tier   : 'question_4',
		q      : 'What draws you to the show?',
		q_ds   : 'concert_why',
		a_1    : 'Their work inspires me',
		a_1_ds : 'inspiration',
		a_2    : 'New music - sounds exciting',
		a_2_ds : 'new_music'
	},

	q_4_d : {
		tier   : 'question_4',
		q      : 'What drives you to succeed?',
		q_ds   : 'escape_why',
		a_1    : 'Getting the recognition for myself',
		a_1_ds : 'recognition',
		a_2    : 'Leading the team to victory',
		a_2_ds : 'team_victory'
	},

	q_4_e : {
		tier   : 'question_4',
		q      : 'You ordered too much food - what will you do?',
		q_ds   : 'takeout_why',
		a_1    : 'Offer the extra to my friends',
		a_1_ds : 'friends_leftovers',
		a_2    : 'Binge it all',
		a_2_ds : 'binge'
	},

	q_4_f : {
		tier   : 'question_4',
		q      : 'Why this restaurant?',
		q_ds   : 'restaurant_why',
		a_1    : 'All about the photos',
		a_1_ds : 'photos',
		a_2    : 'All about the experience',
		a_2_ds : 'experience'
	},

	q_4_g : {
		tier   : 'question_4',
		q      : 'What kind of costume?',
		q_ds   : 'halloween_why',
		a_1    : 'Something with a group',
		a_1_ds : 'group',
		a_2    : 'Something hilarious',
		a_2_ds : 'hilarious'
	},

	q_4_h : {
		tier   : 'question_4',
		q      : 'What is your New Years resolution?',
		q_ds   : 'newyears_why',
		a_1    : 'To see the world',
		a_1_ds : 'the_world',
		a_2    : 'To push my creative limits',
		a_2_ds : 'creative_limits'
	},
};

const
QUESTIONS_INIT = () => {
	// init with Question 1, HTML text
	$$('#question_1 .question').innerHTML = questionsObj.q_1.q;
	$$('#question_1 .answer_1').innerHTML = questionsObj.q_1.a_1;
	$$('#question_1 .answer_2').innerHTML = questionsObj.q_1.a_2;
	// Data-sets
	$$('#question_1 .answer_1').dataset.question = questionsObj.q_1.q_ds;
	$$('#question_1 .answer_1').dataset.answer   = questionsObj.q_1.a_1_ds;
	$$('#question_1 .answer_1').dataset.tier     = questionsObj.q_1.tier;
	$$('#question_1 .answer_2').dataset.question = questionsObj.q_1.q_ds;
	$$('#question_1 .answer_2').dataset.answer   = questionsObj.q_1.a_2_ds;
	$$('#question_1 .answer_2').dataset.tier     = questionsObj.q_1.tier;
	// Event Listeners
	$$('#question_1 .answer_1').addEventListener('click', QUESTIONS_SWITCH);
	$$('#question_1 .answer_2').addEventListener('click', QUESTIONS_SWITCH);
},

QUESTIONS_PLAYER_RESPONSES = (tier, question, answer) => {
	playerObj[`${tier}`].q = question;
	playerObj[`${tier}`].a = answer;

	if (playerObj.question_4.a) {
		switch (playerObj.question_4.a) {
			/* REBEL */
			case 'amsterdam':
			case 'recognition':
				playerObj.persona = 'rebel';
				break;
			/* EXPLORER */
			case 'alps':
			case 'new_music':
			case 'experience':
			case 'the_world':
				playerObj.persona = 'explorer';
				break;
			/* CREATOR */
			case 'nature':
			case 'inspiration':
			case 'photos':
			case 'creative_limits':
				playerObj.persona = 'creator';
				break;
			/* HERO */
			case 'friends':
			case 'team_victory':
			case 'friends_leftovers':
			case 'group':
				playerObj.persona = 'hero';
				break;
			/* JESTER */
			case 'binge':
			case 'hilarious':
				playerObj.persona = 'jester';
				break;

			default:
				console.dir('QUESTIONS_PLAYER_RESPONSES switch default');
				break;
		}
	}
},

QUESTIONS_WRITE_TO_DOM = (questionObject) => {
	// HTML
	$$(`#${questionObject.tier} .question`).innerHTML = questionObject.q;
	$$(`#${questionObject.tier} .answer_1`).innerHTML = questionObject.a_1;
	$$(`#${questionObject.tier} .answer_2`).innerHTML = questionObject.a_2;
	// Data-sets
	$$(`#${questionObject.tier} .answer_1`).dataset.question = questionObject.q_ds;
	$$(`#${questionObject.tier} .answer_1`).dataset.answer   = questionObject.a_1_ds;
	$$(`#${questionObject.tier} .answer_1`).dataset.tier     = questionObject.tier;
	$$(`#${questionObject.tier} .answer_2`).dataset.question = questionObject.q_ds;
	$$(`#${questionObject.tier} .answer_2`).dataset.answer   = questionObject.a_2_ds;
	$$(`#${questionObject.tier} .answer_2`).dataset.tier     = questionObject.tier;
	// Event Listeners
	$$(`#${questionObject.tier} .answer_1`).addEventListener('click', QUESTIONS_SWITCH);
	$$(`#${questionObject.tier} .answer_2`).addEventListener('click', QUESTIONS_SWITCH);

	QUESTIONS_BEGIN_TO_END(questionObject.tier); // intro.js fns to move from question to question
},

QUESTIONS_SWITCH = (element) => {
	let
	tier     = element.target.dataset.tier,
	question = element.target.dataset.question,
	answer   = element.target.dataset.answer;

	QUESTIONS_PLAYER_RESPONSES(tier, question, answer); // Logs to playerObj

	if (tier != 'question_4') {
		QUESTION_EVENTS(answer, tier); // Pass the answer to the special events fns
	}

	switch (answer) {
		// Tier 1
		case 'action':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_2_a); // Finds next question object and writes the questions and answers
			break;

		case 'rom':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_2_b);
			break;
		// Tier 2
		case 'loud':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_3_a);
			break;

		case 'chill':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_3_b);
			break;

		case 'cats':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_3_c);
			break;

		case 'dogs':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_3_d);
			break;
		// Tier 3
		case 'backpacking':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_4_a);
			break;

		case 'cabin':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_4_b);
			break;

		case 'concert':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_4_c);
			break;

		case 'escape':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_4_d);
			break;

		case 'takeout':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_4_e);
			break;

		case 'restaurant':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_4_f);
			break;

		case 'halloween':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_4_g);
			break;

		case 'newyears':
			QUESTIONS_WRITE_TO_DOM(questionsObj.q_4_h);
			break;
		// Tier 4
		/* REBEL */
		case 'amsterdam':
		case 'recognition':
			QUESTIONS_END();
			break;
		/* EXPLORER */
		case 'alps':
		case 'new_music':
		case 'experience':
		case 'the_world':
			QUESTIONS_END();
			break;
		/* CREATOR */
		case 'nature':
		case 'inspiration':
		case 'photos':
		case 'creative_limits':
			QUESTIONS_END();
			break;
		/* HERO */
		case 'friends':
		case 'team_victory':
		case 'friends_leftovers':
		case 'group':
			QUESTIONS_END();
			break;
		/* JESTER */
		case 'binge':
		case 'hilarious':
			QUESTIONS_END();
			break;

		default:
			console.dir('QUESTIONS_SWITCH default');
			break;
	}
},

TAXI_FNS = () => {
	$$('.taxi').addClass('toPark');
	$$('.player_sprite').addClass('none', 2500);
	$$('.taxi').addClass('insideCar', 2500);
	$$('.taxi').addClass('toDriveAway', 3000);
},

QUESTIONS_END = () => {
	$$('.questions').addClass('hide'); // Hide questions
	TAXI_FNS(); // Init taxi animation
	$$('.fadeToNight').addClass('toHide', 4750); // Init night fade
	setTimeout(function () { document.getElementsByClassName('page--intro')[0].classList.add('slideOut'); }, 8000); // Slide out frame
	setTimeout(function () { AUDIO_CHANGE(playerObj.persona); }, 8000); // Change to the persona theme song
	$$(`.page--${playerObj.persona}`).addClass('block', 8400); // Slide in persona page
	$$(`.page--${playerObj.persona}`).addClass('show', 8500); // Slide in persona page
	$$(`.page--${playerObj.persona}`).addClass('slideIn', 8600); // Slide in persona page
	setTimeout(function () { document.getElementsByClassName('page--intro')[0].classList.remove('show'); }, 9000); // Hide intro on resize
	setTimeout(function () { 
		PERSONA_SPACEBAR_CONTINUE(playerObj.persona, 1); 
	}, 9500); // Set the space bar fns
}

QUESTIONS_INIT();

