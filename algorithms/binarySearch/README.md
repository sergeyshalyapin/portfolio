```

const binarySearch = (list, target) => {
  let low = 0;
  let high = list.length - 1;
  if (target > list[high]) return "error";

  let notFound = true;

  let half = Math.floor((high - low)/2);

  while(notFound) {

    if (list[half] < target) {
      low = half + 1;
    } else if (list[half] > target) {
      high = half - 1;
    } else {
      notFound = false;
    }

    half = Math.round((high - low)/2 + low);
  }
}


```