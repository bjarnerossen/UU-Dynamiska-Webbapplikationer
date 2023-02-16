import { tableFetch } from "./table-fetch.js";

tableFetch().then(data => {
    var table = document.getElementById("table");
    data.playedGames.forEach(game => {
    var tr = document.createElement("tr");

    var gameNumber = document.createElement("td");
    gameNumber.textContent = game.gameNumber;
    tr.appendChild(gameNumber);
  
    var teams = document.createElement("td");
    var team1Link = document.createElement("a");
    team1Link.href = game.teams[1].homepage;
    team1Link.textContent = game.teams[1].name;
    teams.appendChild(team1Link);
  
    teams.appendChild(document.createTextNode(" -VS- "));
  
    var team2Link = document.createElement("a");
    team2Link.href = game.teams[2].homepage;
    team2Link.textContent = game.teams[2].name;
    teams.appendChild(team2Link);
    tr.appendChild(teams);
  
    var outcomeTeam1 = document.createElement("td");
    var outcomeDraw = document.createElement("td");
    var outcomeTeam2 = document.createElement("td");
    
    if (game.outcome === '1') {
        outcomeTeam1.innerHTML = '<span class="checkmark"><div class="stem"></div><div class="kick"></div></span>';
    } else if (game.outcome === 'X') {
        outcomeDraw.innerHTML = '<span class="checkmark cross"><div class="stem"></div><div class="kick"></div><div class="stem"></div></span>';
    } else if (game.outcome === '2') {
        outcomeTeam2.innerHTML = '<span class="checkmark"><div class="stem"></div><div class="kick rotated"></div></span>';
    }
  
    tr.appendChild(outcomeTeam1);
    tr.appendChild(outcomeDraw);
    tr.appendChild(outcomeTeam2);
  
    table.appendChild(tr);
});
});