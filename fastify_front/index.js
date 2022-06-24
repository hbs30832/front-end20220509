// var xmlHttp = new XMLHttpRequest();
// xmlHttp.open("GET", "http://127.0.0.1:3000/cats/blue", false); // false for synchronous request
// xmlHttp.send(null);
// console.log(xmlHttp.responseText);

// fetch("http://127.0.0.1:3000/cats/blue").then((res) => console.log(res.body));
//   .then((data) => console.log(data));

// fetch사용하면 Response 객체가 온다
// => Reponse.body는 ReadableStrem =>바이트 데이터를 읽을수 있는 스트림
// => Reponse.json()을 사용하면 JSON 형태로 변환.

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000/",
  headers: { "X-Custom-Header": "foobar" },
});

// 처음 접속시 모든 고양이 출력

axiosInstance.get(`/cats`).then((res) => {
  const { cats } = res.data;
  console.log(cats);
  render(cats);
});

// 검색
document.querySelector("#btnSearch").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#inputSearch").value;
  console.log(name);
  axiosInstance.get("/cats/" + name).then((res) => {
    console.log(res);
    const { cats } = res.data;
    render(cats);
  });
});

// 화면 출력
function render(cats) {
  document.querySelector(".catList ul").innerHTML = "";
  cats.forEach((cat) => {
    const catLi = document.createElement("li");
    const catText = document.createTextNode(`${cat.name} (${cat.email})`);
    catLi.setAttribute("data-cat-id", cat._id);

    catLi.appendChild(catText);
    document.querySelector(".catList ul").appendChild(catLi);
  });
}

// 회원가입 버튼 클릭
document.querySelector("#openSignup").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".signupForm").style.display = "block";
  e.target.style.display = "none";
});

// 등록버튼 클릭
document.querySelector("#btnSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#inputName").value;
  const email = document.querySelector("#inputEmail").value;
  const password = document.querySelector("#inputPassword").value;
  const cat = {
    name,
    email,
    password,
  };

  axiosInstance
    .post("/cats", {
      cat,
    })
    .then(() => {
      axiosInstance.get("/cats").then((res) => render(res.data.cats));

      document.querySelector(".signupForm").style.display = "none";
      document.querySelector(".signupForm").reset();
      document.querySelector("#openSignup").style.display = "inline-block";
    })
    .catch((e) => {
      console.log(e);
    });
});

document.querySelector(".catList").addEventListener("click", function (e) {
  if (e.target.matches(".catList li")) {
    const id = e.target.dataset.catId;
    console.log(id);
    if (confirm("정말 삭제하시겠습니까?")) {
      axiosInstance
        .delete("/cats/" + id)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
});
