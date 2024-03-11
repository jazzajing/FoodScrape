//https://api.kroger.com/v1/connect/oauth2/authorize?scope=product.compact&response_type=code&client_id=clicknorder-563154db5efbbad4166107f43c10100a1991771918310542480&redirect_uri=http://localhost:8080/order

//GET access token
// var url = "https://api.kroger.com/v1/connect/oauth2/token";
//
// var xhr = new XMLHttpRequest();
// xhr.open("POST", url);
//
// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// xhr.setRequestHeader("Authorization", "Basic dGVzdGNhbGwtZmNiOWU1NDRkYmVkNTEwZGNiNmIxZDg4OGUwZDQ0ZjAzMjg3NTY4NTA4MTg2NTI4MTYxOmZ4MFNvWnItTm5xZ2F1Q2ZZLVRWS1dSckcwSzIxLUtxRmN6blA0ZVI=");
//
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//         console.log(xhr.status);
//         console.log(xhr.responseText);
//     }};
//
// var data = "grant_type=client_credentials&scope=product.compact";
//
// xhr.send(data);


//GET return products
// var url = "https://api.kroger.com/v1/products?filter.term=milk&filter.limit=2";
//
// var xhr = new XMLHttpRequest();
// xhr.open("GET", url);
//
// xhr.setRequestHeader("Accept", "application/json");
// xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ0ZXN0Y2FsbC1mY2I5ZTU0NGRiZWQ1MTBkY2I2YjFkODg4ZTBkNDRmMDMyODc1Njg1MDgxODY1MjgxNjEiLCJleHAiOjE2NTM5MTE4MTcsImlhdCI6MTY1MzkxMDAxMiwiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiI2NDRmODUxOC1hMmU3LTU3NWMtOWM0Ny0yNTEyNGUyNzg0N2EiLCJzY29wZSI6InByb2R1Y3QuY29tcGFjdCIsImF1dGhBdCI6MTY1MzkxMDAxNzE1NTI2ODY1MywiYXpwIjoidGVzdGNhbGwtZmNiOWU1NDRkYmVkNTEwZGNiNmIxZDg4OGUwZDQ0ZjAzMjg3NTY4NTA4MTg2NTI4MTYxIn0.beexq9l2lBpqq9VTJ-VGC1MRxTJu29u2BpqsJZWlMENe7LkTK2-bSGwPRGINAYblDHqC4dfgjmE5eMbUvMCl0irwwmACzidk1HE5u_2a2P7NByWnMYYh7mm_0dN0Gwlbie-uIaSKNk5X414B_ANYbaaytuZ2jbjrW8if6S_yYWhF6LD3yaZy74wJ8cJA3qW1OAnLeyBOVwiHbegutcbez6EyjngHQJ1UOnDO0XfzzImD_g9A0VDQjapk3Cepb5kVl4BqSAVPbTCk8Rl-1-O0FrwKyAUmF3TUIBcKRyNJk0H1ficP6UWIZzjh4zXJkj6_6NyYNGtD2Jz1N6VhjZ70IA");
//
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//         console.log(xhr.status);
//         console.log(xhr.responseText);
//     }};
//
// xhr.send();
