function run() {
  fetch("/leaderboard")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    });
}