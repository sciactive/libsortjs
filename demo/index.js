((_, LibSort) => {
  // console.log(quicksort([5, 3, 6, 4, 1, 2]));
  // console.log(quicksort([1, 1, 1, 1, 1, 1]));
  // console.log(quicksort([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0]));
  // console.log(quicksort([1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]));

  window.doVisualize = function () {
    // Reset any current animation.
    cancelAnimations();

    const sort = document.getElementById('visualizeSort').value;

    let mode = document.getElementById('visualizeMode').value;
    const type = document.getElementById('visualizeType').value;
    const perspective = mode.slice(-4) === 'Tilt';
    if (perspective) mode = mode.slice(0, -4);
    const count = parseInt(document.getElementById('visualizeElements').value);
    const maxDelta = parseInt(document.getElementById('visualizeMaxDelta').value);
    const sync = !!document.getElementById('visualizeSync').checked;
    const delay = parseInt(document.getElementById('visualizeDelay').value);
    const switchLimit = parseInt(document.getElementById('visualizeSwitchLimit').value);
    const switchFunction = document.getElementById('visualizeSwitchFunction').value;

    document.getElementById('visualizeStatSort').textContent = document.querySelector('#visualizeSort [value=' + sort + ']').textContent;

    document.getElementById('visualizeStatSwitchContainer').style.display = (switchLimit > 0 && !document.getElementById('visualizeSwitchLimit').disabled) ? 'inline' : 'none';
    document.getElementById('visualizeStatSwitchLimit').textContent = switchLimit;
    document.getElementById('visualizeStatSwitchSort').textContent = document.querySelector('#visualizeSwitchFunction [value=' + switchFunction + ']').textContent;
    document.getElementById('visualizeStatDelayContainer').style.display = ((delay > 0) && !sync) ? 'inline' : 'none';
    document.getElementById('visualizeStatDelay').textContent = delay;

    document.getElementById('visualizeStatLength').textContent = count;
    document.getElementById('visualizeStatComparisons').textContent = '0';
    document.getElementById('visualizeStatSwaps').textContent = '0';

    if (sort === 'mergesort' || sort === 'redblacksort') {
      document.getElementById('visualizeStatsOperationLabel').textContent = 'Inserts';
    } else {
      document.getElementById('visualizeStatsOperationLabel').textContent = 'Swaps';
    }
    const visualize = document.getElementById('visualize');
    visualize.innerHTML = '';
    visualize.classList.remove('height', 'color', 'line', 'grayscale', 'numbers', 'perspective');
    visualize.classList.add(mode);
    if (perspective) visualize.classList.add('perspective');
    const children = [];
    const colorModeTheta = (1 / count * 360);
    // const colorModeDistanceBetweenPoints = ((1 / count * 100 * Math.PI) * 2);
    const colorModeWidth = (Math.tan((colorModeTheta * Math.PI / 180) / 2) * /* height of element */ 100 * 2);
    for (let i = 1; i <= count; i++) {
      const el = document.createElement('div');
      const val = type !== 'random' ? i : (Math.ceil(Math.random() * count));
      if (mode === 'height') {
        el.libSortTransform = 'scaleY(' + (val / count) + ')';
      } else if (mode === 'numbers') {
        el.innerHTML = '<span>' + ((val + '').split('').join('</span><span>')) + '</span>';
      } else if (mode === 'line') {
        el.libSortTransform = 'translateY(-' + ((val / count * 100) - (1 / count * 100)) + '%) scaleY(' + (1 / count) + ')';
      } else if (mode === 'color' || mode === 'grayscale') {
        el.style.width = colorModeWidth + 'vh';
        el.style.borderLeftWidth = (colorModeWidth / 2) + 'vh';
        el.style.borderRightWidth = (colorModeWidth / 2) + 'vh';
        el.style.marginLeft = (colorModeWidth / 2 * -1) + 'vh';
        if (mode === 'color') {
          el.libSortColor = 'hsl(' + (val / count * 360) + ', 100%, 58%)';
        } else {
          el.libSortColor = 'hsl(0, 0%, ' + (val / count * 100) + '%)';
        }
      }
      el.libSortIndex = val;
      children.push(el);
    }
    switch (type) {
      case 'shuffled':
        shuffle(children);
        break;
      case 'nearly':
        shuffle(children);
        LibSort.quicksort(children, {
          compareFunction: function (a, b) {
            if (a.libSortIndex < b.libSortIndex) return -1;
            if (a.libSortIndex > b.libSortIndex) return 1;
            return 0;
          },
          maxDelta: Math.max(Math.min(Math.round(count / 20), 8), 1)
        });
        break;
      case 'reversed':
        children.reverse();
        break;
    }
    const frag = document.createDocumentFragment();
    for (let i = 0; i < children.length; i++) {
      let el = children[i];
      if (mode === 'height' || mode === 'line') {
        el.style.transform = el.libSortTransform;
      } else if (mode === 'color' || mode === 'grayscale') {
        el.libSortTransformRotate = 'rotate(' + (colorModeTheta * i) + 'deg) scale(.35)';
        el.style.transform = el.libSortTransformRotate;
        el.style.borderTopColor = el.libSortColor;
      }
      frag.appendChild(el);
    }
    visualize.appendChild(frag);
    if (mode === 'numbers') {
      const numberWidth = children[0].offsetWidth + 'px';
      for (let i = 0; i < children.length; i++) {
        let el = children[i];
        el.style.fontSize = numberWidth;
      }
    }
    LibSort[sort](children, {
      maxDelta,
      switchLimit,
      switchFunction: LibSort[switchFunction],
      compareFunction: (a, b) => {
        let index1 = children.indexOf(a);
        let index2 = children.indexOf(b);
        let insideA;
        let insideB;
        animateFrame(() => {
          if (index1 !== -1) {
            insideA = visualize.children[index1];
            insideA.classList.add('compare');
          }
          if (index2 !== -1) {
            insideB = visualize.children[index2];
            insideB.classList.add('compare');
          }
          document.getElementById('visualizeStatComparisons').textContent =
            parseInt(document.getElementById('visualizeStatComparisons').textContent) + 1;
        }, {sync});
        animateFrame(() => {
          if (insideA) insideA.classList.remove('compare');
          if (insideB) insideB.classList.remove('compare');
        }, {sync, delay});
        if (a.libSortIndex < b.libSortIndex) return -1;
        if (a.libSortIndex > b.libSortIndex) return 1;
        return 0;
      },
      swapFunction: (arr, index1, index2) => {
        animateFrame(() => {
          let a = visualize.children[index1];
          let b = visualize.children[index2];
          a.classList.add('swap');
          b.classList.add('swap');
          document.getElementById('visualizeStatSwaps').textContent =
            parseInt(document.getElementById('visualizeStatSwaps').textContent) + 1;
        }, {sync});
        animateFrame(() => {
          let a = visualize.children[index1];
          let b = visualize.children[index2];
          if (mode === 'height' || mode === 'line') {
            const temp = a.libSortTransform;
            a.libSortTransform = b.libSortTransform;
            b.libSortTransform = temp;
            a.style.transform = a.libSortTransform;
            b.style.transform = b.libSortTransform;
          } else if (mode === 'numbers') {
            const temp = a.innerHTML;
            a.innerHTML = b.innerHTML;
            b.innerHTML = temp;
          } else if (mode === 'color' || mode === 'grayscale') {
            const temp = a.libSortColor;
            a.libSortColor = b.libSortColor;
            b.libSortColor = temp;
            a.style.borderTopColor = a.libSortColor;
            b.style.borderTopColor = b.libSortColor;
          }
        }, {sync, delay: Math.floor(delay / 2)});
        animateFrame(() => {
          let a = visualize.children[index1];
          let b = visualize.children[index2];
          a.classList.remove('swap');
          b.classList.remove('swap');
        }, {sync, delay: Math.floor(delay / 2)});
        const temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
      },
      insertFunction: (arr, index, element) => {
        animateFrame(() => {
          visualize.children[index].classList.add('swap');
          document.getElementById('visualizeStatSwaps').textContent =
            parseInt(document.getElementById('visualizeStatSwaps').textContent) + 1;
        }, {sync});
        animateFrame(((element, change) => {
          return () => {
            if (mode === 'height' || mode === 'line') {
              element.style.transform = change.libSortTransform;
            } else if (mode === 'numbers') {
              element.innerHTML = change.libSortInnerHTML;
            } else if (mode === 'color' || mode === 'grayscale') {
              element.style.borderTopColor = change.libSortColor;
            }
          };
        })(visualize.children[index], {
          libSortTransform: element.libSortTransform,
          libSortColor: element.libSortColor,
          libSortInnerHTML: element.innerHTML
        }), {sync, delay: Math.floor(delay / 2)});
        animateFrame(() => {
          visualize.children[index].classList.remove('swap');
        }, {sync, delay: Math.floor(delay / 2)});
        arr[index] = element;
      },
      sortedCallbackFunction: (arr) => {
        const elements = _.map(arr, (element) => visualize.children[children.indexOf(element)]);
        animateFrame(() => _.forEach(elements, (element) => element.classList.add('sorted')), {sync});
      }
    });
  };

  window.doCompare = function () {
    // Reset any current animation.
    cancelAnimations();

    const sort1 = document.getElementById('compareSort1').value;
    const sort2 = document.getElementById('compareSort2').value;
    const count = parseInt(document.getElementById('compareElements').value);
    const rounds = parseInt(document.getElementById('compareRounds').value);
    const switchLimit1 = parseInt(document.getElementById('compareSwitchLimit1').value);
    const switchLimit2 = parseInt(document.getElementById('compareSwitchLimit2').value);
    const switchFunction1 = document.getElementById('compareSwitchFunction1').value;
    const switchFunction2 = document.getElementById('compareSwitchFunction2').value;
    const arrSkel = [...Array(count).keys()];

    logHeader(count + ' ITEM DEATHMATCH');
    log('', 'sort1', true);
    log('', 'sort2', true);
    log('', 'debug', true);
    log('## ' + (sort1 === 'native' ? 'Native Sort' : ('LibSort.js ' + sort1)) + '   VS', 'sort1');
    log('## ' + (sort2 === 'native' ? 'Native Sort' : ('LibSort.js ' + sort2)), 'sort2');
    log('## Checking Array Equality\n', 'debug');

    let times = {};
    let timesSorted;
    let timesShuffled;
    let timesReversed;

    const benchmarkSort = (sortFunc, shuffled, reversed, label) => {
      const arr = arrSkel.slice();
      if (shuffled) shuffle(arr);
      if (reversed) arr.reverse();
      const start = window.performance.now();
      const ret = sortFunc(arr, LibSort.defaultCompareFunction);
      const end = window.performance.now();
      const time = _.round(end - start, 3);
      log('\nRun Time: ' + time + 'ms', label);

      if (!times[label]) times[label] = [];
      times[label].push(time);

      return ret;
    };

    const callSort = (sort, switchLimit, switchFunction, arr, c) => {
      if (sort === 'native') {
        return arr.sort(c);
      } else {
        return LibSort[sort](arr, {
          switchLimit,
          switchFunction: LibSort[switchFunction],
          compareFunction: c
        });
      }
    };

    let promises = [];
    animateFrame(() => log('\n\n# Pre-sorted array', 'sort1'), {delay: 1});
    for (let i = 0; i < rounds; i++) {
      promises.push(animateFrame(() => benchmarkSort((arr, c) => callSort(sort1, switchLimit1, switchFunction1, arr, c), false, false, 'sort1'), {delay: 1}));
    }
    animateFrame(() => log('\n\n# Pre-sorted array', 'sort2'), {delay: 1});
    for (let i = 0; i < rounds; i++) {
      promises.push(animateFrame(() => benchmarkSort((arr, c) => callSort(sort2, switchLimit2, switchFunction2, arr, c), false, false, 'sort2'), {delay: 1}));
    }
    window.Promise.all(promises).then((values) => {
      let equality = true;
      _.forEach(values, (value, i) => {
        equality = equality && (values[i + 1]) ? _.isEqual(value, values[i + 1]) : true;
      });
      log('\nArray Equality: ' + equality.toString(), 'debug');

      for (var label in times) {
        log('\n\n# Stats', label);
        log('\nAverage: ' + _.round(_.mean(times[label]), 3) + 'ms', label);
        log('\nStd Dev: ' + _.round(standardDeviation(times[label]), 3) + 'ms', label);
      }

      timesSorted = times;
      times = {};
    });

    promises = [];
    animateFrame(() => log('\n\n# Shuffled array', 'sort1'), {delay: 1});
    for (let i = 0; i < rounds; i++) {
      promises.push(animateFrame(() => benchmarkSort((arr, c) => callSort(sort1, switchLimit1, switchFunction1, arr, c), true, false, 'sort1'), {delay: 1}));
    }
    animateFrame(() => log('\n\n# Shuffled array', 'sort2'), {delay: 1});
    for (let i = 0; i < rounds; i++) {
      promises.push(animateFrame(() => benchmarkSort((arr, c) => callSort(sort2, switchLimit2, switchFunction2, arr, c), true, false, 'sort2'), {delay: 1}));
    }
    window.Promise.all(promises).then((values) => {
      let equality = true;
      _.forEach(values, (value, i) => {
        equality = equality && (values[i + 1]) ? _.isEqual(value, values[i + 1]) : true;
      });
      log('\nArray Equality: ' + equality.toString(), 'debug');

      for (var label in times) {
        log('\n\n# Stats', label);
        log('\nAverage: ' + _.round(_.mean(times[label]), 3) + 'ms', label);
        log('\nStd Dev: ' + _.round(standardDeviation(times[label]), 3) + 'ms', label);
      }

      timesShuffled = times;
      times = {};
    });

    promises = [];
    animateFrame(() => log('\n\n# Reversed array', 'sort1'), {delay: 1});
    for (let i = 0; i < rounds; i++) {
      promises.push(animateFrame(() => benchmarkSort((arr, c) => callSort(sort1, switchLimit1, switchFunction1, arr, c), false, true, 'sort1'), {delay: 1}));
    }
    animateFrame(() => log('\n\n# Reversed array', 'sort2'), {delay: 1});
    for (let i = 0; i < rounds; i++) {
      promises.push(animateFrame(() => benchmarkSort((arr, c) => callSort(sort2, switchLimit2, switchFunction2, arr, c), false, true, 'sort2'), {delay: 1}));
    }
    window.Promise.all(promises).then((values) => {
      let equality = true;
      _.forEach(values, (value, i) => {
        equality = equality && (values[i + 1]) ? _.isEqual(value, values[i + 1]) : true;
      });
      log('\nArray Equality: ' + equality.toString(), 'debug');

      for (let label in times) {
        log('\n\n# Stats', label);
        log('\nAverage: ' + _.round(_.mean(times[label]), 3) + 'ms', label);
        log('\nStd Dev: ' + _.round(standardDeviation(times[label]), 3) + 'ms', label);
      }

      timesReversed = times;
      for (let label in times) {
        log('\n\n## Total Stats', label);
        log('\nAverage: ' + _.round(_.mean(timesSorted[label].concat(timesShuffled[label]).concat(timesReversed[label])), 3) + 'ms', label);
        log('\nStd Dev: ' + _.round(standardDeviation(timesSorted[label].concat(timesShuffled[label]).concat(timesReversed[label])), 3) + 'ms', label);
      }
    });
  };

  let currentTime = 0;
  let proceed = true;
  let requests = [];
  let syncQueue = [];
  function animateFrame (fn, {sync, delay, reset}) {
    let resolver;
    const promise = new window.Promise((resolve) => {
      resolver = resolve;
    });
    if (!delay) delay = 0;
    const runTime = currentTime + delay;
    currentTime += delay;
    if (sync) {
      syncQueue.push({
        delay,
        fn: () => {
          resolver(fn());
        }
      });
      if (syncQueue.length === 1) window.requestAnimationFrame(() => runSync());
    } else /* if (runTime > 0) */ {
      let start;
      let imWaiting = false;
      (function timePass (timestamp) {
        if (!start) start = timestamp;
        if (proceed || imWaiting) {
          if (timestamp - start >= runTime) {
            proceed = true;
            resolver(fn());
          } else {
            proceed = false;
            imWaiting = true;
            requests.push(window.requestAnimationFrame(timePass));
          }
        } else {
          requests.push(window.requestAnimationFrame(timePass));
        }
      })();
    } /* else {
      requests.push(requestAnimationFrame(() => {
        resolver(fn());
      }));
    } */
    return promise;
  }

  function runSync () {
    window.requestAnimationFrame(() => {
      do {
        syncQueue[0].fn();
        syncQueue.splice(0, 1);
      } while (syncQueue.length && syncQueue[0].delay === 0);
      if (syncQueue.length) runSync();
    });
  }

  function cancelAnimations () {
    for (let i = 0; i < requests.length; i++) window.cancelAnimationFrame(requests[i]);
    currentTime = 0;
    proceed = true;
    requests = [];
  }

  function logHeader (msg) {
    let output = document.querySelector('#outputHeader');
    output.innerText = msg;
  }

  function log (msg, name, clearFirst) {
    let pre = '';
    let output = document.querySelector('#output [name="' + name + '"]');
    if (!clearFirst) pre = output.innerText;
    output.innerText = pre + msg;
  }

  function shuffle (array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }

  // from: https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/
  function standardDeviation (values) {
    var avg = average(values);

    var squareDiffs = values.map(function (value) {
      var diff = value - avg;
      var sqrDiff = diff * diff;
      return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
  }

  function average (data) {
    var sum = data.reduce(function (sum, value) {
      return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
  }
})(window._, window.LibSort);
