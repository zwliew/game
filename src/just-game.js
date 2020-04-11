import { JustGame } from './JustGame.js';
import { ContentPage } from './ContentPage';
import { TicTacToe } from './games/TicTacToe';
import { SnakeGame } from './games/SnakeGame';

customElements.define('just-game', JustGame);
customElements.define('content-page', ContentPage);
customElements.define('tic-tac-toe', TicTacToe);
customElements.define('snake-game', SnakeGame);
