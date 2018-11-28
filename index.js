function init () {
    const backgrounds = [
        "images/geometric-background.jpg",
        "images/geometric-background-invert.jpg"
    ];

    const profileTemplate = getCardTemplate();

    const userStats = getUserStats();

    const scope = document.getElementById('home');

    var profileCard;

    var stats = [getStats(1), getStats(2), getStats(3), getStats(0)];

    for (var i = 0; i < stats.length; i++) {
        profileCard = profileTemplate.content.querySelector(".profile-card").cloneNode(true);

        setCardStats(profileCard, stats[i], userStats, backgrounds[i % backgrounds.length]);

        scope.appendChild(profileCard);
    }
}

window.onload = init;