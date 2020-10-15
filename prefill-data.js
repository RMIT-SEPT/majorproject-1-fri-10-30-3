
async function login () {
  return await fetch("http://localhost:8080/api/customer/login", {
    method: "POST",  
    headers: { 
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: "man123",
      password: "abc123"
    })
  })
  .then(res => res.json())
  .then(res => res.token)
}

function execute(token) {
  console.log("REQUEST COMPLETE: ", "http://localhost:8080/api/customer/register")
  console.log(token)

  function post(url, payload) {
    payload.forEach(data => {
      fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: token
        },
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
  post("http://localhost:8080/api/employee/register/", [
    {
      userName: "arone123",
      fname: "arone",
      lname: "susau",
      password: "abc123",
      confirmPassword: "abc123"
    },
    {
      userName: "dylan123",
      fname: "dylan",
      lname: "dimkovski",
      password: "abc123",
      confirmPassword: "abc123"
    }
  ])
  
  /* * * * * *
  * SCHEDULE
  * * * * * */
  window.setTimeout(() => {
    function schedule(id, skillId, availability, hour) {
      return {
        employee: { id: id },
        skills: { skillId: skillId },
        availability: availability,
        capacity: 10,
        length: 1,
        startingHour: hour,
        remaining: Math.floor(1 + (Math.random() * 10))
      }
    }
    
    const date = new Date()
    const day = date.getDate();
    const month = date.getMonth() + 1;
    
    post("http://localhost:8080/api/schedule", [
      schedule(2, 1, `2020-${month}-${day}`, 10),
      schedule(2, 1, `2020-${month}-${day}`, 12),
      schedule(2, 1, `2020-${month}-${day}`, 14),
      schedule(2, 1, `2020-${month}-${day}`, 16),
      schedule(2, 1, `2020-${month}-${day}`, 18),
      schedule(2, 2, `2020-${month}-${day}`, 9),
      schedule(2, 2, `2020-${month}-${day}`, 13),
      schedule(2, 2, `2020-${month}-${day}`, 15),
      schedule(2, 2, `2020-${month}-${day}`, 17),
  
      schedule(3, 1, `2020-${month}-${day}`, 10),
      schedule(3, 1, `2020-${month}-${day}`, 14),
      schedule(3, 1, `2020-${month}-${day}`, 18),
      schedule(3, 2, `2020-${month}-${day}`, 9),
      schedule(3, 2, `2020-${month}-${day}`, 15),
    ])
  }, 1000)
}

fetch("http://localhost:8080/api/customer/register", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userName: "man123",
    fname: "man",
    lname: "hou",
    password: "abc123",
    confirmPassword: "abc123"
  })
})
.then(res => res.json())
.then(login)
.then(execute)
.catch(err => console.dir(err))

