# Final Project

-   [ ] Read the [project requirements](https://vikramsinghmtl.github.io/420-5P6-Game-Programming/project/requirements).
-   [ ] Replace the sample proposal below with the one for your game idea.
-   [ ] Get the proposal greenlit by Vik.
-   [ ] Place any assets in `assets/` and remember to update `src/config.json`.
-   [ ] Decide on a height and width inside `src/globals.js`. The height and width will most likely be determined based on the size of the assets you find.
-   [ ] Start building the individual components of your game, constantly referring to the proposal you wrote to keep yourself on track.
-   [ ] Good luck, you got this!

---

# KomíCove ˖𓍢ִִ໋🦈

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
6. The system shall transition to the PlayerWalkingState, allowing the user to walk and find a fishing spot.
7. The system shall restrict the player's movement to accessible areas, such as the dock or shoreline, preventing the player from walking into the water or parts of the map not intended for gameplay.
8. The system shall allow the user to cast their fishing line from any position near a body of water.
9. The user shall press a key to cast their fishing line.
10. The system shall transition to the CastingState and display the casting animation.
11. The system shall transition to the FishingIdleState after the casting animation ends.
12. The system shall notify the user when a fish bites the hook.
13. The user shall press the SPACEBAR repeatedly to reel in the fish.
14. The system shall decrease the fish's hitpoints with each press of the SPACEBAR.
15. The system shall release the fish if the user stops reeling or takes too long to press the SPACEBAR.
16. The system shall transition to the ReelingState when the user starts reeling in a fish.
17. The system shall automatically sell the fish upon being caught, adding its score to the player's total.
18. The system shall transition to the HoldingState after a fish is caught.
19. The system shall play a successful audio cue in the HoldingState to encourage the player.
20. The system shall check the player's score when the timer runs out.
21. The system shall transition to the VictoryState if the player meets or exceeds the daily score threshold.
22. The system shall transition to the GameOverState if the player's score is below the daily threshold when the timer expires.
23. The system shall carry over any leftover score points to the next day if the player exceeds the threshold.
24. The system shall reward the user with an upgraded fishing rod upon reaching specific score milestones.
25. The system shall increase the chances of encountering Rare and Legendary fish when an upgraded rod is used.
26. The system shall transition to the MenuState when selected by the user.
27. The MenuState shall display the player's statistics, including the number of fish caught.
28. The MenuState shall include an option to view the tutorial, which will display a static page explaining gameplay.
29. The system shall allow the user to restart the game after GameOverState by pressing a key.

### 🤖 State Diagram

```mermaid
stateDiagram-v2

    title : TitleScreenState
    play : PlayState
    menu : MenuState
    state dayEnd <<choice>>
    victory: VictoryState
    gameOver: GameOverState

    [*] --> title
    title --> play : Press enter
    play --> menu : Press key
    menu --> play : Press key
    play --> dayEnd
    dayEnd --> victory : if score meets the threshold
    victory --> play : Press enter
    dayEnd --> gameOver : if score is less than the threshold
    gameOver --> title : Play again
```

```mermaid
stateDiagram-v2

    idle: PlayerIdleState
    walk: PlayerWalkingState
    cast: PlayerCastingState
    fishIdle: PlayerFishingIdleState
    state fishOnHook <<choice>>
    reel: PlayerReelingState
    hold: PlayerHoldingState

    [*] --> idle
    idle --> walk : Movement keys
    walk --> idle : Nothing pressed
    idle --> cast : Press key
    cast --> fishIdle : Animation finishes
    fishIdle --> reel : Fish bites the hook
    reel --> fishOnHook
    fishOnHook --> idle : if fish escapes
    fishOnHook --> hold : if fish is caught
    hold --> idle : Animation finishes
```

### 🗺️ Class Diagram

```mermaid
classDiagram

    class State
    State : enter()
    State : exit()
    State : update(dt)
    State : render()

    class PlayState
    PlayState : spawnFish()
    PlayState --|> State

    class VictoryState
    VictoryState --|> State

    class GameOverState
    GameOverState --|> State

    class Popup
    Popup : message
    Popup : image
    Popup : update(dt)
    Popup : render()
    Popup "1..*" --> PlayState

    class Player
    Player : stateMachine
    Player : initializeStateMachine()
    Player : update(dt)
    Player : render()
    Player "1" --> PlayState
    Player "1" --> VictoryState

    class Day
    Day : count
    Day : update(dt)
    Day : next()
    Day : calculateThreshold()

    Day "1" --> PlayState
    Day "1" --> VictoryState
    Day "1" --> GameOverState

    class Tile
    Tile : sprites
    Tile : id
    Tile : render(x, y)

    class Layer
    Layer : width
    Layer : height
    Layer : render(x, y)
    Layer : isTileWater(x, y)
    Layer : generateTiles(layerData, sprites)

    Tile "1..*" --> Layer

    class Map
    Map : update(dt)
    Map : render()

    Layer "*" --> Map
    Player "1" --> Map
    Map "1" --> PlayState

    class Fish
    Fish : rarity
    Fish : spawnChance
    Fish : hitpoints
    Fish : update(dt)
    Fish : struggle(dt)
    Fish : hit(damage)
    Fish : isCaptured() bool
    Fish : calculateWorth() int
    Fish "1" --> Player

    class CommonFish
    CommonFish : struggle(dt)
    CommonFish --|> Fish

    class RareFish
    RareFish : struggle(dt)
    RareFish --|> Fish

    class LegendaryFish
    LegendaryFish : struggle(dt)
    LegendaryFish --|> Fish

    class FishingPole
    FishingPole : luck
    FishingPole : efficiency
    FishingPole : calculateDamage()

    Player "1" --> FishingPole

    class FishFactory
    FishFactory : createInstance(type)$ Fish

    Fish -- FishFactory
    
```

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
