class Game {

	/**
	 * Constructor.
	 *
	 * @return {void}
	 */
	constructor() {
		this.init();
		this.startBtnEl.addEventListener( 'click', () => this.startGame() );

	}

	/**
	 * Initialize.
	 *
	 * @return {void}
	 */
	init() {
		this.container = document.getElementById( 'container' );
		this.scoreEl = document.getElementById( 'score' );
		this.missedScoreEl = document.getElementById( 'missed-score' );
		this.shootingAudio = document.getElementById( 'shooting-audio' );
		this.missedAudio = document.getElementById( 'missed-audio' );
		this.backgroundMusic = document.getElementById( 'background-music' );
		this.startBtnEl = document.getElementById( 'start-game' );
		this.containerHeight = this.container.offsetHeight;
		this.score = 0;
		this.missedCount = 0;
		this.ballCount = 1000;
		this.dropBallSpeed = 0.5; // At what speed the balls should drop.
		this.dropBallFrequency = 500; // At what intervals next ball should drop after the previous one.
		this.shootEvent = 'mouseover'; // can choose what you like, for tutorial 'click' is used, but mouseover is better.

	}

	/**
	 * Start game
	 *
	 * @return {void}
	 */
	startGame() {

		this.backgroundMusic.play();
		this.startBtnEl.removeEventListener( 'click', this.startGame );
		this.startBtnEl.remove();

		for( let i = 0; i < this.ballCount; i++  ) {

			const leftPos = this.getRandomNo( 1000 );
			const endPos = this.containerHeight + 50;
			let intervalTime = this.getRandomNo( 100 ) + ( i * this.dropBallFrequency );


			const interval = setInterval( () => {
				const ballEl = this.createBall();
				this.dropBall( ballEl, leftPos, endPos );
				clearInterval( interval );
			}, intervalTime )

		}
	}

	/**
	 * Create ball.
	 *
	 * @return {Object} {HTMLDivElement} ballEl Ball element.
	 */
	createBall() {
		const ballEl = document.createElement( 'div' );
		const points = this.getRandomNo( 100 );

		ballEl.classList.add( 'ball' );
		ballEl.textContent = points.toString();
		ballEl.setAttribute( 'data-points', points );
		ballEl.addEventListener( this.shootEvent, ( event ) => this.shootBall( event ) );

		this.container.appendChild( ballEl );

		return ballEl;

	}

	/**
	 * Drop Ball
	 *
	 * @param {Object} ballEl Ball element.
	 * @param {int} leftPos Left position.
	 * @param {int} endPos End position.
	 *
	 * @return {void}
	 */
	dropBall( ballEl, leftPos, endPos ) {
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
		}, this.dropBallSpeed );

		ballEl.setAttribute( 'data-interval-id', interval );

	}

	/**
	 * Shootball
	 *
	 * @param {Event} event Event.
	 */
	shootBall( event ) {

		const targetEl = event.target;
		const points = targetEl.getAttribute( 'data-points' );
		const intervalId = parseInt( targetEl.getAttribute( 'data-interval-id' ) );

		clearInterval( intervalId );

		this.addScore( points );
		this.shootingAudio.play();

		targetEl.remove();
	}

	/**
	 * Add Score
	 *
	 * @param {int} points Points
	 */
	addScore( points ) {
		this.score += parseInt( points );
		this.scoreEl.textContent = this.score.toString();
	}

	/**
	 * Random no.
	 *
	 * @param {int} range Range.
	 * @return {number} Number
	 */
	getRandomNo( range ) {
		return Math.floor( Math.random() * range )
	}
}

new Game();
