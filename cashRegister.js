function convertCid(cid) {
  for (let i in cid){
    for(let j in cid){
      switch (cid[i][j]){
      case "PENNY": cid[i][j] = 0.01
        break;
      case "NICKEL": cid[i][j] = 0.05
        break;
      case "DIME": cid[i][j] = 0.1
        break;
      case "QUARTER": cid[i][j] = 0.25
        break;
      case "ONE": cid[i][j] = 1
        break;
      case "FIVE": cid[i][j] = 5
        break;
      case "TEN": cid[i][j] = 10
        break;
      case "TWENTY": cid[i][j] = 20
        break;
      case "ONE HUNDRED": cid[i][j] = 100
        break;
    }
    }
  }
  return cid;
}

function unConvertCid(cid) {
  for (let i in cid){
      switch (cid[i][0]){
      case 0.01: cid[i][0] = "PENNY"
        break;
      case 0.05: cid[i][0] = "NICKEL"
        break;
      case 0.1: cid[i][0] = "DIME"
        break;
      case 0.25: cid[i][0] = "QUARTER"
        break;
      case 1: cid[i][0] = "ONE"
        break;
      case 5: cid[i][0] = "FIVE"
        break;
      case 10: cid[i][0] = "TEN"
        break;
      case 20: cid[i][0] = "TWENTY"
        break;
      case 100: cid[i][0] = "ONE HUNDRED"
        break;
    }
  }
  return cid;
}

function fopen(change, cid, arr) {
  let a = 0;
  for (let i = cid.length - 1; i >= 0; i--){
    if (change > cid[i][0]){
      if (change <= cid[i][1] && change % cid[i][0] === 0){
        arr.push([cid[i][0], change]);
        return;
      }
      else if (cid[i][1] > 0) {
        while (change > cid[i][0] && (a * cid[i][0] < cid[i][1])) {
          change -= cid[i][0];
          a++;
        }
        if (change < 0.01 && change > 0){
          a++;
        }
        a *= cid[i][0];
        if (a <= cid[i][1]){
          arr.push([cid[i][0], a]);
        }
        else {
          a -= cid[i][1];
          arr.push([cid[i][0], a])
        }
        a = 0;
      }
    }
  }
  return arr;
}

function fchange(change, cid, status) {
  let arr = [];
  if (status === "CLOSED"){
    unConvertCid(cid);
    return cid;
  }
  else if (status === "INSUFFICIENT_FUNDS"){
    return arr;
  }
  else {
    fopen(change, cid, arr);
  }
  unConvertCid(arr);
  return arr;
}

function fstatus(change, cid) {
  let total = 0;
  for (let i in cid){
    total += cid[i][1]
  }
  return (total === change ? "CLOSED": total > change ? "OPEN":"INSUFFICIENT_FUNDS")
}

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let final = fchange(change, convertCid(cid), fstatus(change, cid));
  let total = 0;
  for (let i in final){
    total += final[i][1];
  }
  if (total >= change){
    return {"status": fstatus(change, cid), "change": final};
  }
  else {
    return {"status": "INSUFFICIENT_FUNDS", "change": []}
  }
}
