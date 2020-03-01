class Game {
	constructor() {
		document.body.click();
		this.init();
	}

	init() {
		this.container = document.getElementById( 'container' );
		this.scoreEl = document.getElementById( 'score' );
		this.missedScoreEl = document.getElementById( 'missed-score' );
		this.shootingAudio = new Audio('./sound/shooting.mp3');
		this.missedAudio = new Audio('./sound/missed.mp3');
		this.backgroundMusic = new Audio('./sound/game-background.mp3');
		this.containerHeight = this.container.offsetHeight;
		this.score = 0;
		this.missedCount = 0;
		this.ballCount = 30;
		this.dropBallSpeed = 1;

		this.backgroundMusic.play();

		for( let i = 0; i < this.ballCount; i++  ) {

			const ballEl = this.createBall();
			const leftPos = this.getRandomNo( 1000 );
			const endPos = this.containerHeight + 50;
			let intervalTime = this.getRandomNo( 100 ) + ( i * 1000 );


			const interval = setInterval( () => {
				this.dropBall( ballEl, leftPos, endPos, this.dropBallSpeed );
				clearInterval( interval );
			}, intervalTime )

		}


	}

	createBall() {
		const ballEl = document.createElement( 'div' );
		const points = this.getRandomNo( 100 );

		ballEl.classList.add( 'ball' );
		ballEl.textContent = points.toString();
		ballEl.setAttribute( 'data-points', points );
		ballEl.addEventListener( 'click', ( event ) => this.shootBall( event ) );

		this.container.appendChild( ballEl );

		return ballEl;

	}

	dropBall( ballEl, leftPos, endPos, speed ) {
		let currentTop = 0;

		ballEl.style.left = leftPos + 'px';
		ballEl.style.backgroundColor = '#' + this.getRandomNo( 1000 );

		const interval = setInterval( () => {
			if ( endPos === currentTop ) {
				clearInterval( interval );
				this.missedAudio.play();
				ballEl.remove();
				this.missedCount += 1;
				this.missedScoreEl.textContent = this.missedCount.toString();

			} else {
				currentTop++;
				ballEl.style.top = currentTop + 'px';
			}
		}, speed );

		ballEl.setAttribute( 'data-interval-id', interval );

	}



	shootBall( event ) {

		const targetEl = event.target;
		const points = targetEl.getAttribute( 'data-points' );
		const intervalId = parseInt( targetEl.getAttribute( 'data-interval-id' ) );

		clearInterval( intervalId );

		this.addScore( points );
		this.shootingAudio.play();

		targetEl.remove();
	}

	addScore( points ) {
		this.score += parseInt( points );
		this.scoreEl.textContent = this.score.toString();
	}

	getRandomNo( range ) {
		return Math.floor( Math.random() * range )
	}
}

new Game();
