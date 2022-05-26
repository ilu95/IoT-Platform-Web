// Created by J. Yun, SCH Univ., yun@sch.ac.kr
// Need to install node-fetch
// $ npm i node-fetch --save

const fetch = require("node-fetch");
const fs = require("fs");

const aJsonArray = new Array();
const aTotalJson = new Object();

// 생성자 함수 만들기
// const SelfObj = function (first, second, third) {
//   this.first = first;
//   // this는 자신이 속한 객체를 참조하는 '자기 참조 변수'다.
//   this.second = second;
//   this.third = third;
//   aJsonArray.push(mySelfObj);
// };

var myHeaders = new fetch.Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("X-M2M-RI", "12345");
myHeaders.append("X-M2M-Origin", "justin");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

// uncomment one of three .url statements below
// 1. retrieve latest three cins
fetch(
  "http://203.253.128.177:7579/Mobius/sch20181522/dust?fu=2&ty=4&st=25&rcn=4",
  requestOptions
)
  // 2. retrieve three cins created after ct=20210512T100525
  // fetch(
  //   "http://203.253.128.177:7579/Mobius/sch20181522/dust?fu=2&lim=6&ty=4&rcn=4" +
  //     "&cra=20210512T100525",
  //   requestOptions
  // )
  // 3. retrieve three cins created after ct=20210512T100525 and before ct=20210512T100540
  // fetch("http://203.253.128.161:7579/Mobius/sch19999999/dust?fu=2&ty=4&rcn=4"
  //       + "&cra=20210512T100525&crb=20210512T100540", requestOptions)

  .then(function (response) {
    if (response.status !== 200) {
      console.log("There was a problem. Status Code: " + response.status);
      return;
    }
    var count = 0;

    response.json().then(function (data) {
      console.log(data["m2m:rsp"]["m2m:cin"]);
      for (var i = 0; i < data["m2m:rsp"]["m2m:cin"].length; i++) {
        // console.log(data['m2m:rsp']['m2m:cin'][i]);
        var key = data["m2m:rsp"]["m2m:cin"][i];
        count += 1;
        const aJson = new Object();
        aJson.first = key.con.slice(0, 2) + "호실";
        aJson.second = "Lv" + key.con.slice(3, 5);
        aJson.third = "시간" + key.con.slice(6, 8);
        aJsonArray.push(aJson);
      }
      aTotalJson.data = aJsonArray;
      const bookJSON = JSON.stringify(aTotalJson);
      fs.writeFileSync("./js/jsonData.json", bookJSON);
      console.log(count);
    });
  })
  .catch(function (err) {
    console.log("Fetch Error :-S", err);
  });
