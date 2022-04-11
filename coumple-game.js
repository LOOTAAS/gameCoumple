(() => {

  // создаю таймер
  function createTimer(period) {
    let timer = document.createElement('h2')
    timer.classList.add('timer')
    timer.textContent = period

    return timer
  }

  // создаю экран проигрыша / выигрыша
  function createFinalScreen() {
    let screen = document.createElement('div')
    screen.classList.add('final-screen')

    let screenText = document.createElement('h2')
    screenText.classList.add('timer', 'screen-text')
    screenText.textContent = "Вы проиграли"
    // screenText.textContent = finalText;

    let screenBtn = document.createElement('button')
    screenBtn.classList.add('screen-btn')
    screenBtn.textContent = "Начать заново"

    screen.append(screenText);
    screen.append(screenBtn);

    return {
      screen,
      screenText,
      screenBtn,
    }
  }

  // создаем и возвращаем список элементов
  function createCoumpleList() {
    let list = document.createElement("ul");
    list.classList.add('list-group');
    return list;
  }

  // создаем карточки
  function createCoumpleItem() {
    // id = 10
    let item = document.createElement('li');
    item.classList.add('item-group')

    // создаю карточку - передняя часть (с картинкой)
    let cardFront = document.createElement('span');
    cardFront.classList.add('front-face')

    let cardBack = document.createElement('span')
    cardBack.classList.add('back-face', 'img-pic-back')

    item.append(cardFront)
    item.append(cardBack)

    return {
      item,
      cardFront,
      cardBack,
    }

  }

  (function create() {
    document.addEventListener('DOMContentLoaded', createApp = () => {

      const timeInterval = 60;
      let intervalNumber = 0;


      let container = document.getElementById('couple-game')
      let coumpleTimer = createTimer(timeInterval)
      let coumpleList = createCoumpleList()
      let coumpleFinalScreen = createFinalScreen()
      let coumpleItem = createCoumpleItem()

      container.append(coumpleTimer)
      container.append(coumpleList)
      container.append(coumpleFinalScreen.screen)

      // спрашиваю сколько будет карточек у игрока
      let numberOfCards = prompt('Кол-во карточек по вертикали/горизонтали', 4);
      // сравнивую и удваиваю значения из Promt
      if (numberOfCards == null) {
        numberOfCards = 4
      }

      numberOfCards = parseInt(numberOfCards);
      if (numberOfCards == NaN || numberOfCards % 2 == 1 || numberOfCards > 101) {
        numberOfCards = 16
      }
      else {
        numberOfCards *= numberOfCards
      }
      // создаю карточки на поле
      function crateCardArrow() {
        for (let i = 0; i < numberOfCards; ++i) {
          let coumpleItem = createCoumpleItem()
          coumpleItem.cardFront.classList.add(`img-pic-${i}`)
          coumpleItem.item.setAttribute('data-framework', i)
          if (coumpleItem.item.dataset.framework % 2 === 1) {
            coumpleItem.item.setAttribute('data-framework', coumpleItem.item.dataset.framework - 1)
          }
          coumpleList.append(coumpleItem.item)
          coumpleItem.item.addEventListener('click', function () {
          })
        }
      }
      crateCardArrow()

      const cards = document.querySelectorAll('.item-group');

      // Задаю логику сравнеие 1 и 2 кликнутой карточке
      let hasFlippedCard = false;
      let lockBoard = false;
      let firstCard, secondCard;

      function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
          hasFlippedCard = true;
          firstCard = this;
          return;
        }

        secondCard = this;

        checkForMatch();
      }

      function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        isMatch ? disableCards() : unflipCards();
      }

      function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
      }

      function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');

          resetBoard();
        }, 1500);
      }

      function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
      }

      // Перемешиваю карточки по флекс элементам
      function shuffle() {
        cards.forEach(card => {
          let ramdomPos = Math.floor(Math.random() * numberOfCards);
          card.style.order = ramdomPos;
        });
      };
      shuffle()


      function createFinis(textBeforeFinish) {
        let countTimer = document.querySelector('.timer')
        document.querySelector('.final-screen').classList.add("final-screen-open")
        coumpleFinalScreen.screenText.textContent = textBeforeFinish;
        coumpleFinalScreen.screenBtn.addEventListener('click', function () {
          document.querySelector('.final-screen').classList.remove("final-screen-open")
          clearInterval(intervalNumber)
          countTimer.textContent = timeInterval;
          setGame()
          shuffle()
          cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
          });
        });
        cards.forEach(card => {
          card.classList.add('flip');
          card.removeEventListener('click', flipCard);
        });
      }

      // задаю счетчик и поле с кнопкой "Начать заново"

      function setGame() {
        let countTimer = document.querySelector('.timer')
        intervalNumber = setInterval(() => {
          if (countTimer.textContent <= 1) {
            clearInterval(intervalNumber)
            createFinis('Вы проиграли')

          } else {
            // проверяю собраны ли все карточки, запрос происходит только при сборе пары
            for (const i of cards) {
              if (document.getElementsByClassName('flip').length == numberOfCards) {
                document.querySelector('.timer').textContent = 1
                clearInterval(intervalNumber)
                createFinis("Вы Победили!")
              }
            }
          }

          countTimer.textContent -= 1;
        }, 1000);
      };

      setGame()


      cards.forEach(card => card.addEventListener('click', flipCard));


    })
  })()

})()
