let i = 4;
// This is a variable declaration and initialization.
// The variable 'i' is assigned the numeric value 4.

switch (i) {

    case 1:

        console.log("The value of i is 1");
        // This line outputs the string 
        // "The value of i is 1" 
        // to the console if 'i' equals 1.

        break;
        // This statement exits the switch block 
        // if the case matches.

    case 2:

        console.log("The value of i is 2");
        // This line outputs the string 
        // "The value of i is 2" 
        // to the console if 'i' equals 2.

        break;
        // This statement exits the switch block 
        // if the case matches.

    case 3:

        console.log("The value of i is 3");
        // This line outputs the string 
        // "The value of i is 3" 
        // to the console if 'i' equals 3.

        break;
        // This statement exits the switch block 
        // if the case matches.

    default:

        console.log("The value of i is not 1, 2, or 3");
        // This line outputs the string 
        // "The value of i is not 1, 2, or 3" 
        // to the console if 'i' does not match any of the cases above.
        break;
        // This statement exits the switch block 
        // if none of the cases match.
        
}

// This switch statement checks the value of 'i' 
// and executes the corresponding case block.
// In this case, since 'i' is 4, 
// the default case will be executed, 
// and the message "The value of i is not 1, 2, or 3" 
// will be printed to the console.

// Note: The 'break' statements are important
// to prevent fall-through behavior in switch statements. 
// Without 'break', the code would continue executing 
// the next case blocks even if a match is found.
// It is a good practice to include 'break' in each case block,
// unless you intentionally want to allow fall-through behavior.    