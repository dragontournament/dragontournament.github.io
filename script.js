// Login Functionality
const loginSection = document.getElementById("loginSection");
const appSection = document.getElementById("appSection");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");

// Tournament State
let players = [];
let randomizationCount = 0;
let currentRound = 1;

loginButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "dragontour" && password === "highcss4") {
        loginSection.classList.add("hidden");
        appSection.classList.remove("hidden");
        loginError.textContent = "";
    } else {
        loginError.textContent = "Invalid username or password.";
    }
});

// Add a new player row
function addRow(playerName) {
    const tableBody = document.querySelector("#playersTable tbody");
    removeEmptyRow(tableBody);

    const row = document.createElement("tr");
    const rowId = Date.now();
    row.dataset.id = rowId;

    // # Column
    const numberCell = document.createElement("td");
    numberCell.textContent = tableBody.querySelectorAll("tr:not(.separator-row):not(.blank-row)").length + 1;
    row.appendChild(numberCell);

    // Table Column
    const tableCell = document.createElement("td");
    const tableInput = document.createElement("input");
    tableInput.type = "number";
    tableInput.value = 0;
    tableInput.classList.add("table-input");
    tableInput.addEventListener("input", handleTableInput);
    tableCell.appendChild(tableInput);
    row.appendChild(tableCell);

    // Player Column
    const playerCell = document.createElement("td");
    playerCell.textContent = playerName;
    row.appendChild(playerCell);

    // Score Column with cumulative tracking
    const scoreCell = document.createElement("td");
    const scoreContainer = document.createElement("div");
    scoreContainer.classList.add("score-container");
    
    const scoreInput = createNumberInput(0);
    scoreInput.classList.add("score-input");
    scoreContainer.appendChild(scoreInput);
    
    const cumulativeScore = document.createElement("span");
    cumulativeScore.classList.add("cumulative-score");
    cumulativeScore.textContent = "0";
    scoreContainer.appendChild(cumulativeScore);
    
    scoreCell.appendChild(scoreContainer);
    row.appendChild(scoreCell);

    // Tiebreaker Columns (each with cumulative tracking)
    for (let i = 0; i < 3; i++) {
        const tiebreakerCell = document.createElement("td");
        const tbContainer = document.createElement("div");
        tbContainer.classList.add("score-container");
        
        const tbInput = createNumberInput(0);
        tbInput.classList.add("score-input");
        tbContainer.appendChild(tbInput);
        
        const cumulativeTb = document.createElement("span");
        cumulativeTb.classList.add("cumulative-score");
        cumulativeTb.textContent = "0";
        tbContainer.appendChild(cumulativeTb);
        
        tiebreakerCell.appendChild(tbContainer);
        row.appendChild(tiebreakerCell);
    }

    // Remove Button
    const removeCell = document.createElement("td");
    const removeButton = document.createElement("span");
    removeButton.textContent = "×";
    removeButton.classList.add("remove-player");
    removeButton.addEventListener("click", () => removePlayer(rowId));
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    tableBody.appendChild(row);
    addWiderBlankSpace(tableBody);

    // Store player data
    players.push({
        id: rowId,
        number: numberCell.textContent,
        table: tableInput.value,
        name: playerName,
        currentScore: 0,
        cumulativeScore: 0,
        currentTiebreakers: [0, 0, 0],
        cumulativeTiebreakers: [0, 0, 0]
    });
}

// Helper functions
function createNumberInput(defaultValue) {
    const input = document.createElement("input");
    input.type = "number";
    input.value = defaultValue;
    input.addEventListener("input", (e) => {
        if (isNaN(e.target.value)) e.target.value = defaultValue;
    });
    return input;
}

function handleTableInput(e) {
    if (isNaN(e.target.value)) e.target.value = 0;
    addSeparators();
}

function removePlayer(rowId) {
    const tableBody = document.querySelector("#playersTable tbody");
    const row = tableBody.querySelector(`tr[data-id="${rowId}"]`);
    if (row) {
        tableBody.removeChild(row);
        players = players.filter(player => player.id !== rowId);
        updateRowNumbers();
        addSeparators();
    }
}

function updateRowNumbers() {
    const tableBody = document.querySelector("#playersTable tbody");
    const rows = tableBody.querySelectorAll("tr:not(.separator-row):not(.blank-row)");
    
    rows.forEach((row, index) => {
        row.querySelector("td:first-child").textContent = index + 1;
        const playerId = row.dataset.id;
        const player = players.find(p => p.id === playerId);
        if (player) player.number = index + 1;
    });
}

function addWiderBlankSpace(tableBody) {
    const blankRow = document.createElement("tr");
    blankRow.classList.add("blank-row");

    for (let i = 0; i < 8; i++) {
        blankRow.appendChild(document.createElement("td"));
    }

    tableBody.appendChild(blankRow);
}

function removeEmptyRow(tableBody) {
    const lastRow = tableBody.lastElementChild;
    if (lastRow && lastRow.classList.contains("blank-row")) {
        tableBody.removeChild(lastRow);
    }
}

function addSeparators() {
    const tableBody = document.querySelector("#playersTable tbody");
    const rows = Array.from(tableBody.children);

    // Remove existing separators
    rows.forEach(row => {
        if (row.classList.contains("separator-row")) {
            tableBody.removeChild(row);
        }
    });

    // Add new separators
    let prevTable = -1;
    rows.forEach(row => {
        const tableInput = row.querySelector(".table-input");
        if (tableInput) {
            const currentTable = parseInt(tableInput.value);
            if (currentTable > prevTable && prevTable !== -1 && currentTable > 0) {
                const separator = document.createElement("tr");
                separator.classList.add("separator-row");
                for (let i = 0; i < 8; i++) separator.appendChild(document.createElement("td"));
                tableBody.insertBefore(separator, row);
            }
            prevTable = currentTable;
        }
    });
}

// Sorting functions
function sortTable() {
    const tableBody = document.querySelector("#playersTable tbody");
    const rows = Array.from(tableBody.querySelectorAll("tr:not(.separator-row):not(.blank-row)"));

    // Update cumulative scores
    rows.forEach(row => {
        // Update score
        const scoreContainer = row.querySelector("td:nth-child(4) .score-container");
        const currentScore = parseInt(scoreContainer.querySelector("input").value) || 0;
        const cumulativeScore = parseInt(scoreContainer.querySelector(".cumulative-score").textContent) || 0;
        scoreContainer.querySelector(".cumulative-score").textContent = currentScore + cumulativeScore;
        scoreContainer.querySelector("input").value = "0";

        // Update tiebreakers
        for (let i = 1; i <= 3; i++) {
            const tbContainer = row.querySelector(`td:nth-child(${4 + i}) .score-container`);
            const currentTB = parseInt(tbContainer.querySelector("input").value) || 0;
            const cumulativeTB = parseInt(tbContainer.querySelector(".cumulative-score").textContent) || 0;
            tbContainer.querySelector(".cumulative-score").textContent = currentTB + cumulativeTB;
            tbContainer.querySelector("input").value = "0";
        }
    });

    // Sort based on cumulative values
    rows.sort((a, b) => {
        const getCumulativeValue = (row, col) => {
            return parseInt(row.querySelector(`td:nth-child(${col}) .cumulative-score`).textContent) || 0;
        };

        // Compare scores
        const scoreA = getCumulativeValue(a, 4);
        const scoreB = getCumulativeValue(b, 4);
        if (scoreA !== scoreB) return scoreB - scoreA;

        // Compare tiebreakers
        for (let i = 5; i <= 7; i++) {
            const tbA = getCumulativeValue(a, i);
            const tbB = getCumulativeValue(b, i);
            if (tbA !== tbB) return tbB - tbA;
        }

        return 0;
    });

    // Rebuild table with sorted rows
    tableBody.innerHTML = "";
    rows.forEach(row => tableBody.appendChild(row));

    addSeparators();
    addWiderBlankSpace(tableBody);

    // Increment round after sorting
    currentRound++;
    document.getElementById("roundButton").textContent = `Round ${currentRound}`;
}

function sortByTable() {
    const tableBody = document.querySelector("#playersTable tbody");
    const rows = Array.from(tableBody.querySelectorAll("tr:not(.separator-row):not(.blank-row)"));

    // Store current order
    const currentOrder = rows.map(row => ({
        id: row.dataset.id,
        number: row.querySelector("td:first-child").textContent,
        table: row.querySelector(".table-input").value
    }));

    // Sort by table number
    rows.sort((a, b) => {
        const tableA = parseInt(a.querySelector(".table-input").value) || 0;
        const tableB = parseInt(b.querySelector(".table-input").value) || 0;
        return tableA - tableB;
    });

    // Rebuild table
    tableBody.innerHTML = "";
    rows.forEach(row => tableBody.appendChild(row));

    // Restore original numbers
    currentOrder.forEach((item, index) => {
        const row = rows[index];
        row.querySelector("td:first-child").textContent = item.number;
    });

    addSeparators();
    addWiderBlankSpace(tableBody);
}

function randomizePlayers() {
    const tableBody = document.querySelector("#playersTable tbody");
    const rows = Array.from(tableBody.querySelectorAll("tr:not(.separator-row):not(.blank-row)"));

    // Store current order
    const currentOrder = rows.map(row => ({
        id: row.dataset.id,
        number: row.querySelector("td:first-child").textContent,
        table: row.querySelector(".table-input").value
    }));

    // Fisher-Yates shuffle
    for (let i = rows.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rows[i], rows[j]] = [rows[j], rows[i]];
    }

    // Rebuild table
    tableBody.innerHTML = "";
    rows.forEach(row => tableBody.appendChild(row));

    // Restore original numbers and table values
    currentOrder.forEach((item, index) => {
        const row = rows[index];
        row.querySelector("td:first-child").textContent = item.number;
        row.querySelector(".table-input").value = item.table;
    });

    addSeparators();
    addWiderBlankSpace(tableBody);

    // Update count
    randomizationCount++;
    document.getElementById("randomizationCountButton").textContent = `Randomizations: ${randomizationCount}`;
}

// Round management
function resetRound() {
    if (confirm("Do you want to reset the tournament? This will clear all player scores and reset to Round 1.")) {
        currentRound = 1;
        document.getElementById("roundButton").textContent = `Round ${currentRound}`;
        
        // Reset all scores
        const tableBody = document.querySelector("#playersTable tbody");
        const rows = tableBody.querySelectorAll("tr:not(.separator-row):not(.blank-row)");
        
        rows.forEach(row => {
            // Reset score
            const scoreContainer = row.querySelector("td:nth-child(4) .score-container");
            scoreContainer.querySelector(".cumulative-score").textContent = "0";
            scoreContainer.querySelector("input").value = "0";

            // Reset tiebreakers
            for (let i = 1; i <= 3; i++) {
                const tbContainer = row.querySelector(`td:nth-child(${4 + i}) .score-container`);
                tbContainer.querySelector(".cumulative-score").textContent = "0";
                tbContainer.querySelector("input").value = "0";
            }
        });
    }
}

// Data persistence
function saveData() {
    const data = Array.from(document.querySelectorAll("#playersTable tbody tr:not(.separator-row):not(.blank-row)")).map(row => ({
        player: row.querySelector("td:nth-child(3)").textContent,
        table: row.querySelector(".table-input").value,
        currentScore: row.querySelector("td:nth-child(4) input").value,
        cumulativeScore: row.querySelector("td:nth-child(4) .cumulative-score").textContent,
        tiebreakers: Array.from(row.querySelectorAll("td:nth-child(n+5):nth-child(-n+7)")).map(td => ({
            current: td.querySelector("input").value,
            cumulative: td.querySelector(".cumulative-score").textContent
        }))
    }));

    localStorage.setItem("playersData", JSON.stringify(data));
    localStorage.setItem("tournamentRound", currentRound.toString());
    alert("Data saved successfully!");
}

function loadData() {
    const savedData = localStorage.getItem("playersData");
    if (savedData) {
        const tableBody = document.querySelector("#playersTable tbody");
        tableBody.innerHTML = "";

        JSON.parse(savedData).forEach(player => {
            addRow(player.player);
            const rows = tableBody.querySelectorAll("tr:not(.separator-row):not(.blank-row)");
            const lastRow = rows[rows.length - 1];

            // Set table number
            lastRow.querySelector(".table-input").value = player.table;

            // Set score values
            const scoreContainer = lastRow.querySelector("td:nth-child(4) .score-container");
            scoreContainer.querySelector("input").value = player.currentScore;
            scoreContainer.querySelector(".cumulative-score").textContent = player.cumulativeScore;

            // Set tiebreaker values
            player.tiebreakers.forEach((tb, index) => {
                const tbContainer = lastRow.querySelector(`td:nth-child(${5 + index}) .score-container`);
                tbContainer.querySelector("input").value = tb.current;
                tbContainer.querySelector(".cumulative-score").textContent = tb.cumulative;
            });
        });

        // Load round
        const savedRound = localStorage.getItem("tournamentRound");
        if (savedRound) {
            currentRound = parseInt(savedRound);
            document.getElementById("roundButton").textContent = `Round ${currentRound}`;
        }

        alert("Data loaded successfully!");
    } else {
        alert("No saved data found.");
    }
}

function resetTournament() {
    if (confirm("Are you sure you want to reset the tournament? All data will be lost.")) {
        const tableBody = document.querySelector("#playersTable tbody");
        tableBody.innerHTML = "";

        // Reset other data
        players = [];
        randomizationCount = 0;
        currentRound = 1;
        document.getElementById("randomizationCountButton").textContent = `Randomizations: ${randomizationCount}`;
        document.getElementById("roundButton").textContent = `Round ${currentRound}`;
        localStorage.removeItem("playersData");
        localStorage.removeItem("tournamentRound");
        alert("Tournament reset successfully!");
    }
}

// Event Listeners
document.getElementById("addButton").addEventListener("click", () => {
    const playerInput = document.getElementById("playerInput");
    const playerName = playerInput.value.trim();
    if (playerName) {
        addRow(playerName);
        playerInput.value = "";
    } else {
        alert("Please enter a player name.");
    }
});

document.getElementById("playerInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") document.getElementById("addButton").click();
});

document.getElementById("roundButton").addEventListener("click", resetRound);
document.getElementById("updateResultsButton").addEventListener("click", sortTable);
document.getElementById("sortByTableButton").addEventListener("click", sortByTable);
document.getElementById("randomizePlayersButton").addEventListener("click", randomizePlayers);
document.getElementById("saveButton").addEventListener("click", saveData);
document.getElementById("loadButton").addEventListener("click", loadData);
document.getElementById("resetButton").addEventListener("click", resetTournament);

window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    e.returnValue = "";
    return "Are you sure you want to leave? Your data may not be saved.";
});