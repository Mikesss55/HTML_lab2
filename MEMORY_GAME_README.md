# Memory Game - Implementation Documentation

## Overview
A fully functional Flip Card Memory Game integrated into the CV website (services.html page). The game features dynamic card generation, multiple difficulty levels, statistics tracking, and a clean, responsive design.

## Features Implemented

### 1. Game Section (services.html)
- Added a new "Memory Game" section with:
  - Section heading
  - Difficulty level selector (Easy/Hard)
  - Game board container (dynamically populated)
  - Stats panel (moves and matches)
  - Start and Restart buttons
  - Win message area

### 2. Card Data (memory-game.js)
- Array of 12 unique card items using Bootstrap Icons:
  - heart, star, lightning, sun, moon, cloud, gift, trophy, gem, fire, balloon, flower
- Cards are dynamically generated, not hardcoded in HTML
- Each unique item appears twice to create matching pairs

### 3. Difficulty Levels
- **Easy**: 4×3 grid (12 cards, 6 pairs)
- **Hard**: 6×4 grid (24 cards, 12 pairs)
- Changing difficulty during gameplay prompts user confirmation
- Board automatically reinitializes with:
  - Reshuffled cards
  - Reset game state
  - Cleared statistics

### 4. Card Flipping Logic
- Click to flip cards and reveal hidden content
- Only 2 cards can be flipped at a time
- Smooth 3D flip animation using CSS transforms
- Cards are disabled while checking for matches

### 5. Matching Rules
- **Match found**: Cards remain visible and become inactive
- **No match**: Cards flip back after 1-second delay
- Matched cards display special styling (golden gradient)
- Pulse animation on successful match

### 6. Statistics Tracking
- **Total Moves**: Increments each time 2 cards are flipped
- **Matched Pairs**: Increments for each successful match
- Stats update in real-time during gameplay
- Stats reset on game restart

### 7. Win Condition
- Detects when all pairs are matched
- Displays animated win message with:
  - Trophy icon
  - Congratulations message
  - Final move count
- Smooth scroll to win message

### 8. Start Button
- Initializes the game
- Resets all statistics
- Generates and shuffles cards
- Enables Restart button
- Disables Start button during gameplay

### 9. Restart Button
- Resets game state (moves, matches)
- Reshuffles all cards
- Flips all cards back to hidden state
- Starts new game without page reload
- Hides win message if visible

### 10. Visual Design
- Consistent with Kelly Bootstrap Template theme
- Clean, modern card layout
- Responsive grid system
- Smooth animations and transitions
- Cards with gradient backgrounds:
  - Front: Purple gradient (hidden state)
  - Back: Green gradient (revealed state)
  - Matched: Golden gradient
- Mobile-friendly responsive design
- Reduced motion support for accessibility

## File Structure

```
HTML_lab2/
├── services.html                 # Memory Game section added here
├── assets/
│   ├── css/
│   │   ├── memory-game.css      # Game-specific styles
│   │   └── custom.css           # Fixed incomplete CSS rule
│   └── js/
│       └── memory-game.js       # Game logic and functionality
```

## Technical Implementation

### HTML Structure
- Semantic HTML5 elements
- Bootstrap grid for responsive layout
- Accessible form controls
- ARIA-friendly structure

### JavaScript Features
- ES6+ syntax (const, let, arrow functions, template literals)
- Fisher-Yates shuffle algorithm for randomization
- Event delegation for card clicks
- Efficient DOM manipulation
- State management for game logic

### CSS Techniques
- CSS Grid for card layout
- CSS 3D transforms for flip animation
- Flexbox for component alignment
- CSS variables for theming
- Keyframe animations
- Media queries for responsive design
- Accessibility considerations (reduced motion)

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive on all device sizes
- Touch-friendly for mobile devices

## How to Play

1. Open `services.html` in a browser
2. Scroll to the "Memory Game" section or click "Memory Game" in navigation
3. Select difficulty level (Easy or Hard)
4. Click "Start Game" button
5. Click cards to flip and reveal icons
6. Match all pairs with the fewest moves possible
7. Use "Restart Game" to play again

## Validation
- HTML: W3C compliant
- CSS: No errors
- JavaScript: No errors
- All files pass validation checks

## Future Enhancements (Optional)
- Timer functionality
- High score tracking
- Sound effects
- Additional difficulty levels
- Custom card themes
- Multiplayer mode
