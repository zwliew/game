import { JustGame } from './JustGame.js';
import { ContentPage } from './ContentPage.js';
import { TicTacToe } from './games/TicTacToe.js';
import { SnakeGame } from './games/SnakeGame.js';

customElements.define('just-game', JustGame);
customElements.define('content-page', ContentPage);
customElements.define('tic-tac-toe', TicTacToe);
customElements.define('snake-game', SnakeGame);
