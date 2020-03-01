class Game {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.getElementById( 'container' );
		this.scoreEl = document.getElementById( 'score' );
		this.missedScoreEl = document.getElementById( 'missed-score' );
		this.shootingAudio = document.getElementById( 'shooting-audio' );
		this.backgroundMusic = document.getElementById( 'background-music' );
		this.missedAudio = document.getElementById( 'lost-audio' );
		this.containerHeight = this.container.offsetHeight;
		this.score = 0;
		this.ballCount = 5;
		this.dropBallSpeed = 5;
		this.missedCount = 0;

		this.backgroundMusic.play();

		for( let i = 0; i < this.ballCount; i++ ) {
			const ballEl = this.createBall();
			const leftPos = this.getRandomNo( 1000 );
			const endPos = this.containerHeight + 50;
			let interVal = this.getRandomNo( 100 ) + ( i * 1000);

			setTimeout( () => {
				this.dropBall( ballEl, leftPos, endPos, this.dropBallSpeed );
			}, interVal );
		}
	}

	dropBall( ballEl, leftPos, endPos, speed ) {
		let currentTop = 0;

		// Set left position.
		ballEl.style.left = leftPos + 'px';
		ballEl.style.backgroundColor = '#' + this.getRandomNo( 1000 );

		const interval = setInterval( () => {

			if ( endPos === currentTop ) {
				clearInterval( interval );
				ballEl.remove();
				this.missedCount += 1;
				this.missedScoreEl.textContent = this.missedCount;
				this.missedAudio.play();

			} else {
				currentTop++;
				ballEl.style.top = currentTop + 'px';
			}

		}, speed );

		ballEl.setAttribute( 'data-interval-id', interval );
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

	/**
	 * Get random number upto the given range.
	 *
	 * @param {int} range Range ( e.g. for 0-99, range will be 100, for 0-999, range will be 1000 )
	 * @return {number}
	 */
	getRandomNo( range ) {
		return Math.floor(Math.random() * range);
	}

	shootBall( event ) {
		const points = event.target.getAttribute( 'data-points' );
		const targetEl = event.target;
		const intervalId = parseInt( targetEl.getAttribute( 'data-interval-id' ) ) ;

		clearInterval( intervalId );

		this.shootingAudio.play();
		this.addScore( points );
		targetEl.remove();
	}

	addScore( points ) {
		this.score += parseInt( points );
		this.scoreEl.textContent = this.score.toString();
	}
}

new Game();
