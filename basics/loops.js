let l = 5;
// This is a variable declaration and initialization.

for (let i = 0; i < l; i++) {

    console.log(i);
    // This line outputs the value of 'i' to the console 
    // for each iteration of the loop, 
    // which will be 0, 1, 2, 3, and 4.

}

while (l > 0) {

    console.log(l);
    // This line outputs the value of 'l' to the console 
    // for each iteration of the loop, 
    // which will be 5, 4, 3, 2, and 1.

    l--;
    // This line decrements the value of 'l' by 1 
    // in each iteration of the loop.

}

let a = [1, 2, 3, 4, 5];
// This is a variable declaration and initialization.
// The variable 'a' is assigned an array containing five numeric values.

for (let i = 0; i < a.length; i++) {

    console.log(a[i]);
    // This line outputs the value of 'a[i]' to the console
    // for each iteration of the loop, 
    // which will be 1, 2, 3, 4, and 5.

}

for (let value of a) {

    console.log(value);
    // This line outputs the value of 'value' to the console 
    // for each iteration of the loop, 
    // which will be 1, 2, 3, 4, and 5.

}

a.map((value) => {

    console.log(value * 2);
    // This line outputs the value of 'value' multiplied by 2 to the console 
    // for each element in the array 'a', 
    // which will be 2, 4, 6, 8, and 10.

});

a.forEach((value) => {

    console.log(value * 3);
    // This line outputs the value of 'value' multiplied by 3 to the console 
    // for each element in the array 'a', 
    // which will be 3, 6, 9, 12, and 15.

});

let obj = { name: "Alice", age: 30, city: "New York" };
// This is a variable declaration and initialization.
// The variable 'obj' is assigned an object with properties 'name', 'age', and 'city'.

for (let key in obj) {

    console.log(key + ": " + obj[key]);
    // This line outputs the key and value 
    // of each property in the object 'obj' 
    // to the console.
    
}

