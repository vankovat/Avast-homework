let selectedPlan = __DATA__.planSelector[1];

function renderPlans(data) {
  const plansElement = document.getElementById("plans");
  // this is not good, we should remove the onclick listeners on removal
  // using the DOM API removeEventListener
  plansElement.innerHTML = "";

  let ulElement = document.createElement("ul");
  data.forEach(function (plan) {
    const selected = selectedPlan === plan;

    const li = document.createElement("li");
    li.classList.add("plan");

    li.addEventListener("click", function (event) {
      event.preventDefault();
      selectedPlan = plan;
      renderPlans(data);
    });

    if (selected) {
      li.classList.add("plan--selected");
    }

    const input = document.createElement("input");
    input.name = "plan";
    input.type = "radio";
    input.checked = selected;

    const title = document.createElement("div");
    title.classList.add("plan__title");
    title.appendChild(input);
    title.appendChild(document.createTextNode(plan.title));
    if (plan.recommended) {
      const recommended = document.createElement("span");
      recommended.appendChild(document.createTextNode("recommended"));
      recommended.classList.add("plan__recommended");
      title.appendChild(recommended);
    }

    const price = document.createElement("div");
    price.classList.add("plan__price");
    price.appendChild(document.createTextNode(plan.monthlyPrice + " / month"));

    const priceYearly = document.createElement("div");
    priceYearly.appendChild(
      document.createTextNode("Billed as " + plan.yearlyPrice)
    );

    const details = document.createElement("div");
    details.classList.add("plan__details");
    details.appendChild(price);
    details.appendChild(priceYearly);

    li.appendChild(title);
    li.appendChild(details);

    ulElement.appendChild(li);
  });

  plansElement.appendChild(ulElement);
}

document.getElementById("plans_submit").addEventListener("click", function () {
  window.open(selectedPlan.url);
});

renderPlans(__DATA__.planSelector);
