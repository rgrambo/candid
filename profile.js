function init () {
    id = '0';

    stats = getStats(id);

    refresh(stats);
}

function refresh(stats) {
    refreshCard(stats);
    refreshForAgainst(stats);
}

function refreshCard(stats) {
    const backgrounds = [
        "images/geometric-background.jpg",
        "images/geometric-background-invert.jpg"
    ];

    const userStats = getUserStats();

    const scope = document.getElementById('profile');

    const profileTemplate = getCardTemplate();

    var profileCard = profileTemplate.content.querySelector(".profile-card").cloneNode(true);

    setCardStats(profileCard, stats, null, backgrounds[0]);

    if (userStats.id === id) {
        setCardEditable(profileCard);
    }

    var existingElements = scope.getElementsByClassName("profile-card");
    for (var x = 0; x < existingElements.length; x++) {
        existingElements[x].parentNode.removeChild(existingElements[x]);
    }
    scope.appendChild(profileCard);
}

function refreshForAgainst(stats) {
    const scope = document.getElementById('profile');

    const issues = getIssues();

    const forAgainstTemplate = getForAgainstTemplate();

    var profileForAgainst = forAgainstTemplate.content.querySelector(".profile-for-against").cloneNode(true);

    var profileFor = profileForAgainst.querySelector(".profile-for");
    var profileUndecided = profileForAgainst.querySelector(".profile-undecided");
    var profileAgainst = profileForAgainst.querySelector(".profile-against");

    var li;
    var span;
    var arrowLeft = document.createElement("img");
    arrowLeft.src = 'images/arrow-left.png';
    var arrowRight = document.createElement("img");
    arrowRight.src = 'images/arrow-right.png';

    for (var i = 0; i < issues.length; i++) {
        const issue = issues[i];
        li = document.createElement("li");
        span = document.createElement("span");
        span.innerHTML = issue;

        var addingArrowLeft;
        var addingArrowRight;
        if (stats.stats.for.includes(issue)) {
            addingArrowLeft = arrowLeft.cloneNode(true);
            addingArrowLeft.onclick = function() {
                moveToUndecided(stats, issue);
            };
            li.appendChild(addingArrowLeft);

            li.appendChild(span);

            profileFor.appendChild(li);
        } else if (stats.stats.against.includes(issue)) {
            addingArrowRight = arrowRight.cloneNode(true);
            addingArrowRight.onclick = function() {
                moveToUndecided(stats, issue);
            };

            li.appendChild(span);

            li.appendChild(addingArrowRight);

            profileAgainst.appendChild(li);
        } else {
            addingArrowLeft = arrowLeft.cloneNode(true);
            addingArrowLeft.onclick = function() {
                moveToAgainst(stats, issue);
            };
            li.appendChild(addingArrowLeft);

            li.appendChild(span);

            addingArrowRight = arrowRight.cloneNode(true);
            addingArrowRight.onclick = function() {
                moveToFor(stats, issue);
            };
            li.appendChild(addingArrowRight);

            profileUndecided.appendChild(li);
        }
    }

    var existingElements = scope.getElementsByClassName("profile-for-against");
    for (var x = 0; x < existingElements.length; x++) {
        existingElements[x].parentNode.removeChild(existingElements[x]);
    }
    scope.appendChild(profileForAgainst);
}

function moveToUndecided(stats, stat) {
    removeIfExists(stats.stats.for, stat);
    removeIfExists(stats.stats.against, stat);

    console.log(stats);

    refresh(stats);
}

function moveToFor(stats, stat) {
    stats.stats.for.push(stat);

    console.log(stats);

    refresh(stats);
}

function moveToAgainst(stats, stat) {
    stats.stats.against.push(stat);

    console.log(stats);

    refresh(stats);
}

function removeIfExists(stats, stat) {
    var forIndex = stats.indexOf(stat);
    if (forIndex > -1) {
        stats.splice(forIndex, 1);
    }
}

window.onload = init;