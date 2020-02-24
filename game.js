class Game {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.getElementById( 'container' );
		this.scoreEl = document.getElementById( 'score' );
		this.containerHeight = this.container.offsetHeight;
		this.score = 0;

		const ballEl = this.createBall();
		this.dropBall( ballEl, this.containerHeight, 5 );
	}

	dropBall( ballEl, endPos, speed ) {
		let currentPos = 0;
		const interval = setInterval( () => {

			if ( endPos === currentPos ) {
				clearInterval( interval );
				ballEl.remove();
			} else {
				currentPos++;
				ballEl.style.top = currentPos + 'px';
			}

		}, speed );
	}

	createBall() {
		const ballEl = document.createElement( 'div' );
		const points = this.getRandomNo();

		ballEl.classList.add( 'ball' );
		ballEl.textContent = points.toString();
		ballEl.setAttribute( 'data-points', points );
		ballEl.addEventListener( 'click', ( event ) => this.shootBall( event ) );

		this.container.appendChild( ballEl );

		return ballEl;
	}

	getRandomNo( event ) {
		return Math.floor( ( Math.random() * 10 ) + 1 )
	}

	shootBall( event ) {
		const points = event.target.getAttribute( 'data-points' );
		this.addScore( points );
		event.target.remove();
	}

	addScore( points ) {
		this.score += parseInt( points );
		this.scoreEl.textContent = this.score.toString();
	}
}

new Game();
