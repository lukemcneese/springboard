function snakeToCamel(str) {
    var camel = "";
    for (let i = 0; i<str.length; i++){
        var char = str[i];
        if (char == "_"){
            char = "";
        }
        if (str[i-1] == "_"){
            char = char.toUpperCase()
        }
        camel += char
    }
    return camel 
}

