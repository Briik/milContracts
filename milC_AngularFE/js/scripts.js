document.getElementById('myChart').onclick = function(evt) {
    var activePoints = contractsOverTime.getPointsAtEvent(evt);
    console.log(activePoints);
    self.selectedElements.splice(0,self.selectedElements.length);
    activePoints.forEach(function(contract) {
        self.selectedElements.push(contract)
    });
    console.log("selectedElements: " + self.selectedElements);
    // => activePoints is an array of points on the canvas that are at the same position as the click event.
};
