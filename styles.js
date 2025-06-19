/* General body styling */
body {
    font-family: Arial, sans-serif;
    margin: 10px;
    background-color: black;
    background-image: url('images/dragon-background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: white;
    position: relative;
}

/* Background overlay */
body::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: -1;
}

/* Login Section */
.login-section {
    text-align: center;
    margin: 100px auto;
    max-width: 300px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 10px;
}

.login-section h2 {
    color: #FFD700;
    margin-bottom: 20px;
}

.login-section input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    color: #000;
}

.login-section button {
    width: 100%;
    padding: 10px;
    background-color: #52170b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.login-section button:hover {
    background-color: #3a1008;
}

.error-message {
    color: red;
    margin-top: 10px;
}

/* App Section */
.hidden {
    display: none;
}

h1 {
    text-align: center;
    color: #FFD700;
    margin-bottom: 20px;
    font-size: 2em;
    font-family: 'Franklin Gothic Demi', Arial, sans-serif;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
}

.input-section {
    text-align: center;
    margin-bottom: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
}

input[type="text"] {
    padding: 12px;
    width: 80%;
    max-width: 300px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    color: #000;
    font-size: 16px;
}

/* Buttons */
button {
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    margin: 10px 5px;
    border-radius: 4px;
    font-size: 16px;
}

#addButton {
    background-color: #52170b;
    color: white;
    display: block;
    margin: 10px auto;
}

#addButton:hover {
    background-color: #3a1008;
}

#roundButton,
#updateResultsButton,
#randomizePlayersButton,
#sortByTableButton {
    background-color: #693131;
    color: white;
}

#roundButton:hover,
#updateResultsButton:hover,
#randomizePlayersButton:hover,
#sortByTableButton:hover {
    background-color: #4C2323;
}

#saveButton,
#loadButton {
    background-color: #f9f9f9;
    color: #000;
}

#saveButton:hover,
#loadButton:hover {
    background-color: #ddd;
}

#resetButton {
    background-color: #ff4d4d;
    color: white;
}

#resetButton:hover {
    background-color: #cc0000;
}

#randomizationCountButton {
    background-color: #693131;
    color: white;
}

#randomizationCountButton:hover {
    background-color: #4C2323;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 10px;
    flex-wrap: wrap;
}

/* Table Styles */
.table-container {
    width: 100%;
    overflow-x: auto;
    margin: 20px auto;
}

table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

th, td {
    padding: 6px;
    text-align: left;
    border: 1px solid #ddd;
    font-size: 14px;
}

th {
    background-color: #fed0c4;
    font-weight: bold;
    color: #000;
}

tr {
    background-color: #feedd8;
    color: #000;
}

tr:hover {
    background-color: #f1f1f1;
}

/* Score Inputs */
.score-container {
    display: flex;
    align-items: center;
}

.score-input {
    width: 40px !important;
    padding: 4px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    color: #000;
    font-size: 14px;
}

.cumulative-score {
    margin-left: 5px;
    display: inline-block;
    width: 30px;
    text-align: right;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 2px;
    border-radius: 3px;
}

.table-input {
    width: 40px;
}

/* Special Rows */
tr.separator-row td {
    background-color: #693131;
    height: 3px;
}

tr.separator-row td:first-child {
    border-top: 1px solid #fff;
}

tr.blank-row td {
    height: 140px;
}

/* Other Styles */
td:first-child {
    font-weight: bold;
}

.remove-player {
    color: red;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
}

.remove-player:hover {
    color: darkred;
}