import { JustGame } from "./JustGame.js";
import { ContentPage } from "./ContentPage.js";
import { TicTacToe } from "./pages/TicTacToe/ui.js";
import { Hangman } from "./pages/Hangman/ui.js";

customElements.define("just-game", JustGame);
customElements.define("content-page", ContentPage);
customElements.define("tic-tac-toe", TicTacToe);
customElements.define("hangman-page", Hangman);
