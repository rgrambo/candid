function setCardEditable(card) {
    var profileChangeImageIcon = card.querySelector(".profile-change-image-icon");
    profileChangeImageIcon.style.display = "block";

    var profileImage = card.querySelector(".profile-image");
    profileImage.classList.add("profile-image-editable");
    profileImage.onclick = function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;

        var profileImageUpload = target.parentNode.querySelector(".profile-image-upload");

        profileImageUpload.click();
    };

    /*
    var profileStatsHolder = card.querySelector(".profile-stats-holder");
    var profileStats = profileStatsHolder.querySelectorAll("li");

    var removeIcon = document.createElement('img');
    removeIcon.classList.add("remove-icon");
    removeIcon.classList.add("clickable");
    removeIcon.src = "images/red-x.png";

    for (var i = 0; i < profileStats.length; i++) {
        const index = i;
        var addingRemoveIcon = removeIcon.cloneNode(true);

        addingRemoveIcon.onclick = function (e) {
            profileStats[index].parentNode.removeChild(profileStats[index]);
        };

        profileStats[index].appendChild(addingRemoveIcon);
    }
    */
}

function setCardStats(card, stats, userStats, backgroundUrl) {
    card.style.backgroundImage = "url("+backgroundUrl+")";

    var cardImg = card.querySelector(".profile-image");
    cardImg.src = stats.image;

    var cardName = card.querySelector(".profile-name");
    cardName.innerText = stats.name;

    var allStats = getAllStats(stats.stats);

    var allUserStats = null;
    if (userStats != null) {
        allUserStats = getAllStats(userStats.stats);
    }

    var newCardStat;
    if (allUserStats === null || allUserStats.length === 0) {
        var cardStats = card.querySelector(".profile-stats");
        cardStats.style.display = "block";

        for (var k = 0; k < allStats.length; k++) {
            newCardStat = document.createElement('li');
            newCardStat.innerText = allStats[k];

            cardStats.appendChild(newCardStat);
        }
    } else {
        var cardProStats = card.querySelector(".profile-pro-stats");
        var cardConStats = card.querySelector(".profile-con-stats");

        for (var l = 0; l < allStats.length; l++) {
            newCardStat = document.createElement('li');
            newCardStat.innerText = allStats[l];
            if (allUserStats.includes(allStats[l])) {
                cardProStats.style.display = "block";
                cardProStats.appendChild(newCardStat);
            } else {
                cardConStats.style.display = "block";
                cardConStats.appendChild(newCardStat);
            }
        }
    }
}

function getAllStats(stats) {
    if (stats == null) {
        return null;
    }

    var allStats = [];
    for (var i = 0; i < stats.for.length; i++) {
        allStats.push('For ' + stats.for[i]);
    }
    for (var j = 0; j < stats.against.length; j++) {
        allStats.push('Against ' + stats.against[j]);
    }
    return allStats;
}

function getUserStats() {
    return getStats(0);
}

function getStats(id) {
    var map = {
        0: {
            id: 0,
            name: "Ross Grambo",
            image: "images/ross-navi-dog.png",
            stats: {
                for: [
                    "Higher 1% Taxation",
                    "Stricter Immigration Policies",
                    "Abortion Rights"
                ],
                against: [
                    "Gun Control",
                    "Free Market"
                ]
            }
        },
        1: {
            id: 1,
            name: "Bernie Sanders",
            image: "images/the-bern.png",
            stats: {
                for: [
                    "Higher 1% Taxation",
                    "Stricter Immigration Policies",
                    "Abortion Rights",
                    "Gun Control"
                ],
                against: [
                    "Free Market"
                ]
            }
        },
        2: {
            id: 2,
            name: "Donald Trump",
            image: "images/the-donald.png",
            stats: {
                for: [
                    "Free Market",
                    "Stricter Immigration Policies"
                ],
                against: [
                    "Gun Control",
                    "Higher 1% Taxation",
                    "Abortion Rights"
                ]
            }
        },
        3: {
            id: 3,
            name: "Elizabeth Warren",
            image: "images/elizabeth-war.png",
            stats: {
                for: [
                    "Higher 1% Taxation",
                    "Abortion Rights",
                    "Gun Control"
                ],
                against: [
                    "For Stricter Immigration Policies",
                    "Free Market"
                ]
            }
        }
    };

    return map[id];
}

function getCardTemplate() {
    return getTemplate('#profile-card-template');
}

function getForAgainstTemplate() {
    return getTemplate('#profile-for-against-template');
}

function getTemplate(templateId) {
    var links = document.querySelectorAll('link[rel="import"]');

    for (var i = 0; i < links.length; i++) {
        var link = links[i].import.querySelector(templateId);

        if (link != null) {
            return link;
        }
    }

    return null;
}

function getIssues() {
    return [
        "Higher 1% Taxation",
        "Abortion Rights",
        "Gun Control",
        "Stricter Immigration Policies",
        "Free Market",
        "Lower Taxes",
        "Universal Income",
        "LGBT Adoption Rights",
        "Gay Marriage",
        "Gender Identity",
        "Death Penalty",
        "Separation of Church and State",
        "Border Wall",
        "Stricter Drug Policies",
        "Patriot Act",
        "Planned Parenthood",
        "Mental Health Funding"
    ];
}