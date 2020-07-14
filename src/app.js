const view = {
  wrapper: document.querySelector(".wrapper"),
  items: document.querySelectorAll(".wrapper__item"),
  sides: document.querySelector("#select"),
  dataCell: document.querySelectorAll("[data-cell]"),
  winningPage: document.querySelector(".winner-page"),
  restart: document.querySelector(".winner-page--link"),
  winner: document.querySelector("#winner"),
  tiePage: document.querySelector(".tie-page"),
  restart: document.querySelector(".tie-page--link"),
  circle: "O",
  x: "X",
};
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
const end = 8;
let start = 0;
let currentClass;

view.items.forEach((item) => {
  item.addEventListener(
    "click",
    (e) => {
      e.preventDefault();

      currentClass = addClasses();
      disableSelect();
      generateHTML(e.target, assignClass(e.target));
      currentClass = swapTurns();
      let classList = e.target.innerHTML;

      winner(classList);
    },
    { once: true }
  );
});
function assignClass(target) {
  let toggle = currentClass ? view.circle : view.x;
  target.classList.add(toggle);
  return toggle;
}
function generateHTML(target, html) {
  target.innerHTML = html;
}

function swapTurns() {
  return currentClass != currentClass;
}

function addClasses() {
  if (view.sides.options.selectedIndex === 0) {
    view.sides.options.selectedIndex = 1;
    currentClass = false;
  } else if (view.sides.options.selectedIndex === 1) {
    view.sides.options.selectedIndex = 0;
    currentClass = true;
  }
  return currentClass;
}
function winner(classList) {
  if (checkWinner(classList)) {
    view.winningPage.style.visibility = "visible";
    view.winner.innerHTML = `Player ${classList}`;
    view.restart.addEventListener("click", () => {
      view.winningPage.style.display = "none";
    });
  } else {
    if (start === end) {
      view.tiePage.style.visibility = "visible";
      view.restart.addEventListener("click", () => {
        view.winningPage.style.display = "none";
      });
    }
    start++;
  }
}

function checkWinner(classList) {
  return combinations.some((combination) => {
    return combination.every((index) => {
      return view.dataCell[index].classList.contains(classList);
    });
  });
}

function disableSelect() {
  view.sides.disabled = true;
}
