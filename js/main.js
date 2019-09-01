let config;

/*=============================================>>>>>
= Global Variables =
===============================================>>>*/

let audioFiles = {
  'intro'           : './assets/aud/intro.mp3',
  'flicker'         : './assets/aud/flicker.mp3',
  'tutorial'        : './assets/aud/tutorial.mp3',
  'personalization' : './assets/aud/personalization.mp3',
  'game_over'       : './assets/aud/game_over.mp3',
  'rebel'           : './assets/aud/rebel.mp3',
  'explorer'        : './assets/aud/explorer.mp3',
  'creator'         : './assets/aud/creator.mp3',
  'hero'            : './assets/aud/hero.mp3',
  'jester'          : './assets/aud/jester.mp3'
};

/*= End of Global Variables =*/
/*=============================================<<<<<*/

const

/*=============================================>>>>>
= Keeping the game centered and in screen =
===============================================>>>*/

responsify = (el, padding) => {
    let
    contWd = parseInt(window.getComputedStyle(document.querySelector(el)).width),
    contHt = parseInt(window.getComputedStyle(document.querySelector(el)).height),
    contRt = contWd / contHt,
    winWd = window.innerWidth,
    winHt = window.innerHeight,
    winRt = winWd / winHt;
    
    if (contRt > winRt) {
        if ((contWd + (padding * 2)) > winWd) {
            document.querySelector(el).style.transform = `translate(-50%, -50%) scale(${winWd / (contWd + (padding * 2))})`;
        } else {
            document.querySelector(el).style.transform = 'translate(-50%, -50%)';
        }
    } else {
        if ((contHt + (padding * 2)) > winHt) {
            document.querySelector(el).style.transform = `translate(-50%, -50%) scale(${winHt / (contHt + (padding * 2))})`;
        } else {
            document.querySelector(el).style.transform = 'translate(-50%, -50%)';
        }
    }
},

/*= End of Keeping the game centered and in screen =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
= Global Event Handlers =
===============================================>>>>>*/

// Audio element source function
AUDIO_CHANGE = (song) => {
  $$('.audio').volume = 0.33;
  $$('.audio').pause();
  $$('#audio_src').src = audioFiles[song];
  $$('.audio').load();
  $$('.audio').play();
},

// Refresh page
HEADER_RESTART = () => {
  window.location.reload();
},

// Toggle sound on/off
HEADER_SOUND_TOGGLE = () => {
  let
  soundToggleEls = Array.from(document.querySelectorAll('.header__sound'));

  if ($$('.audio').muted != true) {
    $$('.audio').muted = true;

    for (let el in soundToggleEls) {
      soundToggleEls[el].innerHTML = 'Sound Off';
    }
  } else {
    $$('.audio').muted = false;

    for (let el in soundToggleEls) {
      soundToggleEls[el].innerHTML = 'Sound On';
    }
  }
},

// Persona Menu
HEADER_MENU = () => {
  let
  count = 0,
  thisPageMenu = document.querySelector(`.page--${playerObj.persona}`).children[1]; // <div class="menu">...</div>

  thisPageMenu.classList.remove('hide'); // Show the menu

  let handler = () => {
    thisPageMenu.classList.add('hide');

    for (let i = 0; i < thisPageMenu.children.length; i++) {
      thisPageMenu.children[i].classList.remove('active');
      thisPageMenu.children[i].removeEventListener('click', handler);
    }
  };

  // Show the menu items, animated
  for (let i = 0; i < thisPageMenu.children.length; i++) {
    thisPageMenu.children[i].addEventListener('click', handler); // Event listeners to each line

    setTimeout(function () { // Animate with 250ms delay
      thisPageMenu.children[i].classList.add('active');
    }, count);

    count += 250;
  }
},

// Persona menu items
MENU_LINE_CLICKS = (event) => {
  let
  selectedFrame = parseInt(event.target.dataset.menuframe);

  HEADER_ARROWS(null, selectedFrame);
},

// Check Arrows for Frame
HEADER_ARROW_VISIBLE = (persona, frame) => {
  let
  arrowLeft  = document.querySelector(`.page--${persona}`).children[0].children[3], // Persona page > Header > Arrow L
  arrowRight = document.querySelector(`.page--${persona}`).children[0].children[4]; // Persona page > Header > Arrow R
console.log(frame);
  if (frame == 2 || frame == 3) {
    arrowLeft.classList.remove('hide');
    arrowRight.classList.remove('hide');
  } else if (frame == 1) {
    arrowLeft.classList.add('hide');
    arrowRight.classList.remove('hide');
  } else if (frame == 4) {
    arrowRight.classList.add('hide');
    arrowLeft.classList.remove('hide');
  }
},

// Persona arrows move fns
HEADER_ARROWS = (arrow, optFrame) => {
  let 
  els = document.querySelectorAll(`[data-persona="${playerObj.persona}"]`), // Get elements
  thisFrame,
  destinationFrame = document.querySelector(`[data-persona="${playerObj.persona}"][data-frame="${optFrame}"]`), // Go to this frame
  currentFrame; // You are on this frame

  for (let i = 0; i < els.length; i++) { // Loop over all persona elements
    // Arrows clicked fns
    if (arrow != null && !optFrame) {
      if (els[i].classList.contains('active')) { // Is it active?
        if (arrow.target.dataset.arrow == 'left') { // Are you clicking the left arrow?
          thisFrame = (parseInt(els[i].dataset.frame) - 1); // Frame previous
          els[i].classList.remove('active'); // Remove active from current
          setTimeout(function() {
            els[i].classList.remove('opac'); // Remove opacity from current
            els[i-1].classList.remove('out'); // Remove out to previous
            els[i-1].classList.remove('hide'); // Remove out to previous
            els[i-1].classList.add('opac'); // Add opacity to previous
            els[i-1].classList.add('active'); // Add Active to previous
            els[i].classList.add('hide'); // Remove active from current
            HEADER_ARROW_VISIBLE(playerObj.persona, thisFrame); // Check if arrows need to be added/removed
            PERSONA_SPACEBAR_CONTINUE(playerObj.persona, thisFrame, true); // Space bar fns
          }, 500);
        } else if (arrow.target.dataset.arrow == 'right') { // Are you clicking the right arrow?
          thisFrame = (parseInt(els[i].dataset.frame) + 1); // Frame next
          els[i].classList.remove('active'); // Remove active from current
          els[i].classList.add('out'); // Add out to current
          setTimeout(function() {
            els[i+1].classList.remove('hide'); // Add Active to next
            els[i+1].classList.add('opac'); // Add opacity to next
            els[i+1].classList.add('active'); // Add Active to next
            HEADER_ARROW_VISIBLE(playerObj.persona, thisFrame); // Check if arrows need to be added/removed
            PERSONA_SPACEBAR_CONTINUE(playerObj.persona, thisFrame, true); // Space bar fns
            els[i].classList.add('hide'); // Add out to current
          }, 500);
        }
      }
    } else {
      // Menu clicked fns
      if (els[i].classList.contains('active')) { // Frame that is active
        currentFrame = els[i]; // Current frame is whatever has 'active' class
      }

      if (optFrame > i) { // If destination is past the current then move current to 'out'
        els[i].classList.remove('active');
        els[i].classList.add('out');
        els[i].classList.add('hide');
      } else { // If destination is less than the current then remove active and leave the rest where they are
        els[i].classList.remove('out');
        els[i].classList.remove('active');
        els[i].classList.add('hide');
      }

      destinationFrame.classList.remove('hide'); // Show it
      destinationFrame.classList.remove('out'); // If it has the 'out' class, remove it
      destinationFrame.classList.add('active'); // Make the destination active
    }
  }

  if (arrow == null && optFrame) { console.log(destinationFrame.dataset.frame);
    HEADER_ARROW_VISIBLE(playerObj.persona, parseInt(destinationFrame.dataset.frame)); // Check if arrows need to be added/removed
    PERSONA_SPACEBAR_CONTINUE(playerObj.persona, parseInt(destinationFrame.dataset.frame), true); // Space bar fns
  }
},

// Persona frame bgs
PERSONA_FRAME_BG = () => {
  let 
  el = Array.from(document.querySelectorAll('[data-persona]')); // NodeList of frame pages

  for (let i = 0; i < el.length; i++) {
    el[i].style.backgroundImage = `url("./assets/img/${el[i].dataset.persona}__bg-${el[i].dataset.frame}.png")`; // Pass that stool
  }
},

// Persona content
POPULATE_PERSONA_CONTENT = () => {
  let 
  prompt  = Array.from(document.querySelectorAll('[data-scene]')), // Prompt elements
  content = Array.from(document.querySelectorAll('[data-content]')); // Content elements

  // Prompts
  for (let i = 0; i < prompt.length; i++) {
    let 
    persona = prompt[i].dataset.scene.split('&')[0], // Get persona for persona_data.json
    scene_n = prompt[i].dataset.scene.split('&')[1]; // Get scene for persona_data.json

    prompt[i].innerHTML = persona_data.content_persona[persona].scenes[scene_n]; // Pass that stool
  }

  // Content
  for (let i = 0; i < content.length; i++) {
    let
    persona = content[i].dataset.content.split('&')[0], // Get persona
    item    = content[i].dataset.content.split('&')[1]; // Get content item

    switch (item) {
      case 'article':
        content[i].innerHTML = `
          <div class="${persona}__article-cont">
            <img class="${persona}__article-img" src="${persona_data.content_global.article.image_src}" />
            <div class="${persona}__article-header">${persona_data.content_global.article.header}</div>
            <div class="${persona}__article-subheader">${persona_data.content_global.article.subheader}</div>
            <div class="${persona}__article-body">${persona_data.content_global.article.body}</div>
          </div>
          `;
        break;

      case 'fyi':
        content[i].innerHTML = `<div class="${persona}__fyi-vidCont"><video class="${persona}__fyi-vid" controls><source class="${persona}__fyi-src" src="${persona_data.content_global.fyi.video_src}" /></video></div>`;
        document.querySelector(`.${persona}__fyi-vid`).addEventListener('play', function () {
          if ($$('.audio').muted != true) {
            HEADER_SOUND_TOGGLE();  
          } else {
            return;
          }
        });
        document.querySelector(`.${persona}__fyi-vid`).addEventListener('pause', function () {
          if ($$('.audio').muted == true) {
            HEADER_SOUND_TOGGLE();  
          } else {
            return;
          }
        });
        break;

      case 'adlabs':
        POPULATE_PERSONA_ADLABS(content[i], persona);
        break;

      case 'powerpoint':
        content[i].innerHTML = `<iframe class="${persona}__powerpoint-iframe" src="${persona_data.content_global.powerpoint.content}"></iframe>`;
        break;
    }
  }
},

// Encapsulated function to populate the Adlabs content of the persona
POPULATE_PERSONA_ADLABS = (el, persona) => {
  el.innerHTML = `
    <div class="${persona}__adlabs-cont">
      <div class="${persona}__adlabs_header">${persona_data.content_global.adlabs.header}</div>
      <div id="${persona}__adlabs-characters" class="${persona}__adlabs_characters">
        <div class="thumbs active" style="background-image: url('${persona_data.content_global.adlabs.characters[0].thumb}');" data-xalkey="0"></div>
        <div class="thumbs" style="background-image: url('${persona_data.content_global.adlabs.characters[1].thumb}');" data-xalkey="1"></div>
        <div class="thumbs" style="background-image: url('${persona_data.content_global.adlabs.characters[2].thumb}');" data-xalkey="2"></div>
        <div class="thumbs" style="background-image: url('${persona_data.content_global.adlabs.characters[3].thumb}');" data-xalkey="3"></div>
        <div class="thumbs" style="background-image: url('${persona_data.content_global.adlabs.characters[4].thumb}');" data-xalkey="4"></div>
        <div class="thumbs" style="background-image: url('${persona_data.content_global.adlabs.characters[5].thumb}');" data-xalkey="5"></div>
        <div class="thumbs" style="background-image: url('${persona_data.content_global.adlabs.characters[6].thumb}');" data-xalkey="6"></div>
        <div class="thumbs" style="background-image: url('${persona_data.content_global.adlabs.characters[7].thumb}');" data-xalkey="7"></div>
      </div>
      <div class="${persona}__adlabs_menu">
        <div class="role" data-xalrole="producer">Producers</div>
        <div class="role" data-xalrole="developer">Developers</div>
        <div class="role" data-xalrole="designer">Designers</div>
      </div>
      <div class="${persona}__adlabs_selected">
        <div id="${persona}__adlabs-character" class="character" style="background-image: url('${persona_data.content_global.adlabs.characters[0].thumb}');"></div>
        <div id="${persona}__adlabs-info" class="info">
          <div class="name">${persona_data.content_global.adlabs.characters[0].name}</div>
          <div class="alias">Alias: ${persona_data.content_global.adlabs.characters[0].info.alias}</div>
          <div class="role">Title: ${persona_data.content_global.adlabs.characters[0].info.title}</div>
          <div class="personality">Personality: ${persona_data.content_global.adlabs.characters[0].info.personality}</div>
          <div class="super_power">Skill: ${persona_data.content_global.adlabs.characters[0].info.super_power}</div>
        </div>
      </div>
    </div>
  `;
},

// Persona AdLabs functionality
PERSONA_ADLABS_FUNCTIONALITY = (e) => {
  let
  el = e.target,
  data = e.target.dataset;

  if (data['xalkey']) {
    let
    character = data['xalkey'];

    $$(`#${playerObj.persona}__adlabs-character`).style.backgroundImage = 'url("./assets/img/content__adlabs_headshot-' + character + '.png")';

    $$(`#${playerObj.persona}__adlabs-info`).innerHTML = `
      <div class="name">${persona_data.content_global.adlabs.characters[character].name}</div>
      <div class="alias">Alias: ${persona_data.content_global.adlabs.characters[character].info.alias}</div>
      <div class="role">Title: ${persona_data.content_global.adlabs.characters[character].info.title}</div>
      <div class="personality">Personality: ${persona_data.content_global.adlabs.characters[character].info.personality}</div>
      <div class="super_power">Skill: ${persona_data.content_global.adlabs.characters[character].info.super_power}</div>
    `;

    for (let i = 0; i < Array.from(document.querySelectorAll('[data-xalkey]')).length; i++) { // Add / Remove active class from team
      if (Array.from(document.querySelectorAll('[data-xalkey]'))[i].dataset.xalkey != character) {
        Array.from(document.querySelectorAll('[data-xalkey]'))[i].classList.remove('active');
        if (document.getElementById(`${playerObj.persona}__jgo`)) {
          document.getElementById(`${playerObj.persona}__jgo`).classList.remove('active');
        }
      } else {
        el.classList.add('active');
      }
    }
  } else if (data['xalrole']) {
    let
    role = data['xalrole'],
    dest = document.querySelector(`#${playerObj.persona}__adlabs-characters`);

    dest.innerHTML = '';
    dest.style.alignItems = 'flex-start';

    for (let i = 0; i < persona_data.content_global.adlabs.characters.length; i++) {
      if (persona_data.content_global.adlabs.characters[i].role == role) { // Show only role selected
        dest.innerHTML += `<div class="thumbs" style="background-image: url('${persona_data.content_global.adlabs.characters[i].thumb}');" data-xalkey="${i}" onclick="PERSONA_ADLABS_FUNCTIONALITY(event)"></div>`;
      }
    }

    if (role == 'developer') {
      dest.innerHTML += `<div id="${playerObj.persona}__jgo" class="thumbs" style="background-image: url('${persona_data.content_global.adlabs.secret.thumb}');" data-xalsecret="jgo" onclick="PERSONA_ADLABS_FUNCTIONALITY(event)"></div>`;      
    }
  } else if (data['xalsecret']) {
    $$(`#${playerObj.persona}__adlabs-character`).style.backgroundImage = 'url("./assets/img/content__adlabs_jgo.jpg")';

    $$(`#${playerObj.persona}__adlabs-info`).innerHTML = `
      <div class="name">${persona_data.content_global.adlabs.secret.name}</div>
      <div class="alias">Tenure: ${persona_data.content_global.adlabs.secret.info.tenure}</div>
      <div class="role">Title: ${persona_data.content_global.adlabs.secret.info.title}</div>
      <div class="personality">Personality: ${persona_data.content_global.adlabs.secret.info.personality}</div>
      <div class="super_power">Skill: ${persona_data.content_global.adlabs.secret.info.super_power}</div>
    `;

    for (let i = 0; i < Array.from(document.querySelectorAll('[data-xalkey]')).length; i++) { // Add / Remove active class from team
      document.querySelectorAll('[data-xalkey]')[i].classList.remove('active');
      document.getElementById(`${playerObj.persona}__jgo`).classList.add('active');
    }
  }
},

// Persona space bar prompt movement
PERSONA_SPACEBAR_CONTINUE = (passedPersona, currentFrame, arrowBoolean) => {
  let 
  boolObj = persona_data.content_persona[passedPersona].booleans; // Init current frame true, others false

  // Resets bools if arrows clicked
  for (let bool in boolObj) {
    if (bool == `frame_${currentFrame}`) {
      persona_data.content_persona[passedPersona].booleans[`frame_${currentFrame}`] = true;
    } else {
      persona_data.content_persona[passedPersona].booleans[`${bool}`] = false;
    }
  }

  let
  el = Array.from(document.querySelectorAll(`[data-persona="${passedPersona}"]`)), // NodeList of specific frames within the correct persona
  frameBoolean = persona_data.content_persona[passedPersona].booleans[`frame_${currentFrame}`], // Current frame boolean
  currentFrameArr = parseInt(currentFrame)-1; // Redefine for array

  // Main fns
  if (currentFrame < 5) { // Make sure frame exists
    if (frameBoolean == true) { // Is the frame confirmed true?
      for (let i = 0; i < 3; i++) { // Prompt + content + prompt = 3
        let
        thisPrompt = i, // Save out the iteration
        promptNum = el[currentFrameArr].children[i]; // Prompt 1, 2, or 3 (array[0, 1, 2])

        // Reset prompt shows if arrows clicked
        if (arrowBoolean == true) {
          if (thisPrompt == 0) {
            promptNum.classList.add('show'); // First node is reset to show
          } else {
            promptNum.classList.remove('show'); // Other nodes have show removed
          }
          el[currentFrameArr].lastElementChild.innerHTML = 'Press space bar to continue'; // Change instruction text
        }

        // Find the prompt that is active
        if (promptNum.classList.contains('show')) {
          if (i == 2) { // Last prompt changes text and removes keyup
            document.body.onkeyup = null; // Reset global keyup
            if (currentFrame == 4) {
              document.body.onkeyup = function (e) {
                if (e.keyCode == 32 || e.keyCode == 13) { // Space or Enter
                  GAME_OVER(playerObj.persona); // End game 
                }
              }
            } else {
              el[currentFrameArr].lastElementChild.innerHTML = 'Click arrow to continue'; // Change instruction text
            }
          } else {
            document.body.onkeyup = function (e) {
              if (e.keyCode == 32 || e.keyCode == 13) { // Space or Enter
                let
                thisEl = el[currentFrameArr].children[thisPrompt],
                nextEl = el[currentFrameArr].children[thisPrompt+1];
                thisEl.classList.remove('show'); // Hide current
                nextEl.classList.add('show'); // Show next
                PERSONA_SPACEBAR_CONTINUE(passedPersona, currentFrame); // Recursively call self
              }
            }
          }
        }
      }
    }
  }
},

// Game over fns
GAME_OVER = (persona) => {
  let
  head    = document.querySelector(`[data-name="${persona}"]`).firstElementChild; // persona_page > header
  el      = document.querySelector(`[data-container="${persona}"]`).lastElementChild, // persona_page > container > game_over
  page    = document.querySelector(`[data-persona="${persona}"][data-frame="4"]`), // persona_page > container > frame 4
  restart = document.createElement('div'); // New Restart el

  AUDIO_CHANGE('game_over'); // Game over music

  el.classList.remove('hide'); // Show game_over
  head.children[3].classList.add('hide'); // Remove arrow
  head.firstElementChild.classList.add('hide'); // Remove header__menu
  page.lastElementChild.classList.remove('blink'); // Remove final page's blink class cause it's annoying

  // Create and place new Restart
  restart.setAttribute('class', 'header__restart');
  restart.classList.add('h3');
  restart.innerHTML = 'Restart';
  restart.addEventListener('click', HEADER_RESTART);
  head.appendChild(restart);

  document.body.onkeyup = null; // Remove keyup
  TOASTY(RANDOM_NUM(4,5));
},

// Curtain
curtainHandler = () => {
  switch (true) {
    case (innerWidth < 1020):
      $$('.curtain__copy').innerHTML = 'Please use a larger browser window to view this site.  Full screen (laptop) is recommended.';
      $$('.curtain').css('display', 'block');
    break;

    case (innerWidth > 1920):
      $$('.curtain__copy').innerHTML = 'Please use a smaller browser window to view this site.  Full screen (laptop) is recommended.';
      $$('.curtain').css('display', 'block');
    break;

    case (innerHeight < 600):
      $$('.curtain__copy').innerHTML = 'Please use a larger browser window to view this site.  Full screen (laptop) is recommended.';
      $$('.curtain').css('display', 'block');
    break;

    case (innerHeight > 900):
      $$('.curtain__copy').innerHTML = 'Please use a smaller browser window to view this site.  Full screen (laptop) is recommended.';
      $$('.curtain').css('display', 'block');
    break;

    case isBrowser('chrome'):
    case isBrowser('firefox'):
    case isBrowser('safari'):
    case isBrowser('ios'):
      $$('.curtain').css('display', 'none');
    break;

    default:
        $$('.curtain__copy').innerHTML = 'Please use a modern browser to view this site';
        $$('.curtain').css('display', 'block');
    break;
  }
},

resizeHandler = (e) => {
  curtainHandler();
},


/*= End of Global Event Handlers =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
= Page Generation =
===============================================>>>>>*/

loadIncludes = () => {
  let incs = Array.from(document.querySelectorAll('*[data-include-src]'));

  for (let inc of incs) {
    $$.ajax({
      url: inc.dataset.includeSrc
    }, (html) => {
      let
      el = inc.dataset.includeTag ? document.createElement(inc.dataset.includeTag) : document.createElement('div'),
      i = 1,
      scripts;

      el.innerHTML = html;
      el.classList = inc.classList;

      if (inc.dataset.includeVars) {
        try {
          let
          script = document.createElement('script'),
          vars = JSON.parse(inc.dataset.includeVars),
          content = '';

          for (let variable in vars) {
            content += `let ${variable} = ${vars[variable]};`;
          }

          script.innerHTML = content;

          el.insertBefore(script, el.children[0]);
        } catch (e) {
          console.error(e.message);
        }
      }

      scripts = Array.from(el.querySelectorAll('script'))
      for (let script of scripts) {
          setTimeout(() => {
            try {
              eval(script.innerHTML);
            } catch (e) {
              throw e.message;
            }
          }, (100 * i));
          ++i;
      }

      inc.parentNode.insertBefore(el, inc);
      inc.parentNode.removeChild(inc);
    })
  }
},

loadPage = (pageName, numPages) => {
  let
  div = document.createElement('div'),
  page = config.pages[pageName];

  div.classList.add('page');
  div.classList.add(`page--${pageName}`);

  div.style.zIndex = page.data.order;

  for (let dataProp in page.data) {
    div.dataset[dataProp] = page.data[dataProp];
  }

  $$.ajax({
    url: page.html
  }, (html) => {
    div.innerHTML = html;
    $$('.container').appendChild(div);

    ++numPages.loaded;
    if (numPages.loaded == Object.keys(config.pages).length) {
      loadIncludes();
      resizeHandler();

      // this is effing ridiculous but forces scroll to top on page reload
      // no timeout = no scroll
      // no value for timeout delay = no scroll
      // why the fuck is this like this
      setTimeout(() => { scrollTo(0, 0); }, 100);
    }
  });
},

writeAssetsToPage = () => {
  const assets = [];
  for (const page in config.pages) {
    assets.push(...config.pages[page].styles);
    assets.push(...config.pages[page].scripts);
  }

  for (const asset of assets) {
    const ext = asset.split('.').pop();

    switch (ext) {
      case 'css':
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = asset;

        $$('.styles').appendChild(link);
      break;

      case 'js':
        const script = document.createElement('script');
        script.src = asset;
        script.defer = true;

        $$('.scripts').appendChild(script);
      break;

      default:
        $$.log('not a stylsheet or script');
      break;
    }
  }
},

generatePages = () => {
  const
  numPages = {},
  sortedPageNames = Object.keys(config.pages)
    .sort( (a, b) =>
      config.pages[a].data.order > config.pages[b].data.order ? 1 : config.pages[a].data.order < config.pages[b].data.order ? -1 : 0
    );

  numPages.loaded = 0;

  for (let sp of sortedPageNames) {
    loadPage(sp, numPages);
  }

  writeAssetsToPage();
},


/*= End of Page Generation =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
= Initialization =
===============================================>>>>>*/

initFns = () => {
  $$('body').dataset.loading = false;
  document.querySelector('.loading_page_div').remove(); // Remove the loading screen and anim
  generatePages();
},


/*= End of Initialization =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
= Page Generation and Load =
===============================================>>>>>*/

loadAsset = (url, loadDiv, evt) => {
  const file = new Image();

  file.src = url;

  file.onload = () => {
    evt.detail.url = url;
    loadDiv.dispatchEvent(evt);
  };

  file.onerror = () => {
    evt.detail.url = url;
    loadDiv.dispatchEvent(evt);
  };
},

loadingPage = () => {
  let
  div = document.createElement('div'),
  bod = document.querySelector('body');

  div.classList.add('loading_page_div');

  div.innerHTML = '<div class="pacman"><span></span></div>';

  bod.appendChild(div);
},

preloadAssets = () => {
  loadingPage();

  const
  preloadEvent = new CustomEvent('preload_event', {detail: {url: null}}),
  loadDiv = document.createElement('div');

  let
  numAssets = 0,
  assetsLoaded = 0;

  for (let pg in config.pages) {
    numAssets += config.pages[pg].styles.length + config.pages[pg].scripts.length + config.pages[pg].assets.length;
  }

  for (let page in config.pages) {
    for (let ss of config.pages[page].styles) {
      loadAsset(ss, loadDiv, preloadEvent);
    }

    for (let js of config.pages[page].scripts) {
      loadAsset(js, loadDiv, preloadEvent);
    }

    for (let asset of config.pages[page].assets) {
      loadAsset(asset, loadDiv, preloadEvent);
    }
  }

  loadDiv.addEventListener('preload_event', (e) => {
    ++assetsLoaded;
    $$.log(`${assetsLoaded} / ${numAssets}: ${e.detail.url}`);
    if (numAssets == assetsLoaded) initFns();
  });
};


/*= End of Page Generation and Load =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
= Initializer and Global Event Listeners =
===============================================>>>>>*/

$$.ajax({
  type: 'json',
  url: './js/config.json'
}, (json) => {
  config = json; // global

  preloadAssets();
  curtainHandler();
  responsify('.container', 0);

  addEventListener('resize', resizeHandler);
  addEventListener('resize', curtainHandler);
  window.onresize = responsify.bind(this, '.container', 0);

});


/*= End of Initializer and Global Event Listeners =*/
/*=============================================<<<<<*/

