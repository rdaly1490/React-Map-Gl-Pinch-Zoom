'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffSources = diffSources;
exports.diffLayers = diffLayers;
exports.default = diffStyle;
// Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/* eslint-disable max-statements */
function diffSources(prevStyle, nextStyle) {
  var prevSources = prevStyle.get('sources');
  var nextSources = nextStyle.get('sources');
  var enter = [];
  var update = [];
  var exit = [];
  var prevIds = prevSources.keySeq().toArray();
  var nextIds = nextSources.keySeq().toArray();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = prevIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var id = _step.value;

      var nextSource = nextSources.get(id);
      if (nextSource) {
        if (!nextSource.equals(prevSources.get(id))) {
          update.push({ id: id, source: nextSources.get(id) });
        }
      } else {
        exit.push({ id: id, source: prevSources.get(id) });
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = nextIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _id = _step2.value;

      var prevSource = prevSources.get(_id);
      if (!prevSource) {
        enter.push({ id: _id, source: nextSources.get(_id) });
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return { enter: enter, update: update, exit: exit };
}
/* eslint-enable max-statements */

function diffLayers(prevStyle, nextStyle) {
  var prevLayers = prevStyle.get('layers');
  var nextLayers = nextStyle.get('layers');
  var updates = [];
  var exiting = [];
  var prevMap = {};
  var nextMap = {};
  nextLayers.forEach(function (layer, index) {
    var id = layer.get('id');
    var layerImBehind = nextLayers.get(index + 1);
    nextMap[id] = {
      layer: layer,
      id: id,
      // The `id` of the layer before this one.
      before: layerImBehind ? layerImBehind.get('id') : null,
      enter: true
    };
  });
  prevLayers.forEach(function (layer, index) {
    var id = layer.get('id');
    var layerImBehind = prevLayers.get(index + 1);
    prevMap[id] = {
      layer: layer,
      id: id,
      before: layerImBehind ? layerImBehind.get('id') : null
    };
    if (nextMap[id]) {
      // Not a new layer.
      nextMap[id].enter = false;
    } else {
      // This layer is being removed.
      exiting.push(prevMap[id]);
    }
  });
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = nextLayers.reverse()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var layer = _step3.value;

      var id = layer.get('id');
      if (!prevMap[id] || !prevMap[id].layer.equals(nextMap[id].layer) || prevMap[id].before !== nextMap[id].before) {
        // This layer is being changed.
        updates.push(nextMap[id]);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return { updates: updates, exiting: exiting };
}

function diffStyle(prevStyle, nextStyle) {
  return {
    sourcesDiff: diffSources(prevStyle, nextStyle),
    layersDiff: diffLayers(prevStyle, nextStyle)
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kaWZmLXN0eWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztRQXFCZ0IsVyxHQUFBLFc7UUE0QkEsVSxHQUFBLFU7a0JBZ0RRLFM7QUFqR3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ08sU0FBUyxXQUFULENBQXFCLFNBQXJCLEVBQWdDLFNBQWhDLEVBQTJDO0FBQ2hELE1BQU0sY0FBYyxVQUFVLEdBQVYsQ0FBYyxTQUFkLENBQXBCO0FBQ0EsTUFBTSxjQUFjLFVBQVUsR0FBVixDQUFjLFNBQWQsQ0FBcEI7QUFDQSxNQUFNLFFBQVEsRUFBZDtBQUNBLE1BQU0sU0FBUyxFQUFmO0FBQ0EsTUFBTSxPQUFPLEVBQWI7QUFDQSxNQUFNLFVBQVUsWUFBWSxNQUFaLEdBQXFCLE9BQXJCLEVBQWhCO0FBQ0EsTUFBTSxVQUFVLFlBQVksTUFBWixHQUFxQixPQUFyQixFQUFoQjtBQVBnRDtBQUFBO0FBQUE7O0FBQUE7QUFRaEQseUJBQWlCLE9BQWpCLDhIQUEwQjtBQUFBLFVBQWYsRUFBZTs7QUFDeEIsVUFBTSxhQUFhLFlBQVksR0FBWixDQUFnQixFQUFoQixDQUFuQjtBQUNBLFVBQUksVUFBSixFQUFnQjtBQUNkLFlBQUksQ0FBQyxXQUFXLE1BQVgsQ0FBa0IsWUFBWSxHQUFaLENBQWdCLEVBQWhCLENBQWxCLENBQUwsRUFBNkM7QUFDM0MsaUJBQU8sSUFBUCxDQUFZLEVBQUMsTUFBRCxFQUFLLFFBQVEsWUFBWSxHQUFaLENBQWdCLEVBQWhCLENBQWIsRUFBWjtBQUNEO0FBQ0YsT0FKRCxNQUlPO0FBQ0wsYUFBSyxJQUFMLENBQVUsRUFBQyxNQUFELEVBQUssUUFBUSxZQUFZLEdBQVosQ0FBZ0IsRUFBaEIsQ0FBYixFQUFWO0FBQ0Q7QUFDRjtBQWpCK0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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LGdCQUFZLFdBQVcsU0FBWCxFQUFzQixTQUF0QjtBQUZQLEdBQVA7QUFJRCIsImZpbGUiOiJkaWZmLXN0eWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1zdGF0ZW1lbnRzICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZlNvdXJjZXMocHJldlN0eWxlLCBuZXh0U3R5bGUpIHtcbiAgY29uc3QgcHJldlNvdXJjZXMgPSBwcmV2U3R5bGUuZ2V0KCdzb3VyY2VzJyk7XG4gIGNvbnN0IG5leHRTb3VyY2VzID0gbmV4dFN0eWxlLmdldCgnc291cmNlcycpO1xuICBjb25zdCBlbnRlciA9IFtdO1xuICBjb25zdCB1cGRhdGUgPSBbXTtcbiAgY29uc3QgZXhpdCA9IFtdO1xuICBjb25zdCBwcmV2SWRzID0gcHJldlNvdXJjZXMua2V5U2VxKCkudG9BcnJheSgpO1xuICBjb25zdCBuZXh0SWRzID0gbmV4dFNvdXJjZXMua2V5U2VxKCkudG9BcnJheSgpO1xuICBmb3IgKGNvbnN0IGlkIG9mIHByZXZJZHMpIHtcbiAgICBjb25zdCBuZXh0U291cmNlID0gbmV4dFNvdXJjZXMuZ2V0KGlkKTtcbiAgICBpZiAobmV4dFNvdXJjZSkge1xuICAgICAgaWYgKCFuZXh0U291cmNlLmVxdWFscyhwcmV2U291cmNlcy5nZXQoaWQpKSkge1xuICAgICAgICB1cGRhdGUucHVzaCh7aWQsIHNvdXJjZTogbmV4dFNvdXJjZXMuZ2V0KGlkKX0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBleGl0LnB1c2goe2lkLCBzb3VyY2U6IHByZXZTb3VyY2VzLmdldChpZCl9KTtcbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBpZCBvZiBuZXh0SWRzKSB7XG4gICAgY29uc3QgcHJldlNvdXJjZSA9IHByZXZTb3VyY2VzLmdldChpZCk7XG4gICAgaWYgKCFwcmV2U291cmNlKSB7XG4gICAgICBlbnRlci5wdXNoKHtpZCwgc291cmNlOiBuZXh0U291cmNlcy5nZXQoaWQpfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7ZW50ZXIsIHVwZGF0ZSwgZXhpdH07XG59XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaWZmTGF5ZXJzKHByZXZTdHlsZSwgbmV4dFN0eWxlKSB7XG4gIGNvbnN0IHByZXZMYXllcnMgPSBwcmV2U3R5bGUuZ2V0KCdsYXllcnMnKTtcbiAgY29uc3QgbmV4dExheWVycyA9IG5leHRTdHlsZS5nZXQoJ2xheWVycycpO1xuICBjb25zdCB1cGRhdGVzID0gW107XG4gIGNvbnN0IGV4aXRpbmcgPSBbXTtcbiAgY29uc3QgcHJldk1hcCA9IHt9O1xuICBjb25zdCBuZXh0TWFwID0ge307XG4gIG5leHRMYXllcnMuZm9yRWFjaCgobGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgaWQgPSBsYXllci5nZXQoJ2lkJyk7XG4gICAgY29uc3QgbGF5ZXJJbUJlaGluZCA9IG5leHRMYXllcnMuZ2V0KGluZGV4ICsgMSk7XG4gICAgbmV4dE1hcFtpZF0gPSB7XG4gICAgICBsYXllcixcbiAgICAgIGlkLFxuICAgICAgLy8gVGhlIGBpZGAgb2YgdGhlIGxheWVyIGJlZm9yZSB0aGlzIG9uZS5cbiAgICAgIGJlZm9yZTogbGF5ZXJJbUJlaGluZCA/IGxheWVySW1CZWhpbmQuZ2V0KCdpZCcpIDogbnVsbCxcbiAgICAgIGVudGVyOiB0cnVlXG4gICAgfTtcbiAgfSk7XG4gIHByZXZMYXllcnMuZm9yRWFjaCgobGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgaWQgPSBsYXllci5nZXQoJ2lkJyk7XG4gICAgY29uc3QgbGF5ZXJJbUJlaGluZCA9IHByZXZMYXllcnMuZ2V0KGluZGV4ICsgMSk7XG4gICAgcHJldk1hcFtpZF0gPSB7XG4gICAgICBsYXllcixcbiAgICAgIGlkLFxuICAgICAgYmVmb3JlOiBsYXllckltQmVoaW5kID8gbGF5ZXJJbUJlaGluZC5nZXQoJ2lkJykgOiBudWxsXG4gICAgfTtcbiAgICBpZiAobmV4dE1hcFtpZF0pIHtcbiAgICAgIC8vIE5vdCBhIG5ldyBsYXllci5cbiAgICAgIG5leHRNYXBbaWRdLmVudGVyID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgbGF5ZXIgaXMgYmVpbmcgcmVtb3ZlZC5cbiAgICAgIGV4aXRpbmcucHVzaChwcmV2TWFwW2lkXSk7XG4gICAgfVxuICB9KTtcbiAgZm9yIChjb25zdCBsYXllciBvZiBuZXh0TGF5ZXJzLnJldmVyc2UoKSkge1xuICAgIGNvbnN0IGlkID0gbGF5ZXIuZ2V0KCdpZCcpO1xuICAgIGlmIChcbiAgICAgICFwcmV2TWFwW2lkXSB8fFxuICAgICAgIXByZXZNYXBbaWRdLmxheWVyLmVxdWFscyhuZXh0TWFwW2lkXS5sYXllcikgfHxcbiAgICAgIHByZXZNYXBbaWRdLmJlZm9yZSAhPT0gbmV4dE1hcFtpZF0uYmVmb3JlXG4gICAgKSB7XG4gICAgICAvLyBUaGlzIGxheWVyIGlzIGJlaW5nIGNoYW5nZWQuXG4gICAgICB1cGRhdGVzLnB1c2gobmV4dE1hcFtpZF0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge3VwZGF0ZXMsIGV4aXRpbmd9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaWZmU3R5bGUocHJldlN0eWxlLCBuZXh0U3R5bGUpIHtcbiAgcmV0dXJuIHtcbiAgICBzb3VyY2VzRGlmZjogZGlmZlNvdXJjZXMocHJldlN0eWxlLCBuZXh0U3R5bGUpLFxuICAgIGxheWVyc0RpZmY6IGRpZmZMYXllcnMocHJldlN0eWxlLCBuZXh0U3R5bGUpXG4gIH07XG59XG4iXX0=