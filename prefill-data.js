function post(url, payload) {
  payload.forEach(data => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      console.log("REQUEST COMPLETE: ", url)
    })
    .catch(err => console.dir(err))
  });
}

/* * * * * *
* SKILLS
* * * * * */
post("http://localhost:8080/api/skills", [
  {
  title: "Karate",
  description: "Ait enim se, si uratur, Quam hoc suave! dicturum. Si mala non sunt, iacet omnis ratio Peripateticorum. Qua tu etiam inprudens utebare non numquam. Quae qui non vident, nihil umquam magnum ac cognitione dignum amaverunt.",
  imageSrc: "services/karate.jpg",
  length: 1,
  cost: 90
},
{
  title: "MMA Session",
  description: "Omnia contraria, quos etiam insanos esse vultis. Sed vobis voluptatum perceptarum recordatio vitam beatam facit, et quidem corpore perceptarum. His enim rebus detractis negat se reperire in asotorum vita quod reprehendat.",
  imageSrc: "services/mma.jpg",
  length: 1,
  cost: 90
},
{
  title: "Running Group",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae est igitur causa istarum angustiarum? Quorum altera prosunt, nocent altera. Non igitur potestis voluptate omnia dirigentes aut tueri aut retinere virtutem.",
  imageSrc: "services/running.jpg",
  length: 1,
  cost: 90
}])

/* * * * * *
* EMPLOYEE
* * * * * */
post("http://localhost:8080/api/employee", [
  {
    userName: "arone123",
    fname: "arone",
    lname: "susau"
  },
  {
    userName: "dylan123",
    fname: "dylan",
    lname: "dimkovski"
  }
])


/* * * * * *
* CUSTOMER
* * * * * */
window.setTimeout(() => {
  post("http://localhost:8080/api/customer", [
    {
      userName: "man123",
      fname: "man",
      lname: "hou"
    }
  ])
}, 1000)

/* * * * * *
* SCHEDULE
* * * * * */
window.setTimeout(() => {
  function schedule(id, skill_id, availability, hour) {
    return {
      employee: { id: id },
      skills: { skills_id: skill_id },
      availability: availability,
      capacity: 10,
      length: 1,
      startingHour: hour,
      remaining: Math.floor(1 + (Math.random() * 10))
    }
  }
  
  const today = (new Date()).getDate();
  
  post("http://localhost:8080/api/schedule", [
    schedule(1, 1, `2020-09-${today}`, 10),
    schedule(1, 1, `2020-09-${today}`, 12),
    schedule(1, 1, `2020-09-${today}`, 14),
    schedule(1, 1, `2020-09-${today}`, 16),
    schedule(1, 1, `2020-09-${today}`, 18),
    schedule(1, 2, `2020-09-${today}`, 9),
    schedule(1, 2, `2020-09-${today}`, 13),
    schedule(1, 2, `2020-09-${today}`, 15),
    schedule(1, 2, `2020-09-${today}`, 17),

    schedule(2, 1, `2020-09-${today}`, 10),
    schedule(2, 1, `2020-09-${today}`, 14),
    schedule(2, 1, `2020-09-${today}`, 18),
    schedule(2, 2, `2020-09-${today}`, 9),
    schedule(2, 2, `2020-09-${today}`, 15),
  ])
}, 1000)

