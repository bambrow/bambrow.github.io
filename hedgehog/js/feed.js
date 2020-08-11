
function resizeGame() {
    let canvas = $('.game');
    let width = canvas.width();
    canvas.css({'height': width*1.35 + 'px'});
}

function calculateRoute() {
    let sheep = $('div.sheep');
    let sheepPosition = sheep.position();
    let sheepImg = $('div.sheep div.image');
    let sheepWidth = sheepImg.width();
    let sheepHeight = sheepImg.height();
    let hedgehog = $('div.hedgehog');
    let hedgehogPosition = hedgehog.position();
    let hedgehogImg = $('div.hedgehog div.image');
    let hedgehogWidth = hedgehogImg.width();
    let hedgehogHeight = hedgehogImg.height();
    return {
        'st': sheepPosition.top + sheepHeight * 0.55,
        'sl': sheepPosition.left + sheepWidth * 0.35,
        'et': hedgehogPosition.top + hedgehogHeight * 0.35,
        'el': hedgehogPosition.left + hedgehogWidth * 0.42
    }
}

function swapAnimals() {
    let sheep = $('div.sheep');
    let sheepPosition = sheep.position();
    let sheepPositionTop = sheepPosition.top;
    let sheepPositionLeft = sheepPosition.left;
    let hedgehog = $('div.hedgehog');
    let hedgehogPosition = hedgehog.position();
    let hedgehogPositionTop = hedgehogPosition.top;
    let hedgehogPositionLeft = hedgehogPosition.left;
    let sheepBubble = $('div.sheep div.bubble');
    let hedgehogBubble = $('div.hedgehog div.bubble');
    hedgehogBubble.css({'visibility': 'hidden'});
    sheepBubble.css({'visibility': 'hidden'});
    sheepBubble.text('乾坤大挪移！');
    sheep.animate({'top': hedgehogPositionTop + 'px', 'left': sheepPositionLeft + 'px'}, 100, function () {
        hedgehog.animate({'top': sheepPositionTop + 'px', 'left': hedgehogPositionLeft + 'px'}, 100);
    }).animate({'top': hedgehogPositionTop + 'px', 'left': hedgehogPositionLeft + 'px'}, 100, function () {
        hedgehog.animate({'top': sheepPositionTop+ 'px', 'left': sheepPositionLeft + 'px'}, 100);
    });
    hedgehogBubble.css({'visibility': 'visible'});
    sheepBubble.css({'visibility': 'visible'});
}

function hedgehogPick() {
    const words = [
        '最喜欢吃小点心了！',
        '感谢投喂！',
        '口水都流出来啦！',
        '哼唧！好吃！',
        '会不会变胖呀！',
        '来一起吃小点心吧！',
        '真是人间美味！',
        '不要投喂太快哦！',
        '吱！十分美味！'
    ];
    return words[Math.floor(Math.random() * words.length)];
}

function sheepPick() {
    const words = [
        '快接住小点心！',
        '咩！去吧小点心！',
        '慢慢吃，还有好多！',
        '这可是我亲手做的！',
        '再来一颗！',
        '你一颗，我一颗！',
        '慢点，别噎着了！',
        '我是点心小能手！',
        '精准投喂！'
    ];
    return words[Math.floor(Math.random() * words.length)];
}

function readyDoc() {
    resizeGame();

    let score = 0;
    $('div.number').text(score);

    let audio = document.createElement('audio');
    let audioSelection = ['images/yum1.m4a', 'images/yum2.m4a'];

    $('#sheep').click(function () {
        let sheepClick = $('#sheep');
        sheepClick.css('pointer-events', 'none');

        setTimeout(function() {
            let hedgehog = $('#hedgehog');
            hedgehog.attr('src', 'images/hedgehog2.png');
            $('div.hedgehog div.bubble').text(hedgehogPick());

            let sheep = $('div.sheep div.image');
            let sheepTop = sheep.position().top;
            sheep.css({'top': sheepTop*0.5 + 'px'});
            $('div.sheep div.bubble').text(sheepPick());

            let scoreImage = $('div.score div.image');
            let scoreImageTop = scoreImage.position().top;
            scoreImage.css({'top': scoreImageTop*0.3 + 'px'});

            let food = $('div.food');
            let foodPosition = calculateRoute();
            let foodStartCSS = {'top': foodPosition.st + 'px', 'left': foodPosition.sl + 'px', 'visibility': 'visible'};
            food.css(foodStartCSS);
            let animateCSS = {'top': foodPosition.et + 'px', 'left': foodPosition.el + 'px'};
            food.animate(animateCSS, 200, function () {
                food.css({'visibility': 'hidden'});
            });

            audio.setAttribute('src', audioSelection[Math.floor(Math.random() * audioSelection.length)]);
            audio.play();
            score += 10;
            $('div.number').text(score);

            setTimeout(function() {
                hedgehog.attr('src', 'images/hedgehog1.png');
                sheep.css({'top': sheepTop + 'px'});
                scoreImage.css({'top': scoreImageTop + 'px'});
                if (score % 30 === 0) {
                    swapAnimals();
                }
            }, 300);

            sheepClick.css('pointer-events', 'auto');
        }, 200);
    });
}

$(document).ready(readyDoc);
$(window).resize(resizeGame);
