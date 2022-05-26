var xmlhttp = new XMLHttpRequest();
var url =
  "/Users/kimjuyoung/3학년 1학기/IoT_platform/Project/code_test/testTable/js/jsonData.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    //console.log(data)

    $("#example").DataTable({
      //"ajax": "data/objects.txt",
      data: data.data,
      columns: [{ data: "first" }, { data: "second" }, { data: "third" }],
    });
  }
};
