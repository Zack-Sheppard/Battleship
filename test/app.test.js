
var App = require("../src/app.js");
var ship = require("../src/components/ship");

var mock = {
    value: 5,
    onClick: () => {
        // do nothing
    }
};

test("This test should fail", () => {
    expect(App.Square(mock)).toBe(5);
});

test("This test should pass", () => {
    expect(ship.sum(2, 3)).toBe(5);
});
