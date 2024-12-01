# Final Project

-   [ ] Read the [project requirements](https://vikramsinghmtl.github.io/420-5P6-Game-Programming/project/requirements).
-   [ ] Replace the sample proposal below with the one for your game idea.
-   [ ] Get the proposal greenlit by Vik.
-   [ ] Place any assets in `assets/` and remember to update `src/config.json`.
-   [ ] Decide on a height and width inside `src/globals.js`. The height and width will most likely be determined based on the size of the assets you find.
-   [ ] Start building the individual components of your game, constantly referring to the proposal you wrote to keep yourself on track.
-   [ ] Good luck, you got this!

---

# Sample Proposal - Pokémon the Trading Card Game

> [!note]
> This was taken from a project I did in university so the scope is **much** larger than what I'm expecting from you in terms of number of features!

## ✒️ Description

Welcome to KomíCove, a tranquil yet engaging fishing game set in a picturesque seaside village. In this cozy game, players step into the role of an angler and explore the serene waters of KomíCove to catch a variety of fish, including Common, Rare, and Legendary species. Each successful catch adds to the player’s score, which is essential to surviving the day and progressing to the next. However, the journey isn’t all smooth sailing, as players must reel in fish before they escape and meet daily score thresholds within a time limit to avoid losing. As the days progress, players can unlock upgraded fishing rods that slightly boost the chances of encountering rare and legendary fish, adding a layer of excitement to this otherwise peaceful adventure.

## 🕹️ Gameplay

### Day Progression & Residue Score
At the start of each day, players cast their line and begin fishing to meet the day’s score threshold within a set timer. If the player exceeds the threshold (e.g., scores 80 points when only 50 are required), the leftover score (30 points) carries over to the next day, giving the player a head start.

### Fish Types
Players can encounter three types of fish while exploring the fish-rich waters of KomíCove:
- **Common Fish**: The most abundant and easiest to catch, offering lower score values.
- **Rare Fish**: Moderately challenging with higher score values and lower spawn rates.
- **Legendary Fish**: Exceptionally rare, highly valuable, and most likely to appear with upgraded rods.

### Fishing Mechanics
Once hooked, players must press the `SPACEBAR` repeatedly to reel in fish. Each fish has hitpoints that decrease with every press of the spacebar. If the player stops reeling or takes too long, the fish escapes. 

### Selling Fish
Fish are automatically sold as soon as they are caught, converting them into score points instantly. This ensures players consistently earn points toward meeting the day’s threshold without the risk of forgetting to sell their catch.

### Rod Upgrades
Upon reaching specific score milestones (e.g., 100 points), players are rewarded with upgraded fishing rods for free, without costing or deducting points from their total. These rods improve the chances of encountering Rare and Legendary fish.

### Win/Loss Conditions
- **Win**: Meet or exceed the daily score threshold within the time limit to progress to the next day.
- **Loss**: Fail to meet the score threshold before time runs out, results in a Game Over.

## 📃 Requirements

1. The system shall begin the game in the TitleScreenState.
2. The user shall press Enter to start the game.
3. The system shall transition to the PlayState when the game starts.
4. The system shall initialize the timer and daily score threshold at the start of each day.
5. The system shall generate fish in the fishing area, varying in type and spawn rates (Common, Rare, Legendary).
6. The user shall press a key to cast their fishing line.
7. The system shall transition to the CastingState and display the casting animation.
8. The system shall transition to the FishingIdleState after the casting animation ends.
9. The system shall notify the user when a fish bites the hook.
10. The user shall press the SPACEBAR repeatedly to reel in the fish.
11. The system shall decrease the fish’s hitpoints with each press of the SPACEBAR.
12. The system shall release the fish if the user stops reeling or takes too long to press the SPACEBAR.
13. The system shall transition to the ReelingState when the user starts reeling in a fish.
14. The system shall automatically sell the fish upon being caught, adding its score to the player’s total.
15. The system shall transition to the HoldingState after a fish is caught.
16. The system shall play a successful audio cue in the HoldingState to encourage the player.
17. The system shall check the player’s score when the timer runs out.
18. The system shall transition to the VictoryState if the player meets or exceeds the daily score threshold.
19. The system shall transition to the GameOverState if the player’s score is below the daily threshold when the timer expires.
20. The system shall carry over any leftover score points to the next day if the player exceeds the threshold.
21. The system shall reward the user with an upgraded fishing rod upon reaching specific score milestones.
22. The system shall increase the chances of encountering Rare and Legendary fish when an upgraded rod is used.
23. The system shall transition to the MenuState when selected by the user.
24. The MenuState shall display the player’s statistics, including the number of fish caught.
25. The MenuState shall include an option to view the tutorial, which will display a static page explaining gameplay.
26. The system shall allow the user to restart the game after GameOverState by pressing a key.

### 🤖 State Diagram

> [!note]
> Remember that you'll need diagrams for not only game states but entity states as well.

![State Diagram](./assets/images/StateDiagram.png)

### 🗺️ Class Diagram

![Class Diagram](./assets/images/ClassDiagram.png)

### 🧵 Wireframes

> [!note]
> Your wireframes don't have to be super polished. They can even be black/white and hand drawn. I'm just looking for a rough idea about what you're visualizing.

![Main Menu](./assets/images/Main-Menu.png)

-   _Let's Play_ will navigate to the main game.
-   _Upload Cards_ will navigation to the forms for uploading and parsing the data files for the game.
-   _Change Log_ will navigate the user to a page with a list of features/changes that have been implemented throughout the development of the game.

![Game Board](./assets/images/Game-Board.png)

We want to keep the GUI as simple and clear as possible by having cards with relevant images to act as a way for the user to intuitively navigate the game. We want to implement a layout that would look like as if one were playing a match of the Pokémon Trading Card Game with physical cards in real life. Clicking on any of the cards will reveal that card's details to the player.

### 🎨 Assets

We used [app.diagrams.net](https://app.diagrams.net/) to create the wireframes. Wireframes are the equivalent to the skeleton of a web app since they are used to describe the functionality of the product and the users experience.

We plan on following trends already found in other trading card video games, such as Pokémon Trading Card Game Online, Hearthstone, Magic the Gathering Arena, and Gwent.

The GUI will be kept simple and playful, as to make sure the game is easy to understand what each component does and is, as well as light hearted to keep to the Pokémon theme.

#### 🖼️ Images

-   Most images will be used from the well known community driven wikipedia site, [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Main_Page).
-   Especially their [Trading Card Game section](<https://bulbapedia.bulbagarden.net/wiki/Full_Art_card_(TCG)>).

#### ✏️ Fonts

For fonts, a simple sans-serif like Roboto will look quite nice. It's a font that is legible, light on storage size, and fun to keep with the theme we're going for. We also used a more cartoonish Pokemon font for the title screen.

-   [Pokemon](https://www.dafont.com/pokemon.font)
-   [Roboto](https://fonts.google.com/specimen/Roboto)

#### 🔊 Sounds

All sounds were taken from [freesound.org](https://freesound.org) for the actions pertaining to cards.

-   [Shuffle cards](https://freesound.org/people/VKProduktion/sounds/217502/)
-   [Flip card](https://freesound.org/people/Splashdust/sounds/84322/)

### 📚 References

-   [Pokemon Rulebook](http://assets.pokemon.com/assets/cms2/pdf/trading-card-game/rulebook/xy8-rulebook-en.pdf)
